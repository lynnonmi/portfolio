# Lynn Kim portfolio

Static site, no build step. Run locally with `python3 -m http.server` and open `index.html`.

## Content

All content is in `js/data.js`, taken from the master portfolio brief. Add only verified facts.
`MEDIA-NEEDED.md` lists every photograph, screenshot and document still missing.

- Each project has its own page at `project.html?slug=<slug>`, for example `project.html?slug=solo-party`.
- `site`: email, Instagram, resume path. Setting `site.resume` turns on the resume download.
- `projects`: written content for the six projects. Add `cover` and `evidence` images when supplied.
- `photos`: set `src`, `width`, `height`, `alt` and `caption` for each photograph.
- `share/build.py` builds the single-file `share/portfolio-single.html`.

Use compressed JPEG or WebP, ideally under 300 KB each, with width and height set.
