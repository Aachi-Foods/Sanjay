# BnR Event Planners — Website

A premium, single-page luxury website for BnR Event Planners: full-service
wedding, corporate, and private event planning. Built with plain HTML, CSS,
and JavaScript — no build step, no dependencies, deploys anywhere.

## File structure

```
/
├── index.html          Full single-page site (all sections)
├── css/
│   └── style.css        Design system, layout, responsive rules, animations
├── js/
│   └── main.js           Scroll reveals, 3D tilt cards, Ken Burns testimonial
│                          slider, gallery lightbox, mobile nav, contact form UX
└── images/
    └── favicon.svg        Monogram favicon (placeholder brand mark)
```

## Running locally

No build tools required. From the project root:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## Replacing placeholder imagery

The site currently uses elegant CSS gradient panels (`.ph-gradient` /
`.ph-*` classes) as stand-ins for photography, so the layout, grid, and
lightbox all work out of the box. To swap in real photos:

1. Add optimized images (WebP or JPG, 1600–2400px wide for hero/about,
   1200px for gallery/testimonials) to `images/hero/`, `images/gallery/`,
   and `images/testimonials/`.
2. In `index.html`, replace each element carrying a `ph-gradient` class
   with an `<img>` (or set it as a CSS `background-image`) — the elements
   to target are:
   - `.about-image` — about section portrait
   - `.gallery-item` (×6) — portfolio grid
   - `.kb-slide` (×4) — testimonial Ken Burns background slides
3. Update `og:image` / `twitter:image` in the `<head>` to a real
   1200×630 cover image at `images/hero/og-cover.jpg`.
4. Replace `images/favicon.svg` with your final brand mark if desired
   (keep a square SVG or 32×32/180×180 PNG for best results).

Keep existing `alt`/`aria-label` text as a template — write descriptive,
specific captions for each real photo (already done for gallery items
via `data-caption`).

## Wiring up the contact form

The form in `#inquiryForm` currently simulates submission client-side
(`js/main.js`, `contactForm()`). To make it functional:

- **Form service (fastest):** point the `<form>` at a service like
  Formspree, Basin, or Netlify Forms and remove/adjust the
  `preventDefault()` submission handler in `main.js`.
- **Custom backend:** replace the `setTimeout` mock in `contactForm()`
  with a `fetch()` POST to your API endpoint, keeping the same success/
  error UX pattern (`#formStatus`).

Fields collected: Full Name, Email, Phone, Event Type, Event Date, Guest
Count, Message.

## Deployment

This is a static site — deploy the project root as-is to any static host:

- **Netlify / Vercel:** drag-and-drop the folder or connect the repo;
  no build command needed (leave "publish directory" as `/`).
- **GitHub Pages:** push to a repo and enable Pages on the root of the
  default branch.
- **Any traditional host:** upload the contents of this folder via
  FTP/SFTP to your web root.

Update the following before going live:
- `<link rel="canonical">` and all Open Graph / Twitter URLs in
  `index.html` `<head>` — replace `https://www.bnreventplanners.com/`
  with the real domain.
- Contact details in the Contact and Footer sections (email, phone).
- Social links in the footer (`Instagram`, `Pinterest`, `Facebook`).
- `schema.org` JSON-LD block in `<head>` — add real address/geo data if
  you operate from a fixed studio location.

## SEO notes

- Title, meta description, and OG/Twitter tags are pre-filled with the
  suggested luxury-event-planner copy.
- Heading structure is semantic: one `<h1>` (hero), `<h2>` per section,
  `<h3>` for cards/steps.
- `EventPlanner` JSON-LD schema is included for rich-result eligibility.
- Copy throughout (About, Services, SEO Content section) naturally
  incorporates target keywords: luxury event planner, wedding planner,
  corporate event planner, destination event planning, event décor and
  styling, full-service event planner.

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`, `nav`).
- All interactive elements are real `<button>`/`<a>` elements, keyboard
  reachable, with `aria-label`s on icon-only controls.
- Lightbox and mobile menu support `Escape`/focus-safe close behavior.
- `prefers-reduced-motion` is respected — animations are minimized for
  users who request it.

## Browser support

Modern evergreen browsers (Chrome, Edge, Safari, Firefox — last 2
versions). Uses CSS Grid, `backdrop-filter`, and `IntersectionObserver`
with graceful fallbacks (reveals render fully visible if
`IntersectionObserver` is unavailable).
