// Machine check for a crew part. node crew/check.mjs <Header|Hero> <file.astro>   Exit 0 = pass, 1 = fail with reasons.
import { readFileSync } from 'node:fs';
const [part, file] = process.argv.slice(2);
const src = readFileSync(file, 'utf8');
const need = {
  Header: ['class="site-header"', 'class="site-header__bar gutter"', 'data-menu-toggle', 'aria-controls="site-menu"', 'id="site-menu"', 'site-nav__link', 'site-header__cta', 'waLink(', 'site.nav.map', '<Icon name="menu"', '<Icon name="close"', '<Icon name="chat"'],
  Hero: ['class="hero"', 'data-hero', 'class="hero__track"', 'class="hero__stage gutter"', 'class="hero__copy"', 'class="hero__eyebrow"', 'class="hero__name"', 'id="hero-title"', 'class="hero__lede"', 'class="hero__doors"', 'btn btn--solid', 'btn btn--line', 'class="hero__media"', 'class="hero__frame"', 'class="hero__trail"', 'class="hero__mark"', '<Picture', '<Icon name="arrow"', 'set:html={ph(hero.piece.name)}', 'set:html={ph(hero.piece.price)}'],
}[part];
const ban = [[/style=/, 'style attribute'], [/<style/, 'style block'], [/<script/, 'script tag'], [/id="top"/, 'id top'], [/\son[a-z]+=/, 'inline handler'], [/—/, 'em dash'], [/\sd="/, 'svg path data'], [/ holding /, 'stray brief word']];
const bad = [];
for (const n of need) if (!src.includes(n)) bad.push('missing: ' + n);
for (const [re, why] of ban) if (re.test(src)) bad.push('banned: ' + why);
if (part === 'Hero' && (src.match(/hero\.steps\.map/g) || []).length < 2) bad.push('hero.steps.map needed twice');
if (part === 'Header' && !/^---[\s\S]*?---/.test(src)) bad.push('no frontmatter');
if (/```/.test(src)) bad.push('code fence left in file');
if (bad.length) { console.log('FAIL ' + part + ':\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('PASS ' + part);
