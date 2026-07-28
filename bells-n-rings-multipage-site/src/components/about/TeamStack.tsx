"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { TeamMember } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fanned card stack modelled on unlumen UI's "Team Stack", rebuilt in the
// site's gold/ivory/rose-gold-deep palette. Every card is a full portrait
// card — a large photo panel above the role/name/bio — rather than a small
// avatar chip, so faces read clearly at a glance. Cards fan out along a
// shallow arc: horizontal spread is linear, the vertical drop is quadratic
// (outer cards sit lower), and each card rotates a little further from
// centre. Hovering one cancels its rotation, lifts it, and brings it to the
// front, exactly like the reference.
//
// Desktop only: a four-card fan needs ~800px of width, so narrow viewports
// keep the plain photo grid in TeamGrid.tsx instead.
//
// Only flat rotateZ is used — no rotateX/rotateY or `perspective`, which
// elsewhere on this site blurred text on mobile GPUs and inflated bounding
// boxes (see InvitationReveal.tsx). The fan-out entrance is a plain
// `whileInView` variant, not a scroll-linked MotionValue, so it isn't
// affected by the transform-ancestor bug that broke those.
const CARD_W = 272; // px — keep in sync with the w-68 class below
// Tall enough for the longest bio to render in full — the bios are not
// truncated, so this has to clear the worst case rather than the average.
const CARD_H = 496; // px — keep in sync with the h-[31rem] class below
// Sized so the widest point of the fan (the outer cards' rotated corners)
// still clears a 1024px laptop viewport, the narrowest width this fan is
// shown at.
const X_STEP = 208; // px between adjacent card centres
const ROTATE_STEP = 6; // degrees per slot away from centre
const ARC_DROP = 26; // px — multiplied by offset² for the arc's sag
// Each card covers CARD_W - X_STEP of the one beneath it, so text has to
// live inside the strip no neighbour can reach — otherwise the end of every
// bio line sits under the next card. The photo still spans the full card
// width: a partly overlapped photo reads as depth, clipped words just read
// as broken. Card width minus the overlapped strip reduces to X_STEP; the
// extra 40px is because neighbours are rotated relative to each other, so
// the covering edge slants and reaches further in at the card's top and
// bottom than a flat overlap would.
const TEXT_W = X_STEP - 40;

export default function TeamStack({ members }: { members: TeamMember[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  if (members.length === 0) return null;

  // The featured member leads the data list, but visually belongs near the
  // middle of the fan — an outer slot would sit at the back of the stack.
  const [featured, ...others] = members;
  const ordered = [...others];
  ordered.splice(Math.floor(others.length / 2), 0, featured);

  const mid = (ordered.length - 1) / 2;

  return (
    <div className="relative mx-auto hidden h-[40rem] max-w-5xl lg:block">
      {ordered.map((member, i) => {
        const offset = i - mid;
        const isFeatured = member.name === featured.name;
        const isHovered = hovered === i;

        const x = offset * X_STEP;
        const y = offset * offset * ARC_DROP;
        const rotate = offset * ROTATE_STEP;
        // Stacking runs strictly left-to-right: every card sits above the
        // one to its left, so a neighbour can only ever cover a card's
        // right-hand edge — never the left-aligned role and name. Ordering
        // by distance from centre instead (with the featured card on top)
        // buries the name of whichever card sits to its right.
        const z = isHovered ? 40 : i + 1;

        // Cards are centred with negative margins rather than a
        // translate(-50%,-50%), which would fight Framer's x/y transform.
        return (
          <motion.div
            key={member.name}
            className="absolute left-1/2 top-1/2"
            style={{ zIndex: z, marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2 }}
            initial={
              reduceMotion
                ? { opacity: 0, x, y, rotate }
                : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.92 }
            }
            whileInView={{ opacity: 1, x, y, rotate, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.75,
              delay: reduceMotion ? 0 : i * 0.09,
              ease: EASE,
            }}
          >
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`flex h-[31rem] w-68 flex-col overflow-hidden rounded-3xl border p-4 transition-transform duration-500 ease-out ${
                isFeatured
                  ? "border-gold bg-rose-gold-deep shadow-[0_30px_60px_-15px_rgba(26,46,26,0.5)]"
                  : "border-gold-soft/50 bg-ivory shadow-[0_20px_45px_-18px_rgba(26,46,26,0.45)]"
              }`}
              // Cancelling the fan rotation straightens the card as it
              // lifts, so the hovered member reads upright and in focus.
              style={{
                transform: isHovered
                  ? `rotate(${-rotate}deg) translateY(-26px) scale(1.05)`
                  : undefined,
              }}
            >
              <div
                className={`relative h-52 w-full shrink-0 overflow-hidden rounded-2xl ${
                  isFeatured ? "bg-rose-gold" : "bg-blush"
                }`}
              >
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="240px"
                  className="object-cover object-top"
                />
              </div>

              <p
                style={{ width: TEXT_W }}
                className={`mt-4 font-sans text-[0.6rem] tracking-[0.15em] uppercase ${
                  isFeatured ? "text-gold-soft" : "text-rose-text"
                }`}
              >
                {member.role}
              </p>
              <h3
                style={{ width: TEXT_W }}
                className={`mt-1 font-display text-2xl leading-tight ${
                  isFeatured ? "text-ivory" : "text-charcoal"
                }`}
              >
                {member.name}
              </h3>
              <p
                style={{ width: TEXT_W }}
                className={`mt-2 font-sans text-[0.8rem] leading-relaxed ${
                  isFeatured ? "text-ivory/75" : "text-charcoal-soft"
                }`}
              >
                {member.bio}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
