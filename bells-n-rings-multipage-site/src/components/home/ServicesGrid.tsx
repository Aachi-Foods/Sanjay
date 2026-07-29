import { SERVICES } from "@/lib/content";
import ServiceHoverCards from "../services/ServiceHoverCards";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

export default function ServicesGrid() {
  return (
    <section className="bg-blush-soft/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Celebrations, Planned With Devotion"
            description="Eight services, one standard of care — from the first concept to the final send-off."
            className="mb-14"
          />
        </Reveal>

        <ServiceHoverCards
          services={SERVICES}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        />

        <div className="mt-14 flex justify-center">
          <Button href="/services" variant="outline">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
