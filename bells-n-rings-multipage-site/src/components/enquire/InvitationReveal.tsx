"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_NAME_PRIMARY } from "@/lib/constants";
import InvitationContactForm from "../contact/InvitationContactForm";
import FloralAccent from "../ui/FloralAccent";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// A closed invitation "cover" — two ivory doors meeting at a gold-sealed
// center seam — pinned for the length of this section and opened purely by
// scroll position (not a click): the doors swing away in 3D, the wax-seal
// monogram dissolves, and the enquiry form scales up into focus behind them.
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

  const leftRotate = mapRange(progress, 0.12, 0.55, 0, -112);
  const rightRotate = mapRange(progress, 0.12, 0.55, 0, 112);
  const doorsOpacity = mapRange(progress, 0.5, 0.64, 1, 0);
  const sealOpacity = mapRange(progress, 0, 0.16, 1, 0);
  const sealScale = mapRange(progress, 0, 0.16, 1, 0.55);
  const formOpacity = mapRange(progress, 0.4, 0.68, 0, 1);
  const formY = mapRange(progress, 0.4, 0.68, 36, 0);
  const hintOpacity = mapRange(progress, 0, 0.1, 1, 0);
  const doorsVisible = doorsOpacity > 0.01;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden bg-blush">
        <div
          style={{ opacity: formOpacity, transform: `translateY(${formY}px)` }}
          className="relative z-0 w-full max-w-xl px-6 pt-16"
        >
          <InvitationContactForm />
        </div>

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

            <div
              style={{ opacity: sealOpacity, transform: `scale(${sealScale})` }}
              className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-gold bg-rose-gold-deep text-center shadow-xl sm:h-32 sm:w-32"
            >
              <span className="font-display text-2xl text-gold">{SITE_NAME_PRIMARY}</span>
              <span className="font-script text-sm text-blush-soft">Invited</span>
            </div>
          </div>
        )}

        <div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <p className="font-sans text-xs tracking-[0.3em] text-rose-text uppercase">
            Scroll to Open
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-2 h-6 w-px bg-rose-gold-deep/50"
          />
        </div>
      </div>
    </section>
  );
}
