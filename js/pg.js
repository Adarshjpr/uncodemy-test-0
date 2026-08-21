/* =========================================================================
   pg.js — Uncodemy PG Program page script
   Change: .new-form submit handler ab error alert nahi dikhata,
           success par thankyou-page pe redirect karta hai.
   ========================================================================= */

   !function (e, t) {
    if (!t[e]) {
      e = e || "docReady", t = t || window;
      var n = [], o = !1, a = !1;
      t[e] = function (e, t) {
        if ("function" != typeof e) throw new TypeError("callback for docReady(fn) must be a function");
        return o ? void setTimeout((function () { e(t) }), 1)
          : (n.push({ fn: e, ctx: t }), void ("complete" === document.readyState || !document.attachEvent && "interactive" === document.readyState ? setTimeout(r, 1) : a || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", r, !1), window.addEventListener("load", r, !1)) : (document.attachEvent("onreadystatechange", c), window.attachEvent("onload", r)), a = !0)))
      }
    }
    function r() { if (!o) { o = !0; for (var e = 0; e < n.length; e++) n[e].fn.call(window, n[e].ctx); n = [] } }
    function c() { "complete" === document.readyState && r() }
  }("docReady", window);
  
  window.debounce = window.debounce || function (e, t) {
    var n;
    return function () {
      var o = this, a = arguments;
      clearTimeout(n);
      n = setTimeout(function () { e.apply(o, a) }, t);
    };
  };
  
  /* ------------------------------- read more ------------------------------ */
  
  const content = document.querySelectorAll(".content");
  const readMore = document.querySelectorAll(".read-more");
  
  readMore.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (!content[i]) return;
      content[i].classList.toggle("expanded");
      btn.textContent = content[i].classList.contains("expanded") ? "Read Less" : "Read More";
    });
  });
  
  /* --------------------------- PG program lead form ----------------------- */
  
  document.addEventListener("DOMContentLoaded", function () {
  
    const forms = document.querySelectorAll(".new-form");
    if (!forms.length) return;
  
    const THANK_YOU_URL = "https://uncodemy.com/thankyou-page";
  
    // success popup + redirect (Swal ho to Swal, warna seedha redirect)
    function goToThankYou(form) {
      if (form) form.reset();
  
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "success",
          title: "✨Congratulations🎉!",
          html: `<div style="font-size:20px;line-height:1.5;">
                   You're one step closer to a <span style="color:#ff5124"><strong>Career Counseling Session</strong></span> with our experts at <strong>Uncodemy</strong>!<br><br>
                   ✅ Our team will contact you shortly with all the details.<br>
                   📩 Please check your <strong>Email</strong> and <strong>WhatsApp</strong> for next steps.
                 </div>`,
          showConfirmButton: false,
          timer: 3000,
          allowOutsideClick: false,
          customClass: { container: "swal-top" }
        }).then(() => {
          window.location.href = THANK_YOU_URL;
        });
  
        // Swal timer fail ho jaye to bhi redirect ho
        setTimeout(function () { window.location.href = THANK_YOU_URL; }, 3500);
      } else {
        window.location.href = THANK_YOU_URL;
      }
    }
  
    forms.forEach(function (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
  
        const nameEl     = form.querySelector("#name, input[name='name']");
        const emailEl    = form.querySelector("#email, input[name='email']");
        const phoneEl    = form.querySelector("input[name='phone'], input[type='tel']");
        const locationEl = form.querySelector("#location, input[name='location']");
        const programEl  = form.querySelector("#program, select[name='program']");
  
        const name     = nameEl     ? nameEl.value.trim() : "";
        const email    = emailEl    ? emailEl.value.trim() : "";
        const phone    = phoneEl    ? phoneEl.value.trim().replace(/\D/g, "") : "";
        const location = locationEl ? locationEl.value.trim() : "";
        const program  = programEl  ? programEl.value : "";
  
        /* ---- validation (sirf yahan user ko message dikhta hai) ---- */
  
        if (!name || !email || !phone || !location || !program) {
          if (typeof Swal !== "undefined") {
            Swal.fire({
              icon: "warning",
              title: "Please complete the form",
              text: "All fields are required.",
              customClass: { container: "swal-top" }
            });
          } else {
            alert("All fields are required.");
          }
          return;
        }
  
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          if (typeof Swal !== "undefined") {
            Swal.fire({
              icon: "warning",
              title: "Invalid Email",
              text: "Please enter a valid email address.",
              customClass: { container: "swal-top" }
            });
          } else {
            alert("Please enter a valid email address.");
          }
          emailEl.focus();
          return;
        }
  
        if (phone.length !== 10) {
          if (typeof Swal !== "undefined") {
            Swal.fire({
              icon: "warning",
              title: "Invalid Phone Number",
              text: "Please enter exactly 10 digits (numbers only).",
              customClass: { container: "swal-top" }
            });
          } else {
            alert("Please enter exactly 10 digits (numbers only).");
          }
          phoneEl.focus();
          return;
        }
  
        /* ---- submit ---- */
  
        const submitBtn = form.querySelector("button[type='submit'], .button-primary");
        const oldText = submitBtn ? submitBtn.innerHTML : "";
  
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add("blur");
          submitBtn.innerHTML = "Submitting...";
        }
  
        const payload = { name, email, phone, location, program };
  
        try {
          const res = await fetch("https://uncodemy.com/php/pg-program.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
  
          // response parse fail ho to bhi crash na ho
          let data = null;
          try { data = await res.json(); } catch (parseErr) { data = null; }
  
          // lead DB me chala gaya — WhatsApp/email fail ho to bhi user ko error na dikhe
          console.log("pg-program submit:", res.status, data);
  
        } catch (err) {
          // network / server issue — user ko error nahi dikhana
          console.error("pg-program submit failed:", err);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("blur");
            submitBtn.innerHTML = oldText;
          }
        }
  
        // har case me thank you page
        goToThankYou(form);
      });
    });
  });