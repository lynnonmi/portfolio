# Lynn Kim portfolio

Static site, no build step. Run locally with `python3 -m http.server` and open `index.html`.

## Adding real content

All content is in `js/data.js`. Empty fields (null or empty lists) show as marked placeholders.
Only add information that is real and verified.

- `site`: email, Instagram, resume path. Links appear once the value is set.
- `projects`: title, year, client, role, summary, objective, responsibilities, process, results, evidence.
  A result shows only when `verified: true`.
- `photos`: set `src`, `width`, `height`, `alt` and `caption` for each photograph.
- `about`: intro, portrait, experience, education, skills.

Put images in an `assets/` folder and use compressed JPEG or WebP, ideally under 300 KB each, with width and height set.

`references/` holds the design reference images and is not served by any page.
