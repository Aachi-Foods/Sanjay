"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaBaby, FaBirthdayCake, FaBuilding, FaGopuram, FaMusic, FaRing } from "react-icons/fa";
import { staggerItem } from "./AnimatedSection";
import { Service } from "@/lib/content";

const iconMap: Record<string, IconType> = {
  FaGopuram,
  FaRing,
  FaBaby,
  FaBuilding,
  FaBirthdayCake,
  FaMusic,
};

interface ServiceCardProps {
  service: Service;
  detailed?: boolean;
}

export default function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? FaRing;

  return (
    <motion.div
      id={service.slug}
      variants={staggerItem}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-charcoal/5"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-xl text-charcoal shadow-md">
          <Icon />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-charcoal">{service.title}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
          {detailed ? service.longDescription : service.description}
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-maroon transition-colors hover:text-gold"
        >
          Enquire Now <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}
