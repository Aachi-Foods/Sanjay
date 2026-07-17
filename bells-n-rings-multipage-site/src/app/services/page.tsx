import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ServiceCard from "@/components/services/ServiceCard";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import KolamDivider from "@/components/ui/KolamDivider";
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
        description="Eight services, one standard of care. Tap any card below to read the full details."
        image={PAGE_HEADER_IMAGES.services}
        imageAlt="Placeholder — services page banner"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <KolamDivider />
      <InvitationTeaser />
    </>
  );
}
