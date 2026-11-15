// The address prefix the site is served under. '/' on the client's own domain; '/furniture-one-pager/' on the
// GitHub Pages staging preview. Set by BASE_PATH at build time (see astro.config.mjs and the deploy workflow).
const base = String(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

/** withBase('/hero.js') gives '/hero.js' on the client's domain and '/furniture-one-pager/hero.js' on staging. */
export const withBase = (path: string): string => base + path.replace(/^\//, '');

/** True for the staging preview build: noindex, no canonical, robots disallows everything. */
export const STAGING = process.env.STAGING === '1';
