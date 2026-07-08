import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramStrip from "@/components/home/InstagramStrip";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import Reveal from "@/components/shared/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesGrid />
      <PortfolioPreview />
      <section className="bg-ivory-deep py-24">
        <Reveal className="mx-auto max-w-7xl px-6 sm:px-8">
          <TestimonialCarousel />
        </Reveal>
      </section>
      <InstagramStrip />
      <InvitationTeaser />
    </>
  );
}
