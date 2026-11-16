# STAND-INS: every AI picture on this site

Chat FURNITURE ONE PAGER 2, 15 Nov 2026. Every picture below is a stand-in made in ChatGPT from the prompts in
`~/Downloads/FURNITURE-ONE-PAGER/STAND-IN-IMAGES.md`. A stand-in is replace before go live: the client's own photos
take its place. Updated 16 Nov 2026: all slots except `map` now hold a stand-in picture; `map` shows its marked slot panel. The hero pictures and the drawing were re-processed so their backdrop equals the page paper (originals kept in `stand-in-originals/`).

How a picture goes in: save it as `src/assets/stand-ins/<slot>.jpg` (the slot name from the table). `Picture.astro` finds it by file name.
Nothing else changes.

| Slot | Size | Group | Status |
|---|---|---|---|
| hero-3-piece | 2400 x 1600 | Hero | stand-in picture; backdrop matched to page paper |
| hero-2-joinery | 2400 x 1600 | Hero | stand-in picture; backdrop matched to page paper |
| hero-1-timber | 2400 x 1600 | Hero | stand-in picture; backdrop matched to page paper (scripts/match-paper.sh) |
| hero-4-home | 2400 x 1600 | Hero | stand-in picture; keeps a gentle edge fade |
| room-1 | 2400 x 1600 | Rooms | derived from hero-4-home (crop of the sofa and round table) |
| room-2 | 2400 x 1600 | Rooms | stand-in picture on disk |
| room-3 | 2400 x 1600 | Rooms | stand-in picture on disk |
| room-4 | 2400 x 1600 | Rooms | stand-in picture on disk |
| card-1 | 1000 x 1250 | Ready To Buy | stand-in picture on disk |
| card-2 | 1000 x 1250 | Ready To Buy | stand-in picture on disk |
| card-3 | 1000 x 1250 | Ready To Buy | stand-in picture on disk |
| card-4 | 1000 x 1250 | Ready To Buy | stand-in picture on disk |
| build-drawing | 1200 x 1200 | Build Yours | stand-in line drawing; used as hero step 1 AND in Build yours; backdrop matched to page paper |
| weave-1 | 800 x 800 | Build Yours | stand-in picture on disk |
| weave-2 | 800 x 800 | Build Yours | stand-in picture on disk |
| weave-3 | 800 x 800 | Build Yours | stand-in picture on disk |
| detail-1 | 800 x 800 | Detail Row | stand-in picture on disk |
| detail-2 | 800 x 800 | Detail Row | stand-in picture on disk |
| detail-3 | 800 x 800 | Detail Row | stand-in picture on disk |
| craft-band | 2400 x 1200 | Craft Band | stand-in picture on disk |
| maker | 600 x 600 | Craft Band | stand-in picture on disk |
| map | 1200 x 800 | Visit | empty slot panel on purpose: there is no map picture until the client gives an address |

Rule: no stand-in goes live. Before any deploy, every row above is replaced by the client's real photo or the slot is cut.
