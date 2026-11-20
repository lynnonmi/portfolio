// Generates every HTML page with its own title and share metadata.
// Run: node tools/build-pages.mjs        (set SITE_URL=https://example.com to write absolute share URLs)
import { writeFileSync } from 'node:fs';
import { site, projects } from '../js/data.js';

const base = (process.env.SITE_URL || '').replace(/\/$/, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (path) => (base ? `${base}/${path}` : path);

const pages = [
  { file: 'index.html', page: 'home', title: 'Lynn Kim, Content Creator, Marketer, Event Organizer', desc: 'Portfolio of Lynn Kim: content creation, marketing, event organizing, live commerce and photography.' },
  { file: 'work.html', page: 'work', title: 'Work, Lynn Kim', desc: 'Six projects across content, events, live commerce and brand marketing, with Lynn Kim\'s role and verified results.' },
  { file: 'about.html', page: 'about', title: 'About Lynn, Lynn Kim', desc: 'Lynn Kim is a creator and marketer studying at Minerva University. Experience, education and skills.' },
  { file: 'photography.html', page: 'photography', title: 'Through My Lens, Lynn Kim', desc: 'Portraits, snap sessions, and everyday moments photographed by Lynn Kim.' },
  { file: 'contact.html', page: 'contact', title: 'Let\'s Connect, Lynn Kim', desc: 'Email and Instagram for professional opportunities, brand collaborations, content projects and photography inquiries.' },
  { file: '404.html', page: 'notfound', title: 'Page not found, Lynn Kim', desc: 'This page does not exist.', noindex: true },
  { file: 'project.html', page: 'project', title: 'Project, Lynn Kim', desc: 'A project from Lynn Kim\'s portfolio.', noindex: true },
  ...projects.map((p) => ({ file: `project-${p.slug}.html`, page: 'project', slug: p.slug, title: `${p.title}, Lynn Kim`, desc: p.summary })),
];

for (const p of pages) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
${p.noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#1f1e20">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lynn Kim">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:image" content="${esc(abs(site.ogImage))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${base ? `<meta property="og:url" content="${esc(abs(p.file))}">\n<link rel="canonical" href="${esc(abs(p.file))}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${esc(abs(site.ogImage))}">
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="${p.page}"${p.slug ? ` data-slug="${p.slug}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<div id="root"></div>
<noscript><p style="padding:2rem;color:#f3ebdc">This portfolio needs JavaScript to load its pages. Email: ${esc(site.email)}</p></noscript>
<script type="module" src="js/app.js"></script>
</body>
</html>
`;
  writeFileSync(p.file, html);
}
console.log(`wrote ${pages.length} pages`);
