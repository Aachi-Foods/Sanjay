/**
 * BNR Event Planners — main.js
 * Sticky nav, mobile menu, hero carousel, stats counters, testimonials
 * carousel, footer year, and lightweight page-transition fade.
 */

(function () {
  "use strict";

  /* -------------------------------------------------------------------- */
  /* Sticky nav: transparent -> solid on scroll                           */
  /* -------------------------------------------------------------------- */
  function initStickyNav() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;

    function toggle() {
      if (window.scrollY > 60) {
        nav.classList.add("nav-solid");
      } else {
        nav.classList.remove("nav-solid");
      }
    }
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* -------------------------------------------------------------------- */
  /* Mobile hamburger menu                                                */
  /* -------------------------------------------------------------------- */
  function initMobileMenu() {
    var btn = document.querySelector(".hamburger-btn");
    var hamburger = document.querySelector(".hamburger");
    var menu = document.querySelector(".mobile-menu");
    var overlay = document.querySelector(".mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    function open() {
      menu.classList.add("is-open");
      overlay.classList.add("is-open");
      hamburger.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("is-open");
      overlay.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    btn.addEventListener("click", function () {
      menu.classList.contains("is-open") ? close() : open();
    });
    overlay.addEventListener("click", close);
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* -------------------------------------------------------------------- */
  /* Hero background carousel — crossfade + Ken Burns, rotates every 5s   */
  /* -------------------------------------------------------------------- */
  function initHeroCarousel() {
    var slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;
    var current = 0;

    function show(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
    }

    if (slides.length > 1) {
      setInterval(function () {
        current = (current + 1) % slides.length;
        show(current);
      }, 5000);
    }
  }

  /* -------------------------------------------------------------------- */
  /* Stats counter — animates numbers up when section enters viewport     */
  /* -------------------------------------------------------------------- */
  function initStatsCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-counter"), 10) || 0;
      var suffix = el.getAttribute("data-counter-suffix") || "";
      var duration = 1800;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }
      window.requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* -------------------------------------------------------------------- */
  /* Testimonials carousel — auto-sliding, with dot nav                   */
  /* -------------------------------------------------------------------- */
  function initTestimonials() {
    var track = document.querySelector(".testimonial-track");
    var dotsWrap = document.querySelector(".testimonial-dots");
    if (!track) return;

    var slides = track.querySelectorAll(".testimonial-slide");
    var index = 0;
    var timer = null;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".testimonial-dot").forEach(function (dot, di) {
          dot.classList.toggle("is-active", di === index);
        });
      }
    }

    function next() { goTo(index + 1); }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.className = "testimonial-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i);
          restart();
        });
        dotsWrap.appendChild(dot);
      });
    }

    var prevBtn = document.querySelector(".testimonial-prev");
    var nextBtn = document.querySelector(".testimonial-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); restart(); });

    goTo(0);
    restart();
  }

  /* -------------------------------------------------------------------- */
  /* Page transition fade — fade out on internal link click, fade in on   */
  /* load, tracked via sessionStorage so it only runs on navigation.      */
  /* -------------------------------------------------------------------- */
  function initPageTransitions() {
    document.body.classList.add("fade-in-page");

    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      link.addEventListener("click", function (e) {
        if (link.target === "_blank") return;
        e.preventDefault();
        sessionStorage.setItem("bnrPageTransition", "1");
        document.body.classList.add("is-transitioning");
        setTimeout(function () {
          window.location.href = href;
        }, 350);
      });
    });
  }

  /* -------------------------------------------------------------------- */
  /* Footer year                                                          */
  /* -------------------------------------------------------------------- */
  function setFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------------- */
  /* Active nav link based on current page                                */
  /* -------------------------------------------------------------------- */
  function markActiveNavLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(function (link) {
      var linkPath = link.getAttribute("href");
      if (linkPath === path || (path === "" && linkPath === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStickyNav();
    initMobileMenu();
    initHeroCarousel();
    initStatsCounters();
    initTestimonials();
    initPageTransitions();
    setFooterYear();
    markActiveNavLink();
  });
})();
