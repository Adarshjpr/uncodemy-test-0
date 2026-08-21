/* =========================================================================
   Uncodemy — Course Fees page script (updated)

   CHANGE: anotherUserForm submit handler
     - Server/network error par ab "Something went wrong" type alert nahi aata
     - Har submit ke baad success popup + thankyou-page redirect
     - Validation errors (naam/email/phone/status) abhi bhi dikhte hain
   ========================================================================= */

/* ----------------------------------------------------- mobile menu / nav */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        mobileMenuBtn.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  document.addEventListener("click", e => {
    if (nav.contains(e.target) || mobileMenuBtn.contains(e.target)) return;
    mobileMenuBtn.classList.remove("active");
    nav.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

/* --------------------------------------------------------- header shadow */

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;
  header.style.boxShadow = window.scrollY > 50
    ? "0 4px 12px rgba(0, 0, 0, 0.1)"
    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
});

/* ------------------------------------------------------------------- FAQ */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    q.classList.toggle("active");
    if (answer) answer.classList.toggle("active");
  });
});

/* ------------------------------------------------------------------ tabs */

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const target = this.getAttribute("data-tab");

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    const pane = document.getElementById(target);
    if (pane) pane.classList.add("active");
  });
});

/* --------------------------------------------------------- smooth scroll */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });

    if (history.pushState) history.pushState(null, null, href);
    else location.hash = href;
  });
});

/* ---------------------------------------------------- testimonial slider */

let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach(s => (s.style.display = "none"));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].style.display = "block";
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

showSlide(0);
setInterval(nextSlide, 5000);

/* ------------------------------------------------------- success message */

function showSuccessMessage() {
  // do baar popup na bane
  if (document.getElementById("successPopup")) return;

  document.body.classList.add("blurred-background");

  const popup = document.createElement("div");
  popup.id = "successPopup";
  popup.innerHTML = `
        <div class="success-content">
            <h2>🎉 Registration Successful!</h2>
            <p>Thank you for registering at <strong>Uncodemy</strong>. Our team will contact you soon regarding course fees and details.</p>
            <p>We offer industry-focused training to help you achieve your career goals.</p>
            <p>Redirecting in <span id="countdown">5</span> seconds...</p>
        </div>
    `;
  document.body.appendChild(popup);

  let seconds = 5;
  const timer = setInterval(() => {
    seconds--;
    const el = document.getElementById("countdown");
    if (el) el.innerText = seconds;

    if (seconds === 0) {
      clearInterval(timer);
      document.body.classList.remove("blurred-background");
      window.location.href = "https://uncodemy.com/thankyou-page";
    }
  }, 1000);

  // safety net — timer fail ho jaye to bhi redirect ho
  setTimeout(() => {
    window.location.href = "https://uncodemy.com/thankyou-page";
  }, 6000);
}

/* =========================== COURSE FEES FORM ============================
   Server / network error par user ko error nahi dikhta.
   Sirf validation errors dikhte hain.
   ========================================================================= */

const anotherUserForm = document.getElementById("anotherUserForm");

if (anotherUserForm) {
  anotherUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameEl   = document.getElementById("another_name");
    const emailEl  = document.getElementById("another_email");
    const phoneEl  = document.getElementById("another_phone");
    const statusEl = document.getElementById("working_status");

    if (!(nameEl && emailEl && phoneEl && statusEl)) {
      alert("❌ Form elements are missing. Please refresh the page.");
      return;
    }

    const name   = nameEl.value.trim();
    const email  = emailEl.value.trim();
    const phone  = phoneEl.value.trim().replace(/\D/g, "");
    const status = statusEl.value;

    /* ---------------------------- validation ---------------------------- */

    if (!name) {
      alert("❌ Please enter your name.");
      nameEl.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("❌ Please enter a valid email address.");
      emailEl.focus();
      return;
    }

    if (!/^\d{10,12}$/.test(phone)) {
      alert("❌ Please enter a valid phone number (10 to 12 digits only).");
      phoneEl.focus();
      return;
    }

    if (!status) {
      alert("❌ Please select your current working status.");
      statusEl.focus();
      return;
    }

    /* ------------------------------ submit ------------------------------ */

    const submitBtn = anotherUserForm.querySelector("button[type='submit'], input[type='submit']");
    const oldText = submitBtn ? submitBtn.innerHTML : "";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting...";
    }

    const payload = {
      name: name,
      email: email,
      phone: phone,
      working_status: status
    };

    fetch("https://uncodemy.com/php/course-fees.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.text())
      .then(text => {
        let data = null;
        try { data = JSON.parse(text); } catch (err) { data = null; }
        console.log("course-fees submit:", data);
      })
      .catch(err => {
        // network / server issue — user ko error nahi dikhana
        console.error("course-fees submit failed:", err);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = oldText;
        }
        anotherUserForm.reset();
        showSuccessMessage();
      });
  });
}

/* ------------------------------------------------------- popup styles */

const style = document.createElement("style");
style.innerHTML = `
    #successPopup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
        font-family: Arial, sans-serif;
        z-index: 1001;
    }
    strong {
        color: #ff5421;
    }
    .success-content h2 { color: #28a745; }
    .blurred-background::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 1000;
    }
`;
document.head.appendChild(style);

/* ------------------------------------------------- scroll reveal + links */

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".pdf-card, .section-title, .content-container").forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});