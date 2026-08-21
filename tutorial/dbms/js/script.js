/* ==========================================================================
   Uncodemy Course Pages — Config & Behaviour
   Edit the values in the CONFIG block below to update the site everywhere.
   ========================================================================== */

const CONFIG = {
  // Paste your course landing page URL here. Every "Go to Course Landing
  // Page" button on every generated page will use this single value.
  landingPageURL: "https://uncodemy.com/",

  // Counsellor contact details shown in the right sidebar "Need Help?" card.
  counselorPhone: "+91 9818366550",
  whatsappLink: "https://api.whatsapp.com/send?phone=918800023723",

  // Countdown duration (in days) for the "Upcoming Batch" timer.
  // The end time is stored in localStorage so the countdown keeps ticking
  // down correctly across page reloads instead of resetting to 5 days.
  countdownDays: 5,
  countdownStorageKey: "uncodemy_batch_countdown_end"
};

/* ---------- Landing page CTA ---------- */
function goToLandingPage() {
  window.location.href = CONFIG.landingPageURL;
}

/* ---------- Contact info + config injection ---------- */
function applyConfig() {
  document.querySelectorAll("[data-landing-btn]").forEach((btn) => {
    btn.addEventListener("click", goToLandingPage);
  });

  document.querySelectorAll("[data-phone-text]").forEach((el) => {
    el.textContent = CONFIG.counselorPhone;
  });
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", "tel:" + CONFIG.counselorPhone.replace(/\s+/g, ""));
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.setAttribute("href", CONFIG.whatsappLink);
  });
}

/* ---------- Countdown timer (persists across reloads) ---------- */
function initCountdown() {
  const dEl = document.querySelector("[data-cd-days]");
  const hEl = document.querySelector("[data-cd-hours]");
  const mEl = document.querySelector("[data-cd-mins]");
  const sEl = document.querySelector("[data-cd-secs]");
  if (!dEl || !hEl || !mEl || !sEl) return;

  let endTime = parseInt(localStorage.getItem(CONFIG.countdownStorageKey), 10);

  if (!endTime || isNaN(endTime) || endTime <= Date.now()) {
    endTime = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(CONFIG.countdownStorageKey, String(endTime));
  }

  function tick() {
    const remaining = Math.max(0, endTime - Date.now());

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((remaining / (1000 * 60)) % 60);
    const secs = Math.floor((remaining / 1000) % 60);

    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(mins).padStart(2, "0");
    sEl.textContent = String(secs).padStart(2, "0");

    if (remaining <= 0) {
      clearInterval(timerId);
      // Batch window closed — start a fresh countdown automatically.
      localStorage.removeItem(CONFIG.countdownStorageKey);
    }
  }

  tick();
  const timerId = setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initCountdown();
});

/* ---------- Keep active topic visible ---------- */
function keepActiveTopicVisible() {
    const sidebar = document.querySelector(".sidebar-left");
    const activeTopic = document.querySelector(".topic-nav a.active");

    if (!sidebar || !activeTopic) return;

    // Active topic ko sidebar ke center me le aao
    const scrollTop =
        activeTopic.offsetTop
        - sidebar.clientHeight / 2
        + activeTopic.clientHeight / 2;

    sidebar.scrollTo({
        top: scrollTop,
        behavior: "instant"   // "smooth" bhi kar sakte ho
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initCountdown();

    keepActiveTopicVisible();
});