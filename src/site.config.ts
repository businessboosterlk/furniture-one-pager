// EVERY per-client value lives here and only here. The client is a NEW furniture business whose name,
// pieces, prices and photos are not known yet, so every client value below is a marked PLACEHOLDER in square
// brackets. A bracketed value prints on the page as a dashed timber mark (see src/lib/ph.ts).
// Never invent a name, a piece, a price or a fact. Replace the brackets when the client supplies them.

export const PLACEHOLDER = 'PLACEHOLDER';

export const site = {
  /** Business name. PLACEHOLDER */
  name: '[Brand name]',
  /** One sentence for the meta description. PLACEHOLDER */
  description: '[One sentence about the business]',
  /** The live address, no trailing slash. PLACEHOLDER */
  url: 'https://example.com',
  lang: 'en-GB',
  locale: 'en_GB',
  address: {
    /** PLACEHOLDER */
    line1: '[Showroom address]',
    /** PLACEHOLDER */
    city: '[City]',
    country: 'Sri Lanka',
  },
  contact: {
    /** Digits only, with country code, no plus sign. PLACEHOLDER number */
    whatsapp: '94000000000',
    /** PLACEHOLDER */
    whatsappLabel: '+94 00 000 0000',
    /** PLACEHOLDER */
    email: 'hello@example.com',
    /** The number for the Call button, with country code and plus sign. PLACEHOLDER number */
    tel: '+94000000000',
    /** PLACEHOLDER */
    phoneLabel: '[Phone number]',
  },
  /** PLACEHOLDER */
  hours: '[Opening hours]',
  /** PLACEHOLDER. Prints as text with the Instagram mark until the client gives a handle, then it becomes a link. */
  instagram: '[Instagram handle]',
  /** House tokens, approved on the storyboard: ivory, ink, timber. The site is light only. */
  colours: {
    ink: '#2A211B',
    paper: '#F4EFE6',
    muted: '#6B5E52',
    line: '#D9D0C1',
    accent: '#9A6A3F',
    inkDark: '#2A211B',
    paperDark: '#F4EFE6',
    mutedDark: '#6B5E52',
    lineDark: '#D9D0C1',
    accentDark: '#9A6A3F',
  },
  /** Main navigation, fixed by the storyboard: Shop, Build yours, Craft, Visit. */
  nav: [
    { href: '#shop', label: 'Shop' },
    { href: '#build', label: 'Build yours' },
    { href: '#craft', label: 'Craft' },
    { href: '#visit', label: 'Visit' },
  ],
  /** The header button. The WhatsApp link is built from contact.whatsapp. */
  headerCta: { label: 'Message us', text: 'Hello [Brand name], I would like to ask about a piece.' },
} as const;

/** The hero: one story. A drawing first, then raw timber, a joined frame, the finished piece and the piece at home. */
export const hero = {
  /** Approved storyboard words. */
  lede: 'Buy it ready. Or build it yours.',
  piece: {
    /** PLACEHOLDER: the one piece that leads the hero. */
    name: '[Piece name]',
    /** PLACEHOLDER */
    eyebrow: '[Category] · [Timber] · [Fabric]',
    /** PLACEHOLDER. Prints as written, no number is invented. */
    price: 'LKR [price]',
  },
  doors: {
    ready: { label: 'Ready to buy', href: '#shop' },
    build: { label: 'Build your own', href: '#build' },
  },
  /** The five frames, one story: the drawing, then the timber, then joined, then finished, then at home. `slot` is the picture file name without extension (STAND-IN-IMAGES.md). */
  steps: [
    { n: '01', label: 'Drawing', slot: 'build-drawing', alt: 'A line drawing of the piece, flat from the front' },
    { n: '02', label: 'Timber', slot: 'hero-1-timber', alt: 'Rough-sawn timber boards stacked on an ivory ground' },
    { n: '03', label: 'Joined', slot: 'hero-2-joinery', alt: 'The timber frame joined and clamped, before any fabric' },
    { n: '04', label: 'Finished', slot: 'hero-3-piece', alt: 'The finished piece on an ivory ground' },
    { n: '05', label: 'At home', slot: 'hero-4-home', alt: 'The finished piece in a calm room' },
  ],
} as const;

/** Section 3, Rooms. Four views of one room from one camera spot. Room names and piece names are PLACEHOLDERS.
 *  Each room has two tappable pieces. Where the dots sit is set in sections.css, per room. */
