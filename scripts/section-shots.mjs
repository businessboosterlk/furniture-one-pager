/* global document */
// One screenshot of each section on a phone (390x844) and a desk (1440x900), plus the overflow check.
// node scripts/section-shots.mjs <url> <outdir>
import { launch } from '/Users/thulaibhassen/bb-systems/ask-bb-doors/scripts/lib/browser.mjs';
const [url, out] = process.argv.slice(2);
const sections = ['rooms', 'shop', 'build', 'detail', 'craft', 'visit'];
const b = await launch();
let bad = 0;
for (const [name, w, h, mobile] of [['phone', 390, 844, true], ['desk', 1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.querySelector('.site-header').style.visibility = 'hidden'; }); // the sticky bar would sit on top of an element screenshot
  for (const id of sections) {
    const el = page.locator(`#${id}`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.waitForFunction((sel) => [...document.querySelector(sel).querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0), `#${id}`, { timeout: 15000 }); // lazy pictures must be in before the shot
    await el.screenshot({ path: `${out}/${id}-${name}.png` });
  }
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.locator('footer').screenshot({ path: `${out}/footer-${name}.png` });
  const m = await page.evaluate(() => ({ sx: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  console.log(name, JSON.stringify(m), 'console errors:', errors.length, errors.join(' | '));
  if (m.sx > m.cw || errors.length) bad++;
  await ctx.close();
}
await b.close();
process.exit(bad ? 1 : 0);
