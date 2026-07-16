# Image sources

All photography on this site is currently hotlinked from Unsplash's CDN
(`images.unsplash.com/photo-<id>`) as production-quality placeholders, with
a matching `onerror` fallback to [Lorem Picsum](https://picsum.photos) so a
broken/renamed Unsplash asset never shows a broken-image icon.

**Before launch:** download the real photos you intend to use (or license
your own event photography), save them under `assets/images/`, and update
the `src`/`data-full`/`style="background-image:..."` references across
`index.html`, `about.html`, `services.html`, `gallery.html` and
`contact.html` to point at local files instead of the CDN.

## Unsplash photo IDs used (search terms they were selected for)

| ID | Used for | Search context |
|---|---|---|
| `photo-1519741497674-611481863552` | Hero slide 1, OG image | south-indian-wedding, rings |
| `photo-1519225421980-715cb0215aed` | Hero slide 2, gallery | tamil-wedding, reception |
| `photo-1470753323753-3f8091bb0233` | Hero slide 3, gallery | celebration |
| `photo-1511285560929-80b456fea0bc` | About hero, gallery | wedding decor, florals |
| `photo-1544078751-58fee2d8a03b` | Services (wedding), gallery | banquet styling |
| `photo-1505373877841-8d25f7d46678` | Services (corporate), gallery | conference audience |
| `photo-1522673607200-164d1b6ce486` | Services (festival), gallery | marigold flowers |
| `photo-1465495976277-4387d4b0b4c6` | Gallery teaser, gallery | string lights, bokeh |
| `photo-1540575467063-178a50c2df87` | Gallery (corporate) | conference room |
| `photo-1552664730-d307ca884978` | Gallery (corporate) | party celebration |
| `photo-1544005313-94ddf0286df2`, `1500648767791-00dcc994a43e`, `1487412720507-e7ab37603c6f`, `1519085360753-af0119f7cbe7` | About — team portraits | professional headshots |

Each `<img>` also appends `?q=80&w=<size>&auto=format&fit=crop` to request
an appropriately sized, compressed crop from Unsplash's image API — adjust
the `w=` value per placement if you swap in your own CDN.

## Favicon

`assets/images/favicon.svg` is an original SVG monogram in the brand's
maroon/gold palette — no external source, safe to keep or replace with a
real logo mark.
