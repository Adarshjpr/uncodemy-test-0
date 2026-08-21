/* ==========================================================================
   Uncodemy Topic Pages — Shared Script
   Edit the CONFIG block below to update links/numbers across every page.
   ========================================================================== */

const CONFIG = {
  // Paste your final landing page URL here — used by the "Go to Course
  // Landing Page" button on every page. No other code needs to change.
  landingPageURL: "https://uncodemy.com/",

  // Editable contact details for the "Need Help?" card.
  phoneNumber: "+91 9818366550",
  whatsappLink: "https://api.whatsapp.com/send?phone=918800023723",

  // Countdown duration in days, starts fresh the first time a visitor
  // lands on any of these pages, then keeps counting down across reloads.
  countdownDays: 5,
  countdownStorageKey: "uncodemy_batch_countdown_deadline"
};

/* ---------- Go to Landing Page button ---------- */
function goToLandingPage() {
  window.location.href = CONFIG.landingPageURL;
}

/* ---------- Populate editable contact info ---------- */
function renderHelpCard() {
  const phoneEl = document.querySelector('[data-config="phoneNumber"]');
  const waEl = document.querySelector('[data-config="whatsappLink"]');
  if (phoneEl) {
    phoneEl.textContent = CONFIG.phoneNumber;
    phoneEl.setAttribute('href', 'tel:' + CONFIG.phoneNumber.replace(/\s+/g, ''));
  }
  if (waEl) {
    waEl.setAttribute('href', CONFIG.whatsappLink);
  }
}

/* ---------- Countdown Timer (persists across reloads) ---------- */
function initCountdown() {
  const els = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]')
  };
  if (!els.days) return;

  let deadline = localStorage.getItem(CONFIG.countdownStorageKey);

  if (!deadline) {
    deadline = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(CONFIG.countdownStorageKey, deadline);
  } else {
    deadline = parseInt(deadline, 10);
  }

  function tick() {
    const now = Date.now();
    let remaining = deadline - now;

    if (remaining <= 0) {
      // Batch window elapsed — start a fresh countdown automatically.
      deadline = Date.now() + CONFIG.countdownDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(CONFIG.countdownStorageKey, deadline);
      remaining = deadline - Date.now();
    }

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / (1000 * 60)) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    els.days.textContent = String(d).padStart(2, '0');
    els.hours.textContent = String(h).padStart(2, '0');
    els.minutes.textContent = String(m).padStart(2, '0');
    els.seconds.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Scroll active sidebar link into view ---------- */
function scrollActiveIntoView() {
  const activeLink = document.querySelector('.topic-link.active');
  if (!activeLink) return;

  // Find the scrollable sidebar container
  const sidebar = activeLink.closest('.left-sidebar');
  if (!sidebar) return;

  // Use scrollIntoView on the link itself.
  // The browser automatically finds the nearest scrollable ancestor
  // (which is the .left-sidebar container) and scrolls it.
  // Adding a small timeout ensures the DOM is fully rendered.
  setTimeout(() => {
    activeLink.scrollIntoView({
      block: 'center',
      behavior: 'instant'
    });
  }, 100);
}

/* ---------- Mobile sidebar toggle ---------- */
function initMobileSidebar() {
  const btn = document.querySelector('.mobile-sidebar-toggle');
  const sidebar = document.querySelector('.left-sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    btn.textContent = sidebar.classList.contains('open') ? 'Hide Topics ▲' : 'Browse Topics ▼';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHelpCard();
  initCountdown();
  initMobileSidebar();
  // Scroll active link into view
  scrollActiveIntoView();
});