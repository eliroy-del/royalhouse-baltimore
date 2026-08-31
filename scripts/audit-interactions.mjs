/**
 * Audits the states a page-load crawl never reaches: open mobile navigation,
 * the search overlay with results, submitted-but-invalid forms, FAQ accordions
 * and keyboard focus order.
 *
 *   node scripts/audit-interactions.mjs [baseUrl]
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = ".audit/interactions";
mkdirSync(OUT, { recursive: true });

const findings = [];
const consoleErrors = [];

const browser = await chromium.launch();
// Reduced motion makes the audit deterministic: entrance animations resolve
// instantly, so axe never measures a mid-fade opacity as a contrast failure.
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await context.addInitScript({ path: axePath });

const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push({ url: page.url(), text: m.text() });
});
page.on("pageerror", (e) => consoleErrors.push({ url: page.url(), text: `pageerror: ${e.message}` }));

/**
 * Radix's NavigationMenu renders a visually hidden `aria-hidden tabindex="0"`
 * focus proxy while a dropdown is open; it is how the library moves focus into
 * the open panel. It is library-internal and cannot be changed from here.
 */
function isKnownLibraryPattern(rule, html) {
  return (
    rule === "aria-hidden-focus" &&
    html.includes('aria-hidden="true"') &&
    html.includes('tabindex="0"') &&
    html.includes("clip: rect(0px, 0px, 0px, 0px)")
  );
}

async function scan(label) {
  const results = await page.evaluate(async () =>
    window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
    }),
  );
  for (const v of results.violations) {
    const nodes = v.nodes.filter((n) => !isKnownLibraryPattern(v.id, n.html ?? ""));
    if (nodes.length === 0) continue;

    findings.push({
      state: label,
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: nodes.slice(0, 3).map((n) => `${n.target.join(" ")} — ${n.failureSummary?.split("\n")[1] ?? ""}`),
    });
  }
}

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

/* ------------------------- Mobile navigation ------------------------- */
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: /menu/i }).click();
await page.waitForTimeout(600);
await scan("mobile-nav-open");
await shot("mobile-nav-open");

// Expanded sub-navigation inside the sheet
const connectToggle = page.getByRole("button", { name: /^Connect/i }).first();
if (await connectToggle.count()) {
  await connectToggle.click();
  await page.waitForTimeout(400);
  await scan("mobile-nav-expanded");
  await shot("mobile-nav-expanded");
}
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

/* ------------------------ Desktop dropdown menu ------------------------ */
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: /^Plan a Visit/i }).first().click();
await page.waitForTimeout(600);
await scan("desktop-nav-open");
await shot("desktop-nav-open");
await page.keyboard.press("Escape");

/* ---------------------------- Search overlay ---------------------------- */
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: /search/i }).first().click();
await page.waitForTimeout(500);
await scan("search-empty");
await shot("search-empty");
await page.keyboard.type("worship");
await page.waitForTimeout(1200);
await scan("search-results");
await shot("search-results");
await page.keyboard.type("zzzzqqq");
await page.waitForTimeout(1200);
await scan("search-no-results");
await shot("search-no-results");
await page.keyboard.press("Escape");

/* ------------------------------- Forms -------------------------------- */
const forms = [
  { path: "/plan-a-visit", submit: /plan my visit/i, label: "visit" },
  { path: "/prayer", submit: /send prayer request/i, label: "prayer" },
  { path: "/contact", submit: /send message/i, label: "contact" },
  { path: "/testimonies", submit: /share (my|your) testimony|submit/i, label: "testimony" },
];

for (const form of forms) {
  await page.goto(`${BASE}${form.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const button = page.getByRole("button", { name: form.submit }).first();
  if (!(await button.count())) {
    findings.push({ state: `${form.label}-form`, id: "missing-submit", impact: "note", help: "submit button not found", nodes: [] });
    continue;
  }
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await page.waitForTimeout(700);
  await scan(`${form.label}-form-invalid`);
  await shot(`${form.label}-form-invalid`);
}

/* --------------------------- FAQ accordion ---------------------------- */
await page.goto(`${BASE}/plan-a-visit`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// Scoped to the FAQ region so the header's navigation triggers are not matched.
const faq = page.locator("#faq button[aria-expanded]").first();
if (await faq.count()) {
  await faq.scrollIntoViewIfNeeded();
  await faq.click();
  await page.waitForTimeout(500);
  await scan("faq-open");
  await shot("faq-open");
}

/* --------------------------- Keyboard focus --------------------------- */
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const focusOrder = [];
for (let i = 0; i < 14; i += 1) {
  await page.keyboard.press("Tab");
  focusOrder.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return "none";
      const label = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 42);
      const style = getComputedStyle(el);
      return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} "${label}" outline=${style.outlineWidth} ${style.outlineStyle}`;
    }),
  );
}

await browser.close();

writeFileSync(
  `${OUT}/report.json`,
  JSON.stringify({ findings, consoleErrors, focusOrder }, null, 2),
);

console.log(`Interaction violations: ${findings.length}`);
for (const f of findings) console.log(`  [${f.impact}] ${f.state} — ${f.id}\n     ${f.nodes.join("\n     ")}`);
console.log(`Console errors: ${consoleErrors.length}`);
for (const e of consoleErrors) console.log(`  ${e.url} — ${e.text}`);
console.log("Focus order:");
for (const entry of focusOrder) console.log(`  ${entry}`);
