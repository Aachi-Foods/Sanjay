"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { HEADER_NAV_LINKS, SITE_NAME_FULL } from "@/lib/constants";
import bnrLogo from "@/assets/bnr-logo.png";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-charcoal/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-[82vw] max-w-sm flex-col gap-8 bg-ivory px-8 py-10 shadow-xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <Image
                src={bnrLogo}
                alt={SITE_NAME_FULL}
                className="h-14 w-auto object-contain"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-blush-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold-deep"
              >
                <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {HEADER_NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 font-display text-2xl transition-colors ${
                      active
                        ? "text-rose-text"
                        : "text-charcoal hover:text-rose-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
