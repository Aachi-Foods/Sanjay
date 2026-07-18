# Aachi Foods Site

A marketing website for **Aachi Foods** — authentic South Indian spices,
masalas, ready-to-cook mixes, pickles, and more. Built with Next.js 14
(App Router), TypeScript, Tailwind CSS, and Framer Motion, following the
same static-export pattern as the `bnr-event-planners` project in this repo.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS — static
  export (`output: "export"`), no server required at runtime
- **Animation:** Framer Motion (`whileInView`, stagger children)
- **Backend:** none — this is a static marketing site with no database or
  form submission; the Contact page links directly to phone/email

## Pages

| Route        | Description                                              |
| ------------ | --------------------------------------------------------- |
| `/`          | Hero, product category grid, stats counter, CTA           |
| `/products`  | Full product category catalog                             |
| `/about`     | Company story, animated timeline, values                  |
| `/contact`   | Contact details, address, embedded Google Map              |

## Getting started

```bash
cd aachi-foods-site
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
```

Produces a static export in `aachi-foods-site/out/`. Preview it with any
static file server, e.g. `npx serve out`.

## Project structure

```
/aachi-foods-site
  /app
    page.tsx                Home
    products/page.tsx        Products
    about/page.tsx            About
    contact/page.tsx           Contact
    layout.tsx                 Root layout: fonts, navbar, footer
    globals.css                 Tailwind entry + reduced-motion handling
  /components
    Navbar.tsx                  Scroll-aware nav + mobile menu
    Footer.tsx
    HeroSection.tsx              Staggered headline hero
    ProductCategoryCard.tsx
    ValueCard.tsx
    StatsCounter.tsx             Animated count-up on scroll into view
    Timeline.tsx
    CTABanner.tsx
    AnimatedSection.tsx          Reusable whileInView/stagger wrapper
  /lib
    content.ts                   Static copy: products, stats, timeline, values, contact info
  tailwind.config.ts
  package.json
```

## Deployment

Configured the same way as `bnr-event-planners`: `next.config.js` sets
`basePath`/`assetPrefix` to the repo name automatically when
`GITHUB_ACTIONS=true`, so it's ready for a GitHub Pages workflow. No
workflow file has been added yet for this project — ask if you want one
set up (note GitHub Pages serves one live site per repo, so running both
this and `bnr-event-planners` live at the same time needs a combined
deploy step, not two independent ones).

## Notes on imagery

Product and hero imagery use hotlinked Unsplash placeholder URLs (spices,
South Indian food). Before a real launch, replace these with licensed
photography of actual Aachi Foods products and packaging.
