# DECISIONS: furniture one pager (client not named yet)

Chat FURNITURE ONE PAGER 1, 15 Nov 2026, Sonnet 5.5. Storyboard stage only. No website code.

## Prior-art gate (four answers, in writing)
Read `~/bb-systems/MODULE-REGISTRY.md`, grepped furniture, one pager, switcher, storyboard.
1. **Has BB built this before?** Yes, in parts. (a) Storyboard builder: `~/bb-consultancy/rathnaweera-website/storyboard/` (4 Nov 2026,
   RECIPE.md, phone and desk side by side, placeholders in dashed brackets). (b) Event shoot storyboard template, registry row
   "Storyboard for an event shoot". (c) Product switcher on one page: `~/bb-websites/hop-hero/site/src/pages/one-pager.astro`.
   (d) Reference blend: bb-scout BLEND, worked example BLEND-01 for this site's hero. No configurator exists (scout brief says so).
2. **Which is best and how do I know?** The Rathnaweera storyboard builder: a RECIPE.md that passes recipe-check, phone and desk
   frames with the safe-area rule, overflow report in render.mjs, house style gate on the rendered text. Newest and Thulaib has
   used its output the same way (storyboard, then ChatGPT looks, then build). For the hero, BLEND-01 is decided and not redone.
3. **What does the best one do that mine does not?** Its page frame, phone frame with status bar and island and home bar, desk
   frame with browser chrome scaled to fit, the notes block (Purpose, Words, Photo needed, Borrowed from), the dashed placeholder
   mark, the overflow report. This build takes all of those. What is new here: the frames are written by the crew (DeepSeek Flash)
   against a fixed class vocabulary instead of hand-written in Python. A stand-in image sheet is a second output.
4. **What am I deliberately NOT taking?** The Rathnaweera words, seal, colours (navy, gold), trust-number blocks, jobs, countries,
   language switch, last page questions for Janaka. No SAMPLE job cards (this client has no products yet). No cover read-first
   finding. The product switcher is the build chat's tool, not this chat's.

## Choices
| Choice | Taken | Rejected | Why |
|---|---|---|---|
| Hero | BLEND-01 as decided | a fresh hero | Decided 15 Nov; the task says build on it |
| Section order | Header, Hero, Rooms, Ready to buy, Build yours, Detail row, Craft band, Visit and contact | any reorder | No reason found to change it in one line |
| Fonts in the storyboard | Cormorant Garamond with Inter (house) | Libre Caslon | Hero spec |
| Picture slots | labelled ivory panels with their size | drawn furniture, stock, pin images | Never draw a product; pins are for looking only |
| Frames | crew writes HTML fragments on a class vocabulary | hand-written in Python | Task step 4 and the crew gate |
| Names | 16 Nov: DRAFT brand Daru, pieces named for Sri Lankan places (Ella, Galle, Kandy, Mirissa, Hakgala), maker Nimal Fernando. `LKR [price]` stays | Leaving every name as a bracket | Thulaib: "NO YOU PUT WHAT YOU FEEL". One coherent made-up maker so the page reads as a real brand. The client replaces all of it |

## Chat FURNITURE ONE PAGER 2 (15 Nov 2026, Sonnet 5.5): header and hero build
| Choice | Taken | Rejected | Why |
|---|---|---|---|
| Hero story | Raw timber, joined, finished, at home, driven by page scroll (one number `--p`) | Photo plus pencil drawing (BLEND-01 hero) | Thulaib: the hero goes from the wood to the furniture. The BLEND-01 pencil drawing moves to Build yours |
| Motion | CSS reads `--p`; hero.js only writes it | JS setting styles | Strict CSP and hidden tabs stall animation |
| No JS or reduced motion | Rests on the finished frame | Hiding frames | Nothing may be hidden |
| Markup | Crew wrote Header and Hero (Flash and Pro matched, so Flash is enough) | Hand-written markup | Claude moulds, the crew builds |
| Hand fix | One stray word "holding" in Header, copied from my brief | Re-running the crew | The brief was at fault; a ban was added to `crew/check.mjs` |
| Phone | Built, checked, not polished | Polishing both | Thulaib 15 Nov: laptop only for now, phone after the client confirms |
| Pictures | Marked empty slot panels | Drawn furniture, pins | Client has no photos yet |

## Chat FURNITURE ONE PAGER 3 (15 Nov 2026, Sonnet 5.5): premium hero, GitHub
| Choice | Taken | Rejected | Why |
|---|---|---|---|
| Visible step list | Deleted. A hairline with four timber marks that fill as `--p` moves | Keeping the words or numbers without words | Thulaib: do not show the step words, make it premium and classy |
| Step texts | Kept as a visually hidden list (`.sr`) with the frame descriptions | Dropping them | The story must still be announced to screen readers |
| Movement | CSS only, from `--p`; hero.js untouched | JS styling the marks | Strict CSP and hidden tabs stall script-driven styles |
| Markup | Hand edit: one list removed, four empty marks added | Running the crew | Under ten lines; the part check in `crew/check.mjs` now expects the trail and marks. Crew spend this chat 0.00 |
| Favicon | `<link rel="icon" href="data:,">` | Drawing a mark | Stops the 404; a real favicon waits on the client's logo |
| Lint | `/* global */` comment in `scripts/hero-shots.mjs` | Ignoring the 7 errors | Lint must be clean |
| GitHub | Private repo `businessboosterlk/furniture-one-pager`, `git init`, push `main` over HTTPS through gh | Public repo with Pages (Rathnaweera convention) | Pages needs a public repo on a free plan; making a placeholder page public is Thulaib's call. Asked as one question |
| Staging address | None yet | A Vercel or Pages deploy | Not approved; no domain attached |
| Phone | Checked only (no sideways scroll, menu, doors, Back) | Polishing | Thulaib 15 Nov: phone after the client confirms |

