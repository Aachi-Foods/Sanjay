// All copy, service/gallery/testimonial data, and placeholder imagery lives
// here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: every image below is a placehold.co stub — solid brand-color
// tiles labelled with what should go there. Swap every `src` value for real
// event photography whenever it's ready; nothing else needs to change since
// every image goes through next/image. See CONTENT.md for the full list of
// what the client needs to supply.

function placeholder(
  w: number,
  h: number,
  label: string,
  bg: "1a2e1a" | "c9a84c" | "faf6ef" = "1a2e1a",
  fg: "faf6ef" | "2c2c2c" = "faf6ef",
) {
  return `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label)}`;
}

export type ServiceSlug =
  | "event-planning"
  | "venue-selection"
  | "decoration-design"
  | "photography-videography"
  | "catering-beverages"
  | "entertainment"
  | "guest-management"
  | "logistics-support";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  imageAlt: string;
};

// Exactly the 8 services from the brief — wording, order, and naming must
// not be changed, merged, or reordered.
export const SERVICES: Service[] = [
  {
    slug: "event-planning",
    title: "Event Planning",
    shortDescription: "Concept to execution",
    longDescription:
      "Complete event planning from the first concept through schedules, vendors, production, coordination, and final execution.",
    image: placeholder(1600, 1200, "Event Planning"),
    imageAlt: "Placeholder — event planning concept board and schedule",
  },
  {
    slug: "venue-selection",
    title: "Venue Selection",
    shortDescription: "Perfect place for your occasion",
    longDescription:
      "Assistance with researching, shortlisting, visiting, comparing, and finalizing the right venue for the celebration.",
    image: placeholder(1600, 1200, "Venue Selection"),
    imageAlt: "Placeholder — event venue shortlist and site visit",
  },
  {
    slug: "decoration-design",
    title: "Decoration & Design",
    shortDescription: "Custom themes & styling",
    longDescription:
      "Personalized event concepts, décor themes, floral styling, stage design, table styling, lighting, and visual presentation.",
    image: placeholder(1600, 1200, "Decoration & Design"),
    imageAlt: "Placeholder — decor and stage design styling",
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    shortDescription: "Capture every moment",
    longDescription:
      "Coordination of professional photography, traditional videography, candid coverage, cinematic films, and event memories.",
    image: placeholder(1600, 1200, "Photography & Videography"),
    imageAlt: "Placeholder — event photography and videography coverage",
  },
  {
    slug: "catering-beverages",
    title: "Catering & Beverages",
    shortDescription: "Delicious food, happy guests",
    longDescription:
      "Menu planning, caterer coordination, traditional and contemporary cuisine, live counters, refreshments, beverages, and guest dining management.",
    image: placeholder(1600, 1200, "Catering & Beverages"),
    imageAlt: "Placeholder — catering spread and live counters",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    shortDescription: "Music, hosts & performances",
    longDescription:
      "Coordination of music, DJs, live performers, hosts, traditional entertainment, stage programs, and guest experiences.",
    image: placeholder(1600, 1200, "Entertainment"),
    imageAlt: "Placeholder — live music and stage performance",
  },
  {
    slug: "guest-management",
    title: "Guest Management",
    shortDescription: "Invites, RSVP & coordination",
    longDescription:
      "Invitation coordination, RSVP tracking, guest communication, hospitality, seating support, travel guidance, and event-day assistance.",
    image: placeholder(1600, 1200, "Guest Management"),
    imageAlt: "Placeholder — guest invitations and RSVP tracking",
  },
  {
    slug: "logistics-support",
    title: "Logistics & Support",
    shortDescription: "On-ground management",
    longDescription:
      "Vendor movement, timelines, transport, setup supervision, technical coordination, event-day operations, and on-ground problem solving.",
    image: placeholder(1600, 1200, "Logistics & Support"),
    imageAlt: "Placeholder — on-ground event logistics team",
  },
];

export type GalleryCategorySlug =
  | "weddings"
  | "receptions"
  | "traditional"
  | "corporate";

