/* ============================================================
   EDITABLE CONFIGURATION
   Update these values — no other code needs to change.
   ============================================================ */
const CONFIG = {
  // Paste your final landing page URL here whenever it's ready.
  landingPageURL: "https://uncodemy.com/course/angular-training-course-in-noida",

  // Counselor contact details shown in the "Need Help?" card.
  phoneNumber: "+91 9818366550",
  whatsappLink: "https://api.whatsapp.com/send?phone=918800023723",

  // Countdown length (in days) used the first time a visitor lands here.
  countdownDays: 5,
};

/* ============================================================
   Go to Course Landing Page button
   ============================================================ */
function goToLandingPage() {
  window.location.href = CONFIG.landingPageURL;
}

/* ============================================================
   Apply editable config values into the DOM
   ============================================================ */
function applyConfig() {
  document.querySelectorAll('[data-config="phoneNumber"]').forEach((el) => {
    el.textContent = CONFIG.phoneNumber;
    if (el.tagName === "A") el.href = "tel:" + CONFIG.phoneNumber.replace(/\s+/g, "");
  });
  document.querySelectorAll('[data-config="whatsappLink"]').forEach((el) => {
    if (el.tagName === "A") el.href = CONFIG.whatsappLink;
  });
}

/* ============================================================
   Persistent live countdown
   Target time is stored in localStorage so the remaining time
   survives page reloads instead of resetting to 5 days each time.
   ============================================================ */
function initCountdown() {
  const STORAGE_KEY = "uncodemyBatchCountdownTarget";
  let target = localStorage.getItem(STORAGE_KEY);

  if (!target || isNaN(Number(target)) || Number(target) <= Date.now()) {
    target = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(target));
  } else {
    target = Number(target);
  }

  const daysEl = document.querySelector('[data-countdown="days"]');
  const hoursEl = document.querySelector('[data-countdown="hours"]');
  const minsEl = document.querySelector('[data-countdown="minutes"]');
  const secsEl = document.querySelector('[data-countdown="seconds"]');
  if (!daysEl) return;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);

    if (diff <= 0) {
      clearInterval(timer);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ============================================================
   Mobile sidebar toggle
   ============================================================ */
function initSidebarToggle() {
  const toggleBtn = document.querySelector(".mobile-sidebar-toggle");
  const sidebar = document.querySelector(".left-sidebar");
  if (!toggleBtn || !sidebar) return;
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    toggleBtn.innerHTML = sidebar.classList.contains("open")
      ? "Hide Topics &#9650;"
      : "Browse Topics &#9660;";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initCountdown();
  initSidebarToggle();
  keepActiveTopicVisible();
});

function keepActiveTopicVisible() {
  const activeTopic = document.querySelector(".topic-link.active");

  if (activeTopic) {
    activeTopic.scrollIntoView({
      behavior: "instant", // ya "smooth"
      block: "center",
      inline: "nearest"
    });
  }
}