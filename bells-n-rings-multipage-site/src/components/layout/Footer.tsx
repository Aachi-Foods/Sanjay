"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer, VIEWPORT_REVEAL } from "@/lib/motionVariants";
import {
  CONTACT,
  NAV_LINKS,
  SITE_NAME_FULL,
  SITE_NAME_PRIMARY,
  SITE_NAME_SECONDARY,
  SITE_TAGLINE,
} from "@/lib/constants";
import GoldDivider from "../ui/GoldDivider";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";
import bnrLogo from "@/assets/bnr-logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-gold-soft/40 bg-ivory-deep">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        {/* The one place on the page meant to feel settled rather than
            eventful: the columns fade up together with a small stagger,
            once, and nothing below this — the divider and copyright line —
            animates at all. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
          variants={staggerContainer(0.1, 0, !!reduceMotion)}
          className="grid gap-10 md:grid-cols-4"
        >
          <motion.div
            variants={fadeUp(16, 0.6, !!reduceMotion)}
            className="flex flex-col gap-3 md:col-span-2"
          >
            <Link href="/" className="relative block h-24 w-auto">
              <Image
                src={bnrLogo}
                alt={SITE_NAME_FULL}
                className="h-24 w-auto object-contain object-left"
              />
            </Link>
            <p className="prose-measure font-sans text-sm italic text-charcoal-soft">
              {SITE_TAGLINE}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="BNR on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="BNR on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="BNR on YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp(16, 0.6, !!reduceMotion)} className="flex flex-col gap-3">
            <h3 className="font-display text-lg text-charcoal">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-charcoal-soft transition-colors hover:text-rose-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp(16, 0.6, !!reduceMotion)} className="flex flex-col gap-3">
            <h3 className="font-display text-lg text-charcoal">Get in Touch</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-charcoal-soft">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-text" strokeWidth={1.5} aria-hidden="true" />
                <a href={CONTACT.phoneHref} className="hover:text-rose-text">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rose-text" strokeWidth={1.5} aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-rose-text">
                  {CONTACT.email}
                  {CONTACT.emailIsPlaceholder && (
                    <span className="ml-1 text-xs text-charcoal-soft/70">(placeholder)</span>
                  )}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-text" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {CONTACT.address}
                  {CONTACT.addressIsPlaceholder && (
                    <span className="ml-1 text-xs text-charcoal-soft/70">(placeholder)</span>
                  )}
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-10">
          <GoldDivider />
        </div>

        <p className="mt-6 text-center font-sans text-xs text-charcoal-soft">
          &copy; {year} {SITE_NAME_PRIMARY} {SITE_NAME_SECONDARY}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
