# BnR Event Planners — Website

South India's premier event planning brand, marketing site built with
**Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**,
deployable as a static export (no backend required).

Five pages: Home, Services, Gallery, About, Contact — with a deep forest
green / antique gold / ivory design system, a rotating hero ring, kolam-
inspired section dividers, a filterable gallery lightbox, and an
EmailJS-powered enquiry form.

> This folder is a separate site from the single-page version at the repo
> root — kept side by side rather than overwriting it.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

- **Contact info, nav links, brand name, hero ring text**: `src/lib/constants.ts`
- **Services, gallery items, testimonials, team members**: `src/lib/content.ts`
- **Colors, fonts**: `src/app/globals.css` (`@theme` block)

All placeholder text and imagery the client needs to replace before launch
is listed in [`CONTENT.md`](./CONTENT.md).

## Contact form — EmailJS setup

The enquiry form (`src/components/contact/InvitationContactForm.tsx`) sends
mail client-side via [EmailJS](https://www.emailjs.com/), so it works from a
static export with no backend.

1. Create a free EmailJS account and add an Email Service (e.g. Gmail).
2. Create an Email Template with variables: `name`, `email`, `phone`,
   `event_date`, `event_type`, `message`.
3. Copy your Service ID, Template ID, and Public Key.
4. Create a `.env.local` file in this folder:

   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. Restart the dev server. Until these are set, submissions show a friendly
   error asking visitors to reach out by phone or email directly — nothing
   fails silently.

When deploying to Vercel or Netlify, add the same three variables in the
project's environment variable settings.

## Building for production

```bash
npm run build
```

This produces a static export in `out/` (configured via `output: "export"`
in `next.config.ts`) — deployable to any static host.

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faachi-foods%2Fsanjay&project-name=bnr-event-planners&repository-name=bnr-event-planners&root-directory=bells-n-rings-multipage-site)

Or manually:

```bash
npm i -g vercel
vercel
```

Set the project root to `bells-n-rings-multipage-site/` and add the three
EmailJS environment variables above in the Vercel dashboard before the
first production deploy.

## Deploying to Netlify (fallback)

- Build command: `npm run build`
- Publish directory: `out`
- Add the same EmailJS environment variables under Site settings → Environment variables.
