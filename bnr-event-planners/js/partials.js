/* ==========================================================================
   BNR Event Planners — shared header / footer / preloader / mobile-nav
   Injected via JS so markup isn't duplicated across every page.
   ========================================================================== */

(function () {
  var NAV_LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "services.html", label: "Services", key: "services" },
    { href: "gallery.html", label: "Gallery", key: "gallery" },
    { href: "about.html", label: "About", key: "about" },
    { href: "team.html", label: "Our Team", key: "team" },
    { href: "testimonials.html", label: "Testimonials", key: "testimonials" },
  ];

  function navHTML(activeKey, cls) {
    var links = NAV_LINKS.map(function (l) {
      var active = l.key === activeKey ? " active" : "";
      return '<a href="' + l.href + '" class="' + cls + active + '">' + l.label + "</a>";
    }).join("");
    var enquireCls = (cls === "" ? "nav-cta" : "") + (activeKey === "enquire" ? " active" : "");
    return links + '<a href="enquire.html" class="' + enquireCls + '">Enquire</a>';
  }

  function headerHTML(activeKey) {
    return (
      '<div class="header-inner">' +
        '<a href="index.html" class="brand-logo">' +
          '<span class="brand-mark">BNR</span>' +
          '<span class="brand-sub">Event Planners &middot; Chennai</span>' +
        "</a>" +
        '<nav class="main-nav">' + navHTML(activeKey, "") + "</nav>" +
      "</div>" +
      '<button class="nav-toggle" id="navToggle" aria-label="Open menu"><span></span><span></span><span></span></button>'
    );
  }

  function mobileNavHTML(activeKey) {
    return (
      '<button class="close-mobile" id="mobileNavClose" aria-label="Close menu">&times;</button>' +
      navHTML(activeKey, "")
    );
  }

  function preloaderHTML() {
    return (
      '<div class="preloader-mark">BNR</div>' +
      '<div class="preloader-bar"><span></span></div>'
    );
  }

  function curtainHTML() {
    return '<div class="curtain-panel"></div><div class="curtain-panel"></div>';
  }

  function footerHTML() {
    var c = window.BNR_CONFIG || {};
    return (
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<span class="brand-mark">' + (c.brandFull || "BNR Event Planners") + "</span>" +
            "<p>Crafting South Indian celebrations rooted in tradition &mdash; muhurtham to reception &mdash; with editorial elegance and old-money restraint.</p>" +
            '<div class="footer-social">' +
              '<a href="' + (c.instagram || "#") + '" aria-label="Instagram" target="_blank" rel="noopener">IG</a>' +
              '<a href="' + (c.facebook || "#") + '" aria-label="Facebook" target="_blank" rel="noopener">FB</a>' +
            "</div>" +
          "</div>" +
          '<div class="footer-col"><h4>Explore</h4><ul>' +
            '<li><a href="about.html">About Us</a></li>' +
            '<li><a href="services.html">Services</a></li>' +
            '<li><a href="gallery.html">Gallery</a></li>' +
            '<li><a href="team.html">Our Team</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Company</h4><ul>' +
            '<li><a href="testimonials.html">Testimonials</a></li>' +
            '<li><a href="enquire.html">Enquire</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Reach Us</h4><ul>' +
            '<li>' + (c.addressLine1 || "") + "</li>" +
            '<li>' + (c.addressLine2 || "") + "</li>" +
            '<li><a href="tel:' + (c.phoneDisplay || "").replace(/\s/g, "") + '">' + (c.phoneDisplay || "") + "</a></li>" +
            '<li><a href="mailto:' + (c.email || "") + '">' + (c.email || "") + "</a></li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + " " + (c.brandFull || "BNR Event Planners") + '. All rights reserved.</span>' +
          '<span>Crafted with silk, gold &amp; jasmine.</span>' +
        "</div>" +
      "</div>"
    );
  }

  function waFloatHTML() {
    var c = window.BNR_CONFIG || {};
    var msg = encodeURIComponent("Vanakkam! I'd like to enquire about planning an event with BNR Event Planners.");
    return '<a class="wa-float" href="https://wa.me/' + (c.whatsappNumber || "") + "?text=" + msg + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">&#9742;</a>';
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  var page = document.body.getAttribute("data-page") || "home";

  mount("preloader-inner", preloaderHTML());
  mount("curtain-inner", curtainHTML());
  mount("header-inner-mount", headerHTML(page));
  mount("mobile-nav-inner", mobileNavHTML(page));
  mount("wa-float-root", waFloatHTML());
  mount("footer-root", footerHTML());
})();
