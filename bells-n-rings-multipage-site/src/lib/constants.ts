// Central place for brand identity + contact details.
// Swap the PLACEHOLDER values for real details whenever they're available —
// nothing else in the codebase needs to change.

import heroPosterPhoto from "@/assets/hero-poster.jpg";
import heroPosterMobilePhoto from "@/assets/hero-poster-mobile.jpg";

export const SITE_NAME_PRIMARY = "BNR";
export const SITE_NAME_SECONDARY = "Event Planners";
export const SITE_NAME_FULL = `${SITE_NAME_PRIMARY} ${SITE_NAME_SECONDARY}`;
export const SITE_MONOGRAM = "BNR";

export const SITE_TAGLINE = "Your Celebration. Our Passion.";

export const SITE_URL = "https://bellsnringsevents.example.com";

export const CONTACT = {
  phone: "89396 27959",
  phoneHref: "tel:+918939627959",
  whatsappHref: "https://wa.me/918939627959",
  // PLACEHOLDER — no email address was supplied yet.
  email: "hello@bnreventplanners.com",
  emailIsPlaceholder: true,
  address:
    "NO 1926, I Block, Aishwarya Colony, 34th Street, Anna Nagar West, Chennai, Tamil Nadu, 600040",
  addressIsPlaceholder: false,
  instagram: "https://www.instagram.com/bellsnringsevents/",
  instagramHandle: "@bellsnringsevents",
  facebook: "https://www.facebook.com/profile.php?id=61585982768528",
  // PLACEHOLDER — no channel URL was supplied yet.
  youtube: "#",
  youtubeIsPlaceholder: true,
  // Static embed, no API key required.
  mapEmbedSrc:
    "https://maps.google.com/maps?q=NO+1926%2C+I+Block%2C+Aishwarya+Colony%2C+34th+Street%2C+Anna+Nagar+West%2C+Chennai%2C+Tamil+Nadu+600040&z=16&output=embed",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Header/mobile nav omit "Contact" since the Enquire button already links
// there — the Footer's quick-links list still uses the full NAV_LINKS.
export const HEADER_NAV_LINKS: NavLink[] = NAV_LINKS.filter(
  (link) => link.href !== "/contact",
);

// --- Hero backdrop -------------------------------------------------------
// The hero can play a video instead of the still photo. To use one, drop the
// file into public/ and set HERO_VIDEO to "/your-file.mp4", or paste a full
// https:// URL if it is hosted elsewhere. Leave it empty and the hero falls
// back to HERO_POSTER on its own.
//
// The same image is used as the video's poster, so it shows while the video
// buffers and stands in for visitors who prefer reduced motion — a hero that
// loops on its own is exactly what that setting is meant to stop.
export const HERO_VIDEO: string = "";

export const HERO_POSTER = heroPosterPhoto;

// A portrait crop of the same mandap, used below the `sm` breakpoint. The
// landscape photo above centers on the couple when cropped to a phone's
// aspect ratio, but loses the mandap's full height and the kolam-lined
// aisle in front of it — this crop keeps the whole scene in frame instead.
export const HERO_POSTER_MOBILE = heroPosterMobilePhoto;

export const HERO_POSTER_ALT =
  "Bride and groom seated with family beneath a gold-carved temple mandap strung with jasmine and roses, priests tending the sacred fire before an elaborate kolam as musicians play the nadaswaram, with the temple gopuram rising behind them";
