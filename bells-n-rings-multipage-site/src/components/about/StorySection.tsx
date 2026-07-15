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
            BnR Event Planners began with a simple observation: the most
            memorable South Indian celebrations rarely feel
            &ldquo;planned&rdquo; at all. They feel inevitable — as though
            every ritual, every garland, every note of nadaswaram was always
            meant to fall exactly into place.
          </p>
          <p>
            What started as a small team coordinating intimate ceremonies
            across Tamil Nadu has grown into a full-service studio for Hindu,
            Muslim, Sikh, Christian, and interfaith celebrations alike —
            covering event planning, venue selection, décor and design,
            photography, catering, entertainment, guest management, and
            on-ground logistics, without ever losing the personal,
            tradition-first touch we started with.
          </p>
          <p>
            Today, we bring the same devotion to a 500-guest wedding as we do
            to an intimate muhurtham for close family. Every event gets a
            dedicated planning lead and a team that treats your celebration
            as the only one on the calendar.
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src="https://images.unsplash.com/photo-wGi9dQZCP0s?auto=format&fit=crop&w=1200&q=80"
          alt="Placeholder — BnR team reviewing an event floor plan"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>
    </section>
  );
}
