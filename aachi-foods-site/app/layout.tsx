import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aachi Foods | Authentic South Indian Spices & Masalas",
  description:
    "Aachi Foods brings authentic South Indian spices, masalas, ready-to-cook mixes, and traditional pickles to kitchens across India and the world.",
  keywords: [
    "Aachi Foods",
    "South Indian masala",
    "spice blends Chennai",
    "ready to cook mixes",
    "idli dosa mix",
    "South Indian pickles",
  ],
  openGraph: {
    title: "Aachi Foods | Authentic South Indian Spices & Masalas",
    description:
      "30 years of authentic South Indian flavor — spices, masalas, ready-to-cook mixes, and pickles.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-body">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
