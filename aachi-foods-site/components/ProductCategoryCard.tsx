"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { staggerItem } from "./AnimatedSection";
import { ProductCategory } from "@/lib/content";

export default function ProductCategoryCard({ category }: { category: ProductCategory }) {
  return (
    <motion.div
      id={category.slug}
      variants={staggerItem}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-charcoal/5"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-charcoal">{category.name}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
          {category.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {category.products.slice(0, 4).map((p) => (
            <li
              key={p}
              className="rounded-full bg-turmeric/15 px-3 py-1 font-body text-xs font-medium text-chili"
            >
              {p}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-chili transition-colors hover:text-turmeric"
        >
          Enquire Now <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}
