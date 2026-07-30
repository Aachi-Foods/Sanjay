"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Wraps route content only — mounted inside <main>, alongside (not around)
// the persistent Navbar/Footer in the root layout, so the header never
// animates out/in on a route change.
//
// `initial={false}` on AnimatePresence means the very first page load
// never plays an enter animation — only a later client-side navigation
// (via next/link) swaps `pathname`, unmounting the outgoing page and
// mounting the incoming one. That also means this has no hydration-
// mismatch exposure the way some of the scroll-linked components
// elsewhere did: the first paint is identical either way, animated or not.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0.01 : 0.4,
            delay: reduceMotion ? 0 : 0.05,
            ease: EASE_OUT,
          },
        }}
        exit={{
          opacity: 0,
          y: -16,
          transition: { duration: reduceMotion ? 0.01 : 0.3, ease: EASE_OUT },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
