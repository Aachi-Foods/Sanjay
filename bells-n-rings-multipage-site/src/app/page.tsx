import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedStories from "@/components/featured-stories/FeaturedStories";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramStrip from "@/components/home/InstagramStrip";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import StoryStage from "@/components/shared/StoryStage";
import Particles from "@/components/shared/Particles";
import KolamDivider from "@/components/ui/KolamDivider";

// Sections drift at different rates as they cross the viewport, so the page
// reads as scenes travelling past rather than a stack of static blocks. The
// varying `depth` values are the whole point — matching numbers would move
// everything in lockstep and there would be no depth to see.
//
// GalleryTeaser and FeaturedStories are both deliberately left unwrapped.
// GalleryTeaser pins its browser with `position: sticky`; FeaturedStories
// pins the whole section via GSAP ScrollTrigger's `pin: true` for its
// horizontal scrollytelling. Either way, a continuously transformed
// ancestor becomes the containing block for a fixed/sticky descendant,
// which breaks the pin — these two already carry the page's most dramatic
// scroll sequences without StoryStage's added drift.
export default function HomePage() {
  return (
    <>
      <Hero />

      <StoryStage depth={34}>
        <AboutTeaser />
      </StoryStage>

      <KolamDivider />

      <StoryStage depth={18}>
        <ServicesGrid />
      </StoryStage>

      <FeaturedStories />

      <GalleryTeaser />

      <KolamDivider />

      <StoryStage depth={40}>
        <section className="relative overflow-hidden bg-ivory-deep py-24">
          <Particles quantity={45} staticity={60} className="opacity-70" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <TestimonialCarousel />
          </div>
        </section>
      </StoryStage>

      <StoryStage depth={22}>
        <InstagramStrip />
      </StoryStage>

      <StoryStage depth={30}>
        <InvitationTeaser />
      </StoryStage>
    </>
  );
}
