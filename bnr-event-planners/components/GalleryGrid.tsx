"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { galleryImages, GalleryImage } from "@/lib/content";

const categories = ["All", "Weddings", "Engagements", "Cultural", "Corporate", "Birthdays"] as const;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === filter),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-maroon text-cream"
                : "bg-white text-charcoal/70 hover:bg-maroon/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
      >
        <AnimatePresence>
          {filtered.map((img) => (
            <motion.button
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setLightboxImage(img)}
              className="group relative block w-full overflow-hidden rounded-xl break-inside-avoid"
            >
              <Image
                src={img.src}
                alt={img.caption}
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-body text-sm font-medium text-cream">{img.caption}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-6"
          >
            <button
              aria-label="Close lightbox"
              onClick={() => setLightboxImage(null)}
              className="absolute right-6 top-6 text-3xl text-cream/80 transition-colors hover:text-gold"
            >
              <FiX />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl"
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                width={1200}
                height={1500}
                className="max-h-[75vh] w-full rounded-xl object-contain"
              />
              <p className="mt-4 text-center font-body text-cream/80">
                {lightboxImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
