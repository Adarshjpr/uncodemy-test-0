/* =========================================================
   Uncodemy — Jira Course Content Pages
   Shared script: editable config + live countdown timer
   ========================================================= */

/* ---------- EDITABLE CONFIG ---------- */
// Paste your landing page URL here. All CTA buttons use this.
var landingPageURL = "https://uncodemy.com/";

// Counselor contact — editable placeholders
var counselorPhone = "+91 9818366550";
var counselorWhatsAppLink = "https://api.whatsapp.com/send?phone=918800023723";

// Upcoming batch details — editable
var upcomingBatch = {
  courseName: "Jira",
  nextBatchStarts: "Editable: Add Batch Start Date",
  duration: "Editable: Add Batch Duration"
};

/* ---------- Wire up config-driven elements ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // Landing page CTA buttons
  document.querySelectorAll("[data-landing-cta]").forEach(function (btn) {
    btn.href = landingPageURL;
  });

  // Counselor phone + WhatsApp
  document.querySelectorAll("[data-counselor-phone]").forEach(function (el) {
    el.textContent = counselorPhone;
    el.href = "tel:" + counselorPhone.replace(/\s+/g, "");
  });
  document.querySelectorAll("[data-counselor-whatsapp]").forEach(function (el) {
    el.href = counselorWhatsAppLink;
  });

  // Batch meta
  document.querySelectorAll("[data-batch-course]").forEach(function (el) {
    el.textContent = upcomingBatch.courseName;
  });
  document.querySelectorAll("[data-batch-start]").forEach(function (el) {
    el.textContent = upcomingBatch.nextBatchStarts;
  });
  document.querySelectorAll("[data-batch-duration]").forEach(function (el) {
    el.textContent = upcomingBatch.duration;
  });

  initCountdown();
});

/* ---------- Live countdown timer (persists across reloads) ---------- */
function initCountdown() {
  var STORAGE_KEY = "uncodemy_batch_countdown_deadline";
  var FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

  var deadline = localStorage.getItem(STORAGE_KEY);
  if (!deadline) {
    deadline = Date.now() + FIVE_DAYS_MS;
    localStorage.setItem(STORAGE_KEY, deadline);
  } else {
    deadline = parseInt(deadline, 10);
  }

  var daysEl = document.querySelector("[data-cd-days]");
  var hoursEl = document.querySelector("[data-cd-hours]");
  var minsEl = document.querySelector("[data-cd-mins]");
  var secsEl = document.querySelector("[data-cd-secs]");

  if (!daysEl) return; // countdown markup not on this page

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var remaining = deadline - Date.now();

    if (remaining <= 0) {
      // Batch window elapsed — reset for the next 5-day cycle
      deadline = Date.now() + FIVE_DAYS_MS;
      localStorage.setItem(STORAGE_KEY, deadline);
      remaining = FIVE_DAYS_MS;
    }

    var days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    var hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    var secs = Math.floor((remaining % (60 * 1000)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}


function keepActiveTopicVisible() {
  const activeLink = document.querySelector('.sidebar-left a.active');
  const sidebar = document.querySelector('.sidebar-left');
  if (!activeLink || !sidebar) return;

  const linkTop = activeLink.offsetTop;
  const sidebarHeight = sidebar.clientHeight;
  sidebar.scrollTop = linkTop - sidebarHeight / 2;
}

document.addEventListener('DOMContentLoaded', keepActiveTopicVisible);
