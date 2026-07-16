import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  title: "BNR Event Planners | South Indian Wedding & Event Planning, Chennai",
  description:
    "BNR Event Planners crafts unforgettable traditional weddings, engagement ceremonies, naming ceremonies, corporate events, and cultural festivals across Chennai and South India.",
  keywords: [
    "South Indian wedding planner",
    "Tamil wedding planner Chennai",
    "event planners Chennai",
    "Naamkaran ceremony planner",
    "corporate event planner South India",
  ],
  openGraph: {
    title: "BNR Event Planners | South Indian Wedding & Event Planning",
    description:
      "Making your moments unforgettable — traditional weddings, ceremonies, and celebrations across South India.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1C1C1C",
              color: "#FDF6EC",
              fontFamily: "var(--font-inter)",
            },
            success: { iconTheme: { primary: "#C9A84C", secondary: "#1C1C1C" } },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
