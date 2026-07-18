"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        solid ? "bg-cream/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="font-display text-2xl font-bold tracking-wide">
          <span className={solid ? "text-chili" : "text-cream"}>Aachi</span>{" "}
          <span className={solid ? "text-charcoal" : "text-turmeric"}>Foods</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-sm font-medium uppercase tracking-wider transition-colors hover:text-chili ${
                  pathname === link.href ? "text-chili" : solid ? "text-charcoal" : "text-cream"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-chili px-6 py-2.5 font-body text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-turmeric hover:text-charcoal lg:inline-block"
        >
          Get in Touch
        </Link>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className={`text-2xl lg:hidden ${solid ? "text-charcoal" : "text-cream"}`}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 font-body text-lg font-medium ${
                      pathname === link.href ? "text-chili" : "text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block rounded-full bg-chili px-6 py-3 text-center font-body font-semibold text-cream"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
