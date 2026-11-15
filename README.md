# BB Astro foundation

The technical starter every Business Booster client website is copied from. It carries security and speed from
the first line. It is not a design: the page is plain on purpose.

## Start a new client site

1. Copy the folder. Never edit this master for a client.
   ```bash
   cp -R ~/bb-web-templates/astro-foundation ~/bb-websites/<client-site>
   cd ~/bb-websites/<client-site>
   rm -rf .git node_modules dist .astro && git init
   export PATH="$HOME/.local/node/bin:$PATH" && npm ci
   ```
2. Change `src/site.config.ts`. It holds every per-client value: name, description, address, live address,
   WhatsApp and email, colours and the menu. Every value marked PLACEHOLDER must be replaced; `npm test` lists how
   many are left.
3. Design comes storyboard first, then the build goes on top of this foundation. Keep the rules in `DECISIONS.md`:
   no outside script, no inline script or style, no form posting anywhere while it is a demo.
4. Prove it: `npm run typecheck && npm run lint && npm run build && npm test && npm audit`, then `npm run gate`
   with the live address (see `RECIPE.md`).
5. Fill `HANDOVER.md` with the client before the site is handed over.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | local development server |
| `npm run build` | static site into `dist/` |
| `npm run preview` | serves `dist/` (sends no security headers) |
| `npm run serve:headers` | serves `dist/` with the headers from `public/_headers`, port 4655 |
| `npm run typecheck` | `astro check` |
| `npm run lint` | ESLint with the Astro plugin |
| `npm test` | checks the built pages: CSP, no outside scripts, links resolve, no forms, headers agree |
| `npm run gate` | the BB foundation gate on this folder |

## Hosts and headers

`public/_headers` (Netlify and Cloudflare Pages) and `vercel.json` (Vercel) send the full header set: CSP, HSTS,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy and frame-ancestors. GitHub Pages cannot send custom
headers, so there the CSP meta tag Astro writes on every page is what protects the site. HSTS, nosniff and
frame-ancestors are then missing. Prefer a host that sends headers.
