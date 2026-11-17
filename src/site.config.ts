// EVERY per-client value lives here and only here. The client is a NEW furniture business. On 16 Nov 2026 Thulaib
// asked BB to write the words ("put what you feel"), so the brand voice, names, timber and craft story below are
// DRAFT wording invented by BB for one coherent Sri Lankan jak-wood maker called Daru. The client replaces them.
// Contact facts a customer could act on (phone, number, street, hours, Instagram, price, delivery) stay as marked
// PLACEHOLDERS in square brackets: BB never invents those. A bracketed value prints as a dashed timber mark (src/lib/ph.ts).

export const PLACEHOLDER = 'PLACEHOLDER';

export const site = {
  /** Business name. PLACEHOLDER */
  name: 'Daru',
  /** One sentence for the meta description. PLACEHOLDER */
  description: 'Explore timber furniture, discover room ideas and create a personal furniture brief with Daru.',
  /** The live address, no trailing slash. PLACEHOLDER */
  url: 'https://businessboosterlk.github.io',
  lang: 'en-GB',
  locale: 'en_GB',
  address: {
    /** PLACEHOLDER */
    line1: '[Showroom address]',
    /** PLACEHOLDER */
    city: 'Colombo',
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
  headerCta: { label: 'Enquire', text: 'Hello Daru, I would like to ask about a piece.' },
} as const;

/** The hero: one story. A drawing first, then raw timber, a joined frame, the finished piece and the piece at home. */
export const hero = {
  /** Approved storyboard words. */
  lede: 'Buy it ready. Or build it yours.',
  piece: {
    /** DRAFT: the one piece that leads the hero. */
    name: 'Ella three-seater',
    /** DRAFT */
    eyebrow: 'Sofa · Jak · Linen',
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

/** Section 3, Rooms. Four views of one room from one camera spot. Room names and piece names are DRAFT wording.
 *  Each room has two tappable pieces. Where the dots sit is set in sections.css, per room. */
export const rooms = {
  eyebrow: 'Rooms',
  title: 'One home. Four rooms.',
  lede: 'Walk through. Tap any piece you like.',
  list: [
    { label: 'Living', slot: 'room-1', alt: 'Room view 1 of 4: a calm room in soft daylight with a sofa and a low round table', dots: ['Ella three-seater', 'Galle coffee table'] },
    { label: 'Dining', slot: 'room-2', alt: 'Room view 2 of 4: the same room set for dining', dots: ['Kandy dining table', 'Kandy dining chair'] },
    { label: 'Bedroom', slot: 'room-3', alt: 'Room view 3 of 4: the same room set as a bedroom', dots: ['Mirissa bed', 'Linen bedding'] },
    { label: 'Study', slot: 'room-4', alt: 'Room view 4 of 4: the same room set as a study', dots: ['Hakgala shelf', 'Hakgala desk'] },
  ],
  next: 'Next room',
  /** {piece} is replaced with the tapped piece's name. */
  askText: 'Hello Daru, I would like to ask about the {piece}.',
} as const;

/** Section 4, Ready to buy. Four finished pieces. Names and materials are DRAFT wording. The price and the delivery terms stay PLACEHOLDERS. */
export const ready = {
  title: 'Find your next favourite.',
  lede: 'Explore the collection concepts. Ask about a piece to confirm materials, availability, pricing and delivery. Images are illustrative.',
  buy: 'Enquire',
  buyShort: 'Enquire',
  /** {piece} is replaced with the card's piece name. */
  buyText: 'Hello Daru, I would like to buy the {piece}.',
  price: 'Request a quote',
  fabricsLabel: 'Fabrics available',
  cards: [
    { slot: 'card-1', name: 'Ella three-seater', material: 'Jak frame · Natural linen · Round arms', alt: 'Ready-to-buy piece 1 of 4, a three-seat sofa on an ivory ground' },
    { slot: 'card-2', name: 'Ella armchair', material: 'Jak frame · Natural linen · Loose seat cushion', alt: 'Ready-to-buy piece 2 of 4, an armchair on an ivory ground' },
    { slot: 'card-3', name: 'Galle side table', material: 'Solid jak · 450 mm across · Hand-rubbed oil', alt: 'Ready-to-buy piece 3 of 4, a round side table on an ivory ground' },
    { slot: 'card-4', name: 'Galle coffee table', material: 'Solid jak · 1000 mm across · Cross base', alt: 'Ready-to-buy piece 4 of 4, a low round coffee table on an ivory ground' },
  ],
} as const;

/** Section 5, Build yours. Light, never a full configurator. Presets, sizes and fabrics are DRAFT wording. The price stays a PLACEHOLDER. */
export const build = {
  eyebrow: 'Build yours',
  title: 'Make it yours.',
  lede: 'Choose your shape, size and fabric. Send your choices for a tailored quote.',
  steps: ['Style', 'Size', 'Fabric', 'Enquire'],
  presets: [
    { n: '01', name: 'Ella, round arm' },
    { n: '02', name: 'Ella, slim arm' },
    { n: '03', name: 'Ella, low back' },
  ],
  sizes: ['Two-seater, 1600 mm', 'Three-seater, 1900 mm', 'Four-seater, 2300 mm'],
  fabrics: [
    { label: 'Natural linen', slot: 'weave-1', alt: 'Close-up of the weave of fabric 1' },
    { label: 'Oat handloom cotton', slot: 'weave-2', alt: 'Close-up of the weave of fabric 2' },
    { label: 'Stone weave', slot: 'weave-3', alt: 'Close-up of the weave of fabric 3' },
  ],
  dims: [
    { name: 'Width', value: '1600 to 2300' },
    { name: 'Depth', value: '850' },
    { name: 'Seat height', value: '420' },
  ],
  drawing: { slot: 'build-drawing', alt: 'A line drawing of the piece, flat from the front' },
  price: 'Made for you.',
  priceNote: 'priced on enquiry',
  send: 'Enquire about this design',
  sendIntro: 'Hello Daru, I would like to send my build.',
  groupLabels: { start: 'Start', size: 'Size', fabric: 'Fabric' },
} as const;

/** Section 6, Detail row. Three labelled close-ups. Part names and lines are DRAFT wording. */
export const details = {
  title: 'Look closer.',
  items: [
    { n: '01', name: 'The joinery', line: 'Look closely at how the arm meets the leg. Ask about the joinery and construction of your chosen piece.', slot: 'detail-1', alt: 'Illustrative close-up of timber joinery' },
    { n: '02', name: 'The fabric', line: 'Colour is only the beginning. Compare the weave, feel and care requirements before you choose.', slot: 'detail-2', alt: 'Illustrative close-up of cushion fabric' },
    { n: '03', name: 'The finish', line: 'A small detail changes the whole silhouette. Explore the timber tone and leg profile you prefer.', slot: 'detail-3', alt: 'Illustrative close-up of a furniture leg' },
  ],
} as const;

/** Section 7, Craft band. One dark band, one workshop photo, one line, a named timber card. DRAFT wording. */
export const craft = {
  eyebrow: 'The workshop',
  line: 'From the first cut to the finishing touch.',
  photo: { slot: 'craft-band', alt: 'A pair of hands planing a board at a workshop bench' },
  timber: { label: 'The material', species: 'Natural character.', origin: 'Grain, tone and texture make every piece feel different.', why: 'Confirm timber species, sourcing and finish with the maker before ordering. Workshop imagery is illustrative.' },
  maker: { slot: 'maker', alt: 'Illustrative craftsman at a woodworking bench', label: 'The process', name: 'Considered in every detail.' },
} as const;

/** Section 8, Visit and contact. WhatsApp first, call second. No form: links only. */
export const visit = {
  title: 'Come and sit on it.',
  whatsapp: 'WhatsApp us',
  whatsappText: 'Hello Daru, I would like to visit the showroom.',
  call: 'Call',
  map: { slot: 'map', alt: 'Map to the showroom' },
} as const;

export type Site = typeof site;
