#!/usr/bin/env python3
"""Writes ~/Downloads/FURNITURE-ONE-PAGER/STAND-IN-IMAGES.md and scripts/slots.json.

One source for the THEME paragraph and every picture slot. Each ChatGPT prompt in the sheet
repeats the full THEME, so one copy and paste is one finished prompt.
Run: python3 make_image_sheet.py
"""
import json
from pathlib import Path

OUT = Path.home() / "Downloads/FURNITURE-ONE-PAGER/STAND-IN-IMAGES.md"
SLOTS_JSON = Path(__file__).with_name("slots.json")

THEME = (
    "THEME. Quiet editorial furniture photography for a calm, premium Sri Lankan furniture house. "
    "Soft north-window daylight from the left, about 5200K, gentle falloff, no hard shadows, no flash, no glow. "
    "Palette: ivory (#F4EFE6) for every wall and ground, ink (#2A211B) only for the deepest shadow or a dark band, "
    "one timber tone (#9A6A3F) as the single warm accent. "
    "Shot on a 35 mm lens at f/5.6, camera at 1.2 m for single pieces and 1.4 m standing height for rooms, "
    "level horizon, straight verticals. Close-ups use a 100 mm macro lens instead. "
    "Matte finish, fine natural film grain, true colour, sharp detail, no HDR, no oversaturation. "
    "Real solid timber with visible grain and a few small knots, never plastic or CGI smooth. "
    "No people, no faces, no text, no logos, no watermark, no brand marks. Hands appear only where this prompt asks, never a face. "
    "At most one plant leaf or one plain ceramic as a prop."
)

PIECE = "a three-seat sofa with a slim solid timber frame, oatmeal linen cushions and tapered legs"

