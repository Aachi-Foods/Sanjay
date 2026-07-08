import Image from "next/image";
import Reveal from "../shared/Reveal";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function AboutTeaser() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
      <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
          alt="Placeholder — Bells n Rings planning team styling a tablescape"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <SectionHeading
          align="left"
          eyebrow="Who We Are"
          title="Every Celebration Deserves an Editorial Eye"
          description="Bells n Rings Event Planners was founded on a simple belief: your event should feel as beautifully considered as a wedding invitation — layered, personal, and unmistakably you. We plan weddings, corporate events, birthdays, and destination celebrations with the same devotion to detail, from the first mood board to the very last toast."
        />
        <div className="mt-8">
          <Button href="/about" variant="outline">
            Our Story
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
