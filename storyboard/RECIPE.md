# RECIPE: furniture one pager storyboard
Kind: deck
Live: ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf
Ignore: index.html, items-F03-F04.jsonl, items-F01-F02-F05-F06-F07-F08-F09-F10-F11-F12-F13-F14-F15-F16.jsonl
Last verified: 2026-11-15, FURNITURE ONE PAGER 1

Checked by `python3 ~/bb-systems/qa/recipe-check.py ~/bb-websites/furniture-one-pager/storyboard`. A fresh chat rebuilds from this file alone.

## 1. What it is
A minimal, classy one page furniture site storyboard for a new Sri Lankan furniture client whose name, pieces, prices and photos are not known yet. Ten A3 landscape pages: cover, eight sections (phone and desk side by side, each a separate design) and a next steps page. Every name, price and photo is a dashed timber placeholder. The sixteen frames (F01 to F16) are written by the BB Crew on the DeepSeek flash mould; build.py puts them in the page frames. Written 15 Nov 2026, chat FURNITURE ONE PAGER 1. Thulaib has not yet approved it.

## 2. Where the source lives
- `~/bb-websites/furniture-one-pager/storyboard/` is the true copy: `build.py` (page, phone and desk frames, notes, cover, last page), `style.css` (house tokens and the frame class vocabulary), `render.mjs` (PDF plus overflow report), `make_items.py` (frame contract and the sixteen briefs), `extract.py` (crew answers to `frames/Fnn.html`), `frames/` (the crew's fragments), `blends/` (five bb-scout BLEND files), `slots.json` (every picture slot and size), `vendor/` (fonts).
- The crew mould: `~/bb-systems/bb-crew/crew/moulds/furn-sb-dsflash.json`.
- Spend log: `~/bb-websites/furniture-one-pager/CREW-SPEND.md`. Decisions: `~/bb-websites/furniture-one-pager/DECISIONS.md`.
- Prompt sheets: `~/Downloads/FURNITURE-ONE-PAGER/CHATGPT-THREE-LOOKS.md` and `STAND-IN-IMAGES.md`.
- Adapted from the Rathnaweera storyboard builder, which stays untouched.

## 3. Rebuild from nothing
```bash
export PATH=$HOME/.local/node/bin:$PATH
cd ~/bb-websites/furniture-one-pager/storyboard
# frames/ already holds the crew's sixteen fragments. To write them again (about 0.004 USD):
python3 make_items.py
cd ~/bb-systems/bb-crew && node crew/run.mjs furn-sb-dsflash ~/bb-websites/furniture-one-pager/storyboard/items-all.jsonl --cap 0.05 --task "FURNITURE ONE PAGER 1: storyboard"
cd ~/bb-websites/furniture-one-pager/storyboard
python3 extract.py "$(ls -t ~/bb-systems/bb-crew/crew/out/furn-sb-dsflash/run-*.jsonl | head -1)"
python3 build.py
node render.mjs index.html ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf
```

## 4. Gates
```bash
cd ~/bb-websites/furniture-one-pager/storyboard
pdftotext -layout ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf /tmp/fsb-text.txt && python3 ~/bb-consultancy/house_style.py /tmp/fsb-text.txt
node ~/bb-systems/qa/hand-svg.mjs ~/bb-websites/furniture-one-pager/storyboard
for f in blends/*.json; do python3 ~/.claude/skills/bb-scout/blend_check.py "$f"; done
pdftoppm -r 55 -png ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf /tmp/fsb-t
```
Expected: render.mjs prints "CHECK none, no frame overflows"; house_style shows no FAIL; hand-svg PASS; five blends PASS; then LOOK at all ten page images.

## 5. Deliver or deploy
```bash
ls -l ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf
```
Nothing is pushed or deployed. The PDF and the two prompt sheets sit in `~/Downloads/FURNITURE-ONE-PAGER/`.

## 6. Finishing touches
- Nav links are forced to Shop, Build yours, Craft, Visit | why: the crew invented Journal, About, Collection and Contact in four frames | held by: build.py#fix_nav
- Colours, fonts and borders the crew adds inline are stripped so the house tokens rule | why: the crew set its own greys and black on buttons | held by: build.py#clean_style
- Every [bracket] in a frame becomes a dashed timber placeholder | why: no name, price or fact may be invented | held by: build.py#mark
- Page numbers use lining figures | why: Cormorant showed the numeral 1 as a capital I | held by: style.css#lining-nums
- Commas before and or are written out of the notes | why: house style, no serial comma | held by: memory only

## 7. Cast a copy
For another client: change the words in `SECTIONS` in build.py and the briefs in make_items.py, then run section 3. Keep the section order, the class vocabulary and the sixteen frame names. Never edit the Rathnaweera builder it came from.

## 8. Not on disk
The crew's raw answers live in `~/bb-systems/bb-crew/crew/out/furn-sb-dsflash/`. The sixteen frames are copied into `frames/`, so a rebuild needs no key. Writing new frames needs `~/.bb-secrets/deepinfra.env`.
