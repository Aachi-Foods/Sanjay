# Content Checklist — What BnR Event Planners Needs to Supply

Everything below is currently a placeholder, a generic stand-in, or an
already-live detail that should be double-checked before launch. File paths
point to exactly where each piece lives in the codebase.

## Contact details — `src/lib/constants.ts` (`CONTACT` object)

| Item | Current value | Status |
| --- | --- | --- |
| Phone | `+91 89396 27959` | Live — confirm still correct |
| WhatsApp | derived from the phone number above | Live — confirm the number accepts WhatsApp |
| Email | `hello@bnreventplanners.com` | **Placeholder — needs a real inbox** |
| Studio address | "Studio address to be added — City, State, South India" | **Placeholder — needs full street address** |
| Instagram | `instagram.com/bellsnringsevents` | Live — confirm handle |
| Facebook | linked profile | Live — confirm page |
| YouTube | `#` | **Placeholder — needs channel URL, or remove the icon if there's no channel yet** |
| Google Maps embed | generic "India" search query | **Needs the studio's exact address once confirmed** |

## Site identity — `src/lib/constants.ts`

- `SITE_URL` is a placeholder domain (`bellsnringsevents.example.com`). Update
  it to the real production domain once purchased — it feeds the canonical
  URL, Open Graph, and Twitter card tags in `src/app/layout.tsx`.

## Contact form email delivery

- The enquiry form uses EmailJS. Three environment variables
  (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`,
  `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`) need to be created — see README.md's
  "Contact form — EmailJS setup" section.

## About Us copy — `src/components/about/StorySection.tsx`, `Philosophy.tsx`, `src/components/home/AboutTeaser.tsx`

The founding story, mission pillars, and "who we are" copy are written as
placeholder brand copy in a South Indian wedding-planning voice. Replace
with BnR's real founding story, year established, cities served, and any
specific milestones worth mentioning.

## Team — `src/lib/content.ts` (`TEAM_MEMBERS`)

All four team members (names, roles, bios) are placeholders:

- Bhavani Raman — Founder & Creative Director
- Ramesh Krishnan — Lead Event Planner
- Anitha Suresh — Operations Director
- Vignesh Pillai — Design & Styling Lead

Replace with real team member names, titles, short bios, and headshots
(currently placehold.co initial tiles).

## Testimonials — `src/lib/content.ts` (`TESTIMONIALS`)

All five client quotes are illustrative placeholders (names, event types,
cities, and quotes are all invented). Replace with real client testimonials
once collected — or remove entries you don't have permission to publish.

## Gallery — `src/lib/content.ts` (`GALLERY_ITEMS`)

All nine gallery entries are placehold.co color tiles labelled with a
category and a South Indian city (Chennai, Madurai, Bengaluru, Kochi,
Hyderabad, Coimbatore, Mysuru, Puducherry). Replace each `image` with real
event photography, and update `title`, `location`, and `description` to
match the real event. Add or remove entries freely — the grid and lightbox
adapt to any number of items.

## Service photography — `src/lib/content.ts` (`SERVICES`)

Each of the 8 services has a placehold.co stub image. Swap in real photos
once available (the exact wording of each service's title and description
should **not** change — it was specified in the project brief).

## Social icons

- Instagram and Facebook icons link to real profiles.
- The YouTube icon currently links to `#`. Either supply a channel URL in
  `CONTACT.youtube` or remove the icon from `Footer.tsx` and
  `ContactInfo.tsx` if there's no channel.

## Hero imagery

The hero (`src/components/home/Hero.tsx`) uses a solid gradient background
by design (no photo), matching the reference site's minimalist look. No
image is needed here unless BnR wants to add a background photo behind the
gradient later.
