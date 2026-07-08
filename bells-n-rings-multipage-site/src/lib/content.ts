// All copy, service/portfolio/testimonial data, and placeholder imagery
// lives here so it's a single place to edit when real content arrives.
//
// IMAGE NOTE: every photo below is a royalty-free placeholder hotlinked from
// Unsplash (free for commercial use, no attribution required). Swap the
// `src` values for real event photography whenever it's ready — nothing
// else needs to change since every image goes through next/image.

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export type EventTypeSlug =
  | "weddings"
  | "corporate"
  | "birthdays"
  | "destination";

export type Service = {
  slug: EventTypeSlug;
  title: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "weddings",
    title: "Weddings",
    shortDescription:
      "From intimate ceremonies to grand celebrations, crafted around your love story.",
    longDescription:
      "Every wedding we design starts with your story, not a template. From the first mood board to the last dance, our team handles venue styling, vendor curation, timelines, and on-the-day coordination — so you experience your wedding as a guest of honor, not a project manager.",
    highlights: [
      "Full-service planning & day-of coordination",
      "Venue scouting, décor & floral direction",
      "Vendor curation (catering, photography, entertainment)",
      "Guest experience & hospitality management",
    ],
    image: unsplash("photo-1519741497674-611481863552"),
    imageAlt: "Placeholder — elegant wedding rings resting on soft blush fabric",
  },
  {
    slug: "corporate",
    title: "Corporate Events",
    shortDescription:
      "Polished conferences, product launches, and galas that reflect your brand.",
    longDescription:
      "We bring the same editorial eye to corporate events as we do to weddings — refined staging, seamless logistics, and moments designed to leave an impression on clients, employees, and press alike.",
    highlights: [
      "Conferences, launches & brand activations",
      "Stage design, AV production & run-of-show",
      "Guest management & hospitality",
      "Post-event reporting & vendor reconciliation",
    ],
    image: unsplash("photo-1519671482749-fd09be7ccebf"),
    imageAlt: "Placeholder — elegant conference stage with soft ambient lighting",
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    shortDescription:
      "Milestone birthdays and intimate celebrations, styled with the same care as a wedding.",
    longDescription:
      "Whether it's a first birthday or a milestone 50th, we design birthday celebrations with thoughtful theming, styling, and hospitality — so hosting never feels like work.",
    highlights: [
      "Theme design & full venue styling",
      "Cake, catering & entertainment curation",
      "Custom invitations & guest favors",
      "On-site coordination from setup to send-off",
    ],
    image: unsplash("photo-1527529482837-4698179dc6ce"),
    imageAlt: "Placeholder — soft blush birthday celebration table styling",
  },
  {
    slug: "destination",
    title: "Destination Events",
    shortDescription:
      "Beach weddings, hill-station getaways, and destination celebrations, fully managed.",
    longDescription:
      "Destination events come with their own logistics — travel, permits, local vendors, weather contingencies. We manage every detail remotely and on the ground, so you and your guests simply arrive and celebrate.",
    highlights: [
      "Venue sourcing across destination locations",
      "Guest travel & accommodation coordination",
      "Local vendor & permit management",
      "On-ground team for multi-day celebrations",
    ],
    image: unsplash("photo-1519225421980-715cb0215aed"),
    imageAlt: "Placeholder — destination beach wedding setup at golden hour",
  },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  category: EventTypeSlug;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "ivory-garden-wedding",
    title: "Ivory Garden Wedding",
    category: "weddings",
    location: "Alibaug, Maharashtra",
    image: unsplash("photo-1465495976277-4387d4b0b4c6"),
    imageAlt: "Placeholder — outdoor garden wedding ceremony under floral arch",
    description:
      "A blush-and-ivory garden ceremony with a floral arch, string lighting, and an intimate 80-guest reception.",
  },
  {
    slug: "royal-mandap-celebration",
    title: "Royal Mandap Celebration",
    category: "weddings",
    location: "Udaipur, Rajasthan",
    image: unsplash("photo-1583939003579-730e3918a45a"),
    imageAlt: "Placeholder — ornate traditional mandap decorated with flowers",
    description:
      "A traditional mandap ceremony styled with rose gold accents, marigold, and layered drapery.",
  },
  {
    slug: "rosegold-reception",
    title: "Rose Gold Reception",
    category: "weddings",
    location: "Mumbai, Maharashtra",
    image: unsplash("photo-1509927083803-4bd519298ac4"),
    imageAlt: "Placeholder — reception hall styled in rose gold and blush tones",
    description:
      "An evening reception with metallic gold accents, candlelight, and a curated tasting menu.",
  },
  {
    slug: "summit-product-launch",
    title: "Summit Product Launch",
    category: "corporate",
    location: "Bengaluru, Karnataka",
    image: unsplash("photo-1606800052052-a08af7148866"),
    imageAlt: "Placeholder — corporate product launch stage with brand lighting",
    description:
      "A 400-guest product launch with custom stage design, live demo zones, and press hospitality.",
  },
  {
    slug: "leadership-gala",
    title: "Leadership Gala",
    category: "corporate",
    location: "Delhi NCR",
    image: unsplash("photo-1511578314322-379afb476865"),
    imageAlt: "Placeholder — formal corporate gala dinner setting",
    description:
      "An elegant black-tie gala honoring company leadership, styled with soft gold and ivory tones.",
  },
  {
    slug: "golden-hour-sweet-sixteen",
    title: "Golden Hour Sweet Sixteen",
    category: "birthdays",
    location: "Goa",
    image: unsplash("photo-1530103862676-de8c9debad1d"),
    imageAlt: "Placeholder — outdoor birthday party styling at golden hour",
    description:
      "A dreamy golden-hour celebration with a blush balloon installation and custom dessert table.",
  },
  {
    slug: "vintage-fiftieth",
    title: "Vintage Fiftieth",
    category: "birthdays",
    location: "Pune, Maharashtra",
    image: unsplash("photo-1464366400600-7168b8af9bc3"),
    imageAlt: "Placeholder — elegant milestone birthday table setting",
    description:
      "A milestone 50th birthday styled with vintage florals, gold candelabras, and live music.",
  },
  {
    slug: "andaman-beach-vows",
    title: "Andaman Beach Vows",
    category: "destination",
    location: "Havelock Island, Andaman",
    image: unsplash("photo-1519167758481-83f550bb49b3"),
    imageAlt: "Placeholder — beachfront wedding ceremony at sunset",
    description:
      "A barefoot beach ceremony at sunset, followed by a three-day guest celebration on the island.",
  },
  {
    slug: "hillside-destination-wedding",
    title: "Hillside Destination Wedding",
    category: "destination",
    location: "Munnar, Kerala",
    image: unsplash("photo-1522673607200-164d1b6ce486"),
    imageAlt: "Placeholder — hillside destination wedding venue among tea gardens",
    description:
      "A misty hillside celebration among tea gardens, with a multi-day itinerary for out-of-town guests.",
  },
];

