/* ===== Uncodemy Course Hub — Shared Behaviour ===== */
(function () {
  "use strict";

  // ---- SINGLE SOURCE OF TRUTH: edit these to update every page site-wide ----
  const CONFIG = {
    landingPageUrl: "https://uncodemy.com",
    counselorPhone: "+919876543210",
    whatsappLink: "https://wa.me/919876543210?text=Hi%20Uncodemy%2C%20I%27m%20interested%20in%20the%20WordPress%20Training%20Course",
    countdownDays: 5, // duration of each countdown cycle, in days
    storageKey: "uncodemy_batch_countdown_end"
  };

  document.addEventListener("DOMContentLoaded", function () {
    wireLandingButtons();
    wirePhoneLinks();
    wireWhatsappLinks();
    initCountdown();
    centerActiveSidebarItem();
  });

  function wireLandingButtons() {
    document.querySelectorAll("[data-landing-btn]").forEach(function (el) {
      el.setAttribute("href", CONFIG.landingPageUrl);
    });
  }

  function wirePhoneLinks() {
    document.querySelectorAll("[data-phone-link]").forEach(function (el) {
      el.setAttribute("href", "tel:" + CONFIG.counselorPhone);
    });
    document.querySelectorAll("[data-phone-text]").forEach(function (el) {
      el.textContent = CONFIG.counselorPhone;
    });
  }

  function wireWhatsappLinks() {
    document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
      el.setAttribute("href", CONFIG.whatsappLink);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  // ---- Countdown timer (persists via localStorage end-timestamp) ----
  function initCountdown() {
    const dayEls = document.querySelectorAll("[data-cd-days]");
    const hourEls = document.querySelectorAll("[data-cd-hours]");
    const minEls = document.querySelectorAll("[data-cd-mins]");
    const secEls = document.querySelectorAll("[data-cd-secs]");

    if (!dayEls.length && !hourEls.length && !minEls.length && !secEls.length) return;

    let endTime = getStoredEndTime();
    if (!endTime || endTime <= Date.now()) {
      endTime = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
      storeEndTime(endTime);
    }

    tick();
    setInterval(tick, 1000);

    function tick() {
      let remaining = endTime - Date.now();
      if (remaining <= 0) {
        endTime = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
        storeEndTime(endTime);
        remaining = endTime - Date.now();
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((remaining / (1000 * 60)) % 60);
      const secs = Math.floor((remaining / 1000) % 60);

      setAll(dayEls, pad(days));
      setAll(hourEls, pad(hours));
      setAll(minEls, pad(mins));
      setAll(secEls, pad(secs));
    }
  }

  function setAll(nodeList, value) {
    nodeList.forEach(function (el) {
      el.textContent = value;
    });
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function getStoredEndTime() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKey);
      return raw ? parseInt(raw, 10) : null;
    } catch (e) {
      return null;
    }
  }

  function storeEndTime(ts) {
    try {
      localStorage.setItem(CONFIG.storageKey, String(ts));
    } catch (e) {
      /* localStorage unavailable — countdown will simply reset on reload */
    }
  }

  // ---- Auto-scroll left sidebar so active topic is centered ----
  function centerActiveSidebarItem() {
    const sidebar = document.querySelector(".sidebar-left");
    const active = document.querySelector(".topic-list li a.active");
    if (!sidebar || !active) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const offset =
      activeRect.top -
      sidebarRect.top -
      sidebar.clientHeight / 2 +
      activeRect.height / 2;

    sidebar.scrollTop += offset;
  }
})();
