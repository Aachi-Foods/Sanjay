"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/content";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import SessionsBrowser from "../gallery/SessionsBrowser";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Asymmetric editorial layout — the first tile spans two columns and two
// rows, the rest fill in around it.
const SPAN_CLASSES = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
];

// Reveal (Framer's whileInView) never fires its IntersectionObserver for
// elements this far down THIS specific page — confirmed with viewport
// enter/leave logging: zero events across a full scroll pass, on a plain
// motion.div with no Reveal involved, while the identical element fires
// normally once moved earlier in the page. Same family of bug as the
// documented useScroll/useTransform failures in SessionsBrowser.tsx and
// InvitationReveal.tsx (Framer's scroll-linked internals silently stop
// reaching the DOM in some configurations on this page) — a plain
// IntersectionObserver + CSS transition sidesteps it entirely, same as
// those two already do for their own scroll tracking.
function useRevealInView(margin = "0px 0px -60px 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}

function MobileGalleryCard({
  item,
  delay,
  className,
}: {
  item: GalleryItem;
  delay: number;
  className: string;
}) {
  const { ref, inView } = useRevealInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.6s ${EASE} ${delay}s, transform 0.6s ${EASE} ${delay}s`,
      }}
    >
      <Link href={`/gallery#${item.slug}`} className="relative block h-full w-full">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 640px) 25vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-display text-lg text-ivory">{item.title}</p>
          <p className="font-sans text-xs tracking-wide text-blush-soft uppercase">
            {item.location}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function GalleryTeaser() {
  const featured = GALLERY_ITEMS.slice(0, 5);
  const router = useRouter();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Our Work"
          title="Moments We've Brought to Life"
          description="A glimpse at the weddings, receptions, traditional ceremonies, and corporate events we've had the honor of planning."
          className="mb-14"
        />
      </Reveal>

      {/* Desktop: same full-screen, scroll-pinned Sessions browser as the
          full gallery page — scrolling down advances through sessions.
          "View Photo" sends visitors on to /gallery rather than opening a
          lightbox here. Not wrapped in <Reveal>: see GalleryGrid.tsx for
          why its transform-based fade-in isn't worth risking here. */}
      <SessionsBrowser
        items={featured}
        fullScreen
        onView={(slug) => router.push(`/gallery#${slug}`)}
      />

      {/* Below sm, cards stack in a single column: a fixed 180px row (the
          sm-and-up grid's spanning geometry needs auto-rows to be a fixed
          length) forced a ~1.9:1 box onto these ~1.13:1 source photos,
          cropping people out at the edges. Plain flex + aspect-[4/3] below
          sm avoids that; the sm+ spanning grid (where the asymmetric
          2-col/2-row featured tile lives) is unaffected. */}
      <div className="flex flex-col gap-4 sm:grid sm:auto-rows-[160px] sm:grid-cols-4 lg:hidden">
        {featured.map((item, i) => (
          <MobileGalleryCard
            key={item.slug}
            item={item}
            delay={i * 0.06}
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto ${SPAN_CLASSES[i] ?? ""}`}
          />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button href="/gallery" variant="outline">
          See Full Gallery
        </Button>
      </div>
    </section>
  );
}