export const rooms = {
  eyebrow: 'Rooms',
  title: 'One home. Four rooms.',
  lede: 'Walk through. Tap any piece you like.',
  list: [
    { label: '[Living]', slot: 'room-1', alt: 'Room view 1 of 4: a calm room in soft daylight with a sofa and a low round table', dots: ['[Piece name]', '[Piece name]'] },
    { label: '[Dining]', slot: 'room-2', alt: 'Room view 2 of 4: the same room set for dining', dots: ['[Piece name]', '[Piece name]'] },
    { label: '[Bedroom]', slot: 'room-3', alt: 'Room view 3 of 4: the same room set as a bedroom', dots: ['[Piece name]', '[Piece name]'] },
    { label: '[Study]', slot: 'room-4', alt: 'Room view 4 of 4: the same room set as a study', dots: ['[Piece name]', '[Piece name]'] },
  ],
  next: 'Next room',
  askText: 'Hello [Brand name], I would like to ask about [Piece name].',
} as const;

/** Section 4, Ready to buy. Four finished pieces. Every name, material, price and the delivery line is a PLACEHOLDER. */
export const ready = {
  title: 'Ready to take home.',
  lede: '[One line: delivery promise]',
  buy: 'Buy on WhatsApp',
  buyShort: 'Buy',
  buyText: 'Hello [Brand name], I would like to buy [Piece name].',
  name: '[Piece name]',
  material: '[Timber] frame · [Fabric] · [Detail]',
  price: 'LKR [price]',
  fabricsLabel: 'Fabrics available',
  cards: [
    { slot: 'card-1', alt: 'Ready-to-buy piece 1 of 4, on an ivory ground' },
    { slot: 'card-2', alt: 'Ready-to-buy piece 2 of 4, on an ivory ground' },
    { slot: 'card-3', alt: 'Ready-to-buy piece 3 of 4, on an ivory ground' },
    { slot: 'card-4', alt: 'Ready-to-buy piece 4 of 4, on an ivory ground' },
  ],
} as const;

/** Section 5, Build yours. Light, never a full configurator. Presets, sizes, fabrics and prices are PLACEHOLDERS. */
export const build = {
  eyebrow: 'Build yours',
  title: 'Make it yours.',
  lede: 'Pick a start, a size and a fabric. The price moves with you.',
  steps: ['Start', 'Size', 'Fabric', 'Send'],
  presets: [
    { n: '01', name: '[Preset name]' },
    { n: '02', name: '[Preset name]' },
    { n: '03', name: '[Preset name]' },
  ],
  sizes: ['[Size 1]', '[Size 2]', '[Size 3]'],
  fabrics: [
    { label: '[Fabric 1]', slot: 'weave-1', alt: 'Close-up of the weave of fabric 1' },
    { label: '[Fabric 2]', slot: 'weave-2', alt: 'Close-up of the weave of fabric 2' },
    { label: '[Fabric 3]', slot: 'weave-3', alt: 'Close-up of the weave of fabric 3' },
  ],
  dims: [
    { name: 'Width', value: '[Width]' },
    { name: 'Depth', value: '[Depth]' },
    { name: 'Seat height', value: '[Seat height]' },
  ],
  drawing: { slot: 'build-drawing', alt: 'A line drawing of the piece, flat from the front' },
  price: 'LKR [price]',
  priceNote: 'live price',
  send: 'Send my build on WhatsApp',
  sendIntro: 'Hello [Brand name], I would like to send my build.',
  groupLabels: { start: 'Start', size: 'Size', fabric: 'Fabric' },
} as const;

/** Section 6, Detail row. Three labelled close-ups. Part names and lines are PLACEHOLDERS. */
export const details = {
  title: 'Look closer.',
  items: [
    { n: '01', name: '[Part 1]', line: '[One line: what it does for you]', slot: 'detail-1', alt: 'Close-up 1 of 3: where an oak arm meets the leg' },
    { n: '02', name: '[Part 2]', line: '[One line: what it does for you]', slot: 'detail-2', alt: 'Close-up 2 of 3: the weave and the seam of a cushion' },
    { n: '03', name: '[Part 3]', line: '[One line: what it does for you]', slot: 'detail-3', alt: 'Close-up 3 of 3: a turned oak leg meeting the floor' },
  ],
} as const;

/** Section 7, Craft band. One dark band, one workshop photo, one line, a named timber card. All PLACEHOLDERS. */
export const craft = {
  eyebrow: 'The workshop',
  line: '[One line from the workshop]',
  photo: { slot: 'craft-band', alt: 'A pair of hands planing a board at a workshop bench' },
  timber: { label: 'Timber', species: '[Timber species]', origin: '[Origin]', why: '[Why it lasts: one line]' },
  maker: { slot: 'maker', alt: 'The maker at the bench, hands on a board', label: 'Made by', name: '[Maker name]' },
} as const;

/** Section 8, Visit and contact. WhatsApp first, call second. No form: links only. */
export const visit = {
  title: 'Come and sit on it.',
  whatsapp: 'WhatsApp us',
  whatsappText: 'Hello [Brand name], I would like to visit the showroom.',
  call: 'Call',
  map: { slot: 'map', alt: 'Map to the showroom' },
} as const;

export type Site = typeof site;
