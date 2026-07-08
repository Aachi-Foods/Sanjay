import Image from "next/image";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function StorySection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow="Our Story"
          title="Born From a Love of Beautifully Told Moments"
        />
        <div className="prose-measure mt-6 flex flex-col gap-4 font-sans text-base text-charcoal-soft">
          <p>
            Bells n Rings Event Planners began with a simple observation: the
            most memorable celebrations rarely feel &ldquo;planned&rdquo; at
            all. They feel inevitable — as though every detail, from the
            floral arch to the final toast, was always meant to be exactly
            that way.
          </p>
          <p>
            What started as a small team styling intimate weddings across
            Maharashtra has grown into a full-service studio for weddings,
            corporate events, birthdays, and destination celebrations —
            without ever losing the editorial, personal touch we started
            with.
          </p>
          <p>
            Today, we bring the same devotion to a 400-guest product launch
            as we do to a garden wedding for eighty. Every event gets a
            dedicated creative lead, a considered design language, and a team
            that treats your celebration as the only one on the calendar.
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80"
          alt="Placeholder — Bells n Rings team reviewing an event floor plan"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>
    </section>
  );
}
