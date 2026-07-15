"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { HEADER_NAV_LINKS, SITE_NAME_FULL } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import bnrLogo from "@/assets/bnr-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Every page except Contact opens with a dark-scrimmed photo banner
  // behind the transparent navbar, so charcoal text would fail contrast
  // there until the bar turns solid. Contact opens on a light blush intro,
  // so it keeps dark text throughout.
  const overDarkHero = pathname !== "/contact" && !solid;

  return (
    // MobileMenu renders as a sibling, not a child, of <header>: backdrop-blur
    // (like transform) creates a new containing block for position:fixed
    // descendants, which would squash the full-height slide-in panel down to
    // the header's own height if it were nested inside.
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
          solid ? "bg-ivory/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Row 1: centered logo, with the mobile menu trigger pinned to the right */}
        <div className="relative flex items-center justify-center px-6 py-3 sm:px-8">
          <Link href="/" className="relative block h-11 w-auto sm:h-14">
            <Image
              src={bnrLogo}
              alt={SITE_NAME_FULL}
              priority
              className="h-11 w-auto object-contain sm:h-14"
            />
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
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-sans text-sm tracking-wide uppercase transition-colors ${
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
              </Link>
            );
          })}
          <Button href="/contact" className="!px-5 !py-2.5 text-xs">
            Enquire
          </Button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
