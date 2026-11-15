/* global document, window */
// Screenshots the hero at four scroll points on a phone and a desk. node scripts/hero-shots.mjs <url> <outdir>
import { launch } from '/Users/thulaibhassen/bb-systems/ask-bb-doors/scripts/lib/browser.mjs';
const [url, out] = process.argv.slice(2);
const b = await launch();
for (const [name, w, h, mobile] of [['phone', 390, 844, true], ['desk', 1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const run = await page.evaluate(() => { const t = document.querySelector('.hero__track'), s = document.querySelector('.hero__stage'); return t.offsetHeight - s.offsetHeight; });
  for (const [i, f] of [0, 0.3, 0.62, 1].entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(run * f));
    await page.waitForTimeout(500);
    const st = await page.evaluate(() => ({ p: document.querySelector('[data-hero]').style.getPropertyValue('--p'), at: document.querySelector('[data-hero]').dataset.at, sx: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log(name, i + 1, JSON.stringify(st));
    await page.screenshot({ path: `${out}/hero-${name}-${i + 1}.png` });
  }
  await ctx.close();
}
await b.close();
