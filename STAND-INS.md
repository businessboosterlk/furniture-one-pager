# STAND-INS: every AI picture on this site

Chat FURNITURE ONE PAGER 2, 15 Nov 2026. Every picture below is a stand-in made in ChatGPT from the prompts in
`~/Downloads/FURNITURE-ONE-PAGER/STAND-IN-IMAGES.md`. A stand-in is replace before go live: the client's own photos
take its place. Today none has been dropped in, so the site shows a marked ivory slot panel for each.

How a picture goes in: save it as `src/assets/stand-ins/<slot>.jpg` (the slot name from the table). `Picture.astro` finds it by file name.
Nothing else changes.

| Slot | Size | Group | Status |
|---|---|---|---|
| hero-3-piece | 2400 x 1600 | Hero | empty slot panel, no picture yet |
| hero-2-joinery | 2400 x 1600 | Hero | empty slot panel, no picture yet |
| hero-1-timber | 2400 x 1600 | Hero | empty slot panel, no picture yet |
| hero-4-home | 2400 x 1600 | Hero | empty slot panel, no picture yet |
| room-1 | 2400 x 1600 | Rooms | empty slot panel, no picture yet |
| room-2 | 2400 x 1600 | Rooms | empty slot panel, no picture yet |
| room-3 | 2400 x 1600 | Rooms | empty slot panel, no picture yet |
| room-4 | 2400 x 1600 | Rooms | empty slot panel, no picture yet |
| card-1 | 1000 x 1250 | Ready To Buy | empty slot panel, no picture yet |
| card-2 | 1000 x 1250 | Ready To Buy | empty slot panel, no picture yet |
| card-3 | 1000 x 1250 | Ready To Buy | empty slot panel, no picture yet |
| card-4 | 1000 x 1250 | Ready To Buy | empty slot panel, no picture yet |
| build-drawing | 1200 x 1200 | Build Yours | empty slot panel, no picture yet |
| weave-1 | 800 x 800 | Build Yours | empty slot panel, no picture yet |
| weave-2 | 800 x 800 | Build Yours | empty slot panel, no picture yet |
| weave-3 | 800 x 800 | Build Yours | empty slot panel, no picture yet |
| detail-1 | 800 x 800 | Detail Row | empty slot panel, no picture yet |
| detail-2 | 800 x 800 | Detail Row | empty slot panel, no picture yet |
| detail-3 | 800 x 800 | Detail Row | empty slot panel, no picture yet |
| craft-band | 2400 x 1200 | Craft Band | empty slot panel, no picture yet |
| maker | 600 x 600 | Craft Band | empty slot panel, no picture yet |
| map | 1200 x 800 | Visit | empty slot panel, no picture yet |

Rule: no stand-in goes live. Before any deploy, every row above is replaced by the client's real photo or the slot is cut.
