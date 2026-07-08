import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import InvitationTeaser from "@/components/home/InvitationTeaser";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "An editorial portfolio of weddings, corporate events, birthdays, and destination celebrations planned by Bells n Rings Event Planners.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="A Portfolio of Beautifully Executed Moments"
        description="Filter by event type to explore weddings, corporate events, birthdays, and destination celebrations we've brought to life."
        image="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Placeholder — outdoor celebration styling at golden hour"
      />
      <PortfolioGallery />
      <InvitationTeaser />
    </>
  );
}
