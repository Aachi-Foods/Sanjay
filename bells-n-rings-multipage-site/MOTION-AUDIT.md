# Motion QA Audit

Final verification pass across the sitewide motion work (hero, "Who We Are",
services grid, Instagram marquee, testimonial parallax, CTA/footer). This is
a corrections pass, not new feature work — no copy or layout changed.

**Scope note:** the build sequence originally included a pinned horizontal
"Featured Stories" section. It was built, then explicitly removed at the
user's request in a later session before this QA pass began. Every item
below that referenced that section (all of Task 2, one item in Task 1, one
item in Task 3) is marked **N/A — section removed** rather than tested,
since there's nothing left to check.

**Testing environment note:** this sandbox has no physical iOS/Android
devices and no outbound network access to the live deployed site. All
verification below is via a local dev server (byte-identical to what's
built and deployed) driven by Playwright — real Chromium, with
`reducedMotion` context emulation for Task 3 and device-preset viewport/UA
emulation (iPhone 13, Pixel 5) for the mobile checks in Task 2. This is a
reasonable proxy for DevTools-based testing but is **not** a substitute for
real-device touch physics, momentum scrolling, or mobile Safari's actual
dynamic viewport/address-bar behavior — flagged explicitly below wherever
that distinction matters.

---

## Task 3 — Reduced-motion coverage

Tested via Playwright with `reducedMotion: 'reduce'` context (equivalent to
DevTools' CSS media feature emulation), scrolling the full homepage with
real wheel events. All items below were exercised live, not just read from
source.

| Section | Effect | Result |
|---|---|---|
| Hero | video/text parallax | **Pass** — layer transform stays `none` through a full scroll |
| Hero | button tilt | **Pass** — `none` after hover |
| Who We Are | image rotateY/scale | **Pass** — `none` throughout |
| Who We Are | divider draw-in | **Pass** — renders pre-drawn (`strokeDashoffset: 0px`) instantly |
| Who We Are | heading reveal | N/A — this task was explicitly skipped earlier in the build (no heading/subtext exists on the Hero to reveal); nothing to test |
| Services grid | entrance | **Pass** — all cards `opacity: 1` instantly, no stagger |
| Services grid | hover lift | **Pass** — no `translateZ`; shadow still deepens to gold as the static highlight the effect's own spec calls for |
| Services grid | Ken Burns zoom | **Pass** — image scale stays 1 on hover |
| Featured Stories | pin/parallax/mask-reveal | N/A — section removed |
| Instagram marquee | drift | **Pass** — renders only 6 tiles (no duplicate set), transform static across a 1.2s wait |
| Testimonial | watermark + text parallax | **Pass** — both settle to an identity transform (see note below) |
| CTA band | grain animation | **Pass** — no SMIL `<animate>` element present under reduced motion |
| CTA button | tilt | **Pass** — `none` after hover |
| Footer | nav link tilt | **Pass** — `none` after hover |
| Footer | entrance (all 3 columns) | **Pass** — fully opaque, `transform: none` |

**One false positive during testing, corrected before concluding anything
was broken:** the first pass at this sweep used `.scrollIntoViewIfNeeded()`
to jump to each section, which — like `window.scrollTo` — is intercepted/
fought by Lenis (documented elsewhere in this codebase). That produced two
apparent failures (testimonial watermark, footer nav link) that were
actually the *page never having genuinely scrolled there* rather than a
real motion bug. Re-run with real `page.mouse.wheel()` scroll throughout,
both passed cleanly. Recorded here so a future tester doesn't waste time
rediscovering the same trap.

**One real, harmless finding — noted, not fixed:** `TestimonialCarousel.tsx`
(and several other sections: `InstagramStrip.tsx`, `InvitationTeaser.tsx`,
`Footer.tsx`) gate their GSAP effects with the `useSyncExternalStore`-based
synced reduced-motion hook (`@/hooks/useReducedMotion`) rather than
Framer's own `useReducedMotion`. That hook deliberately assumes
"no preference" on the very first client render and only resyncs to the
real OS value a render later (by design — it's what makes it safe for
*shape*-branching cases like the hero's video/img switch or the marquee's
duplicated tile set). For a section that only uses the value to **gate an
effect** (no shape branching), this means a GSAP tween can be created and
immediately torn down on that first resync for reduced-motion users — the
end state is a harmless identity transform (`matrix(1, 0, 0, 1, 0, 0)`,
confirmed both immediately after mount and after further scrolling) rather
than a literal `transform: none`. Zero visible or functional difference —
this is why it's not fixed here. Hero.tsx is the one section that already
gets this exactly right: it uses Framer's own hook for its (effect-only)
parallax gating and reserves the synced hook only for its one real
shape-branch. Worth matching that split the next time any of the
above files gets touched, but not worth a standalone edit against
untouched, working code for this pass.

---

## Task 1 — 3D transform intensity audit (2–6° rotation / 20–40px translateZ)

Every `useTilt(...)` call and every raw `rotateX`/`rotateY`/`z`/`translateZ`
value in the codebase, checked against the ceiling:

| Location | Value | In band? | Notes |
|---|---|---|---|
| Hero CTA buttons | `useTilt({ maxDeg: 3 })`, lift `z: 10` | Yes | |
| CTA "Send an Enquiry" button | `useTilt({ maxDeg: 3 })`, lift `z: 10` | Yes | Matches hero exactly, as intended |
| Footer nav links | `useTilt({ maxDeg: 2 })`, lift `z: 5` | **Deliberately below** | Per that section's own build spec, footer links were intentionally tightened *below* the general ceiling — small, dense, text-sized targets read as jittery at full intensity. Left as-is; this was a documented, intentional choice, not drift to correct. |
| Services grid — hover lift | `CARD_LIFT_Z = LIFT_MAX_Z - 8 = 24px` | Yes | |
| Services grid — entrance | `z: -40` → **corrected to `z: -36`** | Now yes | Was sitting exactly on the ceiling's edge. Paired with the accompanying opacity fade (0→1), a near-invisible element reads as *further away* than the raw px value alone suggests — the two compound. Dialed back to -36 (within the spec's own suggested -32/-36 range), re-verified live: still settles cleanly with the same stagger/timing, no overshoot, no change in feel beyond the intended slight softening. |
| Who We Are — image orbit | `rotateY: -4 → 4` | Yes, by the reading used here | See reasoning below — this is the one genuine judgment call in this pass. |
| Featured Stories — caption/photo parallax (`xPercent`) | — | N/A — section removed | Not a rotation/translateZ effect, and the section it lived in no longer exists. |
| About page — TeamStack card fan | `rotate: ±6° per slot` (2D, `ROTATE_STEP = 6`) | Out of scope | This is a static per-slot layout rotation for a fanned card stack, not a `Perspective3D`/`useTilt` cursor-tilt effect — a different category of motion than the ceiling was written for. Predates this build's tilt work. Flagged here for completeness, not treated as a violation. |

