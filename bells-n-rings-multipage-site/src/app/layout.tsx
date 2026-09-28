import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Parisienne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/ui/CursorFollower";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import SmoothScroll from "@/components/shared/SmoothScroll";
import PageTransition from "@/components/shared/PageTransition";
import { SITE_NAME_FULL, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

// Metadata fields like `manifest` are plain strings, not routed through
// Next's own asset pipeline the way <Image> or the icon file conventions
// are — on GitHub Pages (basePath "/Sanjay") an unprefixed "/site.webmanifest"
// resolves to the wrong origin-root path and 404s, unlike every other
// asset reference on the page. See Hero.tsx for the same env var used for
// the same reason.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
  // Every one of Next's file-convention icons (favicon.ico, icon.png,
  // apple-icon.png in app/) either drops its <link> tag entirely once
  // basePath is set (favicon.ico) or gets served at an unpredictable
  // build-hashed URL that can't be referenced here (icon.png, apple-icon.png)
  // — so icon.png/apple-icon.png live in public/ as plain, stable files and
  // every icon is declared explicitly here instead, all with the basePath
  // that plain metadata strings don't get automatically.
  icons: {
    icon: `${BASE_PATH}/icon.png`,
    shortcut: `${BASE_PATH}/favicon.ico`,
    apple: `${BASE_PATH}/apple-icon.png`,
  },
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
        {/* HubSpot tracking code — loads on every page. The contact/enquiry
            form (InvitationContactForm.tsx) pushes each submission into
            HubSpot via this script's _hsq queue once it's loaded. */}
        <Script
          id="hs-script-loader"
          src="https://js-na2.hs-scripts.com/245625867.js"
          strategy="afterInteractive"
        />
        <SmoothScroll />
        <CursorFollower />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
