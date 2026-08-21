/* =========================================================================
   Uncodemy — main script (updated / de-minified)

   FIXES APPLIED:
   1. LAZY LOAD  — `n.src = n.dataset.src` used to run unconditionally.
                   If another script had already consumed data-src, this wrote
                   the string "undefined" into src. Now guarded + class removed
                   + data-src consumed, so a double-run is harmless.
   2. window.onload / window.onscroll  — were plain assignments; any other
                   script assigning them would silently delete this code.
                   Now addEventListener.
   3. updateSchemaFields()  — ran at parse time with no null check on <title>.
                   A throw here killed EVERYTHING below it in the file
                   (including the lazy loader). Now guarded + try/catch.
   4. Null guards added on top-level / global handlers that touch elements
                   which do not exist on every page.
   ========================================================================= */

   'use strict';

   /* ------------------------------------------------------------------ state */
   
   let courseName = null,
       cityName = null,
       userName = null,
       userEnquiry = null,
       isAskingForPhoneNumber = false,
       isAskingForEmail = false,
       hasProvidedPhoneNumber = false,
       course = null,
       phone = null,
       email = null,
       mode = null,
       hasProvidedEmail = false,
       selectedCountry = null,
       isConversationComplete = false;
   
   /* ----------------------------------------------------------- schema markup */
   
   var schema = {
     "@context": "https://schema.org/",
     "@type": "Product",
     name: "",
     image: "https://uncodemy.com/image/logo.png",
     description: "",
     brand: { "@type": "Brand", name: "Uncodemy" },
     aggregateRating: {
       "@type": "AggregateRating",
       ratingValue: "5",
       bestRating: "5",
       worstRating: "1",
       ratingCount: 128388,
       reviewCount: 128388
     }
   };
   
   function extractCityAndCourseFromTitle(title) {
     for (const sep of [" in ", " at ", " - "]) {
       const idx = title.lastIndexOf(sep);
       if (idx !== -1) {
         return {
           cityName: title.substring(idx + sep.length).trim(),
           courseName: title.substring(0, idx).trim()
         };
       }
     }
     return { cityName: "Unknown", courseName: "Unknown" };
   }
   
   function updateSchemaFields() {
     // FIX 3: guard — no <title> yet meant a TypeError that killed the whole file.
     const titleEl = document.getElementsByTagName("title")[0];
     if (!titleEl) return;
   
     const head = document.head || document.getElementsByTagName("head")[0];
     if (!head) return;
   
     const { cityName, courseName } = extractCityAndCourseFromTitle(titleEl.innerText || titleEl.textContent || "");
   
     schema.name = courseName + " in " + cityName;
     schema.description =
       `Uncodemy IT training institute offers the ${courseName} Course in ${cityName}, ` +
       `with a 100% Placement Record and practical training for Students and professionals. ` +
       `The course covers the complete curriculum from scratch to advance, providing ` +
       `job-oriented career opportunities. Enroll now and earn your Global Certificate in ` +
       `${courseName} from Uncodemy.`;
   
     const script = document.createElement("script");
     script.type = "application/ld+json";
     script.textContent = JSON.stringify(schema, null, 2);
   
     const saswp = head.querySelector('meta[name="saswp-custom-schema-markup-output"]');
     if (saswp) head.insertBefore(script, saswp.nextSibling);
     else head.appendChild(script);
   }
   
   // FIX 3: even if something unexpected throws, the rest of the file still runs.
   try {
     updateSchemaFields();
   } catch (err) {
     console.error("updateSchemaFields failed:", err);
   }
   
   /* ------------------------------------------------------ course card picker */
   
   var courseNames = document.getElementsByClassName("course-name");
   
   function addEventListenerToCourse(index) {
     courseNames[index].addEventListener("click", function () {
       const prevActive = document.getElementById("active");
       const prevCheck = document.getElementById("check");
       if (prevActive) prevActive.removeAttribute("id");
       if (prevCheck) prevCheck.removeAttribute("id");
   
       const thumb = document.getElementsByClassName("course-card-thumb")[index];
       const name = document.getElementsByClassName("course-name")[index];
       if (!thumb || !name) return;
   
       thumb.setAttribute("id", "active");
       if (thumb.parentElement) thumb.parentElement.scrollTop = thumb.offsetTop;
       name.setAttribute("id", "check");
     });
   }
   
   for (var i = 0; i < courseNames.length; i++) addEventListenerToCourse(i);
   
   /* -------------------------------------------------- certificate / alumni  */
   
   const certificateRight = () => {
     const box = document.querySelector(".certificate-right-box");
     if (!box) return;
     const count = document.getElementsByClassName("certicate-image").length;
     const style = window.getComputedStyle(box);
     const width = parseFloat(style.getPropertyValue("width"));
     const left = Math.abs(parseFloat(style.getPropertyValue("left"))) || 0;
     const total = (count - 1) * width;
     box.style.left = total - 1 <= left ? "0px" : (-left - width) + "px";
   };
   
   const certificateLeft = () => {
     const box = document.querySelector(".certificate-right-box");
     if (!box) return;
     const count = document.getElementsByClassName("certicate-image").length;
     const style = window.getComputedStyle(box);
     const width = parseFloat(style.getPropertyValue("width"));
     const left = Math.abs(parseFloat(style.getPropertyValue("left"))) || 0;
     const total = (count - 1) * width;
     box.style.left = left <= 1 ? (-total) + "px" : (-left + width) + "px";
   };
   
   const movealumniright = () => {
     const box = document.querySelector(".alumni-image-detail-section");
     if (!box) return;
     const count = document.getElementsByClassName("alumni-image-thumb").length;
     const left = Math.abs(parseInt(window.getComputedStyle(box).getPropertyValue("left"), 10)) || 0;
     const width = box.clientWidth;
     const total = (count - 1) * width;
     box.style.left = total <= left ? "0px" : (-left - width) + "px";
   };
   
   const movealumnileft = () => {
     const box = document.querySelector(".alumni-image-detail-section");
     if (!box) return;
     const count = document.getElementsByClassName("alumni-image-thumb").length;
     const left = Math.abs(parseInt(window.getComputedStyle(box).getPropertyValue("left"), 10)) || 0;
     const width = box.clientWidth;
     const total = (count - 1) * width;
     box.style.left = left <= 0 ? (-total) + "px" : (-left + width) + "px";
   };
   
   const selector = "review-text";
   const maxLength = 50;
   let alumniInterval = null;
   
   /* ------------------------------------------------------------ review text */
   
   function expandText(index) {
     const text = document.getElementById("review-text-" + index);
     const toggle = document.getElementsByClassName("show-hide")[index];
     const card = document.getElementsByClassName("review-card")[index];
     if (!text || !toggle || !card) return;
   
     toggle.innerText = toggle.innerText === "show more..." ? "show less" : "show more...";
   
     const height = window.getComputedStyle(text).getPropertyValue("height");
     text.style.height = height === "67px" ? text.scrollHeight + "px" : "67px";
   
     if (card.classList.contains("expanded")) {
       card.style.height = "200px";
       card.classList.remove("expanded");
     } else {
       card.style.height = "auto";
       card.classList.add("expanded");
     }
   }
   
   /* ============================== LOAD =====================================
      FIX 2: was `window.onload = function () {...}` — a plain assignment.
      Any other script doing the same would have wiped all of this out.
      ========================================================================= */
   
   window.addEventListener("load", function () {
   
     /* legacy meta tag (kept from original; the stray "hello this is meta"
        debug string has been removed) */
     const meta = document.createElement("meta");
     meta.httpEquiv = "X-UA-Compatible";
     meta.content = "IE=edge";
     const head = document.getElementsByTagName("head")[0];
     if (head) head.appendChild(meta);
   
     /* falling digits */
     document.querySelectorAll(".learner-number .digit").forEach(function (digit, idx) {
       digit.style.animation = "fallingEffect 1s ease-in-out";
       digit.style.animationFillMode = "forwards";
       digit.style.animationDelay = (0.1 * (idx + 1)) + "s";
     });
   
     /* falling-effect reveal on awards / recipe cards / reviews */
     const revealObserver = new IntersectionObserver(function (entries, obs) {
       entries.forEach(function (entry, idx) {
         if (!entry.isIntersecting) return;
         setTimeout(function () {
           entry.target.classList.add("falling-effect");
         }, 200 * (idx + 1));
         obs.unobserve(entry.target);
       });
     }, { threshold: 0.5 });
   
     document.querySelectorAll(".awards-thumb").forEach(el => revealObserver.observe(el));
     document.querySelectorAll(".scaler-reciper-card").forEach(el => revealObserver.observe(el));
     document.querySelectorAll(".review-card").forEach(el => revealObserver.observe(el));
   
     /* ===================== FIX 1: LAZY LOAD ===============================
        Old code:
            const n = e.target;
            n.src = n.dataset.src;      // <-- wrote "undefined" on a second pass
            t.unobserve(n);
   
        Four changes:
          - [data-src] in the selector  -> already-loaded images are never picked up
          - if (!src) return            -> never write undefined/empty into src
          - classList.remove("lazy-load") -> element leaves any OTHER script's
                                             .lazy-load query too
          - rootMargin "200px"          -> starts loading before it's visible
        ====================================================================== */
   
     const lazyEls = document.querySelectorAll(
       "img.lazy-load[data-src], source.lazy-load[data-src], iframe.lazy-load[data-src]"
     );
   
     const lazyObserver = new IntersectionObserver(function (entries, obs) {
       entries.forEach(function (entry) {
         if (!entry.isIntersecting) return;
   
         const el = entry.target;
         const src = el.dataset.src;
   
         obs.unobserve(el);            // always stop watching
         if (!src) return;             // guard — the actual bug fix
   
         el.src = src;
         el.classList.remove("lazy-load");
         el.classList.add("lazy-loaded");
         delete el.dataset.src;        // consume it
       });
     }, { rootMargin: "200px" });
   
     lazyEls.forEach(el => lazyObserver.observe(el));
   });
   
   /* ------------------------------------------------- course dropdown picker */
   
   document.addEventListener("DOMContentLoaded", function () {
     const dropdowns = document.getElementsByClassName("course-name-dropdown");
   
     for (let idx = 0; idx < dropdowns.length; idx++) {
       (function (index) {
         dropdowns[index].addEventListener("click", function () {
           const prevDropdown = document.getElementById("active-dropdown-course");
           const prevCourse = document.getElementById("active-course");
           if (prevDropdown) prevDropdown.removeAttribute("id");
           if (prevCourse) prevCourse.removeAttribute("id");
   
           const item = document.getElementsByClassName("course-name-dropdown")[index];
           const text = document.getElementsByClassName("course-image-text")[index];
           if (item) item.setAttribute("id", "active-dropdown-course");
           if (text) text.setAttribute("id", "active-course");
         });
       })(idx);
     }
   });
   
   /* ------------------------------------------------------------- popup form */
   
   let popUpFormValue = {
     name: "", mobile: "", email: "", course: "", date: "", fromTime: "", toTime: ""
   };
   
   function setPopUpFormValue(field, value) {
     if (field === "fromTime" || field === "toTime") {
       const parts = value.split(":");
       let hour = parseInt(parts[0], 10);
       let meridiem;
   
       if (hour > 12) {
         meridiem = "PM";
         hour -= 12;
         if (hour < 10) hour = "0" + hour;
       } else if (hour < 12) {
         meridiem = "AM";
         if (hour === 0) hour = 12;
       } else {
         meridiem = "PM";
       }
   
       value = hour + ` : ${parts[1]} ` + meridiem;
     }
     popUpFormValue[field] = value;
   }
   
   /* -------------------------------------------------------------- dropdowns */
   
   function showDropDown(index) {
     const d0 = document.getElementsByClassName("dropdown")[0];
     const d1 = document.getElementsByClassName("dropdown")[1];
     const d2 = document.getElementsByClassName("dropdown")[2];
     if (!d0 || !d1 || !d2) return;
   
     const courseText = document.getElementById("course-text");
     const s0 = window.getComputedStyle(d0).getPropertyValue("display");
     const s1 = window.getComputedStyle(d1).getPropertyValue("display");
     const s2 = window.getComputedStyle(d2).getPropertyValue("display");
   
     const current = index === 0 ? s0 : index === 1 ? s1 : s2;
   
     if (window.innerWidth > 782) {
       if (current === "none") {
         document.body.style.height = "100vh";
         document.body.style.overflowY = "hidden";
       } else {
         document.body.style.height = "auto";
         document.body.style.overflowY = "auto";
       }
     }
   
     const open = (target, others) => {
       target.style.display = window.innerWidth <= 780 ? "flex" : "block";
       if (courseText) courseText.style.color = "#ff5421";
       others.forEach(o => { o.style.display = "none"; });
     };
     const close = (target) => {
       target.style.display = "none";
       if (courseText) courseText.style.color = "black";
     };
   
     if (index === 0) s0 === "none" ? open(d0, [d1, d2]) : close(d0);
     else if (index === 1) s1 === "none" ? open(d1, [d0, d2]) : close(d1);
     else if (index === 2) s2 === "none" ? open(d2, [d0, d1]) : close(d2);
   }
   
   const closeFunction = () => {
     const dropdowns = document.getElementsByClassName("dropdown");
     for (let idx = 0; idx < 3; idx++) {
       if (dropdowns[idx]) dropdowns[idx].style.display = "none";
     }
     if (window.innerWidth > 782) {
       document.body.style.height = "auto";
       document.body.style.overflowY = "auto";
     }
   };
   
   const toggleCategory = () => {
     const menu = document.getElementsByClassName("hii")[0];
     if (!menu) return;
     const display = window.getComputedStyle(menu).getPropertyValue("display");
     const nav = document.getElementsByClassName("navigation-container")[0];
   
     if (window.innerWidth < 782) {
       if (nav) nav.style.display = "none";
       document.body.style.height = "auto";
       document.body.style.overflowY = "auto";
     }
     menu.style.display = display === "block" ? "none" : "block";
   };
   
   function showNavigation() {
     const nav = document.querySelector(".navigation-container");
     const menu = document.getElementsByClassName("hii")[0];
     if (!nav) return;
   
     if (menu && window.getComputedStyle(menu).getPropertyValue("display") === "block") {
       menu.style.display = "none";
     }
   
     const hidden = window.getComputedStyle(nav).display === "none";
   
     if (hidden) {
       document.body.style.overflowY = "hidden";
       document.body.style.height = "95vh";
       nav.style.display = "block";
     } else {
       document.body.style.overflowY = "auto";
       document.body.style.height = "auto";
       nav.style.display = "none";
     }
   }
   
   /* ------------------------------------------------------- brochure / forms */
   
   let pdfUrl;
   let formValue = { name: "", email: "", mobile: "", location: "", course: "" };
   let downloadStatus = false;
   
   const allPdf = {
     DataAnalyticsBtn: "/pdf/Data-Analytics.pdf",
     DataScienceBtn: "/pdf/Data-Science.pdf",
     FullStackBtn: "/pdf/Full-Stack-Development.pdf",
     SoftwareTestingBtn: "/pdf/Software-Testing.pdf",
     DigitalMarketingBtn: "/pdf/Digital-Marketing.pdf",
     PythonBtn: "/pdf/Python.pdf",
     ArtficialIntelligenceBtn: "/pdf/Artificial-Intelligence.pdf",
     AwsBtn: "/pdf/AWS.pdf",
     JavaBtn: "/pdf/Java-Full-Stack-Development.pdf",
     BusinessAnalyticsBtn: "/pdf/Business-Analytics.pdf",
     MachineLearningBtn: "/pdf/Machine-Learning.pdf",
     AutomationTestingBtn: "/pdf/Automation-Testing.pdf",
     DevOpsBtn: "/pdf/Devops.pdf",
     ManualTestingBtn: "/pdf/Manual-Testing.pdf",
     DataAnalyticsPythonBtn: "/pdf/Data-Analytics.pdf",
     ReactBtn: "/pdf/ReactJs.pdf",
     FullStackNodeBtn: "/pdf/Full-Stack-Development.pdf",
     MeanBtn: "/pdf/Full-Stack-Development.pdf",
     MernBtn: "/pdf/Mern-Full-Stack-Development.pdf",
     AngularBtn: "/pdf/Frontend-Development.pdf",
     AIPythonBtn: "/pdf/Artificial-Intelligence.pdf",
     MachineLearningPythonBtn: "/pdf/Machine-Learning.pdf",
     JavaReactBtn: "/pdf/Core-Java-Android-Flutter.pdf",
     WebDesignBtn: "/pdf/Web-Designing.pdf",
     ISTQBBtn: "/pdf/Software-Testing.pdf",
     UIBtn: "/pdf/UI-UX-Design.pdf",
     DSandABtn: "/pdf/Data-Structures-and-Algorithms.pdf",
     VideoEditingBtn: "/pdf/Video-Editing.pdf",
     TableauBtn: "/pdf/Tableau.pdf",
     PythonFSDBtn: "/pdf/Python-Full-Stack-Development.pdf",
     PowerBIBtn: "/pdf/Power-BI.pdf",
     GraphicDesignBtn: "/pdf/Graphic-Designing.pdf",
     EthicialBtn: "/pdf/Ethical-Hacking.pdf",
     CyberSecurBtn: "/pdf/Cyber-Security.pdf"
   };
   
   function setDownload(key) {
     downloadStatus = true;
     pdfUrl = allPdf[key];
   }
   
   function setFormValue(field, value) {
     formValue[field] = value;
   }
   
   async function submitForm(event) {
     event.preventDefault();
   
     const form = event.target;
     const submitBtn = form.querySelector("#submitBtn");
   
     try {
       const data = new FormData(form);
   
       let mobile = data.get("mobile");
       if (typeof mobile === "object") mobile = "";
       const digits = String(mobile).replace(/\D/g, "");
   
       if (digits.length !== 10) {
         Swal.fire({
           icon: "error",
           title: "Invalid Phone Number",
           text: "Please enter exactly 10 digits (numbers only)",
           customClass: { container: "swal-top" }
         });
         if (form.elements.mobile) form.elements.mobile.focus();
         return;
       }
   
       data.set("mobile", digits);
   
       if (downloadStatus) {
         data.set("location", data.get("location") + " (The Data From Download Brochure Form)");
       }
   
       if (submitBtn) {
         submitBtn.disabled = true;
         submitBtn.classList.add("blur");
       }
   
       const loader = Swal.fire({
         title: "⏳ Hang Tight!",
         html: `
                 <div style="font-size: 22px; line-height: 1.6; text-align: left;">
                     We're securely submitting your information <span style="color:#ff5124"><strong>to our system</strong></span> 🔐<br><br>
                     🚀 This may take a few seconds — please don't refresh or close the page.<br>
                     💬 Our team is preparing a personalized response just for you.<br><br>
                     🙏 Thank you for your patience — your success journey is important to us!
                 </div>
             `,
         allowOutsideClick: false,
         didOpen: () => Swal.showLoading(),
         customClass: { container: "swal-top" }
       });
   
       const response = await axios.post(
         "https://uncodemy.com/php/formSubmitUncodemyIn.php",
         data,
         { headers: { "Content-Type": "multipart/form-data" } }
       );
   
       await loader.close();
   
       if (response.data.status !== "success") {
         throw new Error(response.data.message || "Submission failed");
       }
   
       form.reset();
   
       const formParent = document.getElementById("form-parent");
       const overlay = document.getElementById("overlay");
       if (formParent && overlay) {
         formParent.style.display = "none";
         document.body.style.overflow = "auto";
         overlay.style.display = "none";
       }
   
       if (downloadStatus) {
         window.open(pdfUrl, "_blank");
         downloadStatus = false;
       } else {
         await Swal.fire({
           icon: "success",
           title: "✨Congratulations🎉!",
           html: `
                         <div style="font-size: 22px; line-height: 1.5;">
                             You're one step closer to a <span style="color:#ff5124"><strong>Career Counseling Session</strong></span> with our experts at <strong>Uncodemy</strong>!<br><br>
                             ✅ Our team will contact you shortly with all the details.<br>
                             📩 Please check your <strong>📩Email</strong> and <strong>📲WhatsApp</strong> for further information and next steps.<br><br>
                             🚀 Let's shape your career journey together!
                         </div>
                     `,
           showConfirmButton: false,
           timer: 4000,
           customClass: { container: "swal-top" }
         });
         window.location.href = "https://uncodemy.com/thankyou-page";
       }
     } catch (err) {
       let message = "Sorry, some error occurred. Please try again.";
       if (err.response) {
         message = err.response.data?.message || `Server responded with ${err.response.status}`;
       } else if (err.request) {
         message = "No response from server. Please check your connection.";
       }
       Swal.fire({
         icon: "error",
         title: "Submission Failed",
         text: message,
         customClass: { container: "swal-top" }
       });
     } finally {
       if (submitBtn) {
         submitBtn.disabled = false;
         submitBtn.classList.remove("blur");
       }
     }
   }
   
   /* ------------------------------------------------------ swal z-index style */
   
   if (!document.getElementById("swal-top-style")) {
     const style = document.createElement("style");
     style.id = "swal-top-style";
     style.textContent = `
         .swal-top {
             z-index: 99999 !important;
         }
         .swal2-container {
             z-index: 99999 !important;
         }
     `;
     document.head.appendChild(style);
   }
   
   /* --------------------------------------------------------- demo popup form */
   
   async function submitPopUpForm(event) {
     event.preventDefault();
   
     const submitBtn = document.getElementById("submitBtn3");
     const forms = document.querySelectorAll(".form-thumb");
   
     if (popUpFormValue.mobile.length !== 10) {
       alert("Phone number must be 10 digits long");
       return;
     }
   
     const data = new FormData();
     data.append("name", popUpFormValue.name);
     data.append("email", popUpFormValue.email);
     data.append("mobile", popUpFormValue.mobile);
     data.append("course", popUpFormValue.course);
     data.append("date", popUpFormValue.date);
     data.append("fromTime", popUpFormValue.fromTime);
     data.append("toTime", popUpFormValue.toTime);
   
     if (submitBtn) {
       submitBtn.disabled = true;
       submitBtn.classList.add("blur");
     }
   
     try {
       const response = await axios.post("https://uncodemy.com/php/DemoDetailForm.php", data);
   
       if (response.data == 11) {
         const container = document.querySelector(".pop-up-form-container");
         const overlay = document.getElementById("overlay");
         if (container) container.style.display = "none";
         document.body.style.overflow = "auto";
         if (overlay) overlay.style.display = "none";
   
         Swal.fire({
           icon: "success",
           title: "Congratulations!",
           html: 'Your Queries have been booked for the <span style="color:#ff5124">Demo Session</span> with our Experts. Our Team will connect you soon with Detailed Information',
           showConfirmButton: false,
           timer: 3000
         }).then(() => {
           window.location.href = "https://uncodemy.com/thankyou-page";
         });
   
         forms.forEach(f => f.reset());
       } else {
         alert("Sorry, some error occurred");
       }
     } catch (err) {
       alert("Sorry, a server issue occurred. Please try again. Error: " + err.message);
     } finally {
       if (submitBtn) {
         submitBtn.disabled = false;
         submitBtn.classList.remove("blur");
       }
     }
   }
   
   /* ------------------------------------------------------------ video player */
   
   function handleIntersection(entries) {
     entries.forEach(entry => {
       const video = entry.target;
       if (entry.isIntersecting) {
         if (!video.hasAttribute("data-played")) video.setAttribute("data-played", "true");
         video.play();
       } else {
         video.pause();
       }
     });
   }
   
   /* -------------------------------------------------------- input sanitizers */
   
   window.addEventListener("DOMContentLoaded", function () {
     document.querySelectorAll('input[type="tel"]').forEach(function (input) {
       input.addEventListener("input", function () {
         this.value = this.value.replace(/\D/g, "");
       });
     });
   
     document.querySelectorAll('input[name="location"]').forEach(function (input) {
       input.addEventListener("input", function () {
         this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
       });
     });
   });
   
   /* ============================== SCROLL ===================================
      FIX 2: was `window.onscroll = () => {...}` — plain assignment.
      Also guarded: .course-banner does not exist on every page.
      ========================================================================= */
   
   window.addEventListener("scroll", function () {
     const banner = document.querySelector(".course-banner");
     const navContainer = document.querySelector(".nav-container");
     const pageNav = document.querySelector(".page-navigation");
     const navTop = document.querySelector(".nav-top-head");
   
     if (!banner || !navContainer || !pageNav || !navTop) return;
   
     const scrolled = document.documentElement.scrollTop;
   
     if (scrolled >= banner.scrollHeight) {
       pageNav.style.display = "block";
       navTop.style.display = "none";
       navContainer.style.display = "none";
     } else {
       pageNav.style.display = "none";
       if (window.innerWidth > 900) {
         navTop.style.display = "flex";
         navContainer.style.display = "flex";
       } else {
         navContainer.style.display = "flex";
         navTop.style.display = "inline-block";
         navTop.style.justifyContent = "flex-end";
       }
     }
   });
   
   /* --------------------------------------------------- smooth scroll buttons */
   
   document.addEventListener("DOMContentLoaded", function () {
     document.querySelectorAll(".page-navigation-btn").forEach(function (btn) {
       btn.addEventListener("click", function () {
         const target = document.getElementById(this.getAttribute("data-target"));
         if (target) window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
       });
     });
   });
   
   /* ---------------------------------------------------------- jQuery read-more */
   
   if (typeof window.jQuery !== "undefined") {
     jQuery(document).ready(function ($) {
       $(".read").click(function () {
         $(this).prev(".more").toggle();
         $(this).siblings(".dots").toggle();
         $(this).text($(this).text() === "Read more" ? "Read less" : "Read more");
       });
     });
   }
   
   /* ----------------------------------------------------------- video observer
   
      NOTE: in the original file `observer` was created and `video` was selected,
      but observer.observe(video) was NEVER called — so handleIntersection never
      ran. Kept as-is to avoid changing behaviour. If autoplay-on-scroll was the
      intent, uncomment the observe() line below.
      -------------------------------------------------------------------------- */
   
   const options = { root: null, rootMargin: "0px", threshold: 0.5 };
   const observer = new IntersectionObserver(handleIntersection, options);
   const video = document.querySelector(".why");
   // if (video) observer.observe(video);
   
   /* -------------------------------------------------------- read more toggles */
   
   function toggleHiddenContent() {
     const dots = document.getElementById("dots");
     const more = document.getElementById("more");
     const btn = document.getElementById("readMoreBtn");
     if (!dots || !more || !btn) return;
   
     if (dots.style.display === "none") {
       dots.style.display = "inline";
       more.style.display = "none";
       btn.innerHTML = "Read More";
     } else {
       dots.style.display = "none";
       more.style.display = "inline";
       btn.innerHTML = "Read Less";
     }
   }
   
   function toggleHiddenContentnew() {
     const dots = document.getElementById("dotsnew");
     const more = document.getElementById("morenew");
     const btn = document.getElementById("readMoreBtnnew");
     if (!dots || !more || !btn) return;
   
     if (dots.style.display === "none") {
       dots.style.display = "inline";
       more.style.display = "none";
       btn.innerHTML = "Read More";
     } else {
       dots.style.display = "none";
       more.style.display = "inline";
       btn.innerHTML = "Read Less";
     }
   }
   
   /* --------------------------------------------------------- course search / redirect */
   
   function getCourseCity(event) {
     if (event.target.id === "course-select") {
       courseName = event.target.value.replace(/\s+/g, "-");
     } else {
       cityName = event.target.value;
     }
   }
   
   function filterMatchingFileNames(fileNames) {
     return fileNames.filter(function (file) {
       const parts = file.split("-");
   
       const trainingIdx = parts.findIndex(p => p.toLowerCase() === "training");
       const courseIdx = parts.findIndex(p => p.toLowerCase() === "course");
       const cut = Math.min(
         trainingIdx !== -1 ? trainingIdx : Infinity,
         courseIdx !== -1 ? courseIdx : Infinity
       );
   
       const filePart = parts.slice(0, cut).join("-");
       const inIdx = parts.findIndex(p => p.toLowerCase() === "in");
       const cityPart = parts.slice(inIdx + 1).join("-");
   
       return filePart.toLowerCase() === String(courseName).toLowerCase() &&
              cityPart.toLowerCase() === String(cityName).toLowerCase();
     });
   }
   
   function moveToCoursePage() {
     fetch("allfilename.txt")
       .then(res => res.text())
       .then(text => {
         const matches = filterMatchingFileNames(text.split("\n"));
         if (matches.length > 0) window.open(`course/${matches[0]}`);
         else alert("Sorry no such match is found");
       })
       .catch(err => {
         console.error("moveToCoursePage failed:", err);
       });
   }