export type GalleryItem = {
  slug: string;
  title: string;
  category: GalleryCategorySlug;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "silk-and-jasmine-wedding",
    title: "Silk & Jasmine Wedding",
    category: "weddings",
    location: "Chennai, Tamil Nadu",
    image: placeholder(1200, 1500, "Wedding — Chennai"),
    imageAlt: "Placeholder — traditional wedding ceremony styling",
    description:
      "A traditional ceremony styled with jasmine garlands, banana-leaf motifs, and a gold-accented mandap.",
  },
  {
    slug: "temple-town-muhurtham",
    title: "Temple Town Muhurtham",
    category: "traditional",
    location: "Madurai, Tamil Nadu",
    image: placeholder(1200, 1500, "Muhurtham — Madurai"),
    imageAlt: "Placeholder — traditional muhurtham ceremony",
    description:
      "A muhurtham ceremony honoring family tradition, with kolam-lined pathways and live nadaswaram music.",
  },
  {
    slug: "golden-hour-reception",
    title: "Golden Hour Reception",
    category: "receptions",
    location: "Bengaluru, Karnataka",
    image: placeholder(1200, 1500, "Reception — Bengaluru"),
    imageAlt: "Placeholder — evening wedding reception styling",
    description:
      "An evening reception styled with antique-gold drapery, candlelight, and a curated regional menu.",
  },
  {
    slug: "backwater-wedding",
    title: "Backwater Wedding",
    category: "weddings",
    location: "Kochi, Kerala",
    image: placeholder(1200, 1500, "Wedding — Kochi"),
    imageAlt: "Placeholder — waterfront wedding ceremony",
    description:
      "A waterside ceremony with a floral mandap, brass lamps, and a multi-day itinerary for out-of-town guests.",
  },
  {
    slug: "corporate-leadership-summit",
    title: "Leadership Summit",
    category: "corporate",
    location: "Hyderabad, Telangana",
    image: placeholder(1200, 1500, "Corporate — Hyderabad"),
    imageAlt: "Placeholder — corporate summit stage and seating",
    description:
      "A 300-guest leadership summit with custom stage design, AV production, and delegate hospitality.",
  },
  {
    slug: "sangeet-night",
    title: "Sangeet Night",
    category: "receptions",
    location: "Coimbatore, Tamil Nadu",
    image: placeholder(1200, 1500, "Sangeet — Coimbatore"),
    imageAlt: "Placeholder — sangeet night stage and lighting",
    description:
      "A high-energy sangeet with a custom stage, dynamic lighting design, and a live performance lineup.",
  },
  {
    slug: "palace-grounds-wedding",
    title: "Palace Grounds Wedding",
    category: "weddings",
    location: "Mysuru, Karnataka",
    image: placeholder(1200, 1500, "Wedding — Mysuru"),
    imageAlt: "Placeholder — heritage venue wedding styling",
    description:
      "A heritage-venue wedding styled with marigold and jasmine, honoring the grandeur of the setting.",
  },
  {
    slug: "product-launch-gala",
    title: "Product Launch Gala",
    category: "corporate",
    location: "Chennai, Tamil Nadu",
    image: placeholder(1200, 1500, "Corporate — Chennai"),
    imageAlt: "Placeholder — product launch stage and branding",
    description:
      "A brand product launch with immersive stage branding, live demo zones, and press hospitality.",
  },
  {
    slug: "seaside-reception",
    title: "Seaside Reception",
    category: "receptions",
    location: "Puducherry",
    image: placeholder(1200, 1500, "Reception — Puducherry"),
    imageAlt: "Placeholder — seaside reception dinner setting",
    description:
      "A breezy seaside reception with string lighting, a curated coastal menu, and live acoustic music.",
  },
];

export const GALLERY_FILTERS: {
  label: string;
  value: GalleryCategorySlug | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Receptions", value: "receptions" },
  { label: "Traditional Ceremonies", value: "traditional" },
  { label: "Corporate & Private", value: "corporate" },
];

export type Testimonial = {
  name: string;
  eventType: string;
  location: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Meenakshi & Karthik",
    eventType: "Wedding",
    location: "Chennai",
    quote:
      "BnR turned our wedding into exactly the celebration we dreamed of — every tradition honored, every detail considered. We simply got to be present with our families.",
  },
  {
    name: "Lakshmi Iyer",
    eventType: "Traditional Ceremony",
    location: "Madurai",
    quote:
      "Our muhurtham felt effortless because the BnR team handled every ritual detail with so much care and respect for our customs.",
  },
  {
    name: "Arun Kumar, Head of Marketing",
    eventType: "Corporate Event",
    location: "Hyderabad",
    quote:
      "Our leadership summit needed to feel premium and precise. BnR delivered flawless staging and hospitality without a single hitch.",
  },
  {
    name: "Divya & Prasanna",
    eventType: "Reception",
    location: "Bengaluru",
    quote:
      "From the décor to the catering to the entertainment lineup, every vendor BnR brought in was outstanding. Our guests are still talking about it.",
  },
  {
    name: "Radhika Nair",
    eventType: "Wedding",
    location: "Kochi",
    quote:
      "Planning a backwater wedding with guests flying in from across the country felt impossible until BnR took over logistics. Everyone simply arrived and celebrated.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Bhavani Raman",
    role: "Founder & Creative Director",
    bio: "Bhavani founded BnR Event Planners after a decade in South Indian wedding hospitality, bringing an editorial eye to every celebration she designs.",
    image: placeholder(800, 800, "Bhavani R.", "c9a84c", "2c2c2c"),
  },
  {
    name: "Ramesh Krishnan",
    role: "Lead Event Planner",
    bio: "Ramesh turns timelines and vendor logistics into invisible infrastructure, so every event runs without a single visible seam.",
    image: placeholder(800, 800, "Ramesh K.", "c9a84c", "2c2c2c"),
  },
  {
    name: "Anitha Suresh",
    role: "Operations Director",
    bio: "Anitha leads on-ground execution — from venue setup to day-of coordination — keeping every moving part on schedule.",
    image: placeholder(800, 800, "Anitha S.", "c9a84c", "2c2c2c"),
  },
  {
    name: "Vignesh Pillai",
    role: "Design & Styling Lead",
    bio: "Vignesh shapes the visual language of every celebration, from floral direction to stage design and lighting.",
    image: placeholder(800, 800, "Vignesh P.", "c9a84c", "2c2c2c"),
  },
];

export const INSTAGRAM_STRIP_IMAGES = [
  placeholder(600, 600, "Gallery 1", "1a2e1a"),
  placeholder(600, 600, "Gallery 2", "c9a84c", "2c2c2c"),
  placeholder(600, 600, "Gallery 3", "1a2e1a"),
  placeholder(600, 600, "Gallery 4", "c9a84c", "2c2c2c"),
  placeholder(600, 600, "Gallery 5", "1a2e1a"),
  placeholder(600, 600, "Gallery 6", "c9a84c", "2c2c2c"),
];

// Interior page banner imagery (About, Services, Gallery, Contact).
export const PAGE_HEADER_IMAGES = {
  services: placeholder(1920, 900, "Our Services", "1a2e1a"),
  gallery: placeholder(1920, 900, "Our Gallery", "1a2e1a"),
  about: placeholder(1920, 900, "About BnR", "1a2e1a"),
};
