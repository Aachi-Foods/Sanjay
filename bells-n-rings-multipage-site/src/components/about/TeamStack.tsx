"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/content";

// Fanned, overlapping card stack inspired by unlumen UI's "Team Stack"
// component (adapted to the site's gold/ivory/rose-gold-deep palette rather
// than its dark monochrome-sketch style). The founder's card is a fixed
// "spotlight" — light-styled, centered, unrotated, always front — while the
// rest of the team fans out behind it in dark cards that straighten, lift,
// and come forward on hover. Desktop only: the fan needs room on both sides
// that a phone-width screen doesn't have, so narrow viewports keep the plain
// photo grid below instead.
//
// Pure CSS-transition hover (no scroll-linked motion values, no rotateX/
// perspective) — this only ever rotates flat on the Z axis and never on
// anything tall/full-width, so it doesn't hit the text-blur or overflow bugs
// that ruled those out elsewhere on this site (see InvitationReveal.tsx).
const SPACING = 96; // px between adjacent card centers
const ROTATE_STEP = 7; // degrees per slot away from the spotlight

export default function TeamStack({ members }: { members: TeamMember[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (members.length === 0) return null;
  const [spotlight, ...rest] = members;
  const leftCount = Math.floor(rest.length / 2);

  return (
    <div className="relative mx-auto hidden h-[28rem] max-w-3xl lg:block">
      {rest.map((member, i) => {
        const side = i < leftCount ? -1 : 1;
        const slot = side < 0 ? leftCount - i : i - leftCount + 1;
        const cardId = i + 1;
        const isHovered = hovered === cardId;
        const x = side * slot * SPACING;
        const restY = slot * 8;
        const y = isHovered ? -32 : restY;
        const rotate = isHovered ? 0 : side * slot * ROTATE_STEP;
        const scale = isHovered ? 1.06 : 1;
        const z = isHovered ? 30 : 20 - slot;

        return (
          <div
            key={member.name}
            onMouseEnter={() => setHovered(cardId)}
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 top-1/2 h-60 w-64 overflow-hidden rounded-3xl border border-gold-soft/30 bg-rose-gold-deep p-6 text-center shadow-2xl transition-transform duration-500 ease-out"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
              zIndex: z,
            }}
          >
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-gold-soft/40">
              <Image
                src={member.image}
                alt={`Placeholder headshot — ${member.name}, ${member.role}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-sans text-[0.65rem] tracking-[0.2em] text-gold-soft uppercase">
              {member.role}
            </p>
            <h3 className="mt-1 font-display text-lg text-ivory">{member.name}</h3>
            <p className="mt-2 line-clamp-3 font-sans text-xs text-ivory/70">
              {member.bio}
            </p>
          </div>
        );
      })}

      {/* Spotlight: always centered, unrotated, and on top */}
      <div className="absolute left-1/2 top-1/2 z-40 h-72 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-gold bg-ivory p-7 text-center shadow-[0_30px_60px_-15px_rgba(26,46,26,0.35)]">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold">
          <Image
            src={spotlight.image}
            alt={`Placeholder headshot — ${spotlight.name}, ${spotlight.role}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <p className="mt-4 font-sans text-[0.65rem] tracking-[0.2em] text-rose-text uppercase">
          {spotlight.role}
        </p>
        <h3 className="mt-1 font-display text-2xl text-charcoal">{spotlight.name}</h3>
        <p className="mt-2 line-clamp-3 font-sans text-xs text-charcoal-soft">
          {spotlight.bio}
        </p>
      </div>
    </div>
  );
}
