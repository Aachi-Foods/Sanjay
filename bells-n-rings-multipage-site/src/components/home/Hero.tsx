"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import AmbientMotes from "../shared/AmbientMotes";
import {
  HERO_POSTER,
  HERO_POSTER_ALT,
  HERO_VIDEO,
} from "@/lib/constants";

// A path into public/ needs the basePath prepending by hand — next/image and
// next/link get it applied for them, a raw <video src> does not.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videoSrc = HERO_VIDEO.startsWith("http")
  ? HERO_VIDEO
  : `${BASE_PATH}${HERO_VIDEO}`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the story is scrolled past, the backdrop pushes in and the
  // heading recedes and dissolves — the "camera" diving deeper into the page.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[620px] w-full items-center justify-center overflow-hidden bg-rose-gold-deep pt-20 md:pt-32"
    >
      {/* Backdrop: the video when one is configured, otherwise the still.
          Reduced motion always gets the still — a hero that loops by itself
          is the kind of movement that setting exists to stop. */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { scale: bgScale }}
      >
        {HERO_VIDEO && !reduceMotion ? (
          <video
            src={videoSrc}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={HERO_POSTER_ALT}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={HERO_POSTER}
            alt={HERO_POSTER_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </motion.div>

      {/* Just enough tint to keep the buttons legible over the footage —
          previously a 60% green wash sat on top of a backdrop already dimmed
          to 45%, which buried the picture behind it. */}
      <div
        className="absolute inset-0 bg-rose-gold-deep/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/45"
        aria-hidden="true"
      />
      {/* A soft pool of shade behind the buttons only. The outline button has
          no fill, so it needs something to sit against on a bright frame —
          darkening the whole hero to achieve that is what made the picture
          disappear before. Neutral rather than green, to leave the footage's
          own colour alone. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3),_transparent_62%)]"
        aria-hidden="true"
      />

      {/* Embers over the backdrop — the one place on the page where they
          read strongest, against the dark footage. */}
      <AmbientMotes count={22} />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={
          reduceMotion
            ? undefined
            : { y: contentY, scale: contentScale, opacity: contentOpacity }
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/services">Explore Our Services</Button>
          <Button
            href="/enquire"
            variant="outline"
            className="!border-ivory !text-ivory hover:!bg-ivory/10"
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
