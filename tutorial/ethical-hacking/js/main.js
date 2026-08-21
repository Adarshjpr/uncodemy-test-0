/* ==========================================================================
   Uncodemy Course Content Pages — Shared Script
   Editable configuration lives at the top of this file.
   ========================================================================== */

/* ---------- EDITABLE CONFIG ---------- */
const CONFIG = {
  // Paste your final landing page URL here — nothing else needs to change.
  landingPageURL: "https://uncodemy.com/",

  // Editable counselor contact details
  phoneNumber: "+91 9818366550",
  whatsappLink: "https://api.whatsapp.com/send?phone=918800023723",

  // Editable batch details
  batch: {
    course: "Ethical Hacking",
    nextBatchStarts: "Editable",
    duration: "Editable",
    countdownDays: 5, // Countdown length in days, starts on first visit
  },
};

/* ---------- CTA button: go to landing page ---------- */
function goToLandingPage() {
  window.location.href = CONFIG.landingPageURL;
}

/* ---------- Populate editable contact info ---------- */
function initHelpCard() {
  const phoneEl = document.querySelector("[data-phone]");
  const waEl = document.querySelector("[data-whatsapp]");
  if (phoneEl) phoneEl.textContent = CONFIG.phoneNumber;
  if (waEl) waEl.setAttribute("href", CONFIG.whatsappLink);

  const startsEl = document.querySelector("[data-batch-starts]");
  const durationEl = document.querySelector("[data-batch-duration]");
  if (startsEl) startsEl.textContent = CONFIG.batch.nextBatchStarts;
  if (durationEl) durationEl.textContent = CONFIG.batch.duration;
}

/* ---------- Persistent countdown timer ----------
   Starts at CONFIG.batch.countdownDays on first load and keeps counting
   down in real time. The deadline is stored in localStorage so the
   remaining time survives page reloads / navigating between pages.
------------------------------------------------------------------------- */
function initCountdown() {
  const STORAGE_KEY = "uncodemy_batch_deadline";
  let deadline = localStorage.getItem(STORAGE_KEY);

  if (!deadline) {
    deadline = Date.now() + CONFIG.batch.countdownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, deadline);
  } else {
    deadline = parseInt(deadline, 10);
  }

  const dEl = document.querySelector("[data-cd-days]");
  const hEl = document.querySelector("[data-cd-hours]");
  const mEl = document.querySelector("[data-cd-minutes]");
  const sEl = document.querySelector("[data-cd-seconds]");

  if (!dEl) return;

  function tick() {
    const now = Date.now();
    let diff = deadline - now;

    if (diff <= 0) {
      deadline = Date.now() + CONFIG.batch.countdownDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, deadline);
      diff = deadline - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(minutes).padStart(2, "0");
    sEl.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}


function keepActiveTopicVisible() {

  const sidebar = document.querySelector('.sidebar-left');
  const activeLink = document.querySelector('.sidebar-left a.active');


  if (!sidebar || !activeLink) return;


  const sidebarRect = sidebar.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const linkRelativeTop = linkRect.top - sidebarRect.top + sidebar.scrollTop;

  const sidebarHeight = sidebar.clientHeight;

  sidebar.scrollTop = linkRelativeTop - sidebarHeight / 2;
}

document.addEventListener("DOMContentLoaded", () => {
  initHelpCard();
  initCountdown();
  keepActiveTopicVisible();
});