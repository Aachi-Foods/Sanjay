import Image from "next/image";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import ourStoryPhoto from "@/assets/about/our-story.jpg";

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
            BNR Event Planners began with a simple observation: the most
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
          src={ourStoryPhoto}
          alt="Wedding invitation suite, gold-bordered silk saree, jasmine garlands, and a hand-drawn venue floor plan"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal className="md:col-span-2">
        <div className="rounded-2xl border border-gold-soft/50 bg-blush-soft/50 px-8 py-10 text-center sm:px-14">
          <h3 className="font-display text-2xl text-charcoal sm:text-3xl">
            Why BNR?
          </h3>
          <p className="prose-measure mx-auto mt-4 font-sans text-base text-charcoal-soft">
            At BNR Events, we don&rsquo;t just organize events—we curate
            unforgettable experiences with personalized designs, transparent
            pricing, meticulous planning, and flawless execution, ensuring
            every celebration is truly one of a kind.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
