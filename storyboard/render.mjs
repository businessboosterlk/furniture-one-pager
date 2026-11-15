// Renders index.html to an A3 landscape PDF and reports any frame whose content overflows. Usage: node render.mjs <index.html> <out.pdf>
import { chromium } from '/Users/thulaibhassen/bb-systems/ask-bb/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import os from 'node:os';
const [src, out] = process.argv.slice(2);
const exe = os.homedir() + '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 1600, height: 1130 } });
await p.goto(pathToFileURL(src).href, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(500);
const rep = await p.evaluate(() => {
  const o = [];
  document.querySelectorAll('.page').forEach((pg, i) => {
    pg.querySelectorAll('.pbody').forEach(pb => {
      const f = pb.querySelector('.f'); if (!f) return;
      const h = Math.max(f.scrollHeight, ...[...f.children].map(c => c.getBoundingClientRect().bottom - pb.getBoundingClientRect().top));
      if (h > pb.clientHeight + 1) o.push(`page ${i + 1}: phone frame content ${Math.round(h)}px in ${pb.clientHeight}px${pb.dataset.crop === '1' ? ' (marked crop)' : ' CLIPPED'}`);
      f.querySelectorAll('*').forEach(el => { if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow === 'visible' && el.children.length === 0 && el.clientWidth > 0) o.push(`page ${i + 1}: phone <${el.tagName.toLowerCase()} class="${el.className}"> sideways ${el.scrollWidth}/${el.clientWidth}`); });
    });
    pg.querySelectorAll('.scr.dk').forEach(dk => {
      const f = dk.querySelector('.f'); if (!f) return;
      const h = Math.max(f.scrollHeight, ...[...f.children].map(c => c.getBoundingClientRect().bottom - f.getBoundingClientRect().top) .map(v => v / (dk.getBoundingClientRect().width / 1440)));
      if (h > 901) o.push(`page ${i + 1}: desk frame content ${Math.round(h)}px in 900px CLIPPED`);
    });
    const body = pg.querySelector('.body'), foot = pg.querySelector('.pfoot');
    if (body && foot && body.getBoundingClientRect().bottom > foot.getBoundingClientRect().top - 6) o.push(`page ${i + 1}: body reaches the footer`);
    const r = pg.querySelector('.rcol');
    if (r && foot && r.getBoundingClientRect().bottom > foot.getBoundingClientRect().top - 6) o.push(`page ${i + 1}: right column reaches the footer`);
  });
  return o;
});
rep.forEach(l => console.log('CHECK', l));
if (!rep.length) console.log('CHECK none, no frame overflows');
await p.pdf({ path: out, width: '420mm', height: '297mm', printBackground: true, preferCSSPageSize: true });
await b.close();
console.log('rendered', out);
