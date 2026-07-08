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

## Imagery — AI-generated, hotlinked (swap for self-hosted before launch)

The about portrait, all 6 gallery pieces, and all 4 testimonial
backgrounds are AI-generated stills animated into short looping videos
(subtle candle flicker, breeze, light shimmer — no people). Each
`<video>` has a `poster` image and plays muted/looped/inline so it works
as a background-video replacement for the old CSS gradient placeholders.

**Important:** these assets are currently hotlinked from the generation
service's CDN (`d8j0ntlcm91z4.cloudfront.net`), not stored in this repo.
That's fine for previewing, but is not durable for production — the
generation service does not guarantee those URLs stay live indefinitely.
Before launch:

1. Download each `<source src="...">` and `poster="..."` URL referenced
   in `index.html` (11 images + 11 videos — about, 6 gallery, 4
   testimonial).
2. Save them into `images/about/`, `images/gallery/`, and
   `images/testimonials/` (create a matching `videos/` folder, or keep
   video files alongside their poster images).
3. Update the `src`/`poster` attributes in `index.html` to point at the
   local paths instead of the CDN URLs.
4. If you'd rather use real photography instead of AI-generated imagery,
   replace the same `<video>`/`poster` pairs with your own `<img>` tags
   or video files — the CSS (`object-fit: cover` on `.about-image`,
   `.gallery-item video`, `.kb-slide video`) works the same either way.
5. Update `og:image` / `twitter:image` in the `<head>` to a real
   1200×630 cover image at `images/hero/og-cover.jpg`.
6. Replace `images/favicon.svg` with your final brand mark if desired
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

Live domain/contact details already wired in:
- Canonical URL, Open Graph, and Twitter tags use `https://www.bnreventplanners.com/`.
- Phone: `+91 89396 27959` (Contact section, footer, `tel:` link, and
  `schema.org` `telephone`).
- Social links: Instagram (`bellsnringsevents`) and Facebook are live in
  the footer and in the JSON-LD `sameAs` array. Add a Pinterest link the
  same way once that profile exists.

Still to update before going live:
- **Inquiry email** — the Contact and footer sections currently show
  "Coming soon" in place of an email address. Once you have a dedicated
  inbox (e.g. `hello@bnreventplanners.com`), replace the `Coming soon`
  text in `index.html` with a `mailto:` link in both the Contact details
  block and the footer.
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
