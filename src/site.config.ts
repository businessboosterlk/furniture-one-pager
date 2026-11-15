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
  },
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

/** The hero: one story in one sentence. Raw timber becomes a joined frame, then the finished piece, then the piece at home. */
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
  /** The four frames, one camera, one footprint. `slot` is the picture file name without extension (STAND-IN-IMAGES.md). */
  steps: [
    { n: '01', label: 'Timber', slot: 'hero-1-timber', alt: 'Rough-sawn timber boards stacked on an ivory ground' },
    { n: '02', label: 'Joined', slot: 'hero-2-joinery', alt: 'The timber frame joined and clamped, before any fabric' },
    { n: '03', label: 'Finished', slot: 'hero-3-piece', alt: 'The finished piece on an ivory ground' },
    { n: '04', label: 'At home', slot: 'hero-4-home', alt: 'The finished piece in a calm room' },
  ],
} as const;

export type Site = typeof site;
