import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import AnimatedSection from "@/components/AnimatedSection";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import AboutTeaser from "@/components/AboutTeaser";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services overview */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-maroon">
              What We Do
            </p>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              Celebrations Rooted in Tradition
            </h2>
            <p className="mt-4 font-body text-charcoal/70">
              Every occasion, from a temple wedding to a boardroom milestone, is planned
              with authenticity, precision, and warmth.
            </p>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <AboutTeaser />
      <StatsCounter />
      <Testimonials />
      <CTABanner />
    </>
  );
}
