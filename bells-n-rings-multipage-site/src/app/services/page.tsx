import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ServiceDetail from "@/components/services/ServiceDetail";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service wedding, corporate event, birthday, and destination event planning from Bells n Rings Event Planners.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Celebrations, Planned With Devotion"
        description="Four event types, one standard of care. Explore how we approach each celebration below."
        image="https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Placeholder — celebration lighting and event styling detail"
      />

      <div className="divide-y divide-gold-soft/30">
        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} reversed={i % 2 === 1} />
        ))}
      </div>

      <InvitationTeaser />
    </>
  );
}
