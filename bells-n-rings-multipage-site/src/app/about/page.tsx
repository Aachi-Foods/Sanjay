import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import StorySection from "@/components/about/StorySection";
import Philosophy from "@/components/about/Philosophy";
import TeamGrid from "@/components/about/TeamGrid";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import KolamDivider from "@/components/ui/KolamDivider";
import StoryStage from "@/components/shared/StoryStage";
import { PAGE_HEADER_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind BNR Event Planners and the philosophy that shapes every wedding, ceremony, and corporate event we design.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Our Story, Our Team, Our Philosophy"
        image={PAGE_HEADER_IMAGES.about}
        imageAlt="Placeholder — About BNR Event Planners page banner"
      />
      <StoryStage depth={32}>
        <StorySection />
      </StoryStage>

      <KolamDivider />

      <StoryStage depth={18}>
        <Philosophy />
      </StoryStage>

      <StoryStage depth={40}>
        <TeamGrid />
      </StoryStage>

      <StoryStage depth={24}>
        <InvitationTeaser />
      </StoryStage>
    </>
  );
}
