"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Service } from "@/lib/content";
import Reveal from "../shared/Reveal";

export default function ServiceCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay} className="h-full">
      <div
        id={service.slug}
        className="flex h-full scroll-mt-24 flex-col items-center overflow-hidden rounded-2xl border border-gold-soft/40 bg-ivory text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col items-center px-8 pb-8 pt-6">
          <h3 className="font-display text-xl text-charcoal">{service.title}</h3>
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
      </div>
    </Reveal>
  );
}
