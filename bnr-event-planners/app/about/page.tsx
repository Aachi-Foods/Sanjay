import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import Timeline from "@/components/Timeline";
import TeamCard from "@/components/TeamCard";
import CTABanner from "@/components/CTABanner";
import { teamMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | BNR Event Planners",
  description:
    "A decade of planning South Indian weddings, ceremonies, and corporate events with cultural authenticity, based in Chennai.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1601926638690-e3e1b3e5f6f8?q=80&w=1920&auto=format&fit=crop"
          alt="Bharatanatyam dancer performing at a South Indian cultural event"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        <AnimatedSection className="relative z-10 px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
            About BNR Event Planners
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            Where Tradition Meets Timeless Celebration
          </h1>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-charcoal">Our Story</h2>
            <p className="mt-6 font-body leading-relaxed text-charcoal/70">
              Founded in Chennai in 2014, BNR Event Planners set out to solve a problem
              many South Indian families faced: event planners who could deliver
              modern production values without losing sight of ritual accuracy. From
              Muhurtham timing to Kanjeevaram styling, from Naamkaran ceremonies to
              corporate product launches, our team has grown into a full-service
              studio trusted across 20+ cities in South India.
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
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
              Meet the Team
            </p>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              The People Behind Every Celebration
            </h2>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
