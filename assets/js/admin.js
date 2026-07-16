/**
 * BNR Event Planners — admin.js
 * MVP password gate (NOT secure — see SETUP.md) + Supabase table of
 * contact submissions with a "Mark as Reviewed" toggle.
 */

(function () {
  "use strict";

  var supabaseClient = null;

  function getClient() {
    if (supabaseClient) return supabaseClient;
    var cfg = window.BNR_CONFIG || {};
    if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.indexOf("YOUR_") === 0) return null;
    if (typeof window.supabase === "undefined") return null;
    supabaseClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    return supabaseClient;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function formatDate(value) {
    if (!value) return "—";
    var d = new Date(value);
    if (isNaN(d.getTime())) return escapeHtml(value);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function formatDateTime(value) {
    if (!value) return "—";
    var d = new Date(value);
    if (isNaN(d.getTime())) return escapeHtml(value);
    return d.toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  /* -------------------------------------------------------------------- */
  /* Password gate                                                        */
  /* -------------------------------------------------------------------- */
  function initAuthGate() {
    var gate = document.getElementById("adminGate");
    var panel = document.getElementById("adminPanel");
    var form = document.getElementById("adminLoginForm");
    var errorEl = document.getElementById("adminLoginError");
    if (!gate || !panel || !form) return;

    function unlock() {
      gate.classList.add("hidden");
      panel.classList.remove("hidden");
      sessionStorage.setItem("bnrAdminAuthed", "1");
      loadSubmissions();
    }

    if (sessionStorage.getItem("bnrAdminAuthed") === "1") {
      unlock();
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("adminPassword");
      var cfg = window.BNR_CONFIG || {};
      if (input.value === cfg.ADMIN_PASSWORD) {
        errorEl.textContent = "";
        unlock();
      } else {
        errorEl.textContent = "Incorrect password. Please try again.";
        input.value = "";
        input.focus();
      }
    });
  }

  /* -------------------------------------------------------------------- */
  /* Table rendering                                                      */
  /* -------------------------------------------------------------------- */
  function renderRows(rows) {
    var tbody = document.getElementById("submissionsBody");
    var emptyState = document.getElementById("submissionsEmpty");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!rows.length) {
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + escapeHtml(row.name) + "</td>" +
        '<td><a class="underline" href="mailto:' + encodeURIComponent(row.email) + '">' + escapeHtml(row.email) + "</a></td>" +
        '<td><a class="underline" href="tel:' + encodeURIComponent(row.phone) + '">' + escapeHtml(row.phone) + "</a></td>" +
        "<td>" + escapeHtml(row.event_type) + "</td>" +
        "<td>" + formatDate(row.event_date) + "</td>" +
        '<td class="max-w-xs whitespace-pre-wrap">' + escapeHtml(row.message) + "</td>" +
        "<td>" + formatDateTime(row.created_at) + "</td>" +
        '<td><span class="' + (row.reviewed ? "badge-reviewed" : "badge-pending") + '">' +
          (row.reviewed ? "Reviewed" : "Pending") + "</span></td>" +
        '<td><button class="btn btn-outline-maroon" data-toggle-reviewed="' + row.id + '" data-current="' + !!row.reviewed + '">' +
          (row.reviewed ? "Mark Unreviewed" : "Mark Reviewed") + "</button></td>";
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll("[data-toggle-reviewed]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleReviewed(btn);
      });
    });
  }

  function toggleReviewed(btn) {
    var client = getClient();
    if (!client) return;

    var id = btn.getAttribute("data-toggle-reviewed");
    var current = btn.getAttribute("data-current") === "true";
    var next = !current;

    btn.disabled = true;
    client
      .from("contact_submissions")
      .update({ reviewed: next })
      .eq("id", id)
      .then(function (response) {
        btn.disabled = false;
        if (response.error) {
          console.error("BNR: failed to update reviewed status", response.error);
          alert("Could not update this row. Please try again.");
          return;
        }
        loadSubmissions();
      });
  }

  /* -------------------------------------------------------------------- */
  /* Data loading                                                         */
  /* -------------------------------------------------------------------- */
  function loadSubmissions() {
    var status = document.getElementById("submissionsStatus");
    var client = getClient();

    if (!client) {
      if (status) {
        status.textContent = "Supabase is not configured yet. Add your project URL and anon key to config.js.";
      }
      renderRows([]);
      return;
    }

    if (status) status.textContent = "Loading submissions...";

    client
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .then(function (response) {
        if (response.error) {
          console.error("BNR: failed to load submissions", response.error);
          if (status) status.textContent = "Could not load submissions: " + response.error.message;
          return;
        }
        if (status) status.textContent = response.data.length + " submission(s)";
        renderRows(response.data || []);
      });
  }

  function initRefreshButton() {
    var btn = document.getElementById("refreshSubmissions");
    if (btn) btn.addEventListener("click", loadSubmissions);
  }

  function initLogout() {
    var btn = document.getElementById("adminLogout");
    if (!btn) return;
    btn.addEventListener("click", function () {
      sessionStorage.removeItem("bnrAdminAuthed");
      window.location.reload();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAuthGate();
    initRefreshButton();
    initLogout();
  });
})();
