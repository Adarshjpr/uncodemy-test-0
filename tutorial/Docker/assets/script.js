/* =========================================================
   Uncodemy — Machine Learning Tutorial Series
   Shared config + behaviour (edit the values below)
   ========================================================= */

// ---------- EDITABLE CONFIG ----------
const siteConfig = {
  // Paste your React-Frontend / batch landing page URL here.
  // The "Go to Course Landing Page" button will redirect here.
  landingPageURL: "https://uncodemy.com/blog/what-are-containers-in-devops-explained",

  // Upcoming batch details (right sidebar)
  batch: {
    course: "Machine Learning Course",
    startDate: "3rd August 2026",     // FALLBACK – will be overridden by computed date
    duration: "4 Months",             // Editable
    countdownDays: 5,                 // Editable — timer counts down from this many days
  },

  // Counselor contact (right sidebar)
  contact: {
    phone: "+91-98183-66550",
    whatsapp: "https://api.whatsapp.com/send?phone=918800023723",
  },
};
// ---------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Fill in batch details (duration is static, start date will be set by countdown)
  const durationEl = document.querySelector("[data-batch-duration]");
  if (durationEl) durationEl.textContent = siteConfig.batch.duration;

  // Fill in contact details (text and click actions)
  const phoneSpan = document.querySelector("[data-contact-phone]");
  const whatsappSpan = document.querySelector("[data-contact-whatsapp]");

  if (phoneSpan) {
    phoneSpan.textContent = siteConfig.contact.phone;
  }
  if (whatsappSpan) {
    whatsappSpan.textContent = "Message us";
  }

  // Make entire help rows clickable
  const phoneRow = document.querySelector('[data-action="phone"]');
  if (phoneRow) {
    phoneRow.style.cursor = 'pointer';
    phoneRow.addEventListener('click', () => {
      const phoneNumber = siteConfig.contact.phone.replace(/[^+\d]/g, '');
      window.location.href = `tel:${phoneNumber}`;
    });
  }

  const whatsappRow = document.querySelector('[data-action="whatsapp"]');
  if (whatsappRow) {
    whatsappRow.style.cursor = 'pointer';
    whatsappRow.addEventListener('click', () => {
      window.open(siteConfig.contact.whatsapp, '_blank');
    });
  }

  // Landing page CTA button
  const landingBtn = document.querySelector("[data-landing-btn]");
  if (landingBtn) {
    landingBtn.addEventListener("click", () => {
      if (siteConfig.landingPageURL) {
        window.location.href = siteConfig.landingPageURL;
      } else {
        console.warn("siteConfig.landingPageURL is empty — set it in assets/script.js");
      }
    });
  }

  // Simple fade-in on load
  document.body.classList.add("loaded");

  // Initialize countdown (also sets the start date)
  initCountdown(siteConfig.batch.countdownDays);

  // Scroll active sidebar link into view
  scrollActiveIntoView();
});

// ---------- Countdown timer (persists across page reloads via localStorage) ----------
function initCountdown(days) {
  const countdownEl = document.querySelector("[data-countdown]");
  const startDateEl = document.querySelector("[data-batch-start]");
  if (!countdownEl) return;

  const STORAGE_KEY = "uncodemy_batch_deadline";
  let deadline = null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    deadline = stored ? parseInt(stored, 10) : null;
  } catch (e) {
    deadline = null;
  }

  const ONE_DAY = 24 * 60 * 60 * 1000;

  // If no stored deadline or it's invalid, create a new one
  if (!deadline || isNaN(deadline)) {
    deadline = Date.now() + days * ONE_DAY;
    try { localStorage.setItem(STORAGE_KEY, String(deadline)); } catch (e) { /* ignore */ }
  }

  // ----- Update the start date displayed in the sidebar -----
  function updateStartDate() {
    if (startDateEl) {
      startDateEl.textContent = formatDate(deadline);
    }
  }
  updateStartDate();

  // ----- Countdown tick -----
  function tick() {
    const diff = deadline - Date.now();

    if (diff <= 0) {
      // Batch has started — show message until 1 day after the deadline passes
      countdownEl.textContent = "Batch has started!";

      if (Math.abs(diff) >= ONE_DAY) {
        // 1 day has passed since the batch started -> reset for the next batch
        deadline = Date.now() + days * ONE_DAY;
        try { localStorage.setItem(STORAGE_KEY, String(deadline)); } catch (e) { /* ignore */ }
        updateStartDate();
      }
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  }

  tick();
  const timer = setInterval(tick, 1000);
}

// ---------- Helper: format a timestamp as a human-readable date with ordinal suffix ----------
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Ordinal suffix for the day
  const suffix = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
}


function scrollActiveIntoView() {
  const activeLink = document.querySelector('.topic-list a.active');
  if (!activeLink) return;

  const topicList = document.querySelector('.topic-list');
  if (!topicList) return;

  // Get positions relative to the viewport
  const linkRect = activeLink.getBoundingClientRect();
  const containerRect = topicList.getBoundingClientRect();

  // Current scroll offset of the topicList
  const currentScroll = topicList.scrollTop;

  // How far the link is from the top of the container's visible area
  const offsetFromTop = linkRect.top - containerRect.top + currentScroll;

  // Target scroll to center the link vertically
  const targetScroll = offsetFromTop - (containerRect.height / 2) + (linkRect.height / 2);

  // Apply smooth scroll to the topicList only
  topicList.scrollTo({
    top: Math.max(0, targetScroll), // prevent negative scroll
    behavior: 'instant'              // or 'instant' for immediate jump
  });
}