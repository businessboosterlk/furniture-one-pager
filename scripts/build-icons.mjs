// EVERY ICON ON THIS SITE COMES FROM A LICENSED ICON SET. NOBODY DRAWS ONE BY HAND.
// Copied from ~/bb-websites/bswl/scripts/build-icons.mjs (Lucide ISC via lucide-static, Simple Icons CC0 via simple-icons).
// It writes src/data/icons.json. Icon.astro only reads that file. `--check` fails if the file differs from what the
// packages produce, which proves no icon was edited or added by hand.
//   node scripts/build-icons.mjs          write
//   node scripts/build-icons.mjs --check  verify
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const LINE = { // our name : Lucide file
  menu: 'menu', close: 'x', arrow: 'arrow-right', chat: 'message-circle', pin: 'map-pin', check: 'check',
};
const BRAND = { whatsapp: 'whatsapp', instagram: 'instagram', facebook: 'facebook' };

const inner = (svg) => svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s*\n\s*/g, '').trim();
const out = {
  _source: {
    line: 'lucide-static ' + JSON.parse(readFileSync('node_modules/lucide-static/package.json')).version + ' (ISC)',
    brand: 'simple-icons ' + JSON.parse(readFileSync('node_modules/simple-icons/package.json')).version + ' (CC0-1.0)',
  },
  line: {},
  brand: {},
};
for (const [k, f] of Object.entries(LINE)) out.line[k] = inner(readFileSync(`node_modules/lucide-static/icons/${f}.svg`, 'utf8'));
for (const [k, f] of Object.entries(BRAND)) out.brand[k] = inner(readFileSync(`node_modules/simple-icons/icons/${f}.svg`, 'utf8')).replace(/<title>.*?<\/title>/, '');

const next = JSON.stringify(out, null, 1) + '\n';
const file = 'src/data/icons.json';
if (process.argv.includes('--check')) {
  if (!existsSync(file) || readFileSync(file, 'utf8') !== next) {
    console.error('icons.json does not match the icon packages. Run: node scripts/build-icons.mjs');
    process.exit(1);
  }
  console.log('icons.json matches the packages:', Object.keys(out.line).length, 'line,', Object.keys(out.brand).length, 'brand');
} else {
  writeFileSync(file, next);
  console.log('wrote', file, Object.keys(out.line).length, 'line,', Object.keys(out.brand).length, 'brand');
}
