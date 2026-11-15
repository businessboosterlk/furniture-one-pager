// Proves the built site (dist/) keeps the foundation. Run after `npm run build`: `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHeaders } from '../scripts/serve-with-headers.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}
const files = fs.existsSync(DIST) ? walk(DIST) : [];
const pages = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/');
const read = (f) => fs.readFileSync(f, 'utf8');
const metaCsp = (html) => {
  const tag = html.match(/<meta[^>]+http-equiv=["']?content-security-policy["']?[^>]*>/i);
  const m = tag && tag[0].match(/content="([^"]*)"/i);
  return m ? m[1] : null;
};
const directive = (csp, name) => {
  const d = csp.split(';').map((s) => s.trim()).find((s) => s.split(/\s+/)[0] === name);
  return d ? d.split(/\s+/).slice(1) : null;
};
/** The same rule the floor and the security gate apply to script-src. */
function scriptSrcProblems(csp) {
  const src = directive(csp, 'script-src') ?? directive(csp, 'default-src');
  if (!src) return ['no script-src or default-src'];
  const bad = [];
  if (src.includes("'unsafe-eval'")) bad.push('unsafe-eval');
  if (src.includes("'unsafe-inline'")) bad.push('unsafe-inline');
  for (const s of src) if (['*', 'http:', 'https:', 'data:'].includes(s) || s.includes('*')) bad.push('wildcard ' + s);
  return bad;
}

test('the build output exists', () => {
  assert.ok(fs.existsSync(path.join(DIST, 'index.html')), 'dist/index.html missing: run npm run build');
  for (const p of ['contact/index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', 'theme.css']) {
    assert.ok(fs.existsSync(path.join(DIST, p)), `dist/${p} missing`);
  }
});

test('every built page carries a strict CSP', () => {
  assert.ok(pages.length >= 3, `expected at least 3 pages, found ${pages.length}`);
  for (const f of pages) {
    const csp = metaCsp(read(f));
    assert.ok(csp, `${rel(f)} has no CSP meta tag`);
    assert.deepEqual(scriptSrcProblems(csp), [], `${rel(f)} script-src is loose`);
    assert.deepEqual(directive(csp, 'object-src'), ["'none'"], `${rel(f)} object-src is not 'none'`);
    assert.ok(directive(csp, 'base-uri'), `${rel(f)} has no base-uri`);
  }
});

test('no built page loads an outside script, stylesheet or font', () => {
  for (const f of pages) {
    const html = read(f);
    const outside = [...html.matchAll(/<(script|link)\b[^>]*\b(?:src|href)=["']?((?:https?:)?\/\/[^"'\s>]+)/gi)]
      .filter((m) => m[1].toLowerCase() === 'script' || /rel=["']?(stylesheet|preload|modulepreload)/i.test(m[0]))
      .map((m) => m[2]);
    assert.deepEqual(outside, [], `${rel(f)} loads from outside`);
  }
  for (const f of files.filter((x) => x.endsWith('.css'))) {
    assert.doesNotMatch(read(f), /@import\s+url\(\s*["']?(https?:)?\/\//i, `${rel(f)} imports from outside`);
    assert.doesNotMatch(read(f), /url\(\s*["']?(https?:)?\/\//i, `${rel(f)} loads a file from outside`);
  }
});

test('no inline script, inline style or style attribute, so the header CSP needs no hashes', () => {
  for (const f of pages) {
    const html = read(f);
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/i, `${rel(f)} has an inline script`);
    assert.doesNotMatch(html, /<style\b/i, `${rel(f)} has an inline style block`);
    assert.doesNotMatch(html, /\sstyle=["']/i, `${rel(f)} has a style attribute`);
    assert.doesNotMatch(html, /\son[a-z]+=["']/i, `${rel(f)} has an inline event handler`);
  }
});

test('every internal link and asset resolves to a built file', () => {
  const missing = [];
  for (const f of pages) {
    for (const m of read(f).matchAll(/\b(?:href|src)=["']?([^"'\s>]+)/gi)) {
      const u = m[1];
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      const p = decodeURIComponent(u.split(/[?#]/)[0]);
      const target = path.join(DIST, p.endsWith('/') ? p + 'index.html' : p);
      if (!fs.existsSync(target)) missing.push(`${rel(f)} -> ${u}`);
    }
  }
  assert.deepEqual(missing, []);
});

test('no form posts anywhere', () => {
  for (const f of pages) assert.doesNotMatch(read(f), /<form\b/i, `${rel(f)} has a form`);
});

test('host header files carry the full set and agree with each other', () => {
  const rules = parseHeaders(fs.readFileSync(path.join(ROOT, 'public/_headers'), 'utf8'));
  const all = rules.find((r) => r.pattern === '/*');
  assert.ok(all, 'public/_headers has no /* rule');
  const need = ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy'];
  for (const h of need) assert.ok(all.headers[h], `_headers lacks ${h}`);
  const csp = all.headers['Content-Security-Policy'];
  assert.deepEqual(scriptSrcProblems(csp), [], 'header CSP script-src is loose');
  assert.ok(directive(csp, 'frame-ancestors'), 'header CSP has no frame-ancestors');
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  const vAll = Object.fromEntries(vercel.headers.find((h) => h.source === '/(.*)').headers.map((h) => [h.key, h.value]));
  assert.deepEqual(vAll, all.headers, 'vercel.json and public/_headers differ');
});

test('html lang is en-GB and the viewport allows safe-area insets', () => {
  for (const f of pages) {
    const html = read(f);
    assert.match(html, /<html[^>]*lang="en-GB"/, `${rel(f)} lang`);
    assert.match(html, /viewport-fit=cover/, `${rel(f)} viewport-fit`);
    assert.match(html, /<title>[^<]+<\/title>/, `${rel(f)} title`);
    assert.match(html, /<link rel="canonical"/, `${rel(f)} canonical`);
  }
});

test('placeholders left in site.config.ts (a warning on the master, must be zero on a client site)', (t) => {
  const n = (fs.readFileSync(path.join(ROOT, 'src/site.config.ts'), 'utf8').match(/PLACEHOLDER \*\//g) || []).length;
  if (n) t.diagnostic(`${n} values in src/site.config.ts are still marked PLACEHOLDER`);
  assert.ok(true);
});
