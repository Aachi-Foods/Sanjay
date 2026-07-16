import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#traditional-weddings", label: "Traditional Weddings" },
  { href: "/services#engagement-ceremonies", label: "Engagement Ceremonies" },
  { href: "/services#naming-ceremonies", label: "Naming Ceremonies" },
  { href: "/services#corporate-events", label: "Corporate Events" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <Link href="/" className="font-display text-2xl font-bold text-cream">
            BNR <span className="text-gold">Event Planners</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Crafting unforgettable South Indian weddings, ceremonies, and celebrations
            across Chennai and beyond for over a decade.
          </p>
          <div className="mt-6 flex gap-4 text-lg">
            <a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-gold">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="transition-colors hover:text-gold">
              <FaFacebookF />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" className="transition-colors hover:text-gold">
              <FaPinterestP />
            </a>
            <a href="https://wa.me/919876543210" aria-label="WhatsApp" className="transition-colors hover:text-gold">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Reach Us</h3>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>No. 24, Kutchery Road, Mylapore, Chennai, Tamil Nadu 600004</p>
            <p>
              <a href="tel:+919876543210" className="transition-colors hover:text-gold">
                +91 98765 43210
              </a>
            </p>
            <p>
              <a href="mailto:hello@bnreventplanners.com" className="transition-colors hover:text-gold">
                hello@bnreventplanners.com
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        &copy; {new Date().getFullYear()} BNR Event Planners. All rights reserved.
      </div>
    </footer>
  );
}
