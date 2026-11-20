import { site, heroFigures, categories, projects, photos, about, homeFigures, homeFeatured, order } from './data.js';

const page = document.body.dataset.page;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cat = (id) => categories.find((c) => c.id === id);
const byOrder = order.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);
const featuredProjects = homeFeatured.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);
const inFolder = (id) => (id === 'all' ? byOrder : byOrder.filter((p) => p.categories.includes(id)));
const firstCat = (p) => cat(p.categories[0]);
const projectUrl = (p) => `project-${p.slug}.html`;
const realPhotos = photos.filter((p) => p.src);

/* ---------- small building blocks ---------- */

const pending = (text) => `<span class="pending">${esc(text)}</span>`;
const clip = (cls = '') => `<svg class="clip ${cls}" aria-hidden="true" focusable="false"><use href="#clip"/></svg>`;

/* Real image when src exists. Without one, a quiet monogram frame, never a crossed placeholder. */
function media({ src, alt, width, height }, tone = 'pink', mono = 'LK') {
  if (src) {
    const size = width && height ? ` width="${width}" height="${height}"` : '';
    return `<img class="media" src="${esc(src)}" alt="${esc(alt || '')}"${size} loading="lazy" decoding="async" data-tone="${tone}">`;
  }
  return `<div class="mono mono--${tone}" role="img" aria-label="Portrait to be added"><span>${esc(mono)}</span></div>`;
}

/* A photograph that fails to load is replaced by the monogram frame. */
document.addEventListener(
  'error',
  (e) => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && t.classList.contains('media')) {
      const d = document.createElement('div');
      d.className = `mono mono--${t.dataset.tone || 'pink'}`;
      d.setAttribute('role', 'img');
      d.setAttribute('aria-label', 'Image unavailable');
      d.innerHTML = '<span>LK</span>';
      t.replaceWith(d);
    }
  },
  true
);

/* Lace doily, drawn once as a scalloped disc with punched rings. */
let doilyN = 0;
function doily(cls = '') {
  const id = `dm${doilyN++}`;
  const c = 100;
  const pt = (r, a) => [c + r * Math.cos(a), c + r * Math.sin(a)];
  const N = 46;
  let edge = '';
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2;
    const [x0, y0] = pt(90, a0), [x1, y1] = pt(90, a1);
    edge += (i ? '' : `M${x0.toFixed(1)} ${y0.toFixed(1)}`) + `A6.6 6.6 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  const ring = (r, n, rad) => Array.from({ length: n }, (_, i) => { const [x, y] = pt(r, (i / n) * Math.PI * 2 + (rad ? 0 : 0)); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad}" fill="#000"/>`; }).join('');
  return `<svg class="doily ${cls}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <defs><mask id="${id}"><rect width="200" height="200" fill="#fff"/>${ring(80, 46, 2.6)}${ring(70, 23, 4.2)}${ring(59, 34, 2.4)}${ring(47, 17, 4)}${ring(34, 24, 2.2)}${ring(20, 8, 3.6)}</mask></defs>
    <path d="${edge}Z" fill="#f7f2e8" mask="url(#${id})"/>
    <g fill="none" stroke="#c9bfae" stroke-width=".7" opacity=".8"><circle cx="100" cy="100" r="72"/><circle cx="100" cy="100" r="45"/><circle cx="100" cy="100" r="30"/></g>
  </svg>`;
}

/* Ribbon strip with swallow-tail ends. */
function ribbon(cls = '') {
  return `<svg class="ribbon ${cls}" viewBox="0 0 260 44" aria-hidden="true" focusable="false">
    <path d="M0 0H260L244 22L260 44H0L16 22Z" fill="#8f9fb3"/>
    <path d="M16 6H244M16 38H244" stroke="#f3ebdc" stroke-opacity=".55" stroke-width="1" fill="none"/>
    <path d="M0 0H260L244 22L260 44H0L16 22Z" fill="#1f1e20" fill-opacity=".06"/>
  </svg>`;
}

const label = (text) => `<span class="label">${esc(text)}</span>`;

function polaroid({ img, caption, tone, tilt = 0, clipped = false, lace = false, bow = false }) {
  const fig = `<figure class="polaroid" style="--tilt:${tilt}deg">
    ${clipped ? clip() : ''}
    <div class="polaroid__img">${media(img, tone)}</div>
    <figcaption>${caption}</figcaption>
  </figure>`;
  if (!lace && !bow) return fig;
  return `<div class="lace-wrap">${lace ? doily() : ''}${bow ? ribbon() : ''}${fig}</div>`;
}

/* ---------- layout ---------- */

const nav = [
  { id: 'home', href: 'index.html', text: 'Home' },
  { id: 'work', href: 'work.html', text: 'Work' },
  { id: 'about', href: 'about.html', text: 'About' },
  { id: 'photography', href: 'photography.html', text: 'Photography' },
  { id: 'contact', href: 'contact.html', text: 'Contact' },
];

