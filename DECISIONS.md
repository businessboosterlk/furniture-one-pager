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
| Names | `[Brand name]`, `[Piece name]`, `LKR [price]` | The Cove or any invented name | Client facts are unknown |

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
