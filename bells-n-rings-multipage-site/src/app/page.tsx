import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramStrip from "@/components/home/InstagramStrip";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import Scene from "@/components/shared/Scene";
import KolamDivider from "@/components/ui/KolamDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Scene>
        <AboutTeaser />
      </Scene>
      <KolamDivider />
      <Scene>
        <ServicesGrid />
      </Scene>
      <Scene delay={0.05}>
        <GalleryTeaser />
      </Scene>
      <KolamDivider />
      <Scene as="section" className="bg-ivory-deep py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <TestimonialCarousel />
        </div>
      </Scene>
      <Scene>
        <InstagramStrip />
      </Scene>
      <Scene tilt={8} rise={40}>
        <InvitationTeaser />
      </Scene>
    </>
  );
}