# key, final size, shape to ask ChatGPT for, group, attach, prompt body, note
SLOTS = [
    # HERO: the wood to house story
    ("hero-3-piece", "2400x1600", "Landscape 3:2", "HERO", "nothing",
     f"The finished piece: {PIECE}, centred, seen from the front three-quarter, standing on a pale ivory floor that runs without a join into a plain ivory wall with one very soft shadow under it. Wide calm space around it. The piece fills about 40 per cent of the picture width. Keep everything important inside the middle 50 per cent of the width.",
     "Make this one FIRST. The other hero pictures and the rooms are edits of it."),
    ("hero-2-joinery", "2400x1600", "Landscape 3:2", "HERO", "hero-3-piece.jpg",
     "Edit the attached picture. Same camera position, same lens, same ivory floor and wall, same light, same angle, same size in frame. Replace the finished piece with the same piece half made: the solid timber frame and legs joined and held square by two plain bar clamps, no cushions and no fabric yet, a few pale shavings on the floor, one hand plane and one wooden mallet resting beside it. No hands.",
     "The camera must not move. If it does, run the edit again."),
    ("hero-1-timber", "2400x1600", "Landscape 3:2", "HERO", "hero-3-piece.jpg",
     "Edit the attached picture. Same camera position, same lens, same ivory floor and wall, same light, same angle. Replace the piece with only the raw material, laid where the piece stood: a neat stack of five rough-sawn solid timber boards with small spacers between them and four square leg blanks leaning against the stack. Untreated pale timber, visible grain, a few knots.",
     "Same footprint as the piece, so the scroll feels like one thing becoming another."),
    ("hero-4-home", "2400x1600", "Landscape 3:2", "HERO", "nothing, it is a copy",
     "Not generated. Make room-1 below, then copy room-1.jpg and rename the copy hero-4-home.jpg.",
     "The finished piece in a real room. It is the same picture as room-1."),
    # ROOMS
    ("room-1", "2400x1600", "Landscape 3:2", "ROOMS", "hero-3-piece.jpg",
     "Use exactly the piece in the attached picture. Create a wide calm room in a Sri Lankan home: one tall window on the left, timber floor, ivory walls, the camera fixed at standing height in one corner looking across the room. Stage it as a living area with this piece and one low timber table. Keep the piece and the table inside the middle 50 per cent of the width.",
     "Keep this chat open. Rooms 2 to 4 are edits of this image."),
    ("room-2", "2400x1600", "Landscape 3:2", "ROOMS", "room-1.jpg",
     "Edit the attached picture. Same room, same window, same floor, same walls, same camera position and lens. Do not move the camera or change the perspective. Replace only the furniture: stage the room as a dining area with a solid timber table and four chairs, inside the middle 50 per cent of the width.",
     "Edit room-1 every time. Never ask for a new room."),
    ("room-3", "2400x1600", "Landscape 3:2", "ROOMS", "room-1.jpg",
     "Edit the attached picture. Same room, same camera, same lens, same window, same floor, same walls. Replace only the furniture: stage it as a bedroom with a timber bed and linen bedding, inside the middle 50 per cent of the width.",
     ""),
    ("room-4", "2400x1600", "Landscape 3:2", "ROOMS", "room-1.jpg",
     "Edit the attached picture. Same room, same camera, same lens, same window, same floor, same walls. Replace only the furniture: stage it as a study with a timber desk, one chair and a shelf, inside the middle 50 per cent of the width.",
     ""),
    # READY TO BUY
    ("card-1", "1000x1250", "Portrait 2:3, I crop to 4:5", "READY TO BUY", "hero-3-piece.jpg",
     "Use exactly the piece in the attached picture. Studio photograph, front three-quarter view, soft shadow on a pale ivory ground, the piece centred with clear space above and below.",
     ""),
    ("card-2", "1000x1250", "Portrait 2:3, I crop to 4:5", "READY TO BUY", "hero-3-piece.jpg",
     "Studio photograph of a solid timber armchair with a linen seat, the same timber and the same ivory ground as the attached picture, front three-quarter view, centred with clear space above and below.",
     ""),
    ("card-3", "1000x1250", "Portrait 2:3, I crop to 4:5", "READY TO BUY", "hero-3-piece.jpg",
     "Studio photograph of a solid timber side table, the same timber and the same ivory ground as the attached picture, front three-quarter view, centred with clear space above and below.",
     ""),
    ("card-4", "1000x1250", "Portrait 2:3, I crop to 4:5", "READY TO BUY", "hero-3-piece.jpg",
     "Studio photograph of a low solid timber coffee table, the same timber and the same ivory ground as the attached picture, front three-quarter view, centred with clear space above and below.",
     ""),
    # BUILD YOURS
    ("build-drawing", "1200x1200", "Square", "BUILD YOURS", "hero-3-piece.jpg",
     "Redraw the attached piece as a fine pencil drawing, flat front view, as an architect would, on ivory paper. Thin graphite line, no shading, no background, no text. Leave clear space around it for dimension lines but draw none and write no numbers.",
     "The only pencil drawing on the page. It lives in Build yours, where it shows the sizes."),
    ("weave-1", "800x800", "Square", "BUILD YOURS", "nothing",
     "Extreme macro photograph of oatmeal linen weave, soft side light, filling the whole square.", ""),
    ("weave-2", "800x800", "Square", "BUILD YOURS", "nothing",
     "Extreme macro photograph of a deep olive boucle fabric, soft side light, filling the whole square.", ""),
    ("weave-3", "800x800", "Square", "BUILD YOURS", "nothing",
     "Extreme macro photograph of warm sand wool fabric, soft side light, filling the whole square.", ""),
    # DETAIL ROW
    ("detail-1", "800x800", "Square", "DETAIL ROW", "nothing",
     "Close-up of a clean solid timber joint where a leg meets the frame, shallow depth of field.", ""),
    ("detail-2", "800x800", "Square", "DETAIL ROW", "nothing",
     "Close-up of a neat stitched seam on an oatmeal linen cushion, shallow depth of field.", ""),
    ("detail-3", "800x800", "Square", "DETAIL ROW", "nothing",
     "Close-up of a tapered solid timber foot standing on a timber floor, shallow depth of field.", ""),
    # CRAFT BAND
    ("craft-band", "2400x1200", "Landscape 3:2, I crop to 2:1", "CRAFT BAND", "nothing",
     "Wide photograph of a pair of hands and forearms planing a solid timber board on a workshop bench, pale shavings curling on the bench, warm low light, the background falling away to ink dark. Hands and forearms only, no face. Keep the hands in the middle band of the picture.",
     "The one dark picture on the page. Hands are allowed here."),
    ("maker", "600x600", "Square", "CRAFT BAND", "nothing",
     "Quiet portrait of a craftsperson's hands and linen apron at a workshop bench, head out of the frame, soft window light, the hands resting on a timber board. No face.",
     "Stand-in only. Replace with the real maker, with their consent."),
    # VISIT
    ("map", "1200x800", "Not generated", "VISIT", "nothing",
     "Not generated. Once the showroom address is known, take a clean screenshot of it on a map. Until then the page shows a marked placeholder.",
     "Only if the client has a showroom."),
]

GROUP_NOTES = {
    "HERO": "Chat A. The wood to house story: four frames, one camera, one footprint. Make hero-3 first.",
    "ROOMS": "Chat B. Make room-1 first, then edit it three times.",
    "READY TO BUY": "Chat C. Attach hero-3-piece.jpg to each.",
    "BUILD YOURS": "Chat C continued.",
    "DETAIL ROW": "Chat D. Nothing to attach.",
    "CRAFT BAND": "Chat D continued.",
    "VISIT": "",
}


