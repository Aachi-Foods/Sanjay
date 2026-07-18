import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { contactInfo } from "@/lib/content";

const quickLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <Link href="/" className="font-display text-2xl font-bold text-cream">
            Aachi <span className="text-turmeric">Foods</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Bringing authentic South Indian spices, masalas, and ready-to-cook
            traditions to kitchens across India and the world for over 30 years.
          </p>
          <div className="mt-6 flex gap-4 text-lg">
            <a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-turmeric">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="transition-colors hover:text-turmeric">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" className="transition-colors hover:text-turmeric">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-turmeric">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Contact</h3>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{contactInfo.address}</p>
            <p>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-turmeric">
                {contactInfo.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-turmeric">
                {contactInfo.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="font-display text-lg text-cream">Hours</h3>
          <p className="mt-4 text-sm">{contactInfo.hours}</p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        &copy; {new Date().getFullYear()} Aachi Foods. All rights reserved.
      </div>
    </footer>
  );
}
