// Shared static content for the BNR Event Planners site.
// Centralised here so copy/imagery updates don't require touching every page.

export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // react-icons component name, resolved in ServiceCard
  image: string;
}

export const services: Service[] = [
  {
    slug: "traditional-weddings",
    title: "Traditional Weddings",
    description: "Muhurtham-timed ceremonies with authentic rituals, mandapam decor, and Kanjeevaram-inspired styling.",
    longDescription:
      "From the Nichayathartham to the Saptapadi, we choreograph every ritual around your family's Muhurtham with precision. Our teams source temple-grade flowers, build traditional mandapams, and coordinate purohits, nadaswaram artists, and caterers so your wedding honours tradition without a single detail slipping.",
    icon: "FaGopuram",
    image: "https://images.unsplash.com/photo-1610190875589-6da42e1ff2b6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "engagement-ceremonies",
    title: "Engagement Ceremonies",
    description: "Nichayathartham and Pudava Sirtal celebrations styled with gold and silk elegance.",
    longDescription:
      "We design engagement ceremonies that balance intimacy with grandeur — from the ring exchange stage to the Pudava Sirtal saree presentation — with floral mandapams, traditional music, and photography coordination baked in.",
    icon: "FaRing",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "naming-ceremonies",
    title: "Naming Ceremonies (Naamkaran)",
    description: "Cradle ceremonies and Naamkaran ceremonies rich in ritual detail and family warmth.",
    longDescription:
      "Naamkaran and cradle ceremonies call for tender, ritual-accurate staging. We handle the cradle decor, purohit coordination, return-gift curation, and guest hospitality so grandparents and parents can simply be present for the moment.",
    icon: "FaBaby",
    image: "https://images.unsplash.com/photo-1595151670290-2f0a5651a56c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description: "Product launches, conferences, and milestone celebrations with flawless production values.",
    longDescription:
      "We bring hospitality-industry polish to corporate calendars — AGMs, product launches, dealer meets, and milestone anniversaries — with stage design, AV production, hybrid streaming, and delegate logistics managed end to end.",
    icon: "FaBuilding",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "birthday-celebrations",
    title: "Birthday Celebrations",
    description: "First birthdays, milestone Sashtiaptha Poorthi, and themed parties for every age.",
    longDescription:
      "From a baby's first birthday to a Sashtiaptha Poorthi (60th birthday) celebration steeped in ritual, we curate themes, decor, catering, and entertainment that suit the honoree's age and the occasion's cultural weight.",
    icon: "FaBirthdayCake",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "cultural-festivals",
    title: "Cultural Festivals",
    description: "Bharatanatyam arangetrams, temple festivals, and community cultural programs.",
    longDescription:
      "We produce arangetrams, temple festival programs, and community cultural events — coordinating classical musicians, dancers, stage lighting, and audience hospitality with the reverence these occasions deserve.",
    icon: "FaMusic",
    image: "https://images.unsplash.com/photo-1601926638690-e3e1b3e5f6f8?q=80&w=1600&auto=format&fit=crop",
  },
];

export const stats = [
  { label: "Events Delivered", value: 500, suffix: "+" },
  { label: "Years of Excellence", value: 10, suffix: "+" },
  { label: "Cities Served", value: 20, suffix: "+" },
  { label: "Happy Clients", value: 1000, suffix: "+" },
];

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  event: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lakshmi & Aravind",
    location: "Chennai",
    quote:
      "BNR Event Planners turned our wedding into exactly what my grandmother had dreamed of for me — every ritual honoured, every guest cared for. The mandapam took our breath away.",
    event: "Traditional Wedding",
  },
  {
    name: "Priya Venkataraman",
    location: "Coimbatore",
    quote:
      "Our daughter's Naamkaran was handled with so much warmth and precision. The team understood the rituals better than some of our own relatives!",
    event: "Naming Ceremony",
  },
  {
    name: "Suresh Kumar",
    location: "Madurai",
    quote:
      "Corporate anniversary for 400 guests, flawless stage production, and not a single delay. BNR runs events like a temple runs a festival — with discipline.",
    event: "Corporate Milestone",
  },
  {
    name: "Divya & Karthik",
    location: "Bengaluru",
    quote:
      "From the Nichayathartham to the reception, BNR coordinated three cities' worth of family logistics without us lifting a finger.",
    event: "Engagement & Wedding",
  },
];

