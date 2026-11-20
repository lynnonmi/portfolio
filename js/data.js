/*
  All site content lives here.

  Rule for this file: only real, verified information goes in. Anything that
  is null or empty renders as a clearly marked placeholder on the page.
  To fill a field, replace null (or the empty list) with the real value.
  Nothing on the site is invented.
*/

export const site = {
  name: 'Lynn Kim',
  year: 2026,
  // Fill these in. Empty values render as "to be added", not as broken links.
  email: 'eggielikestaco@gmail.com',
  instagram: { handle: '@lynnonmi', url: 'https://www.instagram.com/lynnonmi/' },
  resume: null, // e.g. 'assets/Lynn-Kim-Resume.pdf'
  statement: 'Content, events, live commerce, brand marketing and photography.',
};

export const categories = [
  { id: 'content', label: 'Content', tone: 'pink', note: 'Written, visual and video content.' },
  { id: 'events', label: 'Events', tone: 'blue', note: 'Planned and produced events.' },
  { id: 'live-commerce', label: 'Live Commerce', tone: 'cream', note: 'Live sales broadcasts.' },
  { id: 'brand-marketing', label: 'Brand Marketing', tone: 'rose', note: 'Campaigns and brand work.' },
  { id: 'photography', label: 'Photography', tone: 'char', note: 'Commissioned and personal photographic work.' },
];

/*
  One entry per project. Fields:
  title, year, client, role         short facts
  summary                           one sentence for cards
  objective                         what the project had to achieve
  responsibilities                  list of what Lynn personally did
  process                           list of { step, text }
  results                           list of { label, value, verified } (verified must be true to show as a result)
  evidence                          list of { src, alt, caption } (src null = placeholder frame)
*/
const base = {
  year: null,
  client: null,
  role: null,
  summary: null,
  objective: null,
  responsibilities: [],
  process: [],
  results: [],
  links: [], // [{ text, href }]
  cover: { src: null, alt: '' },
  evidence: [
    { src: null, alt: '', caption: null },
    { src: null, alt: '', caption: null },
    { src: null, alt: '', caption: null },
  ],
};

/*
  Only projects with real content belong here. A category with no project
  is hidden from the site until one is added.
  Titles are the project names. Everything else stays empty until it is
  filled from verified material.
*/
const list = [
  { slug: 'solo-party', category: 'events', title: 'Solo Party: first and second events' },
  { slug: 'witu-tiktok-live', category: 'live-commerce', title: 'WitU / TikTok LIVE' },
  {
    slug: 'lynnonmi-content',
    category: 'content',
    title: '@lynnonmi content creation',
    links: [{ text: 'Open @lynnonmi on Instagram', href: 'https://www.instagram.com/lynnonmi/' }],
  },
  { slug: 'photography-snap-sessions', category: 'photography', title: 'Photography and Snap Sessions', links: [{ text: 'Open the photography gallery', href: 'photography.html' }] },
];

// Waiting for category placement from the portfolio brief:
//   Red Bull Korea, Pimadaziwin, Constant / Refilled

export const featured = ['solo-party', 'witu-tiktok-live', 'lynnonmi-content'];

export const projects = list.map((p) => {
  const inCat = list.filter((q) => q.category === p.category);
  return { ...base, ...p, no: String(inCat.indexOf(p) + 1).padStart(2, '0'), featured: featured.includes(p.slug) };
});

/*
  Photographs taken by Lynn. type is 'portrait' or 'snap'.
  src null shows a labelled placeholder frame. When a real file is added,
  set src, width, height and alt; the gallery handles the rest.
*/
const photo = (type, n, shape) => ({
  id: `${type}-${String(n).padStart(2, '0')}`,
  type,
  no: String(n).padStart(2, '0'),
  shape, // 'tall' | 'wide' | 'square'
  src: null,
  width: null,
  height: null,
  alt: '',
  caption: null,
});

export const photos = [
  photo('portrait', 1, 'tall'),
  photo('portrait', 2, 'wide'),
  photo('portrait', 3, 'tall'),
  photo('portrait', 4, 'square'),
  photo('snap', 1, 'square'),
  photo('snap', 2, 'square'),
  photo('snap', 3, 'square'),
  photo('snap', 4, 'square'),
  photo('snap', 5, 'square'),
];

export const about = {
  intro: null, // 2 to 4 sentences in Lynn's own words
  portrait: { src: null, alt: '' },
  experience: [], // { role, org, period, note }
  education: [], // { school, degree, period }
  skills: [], // short strings
};
