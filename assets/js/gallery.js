/**
 * BNR Event Planners — gallery.js
 * Category filtering (with smooth opacity+scale transition) and a
 * dependency-free lightbox for the gallery page.
 */

(function () {
  "use strict";

  function initGalleryFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".gallery-item");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        items.forEach(function (item) {
          var category = item.getAttribute("data-category");
          var show = filter === "all" || category === filter;

          if (show) {
            item.classList.remove("is-hidden");
            item.style.opacity = "0";
            item.style.transform = "scale(0.92)";
            requestAnimationFrame(function () {
              item.style.transition = "opacity 0.45s ease, transform 0.45s ease";
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            });
          } else {
            item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            item.style.opacity = "0";
            item.style.transform = "scale(0.92)";
            setTimeout(function () {
              item.classList.add("is-hidden");
            }, 300);
          }
        });
      });
    });
  }

  /* -------------------------------------------------------------------- */
  /* Lightbox                                                              */
  /* -------------------------------------------------------------------- */
  function initLightbox() {
    var lightbox = document.querySelector(".lightbox");
    if (!lightbox) return;

    var imgEl = lightbox.querySelector("img");
    var captionEl = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");

    var visibleItems = [];
    var currentIndex = 0;

    function collectVisible() {
      visibleItems = Array.prototype.slice.call(
        document.querySelectorAll(".gallery-item:not(.is-hidden)")
      );
    }

    function open(item) {
      collectVisible();
      currentIndex = visibleItems.indexOf(item);
      render();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function render() {
      if (!visibleItems.length) return;
      var item = visibleItems[currentIndex];
      var imgEl2 = item.querySelector("img");
      var fullSrc = item.getAttribute("data-full") || imgEl2.getAttribute("data-full") || imgEl2.src;
      var caption = item.getAttribute("data-caption") || "";
      imgEl.src = fullSrc;
      imgEl.alt = caption;
      if (captionEl) captionEl.textContent = caption;
    }

    function step(delta) {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + delta + visibleItems.length) % visibleItems.length;
      render();
    }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () { open(item); });
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(item);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGalleryFilter();
    initLightbox();
  });
})();
