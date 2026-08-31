/**
 * Visual QA helper: captures sequential viewport-sized frames for each route so
 * long pages can be reviewed section by section instead of as one tall image.
 *
 *   ROUTES="/,/give" node scripts/frames.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = ".audit/frames";

const routes = (process.env.ROUTES ?? "/").split(",");
const viewports = [
  { key: "d", width: 1440, height: 900 },
  { key: "m", width: 390, height: 844 },
];

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((r) => {
          img.addEventListener("load", r, { once: true });
          img.addEventListener("error", r, { once: true });
        })),
    );
  });
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of routes) {
    const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await settle(page);

    const total = await page.evaluate(() => document.body.scrollHeight);
    const frames = Math.ceil(total / vp.height);
    for (let i = 0; i < frames; i += 1) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vp.height);
      await page.waitForTimeout(220);
      const index = String(i).padStart(2, "0");
      await page.screenshot({ path: `${OUT}/${name}-${vp.key}-${index}.png` });
    }
    process.stdout.write(`${name} ${vp.key}: ${frames} frames\n`);
  }

  await context.close();
}

await browser.close();
