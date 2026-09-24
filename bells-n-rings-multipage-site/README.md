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

## Contact form — lead capture

Every enquiry submission (`src/components/contact/InvitationContactForm.tsx`)
is pushed to **HubSpot** (portal `245625867`, "BellsnRings Event Planners")
as a contact via the tracking script loaded in `layout.tsx` — this is
unconditional and needs no setup here; it's already live. That's currently
the only place enquiry submissions land.

The form also *attempts* to send a notification email client-side via
[EmailJS](https://www.emailjs.com/), so that path can work from a static
export with no backend if it's ever wanted — but it is **not connected to
anything right now** (no `.env.local`, no EmailJS account), so every
submission just shows a friendly message pointing the visitor to the phone
number/email on the Contact page instead of a "sent!" confirmation — nothing
fails silently, and the HubSpot capture above still happens either way. To
turn the email path on:

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

5. Restart the dev server.

When deploying to Vercel or Netlify, add the same three variables in the
project's environment variable settings.

When deploying to Vercel or Netlify, add the same three variables in the
project's environment variable settings. For the GitHub Pages deploy this
repo actually uses, there's no environment-variable UI — the three values
need to be baked in at build time instead (a `.env.local` alongside this
README when the static export is built, or added directly as
`NEXT_PUBLIC_*` values in `next.config.ts`'s `env` block).

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
