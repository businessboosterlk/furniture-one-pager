# RECIPE: furniture one pager site (header and hero)
Kind: site
Live: staging only, https://businessboosterlk.github.io/furniture-one-pager/ (GitHub Pages, noindex, robots disallow all). Source is in a public repo, https://github.com/businessboosterlk/furniture-one-pager, made public on Thulaib's yes on 15 Nov 2026. No domain.
Ignore: crew/out/*, storyboard/*, dist/*, scripts/hero-shots.mjs, scripts/click-path.mjs
Last verified: 2026-11-15, FURNITURE ONE PAGER 3

Checked by `python3 ~/bb-systems/qa/recipe-check.py ~/bb-websites/furniture-one-pager`. A fresh chat rebuilds from this file alone.

## 1. What it is
The first page of a minimal, classy one page furniture site for a new Sri Lankan client whose name, pieces, prices and photos are not known yet. Only the header and the hero are built so far. The hero tells one story as the visitor scrolls: raw timber, then joined, then the finished piece, then the piece at home. Two doors sit under it, Buy it ready and Build yours. Laptop first: Thulaib said on 15 Nov the phone waits until the client confirms, so the phone layout exists and passes its checks but is not being polished. Front end only, no database, no payments, no form posting. Enquiries go to WhatsApp through a placeholder number. Written 15 Nov 2026, chat FURNITURE ONE PAGER 2. Thulaib approved the hero story on 15 Nov. Polish in chat 3: the hero shows no step words and no numbers; a hairline with four timber marks that fill as you scroll takes their place. The step texts stay for screen readers only.

## 2. Where the source lives
- `~/bb-websites/furniture-one-pager/` is the true copy and a git repo, branch `main`, remote `origin` = `https://github.com/businessboosterlk/furniture-one-pager` (public). Astro 7 static site from the BB Astro foundation starter, master never edited.
- `src/site.config.ts` holds every per-client value and the hero steps. `src/components/Header.astro` and `Hero.astro` were written by the BB Crew. `Picture.astro` shows a marked ivory slot panel when a picture is missing. `Icon.astro` reads `src/data/icons.json`, written by `scripts/build-icons.mjs` from Lucide and Simple Icons.
- `scripts/hero-shots.mjs` takes the four scroll point pictures; `scripts/click-path.mjs` presses the menu, every nav link and both doors on a phone and a desk and counts console errors.
- `public/hero.js` writes only the scroll progress; `public/site.js` runs the menu. CSS in `src/styles/` owns all movement.
- `scripts/slots.json` lists the 22 picture slots; `scripts/make_image_sheet.py` writes `~/Downloads/FURNITURE-ONE-PAGER/STAND-IN-IMAGES.md`.
- Crew briefs and checks: `crew/items-furn-1.jsonl`, `crew/check.mjs`. Moulds: `~/bb-systems/bb-crew/crew/moulds/furn-dsflash.json` and `furn-dspro.json`.
- Notes: `DECISIONS.md`, `CREW-SPEND.md`, `ARCHITECTURE.md`, `STAND-INS.md`, `LOOK.md`.

## 3. Rebuild from nothing
```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd ~/bb-websites/furniture-one-pager
npm install
node scripts/build-icons.mjs
python3 scripts/make_image_sheet.py
# optional, about 0.003 USD: write the two markup parts again
cd ~/bb-systems/bb-crew && node crew/run.mjs furn-dsflash ~/bb-websites/furniture-one-pager/crew/items-furn-1.jsonl --cap 0.05 --task "FURNITURE ONE PAGER 2: header and hero"
cd ~/bb-websites/furniture-one-pager
npm run build
```
The crew outputs land in `~/bb-systems/bb-crew/crew/out/furn-dsflash/`. Judge each with `node crew/check.mjs Header <file>` and `node crew/check.mjs Hero <file>` before copying into `src/components/`.

## 4. Gates
```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd ~/bb-websites/furniture-one-pager
npm run typecheck && npm run lint && npm run build && npm test
node scripts/build-icons.mjs --check
node ~/bb-systems/qa/hand-svg.mjs . --allow components/Icon.astro=2
node ~/bb-systems/qa/device-views.mjs http://localhost:4655/ --brand '.brand'
python3 ~/bb-systems/stack-standard/check_stack.py .
node scripts/serve-with-headers.mjs &          # serves dist on http://localhost:4655 with the real headers
node scripts/click-path.mjs http://localhost:4655/
node ~/bb-systems/qa/speed.mjs http://localhost:4655/ --kind site
python3 ~/bb-consultancy/house_style.py STAND-INS.md
```
Expected: 0 errors, lint clean, 9 of 9 tests, click-path 41 PASS (plus sections-click 48 PASS) and no console error, speed 12 of 12, hand-svg PASS (pass `--allow src/components/Icon.astro=2`), icons match, desk h1 left edge equals brand left edge, no sideways scroll at 1440. Then LOOK at `node scripts/hero-shots.mjs http://localhost:4655/ ~/Downloads/FURNITURE-ONE-PAGER/first-look-2` pictures for all four scroll points.

## 5. Deliver or deploy
```bash
ls -l ~/Downloads/FURNITURE-ONE-PAGER/first-look-2/
git -C ~/bb-websites/furniture-one-pager remote -v
git -C ~/bb-websites/furniture-one-pager log --oneline | head -3
```
The source is in the PUBLIC repo `businessboosterlk/furniture-one-pager` (origin, branch main). Every push to main runs `.github/workflows/staging.yml` (Deploy staging): checkout, Node 22, `npm ci`, `npm run build` with `SITE_URL=https://businessboosterlk.github.io`, `BASE_PATH=/furniture-one-pager` and `STAGING=1`, then GitHub Pages. `STAGING=1` adds noindex, drops the canonical link and makes robots.txt `Disallow: /`. `src/lib/base.ts` (`withBase`) puts the base path on every root link and public asset. A commit is not a deploy: poll the address with a cache-buster after a push. Checked live on 15 Nov: speed 12 of 12, click-path 41 PASS with 0 console errors, home and assets 200. The page shows `[Brand name]`, `[Piece name]` and `LKR [price]` placeholders and marked empty picture slots. No domain is attached. The first look pictures, the live screenshots and the image prompt sheet sit in `~/Downloads/FURNITURE-ONE-PAGER/`.

## 6. Finishing touches
- Scroll is driven by one number, `--p`, written by hero.js; CSS owns every movement | why: JS-driven styles break the strict CSP and stall in hidden tabs | held by: public/hero.js#--p
- Without JS or with reduced motion the hero rests on the finished piece frame | why: nothing may be hidden when script is off | held by: src/styles/hero.css#hero-live
- A missing photo prints a marked ivory slot, never a drawn piece | why: a stand-in is never a shipped scene | held by: src/components/Picture.astro#slot
- Bracket text prints as a dashed timber mark | why: no name, price or fact may be invented | held by: src/lib/ph.ts#ph
- Crew markup must pass the part check before it is copied in | why: Flash once wrote a stray word copied from the brief | held by: crew/check.mjs#holding
- Icons come only from Lucide and Simple Icons | why: nobody draws an icon by hand | held by: scripts/build-icons.mjs#LINE
- Cormorant numerals use lining figures | why: old style figures showed the numeral 1 as a capital I | held by: src/styles/global.css#lining-nums
- No id top on a sticky element | why: the anchor jump lands behind the sticky bar | held by: crew/check.mjs#id
- The hero shows no step words or numbers; the story is told by the pictures, a hairline and four timber marks | why: Thulaib 15 Nov, premium and classy, not a list of steps | held by: src/styles/hero.css#hero__trail
- The step texts stay in the page for screen readers only | why: the story must still be announced | held by: src/components/Hero.astro#class="sr"
- An empty icon link stops the favicon 404 until the client sends a logo | why: a 404 in the console on every page open | held by: src/layouts/Base.astro#rel="icon"
- Phone polish is deferred | why: Thulaib 15 Nov, laptop first, phone after the client confirms | held by: memory only

## 6b. Sections and the paper-matched backdrops (16 Nov 2026)
- The page is Hero (five frames: drawing, timber, joined, finished, at home), Rooms `#rooms`, Ready to buy `#shop`, Build yours `#build`, Detail row `#detail`, Craft band `#craft`, Visit `#visit`, Footer. Components: `src/components/{Rooms,Ready,Build,Details,Craft,Visit,Footer}.astro`; styles `src/styles/sections.css` (phone first, desk layout from 900px); script `public/sections.js` (rooms, ready counter, build state, all external, no inline).
- Every text and value comes from `src/site.config.ts` (`rooms`, `ready`, `build`, `details`, `craft`, `visit`, `site.contact`) and prints through `ph()`.
- Backdrop matching: originals are in `stand-in-originals/` (hero-1-timber, hero-2-joinery, hero-3-piece, build-drawing). `scripts/match-paper.sh <slot> x0 y0 x1 y1` (percent box of the piece and its shadow) rewrites `src/assets/stand-ins/<slot>.jpg` so the backdrop is exactly `#F4EFE6`. Needs ImageMagick (`magick`).
- `room-1.jpg` is `magick hero-4-home.jpg -crop 2000x1333+0+380 +repage`.
- Extra checks: `node scripts/sections-click.mjs <url>` presses every room tab, Next room, dot, Buy, preset, size, fabric, Send, Call and footer link (48 PASS expected); `node scripts/section-shots.mjs <url> <outdir>` writes a phone and a desk picture of every section and fails on sideways scroll or a console error; `node scripts/hero-shots.mjs <url> <outdir>` shows the five hero frames.
- Rules kept: no inline script or style, no new external host, no form, WhatsApp and tel links only.

## 7. Cast a copy
For another client: change `src/site.config.ts`, the colours in the same file, and `scripts/slots.json`; rewrite the brand placeholders; keep the hero step order and the class vocabulary. Never edit the foundation starter or the storyboard it came with.

## 8. Not on disk
The crew's raw answers live in `~/bb-systems/bb-crew/crew/out/`. Writing new parts needs `~/.bb-secrets/deepinfra.env`. The real client name, pieces, prices and photos do not exist yet. The ChatGPT hero link Thulaib mentioned was not found.
