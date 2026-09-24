"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { BNR_EASE } from "@/lib/motion";

// WhatsApp's own brand green rather than the site's gold/forest palette —
// deliberately, unlike every other button on the site. This is a universal
// utility affordance a visitor should recognize instantly from a glance,
// the same way a phone icon reads as "call" regardless of what site it's
// on; matching it to the brand palette would make it slower to recognize,
// not more premium.
const WHATSAPP_GREEN = "#25D366";

// Sits above ordinary page content (nothing else on the site goes past
// z-10) but below the Navbar (z-30) and, in turn, below the mobile menu's
// backdrop/drawer (z-40/z-50) — so it correctly dims and disappears behind
// those rather than floating awkwardly on top of an open mobile menu.
export default function FloatingWhatsAppButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.5,
        delay: reduceMotion ? 0 : 0.5,
        ease: BNR_EASE,
      }}
      whileHover={{ scale: reduceMotion ? 1 : 1.08 }}
      whileTap={{ scale: reduceMotion ? 1 : 0.96 }}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(37,211,102,0.55)] sm:bottom-6 sm:right-6"
      style={{ backgroundColor: WHATSAPP_GREEN }}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </motion.a>
  );
}

// Filled, not outline — unlike the footer's social glyphs (SocialIcons.tsx),
// which sit on a light background and use currentColor stroke to match
// surrounding text. This sits on a solid green circle, so it needs the
// same solid-white-mark treatment every real WhatsApp button uses, or it
// reads as a generic chat icon instead of specifically WhatsApp.
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.36a9.9 9.9 0 0 0 4.83 1.24h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.83 14.19c-.25.7-1.23 1.28-2.02 1.45-.55.11-1.27.2-3.68-.79-3.1-1.28-5.1-4.42-5.25-4.62-.16-.2-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.6.29-.31.62-.39.82-.39.21 0 .41 0 .6.01.19.01.44-.07.69.53.25.6.86 2.08.93 2.23.08.15.13.33.03.54-.1.21-.16.33-.31.5-.15.18-.32.4-.46.54-.16.16-.33.33-.14.65.19.32.83 1.37 1.78 2.22 1.22 1.09 2.25 1.43 2.57 1.59.32.16.51.13.69-.08.19-.21.81-.94 1.02-1.27.21-.32.43-.27.72-.16.29.11 1.85.87 2.17 1.03.32.16.53.24.61.37.08.13.08.75-.17 1.45Z" />
    </svg>
  );
}
