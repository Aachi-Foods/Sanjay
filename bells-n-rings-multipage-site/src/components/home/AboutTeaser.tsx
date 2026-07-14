import Image from "next/image";
import Reveal from "../shared/Reveal";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function AboutTeaser() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
      <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
        <Image
          src="https://placehold.co/1200x1500/1a2e1a/faf6ef?text=BnR+Planning+Team"
          alt="Placeholder — BnR planning team styling a celebration"
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
          title="Every Celebration Deserves Devoted Planning"
          description="BnR Event Planners was founded on a simple belief: your celebration should feel as considered as the traditions it honors — layered, personal, and unmistakably yours. From event planning and venue selection to décor, catering, and on-ground logistics, we bring the same devotion to detail to every wedding, ceremony, and corporate event we plan."
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
