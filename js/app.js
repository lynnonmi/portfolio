import { site, categories, projects, photos, about } from './data.js';

const page = document.body.dataset.page;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cat = (id) => categories.find((c) => c.id === id);

/* ---------- small building blocks ---------- */

const pending = (text) => `<span class="pending">${esc(text)}</span>`;
const val = (v, fallback) => (v ? esc(v) : pending(fallback));

const clip = (cls = '') => `<svg class="clip ${cls}" aria-hidden="true" focusable="false"><use href="#clip"/></svg>`;

const stamp = (text = 'Placeholder') => `<span class="stamp">${esc(text)}</span>`;

/* Real image when src exists, labelled placeholder frame otherwise. */
function media({ src, alt, width, height }, tone, label) {
  if (src) {
    const size = width && height ? ` width="${width}" height="${height}"` : '';
    return `<img class="media" src="${esc(src)}" alt="${esc(alt || '')}"${size} loading="lazy" decoding="async">`;
  }
  return `<div class="ph ph--${tone}" role="img" aria-label="Placeholder: ${esc(label)}"><span>${esc(label)}</span></div>`;
}

const label = (text) => `<span class="label">${esc(text)}</span>`;

function polaroid({ img, caption, tone, tilt = 0, clipped = false, taped = false, ph = 'Photo placeholder' }) {
  return `<figure class="polaroid" style="--tilt:${tilt}deg">
    ${clipped ? clip() : ''}${taped ? '<span class="tape" aria-hidden="true"></span>' : ''}
    <div class="polaroid__img">${media(img, tone, ph)}</div>
    <figcaption>${caption}</figcaption>
  </figure>`;
}

/* ---------- layout ---------- */

