document.addEventListener('DOMContentLoaded', function () {

  /* ---- Apply editable config values ---- */
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var key = el.getAttribute('data-config');
    var value = window[key];
    if (value === undefined) return;
    if (key === 'phoneNumber') {
      el.textContent = value;
      el.setAttribute('href', 'tel:' + value.replace(/\s+/g, ''));
    } else if (key === 'whatsappLink') {
      el.setAttribute('href', value);
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-editable]').forEach(function (el) {
    var key = el.getAttribute('data-editable');
    if (window[key] !== undefined) el.textContent = window[key];
  });

  /* ---- Landing page CTA ---- */
  window.goToLandingPage = function () {
    window.location.href = landingPageURL;
  };

  /* ---- Mobile sidebar toggle ---- */
  var toggleBtn = document.querySelector('.mobile-sidebar-toggle');
  var topicLinks = document.querySelector('.topic-links');
  if (toggleBtn && topicLinks) {
    toggleBtn.addEventListener('click', function () {
      topicLinks.classList.toggle('open');
    });
  }

  /* ---- Persistent countdown timer ----
     Stores the target end time in localStorage on first load, so the
     countdown keeps ticking down correctly across page reloads and
     between different pages instead of resetting each time. */
  var STORAGE_KEY = 'uncodemy_batch_countdown_end';
  var totalMs = (window.countdownDays || 5) * 24 * 60 * 60 * 1000;
  var endTime = parseInt(localStorage.getItem(STORAGE_KEY), 10);

  if (!endTime || isNaN(endTime) || endTime < Date.now()) {
    endTime = Date.now() + totalMs;
    localStorage.setItem(STORAGE_KEY, endTime);
  }

  var daysEl = document.querySelector('[data-countdown="days"]');
  var hoursEl = document.querySelector('[data-countdown="hours"]');
  var minsEl = document.querySelector('[data-countdown="minutes"]');
  var secsEl = document.querySelector('[data-countdown="seconds"]');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var remaining = endTime - Date.now();
    if (remaining <= 0) {
      endTime = Date.now() + totalMs;
      localStorage.setItem(STORAGE_KEY, endTime);
      remaining = totalMs;
    }
    var d = Math.floor(remaining / (24 * 60 * 60 * 1000));
    var h = Math.floor((remaining / (60 * 60 * 1000)) % 24);
    var m = Math.floor((remaining / (60 * 1000)) % 60);
    var s = Math.floor((remaining / 1000) % 60);

    if (daysEl) daysEl.textContent = pad(d);
    if (hoursEl) hoursEl.textContent = pad(h);
    if (minsEl) minsEl.textContent = pad(m);
    if (secsEl) secsEl.textContent = pad(s);
  }

  if (daysEl) {
    tick();
    setInterval(tick, 1000);
  }
});
