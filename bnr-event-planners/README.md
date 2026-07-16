# BNR Event Planners

A production-ready marketing site for **BNR Event Planners**, a South Indian
wedding and event planning company based in Chennai. Built with Next.js 14
(App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

Visually inspired by the layout rhythm, scroll animations, and card-based
sections of the [Lumene Framer template](https://www.framer.com/community/marketplace/templates/lumene/),
rebuilt from scratch with South Indian cultural content and a Deep
Maroon / Gold / Cream / Charcoal palette.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS — built as
  a static export (`output: "export"`), since there's no server at runtime
- **Animation:** Framer Motion (`whileInView`, stagger children, parallax)
- **Backend:** none — the browser talks to Supabase directly via the anon
  key; Row Level Security policies (below) enforce what it's allowed to do
- **Database:** Supabase (PostgreSQL + Auth)
- **Deployment target:** GitHub Pages (frontend) + Supabase (database/auth)

## Pages

| Route        | Description                                                        |
| ------------ | -------------------------------------------------------------------|
| `/`          | Hero video, services grid, about teaser, stats, testimonials, CTA  |
| `/about`     | Company story, animated timeline, team cards                      |
| `/services`  | Detailed service cards for all six event types                     |
| `/gallery`   | Filterable masonry gallery with lightbox                           |
| `/contact`   | Contact form (writes to Supabase), address, map embed              |
| `/admin`     | Supabase Auth-gated dashboard listing all inquiries                |

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

alter table inquiries enable row level security;

-- Public contact form: anyone (anon key) can create an inquiry, but cannot
-- read or modify existing ones.
create policy "Anyone can submit an inquiry"
  on inquiries for insert
  to anon
  with check (true);

-- Admin dashboard: only signed-in Supabase Auth users can list/update
-- inquiries. Create that user in the next step.
create policy "Authenticated users can view inquiries"
  on inquiries for select
  to authenticated
  using (true);

create policy "Authenticated users can update inquiries"
  on inquiries for update
  to authenticated
  using (true)
  with check (true);
```

3. Copy your **Project URL** and **anon public key** from
   Project Settings &rarr; API.
4. Create an admin login: Authentication &rarr; Users &rarr; **Add user**,
   and set an email + password. This is what you'll use to sign in at
   `/admin` — there's no separate hardcoded password.

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values from step 2:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The anon key is public by design (it ships in the browser bundle) — the RLS
policies above are what actually restrict access, not this key being secret.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Sign in at `http://localhost:3000/admin`
with the email/password you created in Supabase Authentication.

### 5. Build for production

```bash
npm run build
```

This produces a static export in `bnr-event-planners/out/` — there is no
`npm run start`, since there's no server to run. Preview it locally with
any static file server, e.g. `npx serve out`.

## Project structure

```
/bnr-event-planners
  /app
    page.tsx                Home
    about/page.tsx           About
    services/page.tsx        Services
    gallery/page.tsx          Gallery
    contact/page.tsx          Contact
    admin/page.tsx             Admin dashboard (Supabase Auth-gated)
    admin/layout.tsx           noindex metadata for admin route
    layout.tsx                Root layout: fonts, navbar, footer, toaster
    globals.css                Tailwind entry + reduced-motion handling
  /components
    Navbar.tsx                 Scroll-aware nav + mobile menu
    Footer.tsx
    HeroSection.tsx             Video background hero with staggered headline
    ServiceCard.tsx
    ContactForm.tsx             Writes directly to Supabase (anon insert)
    AdminTable.tsx               Reads/updates directly (authenticated only)
    AnimatedSection.tsx         Reusable whileInView/stagger wrapper
    AboutTeaser.tsx             Parallax image + copy
    CTABanner.tsx
    StatsCounter.tsx            Animated count-up on scroll into view
    Testimonials.tsx            Auto-rotating carousel
    GalleryGrid.tsx             Masonry grid, category filter, lightbox
    TeamCard.tsx
    Timeline.tsx
  /lib
    supabase.ts                 Anon-key Supabase client + types
    content.ts                  Static copy: services, testimonials, gallery, team, timeline
  tailwind.config.ts
  package.json
  .env.local.example
```

## Deployment (GitHub Pages)

A workflow at `.github/workflows/deploy-bnr-event-planners.yml` builds and
publishes this project automatically. One-time setup:

1. Repo **Settings &rarr; Pages &rarr; Build and deployment &rarr; Source**:
   set to **GitHub Actions**.
2. Repo **Settings &rarr; Secrets and variables &rarr; Actions**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Push to the branch the workflow watches (or run it manually from the
   Actions tab) — it builds the static export and deploys it to Pages.

Because GitHub Pages serves a project site at `https://<org>.github.io/<repo>/`,
`next.config.js` automatically sets `basePath`/`assetPrefix` to the repo
name when running inside GitHub Actions (`GITHUB_ACTIONS=true`). Local dev
and any other host serve from `/` as normal.

**Note:** GitHub Pages hosts one live deployment per repository. If another
workflow in this repo also publishes to the `github-pages` environment,
whichever ran most recently is what's actually live — they can't both be
live simultaneously from a single repo.

## Notes on imagery

Hero and section imagery use hotlinked Unsplash/Pexels placeholder URLs
(South Indian weddings, temple architecture, Bharatanatyam performances).
Before a real launch, replace these with licensed photography of BNR's own
events and store them in `/public/images`.

## Admin authentication

`/admin` is gated by a real Supabase Auth session
(`supabase.auth.signInWithPassword`), not a hardcoded password. The RLS
policies from step 2 are what actually enforce access — the anon key used
everywhere else on the site can `INSERT` into `inquiries` but never `SELECT`
or `UPDATE` it, so the admin data stays private even though the anon key
itself is public in the shipped JS. To add more admins, create additional
users under Authentication &rarr; Users in the Supabase dashboard.
