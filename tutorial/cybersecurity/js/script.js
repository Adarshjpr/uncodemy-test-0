// ============================================
// Uncodemy — Selenium Training Course pages
// Edit CONFIG to update every page site-wide
// ============================================
const CONFIG = {
  landingPageUrl: "https://uncodemy.com",
  counselorPhone: "+919876543210",
  whatsappLink: "https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20the%20Selenium%20Training%20Course",
  countdownDays: 7
};

document.addEventListener("DOMContentLoaded", () => {
  wireLandingLinks();
  wireHelpLinks();
  startCountdown();
  centerActiveSidebarItem();
});

// ---- Landing page buttons/links ----
function wireLandingLinks() {
  document.querySelectorAll("[data-landing-btn]").forEach((el) => {
    el.setAttribute("href", CONFIG.landingPageUrl);
  });
}

// ---- Phone / WhatsApp help links ----
function wireHelpLinks() {
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", `tel:${CONFIG.counselorPhone}`);
  });
  document.querySelectorAll("[data-phone-text]").forEach((el) => {
    el.textContent = CONFIG.counselorPhone;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.setAttribute("href", CONFIG.whatsappLink);
  });
}

// ---- Countdown timer (persists via localStorage) ----
function startCountdown() {
  const daysEl = document.querySelector("[data-cd-days]");
  const hoursEl = document.querySelector("[data-cd-hours]");
  const minsEl = document.querySelector("[data-cd-mins]");
  const secsEl = document.querySelector("[data-cd-secs]");
  if (!daysEl && !hoursEl && !minsEl && !secsEl) return;

  const STORAGE_KEY = "uncodemy_batch_countdown_end";

  function getEndTime() {
    let end = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    const now = Date.now();
    if (!end || isNaN(end) || end <= now) {
      end = now + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(end));
    }
    return end;
  }

  let endTime = getEndTime();

  function tick() {
    const now = Date.now();
    let remaining = endTime - now;

    if (remaining <= 0) {
      endTime = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(endTime));
      remaining = endTime - Date.now();
    }

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / (1000 * 60)) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    if (daysEl) daysEl.textContent = String(d).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// ---- Auto-scroll left sidebar so active topic is centered ----
function centerActiveSidebarItem() {
  const sidebar = document.querySelector(".sidebar-left");
  const active = document.querySelector(".topic-nav li.active");
  if (!sidebar || !active) return;

  const sidebarHeight = sidebar.clientHeight;
  const itemOffset = active.offsetTop;
  const itemHeight = active.offsetHeight;

  sidebar.scrollTop = itemOffset - sidebarHeight / 2 + itemHeight / 2;
}
