/**
 * BNR Event Planners — contact.js
 * Client-side validation + Supabase insert for the contact form.
 * Requires config.js (window.BNR_CONFIG) and the Supabase JS SDK to be
 * loaded via CDN before this file.
 */

(function () {
  "use strict";

  var supabaseClient = null;

  function getClient() {
    if (supabaseClient) return supabaseClient;
    var cfg = window.BNR_CONFIG || {};
    if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.indexOf("YOUR_") === 0) {
      return null;
    }
    if (typeof window.supabase === "undefined") {
      return null;
    }
    supabaseClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    return supabaseClient;
  }

  var validators = {
    name: function (value) {
      if (!value.trim()) return "Please enter your full name.";
      if (value.trim().length < 2) return "Name looks too short.";
      return "";
    },
    email: function (value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Please enter your email.";
      if (!re.test(value.trim())) return "Please enter a valid email address.";
      return "";
    },
    phone: function (value) {
      var re = /^[+]?[\d\s()-]{7,15}$/;
      if (!value.trim()) return "Please enter your phone number.";
      if (!re.test(value.trim())) return "Please enter a valid phone number.";
      return "";
    },
    eventType: function (value) {
      if (!value) return "Please select an event type.";
      return "";
    },
    eventDate: function (value) {
      if (!value) return "Please choose a preferred event date.";
      return "";
    },
    message: function (value) {
      if (!value.trim()) return "Tell us a little about your event.";
      if (value.trim().length < 10) return "Please add a few more details (10+ characters).";
      return "";
    },
  };

  function showFieldError(field, message) {
    var input = document.getElementById(field);
    var errorEl = document.querySelector('[data-error-for="' + field + '"]');
    if (input) input.classList.toggle("is-invalid", !!message);
    if (errorEl) errorEl.textContent = message;
  }

  function validateForm(form) {
    var fields = ["name", "email", "phone", "eventType", "eventDate", "message"];
    var isValid = true;
    var values = {};

    fields.forEach(function (field) {
      var input = form.elements[field];
      var value = input ? input.value : "";
      values[field] = value;
      var error = validators[field](value);
      showFieldError(field, error);
      if (error) isValid = false;
    });

    return { isValid: isValid, values: values };
  }

  function showToast(message, isError) {
    var toast = document.querySelector(".toast");
    if (!toast) return;
    toast.querySelector(".toast-message").textContent = message;
    toast.classList.toggle("toast-error", !!isError);
    toast.classList.add("is-visible");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 5000);
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var result = validateForm(form);
      if (!result.isValid) {
        showToast("Please fix the highlighted fields and try again.", true);
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var payload = {
        name: result.values.name.trim(),
        email: result.values.email.trim(),
        phone: result.values.phone.trim(),
        event_type: result.values.eventType,
        event_date: result.values.eventDate,
        message: result.values.message.trim(),
        reviewed: false,
      };

      var client = getClient();

      if (!client) {
        // Supabase not configured yet — surface a clear message instead of
        // failing silently, so this is obvious during local development.
        console.warn("BNR: Supabase is not configured. Update config.js with your project URL and anon key.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        showToast("Form is not connected yet. Please configure Supabase in config.js.", true);
        return;
      }

      client
        .from("contact_submissions")
        .insert([payload])
        .then(function (response) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;

          if (response.error) {
            console.error("BNR: Supabase insert error", response.error);
            showToast("Something went wrong. Please call or email us directly.", true);
            return;
          }

          showToast("Thank you! Your enquiry has been sent — we'll be in touch within 24 hours.", false);
          form.reset();
          ["name", "email", "phone", "eventType", "eventDate", "message"].forEach(function (field) {
            showFieldError(field, "");
          });
        })
        .catch(function (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          console.error("BNR: Supabase request failed", err);
          showToast("Network error. Please try again in a moment.", true);
        });
    });

    // Live-clear errors as the user fixes fields
    Object.keys(validators).forEach(function (field) {
      var input = form.elements[field];
      if (!input) return;
      input.addEventListener("blur", function () {
        showFieldError(field, validators[field](input.value));
      });
      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          showFieldError(field, validators[field](input.value));
        }
      });
    });

    // Prevent picking a past event date
    var dateInput = form.elements.eventDate;
    if (dateInput) {
      var today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }
  }

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
