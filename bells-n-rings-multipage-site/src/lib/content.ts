// All copy, service/gallery/testimonial data, and placeholder imagery lives
// here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: every image below is a free-to-use Unsplash photo (Unsplash
// License — free for commercial use, no attribution required), hotlinked by
// ID so nothing needs downloading to preview. They're real Indian wedding/
// event photography (not literal BnR events), chosen to represent Hindu,
// Muslim, Sikh, and Christian ceremonies rather than skewing toward one
// tradition — but still placeholders: swap every `src` value for real BnR
// event photography whenever it's ready. Nothing else needs to change since
// every image goes through next/image. See CONTENT.md for the full list of
// what the client needs to supply.

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
    image: unsplash("photo-wGi9dQZCP0s"),
    imageAlt: "Placeholder — event planning team coordinating around a table",
  },
  {
    slug: "venue-selection",
    title: "Venue Selection",
    shortDescription: "Perfect place for your occasion",
    longDescription:
      "Assistance with researching, shortlisting, visiting, comparing, and finalizing the right venue for the celebration.",
    image: unsplash("photo-BEdxXAiRfRM"),
    imageAlt: "Placeholder — venue interior with gold and white floral ceiling decor",
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
    image: unsplash("photo-BDWH_GDKVCI"),
    imageAlt: "Placeholder — close-up photography of bride and groom's hands with mehndi",
  },
  {
    slug: "catering-beverages",
    title: "Catering & Beverages",
    shortDescription: "Delicious food, happy guests",
    longDescription:
      "Menu planning, caterer coordination, traditional and contemporary cuisine, live counters, refreshments, beverages, and guest dining management.",
    image: unsplash("photo-tfY3TUYJaXg"),
    imageAlt: "Placeholder — guests celebrating at a wedding reception",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    shortDescription: "Music, hosts & performances",
    longDescription:
      "Coordination of music, DJs, live performers, hosts, traditional entertainment, stage programs, and guest experiences.",
    image: unsplash("photo-EKKJ3MvQlsE"),
    imageAlt: "Placeholder — large crowd enjoying a live stage performance",
  },
  {
    slug: "guest-management",
    title: "Guest Management",
    shortDescription: "Invites, RSVP & coordination",
    longDescription:
      "Invitation coordination, RSVP tracking, guest communication, hospitality, seating support, travel guidance, and event-day assistance.",
    image: unsplash("photo-TcaXNeJciaE"),
    imageAlt: "Placeholder — guests joining hands in celebration",
  },
  {
    slug: "logistics-support",
    title: "Logistics & Support",
    shortDescription: "On-ground management",
    longDescription:
      "Vendor movement, timelines, transport, setup supervision, technical coordination, event-day operations, and on-ground problem solving.",
    image: unsplash("photo-AsxOJcsaR4g"),
    imageAlt: "Placeholder — event stage and production crew during a live program",
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
    slug: "silk-and-jasmine-hindu-wedding",
    title: "Silk & Jasmine Hindu Wedding",
    category: "weddings",
    location: "Chennai, Tamil Nadu",
    image: unsplash("photo-vl46kNcTihA", 1200),
    imageAlt: "Placeholder — traditional Hindu wedding ceremony, bride and groom's hands with flowers",
    description:
      "A traditional Hindu ceremony styled with jasmine garlands, banana-leaf motifs, and a gold-accented mandap.",
  },
  {
    slug: "temple-town-muhurtham",
    title: "Temple Town Muhurtham",
    category: "traditional",
    location: "Madurai, Tamil Nadu",
    image: unsplash("photo-1583939003579-730e3918a45a", 1200),
    imageAlt: "Placeholder — traditional Hindu muhurtham ceremony under a decorated mandap",
    description:
      "A muhurtham ceremony honoring family tradition, with kolam-lined pathways and live nadaswaram music.",
  },
  {
    slug: "nikah-reception",
    title: "Nikah Reception",
    category: "receptions",
    location: "Bengaluru, Karnataka",
    image: unsplash("photo-tfY3TUYJaXg", 1200),
    imageAlt: "Placeholder — Muslim wedding reception celebration",
    description:
      "A joyful nikah reception styled with antique-gold drapery, candlelight, and a curated regional menu.",
  },
  {
    slug: "kochi-christian-wedding",
    title: "Kochi Christian Wedding",
    category: "weddings",
    location: "Kochi, Kerala",
    image: unsplash("photo-2XXQkrL0k-Q", 1200),
    imageAlt: "Placeholder — Christian wedding couple in traditional attire",
    description:
      "A Syro-Malabar church wedding followed by a waterside reception, with a multi-day itinerary for out-of-town guests.",
  },
  {
    slug: "corporate-leadership-summit",
    title: "Leadership Summit",
    category: "corporate",
    location: "Hyderabad, Telangana",
    image: unsplash("photo-AsxOJcsaR4g", 1200),
    imageAlt: "Placeholder — corporate summit stage and speaker",
    description:
      "A 300-guest leadership summit with custom stage design, AV production, and delegate hospitality.",
  },
  {
    slug: "anand-karaj-sangeet-night",
    title: "Anand Karaj & Sangeet Night",
    category: "receptions",
    location: "Coimbatore, Tamil Nadu",
    image: unsplash("photo-8ZeDzzHoYik", 1200),
    imageAlt: "Placeholder — Sikh wedding celebration crowd around a stage",
    description:
      "A Sikh Anand Karaj followed by a high-energy sangeet, with a custom stage, dynamic lighting, and a live performance lineup.",
  },
  {
    slug: "palace-grounds-wedding",
    title: "Palace Grounds Wedding",
    category: "weddings",
    location: "Mysuru, Karnataka",
    image: unsplash("photo-BHlJI-Rg0MM", 1200),
    imageAlt: "Placeholder — heritage venue wedding, couple in traditional Indian attire",
    description:
      "A heritage-venue Hindu wedding styled with marigold and jasmine, honoring the grandeur of the setting.",
  },
  {
    slug: "product-launch-gala",
    title: "Product Launch Gala",
    category: "corporate",
    location: "Chennai, Tamil Nadu",
    image: unsplash("photo-wGi9dQZCP0s", 1200),
    imageAlt: "Placeholder — product launch team coordination",
    description:
      "A brand product launch with immersive stage branding, live demo zones, and press hospitality.",
  },
  {
    slug: "seaside-interfaith-reception",
    title: "Seaside Reception",
    category: "receptions",
    location: "Puducherry",
    image: unsplash("photo-c5szA-zveJE", 1200),
    imageAlt: "Placeholder — bride in traditional attire at a seaside celebration",
    description:
      "A breezy seaside reception styled for an interfaith couple, with string lighting, a curated coastal menu, and live acoustic music.",
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

// A deliberate spread across Hindu, Muslim, Sikh, and Christian clients,
// plus secular corporate events — BnR plans celebrations across every
// faith and tradition, not one in particular.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Meenakshi & Karthik",
    eventType: "Hindu Wedding",
    location: "Chennai",
    quote:
      "BnR turned our wedding into exactly the celebration we dreamed of — every tradition honored, every ritual detail considered. We simply got to be present with our families.",
  },
  {
    name: "Ayesha & Imran",
    eventType: "Nikah",
    location: "Hyderabad",
    quote:
      "BnR understood exactly how we wanted our nikah and reception to feel — respectful of tradition, warm for our families, and beautifully styled from start to finish.",
  },
  {
    name: "Preet & Simran",
    eventType: "Anand Karaj",
    location: "Coimbatore",
    quote:
      "Our Anand Karaj and sangeet needed a team who understood Sikh traditions properly. BnR got every ritual and every detail exactly right.",
  },
  {
    name: "Maria & Thomas",
    eventType: "Christian Wedding",
    location: "Kochi",
    quote:
      "From the church ceremony to the waterside reception, BnR coordinated every vendor flawlessly. Guests flying in from across the country simply arrived and celebrated.",
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
  unsplash("photo-vl46kNcTihA", 600),
  unsplash("photo-BDWH_GDKVCI", 600),
  unsplash("photo-tfY3TUYJaXg", 600),
  unsplash("photo-AsxOJcsaR4g", 600),
  unsplash("photo-BEdxXAiRfRM", 600),
  unsplash("photo-c5szA-zveJE", 600),
];

// Interior page banner imagery (About, Services, Gallery, Contact).
export const PAGE_HEADER_IMAGES = {
  services: unsplash("photo-AsxOJcsaR4g", 1920),
  gallery: unsplash("photo-vl46kNcTihA", 1920),
  about: unsplash("photo-wGi9dQZCP0s", 1920),
};
