/* global document, location */
// Presses the menu (phone), the nav links and both hero doors in a real browser. node scripts/click-path.mjs <url>
import { launch } from '/Users/thulaibhassen/bb-systems/ask-bb-doors/scripts/lib/browser.mjs';
const url = process.argv[2] || 'http://localhost:4655/';
const b = await launch();
let bad = 0;
const say = (ok, msg) => { if (!ok) bad++; console.log(ok ? 'PASS' : 'FAIL', msg); };
const errs = [];
for (const [name, w, h, mobile] of [['desk', 1440, 900, false], ['phone', 390, 844, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  const toggle = page.locator('[data-menu-toggle]');
  if (mobile) {
    await toggle.click();
    await page.waitForTimeout(300);
    say((await toggle.getAttribute('aria-expanded')) === 'true', `${name}: menu opens`);
    const nav = page.locator('#' + (await toggle.getAttribute('aria-controls')));
    say(await nav.locator('a').first().isVisible(), `${name}: menu links visible`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    say((await toggle.getAttribute('aria-expanded')) === 'false', `${name}: Escape closes the menu`);
    await toggle.click();
    await page.waitForTimeout(200);
    await toggle.click();
    await page.waitForTimeout(200);
    say((await toggle.getAttribute('aria-expanded')) === 'false', `${name}: second tap closes the menu`);
  }
  const navN = await page.locator('.site-nav a').count();
  const doorN = await page.locator('.hero__doors a').count();
  const targets = [];
  for (let i = 0; i < navN; i++) targets.push(['nav', i]);
  for (let i = 0; i < doorN; i++) targets.push(['door', i]);
  for (const [kind, i] of targets) {
    await page.goto(url, { waitUntil: 'networkidle' });
    if (kind === 'nav' && mobile) { await page.locator('[data-menu-toggle]').click(); await page.waitForTimeout(250); }
    const loc = page.locator(kind === 'nav' ? '.site-nav a' : '.hero__doors a').nth(i);
    const label = (await loc.textContent()).trim().replace(/\s+/g, ' ');
    const href = await loc.getAttribute('href');
    await loc.click();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => ({ h: location.hash, sx: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    say(after.h === href, `${name}: ${kind} "${label}" goes to ${href}, hash now ${after.h}`);
    say(after.sx <= after.cw, `${name}: no sideways scroll after "${label}"`);
    await page.goBack();
    await page.waitForTimeout(300);
    const back = await page.evaluate(() => location.hash);
    say(back === '', `${name}: one Back undoes "${label}" (hash ${back || 'none'})`);
  }
  await ctx.close();
}
say(errs.length === 0, `console errors: ${errs.length} ${errs.join(' | ')}`);
await b.close();
process.exit(bad ? 1 : 0);
