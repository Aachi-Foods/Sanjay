// Shared motion infrastructure for section-level effects built on top of
// the Lenis/ScrollTrigger sync in smooth-scroll.ts (hero parallax, card
// tilts, pinned scroll, etc.). Distinct from motionVariants.ts, which holds
// the fadeUp/staggerContainer vocabulary already used across existing
// sections — this file is the new infra layer for GSAP-registered eases and
// 3D-tilt intensity ceilings, so it doesn't retroactively change the feel of
// animations already built and tested elsewhere on the site.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// The site's signature ease — a strong ease-out for reveals and card lifts.
// Framer Motion consumes it as this array directly; GSAP gets it registered
// as a named ease (see registerBnrEase below) so tweens can reference it by
// string instead of repeating the bezier points everywhere.
export const BNR_EASE = [0.16, 1, 0.3, 1] as const;
export const BNR_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const BNR_EASE_GSAP_NAME = "bnrOut";

// Secondary curve for snappier micro-interactions (button tilt, hover) —
// capped at two total curves so the site doesn't accumulate a curve per
// component. Framer-only for now; add a GSAP registration alongside
// registerBnrEase() below if a GSAP tween ever needs it by name.
export const BNR_EASE_SNAPPY = [0.34, 1.56, 0.64, 1] as const;

let bnrEaseRegistered = false;

// Registers the named GSAP eases once per page load. Called from
// smooth-scroll.ts's init, which already owns the "run once, client-side"
// guard for this app's GSAP plugin registration.
export function registerBnrEase() {
  if (bnrEaseRegistered) return;
  gsap.registerPlugin(CustomEase);
  CustomEase.create(BNR_EASE_GSAP_NAME, "0.16, 1, 0.3, 1");
  bnrEaseRegistered = true;
}

// --- 3D tilt intensity ceilings --------------------------------------
// Shared so no tilt/hover component accidentally overshoots into
// "gimmicky" territory. Import and clamp against these rather than
// hardcoding new degree/px values per component.
export const TILT_MAX_DEG = 4;
export const LIFT_MAX_Z = 32;

// --- Gold-tinted shadow tiers ------------------------------------------
// The same three tiers as --shadow-gold-sm/md/lg in globals.css, as
// literal strings rather than var() references. Most components should
// reach for the shadow-gold-sm/md/lg Tailwind classes directly; these
// exist only for the cases that can't use a class — Framer Motion's
// `animate` prop interpolates box-shadow by parsing the numbers out of
// the string, which it can't do through an opaque var() reference, so
// anything animating a shadow via Framer needs the resolved value here
// instead. Keep both places in sync if either changes.
export const SHADOW_GOLD_SM = "0 8px 16px -4px rgba(201, 168, 76, 0.25)";
export const SHADOW_GOLD_MD = "0 16px 32px -8px rgba(201, 168, 76, 0.3)";
export const SHADOW_GOLD_LG = "0 24px 48px -12px rgba(201, 168, 76, 0.35)";
