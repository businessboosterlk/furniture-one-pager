#!/usr/bin/env python3
"""Builds index.html (the storyboard) from frames/Fnn.html fragments written by the crew.
Usage: python3 build.py   (then: node render.mjs index.html ~/Downloads/FURNITURE-ONE-PAGER/STORYBOARD.pdf)
Adapted from ~/bb-consultancy/rathnaweera-website/storyboard/ (page frame, phone frame, desk frame, notes block).
Every name, product, price and photo is a [placeholder]; nothing here is client fact."""
import base64, html, json, re, pathlib
HERE = pathlib.Path(__file__).parent
ICON_DIR = pathlib.Path.home() / "bb-systems/ask-bb/node_modules/lucide-static/icons"
ICONS = ["menu", "message-circle", "phone", "map-pin", "arrow-right", "ruler", "check", "clock", "instagram", "plus", "chevron-down", "signal", "wifi", "battery-full", "image"]

# ---- every picture slot: file name, size, what it shows. One source for the page notes and STAND-IN-IMAGES.md
SLOTS = {
    "hero-photo":   ("1600x1200", "The hero piece in a calm room, daylight from the left"),
    "hero-drawing": ("1200x1200", "Pencil drawing of that same piece, made from the hero photo"),
    "room-1":       ("2400x1350", "Room view, camera spot A, living area"),
    "room-2":       ("2400x1350", "Same room, same camera, dining area"),
    "room-3":       ("2400x1350", "Same room, same camera, bedroom area"),
    "room-4":       ("2400x1350", "Same room, same camera, study area"),
    "card-1":       ("1000x1250", "Ready to buy piece 1, white-ish studio ground"),
    "card-2":       ("1000x1250", "Ready to buy piece 2"),
    "card-3":       ("1000x1250", "Ready to buy piece 3"),
    "card-4":       ("1000x1250", "Ready to buy piece 4"),
    "build-drawing": ("1200x1200", "Build yours drawing with measurements"),
    "weave-1":      ("800x800", "Fabric close-up 1, the weave"),
    "weave-2":      ("800x800", "Fabric close-up 2"),
    "weave-3":      ("800x800", "Fabric close-up 3"),
    "detail-1":     ("800x800", "Detail crop 1, a joint or an edge"),
    "detail-2":     ("800x800", "Detail crop 2, a stitched seam"),
    "detail-3":     ("800x800", "Detail crop 3, the underside or a foot"),
    "craft-band":   ("2400x1200", "Workshop, a pair of hands at a bench"),
    "maker":        ("600x600", "Maker portrait, quiet, at the bench"),
    "map":          ("1200x800", "Showroom map (a screenshot, not a generated picture)"),
}
(HERE / "slots.json").write_text(json.dumps(SLOTS, indent=1))

