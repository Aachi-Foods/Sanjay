import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramStrip from "@/components/home/InstagramStrip";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import StoryStage from "@/components/shared/StoryStage";
import KolamDivider from "@/components/ui/KolamDivider";

// Sections drift at different rates as they cross the viewport, so the page
// reads as scenes travelling past rather than a stack of static blocks. The
// varying `depth` values are the whole point — matching numbers would move
// everything in lockstep and there would be no depth to see.
//
// GalleryTeaser is deliberately left unwrapped. It pins its browser with
// `position: sticky`, and a continuously transformed ancestor becomes the
// containing block for anything sticky inside it, which breaks the pinning.
// It already carries the most dramatic scroll sequence on the page.
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

      <GalleryTeaser />

      <KolamDivider />

      <StoryStage depth={40}>
        <TestimonialCarousel />
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
