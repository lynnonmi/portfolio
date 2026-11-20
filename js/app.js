import { site, categories, projects, photos, about, keyFigures, featured as featuredOrder } from './data.js';

const page = document.body.dataset.page;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cat = (id) => categories.find((c) => c.id === id);
const byOrder = featuredOrder.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);
const inFolder = (id) => (id === 'all' ? byOrder : byOrder.filter((p) => p.categories.includes(id)));
const firstCat = (p) => cat(p.categories[0]);
const projectUrl = (p) => `project.html?slug=${p.slug}`;

/* ---------- small building blocks ---------- */

const pending = (text) => `<span class="pending">${esc(text)}</span>`;
const clip = (cls = '') => `<svg class="clip ${cls}" aria-hidden="true" focusable="false"><use href="#clip"/></svg>`;
const stamp = (text = 'Pending') => `<span class="stamp">${esc(text)}</span>`;

/* Real image when src exists, labelled placeholder frame otherwise. */
function media({ src, alt, width, height }, tone, label) {
  if (src) {
    const size = width && height ? ` width="${width}" height="${height}"` : '';
    return `<img class="media" src="${esc(src)}" alt="${esc(alt || '')}"${size} loading="lazy" decoding="async">`;
  }
  return `<div class="ph ph--${tone}" role="img" aria-label="Pending: ${esc(label)}"><span>${esc(label)}</span></div>`;
}

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

function polaroid({ img, caption, tone, tilt = 0, clipped = false, taped = false, lace = false, bow = false, ph = 'Photo pending' }) {
  const fig = `<figure class="polaroid" style="--tilt:${tilt}deg">
    ${clipped ? clip() : ''}${taped ? '<span class="tape" aria-hidden="true"></span>' : ''}
    <div class="polaroid__img">${media(img, tone, ph)}</div>
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

function periodRow(p) {
  const v = p.periodShort || p.period;
  return v ? ['Period', esc(v)] : ['Data as of', esc(site.asOf)];
}

function projectCard(p, i) {
  const c = firstCat(p);
  const tilt = [-1.3, 1.1, -0.8][i % 3];
  const [pk, pv] = periodRow(p);
  return `<a class="card" href="${projectUrl(p)}" style="--tilt:${tilt}deg">
    ${i % 2 === 0 ? clip() : ''}
    ${label(c.label)}
    <div class="card__img">${media({ src: null }, c.tone, 'Cover image pending')}</div>
    <h3 class="card__title">${esc(p.title)}</h3>
    <p class="card__org">${esc(p.org)}</p>
    <dl class="card__facts"><div><dt>Role</dt><dd>${esc(p.role)}</dd></div><div><dt>${pk}</dt><dd>${pv}</dd></div></dl>
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

/* ---------- pages ---------- */

function home() {
  const stage = `<div class="stage stage--home">
    <h1 class="giant">${esc(site.name)}</h1>
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-role">${esc(site.headline)}</p>
        <p class="hero-sub">${esc(site.secondary)}</p>
        <p class="hero-intro">${esc(site.tagline)}</p>
        <div class="hero-actions">
          <a class="btn btn--pink" href="work.html">Explore My Work</a>
          <a class="btn btn--line" href="about.html">About Me</a>
          <a class="btn btn--line" href="contact.html">Get in Touch</a>
        </div>
      </div>
      <div class="stack">
        <div class="paper paper--3"></div>
        <div class="paper paper--2"></div>
        <div class="paper paper--1">
          ${polaroid({ img: about.portrait, tone: 'pink', caption: `${stamp()}<span>Portrait of Lynn</span>`, clipped: true, ph: 'Portrait pending' })}
          <p class="typed">${esc(site.secondary)}</p>
        </div>
        <span class="script-mark" aria-hidden="true">portfolio</span>
        <span class="year-mark" aria-hidden="true">(${site.year})</span>
      </div>
    </div>
  </div>`;

  const body = `
  <section class="block" aria-labelledby="sel">
    <div class="block__head">
      <h2 id="sel" class="display">Selected <em>work</em></h2>
      <a class="textlink" href="work.html">Open the archive</a>
    </div>
    <div class="works">${byOrder.map((p, i) => projectCard(p, i)).join('')}</div>
  </section>

  <section class="block block--spines" aria-labelledby="drawer">
    <h2 id="drawer" class="display display--s">Browse by <em>folder</em></h2>
    ${spines()}
  </section>

  <section class="block" aria-labelledby="kf">
    <div class="figs-wrap">
      <div class="block__head">
        <h2 id="kf" class="display display--s">Key <em>figures</em></h2>
        <p class="small">Each figure belongs to the project beside it. They are not combined totals. Instagram figures are as of ${esc(site.asOf)}.</p>
      </div>
      <ul class="figs">
        ${keyFigures
          .map((f) => `<li><a href="project.html?slug=${f.slug}"><span class="fig__v">${esc(f.value)}</span><span class="fig__l">${esc(f.label)}</span><span class="fig__n">${esc(f.note)}</span></a></li>`)
          .join('')}
      </ul>
    </div>
  </section>

  <section class="block block--about" aria-labelledby="ab">
    <div class="about-note">
      ${polaroid({ img: about.portrait, tone: 'rose', caption: `${stamp()}<span>Portrait of Lynn</span>`, tilt: -3, clipped: true, lace: true, bow: true, ph: 'Portrait pending' })}
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
    <div class="mini-photo__row">
      ${photos.slice(0, 3).map((p, i) => `<figure class="mini" style="--tilt:${[-2.5, 1.5, -1][i]}deg">${media(p, ['pink', 'blue', 'cream'][i], `Photo ${i + 1} pending`)}</figure>`).join('')}
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
  }

  function select(i, { focus = false, push = true } = {}) {
    active = (i + n) % n;
    paint();
    if (focus) tabs[active].focus();
    tabs[active].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    if (push) history.replaceState(null, '', `#${categories[active].id}`);
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight') { e.preventDefault(); select(i + 1, { focus: true }); }
      else if (k === 'ArrowLeft') { e.preventDefault(); select(i - 1, { focus: true }); }
      else if (k === 'Home') { e.preventDefault(); select(0, { focus: true }); }
      else if (k === 'End') { e.preventDefault(); select(n - 1, { focus: true }); }
    });
  });

  const fromHash = categories.findIndex((c) => `#${c.id}` === location.hash);
  select(fromHash >= 0 ? fromHash : 0, { push: false });
  window.addEventListener('hashchange', () => {
    const j = categories.findIndex((c) => `#${c.id}` === location.hash);
    if (j >= 0) select(j, { push: false });
  });
}

