/**
 * Senior QA pass: crawls every internal route, records console errors, failed
 * requests and broken links, and runs axe-core accessibility checks.
 *
 *   node scripts/audit.mjs [baseUrl]
 */
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const BASE = process.argv[2] ?? "http://localhost:3210";

const consoleErrors = [];
const requestFailures = [];
const brokenLinks = new Map();
const a11yViolations = [];
const visited = new Set();
const queue = ["/"];
const browser = await chromium.launch();
// The crawl runs with reduced motion so axe never measures an element mid-fade
// and reports the transient opacity as a contrast failure.
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
// axe is injected on every document so it is always available after navigation.
await context.addInitScript({ path: axePath });
const page = await context.newPage();

page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push({ url: page.url(), text: message.text() });
  }
});
page.on("pageerror", (error) => {
  consoleErrors.push({ url: page.url(), text: `pageerror: ${error.message}` });
});
page.on("requestfailed", (request) => {
  const failure = request.failure();
  requestFailures.push({ url: request.url(), reason: failure?.errorText ?? "unknown" });
});

while (queue.length > 0) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);

  const response = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  const status = response?.status() ?? 0;
  if (status >= 400) brokenLinks.set(path, status);

  // XML and other non-HTML documents have nothing to audit visually.
  const isHtml = (response?.headers()["content-type"] ?? "").includes("text/html");
  if (!isHtml) continue;

  // Entrance animations must settle first, otherwise mid-fade opacity is read
  // as a contrast failure.
  await page.waitForTimeout(1500);

  // Accessibility
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
    });
  });
  for (const violation of results.violations) {
    a11yViolations.push({
      path,
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")),
    });
  }

  // Collect links
  const links = await page.$$eval("a[href]", (anchors) => anchors.map((a) => a.getAttribute("href")));
  for (const href of links) {
    if (!href) continue;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("http")) {
      if (!href.startsWith(BASE)) continue;
    }
    const url = href.startsWith("http") ? href.replace(BASE, "") : href;
    const clean = url.split("#")[0];
    if (!clean.startsWith("/")) continue;
    if (!visited.has(clean)) queue.push(clean);
  }
}

// Screenshots at three breakpoints for the key journeys
const shots = [
  ["/", "home"],
  ["/plan-a-visit", "plan-a-visit"],
  ["/connect", "connect"],
  ["/our-heart", "our-heart"],
  ["/sermons", "sermons"],
  ["/events", "events"],
  ["/ministries", "ministries"],
  ["/give", "give"],
  ["/prayer", "prayer"],
  ["/testimonies", "testimonies"],
  ["/watch-live", "watch-live"],
  ["/leadership", "leadership"],
  ["/contact", "contact"],
  ["/nonexistent-page", "404"],
];

const breakpoints = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 1000 },
];

/** Scrolls the page so lazy images load, then waits for them to decode. */
async function settleMedia(target) {
  await target.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await target
    .waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 15000 })
    .catch(() => {});
  await target.waitForTimeout(400);
}

for (const bp of breakpoints) {
  const shotPage = await context.newPage();
  await shotPage.setViewportSize({ width: bp.width, height: bp.height });
  for (const [path, name] of shots) {
    await shotPage.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await settleMedia(shotPage);
    const brokenImages = await shotPage.evaluate(() =>
      [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    );
    if (brokenImages.length > 0) {
      requestFailures.push({ url: `${path} (${bp.name})`, reason: `broken images: ${brokenImages.join(", ")}` });
    }
    await shotPage.screenshot({
      path: `.audit/${name}-${bp.name}.png`,
      fullPage: bp.name !== "desktop",
    });
    if (bp.name === "desktop") {
      await shotPage.screenshot({ path: `.audit/${name}-desktop-full.png`, fullPage: true });
    }
  }
  await shotPage.close();
}

await browser.close();

const summary = {
  pagesVisited: [...visited].sort(),
  brokenLinks: [...brokenLinks.entries()],
  consoleErrors,
  requestFailures,
  a11yViolations,
};

require("node:fs").writeFileSync(".audit/report.json", JSON.stringify(summary, null, 2));

console.log(`Pages visited: ${visited.size}`);
console.log(`Broken links: ${brokenLinks.size}`);
console.log(`Console errors: ${consoleErrors.length}`);
console.log(`Failed requests: ${requestFailures.length}`);
console.log(`A11y violations: ${a11yViolations.length}`);
for (const violation of a11yViolations) {
  console.log(`  [${violation.impact}] ${violation.path} — ${violation.id}: ${violation.nodes.join(", ")}`);
}
for (const error of consoleErrors) console.log(`  console: ${error.url} — ${error.text}`);
for (const failure of requestFailures) console.log(`  request: ${failure.url} — ${failure.reason}`);
for (const [path, status] of brokenLinks) console.log(`  broken: ${path} — ${status}`);
