import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramStrip from "@/components/home/InstagramStrip";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import Reveal from "@/components/shared/Reveal";
import KolamDivider from "@/components/ui/KolamDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <KolamDivider />
      <ServicesGrid />
      <GalleryTeaser />
      <KolamDivider />
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
