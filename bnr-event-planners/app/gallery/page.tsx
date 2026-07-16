import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import GalleryGrid from "@/components/GalleryGrid";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Gallery | BNR Event Planners",
  description:
    "Browse our portfolio of South Indian weddings, engagement ceremonies, cultural festivals, corporate events, and birthday celebrations.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-maroon-gradient pb-16 pt-40">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
            Our Portfolio
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            Moments We&rsquo;ve Brought to Life
          </h1>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <GalleryGrid />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
