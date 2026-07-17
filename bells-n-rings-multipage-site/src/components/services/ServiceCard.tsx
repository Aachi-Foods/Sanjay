"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Service } from "@/lib/content";
import { SERVICE_ICONS } from "./serviceIcons";
import Reveal from "../shared/Reveal";

export default function ServiceCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = SERVICE_ICONS[service.slug];

  return (
    <Reveal delay={delay} className="h-full">
      <div
        id={service.slug}
        className="flex h-full scroll-mt-24 flex-col items-center rounded-2xl border border-gold-soft/40 bg-ivory p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft/60 bg-blush-soft/60 text-rose-text">
          <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl text-charcoal">{service.title}</h3>
        <p className="mt-2 font-sans text-sm text-charcoal-soft">
          {service.shortDescription}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-1 font-sans text-xs tracking-[0.2em] text-rose-text uppercase transition-colors hover:text-charcoal cursor-pointer"
        >
          {open ? "Show Less" : "Learn More"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              <p className="mt-4 border-t border-gold-soft/30 pt-4 font-sans text-sm text-charcoal-soft">
                {service.longDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
