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
  email: null, // e.g. 'name@example.com'
  instagram: null, // e.g. { handle: '@name', url: 'https://instagram.com/name' }
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
const blank = (category, n) => ({
  slug: `${category}-${String(n).padStart(2, '0')}`,
  category,
  no: String(n).padStart(2, '0'),
  title: null,
  year: null,
  client: null,
  role: null,
  summary: null,
  objective: null,
  responsibilities: [],
  process: [],
  results: [],
  cover: { src: null, alt: '' },
  evidence: [
    { src: null, alt: '', caption: null },
    { src: null, alt: '', caption: null },
    { src: null, alt: '', caption: null },
  ],
  featured: n === 1,
});

export const projects = categories.flatMap((c) => [blank(c.id, 1), blank(c.id, 2)]);

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
