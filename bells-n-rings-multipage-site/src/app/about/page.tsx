import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import StorySection from "@/components/about/StorySection";
import Philosophy from "@/components/about/Philosophy";
import TeamGrid from "@/components/about/TeamGrid";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import KolamDivider from "@/components/ui/KolamDivider";
import { PAGE_HEADER_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind BnR Event Planners and the philosophy that shapes every wedding, ceremony, and corporate event we design.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Our Story, Our Team, Our Philosophy"
        image={PAGE_HEADER_IMAGES.about}
        imageAlt="Placeholder — About BnR Event Planners page banner"
      />
      <StorySection />
      <KolamDivider />
      <Philosophy />
      <TeamGrid />
      <InvitationTeaser />
    </>
  );
}
