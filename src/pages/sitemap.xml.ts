// sitemap.xml from the pages that exist, at build time. No integration needed for a small site.
import type { APIRoute } from 'astro';
import { site } from '../site.config';

const pages = import.meta.glob('./**/*.astro', { eager: false });

export const GET: APIRoute = () => {
  const urls = Object.keys(pages)
    .map((p) => p.replace(/^\.\//, '').replace(/\.astro$/, ''))
    .filter((p) => !/^404$|(^|\/)_/.test(p))
    .map((p) => (p === 'index' ? '/' : '/' + p.replace(/\/index$/, '') + '/'))
    .sort();
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${new URL(u, site.url).href}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
