# Bells n Rings Event Planners — Multi-Page Site

Luxury wedding & event planning marketing site built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**, deployable as a static export (no backend required).

Six pages: Home, About, Services, Portfolio, Testimonials, Contact — with a blush pink / rose gold editorial design system, Ken-Burns crossfade hero and gallery, a filterable portfolio lightbox, and an invitation-styled contact form.

> This folder is a separate site from the single-page version at the repo root — kept side by side rather than overwriting it.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

- **Contact info, nav links, brand name**: `src/lib/constants.ts`
- **Services, portfolio items, testimonials, hero/team photos**: `src/lib/content.ts`
- **Colors, fonts**: `src/app/globals.css` (`@theme` block)

## Building for production

```bash
npm run build
```

This produces a static export in `out/` (configured via `output: "export"` in `next.config.ts`) — deployable to any static host (Vercel, Netlify, GitHub Pages, S3, etc.).
