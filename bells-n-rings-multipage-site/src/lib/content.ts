// All copy, service/gallery/testimonial data, and placeholder imagery lives
// here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: every image below is a free-to-use Unsplash photo (Unsplash
// License — free for commercial use, no attribution required), hotlinked by
// ID so nothing needs downloading to preview. They're general event/wedding
// stock photography, not literal South Indian ceremony photos, so treat them
// as placeholders: swap every `src` value for real event photography
// whenever it's ready. Nothing else needs to change since every image goes
// through next/image. See CONTENT.md for the full list of what the client
// needs to supply.

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
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
    image: unsplash("photo-1519671482749-fd09be7ccebf"),
    imageAlt: "Placeholder — event planning stage design and coordination",
  },
  {
    slug: "venue-selection",
    title: "Venue Selection",
    shortDescription: "Perfect place for your occasion",
    longDescription:
      "Assistance with researching, shortlisting, visiting, comparing, and finalizing the right venue for the celebration.",
    image: unsplash("photo-1465495976277-4387d4b0b4c6"),
    imageAlt: "Placeholder — outdoor garden venue under a floral arch",
  },
  {
    slug: "decoration-design",
    title: "Decoration & Design",
    shortDescription: "Custom themes & styling",
    longDescription:
      "Personalized event concepts, décor themes, floral styling, stage design, table styling, lighting, and visual presentation.",
    image: unsplash("photo-1583939003579-730e3918a45a"),
    imageAlt: "Placeholder — ornate mandap decorated with flowers",
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    shortDescription: "Capture every moment",
    longDescription:
      "Coordination of professional photography, traditional videography, candid coverage, cinematic films, and event memories.",
    image: unsplash("photo-1519741497674-611481863552"),
    imageAlt: "Placeholder — close-up wedding detail photography",
  },
  {
    slug: "catering-beverages",
    title: "Catering & Beverages",
    shortDescription: "Delicious food, happy guests",
    longDescription:
      "Menu planning, caterer coordination, traditional and contemporary cuisine, live counters, refreshments, beverages, and guest dining management.",
    image: unsplash("photo-1509927083803-4bd519298ac4"),
    imageAlt: "Placeholder — reception dining setting",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    shortDescription: "Music, hosts & performances",
    longDescription:
      "Coordination of music, DJs, live performers, hosts, traditional entertainment, stage programs, and guest experiences.",
    image: unsplash("photo-1530103862676-de8c9debad1d"),
    imageAlt: "Placeholder — outdoor celebration at golden hour",
  },
  {
    slug: "guest-management",
    title: "Guest Management",
    shortDescription: "Invites, RSVP & coordination",
    longDescription:
      "Invitation coordination, RSVP tracking, guest communication, hospitality, seating support, travel guidance, and event-day assistance.",
    image: unsplash("photo-1527529482837-4698179dc6ce"),
    imageAlt: "Placeholder — guest table styling",
  },
  {
    slug: "logistics-support",
    title: "Logistics & Support",
    shortDescription: "On-ground management",
    longDescription:
      "Vendor movement, timelines, transport, setup supervision, technical coordination, event-day operations, and on-ground problem solving.",
    image: unsplash("photo-1606800052052-a08af7148866"),
    imageAlt: "Placeholder — event stage setup and production crew",
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
    image: unsplash("photo-1465495976277-4387d4b0b4c6", 1200),
    imageAlt: "Placeholder — traditional wedding ceremony styling",
    description:
      "A traditional ceremony styled with jasmine garlands, banana-leaf motifs, and a gold-accented mandap.",
  },
  {
    slug: "temple-town-muhurtham",
    title: "Temple Town Muhurtham",
    category: "traditional",
    location: "Madurai, Tamil Nadu",
    image: unsplash("photo-1583939003579-730e3918a45a", 1200),
    imageAlt: "Placeholder — traditional muhurtham ceremony",
    description:
      "A muhurtham ceremony honoring family tradition, with kolam-lined pathways and live nadaswaram music.",
  },
  {
    slug: "golden-hour-reception",
    title: "Golden Hour Reception",
    category: "receptions",
    location: "Bengaluru, Karnataka",
    image: unsplash("photo-1509927083803-4bd519298ac4", 1200),
    imageAlt: "Placeholder — evening wedding reception styling",
    description:
      "An evening reception styled with antique-gold drapery, candlelight, and a curated regional menu.",
  },
  {
    slug: "backwater-wedding",
    title: "Backwater Wedding",
    category: "weddings",
    location: "Kochi, Kerala",
    image: unsplash("photo-1522673607200-164d1b6ce486", 1200),
    imageAlt: "Placeholder — waterfront wedding ceremony",
    description:
      "A waterside ceremony with a floral mandap, brass lamps, and a multi-day itinerary for out-of-town guests.",
  },
  {
    slug: "corporate-leadership-summit",
    title: "Leadership Summit",
    category: "corporate",
    location: "Hyderabad, Telangana",
    image: unsplash("photo-1511578314322-379afb476865", 1200),
    imageAlt: "Placeholder — corporate summit stage and seating",
    description:
      "A 300-guest leadership summit with custom stage design, AV production, and delegate hospitality.",
  },
  {
    slug: "sangeet-night",
    title: "Sangeet Night",
    category: "receptions",
    location: "Coimbatore, Tamil Nadu",
    image: unsplash("photo-1530103862676-de8c9debad1d", 1200),
    imageAlt: "Placeholder — sangeet night stage and lighting",
    description:
      "A high-energy sangeet with a custom stage, dynamic lighting design, and a live performance lineup.",
  },
  {
    slug: "palace-grounds-wedding",
    title: "Palace Grounds Wedding",
    category: "weddings",
    location: "Mysuru, Karnataka",
    image: unsplash("photo-1519225421980-715cb0215aed", 1200),
    imageAlt: "Placeholder — heritage venue wedding styling",
    description:
      "A heritage-venue wedding styled with marigold and jasmine, honoring the grandeur of the setting.",
  },
  {
    slug: "product-launch-gala",
    title: "Product Launch Gala",
    category: "corporate",
    location: "Chennai, Tamil Nadu",
    image: unsplash("photo-1606800052052-a08af7148866", 1200),
    imageAlt: "Placeholder — product launch stage and branding",
    description:
      "A brand product launch with immersive stage branding, live demo zones, and press hospitality.",
  },
  {
    slug: "seaside-reception",
    title: "Seaside Reception",
    category: "receptions",
    location: "Puducherry",
    image: unsplash("photo-1519167758481-83f550bb49b3", 1200),
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
    image: unsplash("photo-1544005313-94ddf0286df2", 800),
  },
  {
    name: "Anitha Suresh",
    role: "Lead Event Planner",
    bio: "Anitha turns timelines and vendor logistics into invisible infrastructure, so every event runs without a single visible seam.",
    image: unsplash("photo-1580489944761-15a19d654956", 800),
  },
  {
    name: "Ramesh Krishnan",
    role: "Operations Director",
    bio: "Ramesh leads on-ground execution — from venue setup to day-of coordination — keeping every moving part on schedule.",
    image: unsplash("photo-1568602471122-7832951cc4c5", 800),
  },
  {
    name: "Kavitha Pillai",
    role: "Design & Styling Lead",
    bio: "Kavitha shapes the visual language of every celebration, from floral direction to stage design and lighting.",
    image: unsplash("photo-1607346256330-dee7af15f7c5", 800),
  },
];

export const INSTAGRAM_STRIP_IMAGES = [
  unsplash("photo-1519741497674-611481863552", 600),
  unsplash("photo-1527529482837-4698179dc6ce", 600),
  unsplash("photo-1530103862676-de8c9debad1d", 600),
  unsplash("photo-1511578314322-379afb476865", 600),
  unsplash("photo-1522673607200-164d1b6ce486", 600),
  unsplash("photo-1464366400600-7168b8af9bc3", 600),
];

// Interior page banner imagery (About, Services, Gallery, Contact).
export const PAGE_HEADER_IMAGES = {
  services: unsplash("photo-1478146059778-26028b07395a", 1920),
  gallery: unsplash("photo-1530103862676-de8c9debad1d", 1920),
  about: unsplash("photo-1511285560929-80b456fea0bc", 1920),
};