const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="clip" viewBox="0 0 22 70"><path d="M15 18v36a6 6 0 0 1-12 0V12a8 8 0 0 1 16 0v38a3.5 3.5 0 0 1-7 0V22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
</svg>`;

function shell(stage, body, activeId) {
  const tabs = nav
    .map((n) => `<a href="${n.href}"${n.id === activeId ? ' aria-current="page"' : ''}>${n.text}</a>`)
    .join('');
  return `${sprite}
  <div class="desk">
    <header class="band">
      <div class="top">
        <a class="logo" href="index.html">${esc(site.name)}</a>
        <span class="top__note">Portfolio ${site.year}</span>
      </div>
      ${stage}
      <nav class="tabs" aria-label="Main"><div class="tabs__row">${tabs}</div></nav>
    </header>
    <main class="sheet" id="main" tabindex="-1">${body}</main>
    <footer class="foot">
      <span>${esc(site.name)}</span>
      <a href="contact.html">Contact</a>
      <span>${site.year}</span>
    </footer>
  </div>`;
}

const plainStage = (eyebrow, title, lede) => `<div class="stage">
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h1 class="stage__title">${esc(title)}</h1>
  ${lede ? `<p class="stage__lede">${esc(lede)}</p>` : ''}
</div>`;

/* ---------- pieces used on several pages ---------- */

/* Employment period only. Verification dates for metrics are never shown as a period. */
function periodText(p) {
  return p.periodShort || p.period || null;
}

function projectCard(p, i) {
  const c = firstCat(p);
  const tilt = [-1.3, 1.1, -0.8][i % 3];
  const per = periodText(p);
  const hasImg = p.lead && p.lead.src;
  return `<a class="card" href="${projectUrl(p)}" style="--tilt:${tilt}deg">
    ${i % 2 === 0 ? clip() : ''}
    ${hasImg ? `<div class="card__img">${media(p.lead, c.tone)}</div>` : ''}
    <p class="card__band card__band--${c.tone}">${esc(c.label)}</p>
    <h3 class="card__title">${esc(p.title)}</h3>
    <p class="card__org">${esc(p.org)}</p>
    <dl class="card__facts"><div><dt>Role</dt><dd>${esc(p.role)}</dd></div>${per ? `<div><dt>Period</dt><dd>${esc(per)}</dd></div>` : ''}</dl>
    <p class="card__summary">${esc(p.summary)}</p>
    ${p.metric ? `<p class="card__metric"><b>${esc(p.metric.value)}</b><span>${esc(p.metric.label)}</span></p>` : ''}
    <span class="card__more">View project</span>
  </a>`;
}

function spines() {
  const list = categories.filter((c) => c.id !== 'all');
  return `<ol class="spines" style="--n:${list.length}" aria-label="Work folders">
    ${list
      .map((c, i) => {
        const n = inFolder(c.id).length;
        return `<li class="spine spine--${c.tone}" style="--i:${i}">
        <a href="work.html#${c.id}"><span class="spine__label">${esc(c.label)}</span><span class="spine__count">${n} ${n === 1 ? 'project' : 'projects'}</span></a>
      </li>`;
      })
      .join('')}
  </ol>`;
}

function archiveIndex() {
  return `<ol class="index" aria-label="All projects">
    ${byOrder
      .map((p, i) => `<li><a href="${projectUrl(p)}"><span class="index__no">${String(i + 1).padStart(2, '0')}</span><span class="index__title">${esc(p.title)}</span><span class="index__org">${esc(p.org)}</span><span class="index__role">${esc(p.role)}</span></a></li>`)
      .join('')}
  </ol>`;
}

/* ---------- pages ---------- */

function heroStack(cls) {
  return `<div class="stack ${cls}">
    <div class="paper paper--3"></div>
    <div class="paper paper--2"></div>
    <div class="paper paper--1">
      ${polaroid({ img: about.portrait, tone: 'pink', caption: '<span>Lynn Kim</span>', clipped: true })}
      <p class="typed">${esc(site.secondary)}</p>
    </div>
    <span class="script-mark" aria-hidden="true">portfolio</span>
    <span class="year-mark" aria-hidden="true">(${site.year})</span>
  </div>`;
}

function home() {
  const stage = `<div class="stage stage--home">
    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="giant">${esc(site.name)}</h1>
        <p class="hero-role">${esc(site.headline)}</p>
        <p class="hero-intro">${esc(site.tagline)} ${esc(site.introMore)}</p>
        <ul class="hero-figs" aria-label="Verified figures">
          ${heroFigures.map((f, i) => `<li style="--tilt:${[-1.2, 0.8, -0.6][i]}deg"><a href="project-${f.slug}.html"><b>${esc(f.value)}</b><span>${esc(f.label)}</span></a></li>`).join('')}
        </ul>
        <p class="hero-asof">Instagram figures as of ${esc(site.asOf)}.</p>
        <div class="hero-actions">
          <a class="btn btn--pink" href="work.html">Explore Work</a>
          <a class="btn btn--line" href="about.html">About Me</a>
          <a class="btn btn--line" href="contact.html">Get in Touch</a>
        </div>
        <p class="hero-featured">Featured: ${featuredProjects.map((p) => `<a href="${projectUrl(p)}">${esc(p.title)}</a>`).join(' · ')}</p>
      </div>
      ${heroStack('stack--band')}
    </div>
  </div>`;

  const photoPreview = realPhotos.length
    ? `<div class="mini-photo__row">${realPhotos.slice(0, 3).map((p, i) => `<figure class="mini" style="--tilt:${[-2.5, 1.5, -1][i]}deg">${media(p, ['pink', 'blue', 'cream'][i])}</figure>`).join('')}</div>`
    : '';

  const body = `
  <div class="sheet-stack">${heroStack('stack--sheet')}</div>

  <section class="block" aria-labelledby="feat">
    <div class="block__head">
      <h2 id="feat" class="display">Featured <em>work</em></h2>
      <a class="textlink" href="work.html">Open the archive</a>
    </div>
    <div class="works">${featuredProjects.map((p, i) => projectCard(p, i)).join('')}</div>
  </section>

  <section class="block" aria-labelledby="kf">
    <div class="figs-wrap">
      <div class="block__head">
        <h2 id="kf" class="display display--s">More <em>results</em></h2>
        <p class="small">Each figure belongs to the project beside it. They are not combined totals.</p>
      </div>
      <ul class="figs">
        ${homeFigures.map((f) => `<li><a href="project-${f.slug}.html"><span class="fig__v">${esc(f.value)}</span><span class="fig__l">${esc(f.label)}</span><span class="fig__n">${esc(f.note)}</span></a></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="block block--spines" aria-labelledby="drawer">
    <div class="block__head">
      <h2 id="drawer" class="display display--s">The <em>archive</em></h2>
      <a class="textlink" href="work.html#all">All work</a>
    </div>
    ${spines()}
    ${archiveIndex()}
  </section>

  <section class="block block--about" aria-labelledby="ab">
    <div class="about-note">
      ${polaroid({ img: about.portrait, tone: 'rose', caption: '<span>Lynn Kim</span>', tilt: -3, clipped: true, lace: true, bow: true })}
      <div class="note">
        <h2 id="ab" class="display display--s">A little <em>about me</em></h2>
        <p>I'm a creator and marketer studying at Minerva University.</p>
        <p>I have worked across social media, live commerce, brand activations, and event operations. Alongside my professional experience, I develop independent projects and produce content for my own channels.</p>
        <p>I also enjoy photography and documenting people and everyday moments.</p>
        <a class="textlink" href="about.html">About Lynn</a>
      </div>
    </div>
  </section>

  <section class="mini-photo" aria-labelledby="pt">
    <div class="mini-photo__copy">
      <p class="eyebrow eyebrow--dark">Photography</p>
      <h2 id="pt" class="display display--s">Through <em>My Lens</em></h2>
      <p>Portraits, snap sessions, and everyday moments photographed by me.</p>
      <a class="textlink" href="photography.html">View Photography</a>
    </div>
    ${photoPreview}
  </section>

  <section class="block block--contact" aria-labelledby="ct">
    <div class="contact-strip">
      <h2 id="ct" class="display display--s">Let's <em class="script-em">connect</em></h2>
      <p>For professional opportunities, brand collaborations, content projects, and photography inquiries.</p>
      <p class="contact-strip__links">
        <a class="big-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        <a class="big-link" href="${esc(site.instagram.url)}" target="_blank" rel="noopener">${esc(site.instagram.handle)}</a>
      </p>
    </div>
  </section>`;
  return shell(stage, body, 'home');
}

/* ----- Work: the filing cabinet ----- */

function work() {
  const tabs = categories
    .map((c, i) => `<button class="ftab ftab--${c.tone}" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="false" tabindex="-1" data-i="${i}">${esc(c.label)}</button>`)
    .join('');
  const folders = categories
    .map((c) => {
      const list = inFolder(c.id);
      return `<section class="folder folder--${c.tone}" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" tabindex="0">
        <div class="folder__inner">
          <header class="folder__head">
            <h2 class="display display--s">${esc(c.label)}</h2>
            <p>${esc(c.note)} <span class="count">${list.length} ${list.length === 1 ? 'project' : 'projects'}</span></p>
          </header>
          <div class="folder__files">${list.map((p, i) => projectCard(p, i)).join('')}</div>
        </div>
      </section>`;
    })
    .join('');
  const body = `<div class="cabinet" id="cabinet">
    <div class="ftabs" role="tablist" aria-label="Project folders"><div class="ftabs__row">${tabs}</div></div>
    <div class="cabinet__stack">${folders}</div>
  </div>
  <p class="hint">Select a tab, or use the left and right arrow keys, to bring a folder forward.</p>
  <p class="archive-link"><a class="textlink" href="photography.html">Photography archive</a></p>`;
  return {
    html: shell(plainStage('Work', 'Work', 'Six projects in four folders. Bring one forward to see what is inside.'), body, 'work'),
    after: initCabinet,
  };
}

function initCabinet() {
  const tabs = [...document.querySelectorAll('.ftab')];
  const panels = [...document.querySelectorAll('.folder')];
  const n = tabs.length;
  let active = 0;
  let focusAfter = false;

  function paint() {
    panels.forEach((p, i) => {
      const depth = (i - active + n) % n; // 0 is the front folder
      p.style.setProperty('--d', depth);
      p.classList.toggle('is-front', depth === 0);
      p.toggleAttribute('inert', depth !== 0);
      p.setAttribute('aria-hidden', depth !== 0 ? 'true' : 'false');
    });
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', i === active ? 'true' : 'false');
      t.tabIndex = i === active ? 0 : -1;
    });
    tabs[active].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    if (focusAfter) { tabs[active].focus(); focusAfter = false; }
  }

  /* The URL hash is the single source of truth, so Back and Forward step through folders. */
  function fromHash() {
    const j = categories.findIndex((c) => `#${c.id}` === location.hash);
    active = j >= 0 ? j : 0;
    paint();
  }
  function go(i, focus = false) {
    focusAfter = focus;
    active = (i + n) % n;
    paint();
    const id = categories[active].id;
    if (location.hash !== `#${id}`) location.hash = id;
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => go(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight') { e.preventDefault(); go(i + 1, true); }
      else if (k === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); }
      else if (k === 'Home') { e.preventDefault(); go(0, true); }
      else if (k === 'End') { e.preventDefault(); go(n - 1, true); }
    });
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
}

