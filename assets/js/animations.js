/**
 * BNR Event Planners — animations.js
 * GSAP + ScrollTrigger scroll reveals (falls back to IntersectionObserver
 * toggling the `.is-visible` CSS class defined in animations.css if GSAP
 * failed to load from the CDN).
 */

(function () {
  "use strict";

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  function initScrollReveals() {
    var targets = document.querySelectorAll("[data-reveal], [data-reveal-group]");
    if (!targets.length) return;

    if (hasScrollTrigger) {
      targets.forEach(function (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: function () {
            el.classList.add("is-visible");
          },
        });
      });
      return;
    }

    // Fallback: plain IntersectionObserver toggles the CSS-driven reveal
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      targets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* -------------------------------------------------------------------- */
  /* Hero entrance timeline (GSAP) — falls back to CSS animation classes  */
  /* already applied in markup (.hero-anim-title etc.) when GSAP absent   */
  /* -------------------------------------------------------------------- */
  function initHeroTimeline() {
    if (!hasGSAP) return;
    var title = document.querySelector("[data-hero-title]");
    var sub = document.querySelector("[data-hero-sub]");
    var cta = document.querySelector("[data-hero-cta]");
    if (!title && !sub && !cta) return;

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (title) tl.from(title, { y: 40, opacity: 0, duration: 1 }, 0.1);
    if (sub) tl.from(sub, { y: 30, opacity: 0, duration: 0.9 }, 0.35);
    if (cta) tl.from(cta, { y: 20, opacity: 0, duration: 0.8 }, 0.6);
  }

  /* -------------------------------------------------------------------- */
  /* Parallax-lite on section eyebrows / decorative motifs (subtle)       */
  /* -------------------------------------------------------------------- */
  function initSubtleParallax() {
    if (!hasScrollTrigger) return;
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeroTimeline();
    initScrollReveals();
    initSubtleParallax();
  });
})();
