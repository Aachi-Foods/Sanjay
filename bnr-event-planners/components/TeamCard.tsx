"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerItem } from "./AnimatedSection";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-charcoal shadow-lg"
    >
      <div className="relative h-72 w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
        <h3 className="font-display text-lg font-bold">{name}</h3>
        <p className="font-body text-xs uppercase tracking-wider text-gold">{role}</p>
        <p className="mt-2 max-h-0 overflow-hidden font-body text-sm text-cream/80 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
          {bio}
        </p>
      </div>
    </motion.div>
  );
}
