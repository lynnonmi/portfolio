# Media assets still needed

Every project page is built around real media, and each layout has typed slots. A slot with no files is not shown, so nothing is faked. Add files to `assets/` and set them in `js/data.js`.
Item format: `{ src, alt, width, height, caption }`. Videos: `{ type: 'video', src, poster, caption }`.

## Site-wide
- Portrait of Lynn: `about.portrait`. Used on the home hero, home About preview, About and Contact. A "LK" monogram frame shows until then.
- Resume PDF: `site.resume`. The Contact page shows a disabled note until this is set.
- Share image: replace `assets/og-image.png` (a typographic card) with a designed one, then run `SITE_URL=https://your-domain node tools/build-pages.mjs`.
- Lead image per project: `lead`. It appears on the project spread and on its card.

## Solo Party (journey layout)
- `media.promo`: promotional Reels or Story frames and event posters.
- `media.system`: application website screenshots and GUESS ME / FIND ME / MATCH ME materials.
- `media.photos`: event photographs from both events. Remove private information from communication examples before adding them.

## @lynnonmi (video-first layout)
- For each of the four Reels in `reels`: `thumb`, `href`, `concept` (the creative idea) and `production` (the production decisions). Views are already set.
- `media.extra`: any other content examples.

## TikTok LIVE / WitU (rundown layout)
- `media.clips`: broadcast clips (video files with a poster image).
- `media.examples`: screenshots of live presentation and product demonstrations.

## Red Bull Korea (field log layout)
- `media.activation` and `media.sampling`: festival activation and sampling photographs.
- `media.wings`: Wings for Life World Run 2025 production images.
- Optional: the names and dates of the 14 festivals, to label the log stubs.

## Pimadaziwin (growth layout)
- `media.screenshots` and `media.content`: account screenshots, follower growth evidence, content examples.
- `media.community`: supporter program materials.

## Constant / Refilled (two voices layout)
- `media.influencer`: influencer seeding examples. `media.campaign`: campaign materials.
- `media.participantPosts`: screenshots of the participant-written posts. They are labelled as written by participants.

## Photography (`photos`)
Original photographs by Lynn, portraits and snap sessions first. The gallery and viewer appear when `photos` has items. Add location, date or camera details only if verified.
