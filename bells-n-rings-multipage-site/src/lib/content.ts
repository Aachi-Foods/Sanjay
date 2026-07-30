// All copy, service/gallery/testimonial data, and placeholder imagery lives
// here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: real photography is being swapped in a piece at a time, and
// anything imported from @/assets is real. The rest are still placeholders —
// hotlinked stock or generated stand-ins, generic event/wedding imagery
// rather than literal photos of the ceremony each entry names, and not real
// BnR events. Keep replacing them with real event photography as it lands.
//
// The titles and descriptions are intentionally spread across Hindu, Muslim,
// Sikh, and Christian ceremonies (see CONTENT.md); match that spread with
// real photos of each tradition as they arrive. Nothing else needs changing
// when one is swapped, since every image goes through next/image.

import type { StaticImageData } from "next/image";
import eventPlanningPhoto from "@/assets/services/event-planning.jpg";
import entertainmentPhoto from "@/assets/services/entertainment.jpg";
import venueSelectionPhoto from "@/assets/services/venue-selection.jpg";
import photographyVideographyPhoto from "@/assets/services/photography-videography.jpg";
import decorationDesignPhoto from "@/assets/services/decoration-design.jpg";
import silkJasminePhoto from "@/assets/gallery/silk-jasmine-hindu-wedding.jpg";
import templeTownPhoto from "@/assets/gallery/temple-town-muhurtham.jpg";
import nikahReceptionPhoto from "@/assets/gallery/nikah-reception.jpg";
import leadershipSummitPhoto from "@/assets/gallery/leadership-summit.jpg";
import anandKarajPhoto from "@/assets/gallery/anand-karaj-sangeet-night.jpg";
import productLaunchPhoto from "@/assets/gallery/product-launch-gala.jpg";
import namingCeremonyPhoto from "@/assets/gallery/naming-ceremony.jpg";
import nischayatharthamPhoto from "@/assets/gallery/nischayathartham-engagement.jpg";
import balaajiPhoto from "@/assets/team/balaaji.jpg";
import dhanasekarPhoto from "@/assets/team/dhanasekar.jpg";
import sairamPhoto from "@/assets/team/sairam.jpg";
import revathiPhoto from "@/assets/team/revathi.jpg";

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
  image: string | StaticImageData;
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
    image: eventPlanningPhoto,
    imageAlt:
      "Event planner directing on-site setup, pointing toward a rose-covered ceremony arch while her team arranges chairs and dresses the arch behind her",
  },
  {
    slug: "venue-selection",
    title: "Venue Selection",
    shortDescription: "Perfect place for your occasion",
    longDescription:
      "Assistance with researching, shortlisting, visiting, comparing, and finalizing the right venue for the celebration.",
    image: venueSelectionPhoto,
    imageAlt:
      "Beachfront ceremony aisle scattered with petals between rows of clear chiavari chairs, leading to twin floral columns framed by palm trees and the ocean",
  },
  {
    slug: "decoration-design",
    title: "Decoration & Design",
    shortDescription: "Custom themes & styling",
    longDescription:
      "Personalized event concepts, décor themes, floral styling, stage design, table styling, lighting, and visual presentation.",
    image: decorationDesignPhoto,
    imageAlt:
      "Floral mandap draped in deep red and ivory roses with fairy-lit curtains, flanked by trimmed topiaries and gold lanterns leading up marble steps to a heritage palace facade",
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    shortDescription: "Capture every moment",
    longDescription:
      "Coordination of professional photography, traditional videography, candid coverage, cinematic films, and event memories.",
    image: photographyVideographyPhoto,
    imageAlt:
      "Overhead crane cameras and a full videography crew filming a wedding ceremony beneath a floral canopy, with live monitor feeds on either side of the courtyard",
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
    image: entertainmentPhoto,
    imageAlt: "DJ mixing on a professional deck at an outdoor evening event",
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
  image: string | StaticImageData;
  imageAlt: string;
  description: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "silk-and-jasmine-hindu-wedding",
    title: "Silk & Jasmine Hindu Wedding",
    category: "weddings",
    location: "Chennai, Tamil Nadu",
    image: silkJasminePhoto,
    imageAlt:
      "Bride and groom in silk and jasmine seated before the sacred fire, beneath a mandap of jasmine strands, banana leaves and brass lamps",
    description:
      "A traditional Hindu ceremony styled with jasmine garlands, banana-leaf motifs, and a gold-accented mandap.",
  },
  {
    slug: "temple-town-muhurtham",
    title: "Temple Town Muhurtham",
    category: "traditional",
    location: "Madurai, Tamil Nadu",
    image: templeTownPhoto,
    imageAlt:
      "Muhurtham under a garlanded pandal beside the temple gopurams, nadaswaram and thavil players seated alongside the couple and a large kolam drawn across the floor",
    description:
      "A muhurtham ceremony honoring family tradition, with kolam-lined pathways and live nadaswaram music.",
  },
  {
    slug: "nikah-reception",
    title: "Nikah",
    category: "receptions",
    location: "Bengaluru, Karnataka",
    image: nikahReceptionPhoto,
    imageAlt:
      "Bride and groom greeting family at a nikah, before swagged gold drapery and lantern light, with a banana-leaf feast laid out in brass across the foreground",
    description:
      "A joyful nikah styled with antique-gold drapery, candlelight, and a curated regional menu.",
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
    image: leadershipSummitPhoto,
    imageAlt:
      "Panel session under way on a lit stage before a full delegate hall, with a wide LED backdrop, camera position and vision-mixing desk in shot",
    description:
      "A 300-guest leadership summit with custom stage design, AV production, and delegate hospitality.",
  },
  {
    slug: "anand-karaj-sangeet-night",
    title: "Sangeet Night",
    category: "receptions",
    location: "Coimbatore, Tamil Nadu",
    image: anandKarajPhoto,
    imageAlt:
      "Seated bride and groom at the Anand Karaj in the foreground, floral drapes overhead, with the live sangeet band and a dancing crowd lit in pink and gold on the stage behind",
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
    image: productLaunchPhoto,
    imageAlt:
      "Presenter unveiling a product on a lit podium before an immersive blue LED backdrop, with the seated audience and a live broadcast desk of monitors in the foreground",
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
  {
    slug: "namakaran-naming-ceremony",
    title: "Naming Ceremony",
    category: "traditional",
    location: "Coimbatore, Tamil Nadu",
    image: namingCeremonyPhoto,
    imageAlt:
      "Newborn in a jasmine-garlanded wooden cradle, surrounded by three generations of family kneeling around it with brass lamps and a tray of turmeric and kumkum in the foreground",
    description:
      "An intimate naming ceremony centered on a jasmine-garlanded cradle, styled for close family and a lifetime of memories.",
  },
  {
    slug: "nischayathartham-engagement",
    title: "Nischayathartham Engagement",
    category: "traditional",
    location: "Chennai, Tamil Nadu",
    image: nischayatharthamPhoto,
    imageAlt:
      "Couple exchanging rings before gathered family, gold-bordered silk drapery behind them and silver ceremonial plates of fruit, kumkum and flowers laid out on the table in front",
    description:
      "A nischayathartham engagement styled with ornate silver plates, gold-bordered silk drapery, and a warm, celebratory glow.",
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
  image: string | StaticImageData;
};

// The real team roster, replacing the earlier placeholder names/stock
// photos. TeamStack.tsx (the desktop fan) always spotlights whichever
// member is first in this list — Balaaji stays first.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Balaaji",
    role: "Creative Lead",
    bio: "Balaaji is a Creative Lead at BNR Events, known for transforming ideas into immersive, memorable experiences.",
    image: balaajiPhoto,
  },
  {
    name: "Dhanasekar",
    role: "Event Curator",
    bio: "Dhanasekar turns timelines and vendor logistics into invisible infrastructure, so every event runs without a single visible seam.",
    image: dhanasekarPhoto,
  },
  {
    name: "Sairam",
    role: "Venue Scout",
    bio: "Sairam handles venue sourcing, negotiations, and relationship management to secure the best spaces for every event.",
    image: sairamPhoto,
  },
  {
    name: "Revathi",
    role: "Celebration Coordinator",
    bio: "Revathi manages on-ground hospitality, guest experience, and client service to deliver smooth, memorable interactions.",
    image: revathiPhoto,
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
