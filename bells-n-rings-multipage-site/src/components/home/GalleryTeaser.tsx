"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GALLERY_ITEMS } from "@/lib/content";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import SessionsBrowser from "../gallery/SessionsBrowser";

// Asymmetric editorial layout — the first tile spans two columns and two
// rows, the rest fill in around it.
const SPAN_CLASSES = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
];

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

      {/* Desktop: same Google Flow Sessions-style spotlight browser as the
          full gallery page. "View Photo" sends visitors on to /gallery
          rather than opening a lightbox here. */}
      <Reveal className="hidden lg:block">
        <SessionsBrowser
          items={featured}
          onView={(slug) => router.push(`/gallery#${slug}`)}
        />
      </Reveal>

      <div className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[160px] lg:hidden">
        {featured.map((item, i) => (
          <Reveal
            key={item.slug}
            delay={i * 0.06}
            className={`group relative overflow-hidden rounded-2xl ${SPAN_CLASSES[i] ?? ""}`}
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
          </Reveal>
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
