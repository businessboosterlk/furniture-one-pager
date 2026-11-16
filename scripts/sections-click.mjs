/* global document, history, getComputedStyle */
// Presses every control in sections 3 to 8 in a real browser and checks what it did.
// node scripts/sections-click.mjs <url>   (the nav and the two doors are pressed by scripts/click-path.mjs)
import { launch } from '/Users/thulaibhassen/bb-systems/ask-bb-doors/scripts/lib/browser.mjs';
const url = process.argv[2];
const b = await launch();
let fails = 0;
const ok = (c, m) => { console.log(c ? 'PASS' : 'FAIL', m); if (!c) fails++; };
for (const [name, w, h, mobile] of [['desk', 1440, 900, false], ['phone', 390, 844, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  const hist0 = await page.evaluate(() => history.length);
  const cur = () => page.evaluate(() => ({ n: document.querySelector('[data-rooms-n]').textContent, a: [...document.querySelectorAll('.room[data-active]')].map((r) => r.dataset.room).join(',') }));
  ok((await page.locator('.rooms--live').count()) === 1, `${name}: rooms went live`);
  for (const k of [3, 2, 4, 1]) {
    await page.locator(`[data-room-tab="${k}"]`).click();
    const c = await cur();
    ok(c.a === String(k) && c.n === `0${k}`, `${name}: room tab ${k} shows room ${k} and counter 0${k}`);
  }
  for (const want of [2, 3, 4, 1]) {
    await page.locator('[data-rooms-next]').click();
    const c = await cur();
    ok(c.a === String(want), `${name}: Next room shows room ${want}`);
  }
  const dots = await page.locator('.room[data-active] .dot').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(dots.length === 2 && dots.every((d) => d.startsWith('https://wa.me/') && decodeURIComponent(d).includes('ask about the ')), `${name}: both piece dots open WhatsApp`);
  const inactiveInert = await page.evaluate(() => [...document.querySelectorAll('.room:not([data-active])')].every((r) => r.hasAttribute('inert')));
  ok(inactiveInert, `${name}: hidden rooms cannot be tabbed into`);
  const buys = await page.locator('.card a.btn').evaluateAll((els) => els.map((e) => decodeURIComponent(e.href)));
  ok(buys.length === 4 && ['Ella three-seater', 'Ella armchair', 'Galle side table', 'Galle coffee table'].every((n, i) => buys[i].includes('wa.me/') && buys[i].includes('buy the ' + n)), `${name}: four Buy buttons open WhatsApp naming the piece`);
  // Build yours
  const pick = async (g, v) => { await page.locator(`#build input[name="${g}"][value="${v}"]`).evaluate((el) => el.closest('label').scrollIntoView({ block: 'center' })); await page.locator(`#build input[name="${g}"][value="${v}"]`).locator('xpath=..').click(); };
  const state = () => page.evaluate(() => ({ sum: document.querySelector('[data-sum]').textContent, href: decodeURIComponent(document.querySelector('[data-send]').href), steps: [...document.querySelectorAll('.steps li')].map((l) => l.dataset.state || '-').join(','), weave: [...document.querySelectorAll('.weave__item')].map((f) => getComputedStyle(f).opacity).join(',') }));
  let s = await state();
  ok(s.steps === 'now,-,-,-', `${name}: build starts at step 1 (${s.steps})`);
  await pick('preset', 2); s = await state();
  ok(s.sum.includes('02') && s.steps === 'done,now,-,-', `${name}: preset 2 chosen, step 2 is next (${s.steps})`);
  await pick('size', 3); s = await state();
  ok(s.sum.includes('Four-seater') && s.steps === 'done,done,now,-', `${name}: size 3 chosen (${s.steps})`);
  await pick('fabric', 2);
  await page.waitForTimeout(600);
  s = await state();
  ok(s.sum.includes('Oat handloom cotton') && s.steps === 'done,done,done,now', `${name}: fabric 2 chosen, step 4 is next (${s.steps})`);
  ok(s.weave === '0,1,0', `${name}: the weave close-up follows the fabric (${s.weave})`);
  ok(s.href.includes('02 Ella, slim arm') && s.href.includes('Size: Four-seater, 2300 mm') && s.href.includes('Fabric: Oat handloom cotton') && s.href.includes('wa.me/'), `${name}: the WhatsApp message carries the choices`);
  const popup = page.waitForEvent('popup', { timeout: 3000 }).catch(() => null);
  await page.locator('[data-send]').scrollIntoViewIfNeeded();
  await page.locator('[data-send]').click();
  await popup;
  s = await state();
  ok(s.steps === 'done,done,done,done', `${name}: Send marks step 4 done (${s.steps})`);
  const hist1 = await page.evaluate(() => history.length);
  ok(hist1 === hist0, `${name}: none of these presses added a history entry`);
  // Visit
  const v = await page.locator('#visit a.btn').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(v.length === 2 && v[0].startsWith('https://wa.me/') && v[1].startsWith('tel:'), `${name}: WhatsApp us then Call (${v.map((x) => x.slice(0, 14)).join(' | ')})`);
  // footer links
  const f = await page.locator('.site-footer__nav a').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(f.join() === '#shop,#build,#craft,#visit', `${name}: footer links go to the four sections`);
  ok(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), `${name}: no sideways scroll after pressing everything`);
  ok(errors.length === 0, `${name}: console errors ${errors.length} ${errors.join(' | ')}`);
  await ctx.close();
}
await b.close();
process.exit(fails ? 1 : 0);
