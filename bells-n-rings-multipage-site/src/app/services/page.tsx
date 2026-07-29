import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ServiceHoverCards from "@/components/services/ServiceHoverCards";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import KolamDivider from "@/components/ui/KolamDivider";
import StoryStage from "@/components/shared/StoryStage";
import { SERVICES, PAGE_HEADER_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service event planning from BnR Event Planners — event planning, venue selection, decoration & design, photography & videography, catering & beverages, entertainment, guest management, and logistics & support.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Celebrations, Planned With Devotion"
        description="Eight services, one standard of care. Point at any card to open its full details."
        image={PAGE_HEADER_IMAGES.services}
        imageAlt="Grand South Indian temple gopuram-inspired wedding venue entrance"
      />

      <StoryStage depth={26}>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <ServiceHoverCards services={SERVICES} />
        </section>
      </StoryStage>

      <KolamDivider />

      <StoryStage depth={36}>
        <InvitationTeaser />
      </StoryStage>
    </>
  );
}
