import Image from "next/image";
import { TEAM_MEMBERS } from "@/lib/content";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TeamStack from "./TeamStack";

export default function TeamGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Meet the Team"
          title="The People Behind Every Celebration"
          className="mb-14"
        />
      </Reveal>

      {/* Desktop: fanned, hover-driven card stack (see TeamStack.tsx). Not
          wrapped in <Reveal> — its transform-based fade-in as an ancestor is
          exactly what breaks hover transforms elsewhere on this site. */}
      <TeamStack members={TEAM_MEMBERS} />

      <div className="grid gap-8 sm:grid-cols-2 lg:hidden">
        {TEAM_MEMBERS.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08} className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-blush">
              <Image
                src={member.image}
                alt={`Placeholder headshot — ${member.name}, ${member.role}`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal">{member.name}</h3>
              <p className="font-sans text-xs tracking-wide text-rose-text uppercase">
                {member.role}
              </p>
              <p className="mt-2 font-sans text-sm text-charcoal-soft">{member.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
