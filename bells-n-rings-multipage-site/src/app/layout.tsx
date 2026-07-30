import type { Metadata } from "next";
import { Playfair_Display, Parisienne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/ui/CursorFollower";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { SITE_NAME_FULL, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME_FULL} | South India's Premier Event Planners`,
    template: `%s | ${SITE_NAME_FULL}`,
  },
  description: SITE_TAGLINE,
  openGraph: {
    type: "website",
    title: `${SITE_NAME_FULL} | South India's Premier Event Planners`,
    description: SITE_TAGLINE,
    siteName: SITE_NAME_FULL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME_FULL} | South India's Premier Event Planners`,
    description: SITE_TAGLINE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${parisienne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll />
        <CursorFollower />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