### The "Who We Are" -4°/4° swing — judgment call

The brief explicitly asks whether the ceiling should be read as *total
swing* (8°, over the ceiling) or *per-direction magnitude* (4°, within it),
and to reconcile via watching the effect live.

Decision: **keep -4°/4° as built.** Reasoning:

- The ceiling exists to keep *interactive* cursor-tilt effects (hero
  buttons, service cards, footer links) from feeling jittery or gimmicky
  under fast, back-and-forth pointer movement — that's a real risk when a
  user can flick their mouse edge-to-edge in a fraction of a second and
  perceive the *full* swing as one motion.
- This effect isn't that. It's scroll-linked and monotonic: the rotation
  only ever moves in one direction as the user scrolls down, from -4°
  toward +4°, over the section's entire scroll duration — never oscillating
  back and forth. A user cannot experience the "full 8°" as a fast, jarring
  motion the way they could flick a cursor-tilt element; they experience a
  single slow turn, and at any instant the *rate* of rotation relative to
  scroll position is small.
- This was already verified live during the section's original build
  (monotonic progression -4°→4° with no jitter or overshoot at either
  extreme, confirmed via matrix decomposition at fine-grained scroll steps)
  and reads as the intended "slow camera orbit," not a dramatic flip.

If a future pass disagrees with this read once real photography is in
place (this sandbox can't load the actual image — the source is on an
external CDN blocked here), tightening to -3°/3° is a one-line change in
`AboutTeaser.tsx`'s entrance effect and was already scoped as the fallback
in the original brief.

---

## Task 2 — Mobile testing of the pinned horizontal scroll section

**N/A — section removed.** This task, in its entirety, was written against
the Featured Stories pinned-horizontal-scroll section, which no longer
exists in the codebase (removed at the user's explicit request in a later
session, before this QA pass began). There is no pin, no scrub, no
breakpoint fallback, and no address-bar/orientation-change risk to verify,
because there is nothing left on the page that pins.

As a best-effort substitute (not a replacement for what this task actually
asked for), the whole site was smoke-tested under Playwright's `iPhone 13`
and `Pixel 5` device presets — real touch-capable viewport/UA emulation,
scrolled with real wheel events across all 6 pages, plus a simulated
mobile-Safari address-bar collapse (shrinking the viewport height ~12%
mid-session, since a real device does this dynamically as part of native
scroll and nothing here can reproduce that exactly). Result: no horizontal
overflow and no page errors on any page, on either device preset, before or
after the simulated viewport-height change.

This does **not** verify real touch/momentum scroll physics, real mobile
Safari viewport behavior, or actual frame rates on a mid-range Android
device — the three things this task's own acceptance check specifically
calls out as unreachable from DevTools-style emulation. If a
pinned-horizontal-scroll section is added back to this page in the future,
its real-device testing still needs to happen on real hardware; nothing in
this pass substitutes for that.

---

## Summary of corrections made this pass

1. `ServiceHoverCards.tsx` — entrance `translateZ` dialed from `-40` to
   `-36`, re-verified live (staggered, settles cleanly, no overshoot).

Everything else audited above was either already within spec, already a
documented intentional exception (footer tilt), already correct behavior
surfaced by fixing a test-methodology bug rather than a real one
(testimonial/footer reduced-motion), or out of scope because the section it
targeted (Featured Stories) has been removed.