def main():
    slots = {k: {"size": s, "group": g.title()} for k, s, _, g, _, _, _ in SLOTS}
    SLOTS_JSON.write_text(json.dumps(slots, indent=1))

    L = []
    a = L.append
    a("# Stand-in pictures for the furniture one pager\n")
    a("Updated 15 Nov 2026 for the new hero: raw timber, then joined, then finished, then in a home. "
      "One ChatGPT image prompt for every picture. 22 files, 20 of them made in ChatGPT, one a copy and one a map screenshot.\n")
    a("**Read this first**")
    a("- These are STAND-INS for a first look. They are made by AI, they are not the client's furniture and they never go live on the client's site. Real photos replace every one.")
    a("- ChatGPT gives pictures about 1500 px on the long side and only in a few shapes (landscape 3:2, portrait 2:3, square). Ask for the shape in the SHAPE column. When you drop the files in `images/` I crop and resize them to the SIZE column.")
    a("- ChatGPT rarely holds one camera spot across several pictures. Hero and rooms depend on it, so follow the edit recipe and expect a second try.")
    a("- Save every file in `~/Downloads/FURNITURE-ONE-PAGER/images/` with the exact file name. JPG for photographs, PNG for the pencil drawing.")
    a("- No face anywhere. Hands appear in two pictures only (craft-band and maker).")
    a("- You do not know the client's piece yet. Any plausible piece will do for a stand-in. The sofa below is just a placeholder: change the words once and use the same piece everywhere.\n")
    a("## The one theme\n")
    a("Every prompt below already starts with this paragraph, so one copy is one finished prompt. It is printed here once so you can see the whole look in one place.\n")
    a("```text\n" + THEME + "\n```\n")
    a("| Rule | Value |\n|---|---|")
    a("| Light | soft north-window daylight from the left, about 5200K, no hard shadows |")
    a("| Palette | ivory #F4EFE6 grounds and walls, ink #2A211B deep shadow only, timber #9A6A3F the one warm note |")
    a("| Lens | 35 mm at f/5.6 for pieces and rooms, 100 mm macro for close-ups |")
    a("| Camera height | 1.2 m for single pieces, 1.4 m standing for rooms, level horizon |")
    a("| Surface | matte, fine natural film grain, true colour, no HDR |")
    a("| Never | people, faces, text, logos, watermarks |\n")
    a("## The hero story, in one sentence\n")
    a("Raw timber becomes a joined frame, then the finished piece, then the piece at home in a room. The same camera never moves.\n")
    a("```\n hero-1-timber  ->  hero-2-joinery  ->  hero-3-piece  ->  hero-4-home\n  raw boards          clamped frame        finished piece     in the room\n  (ivory ground)      (ivory ground)       (ivory ground)     (= room-1)\n```\n")
    a("## Order of work\n")
    a("1. **Chat A, HERO.** hero-3-piece first, then edit it into hero-2-joinery and hero-1-timber. These three matter most.")
    a("2. **Chat B, ROOMS.** Attach hero-3-piece.jpg to make room-1, then edit room-1 into rooms 2, 3 and 4. Copy room-1.jpg to hero-4-home.jpg.")
    a("3. **Chat C.** Cards and the Build yours drawing, all attached to hero-3-piece.jpg.")
    a("4. **Chat D.** Weaves, details, craft band and maker. Nothing to attach.\n")
    a("Without chats A and B the first page has no story. Everything after them can wait.\n")
    a("## Summary table\n")
    a("| # | File name | Final size | Shape to ask for | Attach | Section |\n|---|---|---|---|---|---|")
    for i, (k, s, shape, g, att, _, _) in enumerate(SLOTS, 1):
        ext = "png" if k in ("build-drawing", "map") else "jpg"
        a(f"| {i} | `{k}.{ext}` | {s.replace('x', ' x ')} | {shape} | {att} | {g.title()} |")
    a("")
    cur = None
    for i, (k, s, shape, g, att, body, note) in enumerate(SLOTS, 1):
        if g != cur:
            cur = g
            a(f"## {g.title()}\n")
            if GROUP_NOTES.get(g):
                a(f"_{GROUP_NOTES[g]}_\n")
        ext = "png" if k in ("build-drawing", "map") else "jpg"
        a(f"### {i}. `{k}.{ext}`  ({s.replace('x', ' x ')}, {shape})\n")
        if att not in ("nothing",):
            a(f"**Attach:** {att}\n")
        if k in ("map", "hero-4-home"):
            a(body + "\n")
        else:
            a("```text\n" + THEME + "\n\n" + body + "\n```\n")
        if note:
            a(f"_{note}_\n")
    a("## Edit recipe, so the camera never moves\n")
    a("Always attach the first picture and say edit. Never ask for a new picture from scratch. Keep the lines \"same camera position and lens\" and \"replace only\" in every edit. If the walls, the window or the floor drift, run that edit again.\n")
    a("## Check before you bring them back\n")
    a("- Every file name matches the table and sits in `images/`.")
    a("- hero-1, hero-2 and hero-3 show the same ivory ground, the same wall and the same camera. Flick between them: only the piece should change.")
    a("- The four room pictures show the same window, the same floor and the same camera.")
    a("- Nothing has text, a logo or a face inside it.")
    a("- Say it out loud to the client: these are stand-ins and never go on their live site.")
    OUT.write_text("\n".join(L) + "\n")
    print("wrote", OUT, "slots", len(SLOTS))


main()
