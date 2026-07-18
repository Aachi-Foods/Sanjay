# BNR Event Planners — Luxury Multi-Page Website

A luxurious multi-page marketing site for **BNR Event Planners**, a premium South
Indian event management company based in Chennai. Design language adapted from
the More Nutrition Webflow case study (Awwwards Site of the Day): full-bleed
hero, alternating light/dark sections, GSAP scroll motion, and an "old-money
South Indian luxury" brand mood — silk, temple gold, banana-leaf green, jasmine
ivory.

Built with **plain HTML, CSS and JavaScript** — no build step, no framework,
deploys anywhere. Motion is powered by **GSAP + ScrollTrigger** (loaded via
CDN).

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, marquee, about teaser, services grid, gallery strip, stats, testimonial slider, CTA |
| `services.html` | Services — 8 alternating image/text rows |
| `gallery.html` | Gallery — filterable masonry grid + lightbox |
| `about.html` | About — brand story, values, milestone timeline, stats |
| `team.html` | Our Team — team cards |
| `testimonials.html` | Testimonials — slider + full grid with star ratings and event tags |
| `enquire.html` | Enquire — wedding-invitation-styled form, submits via WhatsApp and email |

## File structure

```
bnr-event-planners/
├── index.html, services.html, gallery.html, about.html,
│   team.html, testimonials.html, enquire.html
├── css/
│   └── style.css          Design system: palette, type, header/nav, sections, forms
├── js/
│   ├── config.js           Client-editable settings (WhatsApp number, email, address)
│   ├── partials.js         Injects shared header / footer / preloader / mobile nav
│   └── main.js             GSAP animation, nav, filters, slider, counters, lightbox, form
└── images/
    ├── logo.svg, favicon.svg, hero-*.svg, about-*.svg
    ├── gallery/g1.svg – g12.svg
    └── team/t1.svg – t8.svg
```

## Running locally

No build tools required — but the shared header/footer are injected via
JavaScript, so open the site through a local server (not `file://`):

```bash
cd bnr-event-planners
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## Editing content

- **WhatsApp number, enquiry email, phone, address, socials**: `js/config.js`
- **Nav links / page order**: `NAV_LINKS` array in `js/partials.js`
- **Colors, fonts, spacing**: `css/style.css` (`:root` variables at the top)
- **Copy, services, testimonials, team bios**: directly in each page's HTML

## Asset replacement map

All imagery is a placeholder (labeled SVG) to be swapped for the client's real
photography before launch.

| File | Replace with |
|---|---|
| `images/logo.svg` | BNR logo (shown centered in the header, above the nav) |
| `images/favicon.svg` | Browser tab / bookmark icon |
| `images/hero-1.svg`, `images/hero-2.svg` | Homepage hero banner photos |
| `images/hero-services.svg`, `hero-gallery.svg`, `hero-about.svg`, `hero-team.svg`, `hero-testimonials.svg`, `hero-enquire.svg` | Page-header banners for each inner page |
| `images/about-teaser.svg`, `images/about-story.svg` | About-section photography |
| `images/gallery/g1.svg` – `g12.svg` | Real event photos (tagged Weddings / Receptions / Corporate / Cultural in each page's `data-category`) |
| `images/team/t1.svg` – `t8.svg` | Team member portraits |
| `whatsappNumber` in `js/config.js` | Client's WhatsApp number (digits only, country code first, e.g. `919876543210`) |
| `email` in `js/config.js` | Client's enquiry inbox |
| `phoneDisplay`, `addressLine1/2`, `instagram`, `facebook` in `js/config.js` | Client's contact & social details |

## The Enquire form

`enquire.html` is styled as a South Indian wedding invitation card (ornate
gold double border, script-font name field, "requests the pleasure of your
enquiry" wording). It collects event type, date, venue city, guest count and
budget, then submits via:

- **Send via WhatsApp** — opens `wa.me/<whatsappNumber>` with a prefilled message
- **Send via Email** — opens a `mailto:` draft to `email` in `js/config.js`

No backend is required; both submission paths hand off to the visitor's own
WhatsApp/email client.

## Motion (GSAP + ScrollTrigger)

- Preloader mark + progress bar, followed by a two-panel curtain reveal
- Staggered hero headline reveal after the curtain opens
- Scroll-triggered fade/slide reveals (`.reveal`) throughout every page
- Floating/morphing sage blobs behind the hero and CTA sections
- Gold marquee strip (CSS keyframe loop)
- 3D tilt on service cards (`.tilt-card`, pointer-driven)
- Animated stat counters on scroll (`data-count`)
- Bouncy testimonial slider with dot navigation
- Gallery category filter with fade/scale transitions + lightbox
- Sticky header that compacts and adapts to dark/light sections on scroll

`prefers-reduced-motion` is respected — animations are skipped/minimized for
users who request it.

## Deployment

Static site — deploy the folder as-is to any static host (Netlify, Vercel,
GitHub Pages, S3, or traditional hosting via FTP). No build command needed.
