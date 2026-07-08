/* =========================================================================
   BnR Event Planners — Interactions & Animations
   ========================================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    preloader();
    heroWordDelays();
    heroParticles();
    headerScroll();
    mobileNav();
    scrollReveals();
    tiltCards();
    galleryLightbox();
    testimonialSlider();
    contactForm();
    backToTop();
    cursorGlow();
  }

  /* ---------------- Footer year ---------------- */
  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------- Preloader ---------------- */
  function preloader() {
    const pre = document.getElementById("preloader");
    if (!pre) return;
    window.addEventListener("load", () => {
      setTimeout(() => pre.classList.add("loaded"), 400);
    });
    // Fallback in case load event is delayed
    setTimeout(() => pre.classList.add("loaded"), 2500);
  }

  /* ---------------- Hero staggered word reveal ---------------- */
  function heroWordDelays() {
    document.querySelectorAll(".hero-title .reveal-line").forEach((line) => {
      const words = line.querySelectorAll(".reveal-word");
      words.forEach((w, i) => {
        w.style.animationDelay = `${0.15 + i * 0.09}s`;
      });
    });
    document.querySelectorAll("[data-delay]").forEach((el) => {
      const d = parseInt(el.getAttribute("data-delay"), 10) || 0;
      el.style.animationDelay = `${d}ms`;
    });
  }

  /* ---------------- Hero ambient particles ---------------- */
  function heroParticles() {
    const wrap = document.getElementById("heroParticles");
    if (!wrap) return;
    const count = window.innerWidth < 700 ? 12 : 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.bottom = `-10px`;
      const duration = 10 + Math.random() * 14;
      const delay = Math.random() * 14;
      const size = 2 + Math.random() * 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      wrap.appendChild(p);
    }
  }

  /* ---------------- Header scroll state ---------------- */
  function headerScroll() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  function mobileNav() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll-triggered reveals ---------------- */
  function scrollReveals() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute("data-delay"), 10) || 0;
            setTimeout(() => el.classList.add("in-view"), delay);
            observer.unobserve(el);

            // Fill timeline progress line once its steps are visible
            if (el.classList.contains("timeline-step")) {
              const line = document.querySelector(".timeline-line");
              if (line) line.classList.add("filled");
            }
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------------- 3D tilt hover for service cards ---------------- */
  function tiltCards() {
    if (window.matchMedia("(hover: none)").matches) return;
    const cards = document.querySelectorAll(".tilt");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  /* ---------------- Gallery lightbox ---------------- */
  function galleryLightbox() {
    const items = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    if (!lightbox) return;

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const caption = item.getAttribute("data-caption") || "";
        const poster = item.getAttribute("data-poster") || "";
        lightboxCaption.innerHTML = caption;
        lightboxImage.src = poster;
        lightboxImage.alt = item.getAttribute("aria-label") || caption;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    function close() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    closeBtn?.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Testimonial Ken Burns crossfade slider ---------------- */
  function testimonialSlider() {
    const slides = document.querySelectorAll(".t-slide");
    const kbSlides = document.querySelectorAll(".kb-slide");
    const dots = document.querySelectorAll(".t-dot");
    const prevBtn = document.getElementById("tPrev");
    const nextBtn = document.getElementById("tNext");
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 7000;

    function goTo(index) {
      const total = slides.length;
      const next = (index + total) % total;
      if (next === current) return;

      slides[current].classList.remove("t-active");
      kbSlides[current].classList.remove("kb-active");
      dots[current]?.classList.remove("active");

      current = next;

      slides[current].classList.add("t-active");
      dots[current]?.classList.add("active");

      // restart Ken Burns animation cleanly by re-triggering the class
      const kb = kbSlides[current];
      kb.classList.remove("kb-active");
      void kb.offsetWidth; // reflow to restart animation
      kb.classList.add("kb-active");
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, INTERVAL);
    }
    function stopAuto() {
      if (timer) clearInterval(timer);
    }

    nextBtn?.addEventListener("click", () => { next(); startAuto(); });
    prevBtn?.addEventListener("click", () => { prev(); startAuto(); });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(parseInt(dot.getAttribute("data-index"), 10));
        startAuto();
      });
    });

    const slider = document.getElementById("testimonialSlider");
    slider?.addEventListener("mouseenter", stopAuto);
    slider?.addEventListener("mouseleave", startAuto);

    startAuto();
  }

  /* ---------------- Contact form (client-side UX only) ---------------- */
  function contactForm() {
    const form = document.getElementById("inquiryForm");
    const status = document.getElementById("formStatus");
    const submitLabel = document.getElementById("submitLabel");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitLabel.textContent = "Sending…";
      status.textContent = "";

      // Simulated submission — wire this up to your backend / form service.
      setTimeout(() => {
        submitLabel.textContent = "Submit Inquiry";
        status.textContent = "Thank you. Your inquiry has been received — our team will be in touch within 48 hours.";
        form.reset();
      }, 1100);
    });
  }

  /* ---------------- Back to top ---------------- */
  function backToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("visible", window.scrollY > 700),
      { passive: true }
    );
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Cursor glow (desktop only) ---------------- */
  function cursorGlow() {
    if (window.matchMedia("(hover: none)").matches) return;
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    window.addEventListener("mousemove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.classList.add("active");
    });
    document.addEventListener("mouseleave", () => glow.classList.remove("active"));
  }
})();
