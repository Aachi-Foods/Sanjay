# BNR Event Planners — Setup Guide

This site is fully static (HTML/CSS/JS) and deploys to GitHub Pages with no
Node.js server. The contact form and admin dashboard talk directly to
[Supabase](https://supabase.com) from the browser via the Supabase JS SDK
(loaded from a CDN in `contact.html` and `admin.html`).

## 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier is
   sufficient for this site).
2. Click **New Project**. Choose an organization, a project name (e.g.
   `bnr-event-planners`), a database password (save it somewhere safe —
   you won't need it for this site, but you'll need it for the Supabase
   dashboard), and a region close to your users (e.g. Mumbai/`ap-south-1`).
3. Wait ~2 minutes for the project to finish provisioning.

## 2. Create the `contact_submissions` table

In the Supabase dashboard, open **SQL Editor** and run:

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date not null,
  message text not null,
  reviewed boolean not null default false,
  created_at timestamptz not null default now()
);
```

## 3. Enable Row Level Security (RLS) and add policies

By default, once RLS is on, all access is denied until you add policies.
This site needs:

- **Anonymous users** (the public contact form) to be able to `INSERT` new
  rows, but not read or modify existing ones.
- **The admin page** to `SELECT` and `UPDATE` rows using the same anon key
  (since there's no server-side auth in this MVP — see the security note
  below).

Run this in the SQL Editor:

```sql
-- Turn on RLS
alter table contact_submissions enable row level security;

-- Allow anyone (including anonymous/public visitors) to submit the form
create policy "Allow public insert"
  on contact_submissions
  for insert
  to anon
  with check (true);

-- Allow the admin page to read submissions
create policy "Allow public select"
  on contact_submissions
  for select
  to anon
  using (true);

-- Allow the admin page to toggle the reviewed flag
create policy "Allow public update"
  on contact_submissions
  for update
  to anon
  using (true)
  with check (true);
```

> **Security note:** because this is a static, no-backend MVP, the anon
> key necessarily has read/update access so `admin.html` can work without
> a server. The admin page is protected only by a hardcoded JS password
> check (see `config.js`) — **this does not stop anyone who reads the
> anon key from querying the table directly.** Before handling sensitive
> or high-volume data, replace this with real authentication:
> - Use [Supabase Auth](https://supabase.com/docs/guides/auth) and scope
>   the `select`/`update` policies to `authenticated` users only, or
> - Route admin reads through a small serverless function (Supabase Edge
>   Function) that checks a real session/token before querying with the
>   `service_role` key (never expose `service_role` in client code).

## 4. Add your Supabase URL and anon key to `config.js`

In the Supabase dashboard, go to **Project Settings > API**. Copy:

- **Project URL** (e.g. `https://xxxxxxxxxxxx.supabase.co`)
- **anon public** key (a long JWT string)

Paste them into `config.js` at the project root:

```js
window.BNR_CONFIG = {
  SUPABASE_URL: "https://xxxxxxxxxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",
  ADMIN_PASSWORD: "choose-a-password-here",
};
```

`config.js` is loaded before `assets/js/contact.js` and `assets/js/admin.js`
on every page that needs it, so no further wiring is required.

## 5. Test locally

Because this site uses only relative paths and CDN scripts, you can serve
it with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080/contact.html`, submit the form, then check
**Table Editor > contact_submissions** in Supabase to confirm the row
landed. Open `http://localhost:8080/admin.html`, log in with your
`ADMIN_PASSWORD`, and confirm the row appears with a working "Mark as
Reviewed" toggle.

## 6. Deploy to GitHub Pages

**Option A — root of the default branch:**

1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a
   branch," pick your default branch (e.g. `main`) and folder `/ (root)`.
4. Save. Your site will be live at `https://<username>.github.io/<repo>/`
   within a minute or two.

**Option B — `/docs` folder method:**

1. Move (or copy) all site files into a `docs/` folder at the repo root.
2. In **Settings > Pages**, set **Source** to your default branch and
   folder `/docs`.
3. Save and wait for the build to finish.

**Option C — `gh-pages` branch:**

1. Create an orphan branch: `git checkout --orphan gh-pages`.
2. Copy the site files onto that branch, commit, and push.
3. In **Settings > Pages**, set **Source** to the `gh-pages` branch, folder
   `/ (root)`.

Whichever option you choose, double-check `config.js` contains your real
Supabase credentials *before* pushing to a public repository (the anon key
is safe to expose publicly by design, but don't commit your database
password or any `service_role` key).

## 7. Update SEO/canonical URLs

Once you know your final domain, update the `<link rel="canonical">` and
Open Graph `og:url`/`og:image` tags in each HTML file, plus the `Sitemap:`
line in `robots.txt`, to match.
