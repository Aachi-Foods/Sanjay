// Central place for brand identity + contact details.
// Swap the PLACEHOLDER values for real details whenever they're available —
// nothing else in the codebase needs to change.

export const SITE_NAME_PRIMARY = "BnR";
export const SITE_NAME_SECONDARY = "Event Planners";
export const SITE_NAME_FULL = `${SITE_NAME_PRIMARY} ${SITE_NAME_SECONDARY}`;
export const SITE_MONOGRAM = "BnR";

export const SITE_TAGLINE = "Your Celebration. Our Passion.";

export const SITE_URL = "https://bellsnringsevents.example.com";

export const CONTACT = {
  phone: "89396 27959",
  phoneHref: "tel:+918939627959",
  whatsappHref: "https://wa.me/918939627959",
  // PLACEHOLDER — no email address was supplied yet.
  email: "hello@bnreventplanners.com",
  emailIsPlaceholder: true,
  // PLACEHOLDER — no studio address was supplied yet.
  address: "Studio address to be added — City, State, South India",
  addressIsPlaceholder: true,
  instagram: "https://www.instagram.com/bellsnringsevents/",
  instagramHandle: "@bellsnringsevents",
  facebook: "https://www.facebook.com/profile.php?id=61585982768528",
  // PLACEHOLDER — no channel URL was supplied yet.
  youtube: "#",
  youtubeIsPlaceholder: true,
  // Static embed, no API key required.
  mapEmbedSrc: "https://maps.google.com/maps?q=India&z=11&output=embed",
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
