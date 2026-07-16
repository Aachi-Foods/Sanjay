import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | BNR Event Planners",
  description:
    "Traditional weddings, engagement ceremonies, naming ceremonies, corporate events, birthday celebrations, and cultural festivals — planned across South India.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-maroon-gradient pb-20 pt-40">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
            Our Services
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            Every Occasion, Planned With Purpose
          </h1>
          <p className="mt-6 font-body text-cream/80">
            Whether it&rsquo;s a temple wedding for 2,000 guests or an intimate
            Naamkaran for close family, our teams bring cultural precision and
            creative direction to every celebration.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <AnimatedSection
            stagger
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} detailed />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
