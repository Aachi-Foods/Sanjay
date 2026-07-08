import { SERVICES } from "@/lib/content";
import Card from "../ui/Card";
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
            title="Celebrations, Curated"
            description="Four event types, one standard of care — every celebration is planned with the same precision and warmth."
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Card
                image={service.image}
                imageAlt={service.imageAlt}
                eyebrow="Service"
                title={service.title}
                description={service.shortDescription}
                href={`/services#${service.slug}`}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/services" variant="outline">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
