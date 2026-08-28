"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { HEADER_NAV_LINKS, SITE_NAME_FULL } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import bnrLogo from "@/assets/bnr-logo.png";
import bnrLogoDark from "@/assets/bnr-logo-dark-bg.png";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Condenses once the hero has scrolled past enough to no longer need a
    // transparent bar over it, not at the first few px of scroll.
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change. Adjusted during render (React's
  // recommended pattern for resetting state from a prop change) rather than
  // in an effect, so it doesn't cost an extra render + effect round trip.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const solid = scrolled || menuOpen;

  // Every page except Contact and Enquire opens with a dark-scrimmed photo
  // banner behind the transparent navbar, so charcoal text would fail
  // contrast there until the bar turns solid. Contact opens on a light
  // blush intro, and Enquire opens on the light ivory invitation cover, so
  // both keep dark text throughout.
  const LIGHT_INTRO_PATHS = ["/contact", "/enquire"];
  const overDarkHero = !LIGHT_INTRO_PATHS.includes(pathname) && !solid;

  return (
    // MobileMenu renders as a sibling, not a child, of <header>: backdrop-blur
    // (like transform) creates a new containing block for position:fixed
    // descendants, which would squash the full-height slide-in panel down to
    // the header's own height if it were nested inside.
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
          solid ? "bg-ivory/95 shadow-gold-sm backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Row 1: centered logo, with the mobile menu trigger pinned to the right */}
        <div className="relative flex items-center justify-center px-6 py-3 sm:px-8">
          <Link href="/" className="relative block h-20 w-auto origin-center sm:h-24">
            <motion.span
              className="block h-full w-full"
              animate={{ scale: solid ? 0.88 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
            >
              <Image
                src={overDarkHero ? bnrLogoDark : bnrLogo}
                alt={SITE_NAME_FULL}
                priority
                className="h-20 w-auto object-contain sm:h-24"
              />
            </motion.span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className={`absolute right-6 flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold-deep sm:right-8 md:hidden ${
              overDarkHero ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-blush-soft"
            }`}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Row 2: nav menu, centered below the logo (desktop only) */}
        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-8 pb-3 md:flex"
        >
          {HEADER_NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            // Understated by default: the underline only shows under the
            // active page. Hovering any link slides it there instead —
            // it snaps back to the active link on mouse-leave, never just
            // vanishing mid-hover.
            const highlighted = hovered ? hovered === link.href : active;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
                className={`relative pb-1 font-sans text-sm tracking-wide uppercase transition-colors ${
                  overDarkHero
                    ? active
                      ? "text-blush"
                      : "text-ivory hover:text-blush"
                    : active
                      ? "text-rose-text"
                      : "text-charcoal hover:text-rose-text"
                }`}
              >
                {link.label}
                {highlighted && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute inset-x-0 -bottom-0.5 h-px ${
                      overDarkHero ? "bg-blush" : "bg-rose-text"
                    }`}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
                  />
                )}
              </Link>
            );
          })}
          <Button href="/enquire" className="!px-5 !py-2.5 text-xs">
            Enquire
          </Button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