const nav = [
  { id: 'home', href: 'index.html', text: 'Home' },
  { id: 'work', href: 'work.html', text: 'Work' },
  { id: 'photography', href: 'photography.html', text: 'Photography' },
  { id: 'about', href: 'about.html', text: 'About' },
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
        <span class="top__note">Portfolio archive ${site.year}</span>
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
  <p class="eyebrow">${eyebrow}</p>
  <h1 class="stage__title">${title}</h1>
  <p class="stage__lede">${lede}</p>
</div>`;

/* ---------- pieces used on several pages ---------- */

function projectCard(p, i) {
  const c = cat(p.category);
  const tilt = i % 2 ? 1.2 : -1.4;
  return `<a class="card" href="project.html?slug=${p.slug}" style="--tilt:${tilt}deg">
    ${i % 2 === 0 ? clip() : ''}
    ${label(`${c.label} / ${p.no}`)}
    <div class="card__img">${media(p.cover, c.tone, 'Project cover placeholder')}</div>
    <h3 class="card__title">${p.title ? esc(p.title) : `${esc(c.label)} project ${p.no} ${pending('title to be added')}`}</h3>
    <p class="card__meta">${val(p.role, 'Role to be added')}</p>
    <span class="card__more">View project</span>
  </a>`;
}

function spines() {
  return `<ol class="spines" aria-label="Folders">
    ${categories
      .map(
        (c, i) => `<li class="spine spine--${c.tone}" style="--i:${i}">
        <a href="work.html#${c.id}"><span class="spine__label">${esc(c.label)}</span><span class="spine__count">${projects.filter((p) => p.category === c.id).length} files</span></a>
      </li>`
      )
      .join('')}
  </ol>`;
}

/* ---------- pages ---------- */

function home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const stage = `<div class="stage stage--home">
    <h1 class="giant">${esc(site.name)}</h1>
    <div class="stack" aria-hidden="false">
      <div class="paper paper--3"></div>
      <div class="paper paper--2"></div>
      <div class="paper paper--1">
        ${polaroid({ img: { src: null }, tone: 'pink', caption: `${stamp('Placeholder')}<span>Portrait of Lynn, to be added</span>`, clipped: true, ph: 'Portrait of Lynn' })}
        <p class="typed">${esc(site.statement)}</p>
      </div>
      <span class="script-mark" aria-hidden="true">portfolio</span>
      <span class="year-mark" aria-hidden="true">(${site.year})</span>
    </div>
  </div>`;

  const body = `
  <section class="block" aria-labelledby="sel">
    <div class="block__head">
      <h2 id="sel" class="display">Selected <em>work</em></h2>
      <a class="textlink" href="work.html">Open the archive</a>
    </div>
    <div class="scatter">${featured.map((p, i) => projectCard(p, i)).join('')}</div>
  </section>

  <section class="block block--spines" aria-labelledby="drawer">
    <h2 id="drawer" class="display display--s">Five <em>folders</em></h2>
    ${spines()}
  </section>

  <section class="block" aria-labelledby="pt">
    <div class="strip-wrap">
      <div class="strip-copy">
        <p class="eyebrow eyebrow--dark">Photography</p>
        <h2 id="pt" class="display display--s">Photographs by <em>Lynn</em></h2>
        <p>Portraits and snap sessions, shot and edited by Lynn.</p>
        <a class="textlink" href="photography.html">See the gallery</a>
      </div>
      <div class="film" aria-hidden="true">
        ${photos.slice(0, 6).map((p, i) => `<div class="film__frame">${media(p, ['pink', 'blue', 'cream', 'rose', 'blue', 'pink'][i], 'Photo ' + p.no)}<i>${String(i + 1).padStart(2, '0')}</i></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="block block--about" aria-labelledby="ab">
    <div class="about-note">
      ${polaroid({ img: about.portrait, tone: 'rose', caption: `${stamp()}<span>Portrait to be added</span>`, tilt: -3, clipped: true, ph: 'Portrait of Lynn' })}
      <div class="note">
        <h2 id="ab" class="display display--s">About <em>Lynn</em></h2>
        <p>${about.intro ? esc(about.intro) : pending('Introduction in Lynn\'s own words to be added.')}</p>
        <a class="textlink" href="about.html">Experience, education and skills</a>
      </div>
    </div>
  </section>`;
  return shell(stage, body, 'home');
}

/* ----- Work: the filing cabinet ----- */

function work() {
  const tabs = categories
    .map(
      (c, i) => `<button class="ftab ftab--${c.tone}" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="false" tabindex="-1" data-i="${i}">${esc(c.label)}</button>`
    )
    .join('');
  const folders = categories
    .map((c) => {
      const list = projects.filter((p) => p.category === c.id);
      return `<section class="folder folder--${c.tone}" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" tabindex="0">
        <div class="folder__inner">
          <header class="folder__head">
            <h2 class="display display--s">${esc(c.label)}</h2>
            <p>${esc(c.note)} <span class="count">${list.length} files</span></p>
          </header>
          <div class="folder__files">${list.map((p, i) => projectCard(p, i)).join('')}</div>
        </div>
      </section>`;
    })
    .join('');
  const body = `<div class="cabinet" id="cabinet">
    <div class="ftabs" role="tablist" aria-label="Project categories"><div class="ftabs__row">${tabs}</div></div>
    <div class="cabinet__stack">${folders}</div>
  </div>
  <p class="hint">Select a tab, or use the left and right arrow keys, to bring a folder forward.</p>`;
  const html = shell(plainStage('Archive / 02', 'Work', 'Five folders. Bring one forward to see the projects inside.'), body, 'work');
  return { html, after: initCabinet };
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
      p.style.setProperty('--r', 0);
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
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) {
    return shell(
      plainStage('Archive', 'File not found', 'This project is not in the archive.'),
      `<div class="block"><p>Return to <a class="textlink" href="work.html">the Work archive</a>.</p></div>`,
      'work'
    );
  }
  const p = projects[idx];
  const c = cat(p.category);
  document.title = `${p.title || `${c.label} project ${p.no}`}, Lynn Kim`;

  const facts = [
    ['Category', esc(c.label)],
    ['Year', val(p.year, 'To be added')],
    ['Client', val(p.client, 'To be added')],
    ['Lynn\'s role', val(p.role, 'To be added')],
  ];

  const resp = p.responsibilities.length
    ? `<ul class="ticks">${p.responsibilities.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`
    : `<ul class="ticks ticks--ph">${['What Lynn planned, made or ran herself', 'Tools or channels she used', 'Who she worked with and where she led'].map((r) => `<li>${pending(r)}</li>`).join('')}</ul>`;

  const proc = p.process.length
    ? p.process.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${esc(s.step)}</h3><p>${esc(s.text)}</p></div></li>`).join('')
    : ['Research and brief', 'Planning and production', 'Launch and follow-up'].map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${pending(s)}</h3><p>${pending('Describe this step.')}</p></div></li>`).join('');

  const verified = p.results.filter((r) => r.verified);
  const res = verified.length
    ? verified.map((r) => `<div class="metric"><span class="metric__v">${esc(r.value)}</span><span class="metric__l">${esc(r.label)}</span></div>`).join('')
    : [1, 2, 3].map((k) => `<div class="metric metric--ph"><span class="metric__v">${pending('Verified figure')}</span><span class="metric__l">${pending(`Metric ${k}, with its source`)}</span></div>`).join('');

  const ev = p.evidence
    .map((e, i) => polaroid({ img: e, tone: c.tone, tilt: [-2, 1.5, -1][i % 3], clipped: i === 1, taped: i === 0, caption: e.caption ? esc(e.caption) : `${stamp()}<span>Evidence ${i + 1}</span>`, ph: `Evidence ${i + 1}` }))
    .join('');

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const nm = (q) => (q.title ? esc(q.title) : `${esc(cat(q.category).label)} project ${q.no}`);

  const stage = `<div class="stage">
    <p class="eyebrow">${esc(c.label)} / ${p.no}</p>
    <h1 class="stage__title">${p.title ? esc(p.title) : `${esc(c.label)} project ${p.no}`}</h1>
    <p class="stage__lede">${p.summary ? esc(p.summary) : pending('One-sentence summary to be added.')}</p>
  </div>`;

  const body = `
  <p class="crumb"><a href="work.html#${c.id}">Work</a> / <a href="work.html#${c.id}">${esc(c.label)}</a> / ${p.no}</p>
  <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>

  <div class="detail">
    <section class="detail__sec" aria-labelledby="d1"><span class="num">01</span><h2 id="d1" class="display display--s">Objective</h2>
      <p>${p.objective ? esc(p.objective) : pending('What this project had to achieve, in one or two sentences.')}</p></section>
    <section class="detail__sec" aria-labelledby="d2"><span class="num">02</span><h2 id="d2" class="display display--s">What Lynn did</h2>${resp}</section>
    <section class="detail__sec detail__sec--wide" aria-labelledby="d3"><span class="num">03</span><h2 id="d3" class="display display--s">Process</h2><ol class="steps">${proc}</ol></section>
    <section class="detail__sec detail__sec--wide" aria-labelledby="d4"><span class="num">04</span><h2 id="d4" class="display display--s">Results</h2>
      <div class="metrics">${res}</div>
      ${verified.length ? '' : '<p class="small">Only verified figures are shown here.</p>'}</section>
  </div>

  <section class="evidence" aria-labelledby="d5"><h2 id="d5" class="display display--s">Visual <em>evidence</em></h2><div class="evidence__row">${ev}</div></section>

  <nav class="pager" aria-label="Other projects">
    <a href="project.html?slug=${prev.slug}"><span>Previous</span>${nm(prev)}</a>
    <a href="project.html?slug=${next.slug}"><span>Next</span>${nm(next)}</a>
  </nav>`;
  return shell(stage, body, 'work');
}