/* ----- Project detail ----- */

function renderSection(s, n) {
  const list = (items) => `<ul class="ticks">${items.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
  switch (s.type) {
    case 'prose':
      return `<div class="prose">${s.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}</div>`;
    case 'compare':
      return `<div class="cmp-wrap"><table class="cmp"><thead><tr><th scope="col"><span class="sr-only">Detail</span></th>${s.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${s.rows
        .map(([k, ...vals]) => `<tr><th scope="row">${esc(k)}</th>${vals.map((v) => `<td>${esc(v)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table></div>${s.notes ? `<ul class="notes">${s.notes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`;
    case 'events':
      return `<div class="events">${s.events
        .map((e) => `<article class="event"><p class="event__date">${esc(e.date)}</p><h3>${esc(e.name)}</h3><p class="event__role">${esc(e.role)}</p>${list(e.items)}</article>`)
        .join('')}</div>`;
    case 'columns':
      return `<dl class="dcols dcols--${s.items.length}">${s.items.map((c) => `<div><dt>${esc(c.title)}</dt><dd>${esc(c.text)}</dd></div>`).join('')}</dl>`;
    case 'steps':
      return `<ol class="steps">${s.steps.map((x, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${esc(x.step)}</h3><p>${esc(x.text)}</p></div></li>`).join('')}</ol>`;
    case 'metrics':
      return `<div class="metrics">${s.items.map((r) => `<div class="metric"><span class="metric__v">${esc(r.value)}</span><span class="metric__l">${esc(r.label)}</span></div>`).join('')}</div>${s.notes ? `<ul class="notes">${s.notes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`;
    case 'reels':
      return `<ol class="reels">${s.items
        .map((r) => `<li class="reel"><span class="reel__views">${esc(r.views)}<i>views</i></span><span class="reel__rank">${esc(r.rank)}</span>${r.href ? `<a class="textlink" href="${esc(r.href)}" target="_blank" rel="noopener">Watch the Reel</a>` : ''}</li>`)
        .join('')}</ol>${s.note ? `<p class="note-line">${esc(s.note)}</p>` : ''}`;
    case 'split': {
      const side = (x, cls) => `<div class="split__side ${cls}"><h3>${esc(x.heading)}</h3><p class="split__stat"><b>${esc(x.stat.value)}</b><span>${esc(x.stat.label)}</span></p>${list(x.items)}</div>`;
      return `<div class="split">${side(s.left, 'split__side--me')}${side(s.right, 'split__side--them')}</div>${s.note ? `<p class="note-line">${esc(s.note)}</p>` : ''}`;
    }
    case 'periods':
      return `<ol class="periods-list">${s.periods.map((x, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b>${esc(x)}</li>`).join('')}</ol>${s.note ? `<p class="note-line">${esc(s.note)}</p>` : ''}`;
    case 'list':
      return list(s.items);
    case 'chips':
      return `<p class="chips">${s.items.map((x) => `<span>${esc(x)}</span>`).join('')}</p>`;
    case 'callout':
      return `<aside class="callout"><p>${esc(s.text)}</p>${s.items ? list(s.items) : ''}</aside>`;
    default:
      return '';
  }
}

/* ---------- media helpers ---------- */

const hasMedia = (arr) => Array.isArray(arr) && arr.some((m) => m.src);

function mediaFig(m, tone, cls = '') {
  const cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : '';
  if (m.type === 'video') {
    return `<figure class="mf mf--video ${cls}"><video controls preload="metadata" playsinline${m.poster ? ` poster="${esc(m.poster)}"` : ''} aria-label="${esc(m.alt || m.caption || 'Video')}"><source src="${esc(m.src)}"><a href="${esc(m.src)}">Open the video</a></video>${cap}</figure>`;
  }
  return `<figure class="mf ${cls}">${media(m, tone)}${cap}</figure>`;
}

/* Renders only the items that have a real file. Returns '' when there are none. */
function gallery(items, tone, variant = 'grid', forcedCaption = '') {
  const list = (items || []).filter((m) => m.src);
  if (!list.length) return '';
  return `<div class="gal gal--${variant}">${list.map((m, i) => mediaFig(forcedCaption ? { ...m, caption: m.caption || forcedCaption } : m, tone, `mf--${i % 3}`)).join('')}</div>`;
}

const para = (arr) => `<div class="prose">${arr.map((t) => `<p>${esc(t)}</p>`).join('')}</div>`;
const findSec = (p, type, title) => p.sections.find((s) => s.type === type && (!title || s.title === title));
const secHtml = (p, type, title) => {
  const s = findSec(p, type, title);
  return s ? renderSection(s) : '';
};
const overview = (p) => ['Overview', secHtml(p, 'prose', 'Overview')];

/* ---------- the six project layouts ---------- */

const layouts = {
  /* Solo Party: an event planning journey */
  journey(p, c) {
    const journey = `<ol class="journey">${p.journey
      .map((j, i) => `<li class="jstop jstop--${c.tone}" style="--k:${i}"><span class="jstop__when">${esc(j.when)}</span><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p>${j.stat ? `<b class="jstop__stat">${esc(j.stat)}</b>` : ''}</li>`)
      .join('')}</ol>`;
    return [
      overview(p),
      ['The journey', journey],
      ['Two editions compared', secHtml(p, 'compare')],
      ['What I did at each event', secHtml(p, 'events')],
      ['Promotion', para(p.promo) + gallery(p.media.promo, c.tone, 'posters')],
      ['The application system', para(p.system) + gallery(p.media.system, c.tone, 'browser')],
      hasMedia(p.media.photos) ? ['On the day', gallery(p.media.photos, c.tone, 'polaroids')] : null,
      ['Results', secHtml(p, 'metrics', 'Results')],
    ];
  },

  /* @lynnonmi: a video-first wall */
  video(p, c) {
    const rs = findSec(p, 'reels');
    const wall = `<ol class="reelwall">${rs.items
      .map((r, i) => {
        const tones = ['pink', 'blue', 'rose', 'cream'];
        const frame = r.thumb && r.thumb.src
          ? `<div class="rw__frame rw__frame--img">${media(r.thumb, tones[i])}<span class="rw__views">${esc(r.views)}<i>views</i></span></div>`
          : `<div class="rw__frame rw__frame--${tones[i]}"><span class="rw__play" aria-hidden="true"></span><span class="rw__views">${esc(r.views)}<i>views</i></span></div>`;
        return `<li class="rw rw--${i}">${frame}<p class="rw__rank">${esc(r.rank)}</p>${r.concept ? `<p class="rw__note"><b>Concept</b>${esc(r.concept)}</p>` : ''}${r.production ? `<p class="rw__note"><b>Production</b>${esc(r.production)}</p>` : ''}${r.href ? `<a class="textlink" href="${esc(r.href)}" target="_blank" rel="noopener">Watch the Reel</a>` : ''}</li>`;
      })
      .join('')}</ol><p class="note-line">Reel numbers are views on individual videos, not total account views.</p>`;
    return [
      ['Content that performed', wall],
      overview(p),
      ['Verified performance', secHtml(p, 'metrics', 'Verified performance')],
      hasMedia(p.media.extra) ? ['More from the channels', gallery(p.media.extra, c.tone, 'grid')] : null,
      ['Content themes', secHtml(p, 'columns')],
      ['Production process', secHtml(p, 'steps')],
      ['What I do on the channels', secHtml(p, 'list')],
    ];
  },

  /* TikTok LIVE: a broadcast rundown */
  rundown(p, c) {
    const run = `<ol class="rundown">${p.rundown
      .map((r, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${esc(r.step)}</h3><p>${esc(r.text)}</p></li>`)
      .join('')}</ol>`;
    return [
      overview(p),
      ['Broadcast rundown', run],
      hasMedia(p.media.clips) ? ['Broadcast clips', gallery(p.media.clips, c.tone, 'video')] : null,
      hasMedia(p.media.examples) ? ['Live presentation', gallery(p.media.examples, c.tone, 'grid')] : null,
      ['Three engagements', secHtml(p, 'periods')],
      ['Skills demonstrated', secHtml(p, 'chips')],
      ['About the numbers', secHtml(p, 'callout')],
    ];
  },

  /* Red Bull Korea: a field log */
  field(p, c) {
    const stubs = `<div class="festlog"><ul class="stubs" aria-label="${p.festivals} university festivals supported">${Array.from({ length: p.festivals }, (_, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><span>Festival</span></li>`).join('')}</ul><p class="festlog__cap"><b>${p.festivals}</b> university festivals with supported activations</p></div>`;
    const acts = `<dl class="dcols dcols--3">${p.activities.map((a) => `<div><dt>${esc(a.title)}</dt><dd>${esc(a.text)}</dd></div>`).join('')}</dl>`;
    const wings = secHtml(p, 'columns', 'Wings for Life World Run 2025');
    return [
      overview(p),
      ['Festival log', stubs + acts],
      ['Scope of my participation', secHtml(p, 'callout')],
      hasMedia(p.media.activation) || hasMedia(p.media.sampling) ? ['Activations', gallery([...p.media.activation, ...p.media.sampling], c.tone, 'masonry')] : null,
      ['Wings for Life World Run 2025', wings + gallery(p.media.wings, c.tone, 'grid')],
      ['Skills demonstrated', secHtml(p, 'chips')],
    ];
  },

  /* Pimadaziwin: account growth and community operations */
  growth(p, c) {
    const g = p.growth;
    const meter = `<div class="meter" role="img" aria-label="Followers on the brand's X account grew from ${g.from} to ${g.to.toLocaleString('en-US')} in ${g.months} months">
      <div class="meter__bar"><span></span></div>
      <div class="meter__ends"><div><b>${g.from}</b><span>Account launched</span></div><div><b>${g.to.toLocaleString('en-US')}</b><span>Followers, ${g.months} months later</span></div></div>
    </div>${secHtml(p, 'metrics', 'Verified growth').replace(/<div class="metrics">[\s\S]*?<\/div><\/div>/, '')}`;
    const pipe = `<ol class="pipeline">${p.pipeline.map((x, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${esc(x.step)}</h3><p>${esc(x.text)}</p></li>`).join('')}</ol>`;
    return [
      overview(p),
      ['Verified growth', meter],
      ['From launch to growth', secHtml(p, 'steps')],
      hasMedia(p.media.screenshots) || hasMedia(p.media.content) ? ['Account and content', gallery([...p.media.screenshots, ...p.media.content], c.tone, 'browser')] : null,
      ['Community operations', pipe + gallery(p.media.community, c.tone, 'grid')],
      ['What I did', secHtml(p, 'list')],
    ];
  },

  /* Constant / Refilled: two voices */
  voices(p, c) {
    const tiers = `<ol class="tiers">${p.tiers
      .map((t, i) => `<li class="tier tier--${t.by === 'Lynn' ? 'me' : 'them'}" style="--k:${i}"><span class="tier__by">${t.by === 'Lynn' ? 'Done by me' : 'Written by participants'}</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>${t.stat ? `<b class="tier__stat">${esc(t.stat)}</b>` : ''}</li>`)
      .join('')}</ol>`;
    return [
      overview(p),
      ['From recruitment to participation', tiers],
      hasMedia(p.media.influencer) ? ['Influencer seeding', gallery(p.media.influencer, c.tone, 'grid')] : null,
      hasMedia(p.media.campaign) ? ['Campaign materials', gallery(p.media.campaign, c.tone, 'grid')] : null,
      hasMedia(p.media.participantPosts) ? ['Participant-generated posts', gallery(p.media.participantPosts, c.tone, 'browser', 'Written by a participant, not by me.')] : null,
      ['Brand marketing work', secHtml(p, 'list')],
      ['Skills demonstrated', secHtml(p, 'chips')],
    ];
  },
};

/* The editorial spread that opens every project: title paper, metric, and a clipped slip or lead image. */
function spreadTop(p, c) {
  const m = p.spreadStat || p.metric;
  const per = periodText(p);
  const lead = p.lead && p.lead.src
    ? polaroid({ img: p.lead, tone: c.tone, tilt: 2, clipped: true, caption: `<span>${esc(p.title)}</span>` })
    : `<blockquote class="sp-slip">${clip()}<p>${esc(p.heading)}</p></blockquote>`;
  return `<section class="spreadtop spreadtop--${c.tone}" aria-label="Project summary">
    <div class="sp-main">
      <span class="sp-tab">${esc(c.label)}</span>
      <p class="sp-metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></p>
      <p class="sp-role">${esc(p.role)}${per ? ` · ${esc(per)}` : ''}</p>
    </div>
    <div class="sp-side">${doily()}${ribbon()}${lead}</div>
  </section>`;
}

function projectPage() {
  const slug = document.body.dataset.slug || new URLSearchParams(location.search).get('slug');
  const p = byOrder.find((x) => x.slug === slug);
  if (!p) return notFound('Project not found', 'This project is not in the archive.');
  const idx = byOrder.indexOf(p);
  const c = firstCat(p);
  document.title = `${p.title}, Lynn Kim`;
  const folders = p.categories.map((id) => cat(id));
  let n = 0;
  const section = ([title, inner]) => {
    if (!inner) return '';
    n += 1;
    const id = `s${n}`;
    return `<section class="psec psec--${p.layout}" aria-labelledby="${id}"><header class="psec__head"><span class="num">${String(n).padStart(2, '0')}</span><h2 id="${id}" class="display display--s">${esc(title)}</h2></header><div class="psec__body">${inner}</div></section>`;
  };

  const facts = [['Organization', esc(p.org)], ['Role', esc(p.role)]];
  if (p.periods) facts.push(['Periods', `<span class="periods">${p.periods.map((x) => `<span>${esc(x)}</span>`).join('')}</span>`]);
  else if (p.period) facts.push(['Period', esc(p.period)]);
  if (p.platform) facts.push(['Platform', esc(p.platform)]);
  if (p.asOf) facts.push(['Figures as of', esc(site.asOf)]);
  if (!p.platform && !p.asOf) facts.push(['Folder', folders.map((f) => esc(f.label)).join(', ')]);

  const links = p.links.length ? `<p class="links">${p.links.map((l) => `<a class="textlink" href="${esc(l.href)}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(l.text)}</a>`).join('')}</p>` : '';
  const missing = p.wanted.filter(Boolean);
  const allMedia = Object.values(p.media).flat().concat(p.lead ? [p.lead] : []);
  const quiet = allMedia.some((m) => m.src)
    ? ''
    : `<aside class="quiet"><h2 class="quiet__h">Supporting materials</h2><p>Not yet added: ${missing.map((w) => esc(w.toLowerCase())).join(', ')}.</p></aside>`;

  const prev = byOrder[(idx - 1 + byOrder.length) % byOrder.length];
  const next = byOrder[(idx + 1) % byOrder.length];

  const stage = `<div class="stage">
    <p class="eyebrow">${folders.map((f) => esc(f.label)).join(' / ')}</p>
    <h1 class="stage__title">${esc(p.title)}</h1>
    <p class="stage__lede">${esc(p.subtitle)}</p>
  </div>`;

  const body = `
  <p class="crumb"><a href="work.html#${c.id}">Work</a> / <a href="work.html#${c.id}">${esc(c.label)}</a> / ${esc(p.title)}</p>
  <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  ${spreadTop(p, c)}
  ${links}
  ${layouts[p.layout](p, c).filter(Boolean).map(section).join('')}
  ${quiet}
  <nav class="pager" aria-label="Other projects">
    <a href="${projectUrl(prev)}" rel="prev"><span>Previous</span>${esc(prev.title)}</a>
    <a href="${projectUrl(next)}" rel="next"><span>Next</span>${esc(next.title)}</a>
  </nav>`;
  return shell(stage, body, 'work');
}

function notFound(title = 'Page not found', text = 'That page does not exist.') {
  return shell(
    plainStage('404', title, text),
    `<div class="block"><p>Go to <a class="textlink" href="index.html">the home page</a> or <a class="textlink" href="work.html">the work archive</a>.</p></div>`,
    ''
  );
}

/* ----- Photography ----- */

function photographyPage() {
  const portraits = photos.filter((p) => p.type === 'portrait' && p.src);
  const snaps = photos.filter((p) => p.type === 'snap' && p.src);
  const idxOf = (p) => photos.indexOf(p);
  const tones = ['pink', 'blue', 'rose', 'cream'];
  const credit = (p) => `${p.caption ? esc(p.caption) + ' ' : ''}Photograph by Lynn Kim.`;

  const empty = `<section class="block block--intro quiet-wide" aria-labelledby="soon">
    <h2 id="soon" class="display display--s">Photographs <em>coming soon</em></h2>
    <p class="lead">Portraits and snap sessions I have taken will be shown here, with large images that open full size.</p>
    <p class="links links--flow"><a class="textlink" href="${esc(site.instagram.url)}" target="_blank" rel="noopener">See my work on Instagram</a></p>
  </section>`;

  const body = `
  <section class="block block--intro" aria-labelledby="po">
    <h2 id="po" class="display display--s">Photography is an <em>additional</em> part of my creative work</h2>
    <p class="lead">This page features photographs I have personally taken, including portraits, snap sessions, and other selected images.</p>
  </section>

  ${
    photos.length === 0
      ? empty
      : `${portraits.length ? `<section class="block" aria-labelledby="pp">
    <div class="block__head"><h2 id="pp" class="display display--s">Portra<em>its</em></h2></div>
    <div class="spread">${portraits.map((p, i) => `<div class="spread__item spread__item--${(i % 4) + 1}"><button class="shot" style="${p.width && p.height ? `aspect-ratio:${p.width}/${p.height}` : ''}" data-open="${idxOf(p)}" aria-label="Open portrait ${i + 1} in viewer">${media(p, tones[i % 4])}</button><p class="cap">${credit(p)}</p></div>`).join('')}</div>
  </section>` : ''}
  ${snaps.length ? `<section class="block block--blue" aria-labelledby="sn">
    <div class="block__head"><h2 id="sn" class="display display--s">Snap <em>sessions</em></h2></div>
    <div class="snaps">${snaps.map((p, i) => `<button class="snap" data-open="${idxOf(p)}" style="--tilt:${[-2.5, 1.8, -1][i % 3]}deg" aria-label="Open snap ${i + 1} in viewer"><span class="snap__img">${media(p, tones[(i + 1) % 4])}</span><span class="snap__cap">${esc(p.caption || '')}</span></button>`).join('')}</div>
  </section>` : ''}
  ${realPhotos.length >= 6 ? `<section class="block" aria-labelledby="cs">
    <div class="block__head"><h2 id="cs" class="display display--s">Contact <em>sheet</em></h2></div>
    <div class="sheetfilm">${photos.map((p, i) => `<button class="cs-frame" data-open="${i}" aria-label="Open frame ${i + 1} in viewer">${media(p, tones[i % 4])}<i>${String(i + 1).padStart(2, '0')}</i></button>`).join('')}</div>
  </section>` : ''}`
  }

  <p class="small rules">Every photograph is credited to Lynn Kim. Locations, dates and camera details appear only when verified.</p>

  <dialog class="viewer" id="viewer" aria-label="Photograph viewer">
    <div class="viewer__bar"><span id="viewer-count"></span><button class="vbtn" data-act="close">Close</button></div>
    <div class="viewer__stage" id="viewer-stage"></div>
    <div class="viewer__nav"><button class="vbtn" data-act="prev">Previous</button><p id="viewer-cap"></p><button class="vbtn" data-act="next">Next</button></div>
  </dialog>`;
  return {
    html: shell(plainStage('Photography', 'Through My Lens', 'Portraits, snap sessions, and everyday moments photographed by me.'), body, 'photography'),
    after: photos.length ? initViewer : null,
  };
}

function initViewer() {
  const dlg = document.getElementById('viewer');
  const stageEl = document.getElementById('viewer-stage');
  const cap = document.getElementById('viewer-cap');
  const count = document.getElementById('viewer-count');
  let cur = 0;
  const show = (i) => {
    cur = (i + photos.length) % photos.length;
    const p = photos[cur];
    stageEl.innerHTML = media({ ...p }, 'pink');
    cap.textContent = `${p.caption ? p.caption + ' ' : ''}Photograph by Lynn Kim.`;
    count.textContent = `${String(cur + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  };
  document.querySelectorAll('[data-open]').forEach((b) =>
    b.addEventListener('click', () => { show(Number(b.dataset.open)); dlg.showModal(); })
  );
  dlg.addEventListener('click', (e) => {
    const act = e.target.dataset?.act;
    if (act === 'close' || e.target === dlg) dlg.close();
    if (act === 'prev') show(cur - 1);
    if (act === 'next') show(cur + 1);
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}

/* ----- About ----- */

function aboutPage() {
  const body = `
  <section class="about-grid">
    <div class="about-grid__photo">${polaroid({ img: about.portrait, tone: 'pink', tilt: 2, clipped: true, lace: true, caption: '<span>Lynn Kim</span>' })}</div>
    <div class="about-grid__text">
      <h2 class="display">Hello, I'm <em class="script-em">Lynn</em></h2>
      <div class="prose prose--lead">${about.intro.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
    </div>
  </section>

  <section class="block" aria-labelledby="ed">
    <div class="edu">
      <h2 id="ed" class="display display--s">Education</h2>
      ${about.education.map((e) => `<p class="edu__row"><b>${esc(e.school)}</b><span>${esc(e.detail)}</span><span>${esc(e.status)}</span></p>`).join('')}
    </div>
  </section>

  <section class="block" aria-labelledby="ex">
    <h2 id="ex" class="display display--s">Professional <em>experience</em></h2>
    <ol class="timeline">
      ${about.experience
        .map(
          (e) => `<li>
        <div class="timeline__when">${e.periods ? e.periods.map((x) => `<span>${esc(x)}</span>`).join('') : e.period ? `<span>${esc(e.period)}</span>` : `<span class="pending">Dates to be confirmed</span>`}</div>
        <div class="timeline__what"><h3><a href="project-${e.slug}.html">${esc(e.role)}</a></h3><p>${esc(e.org)}</p>${e.periods ? '<p class="small">Three separate engagements.</p>' : ''}</div>
      </li>`
        )
        .join('')}
    </ol>
  </section>

  <section class="block block--small" aria-labelledby="ad">
    <h2 id="ad" class="display display--xs">Additional <em>experience</em></h2>
    <ul class="addl">
      ${about.additional.map((a) => `<li><h3>${esc(a.name)}</h3><p>${esc(a.text)}</p><p class="small">${esc(a.note)}</p></li>`).join('')}
    </ul>
  </section>

  <section class="block" aria-labelledby="sk">
    <h2 id="sk" class="display display--s">Skills</h2>
    <div class="skills">
      ${about.skills.map((g, i) => `<div class="skill skill--${['blue', 'pink', 'cream', 'rose'][i]}"><h3>${esc(g.group)}</h3><ul class="plain">${g.items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('')}
    </div>
  </section>`;
  return shell(plainStage('About', 'About Lynn', 'Creator, marketer and event organizer, studying at Minerva University.'), body, 'about');
}

/* ----- Contact ----- */

function contactPage() {
  const cv = site.resume
    ? `<a class="btn" href="${esc(site.resume)}" download>Download resume (PDF)</a>`
    : `<span class="btn btn--off" aria-disabled="true">Resume PDF to be added</span>`;
  const body = `
  <section class="contact">
    <div class="note-pad">
      ${clip('clip--rose')}
      <h2 class="display">Write to <em class="script-em">Lynn</em></h2>
      <dl class="contact__list">
        <div><dt>Email</dt><dd><a class="big-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
        <div><dt>Instagram</dt><dd><a class="big-link" href="${esc(site.instagram.url)}" rel="noopener" target="_blank">${esc(site.instagram.handle)}</a></dd></div>
        <div><dt>Resume</dt><dd>${cv}</dd></div>
      </dl>
    </div>
    <div class="contact__side">${polaroid({ img: about.portrait, tone: 'blue', tilt: -2, clipped: true, lace: true, bow: true, caption: '<span>Lynn Kim</span>' })}</div>
  </section>`;
  return shell(plainStage('Contact', "Let's Connect", 'For professional opportunities, brand collaborations, content projects, and photography inquiries, feel free to reach out.'), body, 'contact');
}

/* ---------- mount ---------- */

const pages = { home, work, project: projectPage, photography: photographyPage, about: aboutPage, contact: contactPage, notfound: () => notFound() };
const out = (pages[page] || pages.notfound)();
const html = typeof out === 'string' ? out : out.html;
document.getElementById('root').outerHTML = html;
if (out.after) out.after();
const titles = { home: 'Lynn Kim, Content Creator, Marketer, Event Organizer', work: 'Work', photography: 'Through My Lens', about: 'About Lynn', contact: "Let's Connect", notfound: 'Page not found' };
if (titles[page]) document.title = page === 'home' ? titles[page] : `${titles[page]}, Lynn Kim`;
document.documentElement.classList.toggle('reduce-motion', reduceMotion.matches);
