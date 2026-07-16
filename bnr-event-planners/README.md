# BNR Event Planners

A production-ready marketing site for **BNR Event Planners**, a South Indian
wedding and event planning company based in Chennai. Built with Next.js 14
(App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

Visually inspired by the layout rhythm, scroll animations, and card-based
sections of the [Lumene Framer template](https://www.framer.com/community/marketplace/templates/lumene/),
rebuilt from scratch with South Indian cultural content and a Deep
Maroon / Gold / Cream / Charcoal palette.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation:** Framer Motion (`whileInView`, stagger children, parallax)
- **Backend:** Next.js API routes (`/api/contact`)
- **Database:** Supabase (PostgreSQL)
- **Deployment target:** Vercel (frontend) + Supabase (database)

## Pages

| Route        | Description                                                        |
| ------------ | -------------------------------------------------------------------|
| `/`          | Hero video, services grid, about teaser, stats, testimonials, CTA  |
| `/about`     | Company story, animated timeline, team cards                      |
| `/services`  | Detailed service cards for all six event types                     |
| `/gallery`   | Filterable masonry gallery with lightbox                           |
| `/contact`   | Contact form (writes to Supabase), address, map embed              |
| `/admin`     | Password-gated dashboard listing all inquiries                     |

## Getting started

### 1. Install dependencies

```bash
cd bnr-event-planners
npm install
```

### 2. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run:

```sql
create extension if not exists "uuid-ossp";

create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date not null,
  city text not null,
  guest_count integer not null,
  message text not null,
  status text not null default 'new',
  created_at timestamp with time zone not null default now()
);

-- Row Level Security: the app writes/reads through the service-role key on
-- the server (API routes), so RLS can stay enabled with no public policies.
alter table inquiries enable row level security;
```

3. Copy your **Project URL**, **anon public key**, and **service_role key**
   from Project Settings &rarr; API.

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values from step 2:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=bnr2024
```

The service role key is only ever read inside `/api/contact/route.ts`
(server-side) — it is never sent to the browser.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`. The admin dashboard is at
`http://localhost:3000/admin` (default credentials `admin` / `bnr2024`,
overridable via `ADMIN_USERNAME` / `ADMIN_PASSWORD`).

### 5. Build for production

```bash
npm run build
npm run start
```

## Project structure

```
/bnr-event-planners
  /app
    page.tsx                Home
    about/page.tsx           About
    services/page.tsx        Services
    gallery/page.tsx          Gallery
    contact/page.tsx          Contact
    admin/page.tsx             Admin dashboard (client-gated)
    admin/layout.tsx           noindex metadata for admin route
    api/contact/route.ts       POST (create), GET (list), PATCH (update status)
    layout.tsx                Root layout: fonts, navbar, footer, toaster
    globals.css                Tailwind entry + reduced-motion handling
  /components
    Navbar.tsx                 Scroll-aware nav + mobile menu
    Footer.tsx
    HeroSection.tsx             Video background hero with staggered headline
    ServiceCard.tsx
    ContactForm.tsx
    AdminTable.tsx
    AnimatedSection.tsx         Reusable whileInView/stagger wrapper
    AboutTeaser.tsx             Parallax image + copy
    CTABanner.tsx
    StatsCounter.tsx            Animated count-up on scroll into view
    Testimonials.tsx            Auto-rotating carousel
    GalleryGrid.tsx             Masonry grid, category filter, lightbox
    TeamCard.tsx
    Timeline.tsx
  /lib
    supabase.ts                 Public + service-role Supabase clients, types
    content.ts                  Static copy: services, testimonials, gallery, team, timeline
  tailwind.config.ts
  package.json
  .env.local.example
```

## Deployment

- **Frontend:** push to GitHub, import into [Vercel](https://vercel.com/new),
  and set the same environment variables from `.env.local` in the Vercel
  project settings.
- **Database:** the Supabase project created above requires no further setup
  — the same URL/keys work in production.

## Notes on imagery

Hero and section imagery use hotlinked Unsplash/Pexels placeholder URLs
(South Indian weddings, temple architecture, Bharatanatyam performances).
Before a real launch, replace these with licensed photography of BNR's own
events and store them in `/public/images`.

## Admin authentication

The `/admin` route uses HTTP Basic Auth checked against `ADMIN_USERNAME` /
`ADMIN_PASSWORD` inside `/api/contact/route.ts`. This is intentionally
simple for an MVP — before scaling beyond a single internal user, replace
it with a real auth provider (Supabase Auth, NextAuth, etc.) and move
`inquiries` access behind a proper session check instead of a shared
password.