SECTIONS = [
    dict(n=1, title="Header", frames=("F01", "F02"),
         purpose="Brand at the left gutter, four links, one Message us button. Phone shows the menu open; the closed state is the header row alone. Desk shows two states: at the top and scrolled.",
         words="Shop · Build yours · Craft · Visit · Message us",
         photo="none",
         borrowed="Nothing from the pins. House system plus the conversion standard (WhatsApp one tap away on every screen).",
         ask="Does the client want a language switch (English, Sinhala) in the header?"),
    dict(n=2, title="Hero", frames=("F03", "F04"),
         purpose="Two doors. Ready to buy carries the price on the button. Build your own opens the configurator. The piece name sits at poster scale beside the photo and a pencil drawing sits with it.",
         words="Buy it ready. Or build it yours.",
         photo="hero-photo · hero-drawing",
         borrowed="BLEND-01 front door, decided and not redone: two doors, price on the button row, name in a serif at poster scale, drawing beside the photo.",
         ask="Which one piece leads the hero? It decides the photo and the drawing."),
    dict(n=3, title="Rooms", frames=("F05", "F06"),
         purpose="Four views of one room from one camera spot. Tap a name and the view pushes in over about 600 ms, never a hard cut. A tappable dot on each piece opens it.",
         words="One home. Four rooms. Walk through. Tap any piece you like.",
         photo="room-1 · room-2 · room-3 · room-4",
         borrowed="Camera never cuts (concept film pin). Small piece in an empty room (home pin). Headline in the empty wall at the left gutter (home pin).",
         ask="Which four rooms does the showroom or catalogue cover?"),
    dict(n=4, title="Ready to buy", frames=("F07", "F08"),
         purpose="Four finished pieces. Name, one material line, fabric dots, price and Buy on one row. Buy opens a WhatsApp message that already names the piece.",
         words="Ready to take home.",
         photo="card-1 · card-2 · card-3 · card-4",
         borrowed="Name left, fabric dots right (home pin). Fabric macro running off the cropped edge (sheet pin). Name, material, price and Buy on one row (shop pin).",
         ask="How many pieces are ready to buy today? What is the delivery promise?"),
    dict(n=5, title="Build yours", frames=("F09", "F10"),
         purpose="Light, never a full configurator. A step bar with a hairline, three presets, fixed size buttons, fabric chips that open a close-up of the weave, a drawing that shows the measurements and a live price beside the send button.",
         words="Make it yours. Pick a start, a size and a fabric. The price moves with you.",
         photo="build-drawing · weave-1 · weave-2 · weave-3",
         borrowed="Presets 01 02 03 (UI card pin). Drawing shows measurements (pin). Fixed size buttons with the live price beside the enquiry button (live configurator). Hairline step bar is a house addition.",
         ask="Which sizes, fabrics and presets are real? What does each change in the price?"),
    dict(n=6, title="Detail row", frames=("F11", "F12"),
         purpose="Three labelled close-ups. Each part has a name and one line on what it does for the buyer.",
         words="Look closer.",
         photo="detail-1 · detail-2 · detail-3",
         borrowed="Three square crops with part name and benefit (sheet pin). One word name and two word character (pin). A hand on the weave (UI card pin).",
         ask="Which three details prove the quality?"),
    dict(n=7, title="Craft band", frames=("F13", "F14"),
         purpose="One dark band, one workshop photo, one line and a named timber card. The photo runs to the cropped screen edge on desk.",
         words="[One line from the workshop]",
         photo="craft-band · maker",
         borrowed="One dark band, one photo, one line (studio pin). A named timber card (maker pin). A maker portrait (portfolio pin).",
         ask="Is it made by hand in Sri Lanka? Which timber? Only then can we write a line here."),
    dict(n=8, title="Visit and contact", frames=("F15", "F16"),
         purpose="Where to find them and when. Two ways to talk: WhatsApp first, call second. Footer with links and Instagram.",
         words="Come and sit on it.",
         photo="map",
         borrowed="Nothing from the pins. House system plus the conversion standard.",
         ask="Is there a showroom? If not, this headline changes to a delivery line."),
]

def mark(h):
    """Wrap every [text] in a text node as a dashed timber placeholder (idempotent)."""
    h = re.sub(r'<span class="pl">(.*?)</span>', r'\1', h)
    parts = re.split(r'(<[^>]*>)', h)
    return ''.join(p if p.startswith('<') else re.sub(r'\[([^\[\]]+)\]', r'<span class="pl">[\1]</span>', p) for p in parts)

def esc_mark(t):
    return mark(html.escape(t, quote=False))

def clean_style(h):
    """The crew may only set layout inline. Strip colours, fonts and borders it added so the house tokens rule."""
    def tag(m):
        t = m.group(0)
        cls = re.search(r'class="([^"]*)"', t)
        c = cls.group(1).split() if cls else []
        def st(sm):
            keep = []
            for d in [x.strip() for x in sm.group(1).split(';') if x.strip()]:
                k = d.split(':')[0].strip().lower()
                if k in ('color', 'font-size', 'font-family', 'font-weight', 'letter-spacing', 'border', 'box-shadow', 'outline', 'line-height', 'text-transform', 'opacity'):
                    continue
                if k in ('width', 'height', 'display') and 'dot' in c:
                    continue
                if k in ('background', 'background-color') and not ('dot' in c):
                    continue
                if k == 'border-radius' and 'dot' not in c and 'slot' not in c:
                    continue
                keep.append(d)
            return 'style="' + '; '.join(keep) + '"'
        return re.sub(r'style="([^"]*)"', st, t)
    return re.sub(r'<[a-zA-Z][^>]*>', tag, h)

