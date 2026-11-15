# Architecture

A static Astro site. No server, no database, no client script. The build writes plain HTML and CSS into `dist/`
and any static host serves it.

## Dependency map

```
src/site.config.ts  (every per-client value)
   |
   +--> astro.config.mjs        site address, static output, CSP directives
   +--> src/layouts/Base.astro  head tags, font, skip link
   |       +--> src/components/Header.astro   brand and nav (phone stacked and centred, desk left and right)
   |       +--> src/components/Footer.astro   address line
   |       +--> src/styles/global.css         gutter, safe-area insets, page layout
   |       +--> @fontsource-variable/inter    self-hosted font files
   +--> src/pages/index.astro, contact.astro (+ ContactLinks.astro), 404.astro
   +--> src/pages/theme.css.ts     colours as CSS variables, written to /theme.css
   +--> src/pages/sitemap.xml.ts   sitemap from the page files
   +--> src/pages/robots.txt.ts    robots.txt pointing at the sitemap

public/_headers  ---->  dist/_headers  ---->  Netlify, Cloudflare Pages
vercel.json      ---->  Vercel (a test checks it matches _headers)
scripts/serve-with-headers.mjs  reads dist/_headers to serve locally with the real headers
tests/build.test.mjs            reads dist/, public/_headers and vercel.json
```

## Outside the folder

`npm run gate` calls `~/bb-systems/qa/foundation-gate.sh` (security, speed, stack standard, recipe).
Nothing else reaches outside this folder.

## Added in chat 2: hero
```
site.config.ts (hero.steps, hero.piece, hero.doors)
   +--> components/Hero.astro (screen reader list + hairline trail) --> components/Picture.astro --> scripts/slots.json, src/assets/stand-ins/<slot>.jpg
   |                          --> components/Icon.astro --> data/icons.json <-- scripts/build-icons.mjs
   +--> components/Header.astro --> public/site.js (menu)
public/hero.js --writes--> --p and data-at on .hero --read by--> styles/hero.css
```
