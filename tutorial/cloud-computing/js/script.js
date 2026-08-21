/* =========================================================
   EDITABLE CONFIGURATION
   ========================================================= */
// Paste your actual landing page URL here whenever you have it.
// No other code needs to change.
var landingPageURL = "https://uncodemy.com/course/cloud-computing-training-course-in-noida";

// Editable contact details
var counselorPhoneNumber = "+91 9818366550";
var counselorWhatsAppLink = "https://api.whatsapp.com/send?phone=918800023723";

/* =========================================================
   Apply editable values to the page
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  var landingBtn = document.getElementById("landingPageBtn");
  if (landingBtn) {
    landingBtn.addEventListener("click", function () {
      window.location.href = landingPageURL;
    });
  }

  var callBtn = document.getElementById("callBtn");
  if (callBtn) {
    callBtn.href = "tel:" + counselorPhoneNumber.replace(/\s+/g, "");
    callBtn.querySelector(".btn-text").textContent = "Call " + counselorPhoneNumber;
  }

  var whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) {
    whatsappBtn.href = counselorWhatsAppLink;
  }

  initCountdown();
});

/* =========================================================
   Live Countdown Timer (persists across reloads)
   Counts down from 5 days from the FIRST time it is loaded.
   ========================================================= */
function initCountdown() {
  var daysEl = document.getElementById("cd-days");
  var hoursEl = document.getElementById("cd-hours");
  var minsEl = document.getElementById("cd-mins");
  var secsEl = document.getElementById("cd-secs");

  if (!daysEl) return;

  var STORAGE_KEY = "uncodemy_batch_deadline";
  var FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

  var deadline = localStorage.getItem(STORAGE_KEY);

  if (!deadline || isNaN(parseInt(deadline, 10))) {
    deadline = Date.now() + FIVE_DAYS_MS;
    localStorage.setItem(STORAGE_KEY, deadline);
  } else {
    deadline = parseInt(deadline, 10);
  }

  function tick() {
    var now = Date.now();
    var diff = deadline - now;

    if (diff <= 0) {
      // Reset for next batch cycle once timer hits zero
      deadline = Date.now() + FIVE_DAYS_MS;
      localStorage.setItem(STORAGE_KEY, deadline);
      diff = FIVE_DAYS_MS;
    }

    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var m = Math.floor((diff / (1000 * 60)) % 60);
    var s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
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