/* ----- Project detail ----- */

function projectPage() {
  const slug = new URLSearchParams(location.search).get('slug');
  const p = byOrder.find((x) => x.slug === slug);
  if (!p) {
    return shell(
      plainStage('Work', 'Project not found', 'This project is not in the archive.'),
      `<div class="block"><p>Return to <a class="textlink" href="work.html">the Work archive</a>.</p></div>`,
      'work'
    );
  }
  const idx = byOrder.indexOf(p);
  const c = firstCat(p);
  document.title = `${p.title}, Lynn Kim`;
  const folders = p.categories.map((id) => cat(id));
  const list = (items) => `<ul class="ticks">${items.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
  let n = 0;
  const section = (title, inner, cls = '') => {
    n += 1;
    const id = `s${n}`;
    return `<section class="psec ${cls}" aria-labelledby="${id}"><header class="psec__head"><span class="num">${String(n).padStart(2, '0')}</span><h2 id="${id}" class="display display--s">${title}</h2></header><div class="psec__body">${inner}</div></section>`;
  };

  const facts = [
    ['Organization', esc(p.org)],
    ['Role', esc(p.role)],
    p.periods
      ? ['Periods', `<span class="periods">${p.periods.map((x) => `<span>${esc(x)}</span>`).join('')}</span>`]
      : p.period
        ? ['Period', esc(p.period)]
        : ['Data as of', esc(site.asOf)],
    p.platform ? ['Platform', esc(p.platform)] : ['Folder', folders.map((f) => esc(f.label)).join(', ')],
  ];

  const overview = `<div class="prose">${p.overview.map((t) => `<p>${esc(t)}</p>`).join('')}</div>${
    p.links.length ? `<p class="links">${p.links.map((l) => `<a class="textlink" href="${esc(l.href)}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(l.text)}</a>`).join('')}</p>` : ''
  }`;

  let role = '';
  if (p.events) {
    role += `<div class="events">${p.events
      .map(
        (e, i) => `<article class="event" style="--tilt:${i ? 0.8 : -0.8}deg">
        <p class="event__date">${esc(e.date)}</p>
        <h3>${esc(e.name)}</h3>
        <p class="event__role">${esc(e.role)}</p>
        ${list(e.responsibilities)}
        <p class="chips chips--solid">${e.results.map((r) => `<span>${esc(r)}</span>`).join('')}</p>
      </article>`
      )
      .join('')}</div>`;
  } else if (p.responsibilities) {
    role += list(p.responsibilities);
  }
  if (p.themes) role += `<h3 class="sub">Content themes</h3><dl class="themes">${p.themes.map((t) => `<div><dt>${esc(t.name)}</dt><dd>${esc(t.text)}</dd></div>`).join('')}</dl>`;
  if (p.extras) role += p.extras.map((x) => `<aside class="extra"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></aside>`).join('');
  if (p.skills && p.skills.length) role += `<h3 class="sub">Skills demonstrated</h3><p class="chips">${p.skills.map((s) => `<span>${esc(s)}</span>`).join('')}</p>`;

  const proc = p.process
    ? `<ol class="steps">${p.process.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${esc(s.step)}</h3><p>${esc(s.text)}</p></div></li>`).join('')}</ol>`
    : '';

  let res = '';
  if (p.results.length) res += `<div class="metrics">${p.results.map((r) => `<div class="metric"><span class="metric__v">${esc(r.value)}</span><span class="metric__l">${esc(r.label)}</span></div>`).join('')}</div>`;
  if (p.resultsNote) res += `<p class="note-line">${esc(p.resultsNote)}</p>`;
  if (p.notes && p.notes.length) res += `<ul class="notes">${p.notes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  if (p.reels) {
    res += `<h3 class="sub">Representative Reels</h3><div class="reels">${p.reels
      .map((r, i) => `<article class="reel"><div class="reel__thumb">${media({ src: null }, ['pink', 'blue', 'rose', 'cream'][i], 'Thumbnail pending')}</div><p class="reel__views">${esc(r.views)}<span>views</span></p><p class="reel__rank">${esc(r.rank)}</p><p class="reel__todo">${pending('Reel link and creative note to be added')}</p></article>`)
      .join('')}</div>`;
  }

  const ev = `<p class="small">These materials are not yet uploaded. Each frame names what will go there.</p><div class="evi-grid">${p.evidence
    .map((e, i) => `<figure class="evi"><div class="evi__img">${media({ src: null }, ['pink', 'blue', 'cream', 'rose'][i % 4], 'Pending')}</div><figcaption>${stamp()} ${esc(e)}</figcaption></figure>`)
    .join('')}</div>`;

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
  <p class="pull">${esc(p.heading)}</p>
  ${section('Overview', overview)}
  ${section(p.events ? 'My role' : 'What I did', role)}
  ${proc ? section(p.processTitle || 'Process', proc) : ''}
  ${section('Results', res)}
  ${section('Visual evidence', ev, 'psec--evi')}
  <nav class="pager" aria-label="Other projects">
    <a href="${projectUrl(prev)}"><span>Previous</span>${esc(prev.title)}</a>
    <a href="${projectUrl(next)}"><span>Next</span>${esc(next.title)}</a>
  </nav>`;
  return shell(stage, body, 'work');
}

/* ----- Photography ----- */

function photographyPage() {
  const portraits = photos.filter((p) => p.type === 'portrait');
  const snaps = photos.filter((p) => p.type === 'snap');
  const idxOf = (p) => photos.indexOf(p);
  const tones = ['pink', 'blue', 'rose', 'cream'];
  const real = photos.filter((p) => p.src);

  const frame = (p, i) => `<button class="shot shot--${p.shape}" data-open="${idxOf(p)}" aria-label="Open portrait ${p.no} in viewer">
      ${media(p, tones[i % 4], `Portrait ${p.no} pending`)}
      <span class="shot__no">${p.no}</span>
    </button>`;
  const credit = (p) => (p.src ? `${esc(p.caption || '')} Photograph by Lynn Kim.` : pending('Photograph, caption and credit to be added'));

  const body = `
  <section class="block block--intro" aria-labelledby="po">
    <h2 id="po" class="display display--s">Photography is an <em>additional</em> part of my creative work</h2>
    <p class="lead">This page features photographs I have personally taken, including portraits, snap sessions, and other selected images.</p>
    <p class="small">The photographs are still being added. Placeholder frames show where they will go.</p>
  </section>

  <section class="block" aria-labelledby="pp">
    <div class="block__head"><h2 id="pp" class="display display--s">Portra<em>its</em></h2></div>
    <div class="spread">
      ${portraits.map((p, i) => `<div class="spread__item spread__item--${i + 1}">${frame(p, i)}<p class="cap">${credit(p)}</p></div>`).join('')}
    </div>
  </section>

  <section class="block block--blue" aria-labelledby="sn">
    <div class="block__head"><h2 id="sn" class="display display--s">Snap <em>sessions</em></h2></div>
    <div class="snaps">
      ${snaps.map((p, i) => `<button class="snap" data-open="${idxOf(p)}" style="--tilt:${[-2.5, 1.8, -1][i]}deg" aria-label="Open snap ${p.no} in viewer">${i % 2 ? '' : clip()}<span class="snap__img">${media(p, tones[(i + 1) % 4], `Snap ${p.no} pending`)}</span><span class="snap__cap">${p.src ? esc(p.caption || '') : stamp()}<i>${p.no}</i></span></button>`).join('')}
    </div>
  </section>

  ${real.length >= 6 ? `<section class="block" aria-labelledby="cs">
    <div class="block__head"><h2 id="cs" class="display display--s">Contact <em>sheet</em></h2></div>
    <div class="sheetfilm">${photos.map((p, i) => `<button class="cs-frame" data-open="${i}" aria-label="Open frame ${i + 1} in viewer">${media(p, tones[i % 4], 'Pending')}<i>${String(i + 1).padStart(2, '0')}</i></button>`).join('')}</div>
  </section>` : ''}

  <p class="small rules">Lifestyle, editorial and event series will be added when photographs are supplied. Every photograph is credited to Lynn Kim. Locations, dates and camera details appear only when verified.</p>

  <dialog class="viewer" id="viewer" aria-label="Photograph viewer">
    <div class="viewer__bar"><span id="viewer-count"></span><button class="vbtn" data-act="close">Close</button></div>
    <div class="viewer__stage" id="viewer-stage"></div>
    <div class="viewer__nav"><button class="vbtn" data-act="prev">Previous</button><p id="viewer-cap"></p><button class="vbtn" data-act="next">Next</button></div>
  </dialog>`;
  return {
    html: shell(plainStage('Photography', 'Through My Lens', 'Portraits, snap sessions, and everyday moments photographed by me.'), body, 'photography'),
    after: initViewer,
  };
}

function initViewer() {
  const dlg = document.getElementById('viewer');
  const stageEl = document.getElementById('viewer-stage');
  const cap = document.getElementById('viewer-cap');
  const count = document.getElementById('viewer-count');
  const tones = ['pink', 'blue', 'rose', 'cream'];
  let cur = 0;
  const show = (i) => {
    cur = (i + photos.length) % photos.length;
    const p = photos[cur];
    stageEl.innerHTML = media({ ...p }, tones[cur % 4], `${p.type === 'portrait' ? 'Portrait' : 'Snap'} ${p.no}, photograph pending`);
    cap.innerHTML = p.src ? `${esc(p.caption || '')} Photograph by Lynn Kim.` : pending('Photograph pending. Lynn\'s photograph will appear here.');
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
    <div class="about-grid__photo">${polaroid({ img: about.portrait, tone: 'pink', tilt: 2.5, clipped: true, lace: true, caption: `${stamp()}<span>Portrait of Lynn</span>`, ph: 'Portrait pending' })}</div>
    <div class="about-grid__text">
      <span class="rings" aria-hidden="true"></span>
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
        <div class="timeline__what"><h3><a href="project.html?slug=${e.slug}">${esc(e.role)}</a></h3><p>${esc(e.org)}</p>${e.periods ? '<p class="small">Three separate engagements.</p>' : ''}</div>
      </li>`
        )
        .join('')}
    </ol>
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
  const email = `<a class="big-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a>`;
  const ig = `<a class="big-link" href="${esc(site.instagram.url)}" rel="noopener" target="_blank">${esc(site.instagram.handle)}</a>`;
  const cv = site.resume
    ? `<a class="btn" href="${esc(site.resume)}" download>Download resume (PDF)</a>`
    : `<span class="btn btn--off" aria-disabled="true">Resume PDF to be added</span>`;
  const body = `
  <section class="contact">
    <div class="note-pad">
      ${clip('clip--rose')}
      <h2 class="display">Write to <em class="script-em">Lynn</em></h2>
      <dl class="contact__list">
        <div><dt>Email</dt><dd>${email}</dd></div>
        <div><dt>Instagram</dt><dd>${ig}</dd></div>
        <div><dt>Resume</dt><dd>${cv}</dd></div>
      </dl>
    </div>
    <div class="contact__side"><div class="stamp-card"><span>Lynn Kim</span><b>Portfolio ${site.year}</b><i>${esc(site.headline)}</i></div>${polaroid({ img: about.portrait, tone: 'blue', tilt: -2, clipped: true, lace: true, bow: true, caption: `${stamp()}<span>Portrait of Lynn</span>`, ph: 'Portrait pending' })}</div>
  </section>`;
  return shell(plainStage('Contact', "Let's Connect", 'For professional opportunities, brand collaborations, content projects, and photography inquiries, feel free to reach out.'), body, 'contact');
}

/* ---------- mount ---------- */

const pages = { home, work, project: projectPage, photography: photographyPage, about: aboutPage, contact: contactPage };
const out = pages[page]();
const html = typeof out === 'string' ? out : out.html;
document.getElementById('root').outerHTML = html;
if (out.after) out.after();
const titles = { home: 'Lynn Kim, Content Creator, Marketer, Event Organizer', work: 'Work', photography: 'Through My Lens', about: 'About Lynn', contact: "Let's Connect" };
if (titles[page]) document.title = page === 'home' ? titles[page] : `${titles[page]}, Lynn Kim`;
document.documentElement.classList.toggle('reduce-motion', reduceMotion.matches);
