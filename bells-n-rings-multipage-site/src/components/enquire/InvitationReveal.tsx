"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SITE_NAME_FULL } from "@/lib/constants";
import InvitationContactForm from "../contact/InvitationContactForm";
import FloralAccent from "../ui/FloralAccent";
import GoldDivider from "../ui/GoldDivider";
import Reveal from "../shared/Reveal";
import { Perspective3D } from "../motion/Perspective3D";
import ParticleField from "../shared/ParticleField";
import bnrLogo from "@/assets/bnr-logo.png";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// A closed invitation "cover" — two ivory doors meeting at a gold-sealed
// center seam — pinned for the length of the first section and opened purely
// by scroll position (not a click): the doors swing away in 3D and the
// wax-seal monogram dissolves. The enquiry form itself is a separate,
// normal-flow section further down the page — see the comment above the
// return statement for why it isn't inside the pinned section.
//
// Progress is tracked with a plain scroll listener + getBoundingClientRect
// rather than Framer Motion's useScroll/useTransform: bound directly to a
// style prop on a motion.div several layers deep inside a 3D perspective
// transform, those scroll-linked MotionValues stopped propagating their
// updates to the DOM after the first paint (the value itself kept updating
// correctly when inspected in JS — only the rendered style stayed frozen at
// its initial value). Plain state + inline styles sidesteps that entirely.
export default function InvitationReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    let rafId = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  // Scroll-driven 3D doesn't degrade gracefully for reduced-motion users —
  // skip straight to a plain, static form instead of a half-animated cover.
  if (reduceMotion) {
    return (
      <section className="bg-blush pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-xl px-6">
          <InvitationContactForm />
        </div>
      </section>
    );
  }

  // The pinned section below only stages the door-opening spectacle now —
  // the form itself lives in normal document flow further down the page
  // (see the section after it). It used to be rendered inside this pinned,
  // overflow-hidden, single-viewport-tall box, which meant that on any
  // phone where the form was taller than one screen (nearly always — six
  // fields, a heading, and a button routinely run past 900px), its top
  // and/or bottom got clipped with no way to scroll to the rest: the Send
  // button could end up permanently cut off, unreachable. Letting the form
  // render normally below lets it be exactly as tall as it needs to be.
  const leftRotate = mapRange(progress, 0, 0.55, 0, -112);
  const rightRotate = mapRange(progress, 0, 0.55, 0, 112);
  const doorsOpacity = mapRange(progress, 0.45, 0.65, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.1, 1, 0);
  const doorsVisible = doorsOpacity > 0.01;

  // The "You're Invited" card's own exit: a real 3D fold, hinged at the top
  // edge, rather than the shrink+fade this replaced. Starts a beat after
  // scroll begins (0.05) so the resting card is legible for a moment first,
  // and spans a wide enough slice of the pin's scroll distance (to 0.4) to
  // read as a deliberate ~700ms-feeling motion rather than a snap — tuned by
  // scrubbing at a normal scroll speed, not picked blind.
  const FOLD_START = 0.05;
  const FOLD_END = 0.4;
  const cardRotateX = mapRange(progress, FOLD_START, FOLD_END, 0, -112);
  // The fold's own 0-1 progress, independent of the overall pin progress —
  // everything else about the card (its fade-out, its growing shadow, the
  // form preview cross-fading in behind it) is timed off this instead of
  // the raw scroll value, so those relationships hold even if FOLD_START/
  // FOLD_END above are ever retuned.
  const foldFraction = mapRange(progress, FOLD_START, FOLD_END, 0, 1);
  // Card fades out only in the fold's final stretch — past ~75deg of
  // rotation it's edge-on and unreadable anyway, so holding full opacity
  // that long keeps the logo crisp for as much of the fold as possible
  // instead of dissolving while it's still readable.
  const cardOpacity = mapRange(foldFraction, 0.75, 1, 1, 0);
  // Shadow grows and drops as the card tips back, selling the sense of it
  // lifting off the page rather than just rotating in place.
  const cardShadowBlur = 24 + foldFraction * 56; // 24px -> 80px
  const cardShadowY = 14 + foldFraction * 46; // 14px -> 60px
  const cardShadowAlpha = 0.22 + foldFraction * 0.26; // 0.22 -> 0.48
  const cardShadow = `0 ${cardShadowY.toFixed(1)}px ${cardShadowBlur.toFixed(1)}px -12px rgba(26, 46, 26, ${cardShadowAlpha.toFixed(2)})`;
  // The real, fully interactive form still lives in normal document flow
  // below this pinned section (see the long comment above this component
  // for why — a form embedded in this overflow-hidden 100dvh box gets its
  // Send button clipped unreachable on phones). This preview reuses the
  // form's own "Get in Touch" heading, decorative and non-interactive, so
  // scrolling past the fold reads as the form arriving underneath the card
  // rather than a dead gap before the real section further down begins.
  const formPreviewOpacity = mapRange(foldFraction, 0.6, 0.85, 0, 1);
  // The idle bob/tilt is a "resting invitation" detail for before the user
  // starts scrolling — once the fold begins, it settles to neutral instead
  // of continuing to loop underneath the scroll-driven rotation.
  const cardIsIdle = progress < 0.02;

  return (
    <>
      <section ref={sectionRef} className="relative" style={{ height: "108vh" }}>
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden bg-blush">
        {/* Ambient depth behind everything — two soft, slowly drifting glows */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(74,107,76,0.22),_transparent_70%)] blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.28),_transparent_70%)] blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Denser than the hero's instance — this page is the "candlelight/
            festival" close of the funnel, not an ambient backdrop to a
            video. Sits with the other undated-z-index ambient layers above
            (the two blur glows), so it's always beneath the doors (z-10),
            the form preview (z-10), and the card (z-20) — it can never sit
            on top of or interfere with the fold. No cursor parallax here:
            the fold itself already owns the sense of depth in this scene,
            and stacking a second depth cue on top would compete with it. */}
        <ParticleField density={{ desktop: 35, mobile: 18 }} />

        {doorsVisible && (
          <div
            style={{ opacity: doorsOpacity }}
            className="pointer-events-none absolute inset-0 z-10"
          >
            <div className="absolute inset-0" style={{ perspective: 2000 }}>
              <div
                style={{
                  transform: `rotateY(${leftRotate}deg)`,
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                }}
                className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-end border-r border-gold-soft/60 bg-ivory pr-6"
              >
                <FloralAccent className="h-24 w-24 text-rose-gold-deep/35 sm:h-32 sm:w-32" />
              </div>
              <div
                style={{
                  transform: `rotateY(${rightRotate}deg)`,
                  transformOrigin: "right center",
                  backfaceVisibility: "hidden",
                }}
                className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-start bg-ivory pl-6"
              >
                <FloralAccent flip className="h-24 w-24 text-rose-gold-deep/35 sm:h-32 sm:w-32" />
              </div>
            </div>
          </div>
        )}

        {/* Non-interactive preview of the real form's own heading, centred
            exactly where the card sits so it reads as "underneath" it.
            Deliberately NOT nested inside the doorsVisible block above —
            that block unmounts once the doors finish fading out around
            65% through the pin, which is well before this preview is done
            bridging into the real form section below. Never becomes the
            actual form itself — see the comment above formPreviewOpacity
            for why. */}
        <div
          aria-hidden="true"
          data-invite-form-preview=""
          style={{ opacity: formPreviewOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center"
        >
          <span className="font-script text-4xl text-rose-text sm:text-5xl">
            Get in Touch
          </span>
          <p className="font-sans text-sm text-charcoal-soft">
            Share a few details and we&rsquo;ll begin crafting your celebration.
          </p>
        </div>

        {cardOpacity > 0.01 && (
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <Perspective3D depth={1400}>
              <motion.div
                data-invite-fold-card=""
                animate={
                  cardIsIdle
                    ? { y: [0, -10, 0], rotateZ: [-2.5, 2.5, -2.5] }
                    : { y: 0, rotateZ: 0 }
                }
                transition={
                  cardIsIdle
                    ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.3, ease: "easeOut" }
                }
                style={{
                  rotateX: cardRotateX,
                  opacity: cardOpacity,
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                  boxShadow: cardShadow,
                }}
                className="preserve-3d flex w-72 flex-col items-center gap-4 rounded-3xl border border-gold bg-ivory px-8 py-10 text-center sm:w-80 sm:px-10 sm:py-12"
              >
                <div className="relative w-32 sm:w-36">
                  <Image src={bnrLogo} alt={SITE_NAME_FULL} className="h-auto w-full object-contain" />
                </div>
                <GoldDivider className="!gap-2" />
                <p className="font-script text-3xl text-rose-text sm:text-4xl">
                  You&rsquo;re Invited
                </p>
                <p className="font-sans text-xs text-charcoal-soft">
                  Scroll down to begin your enquiry
                </p>
              </motion.div>
            </Perspective3D>
          </div>
        )}

        <div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-sans text-sm font-medium tracking-[0.35em] text-rose-text uppercase">
              Scroll to Open
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mt-3 flex h-10 w-6 items-start justify-center rounded-full border-2 border-rose-gold-deep p-1"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-rose-gold-deep" />
            </motion.div>
            <ChevronDown
              className="mx-auto mt-1 h-4 w-4 text-rose-gold-deep"
              strokeWidth={2}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
      </section>

      <section className="bg-blush pt-4 pb-24 sm:pt-6">
        <Reveal className="mx-auto max-w-xl px-6">
          <InvitationContactForm />
        </Reveal>
      </section>
    </>
  );
}