export const PORTFOLIO_FILTERS: { label: string; value: EventTypeSlug | "all" }[] =
  [
    { label: "All", value: "all" },
    { label: "Weddings", value: "weddings" },
    { label: "Corporate", value: "corporate" },
    { label: "Birthdays", value: "birthdays" },
    { label: "Destination", value: "destination" },
  ];

export type Testimonial = {
  name: string;
  eventType: string;
  location: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ananya & Rohit",
    eventType: "Wedding",
    location: "Alibaug",
    quote:
      "Bells n Rings turned our garden wedding into something out of a dream. Every detail, down to the napkin ties, felt considered. We simply got to be present.",
  },
  {
    name: "Priya Sharma",
    eventType: "Milestone Birthday",
    location: "Pune",
    quote:
      "My 50th felt like a five-star affair. The team managed everything so quietly and confidently that I never once felt like a host — only a guest at my own party.",
  },
  {
    name: "Karan Mehta, VP Marketing",
    eventType: "Corporate Launch",
    location: "Bengaluru",
    quote:
      "Our product launch needed to feel premium without feeling corporate-cold. Bells n Rings nailed that balance — polished, warm, and flawlessly executed.",
  },
  {
    name: "Meera & Arjun",
    eventType: "Destination Wedding",
    location: "Havelock Island",
    quote:
      "Planning a beach wedding remotely felt impossible until we found this team. They handled every vendor, permit, and guest detail so we could just show up and say 'I do'.",
  },
  {
    name: "Divya Kapoor",
    eventType: "Traditional Wedding",
    location: "Udaipur",
    quote:
      "The mandap styling alone had our families in tears. Bells n Rings understood exactly how to honor tradition while keeping everything feeling fresh and romantic.",
  },
];

// Hero slideshow — a mixed set spanning the four core service lines.
export const HERO_SLIDES = [
  {
    image: unsplash("photo-1519225421980-715cb0215aed", 1920),
    alt: "Placeholder — golden hour destination wedding celebration",
  },
  {
    image: unsplash("photo-1465495976277-4387d4b0b4c6", 1920),
    alt: "Placeholder — outdoor garden wedding ceremony under a floral arch",
  },
  {
    image: unsplash("photo-1583939003579-730e3918a45a", 1920),
    alt: "Placeholder — ornate traditional mandap decorated with flowers",
  },
  {
    image: unsplash("photo-1509927083803-4bd519298ac4", 1920),
    alt: "Placeholder — reception hall styled in rose gold and blush tones",
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
    name: "Priya Rao",
    role: "Founder & Creative Director",
    bio: "Priya founded Bells n Rings after a decade in luxury hospitality, bringing an editorial eye to every celebration she designs.",
    image: unsplash("photo-1544005313-94ddf0286df2", 800),
  },
  {
    name: "Ananya Verma",
    role: "Lead Event Planner",
    bio: "Ananya turns timelines and vendor logistics into invisible infrastructure, so every event runs without a single visible seam.",
    image: unsplash("photo-1580489944761-15a19d654956", 800),
  },
  {
    name: "Rohan Mehta",
    role: "Operations Director",
    bio: "Rohan leads on-ground execution — from destination logistics to day-of coordination — keeping every moving part on schedule.",
    image: unsplash("photo-1568602471122-7832951cc4c5", 800),
  },
  {
    name: "Kavya Nair",
    role: "Design & Styling Lead",
    bio: "Kavya shapes the visual language of every celebration, from floral direction to tablescapes and lighting design.",
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
