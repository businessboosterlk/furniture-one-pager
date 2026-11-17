# Furniture one-pager: functional first version

## Implemented

- Existing four-stage timber-to-furniture hero, rooms, product gallery and craft sections retained.
- Three generated asset sheets provide 27 illustrative sofa configurations: 3 styles × 3 seat counts × 3 fabrics.
- The configurator changes the visible sofa, width, selection summary and enquiry brief together.
- Design-only local storage; shareable style/size/fabric URL; reset control.
- Product image enlargement in an accessible native dialog with Escape and close control.
- Product and room enquiry links populate the enquiry builder.
- Enquiry copy and text download. No automatic submission or server storage; personal data is never saved to local storage.
- WhatsApp enquiry button activates when a real number replaces the dummy in src/site.config.ts. No dummy-number redirects on the page.
- Directions and call controls show only when real contact/address configuration is present.
- FAQ and reduced-motion support. No checkout, payments or inventory backend.

## Required before treating it as a real client launch

1. Confirm the actual brand; Daru and product names remain concept names.
2. Replace the WhatsApp number, telephone and phone label in src/site.config.ts. Supply the actual address/hours for directions.
3. Approve the actual products, dimensions, materials, availability, prices, delivery and warranty. Pricing is intentionally quote-based, not invented.
4. Replace generated studies with actual stock photography wherever product fidelity matters. Generated images are visibly disclosed.
5. Keep staging/noindex until the business information is approved. The existing GitHub Pages audience and deployment workflow are unchanged.

## Generated assets

Built-in image generation, 17 November 2026. No paid API fallback.

- public/configurator/round.webp
- public/configurator/slim.webp
- public/configurator/low.webp

Each is a 3×3 contact sheet used through an overflow-clipped image viewport, not 27 duplicated downloads. Rows: 2, 3, 4 seats. Columns: natural linen, oatmeal, stone grey. WebP conversion only, no content editing. Original generator PNGs remain in the user's generated_images folder.

## Prompt set

Use the following prompt once per style, substituting SHAPE with:

1. rounded chunky timber arms, upright cushioned back
2. slender straight timber arms, upright cushioned back
3. low sculptural timber arms and a visibly lower backrest

> Generate a product-mockup asset sheet for an interactive furniture configurator. A precise seamless 3 by 3 grid filling a square high-resolution canvas, 9 equal square cells, NO borders, NO text, NO labels. Each cell contains exactly one complete photorealistic sofa with warm honey timber exposed frame and SHAPE. Same front three-quarter camera, soft studio light, pure warm ivory background #F4EFE6 throughout. Each sofa centered in its cell, generous margin, entire feet visible, no clipping. COLUMNS from left to right: cream natural linen upholstery; warm oatmeal woven upholstery; medium grey stone woven upholstery. ROWS top to bottom: compact two-seat sofa with two seat cushions; medium three-seat sofa with three seat cushions; wide four-seat sofa with four seat cushions. Match the timber color and design family across all 9 cells; only seating width and fabric change. Wide sofas fit inside cell by natural framing, never stretched geometry. Premium realistic wood grain, fabric weave and soft contact shadow. No people, room, plants, tables, logos or additional objects. This is a single nine-cell asset sheet, uniform alignment, no text.

## Browser QA

All 27 combinations selected and confirmed against rendered preview state with all 3 asset sheets loaded. Enquiry prefill, copy/download, enlarged product dialog and URL-driven design selection checked locally. Do not interpret this as testing real WhatsApp delivery; the real recipient is not supplied.
