/* ============================================================
   Uncodemy — Laravel Course Hub
   Shared script — identical across all topic pages
   Edit CONFIG below to update every page site-wide.
   ============================================================ */

const CONFIG = {
  landingPageUrl: "https://uncodemy.com",
  counselorPhone: "+91-9876543210",
  whatsappLink: "https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20the%20Laravel%20course%20at%20Uncodemy",
  countdownDays: 7 // duration (in days) of each fresh countdown cycle
};

(function () {
  "use strict";

  const STORAGE_KEY = "uncodemy_batch_countdown_end";

  /* ---------- Wire landing page links ---------- */
  document.querySelectorAll("[data-landing-btn]").forEach(function (el) {
    if (el.tagName === "A") {
      el.setAttribute("href", CONFIG.landingPageUrl);
    }
  });

  /* ---------- Wire phone links ---------- */
  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.setAttribute("href", "tel:" + CONFIG.counselorPhone.replace(/[^+\d]/g, ""));
  });
  document.querySelectorAll("[data-phone-text]").forEach(function (el) {
    el.textContent = CONFIG.counselorPhone;
  });

  /* ---------- Wire WhatsApp links ---------- */
  document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
    el.setAttribute("href", CONFIG.whatsappLink);
  });

  /* ---------- Countdown timer (persists across reloads via localStorage) ---------- */
  function getCountdownEnd() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (stored) {
      const end = parseInt(stored, 10);
      if (!isNaN(end) && end > now) {
        return end;
      }
    }

    // No valid stored end timestamp, or it has already passed — start a fresh cycle
    const freshEnd = now + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(freshEnd));
    return freshEnd;
  }

  let countdownEnd = getCountdownEnd();

  const daysEls = document.querySelectorAll("[data-cd-days]");
  const hoursEls = document.querySelectorAll("[data-cd-hours]");
  const minsEls = document.querySelectorAll("[data-cd-mins]");
  const secsEls = document.querySelectorAll("[data-cd-secs]");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderCountdown() {
    const now = Date.now();
    let remaining = countdownEnd - now;

    if (remaining <= 0) {
      // Cycle finished — auto-reset to a new full cycle
      countdownEnd = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(countdownEnd));
      remaining = countdownEnd - Date.now();
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    daysEls.forEach(function (el) { el.textContent = pad(days); });
    hoursEls.forEach(function (el) { el.textContent = pad(hours); });
    minsEls.forEach(function (el) { el.textContent = pad(mins); });
    secsEls.forEach(function (el) { el.textContent = pad(secs); });
  }

  if (daysEls.length || hoursEls.length || minsEls.length || secsEls.length) {
    renderCountdown();
    setInterval(renderCountdown, 1000);
  }

  /* ---------- Auto-scroll left sidebar so active topic is centered ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    const activeLink = document.querySelector(".topic-nav a.active");
    const sidebar = document.querySelector(".sidebar-left");

    if (activeLink && sidebar) {
      const sidebarHeight = sidebar.clientHeight;
      const linkOffsetTop = activeLink.offsetTop;
      const linkHeight = activeLink.clientHeight;

      sidebar.scrollTop = linkOffsetTop - sidebarHeight / 2 + linkHeight / 2;
    }
  });
})();
