# Media assets still needed

The site is text-led. Projects without images show clean text layouts, and each project page lists its missing supporting materials in one quiet line. Nothing is generated or faked. Add files to `assets/` and set the path in `js/data.js`.

## Site-wide
- Portrait of Lynn for the home hero, the home About preview and the About page. Field: `about.portrait`. Until then a "LK" monogram frame shows.
- Resume PDF. Field: `site.resume`. The Contact page shows a disabled note until this is set.
- Share image. `assets/og-image.png` is a typographic card. Replace it with a designed image when available, and run `SITE_URL=https://your-domain node tools/build-pages.mjs` so share links are absolute.

## Per project (field: `media`, items `{ src, alt, width, height, caption }`)
- Solo Party: promotional Reels, event posters, event photographs, application website screenshots, GUESS ME / FIND ME / MATCH ME materials, participant communication examples with private information removed.
- @lynnonmi: thumbnails and links for the four Reels (3.18M, 1.92M, 1.39M, 1.30M views), and a short note on the creative decisions behind each. Add `href` to each item in the `reels` section.
- TikTok LIVE / WitU: broadcast screenshots, short video clips, product demonstration examples, examples of live presentation.
- Red Bull Korea: festival activation photographs, sampling photographs, event materials, Wings for Life World Run production images.
- Pimadaziwin: account screenshots, follower growth evidence, content examples, supporter program materials.
- Constant / Refilled: X content examples, Instagram content, Musinsa Beauty Festa photographs, participant-generated posts, campaign materials.

## Photography (field: `photos`)
Original photographs by Lynn, portraits and snap sessions first. The gallery appears automatically when `photos` has items. Set `src`, `width`, `height`, `alt` and `caption`. Add location, date or camera details only if verified.
