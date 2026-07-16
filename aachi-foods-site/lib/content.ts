// Shared static content for the Aachi Foods site — centralised so copy and
// imagery updates don't require touching every page.

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  products: string[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "masalas-spice-blends",
    name: "Masalas & Spice Blends",
    description:
      "Authentic South Indian spice blends ground fresh — sambar powder, rasam powder, curry powders, and regional specialties.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop",
    products: ["Sambar Powder", "Rasam Powder", "Chicken Curry Masala", "Chettinad Masala", "Garam Masala"],
  },
  {
    slug: "ready-to-cook-mixes",
    name: "Ready-to-Cook Mixes",
    description:
      "Traditional recipes made quick — idli, dosa, and tiffin mixes that bring South Indian breakfasts to any kitchen in minutes.",
    image: "https://images.unsplash.com/photo-1630383249896-90731f0a1146?q=80&w=1200&auto=format&fit=crop",
    products: ["Idli Mix", "Dosa Mix", "Pongal Mix", "Upma Mix", "Bisi Bele Bath Mix"],
  },
  {
    slug: "pickles-condiments",
    name: "Pickles & Condiments",
    description:
      "Small-batch pickles made the traditional way — mango, lime, and mixed vegetable, pressed with cold-pressed oils and sun-dried spices.",
    image: "https://images.unsplash.com/photo-1589135233738-6ed309e5688e?q=80&w=1200&auto=format&fit=crop",
    products: ["Mango Pickle", "Lime Pickle", "Garlic Pickle", "Mixed Vegetable Pickle"],
  },
  {
    slug: "whole-spices",
    name: "Whole Spices & Herbs",
    description:
      "Sourced from trusted growers across South India — cardamom, cloves, pepper, and cinnamon, cleaned and graded for purity.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop",
    products: ["Cardamom", "Cloves", "Black Pepper", "Cinnamon", "Star Anise"],
  },
  {
    slug: "papads-snacks",
    name: "Papads & Snacks",
    description:
      "Crisp, sun-dried papads and traditional savory snacks made with time-tested family recipes.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop",
    products: ["Urad Papad", "Rice Papad", "Masala Papad", "Mixture", "Murukku"],
  },
  {
    slug: "instant-mixes",
    name: "Instant Mixes",
    description:
      "Gravy bases and instant mixes for everyday South Indian cooking — vathakuzhambu, kurma, and more, ready in minutes.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop",
    products: ["Vathakuzhambu Mix", "Kurma Mix", "Biryani Masala", "Chettinad Gravy Mix"],
  },
];

export const stats = [
  { label: "Years of Trust", value: 30, suffix: "+" },
  { label: "Product Varieties", value: 200, suffix: "+" },
  { label: "Retail Outlets", value: 50000, suffix: "+" },
  { label: "Countries Exported To", value: 25, suffix: "+" },
];

export const timeline = [
  { year: "1995", title: "Founded in Chennai", description: "Aachi Foods began with a single spice-grinding unit, serving local Chennai households with fresh masalas." },
  { year: "2002", title: "First Ready-to-Cook Mixes", description: "Launched idli and dosa mixes, bringing traditional South Indian breakfasts to busy kitchens." },
  { year: "2010", title: "Pan-India Distribution", description: "Expanded distribution to over 50,000 retail outlets across India." },
  { year: "2015", title: "Export Markets Opened", description: "Began exporting to the Middle East, Southeast Asia, and beyond." },
  { year: "2026", title: "Today", description: "A trusted household name across South India and 25+ countries, with 200+ products spanning spices, mixes, and pickles." },
];

export const values = [
  {
    title: "Authenticity",
    description: "Every recipe stays true to traditional South Indian cooking — no shortcuts on flavor.",
  },
  {
    title: "Quality Sourcing",
    description: "Spices and grains sourced directly from trusted farmers and growers across South India.",
  },
  {
    title: "Purity",
    description: "No artificial colors or fillers — just clean, honest ingredients in every pack.",
  },
  {
    title: "Accessibility",
    description: "From village kirana stores to global supermarkets, Aachi belongs in every kitchen.",
  },
];

export const contactInfo = {
  address: "Aachi Masala Foods Pvt. Ltd., Poonamallee High Road, Chennai, Tamil Nadu 600056",
  phone: "+91 44 2678 1000",
  email: "ecom.marketing@aachifoods.com",
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
};