NAV = '<span>Shop</span><span>Build yours</span><span>Craft</span><span>Visit</span>'
def fix_nav(h):
    """The nav words are fixed by the brief (Shop, Build yours, Craft, Visit). The crew sometimes made up others."""
    def rep(m):
        inner = m.group(2)
        btns = ''.join(re.findall(r'<span class="btn".*?</span>', inner, re.S))
        return m.group(1) + NAV + btns + '</div>'
    return re.sub(r'(<div class="nav"[^>]*>)(.*?)</div>', rep, h, flags=re.S)

def frame(code):
    f = HERE / "frames" / f"{code}.html"
    if not f.exists():
        return f'<div style="padding:30px;color:#8a2b1c">FRAME {code} MISSING</div>'
    s = f.read_text()
    s = re.sub(r'^```[a-z]*\n|\n```\s*$', '', s.strip())
    return mark(fix_nav(clean_style(s)))

def icon_css():
    out = []
    for n in ICONS:
        svg = (ICON_DIR / f"{n}.svg").read_text().replace("currentColor", "#000")
        b = base64.b64encode(svg.encode()).decode()
        out.append(f'.ic-{n}{{--i:url("data:image/svg+xml;base64,{b}")}}')
    return "\n".join(out)

def ic(n):
    return f'<i class="ic ic-{n}"></i>'

def phone(code, crop=False):
    return (f'<div class="phone"><div class="scr ph"><div class="status"><span>9:41</span><span class="r">{ic("signal")}{ic("wifi")}{ic("battery-full")}</span></div>'
            f'<div class="island"></div><div class="pbody"{" data-crop=1" if crop else ""}><div class="f f-ph">{frame(code)}</div></div>'
            f'<div class="homebar"><i></i></div></div></div>')

def desk(code):
    sc = 1015 / 1440
    return (f'<div class="dwrap"><div class="dchrome"><i></i><i></i><i></i><span class="addr">[brand-name].lk</span></div>'
            f'<div class="dview" style="height:{900*sc:.1f}px"><div class="scr dk" style="transform:scale({sc:.5f})"><div class="f f-dk">{frame(code)}</div></div></div></div>')

def page(n, title, stage, inner, foot):
    return (f'<section class="page"><div class="ptop"><div class="l"><span class="num">{n}</span><span class="ttl">{title}</span></div>'
            f'<div class="stage">{stage}</div></div>{inner}<div class="pfoot"><span>Storyboard · one page furniture site · phone and desk · every name, price and photo is a placeholder</span><span>{foot}</span></div></section>')

def section_page(s, total):
    pc, dc = s["frames"]
    photo = s["photo"]
    if photo != "none":
        photo = " · ".join(f'{k.strip()} ({SLOTS[k.strip()][0]})' for k in photo.split("·"))
    notes = (f'<dl class="notes"><dt>Purpose</dt><dd>{esc_mark(s["purpose"])}</dd>'
             f'<dt>Words</dt><dd>{esc_mark(s["words"])}</dd>'
             f'<dt>Photo needed</dt><dd>{html.escape(photo)}</dd>'
             f'<dt>Borrowed from</dt><dd>{html.escape(s["borrowed"])}</dd>'
             f'<dt>Thulaib to decide</dt><dd>{html.escape(s["ask"])}</dd></dl>')
    inner = (f'<div class="body"><div><div class="cap">Phone · 390 by 844 · {pc}</div>{phone(pc)}</div>'
             f'<div class="rcol"><div class="cap">Desk · 1440 by 900 · {dc}</div>{desk(dc)}{notes}</div></div>')
    return page(s["n"], s["title"], f'<b>Section {s["n"]} of {total}</b><br>Phone and desk are separate designs', inner, f'Page {s["n"]+1}')

