import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import KolamDivider from "@/components/ui/KolamDivider";
import { PAGE_HEADER_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A gallery of weddings, receptions, traditional ceremonies, and corporate events planned by BnR Event Planners.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="A Gallery of Beautifully Executed Moments"
        description="Filter by category to explore weddings, receptions, traditional ceremonies, and corporate events we've brought to life."
        image={PAGE_HEADER_IMAGES.gallery}
        imageAlt="Placeholder — gallery page banner"
      />
      <GalleryGrid />
      <KolamDivider />
      <InvitationTeaser />
    </>
  );
}
