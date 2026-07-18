/* ==========================================================================
   BNR Event Planners — motion & interaction
   GSAP + ScrollTrigger for reveals/parallax; vanilla JS for nav, filters,
   slider, counters, tilt cards, lightbox and the enquiry form.
   ========================================================================== */

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initHeaderScroll();
    initMobileNav();
    initReveals();
    initBlobs();
    initTiltCards();
    initCounters();
    initTestimonialSlider();
    initGalleryFilter();
    initLightbox();
    initEnquireForm();
    initFilterBar("filter-bar-team");
  });

  /* ---------- Preloader + curtain reveal ---------- */
  function initPreloader() {
    var preloader = document.getElementById("preloader");
    var curtain = document.getElementById("curtain");
    if (!preloader) return;

    if (reduceMotion || !hasGSAP) {
      preloader.style.display = "none";
      if (curtain) curtain.style.display = "none";
      document.body.classList.add("loaded");
      return;
    }

    var barSpan = preloader.querySelector(".preloader-bar");
    var tl = gsap.timeline();
    tl.to(preloader.querySelector(".preloader-mark"), { opacity: 1, duration: 0.6, ease: "power2.out" });

    var fill = document.createElement("span");
    fill.style.cssText = "position:absolute;left:0;top:0;bottom:0;width:0%;background:var(--gold, #C9A45C);";
    barSpan.style.position = "relative";
    barSpan.appendChild(fill);
    gsap.to(fill, { width: "100%", duration: 1.2, ease: "power2.inOut", delay: 0.2 });

    tl.to(preloader, {
      opacity: 0, duration: 0.5, delay: 0.6, ease: "power2.inOut",
      onComplete: function () { preloader.style.display = "none"; }
    });

    if (curtain) {
      var panels = curtain.querySelectorAll(".curtain-panel");
      gsap.to(panels[0], { xPercent: -100, duration: 0.9, delay: 1.2, ease: "power4.inOut" });
      gsap.to(panels[1], {
        xPercent: 100, duration: 0.9, delay: 1.2, ease: "power4.inOut",
        onComplete: function () { curtain.style.display = "none"; document.body.classList.add("loaded"); playHeroIntro(); }
      });
    } else {
      document.body.classList.add("loaded");
      playHeroIntro();
    }
  }

  function playHeroIntro() {
    if (!hasGSAP) return;
    var items = document.querySelectorAll(".hero-content .reveal");
    if (items.length) {
      gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
    }
  }

  /* ---------- Sticky compact header ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var darkSections = document.querySelectorAll(".hero, .section-dark, .page-header");
    function update() {
      var y = window.scrollY;
      header.classList.toggle("compact", y > 80);
      header.classList.toggle("scrolled", y > 20);
      var headerRect = header.getBoundingClientRect();
      var overDark = false;
      darkSections.forEach(function (sec) {
        var r = sec.getBoundingClientRect();
        if (r.top < headerRect.height && r.bottom > 0) overDark = true;
      });
      header.classList.toggle("dark-mode", overDark && y < window.innerHeight * 1.2);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("#navToggle")) {
        document.getElementById("mobileNavPanel").classList.add("open");
      }
      if (e.target.closest("#mobileNavClose") || (e.target.tagName === "A" && e.target.closest("#mobileNavPanel"))) {
        document.getElementById("mobileNavPanel").classList.remove("open");
      }
    });
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    var els = Array.prototype.filter.call(document.querySelectorAll(".reveal"), function (el) {
      return !el.closest(".hero-content");
    });
    if (!els.length) return;
    if (reduceMotion || !hasGSAP) {
      els.forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    els.forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  /* ---------- Floating / morphing blobs ---------- */
  function initBlobs() {
    var blobs = document.querySelectorAll(".blob");
    if (!blobs.length || reduceMotion || !hasGSAP) return;
    blobs.forEach(function (b, i) {
      gsap.to(b, {
        y: i % 2 === 0 ? 30 : -30,
        x: i % 2 === 0 ? -18 : 18,
        borderRadius: "60% 40% 50% 50% / 45% 55% 45% 55%",
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }

  /* ---------- 3D tilt cards ---------- */
  function initTiltCards() {
    var cards = document.querySelectorAll(".tilt-card");
    if (!cards.length || reduceMotion) return;
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(700px) rotateY(" + (px * 8) + "deg) rotateX(" + (-py * 8) + "deg) translateY(-6px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var obj = { val: 0 };
      var run = function () {
        if (hasGSAP && !reduceMotion) {
          gsap.to(obj, {
            val: target, duration: 1.8, ease: "power2.out",
            onUpdate: function () { el.textContent = Math.round(obj.val); }
          });
        } else {
          el.textContent = target;
        }
      };
      if (hasGSAP) {
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: run });
      } else {
        run();
      }
    });
  }

  /* ---------- Testimonial slider (bouncy) ---------- */
  function initTestimonialSlider() {
    var slides = document.querySelectorAll(".t-slide");
    var dots = document.querySelectorAll(".t-dots button");
    if (!slides.length) return;
    var idx = 0;
    function show(i) {
      slides.forEach(function (s, n) { s.classList.toggle("active", n === i); });
      dots.forEach(function (d, n) { d.classList.toggle("active", n === i); });
      idx = i;
    }
    dots.forEach(function (d, n) { d.addEventListener("click", function () { show(n); }); });
    setInterval(function () { show((idx + 1) % slides.length); }, 6000);
  }

  /* ---------- Gallery filter (Gallery page) ---------- */
  function initGalleryFilter() {
    var bar = document.getElementById("galleryFilterBar");
    var items = document.querySelectorAll(".gallery-grid .gallery-item");
    if (!bar || !items.length) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      items.forEach(function (item) {
        var match = cat === "all" || item.getAttribute("data-category") === cat;
        if (hasGSAP && !reduceMotion) {
          gsap.to(item, {
            opacity: match ? 1 : 0, scale: match ? 1 : 0.9, duration: 0.4, ease: "power2.out",
            onStart: function () { if (match) item.style.display = ""; },
            onComplete: function () { if (!match) item.style.display = "none"; }
          });
        } else {
          item.style.display = match ? "" : "none";
        }
      });
    });
  }

  /* generic pill filter bar (e.g. team departments) — no-op if absent */
  function initFilterBar(id) {
    var bar = document.getElementById(id);
    if (!bar) return;
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var items = document.querySelectorAll("[data-lightbox]");
    if (!items.length) return;
    var overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(22,36,26,0.92);z-index:800;display:none;align-items:center;justify-content:center;flex-direction:column;padding:40px;";
    overlay.innerHTML = '<img style="max-width:88vw;max-height:78vh;object-fit:contain;border:1px solid #C9A45C;" src="" alt=""><div class="lightbox-caption" style="color:#F7F4EC;font-family:\'Cormorant Garamond\',serif;font-size:1.3rem;margin-top:20px;"></div><button aria-label="Close" style="position:absolute;top:28px;right:32px;color:#E1C588;font-size:2rem;background:none;border:none;cursor:pointer;">&times;</button>';
    document.body.appendChild(overlay);
    var img = overlay.querySelector("img");
    var cap = overlay.querySelector(".lightbox-caption");

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var src = item.querySelector("img").getAttribute("src");
        var label = item.getAttribute("data-caption") || "";
        img.setAttribute("src", src);
        cap.textContent = label;
        overlay.style.display = "flex";
      });
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.tagName === "BUTTON") overlay.style.display = "none";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") overlay.style.display = "none";
    });
  }

  /* ---------- Enquiry form → WhatsApp + mailto ---------- */
  function initEnquireForm() {
    var form = document.getElementById("inquiryForm");
    if (!form) return;
    var status = document.getElementById("formStatus");
    var cfg = window.BNR_CONFIG || {};

    function buildMessage(data) {
      return "Vanakkam BNR Event Planners! I would like to enquire about an event.\n\n" +
        "Name: " + data.name + "\n" +
        "Event Type: " + data.eventType + "\n" +
        "Preferred Date: " + data.eventDate + "\n" +
        "Venue City: " + data.venueCity + "\n" +
        "Guest Count: " + data.guestCount + "\n" +
        "Budget: " + data.budget + "\n" +
        "Message: " + data.message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var data = {
        name: fd.get("name") || "",
        eventType: fd.get("eventType") || "",
        eventDate: fd.get("eventDate") || "",
        venueCity: fd.get("venueCity") || "",
        guestCount: fd.get("guestCount") || "",
        budget: fd.get("budget") || "",
        message: fd.get("message") || "",
      };
      var msg = encodeURIComponent(buildMessage(data));
      var waUrl = "https://wa.me/" + (cfg.whatsappNumber || "") + "?text=" + msg;
      var mailUrl = "mailto:" + (cfg.email || "") + "?subject=" + encodeURIComponent("Event Enquiry — " + data.name) + "&body=" + msg;

      var action = form.dataset.action;
      if (action === "email") {
        window.location.href = mailUrl;
      } else {
        window.open(waUrl, "_blank", "noopener");
      }
      if (status) {
        status.textContent = "Thank you, " + (data.name || "friend") + " — your enquiry is on its way. We'll respond within 24 hours.";
      }
    });

    var mailBtn = document.getElementById("sendEmailBtn");
    if (mailBtn) {
      mailBtn.addEventListener("click", function () {
        form.dataset.action = "email";
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
    }
    var waBtn = document.getElementById("sendWaBtn");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        form.dataset.action = "whatsapp";
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
    }
  }
})();
