import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import Timeline from "@/components/Timeline";
import CTABanner from "@/components/CTABanner";
import ValueCard from "@/components/ValueCard";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | Aachi Foods",
  description:
    "30 years of authentic South Indian food traditions — the Aachi Foods story, our values, and our commitment to quality.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1920&auto=format&fit=crop"
          alt="Traditional South Indian spice market"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        <AnimatedSection className="relative z-10 px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-turmeric">
            About Aachi Foods
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            Three Decades of South Indian Kitchen Wisdom
          </h1>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-charcoal">Our Story</h2>
            <p className="mt-6 font-body leading-relaxed text-charcoal/70">
              Aachi Foods began in Chennai in 1995 with a single spice-grinding
              unit and a simple promise: never compromise on authenticity.
              Three decades later, that promise has grown into a range of
              200+ products — masalas, ready-to-cook mixes, pickles, and
              more — trusted in kitchens across India and exported to 25+
              countries, while staying true to the recipes that started it all.
            </p>
          </AnimatedSection>

          <div className="mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-turmeric">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Our Values
            </h2>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <ValueCard key={value.title} title={value.title} description={value.description} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
