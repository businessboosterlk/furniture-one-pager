// Serves dist/ on localhost with the SAME headers as public/_headers, read from that file.
// Why: `astro preview` does not send the host header files, so the live half of the security gate
// would only see what a host with no headers sends. This shows what Netlify or Cloudflare will send.
//   node scripts/serve-with-headers.mjs [port]      (default 4655, localhost only)
// Unknown paths get dist/404.html with status 404 and the same headers. Nothing else, no directory listing.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 4655);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon',
};

/** Parse the Netlify/Cloudflare _headers format: a path line, then indented "Name: value" lines. */
export function parseHeaders(text) {
  const rules = [];
  let cur = null;
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) { cur = null; continue; }
    if (!/^\s/.test(line)) { cur = { pattern: line.trim(), headers: {} }; rules.push(cur); continue; }
    if (cur) { const i = line.indexOf(':'); cur.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  }
  return rules;
}
const matches = (pattern, p) => pattern.endsWith('*') ? p.startsWith(pattern.slice(0, -1)) : p === pattern;

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('no dist/index.html: run npm run build first'); process.exit(2); }
  const rules = parseHeaders(fs.readFileSync(path.join(DIST, '_headers'), 'utf8'));
  http.createServer((req, res) => {
    let urlPath;
    try { urlPath = decodeURIComponent(new URL(req.url || '/', 'http://x').pathname); }
    catch { urlPath = '/__bad__'; }
    const headers = {};
    for (const r of rules) if (matches(r.pattern, urlPath)) Object.assign(headers, r.headers);
    let file = path.normalize(path.join(DIST, urlPath));
    if (!file.startsWith(DIST)) file = '';
    if (file && fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const ok = req.method === 'GET' || req.method === 'HEAD';
    const found = ok && file && fs.existsSync(file) && fs.statSync(file).isFile() && path.basename(file) !== '_headers';
    const send = found ? file : path.join(DIST, '404.html');
    const status = !ok ? 405 : found ? 200 : 404;
    res.writeHead(status, { ...headers, 'Content-Type': TYPES[path.extname(send)] || 'application/octet-stream' });
    if (req.method === 'HEAD' || !ok) return res.end();
    fs.createReadStream(send).pipe(res);
  }).listen(PORT, '127.0.0.1', () => console.log(`serving dist with _headers at http://localhost:${PORT}`));
}
