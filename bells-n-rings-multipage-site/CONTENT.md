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
- Anitha Suresh — Lead Event Planner
- Ramesh Krishnan — Operations Director
- Kavitha Pillai — Design & Styling Lead

Replace with real team member names, titles, short bios, and headshots
(currently generic free Unsplash stock headshots, not real BnR staff).

## Testimonials — `src/lib/content.ts` (`TESTIMONIALS`)

All six client quotes are illustrative placeholders (names, event types,
cities, and quotes are all invented). They're deliberately spread across
Hindu, Muslim, Sikh, and Christian ceremonies plus corporate events, to
reflect that BnR plans celebrations across every faith — keep that spread
when replacing them with real testimonials, rather than defaulting back to
one tradition.

## Gallery — `src/lib/content.ts` (`GALLERY_ITEMS`)

All nine gallery entries currently use free, general-purpose Unsplash stock
photos (weddings, receptions, corporate events — not literal photos of the
ceremony type named, and not real BnR events) labelled with a category and
a South Indian city (Chennai, Madurai, Bengaluru, Kochi, Hyderabad,
Coimbatore, Mysuru, Puducherry). The **titles and descriptions** are
intentionally multi-faith — Hindu (Silk & Jasmine Hindu Wedding, Temple
Town Muhurtham, Palace Grounds Wedding), Muslim (Nikah Reception), Sikh
(Anand Karaj & Sangeet Night), Christian (Kochi Christian Wedding), plus
corporate and secular receptions — so the site reads as serving every
faith, not one. The **photos themselves are still generic stock** (not
matched to each faith), so this is the highest-priority place to drop in
real photography once available — match each entry's real photo to the
ceremony type already named in its title.

## Service photography — `src/lib/content.ts` (`SERVICES`)

Each of the 8 services currently uses a free Unsplash stock photo as a
stand-in. Swap in real photos once available (the exact wording of each
service's title and description should **not** change — it was specified
in the project brief).

## Stock photography licensing note

Every photo currently in the site (services, gallery, team headshots,
Instagram strip, page banners, hero background, About/Story images) is
sourced from Unsplash under the [Unsplash License](https://unsplash.com/license) —
free for commercial use, no attribution required. They are generic event/
wedding stock photography, not matched to any specific faith and not real
BnR events or staff — treat every one as a placeholder. Because the
gallery's titles now name specific traditions (Hindu, Muslim, Sikh,
Christian) that the generic photos don't actually depict, replacing gallery
images with real, matching photography is the top priority once available.

## Social icons

- Instagram and Facebook icons link to real profiles.
- The YouTube icon currently links to `#`. Either supply a channel URL in
  `CONTACT.youtube` or remove the icon from `Footer.tsx` and
  `ContactInfo.tsx` if there's no channel.

## Hero imagery

The hero (`src/components/home/Hero.tsx`) uses a dimmed free stock photo
behind the forest-green gradient (kept subtle so the ring and heading stay
legible). Swap it for a real event photo once available, or remove the
`<Image>` entirely to go back to a pure gradient background.
