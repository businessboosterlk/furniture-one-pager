# Build notes, 11 Nov 2026

What was run and what it printed. Node 22.14.0, Astro 7.3.8.

## Step 1, last line of each command

- `npm run typecheck`: `- 0 hints` (0 errors, 0 warnings, 0 hints over 16 files)
- `npm run lint`: `> eslint .` (no findings printed, exit 0)
- `npm run build`: `[build] Complete!` (3 pages plus robots.txt, sitemap.xml and theme.css)
- `npm test`: `# duration_ms 169.123208` (9 tests, 9 pass, 0 fail)
- `npm audit`: `found 0 vulnerabilities` (9 moderate advisories in ESLint's minimatch cleared with an override)

The test was proved able to fail: a built page given `'unsafe-inline' https:`, an outside script and a dead link
failed 3 of 9 tests, then a rebuild passed 9 of 9.

## Step 2, foundation gate

Against `astro preview` (no host headers): security red on headers only (no nosniff, no Referrer-Policy, page can
be framed), as expected locally. Against `scripts/serve-with-headers.mjs` on port 4655 with `--as-https`:

```
FOUNDATION GATE  /Users/thulaibhassen/bb-web-templates/astro-foundation  at http://localhost:4655
PASS  security  0 of 15 checks red, 13 green, 2 skipped, 0 warnings. Not run: database half
FAIL  speed     2 budgets over, 11 met
          FAIL  page to page, worst                 never   budget 1,500 ms
        FAIL 1 of 12: page to page, worst
PASS  stack     astro  (~/bb-systems/STACK-STANDARD.md)
PASS  recipe    ~/bb-web-templates/astro-foundation  (4 touches, 4 scripts found)
FOUNDATION GATE: 1 of 4 RED
```

Speed figures (slow 4G phone, median of 3 cold opens): page weight 58 KB, JS 0 KB, first paint 559 ms, main
content 559 ms, layout shift 0.000, blocking scripts 0, biggest image 0 KB, reload 355 ms and 5 KB, one font file
48 KB, 4 requests.

Why speed is red: speed.mjs times the next page with Playwright `waitForFunction`, which Chrome refuses under a CSP
with no 'unsafe-eval' ("Refused to evaluate a string as JavaScript"), so "page to page" reads "never". On a scratch
copy with the CSP meta taken out, served with no headers, the same Contact tap measured 399 ms and speed printed
PASS 12 of 12. The CSP was not weakened. The fix belongs in speed.mjs. The gate says "2 budgets over" because it
also counts the summary line; there is one red budget.

Device views: phone 402x874 heading centred (201.0 of 201), insets read, viewport-fit cover; desk 1440x900 brand
and h1 at x=48, nav at the right edge 1392. PASS.

## Step 3, floor

```
FLOOR  /Users/thulaibhassen/bb-web-templates/astro-foundation  (client build)
SKIP  api-kit     no Next API in this folder
PASS  types       1 type config read, 1 strict
PASS  lint        lint config eslint.config.js
PASS  tests       test script "node --test tests/*.test.mjs"
PASS  ci          1 workflow, 1 on push or pull request, 1 running a check
WARN  handover    0 of 7 ticked with proof, 1 warn
      WARN HANDOVER.md: items not ticked yet. 7 of 7 not ticked; --handover fails each one on the day
PASS  site-floor  3 built pages read, 6 policies found
FLOOR: 7 checks, 0 FAIL, 1 WARN, 1 SKIP
```

The first floor run failed `types` because the strict flag came only from `extends`; `"strict": true` is now
written in tsconfig.json.

## Red, skipped or not proven

- Speed "page to page": red, a speed.mjs limitation under a strict CSP (above).
- Security rate-limit and upload-limit: skipped, a static site has no endpoint.
- Security database half: not run, there is no database.
- HSTS was judged with `--as-https` on a local http server; a real https host is not proven.
- The headers were proven from `scripts/serve-with-headers.mjs`, not from Netlify, Cloudflare or Vercel.
- GitHub Actions workflow: written, never run (no remote, by instruction).
- iOS Simulator and a real phone: not looked at.
- Handover: 7 of 7 unticked, as it should be on the master.
