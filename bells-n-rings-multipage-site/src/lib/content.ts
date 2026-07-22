// All copy, service/gallery/testimonial data, and placeholder imagery lives
// here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: every image below is a free-to-use Unsplash photo (Unsplash
// License — free for commercial use, no attribution required), hotlinked by
// ID so nothing needs downloading to preview. These are generic event/
// wedding stock photography — not literal photos of the ceremony type named
// in each title/description, and not real BnR events — so treat them as
// placeholders: swap every `src` value for real event photography whenever
// it's ready. The titles/descriptions are intentionally spread across
// Hindu, Muslim, Sikh, and Christian ceremonies (see CONTENT.md); match that
// spread with real photos of each tradition once they're available. Nothing
// else needs to change since every image goes through next/image.

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

const HF_CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FFtmdb1eNHE0E6WzeaGlZLlGyF/";
function hf(filename: string) {
  return `${HF_CDN}${filename}`;
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
    image: hf("hf_20260722_045731_63c41ce1-7c9b-4a39-a290-c95509a9a828.png"),
    imageAlt: "South Indian wedding planner's table with a floor plan and marigold garlands beside an ornate mandap",
  },
  {
    slug: "venue-selection",
    title: "Venue Selection",
    shortDescription: "Perfect place for your occasion",
    longDescription:
      "Assistance with researching, shortlisting, visiting, comparing, and finalizing the right venue for the celebration.",
    image: hf("hf_20260722_045736_20d41710-aeba-4708-89cb-98c3749d91f5.png"),
    imageAlt: "Grand South Indian heritage wedding venue courtyard with pillared architecture and brass oil lamps",
  },
  {
    slug: "decoration-design",
    title: "Decoration & Design",
    shortDescription: "Custom themes & styling",
    longDescription:
      "Personalized event concepts, décor themes, floral styling, stage design, table styling, lighting, and visual presentation.",
    image: hf("hf_20260722_045738_f3e7c774-f787-4c8f-9d54-45b71ba4785f.png"),
    imageAlt: "Ornate South Indian wedding mandap stage with marigold and jasmine garlands",
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    shortDescription: "Capture every moment",
    longDescription:
      "Coordination of professional photography, traditional videography, candid coverage, cinematic films, and event memories.",
    image: hf("hf_20260722_045741_cc05897d-211e-433e-91d8-5280d4084082.png"),
    imageAlt: "Professional camera and video gear beside marigold garlands at a South Indian wedding",
  },
  {
    slug: "catering-beverages",
    title: "Catering & Beverages",
    shortDescription: "Delicious food, happy guests",
    longDescription:
      "Menu planning, caterer coordination, traditional and contemporary cuisine, live counters, refreshments, beverages, and guest dining management.",
    image: hf("hf_20260722_045743_c7852e01-ef15-4e27-98a2-7a22ecd87901.png"),
    imageAlt: "Elegant South Indian wedding banana-leaf feast spread with brass vessels",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    shortDescription: "Music, hosts & performances",
    longDescription:
      "Coordination of music, DJs, live performers, hosts, traditional entertainment, stage programs, and guest experiences.",
    image: hf("hf_20260722_045746_28fa271c-f9ed-42a6-b01c-83e2254968e4.png"),
    imageAlt: "Traditional South Indian nadaswaram and thavil instruments on a decorated wedding stage",
  },
  {
    slug: "guest-management",
    title: "Guest Management",
    shortDescription: "Invites, RSVP & coordination",
    longDescription:
      "Invitation coordination, RSVP tracking, guest communication, hospitality, seating support, travel guidance, and event-day assistance.",
    image: hf("hf_20260722_045748_e03a2010-ba2f-40af-be74-cc3f3ae3a5b0.png"),
    imageAlt: "Elegant South Indian wedding welcome table with guest name cards and marigold garlands",
  },
  {
    slug: "logistics-support",
    title: "Logistics & Support",
    shortDescription: "On-ground management",
    longDescription:
      "Vendor movement, timelines, transport, setup supervision, technical coordination, event-day operations, and on-ground problem solving.",
    image: hf("hf_20260722_045807_cbf1a7a0-c716-48f6-82d6-3c3889c36008.png"),
    imageAlt: "Event production crew setting up string lights and stage rig at dusk",
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
    image: hf("hf_20260722_044534_88e6c3c3-5c2a-43da-af61-28cb8088a1d2.png"),
    imageAlt: "Traditional South Indian Hindu wedding mandap with silk and jasmine garlands",
    description:
      "A traditional Hindu ceremony styled with jasmine garlands, banana-leaf motifs, and a gold-accented mandap.",
  },
  {
    slug: "temple-town-muhurtham",
    title: "Temple Town Muhurtham",
    category: "traditional",
    location: "Madurai, Tamil Nadu",
    image: hf("hf_20260722_044537_6b309dd7-ac38-4864-85f4-eddbeeda524c.png"),
    imageAlt: "South Indian temple-town muhurtham ceremony with a kolam-lined pathway",
    description:
      "A muhurtham ceremony honoring family tradition, with kolam-lined pathways and live nadaswaram music.",
  },
  {
    slug: "nikah-reception",
    title: "Nikah Reception",
    category: "receptions",
    location: "Bengaluru, Karnataka",
    image: hf("hf_20260722_044539_7d9b9cd9-1c1b-49eb-9857-ce211fa66dea.png"),
    imageAlt: "Elegant nikah reception with antique-gold drapery and candlelit tables",
    description:
      "A joyful nikah reception styled with antique-gold drapery, candlelight, and a curated regional menu.",
  },
  {
    slug: "kochi-christian-wedding",
    title: "Kochi Christian Wedding",
    category: "weddings",
    location: "Kochi, Kerala",
    image: hf("hf_20260722_044547_93709261-8150-4409-b476-9267e7a3111c.png"),
    imageAlt: "Christian wedding reception on a Kerala backwater waterfront at golden hour",
    description:
      "A Syro-Malabar church wedding followed by a waterside reception, with a multi-day itinerary for out-of-town guests.",
  },
  {
    slug: "corporate-leadership-summit",
    title: "Leadership Summit",
    category: "corporate",
    location: "Hyderabad, Telangana",
    image: hf("hf_20260722_044551_44c786bc-ba85-4f72-822a-326a29adb1f1.png"),
    imageAlt: "Corporate leadership summit stage with branded backdrop and seating",
    description:
      "A 300-guest leadership summit with custom stage design, AV production, and delegate hospitality.",
  },
  {
    slug: "anand-karaj-sangeet-night",
    title: "Anand Karaj & Sangeet Night",
    category: "receptions",
    location: "Coimbatore, Tamil Nadu",
    image: hf("hf_20260722_044553_ec4396f0-f6af-4c5e-9a25-e29324504fa6.png"),
    imageAlt: "Vibrant Sikh sangeet night stage with dynamic colored lighting",
    description:
      "A Sikh Anand Karaj followed by a high-energy sangeet, with a custom stage, dynamic lighting, and a live performance lineup.",
  },
  {
    slug: "palace-grounds-wedding",
    title: "Palace Grounds Wedding",
    category: "weddings",
    location: "Mysuru, Karnataka",
    image: hf("hf_20260722_044555_cea4adaf-95d3-425d-8418-44c892313c89.png"),
    imageAlt: "Heritage palace-grounds wedding styled with marigold and jasmine",
    description:
      "A heritage-venue Hindu wedding styled with marigold and jasmine, honoring the grandeur of the setting.",
  },
  {
    slug: "product-launch-gala",
    title: "Product Launch Gala",
    category: "corporate",
    location: "Chennai, Tamil Nadu",
    image: hf("hf_20260722_044558_d774c185-b5c2-4679-9a9a-430154fd2e9f.png"),
    imageAlt: "Brand product-launch gala stage with immersive lighting and branding",
    description:
      "A brand product launch with immersive stage branding, live demo zones, and press hospitality.",
  },
  {
    slug: "seaside-interfaith-reception",
    title: "Seaside Reception",
    category: "receptions",
    location: "Puducherry",
    image: hf("hf_20260722_044601_1feba7bd-db23-4d38-991d-10ac616a6d52.png"),
    imageAlt: "Breezy seaside wedding reception dinner at dusk with string lighting",
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
  unsplash("photo-1519741497674-611481863552", 600),
  unsplash("photo-1527529482837-4698179dc6ce", 600),
  unsplash("photo-1530103862676-de8c9debad1d", 600),
  unsplash("photo-1511578314322-379afb476865", 600),
  unsplash("photo-1522673607200-164d1b6ce486", 600),
  unsplash("photo-1464366400600-7168b8af9bc3", 600),
];

// Interior page banner imagery (About, Services, Gallery, Contact).
export const PAGE_HEADER_IMAGES = {
  services: hf("hf_20260722_045729_a3748580-4bb8-45d8-b55b-75683739d218.png"),
  gallery: hf("hf_20260722_044606_9b167a46-dea5-43b2-8f1c-90e1b2352eef.png"),
  about: hf("hf_20260722_044715_f277e41f-2d15-4a75-a378-db1d39d12eb1.png"),
};
