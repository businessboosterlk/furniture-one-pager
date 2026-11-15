// robots.txt pointing at the sitemap on the client's own address.
import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { STAGING } from '../lib/base';

export const GET: APIRoute = () =>
  new Response(STAGING ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
