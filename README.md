# Lynn Kim portfolio

Static site, no build step. Run locally with `python3 -m http.server` and open `index.html`.

## Content

All content is in `js/data.js`, taken from the master portfolio brief. Add only verified facts.
`MEDIA-NEEDED.md` lists missing media. `REVIEW.md` lists changes and open questions.

- Each project has its own page, for example `project-solo-party.html`. Pages and their share metadata are generated: run `node tools/build-pages.mjs` after changing titles or summaries. Set `SITE_URL=https://your-domain` to write absolute share URLs.
- `site`: email, Instagram, resume path. Setting `site.resume` turns on the resume download.
- `projects`: each project lists its own `sections` (prose, compare, events, columns, steps, metrics, reels, split, periods, list, chips, callout).
- `photos`: leave empty until real photographs exist. The gallery and viewer appear automatically.
- `share/build.py` builds the single-file `share/portfolio-single.html`.

Use compressed JPEG or WebP, ideally under 300 KB each, with width and height set.
Screenshots of every page are in `screenshots/`.
