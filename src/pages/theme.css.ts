// The client's colours from site.config.ts, written at build time as a real stylesheet (/theme.css).
// A file, not an inline <style> or style attribute, so the strict CSP needs no hash and no 'unsafe-inline'.
// This site is light only: ivory paper, ink text, timber as the one warm accent.
import type { APIRoute } from 'astro';
import { site } from '../site.config';

const c = site.colours;

export const GET: APIRoute = () =>
  new Response(
    `:root{--ink:${c.ink};--paper:${c.paper};--muted:${c.muted};--line:${c.line};--accent:${c.accent};color-scheme:light}
`,
    { headers: { 'Content-Type': 'text/css; charset=utf-8' } },
  );
