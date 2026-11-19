# Furniture website — Claude final-edit handover
Updated: 19 November 2026

## Completion status
The four-product expansion is implemented, not just proposed. Browser checks confirmed finish changes and a coffee-table enquiry carrying its chosen deep walnut tone. Build, typecheck and nine automated checks passed. The new architectural hero remains an asset candidate for your final editing; the existing live hero is preserved. Do not report the new hero as already integrated.

## Start here
Finish the EXISTING website, not a new scaffold.
- Public site: https://businessboosterlk.github.io/furniture-one-pager/
- Repository: https://github.com/businessboosterlk/furniture-one-pager
- Local checkout: /Users/thulaibhassen/.codex/.chatgpt-projects/g-p-685024c3ceac8191850e42383d44643e/furniture-one-pager-polish
- Framework: Astro static, plain browser JS, local fonts, GitHub Pages.
- First inspect git status and preserve unrelated edits. Pull only after checking local changes. Do not delete or overwrite existing generated assets.
- User wants a distinctive premium furniture site, with the raw-material-to-beautiful-furniture idea and meaningful customisation across products.
- Latest user specifically asks for images to be generated and added, then for Claude to do final editing. Image generation is now done for the bounded expansion below.

## What is already implemented
- Room-first hero: no long scroll trap; four interactive making chapters.
- Four room views with enquiry hotspots.
- Product gallery and enlargement dialog.
- Sofa configurator: 27 illustrative combinations (3 styles x 3 sizes x 3 upholstery tones).
- Save sofa choices on device, share design URL, reset.
- Enquiry prefill, copy and download. No backend or functioning showroom recipient yet.
- NEW: MoreProducts.astro after the sofa builder, with lounge chair, dining table, bed and coffee table. Each has 3 finishes/tones and a selection-aware enquiry link.
- New selectors are native radios. collection.js updates the visible image and brief. complete.js reads the current data-enquiry at click time.
- All generated imagery must stay labelled as illustrative, not actual stock.

## New image pack — use these files, do not regenerate
Full-resolution PNG originals: handover/originals/
Web JPEG derivatives: public/collection-v2/

| Filename | Content | Mapping |
|---|---|---|
| hero-architecture.jpg / .png | Warm architectural room, sculptural timber/linen sofa and coffee table | Wide editorial hero candidate |
| armchair.jpg / .png | Same chair in 3 upholstery appearances | left cream, middle oatmeal, right charcoal |
| dining.jpg / .png | Same oval double-pedestal dining table | left pale natural, middle warm honey, right deep walnut tone |
| bed.jpg / .png | Same platform bed, white bedding | left pale natural, middle warm honey, right deep walnut tone |
| coffee-table.jpg / .png | Same round crossed-base coffee table | left pale natural, middle warm honey, right deep walnut tone |

The four variant assets are 2172 x 724, three adjacent 724 x 724 cells. Current code displays them in a square overflow-hidden frame with image width 300%, height 100%, left positions 0%, -100%, -200%. These are actual generated material variants, not CSS hue shifts.
No text is baked into the assets.
Originals were generated using the built-in image generation tool; JPEGs are format conversions.
Hero image is a NEW furniture design and does not exactly match the older timber/frame sequence. Do NOT pretend that those older assembly photographs are its precise construction stages.

## The special hero direction to finish
Use the NEW architectural image as a large, image-led opening, with live HTML typography. It is packaged but intentionally not substituted into the old four-stage sequence because its sofa geometry differs.
- Keep headline: “Good wood. Beautiful possibilities.” or refine with the owner.
- Two clear routes: Explore the collection / Make it yours.
- Room must be visible immediately. No loading theatre, enormous blank scroll, or forced carousel.
- Prefer a wide image on desktop with text in clear wall space or an adjacent ivory column. Check actual crop; never cover sofa with copy.
- Make raw timber / joined frame / finished furniture a compact separate “How a piece comes together” study using the MATCHED older assets.
- Subtle optional image reveal, 12–20px copy entrance and very small scroll movement. No fake 3D rotation of a flat photograph.
- Do not add repeated furniture imagery just to fill space.
- Reduced motion: show settled composition immediately.
- If expanding to genuine 3D assembly later, obtain matched models/renders first. Do not claim this photo pack is an exact turntable or construction animation.