def cover():
    rows = ''.join(f'<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line)"><span><b class="serif" style="color:var(--tim);font-size:26px;margin-right:14px">{s["n"]}</b><span class="serif" style="font-size:24px">{s["title"]}</span></span><span class="small">{esc_mark(s["words"])}</span></div>' for s in SECTIONS)
    sw = ''.join(f'<div><div style="width:150px;height:84px;background:{c};border:1px solid var(--line)"></div><div class="small" style="margin-top:6px"><b>{n}</b> {c}</div></div>' for n, c in [("Ivory", "#F4EFE6"), ("Ink", "#2A211B"), ("Timber", "#9A6A3F")])
    inner = (f'<div class="body" style="grid-template-columns:1fr 1fr;gap:70px;margin-top:40px">'
             f'<div><div class="cap">The page, in order</div>{rows}'
             f'<div class="cap" style="margin-top:34px">Colour and type</div><div style="display:flex;gap:22px">{sw}</div>'
             f'<div style="margin-top:26px"><div class="serif" style="font-size:54px;line-height:1">Cormorant Garamond</div><div class="small" style="margin-top:6px">Display and prices. Pairs with Inter for everything small. An 8px step.</div></div></div>'
             f'<div><div class="cap">How to read this</div>'
             f'<p style="font-size:17px;max-width:46ch">One minimal, classy page for a new furniture business. Each page below is one section, with the phone and the desk built as two separate designs. Nothing here is the final look: it fixes the order, the words and where every picture goes.</p>'
             f'<div class="cap" style="margin-top:30px">Marks you will see</div>'
             f'<p style="margin-top:10px"><span class="pl">[Brand name]</span> a dashed timber bracket is a placeholder for a real name, price or fact. None is invented.</p>'
             f'<div style="margin-top:14px;display:flex;gap:16px;align-items:center"><div class="slot" data-label="Picture slot" data-size="1600x1200" style="width:200px;height:120px"></div><span>A labelled ivory panel is a picture slot with its size. Furniture is never drawn here, only photographed later.</span></div>'
             f'<div class="cap" style="margin-top:30px">Three rules this page keeps</div>'
             f'<p style="margin-top:8px">1. Two ways in: buy it ready or build it yours.<br>2. Phone is centred and clear of the island and home bar. Desk starts at the left gutter.<br>3. Every button ends in WhatsApp with the choices already in the message.</p>'
             f'</div></div>')
    return page("", "Storyboard", f'<b>[Brand name]</b><br>For review', inner, "Cover")

def last():
    inner = ('<div class="body" style="grid-template-columns:1fr 1fr;gap:70px;margin-top:40px"><div>'
             '<div class="cap">What happens next</div>'
             '<p style="font-size:20px;line-height:1.5;margin-top:8px"><b>1.</b> You paste CHATGPT-THREE-LOOKS.md into ChatGPT with this storyboard attached. It returns three looks. You pick one.<br><br>'
             '<b>2.</b> You make the stand-in pictures with STAND-IN-IMAGES.md. The first six are essential.<br><br>'
             '<b>3.</b> Chat 2 builds the page in the look you chose. Chat 3 runs the gates (phone view, desk view, every button pressed, speed).<br><br>'
             '<b>4.</b> Nothing goes live until the client confirms the name, the pieces, the prices and the photos.</p></div>'
             '<div><div class="cap">Needed from you or the client</div>'
             '<p style="font-size:19px;line-height:1.6;margin-top:8px">' + '<br>'.join(f'<b>{s["n"]}.</b> {html.escape(s["ask"])}' for s in SECTIONS) + '</p>'
             '<div class="cap" style="margin-top:28px">Honest limits</div>'
             '<p style="margin-top:8px">Every product, price and photo here is a placeholder. AI pictures are stand-ins for a first look and never go live on a client\'s address. ChatGPT rarely holds one camera spot across four pictures, so the room set may need a second try.</p></div></div>')
    return page("", "Next steps", "<b>Stop here</b><br>Nothing built, nothing deployed", inner, "Last page")

def main():
    css = (HERE / "style.css").read_text().replace("/*ICONS*/", icon_css())
    total = len(SECTIONS)
    body = cover() + ''.join(section_page(s, total) for s in SECTIONS) + last()
    out = f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Storyboard</title><style>{css}</style></head><body>{body}</body></html>'
    (HERE / "index.html").write_text(out)
    print("built index.html,", total, "sections,", len(list((HERE / "frames").glob("F*.html"))), "frames found")

if __name__ == "__main__":
    main()
