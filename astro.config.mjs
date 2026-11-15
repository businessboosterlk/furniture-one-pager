// BB Astro foundation. Static output, no client script, CSP written by Astro onto every page.
// The per-client values live in src/site.config.ts; this file only holds build settings.
import { defineConfig } from 'astro/config';
import { site } from './src/site.config.ts';

// SITE_URL and BASE_PATH come from the deploy workflow, so the same source builds for the GitHub Pages staging
// preview (https://businessboosterlk.github.io/furniture-one-pager/) and later for the client's own domain at '/'.
export default defineConfig({
  site: process.env.SITE_URL || site.url,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Every stylesheet is a file, never inline, so the header CSP (style-src 'self', no hashes) still holds.
    inlineStylesheets: 'never',
  },
  devToolbar: { enabled: false },
  security: {
    // Astro writes a CSP meta tag on every built page with hashes for anything it inlines.
    // script-src and style-src are filled by Astro ('self' plus hashes); the rest are ours.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