## Final customisation architecture
Consolidate existing sofa controls and the new four-product section into one elegant “Make it yours” studio if this improves page length. Preserve functioning code while doing it.
1. Choose product: Sofa / Lounge chair / Dining table / Bed / Coffee table.
2. Show ONLY relevant options:
   - Sofa: existing styles, sizes and fabric tones; existing 27 previews.
   - Lounge chair: cream / oatmeal / charcoal upholstery.
   - Dining table, bed and coffee table: pale / honey / deep timber tones.
3. Keep one large preview, restrained controls, selected summary, clear “Enquire about this design”.
4. Additional size preferences can be a free-text REQUEST, not invented dimensions or a false scaled preview. No image assets exist for extra bed/table sizes.
5. Wood names here are colour descriptions, not species claims. Do not claim “oak” or “walnut” material from an image.
6. Preserve selections when moving between products; use a validated versioned schema if adding persistence.
7. Shared URL must encode product + available variant. Validate unknown values and fall back safely.
8. Brief must contain the selected product and finish, not a stale sofa selection.
9. A model may differ slightly between AI-generated variants; these are concept previews, not manufacturing specifications. Real product photography/model data must replace them before representing an actual catalogue.

## Existing images to retain
- src/assets/stand-ins/: four hero story images, four room views, four product images, joinery/fabric/leg close-ups, workshop and maker photographs.
- public/configurator/{round,slim,low}.webp: existing 3x3 sofa preview sheets.
- Do not regenerate these by default. Use existing assets where appropriate.
- Audit the live page for cropping, repetition and mixed lighting. The new pack supplies ALL additional visuals for the four-product finish expansion; it does not promise an unlimited catalogue.

## Files to inspect/edit
- src/pages/index.astro — section order.
- src/components/Hero.astro; src/styles/hero.css; public/hero.js.
- src/components/Build.astro; public/sections.js; public/complete.js.
- src/components/MoreProducts.astro; src/styles/collection.css; public/collection.js.
- src/components/Enquiry.astro — honest recipient-unconnected state.
- src/layouts/Base.astro — versioned static scripts and style imports.
- src/site.config.ts — draft business facts and placeholders.
- COMPLETION-NOTES.md — previous verification and dependency issues.

## Quality and trust rules
- Daru is a CONCEPT brand name pending client approval.
- Keep generated-image disclosure. No fake reviews, years, certifications, stock, prices or delivery promises.
- Contact details are placeholders. Never enable a false WhatsApp number or fake successful submission.
- Ask owner for real name, WhatsApp, address, hours, confirmed products/materials, prices or quote policy.
- A shared GitHub Pages concept is not a production store. No checkout, payments or live inventory exist.
- Existing dependency audit issues were noted previously. Re-run npm audit, evaluate safe upgrades; do not disable security checks or force breaking dependency changes merely to make CI green.

## Verification before publishing
- npm run build; npm run typecheck; npm test.
- Check all 27 sofa combinations and 12 new material previews; no empty frames or clipped legs.
- Test every product/finish enquiry and verify correct summary.
- Test copied/downloaded brief, reset/share, room hotspots, modal close/Escape/focus.
- Desktop and narrow viewport: no horizontal overflow; controls remain usable.
- No text over important furniture; no obstructed CTAs.
- Keyboard and reduced-motion checks.
- Inspect console and image network loads.
- Use GitHub Pages base-aware paths through withBase. No hardcoded root asset paths.
- Commit only scoped changes, push to existing main when complete, wait for Pages success and inspect deployed page.
- Report actual published URL and unresolved business-data/security blockers honestly.

## Asset-generation prompts
The prompt file IMAGE-PROMPTS.md records the new prompts. No paid API key was used; built-in image generation was used.

