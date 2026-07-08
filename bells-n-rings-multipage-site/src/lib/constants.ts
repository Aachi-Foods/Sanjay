// Central place for brand identity + contact details.
// Swap the PLACEHOLDER values for real details whenever they're available —
// nothing else in the codebase needs to change.

export const SITE_NAME_PRIMARY = "Bells n Rings";
export const SITE_NAME_SECONDARY = "Event Planners";
export const SITE_NAME_FULL = `${SITE_NAME_PRIMARY} ${SITE_NAME_SECONDARY}`;
export const SITE_MONOGRAM = "B&R";

export const SITE_TAGLINE =
  "Luxury weddings & events, designed to feel like a dream.";

export const SITE_URL = "https://bellsnringsevents.example.com";

export const CONTACT = {
  phone: "89396 27959",
  phoneHref: "tel:+918939627959",
  // PLACEHOLDER — no email address was supplied yet.
  email: "hello@bellsnrings.com",
  emailIsPlaceholder: true,
  // PLACEHOLDER — no studio address was supplied yet.
  address: "Studio address to be added — City, State, India",
  addressIsPlaceholder: true,
  instagram: "https://www.instagram.com/bellsnringsevents/",
  instagramHandle: "@bellsnringsevents",
  facebook:
    "https://www.facebook.com/profile.php?id=61585982768528",
  // Static embed, no API key required.
  mapEmbedSrc:
    "https://maps.google.com/maps?q=India&z=11&output=embed",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