/* ----- Photography ----- */

function photographyPage() {
  const portraits = photos.filter((p) => p.type === 'portrait');
  const snaps = photos.filter((p) => p.type === 'snap');
  const idxOf = (p) => photos.indexOf(p);
  const tones = ['pink', 'blue', 'rose', 'cream'];

  const frame = (p, i, extra = '') => `<button class="shot shot--${p.shape} ${extra}" data-open="${idxOf(p)}" aria-label="Open portrait ${p.no} in viewer">
      ${media(p, tones[i % 4], `Portrait ${p.no}`)}
      <span class="shot__no">${p.no}</span>
    </button>`;

  const body = `
  <section class="block" aria-labelledby="pp">
    <div class="block__head"><h2 id="pp" class="display">Portra<em>its</em></h2><p class="small">Photographed by Lynn Kim.</p></div>
    <div class="spread">
      ${portraits.map((p, i) => `<div class="spread__item spread__item--${i + 1}">${frame(p, i)}<p class="cap">${p.caption ? esc(p.caption) : pending('Caption, sitter credit and date to be added')}</p></div>`).join('')}
    </div>
  </section>

  <section class="block block--blue" aria-labelledby="sn">
    <div class="block__head"><h2 id="sn" class="display">Snap <em>sessions</em></h2><p class="small">Quick sessions, printed like snapshots.</p></div>
    <div class="snaps">
      ${snaps.map((p, i) => `<button class="snap" data-open="${idxOf(p)}" style="--tilt:${[-2.5, 1.8, -1, 2.4, -1.6][i]}deg" aria-label="Open snap ${p.no} in viewer">${i % 2 ? '' : clip()}<span class="snap__img">${media(p, tones[(i + 1) % 4], `Snap ${p.no}`)}</span><span class="snap__cap">${p.caption ? esc(p.caption) : `${stamp()}`}<i>${p.no}</i></span></button>`).join('')}
    </div>
  </section>

  <section class="block" aria-labelledby="cs">
    <div class="block__head"><h2 id="cs" class="display">Contact <em>sheet</em></h2><p class="small">Every frame in one place. Select one to enlarge it.</p></div>
    <div class="sheetfilm">
      ${photos.map((p, i) => `<button class="cs-frame" data-open="${i}" aria-label="Open frame ${i + 1} in viewer">${media(p, tones[i % 4], `${p.type === 'portrait' ? 'Portrait' : 'Snap'} ${p.no}`)}<i>${String(i + 1).padStart(2, '0')}</i></button>`).join('')}
    </div>
  </section>

  <dialog class="viewer" id="viewer" aria-label="Photograph viewer">
    <div class="viewer__bar"><span id="viewer-count"></span><button class="vbtn" data-act="close">Close</button></div>
    <div class="viewer__stage" id="viewer-stage"></div>
    <div class="viewer__nav"><button class="vbtn" data-act="prev">Previous</button><p id="viewer-cap"></p><button class="vbtn" data-act="next">Next</button></div>
  </dialog>`;
  return {
    html: shell(plainStage('Archive / 03', 'Photography', 'Portraits and snap sessions, photographed by Lynn Kim.'), body, 'photography'),
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
    stageEl.innerHTML = media({ ...p }, tones[cur % 4], `${p.type === 'portrait' ? 'Portrait' : 'Snap'} ${p.no}, replace with Lynn's photograph`);
    cap.innerHTML = p.src ? esc(p.caption || '') + ' Photograph by Lynn Kim.' : pending('Placeholder. Lynn\'s photograph will appear here.');
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
  const list = (items, render, empty) =>
    items.length ? `<ul class="plain">${items.map(render).join('')}</ul>` : `<ul class="plain plain--ph">${empty.map((e) => `<li>${pending(e)}</li>`).join('')}</ul>`;
  const body = `
  <section class="about-grid">
    <div class="about-grid__photo">${polaroid({ img: about.portrait, tone: 'pink', tilt: 2.5, clipped: true, caption: `${stamp()}<span>Portrait to be added</span>`, ph: 'Portrait of Lynn' })}</div>
    <div class="about-grid__text"><span class="rings" aria-hidden="true"></span>
      <h2 class="display">Hello, I'm <em class="script-em">Lynn</em></h2>
      <p class="lead">${about.intro ? esc(about.intro) : pending('Introduction in Lynn\'s own words to be added. Two to four sentences on who she is and what she makes.')}</p>
      <p class="small">Areas of work: Content, Events, Live Commerce, Brand Marketing and Photography.</p>
    </div>
  </section>

  <div class="cols">
    <section class="col col--blue" aria-labelledby="ex"><h2 id="ex" class="display display--s">Experience</h2>
      ${list(about.experience, (e) => `<li><b>${esc(e.role)}</b>, ${esc(e.org)}<span>${esc(e.period)}</span>${e.note ? `<p>${esc(e.note)}</p>` : ''}</li>`, ['Role, organisation and dates to be added', 'Role, organisation and dates to be added'])}</section>
    <section class="col col--pink" aria-labelledby="ed"><h2 id="ed" class="display display--s">Education</h2>
      ${list(about.education, (e) => `<li><b>${esc(e.school)}</b>${e.degree ? `, ${esc(e.degree)}` : ''}<span>${esc(e.period || '')}</span></li>`, ['School, degree and dates to be added'])}</section>
    <section class="col col--cream" aria-labelledby="sk"><h2 id="sk" class="display display--s">Skills</h2>
      ${list(about.skills, (s) => `<li>${esc(s)}</li>`, ['Skill to be added', 'Skill to be added', 'Skill to be added'])}</section>
  </div>`;
  return shell(plainStage('Archive / 04', 'About', 'The person behind the files.'), body, 'about');
}

/* ----- Contact ----- */

function contactPage() {
  const email = site.email
    ? `<a class="big-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a>`
    : `<span class="big-link big-link--ph">${pending('Email address to be added')}</span>`;
  const ig = site.instagram
    ? `<a class="big-link" href="${esc(site.instagram.url)}" rel="noopener" target="_blank">${esc(site.instagram.handle)}</a>`
    : `<span class="big-link big-link--ph">${pending('Instagram handle to be added')}</span>`;
  const cv = site.resume
    ? `<a class="btn" href="${esc(site.resume)}" download>Download resume (PDF)</a>`
    : `<span class="btn btn--off" aria-disabled="true">Resume to be added</span>`;
  const body = `
  <section class="contact">
    <div class="note-pad">
      ${clip('clip--rose')}
      <h2 class="display">Have a project <em class="script-em">in mind?</em></h2>
      <dl class="contact__list">
        <div><dt>Email</dt><dd>${email}</dd></div>
        <div><dt>Instagram</dt><dd>${ig}</dd></div>
        <div><dt>Resume</dt><dd>${cv}</dd></div>
      </dl>
    </div>
    <div class="contact__side"><div class="stamp-card"><span>Lynn Kim</span><b>Archive ${site.year}</b><i>Content / Events / Live Commerce / Brand Marketing / Photography</i></div>${polaroid({ img: { src: null }, tone: 'blue', tilt: -2, clipped: true, caption: `${stamp()}<span>Photo to be added</span>`, ph: 'Photo' })}</div>
  </section>`;
  return shell(plainStage('Archive / 05', 'Contact', 'Write, follow along or take the resume.'), body, 'contact');
}

/* ---------- mount ---------- */

const pages = { home, work, project: projectPage, photography: photographyPage, about: aboutPage, contact: contactPage };
const out = pages[page]();
const html = typeof out === 'string' ? out : out.html;
document.getElementById('root').outerHTML = html;
if (out.after) out.after();
if (page === 'home') document.title = 'Lynn Kim, portfolio archive';
const titles = { work: 'Work', photography: 'Photography', about: 'About', contact: 'Contact' };
if (titles[page]) document.title = `${titles[page]}, Lynn Kim`;
document.documentElement.classList.toggle('reduce-motion', reduceMotion.matches);