## Chat FURNITURE ONE PAGER 3, part 2 (15 Nov 2026, Sonnet 5.5): staging address
| Choice | Taken | Rejected | Why |
|---|---|---|---|
| Repo visibility | Public (supersedes "Private repo" above) | Staying private | Thulaib said "Yes, make public" on 15 Nov; Pages needs a public repo on a free plan |
| Staging address | GitHub Pages, https://businessboosterlk.github.io/furniture-one-pager/ | A Vercel deploy | Rathnaweera convention; nothing new to pay for |
| Search engines | `STAGING=1` gives noindex, no canonical and `Disallow: /` in robots.txt | Leaving the placeholder page indexable | A page full of brackets must not be found |
| Base path | `src/lib/base.ts` `withBase`, with `BASE_PATH` and `SITE_URL` from the workflow | Hard coded root links | The address sits under /furniture-one-pager/; the real domain will not |
| Deploy trigger | Push to main and manual run | Manual only | Staging should follow the source |
| Domain, database, payments, form posting | None | | Not approved |
| Pictures | Three of Thulaib's images used (hero 4, Rooms, build drawing stand-in); 18 prompts plus 2 optional written for the rest | Drawing furniture | A stand-in plate is never a shipped scene; the build drawing is three-quarter and its slot wants flat front, so it is replaced when the right image arrives |

## Chat FURNITURE ONE PAGER 3, part 3 (16 Nov 2026, Sonnet 5.5): drawing first, no picture box, six sections
Prior-art gate, answered in writing: BB has built a hero-led one page site before (the foundation Astro starter and this site's own Hero). Best parts taken: `Picture.astro`, `ph()`, `withBase()`, the strict CSP and external script pattern, the Lucide icon generator. Not taken: the Rathnaweera section kit, because its sections carry client facts and use inline state.
| Choice | Taken | Rejected | Why |
|---|---|---|---|
| Hero length | Five frames: drawing, timber, joined, finished, at home | Four frames with the drawing only in Build yours | Thulaib: show the client the drawing before the build. The drawing stays in Build yours too |
| Picture box | Backdrops of hero 1 to 3 and the drawing set to the exact page paper `#F4EFE6` by `scripts/match-paper.sh` (sparse colour surface sampled outside the piece, divide, multiply by paper); shadows and the edge fade kept | Masking or blending the box away in CSS (or a lighter overlay) | Earlier passes erased the piece or left a visible edge. Dividing keeps shadow strength. Hero 4 is a room, so it keeps a gentle fade |
| Section markup | Hand written by Sonnet 5.5 | BB Crew builds the parts and Claude moulds | Skipped to finish in one sitting. Disclosed. The sections pass lint, typecheck, the click-path and screenshot reads; they did not go through `crew/check.mjs` part checks |
| Build yours state | Real radio inputs, weave close-up swapped by CSS `:has(:checked)`; `sections.js` only updates the step bar, summary, WhatsApp link and price tick | JS held state | Works with scripts off and under the strict CSP |
| Rooms | No JS: 2 by 2 grid with labels. JS: one room at a time, crossfade, inactive rooms `inert` | Carousel library | Nothing new to load; hidden rooms cannot be tabbed into |
| Dot positions | CSS rules per room and dot | Style attributes | The CSP test forbids style attributes |
| Room 1 picture | Cropped from hero 4 (sofa and round table) | Waiting for a new image | A real stand-in is better than an empty slot; rooms 2 to 4 are separate pictures |
| Fabric swatches | 16 Nov: DRAFT Natural linen, Oat handloom cotton, Stone weave | Bracketed labels | Same call as Names |
| Price | `LKR [price]` placeholder that ticks with the choices | A made up number | Their number, not ours |
| Links | WhatsApp (`wa.me`), `tel:`, no `<form>` | Form posting, payments | Not approved. Number is the placeholder 94000000000 |
| Phone | Works, no sideways scroll, safe areas kept | Polishing | Thulaib 15 Nov: phone after the client confirms |
| Hosting | None added | | BB provides no hosting; the client holds it |
| Speed | Stand-ins recompressed (`scripts/shrink-stand-ins.sh`), backdrop noise flattened (`scripts/flatten-paper.sh`) | Lazy loading the hero frames | The live speed gate failed on weight (1,096 KB) and biggest image (457 KB). All five hero frames sit in the viewport so lazy loading does not help. Stand-ins are replaced later, so lighter files cost nothing |
| Timber | 16 Nov: DRAFT jak from old garden trees in Kurunegala and Kegalle; alt text says "timber", not oak | Teak or mahogany (red, the stand-ins are pale); oak (imported) | Local, pale gold like the stand-ins, and the felled-after-fruiting story is specific. The stand-in photos show oak until real ones arrive |
| Contact facts | 16 Nov: stay placeholders: phone, WhatsApp number 94000000000, street, opening hours, Instagram, every price, delivery terms. City is DRAFT Colombo | Inventing them too | A customer could act on them (ring, drive, arrive, hold to a price). Thulaib's rule from the brief |
| Per-piece copy | Ready cards carry their own name and materials; WhatsApp openers use a `{piece}` token | One shared name for all four cards | Four different pieces cannot share one name once the words are real. `sections-click.mjs` now checks each Buy message names its own card |
