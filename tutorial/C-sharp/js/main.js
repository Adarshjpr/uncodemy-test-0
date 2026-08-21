/* =========================================================
   Uncodemy Course Content Pages — Script
   Editable configuration lives at the top of this file.
   ========================================================= */

/* ---------------------------------------------------------
   EDITABLE CONFIG
   Paste your landing page URL, phone number and WhatsApp
   link here — nothing else in the code needs to change.
   --------------------------------------------------------- */
const landingPageURL = "https://uncodemy.com/course/data-science-training-course-in-noida";
const counselorPhoneNumber = "+91 9818366550";
const whatsappLink = "https://api.whatsapp.com/send?phone=918800023723";

/* Countdown duration in days (only used the very first time
   a visitor lands on any of these pages — after that the
   original deadline is remembered so the timer keeps
   counting down correctly across reloads). */
const COUNTDOWN_DAYS = 5;
const COUNTDOWN_STORAGE_KEY = "uncodemy_batch_countdown_deadline";

/* ---------------------------------------------------------
   Populate CTA button + help card details
   --------------------------------------------------------- */
function initCtaAndHelp() {
  document.querySelectorAll("[data-landing-cta]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.location.href = landingPageURL;
    });
  });

  document.querySelectorAll("[data-phone-display]").forEach(function (el) {
    el.textContent = counselorPhoneNumber;
  });
  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.setAttribute("href", "tel:" + counselorPhoneNumber.replace(/\s+/g, ""));
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
    el.setAttribute("href", whatsappLink);
  });
}

/* ---------------------------------------------------------
   Countdown timer — persists across reloads via localStorage
   --------------------------------------------------------- */
function initCountdown() {
  const els = {
    days: document.querySelector("[data-cd-days]"),
    hours: document.querySelector("[data-cd-hours]"),
    minutes: document.querySelector("[data-cd-minutes]"),
    seconds: document.querySelector("[data-cd-seconds]"),
  };
  if (!els.days) return;

  let deadline = parseInt(localStorage.getItem(COUNTDOWN_STORAGE_KEY), 10);

  if (!deadline || isNaN(deadline) || deadline < Date.now()) {
    deadline = Date.now() + COUNTDOWN_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(deadline));
  }

  function tick() {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.minutes.textContent = "00";
      els.seconds.textContent = "00";
      clearInterval(timerId);
      return;
    }

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / (1000 * 60)) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    els.days.textContent = String(d).padStart(2, "0");
    els.hours.textContent = String(h).padStart(2, "0");
    els.minutes.textContent = String(m).padStart(2, "0");
    els.seconds.textContent = String(s).padStart(2, "0");
  }

  tick();
  const timerId = setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  initCtaAndHelp();
  initCountdown();
});
