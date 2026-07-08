import { Gem, HeartHandshake, Sparkles, Clock4 } from "lucide-react";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Editorial Detail",
    description:
      "Every celebration is art-directed like an editorial shoot — considered styling, curated palettes, no detail left generic.",
  },
  {
    icon: HeartHandshake,
    title: "Personal, Not Prescriptive",
    description:
      "We design around your story rather than a template, so no two Bells n Rings events ever look the same.",
  },
  {
    icon: Gem,
    title: "Quiet Excellence",
    description:
      "The best compliment we can get is that everything simply worked. Our execution is meant to be felt, not seen.",
  },
  {
    icon: Clock4,
    title: "Devoted Timelines",
    description:
      "From the first enquiry to the final vendor payment, we manage every timeline so you never have to chase a detail.",
  },
];

export default function Philosophy() {
  return (
    <section className="bg-blush-soft/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Philosophy"
            title="What Guides Every Celebration We Plan"
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08} className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft/60 bg-ivory text-rose-text">
                <pillar.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl text-charcoal">{pillar.title}</h3>
              <p className="font-sans text-sm text-charcoal-soft">{pillar.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