export interface GalleryImage {
  id: string;
  src: string;
  category: "Weddings" | "Engagements" | "Cultural" | "Corporate" | "Birthdays";
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1610190875589-6da42e1ff2b6?q=80&w=1200&auto=format&fit=crop", category: "Weddings", caption: "Traditional mandapam, Chennai" },
  { id: "g2", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop", category: "Engagements", caption: "Pudava Sirtal ceremony" },
  { id: "g3", src: "https://images.unsplash.com/photo-1601926638690-e3e1b3e5f6f8?q=80&w=1200&auto=format&fit=crop", category: "Cultural", caption: "Bharatanatyam arangetram" },
  { id: "g4", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop", category: "Corporate", caption: "Product launch stage design" },
  { id: "g5", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop", category: "Birthdays", caption: "First birthday decor" },
  { id: "g6", src: "https://images.unsplash.com/photo-1595151670290-2f0a5651a56c?q=80&w=1200&auto=format&fit=crop", category: "Weddings", caption: "Naamkaran cradle ceremony" },
  { id: "g7", src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop", category: "Weddings", caption: "Kanjeevaram bridal styling" },
  { id: "g8", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop", category: "Cultural", caption: "Classical dance performance" },
  { id: "g9", src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop", category: "Corporate", caption: "Conference hospitality" },
  { id: "g10", src: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=1200&auto=format&fit=crop", category: "Engagements", caption: "Floral mandapam styling" },
  { id: "g11", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop", category: "Birthdays", caption: "Sashtiaptha Poorthi celebration" },
  { id: "g12", src: "https://images.unsplash.com/photo-1583912267550-d44c9c47a2c9?q=80&w=1200&auto=format&fit=crop", category: "Weddings", caption: "Temple wedding rituals" },
];

export const eventTypes = [
  "Traditional Wedding",
  "Engagement Ceremony",
  "Naming Ceremony (Naamkaran)",
  "Corporate Event",
  "Birthday Celebration",
  "Cultural Festival",
  "Other",
];

export const teamMembers = [
  {
    name: "Bhuvana Narayanan",
    role: "Founder & Creative Director",
    bio: "20 years designing South Indian weddings, blending temple-town tradition with modern staging.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ramesh Iyer",
    role: "Head of Operations",
    bio: "Runs logistics across 20+ cities — vendor coordination, permits, and day-of execution.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Nandini Krishnan",
    role: "Lead Decor Designer",
    bio: "Specialises in floral mandapams, temple-inspired stage design, and traditional colour palettes.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Arjun Subramaniam",
    role: "Client Relations Lead",
    bio: "The first and last voice families hear — from the initial consult to the closing thank-you call.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
];

export const timeline = [
  { year: "2014", title: "Founded in Chennai", description: "BNR Event Planners began as a two-person team styling weddings for family and friends across Chennai." },
  { year: "2017", title: "Expanded Statewide", description: "Grew to serve Coimbatore, Madurai, and Trichy, building a trusted vendor network across Tamil Nadu." },
  { year: "2019", title: "Corporate Division Launched", description: "Added a dedicated corporate events team to serve product launches and business milestones." },
  { year: "2022", title: "20+ Cities Milestone", description: "Crossed 500 events delivered across South India, from Bengaluru to Vizag." },
  { year: "2026", title: "Today", description: "A full-service team of planners, decorators, and cultural consultants trusted by 1000+ families and businesses." },
];
