function loadScript(e, t) { var n = document.createElement("script"); n.src = e, n.onload = t, document.head.appendChild(n) }

function initializeFastClick() { "addEventListener" in document && document.addEventListener("DOMContentLoaded", (function () { FastClick.attach(document.body) })) }

function handleKnowMoreClick(e) { e.preventDefault(); const t = e.currentTarget.closest("a").getAttribute("href"); t && (window.location.href = t) }

function createForm() { const e = document.createElement("div"); e.id = "form-parent"; const t = document.createElement("div"); t.classList.add("form-main-container", "main-container"); const n = document.createElement("i"); n.classList.add("close-sign", "fa-sharp", "fa-solid", "fa-square-xmark"), n.style.color = "#ff5421", n.onclick = hideForm; const o = document.createElement("div"); o.classList.add("form-header-container"); const a = document.createElement("div"); a.classList.add("header-section"), a.textContent = "Application Form"; const i = document.createElement("div"); i.classList.add("form-container"); const c = document.createElement("form"); c.onsubmit = submitForm, c.id = "form"; const r = createInputSection("text", "name", "Name"); r.classList.add("ANN"); const s = createInputSection("email", "email", "Email Address"); s.classList.add("ANN"); const l = createInputSection("tel", "mobile", "Phone Number"); l.classList.add("ANN"); const d = createInputSection("text", "location", "Location"); d.classList.add("ANN"); const u = createCourseSelectSection(); u.classList.add("ANN"); const m = document.createElement("input"); m.type = "submit", m.classList.add("submit-btn"), m.id = "submitBtn", i.append(c), c.append(r, s, l, d, u, m), o.append(a, i), t.append(n, o), e.append(t), document.body.appendChild(e) }

function createInputSection(e, t, n) { const o = document.createElement("div"); o.classList.add("input-section", "name-section"); const a = createInput(e, t, n, !0, setFormValue), i = document.createElement("label"); return i.textContent = n, o.append(a, i), o }

function createInput(e, t, n, o, a) { const i = document.createElement("input"); return i.type = e, i.name = t, i.placeholder = n, i.required = o, "tel" === e && (i.maxLength = 10, i.addEventListener("input", (function () { this.value = this.value.replace(/\D/g, "") }))), i.onchange = function () { a.call(null, this.name, this.value) }, i }

/* ---------- COURSE LIST (ek hi jagah, dono forms yahi se bharenge) ---------- */
const COURSE_LIST = ["Data Science", "Business Analyst", "Data Analytics", "API Automation", "Automation Testing", "Playwright Automation Testing", "Full Stack Development", "Artificial Intelligence", "Digital Marketing", "Amazon Web Services ", "DevOps", "Cloud Computing", "Full Stack With NodeJs", "python Full Stack", "Java Full Stack Using React", ".NET Full Stack", "Web Designing", "Angular", "ReactJs", "Mean", "Mern", "Web Development", "Python", "Data Analytics using Python", "Advanced Excel", "Data Science & Machine Learning using Python", "Machine Learning using Python", "AI Using Python", "Appium Testing", "Software Testing", "Manual Testing", "ISTQB Training", "Manual + Selenium", "Java Selenium", "Microsoft Azure", "Salesforce", "Advance Digital Marketing", "SEO (Search Engine Optimization)", "Cybersecurity", "Ethical Hacking", "Blockchain", "Cryptocurrency", "Power BI", "SQL Training", "Tableau", "SAP", "SAP FICO", "SAP MM", "SAP PM", "SAP PP", "SAP SCM", "SAP SD", "C With Data Structure And Algorithms", "Object Oriented Data Structure & Algorithms Training", "Java", "Java For Beginners", "Java Expert", "Spring Boot Microservices Security With Hibernate", "R Programming", "UI/UX Designing", "Graphic Designing", "Video Editing", "Guidewire", "IoT", "Vmware", "CORE CCNP", "Advance CCNP", "MSCA", "AUTOCAD", "CNC Programming"];

function createCourseSelectSection() {
    const e = document.createElement("div");
    e.classList.add("input-section", "course-section");
    const t = document.createElement("select");
    t.name = "course", t.required = !0;
    t.addEventListener("change", (function () { setFormValue("course", t.value) }));
    const n = document.createElement("option");
    n.selected = !0, n.disabled = !0, n.textContent = "Select Your Course";
    t.appendChild(n);
    for (const c of COURSE_LIST) { const o = document.createElement("option"); o.textContent = c; t.appendChild(o) }
    const a = document.createElement("label");
    a.textContent = "Course";
    e.append(t, a);
    return e
}

function showForm() { createForm(), displayForm() }
function displayForm() { document.getElementById("form-parent").style.display = "block", document.getElementById("overlay").style.display = "block" }
function hideForm() { const e = document.getElementById("form-parent"); e && (e.style.display = "none", document.getElementById("overlay").style.display = "none") }
function setFormValue(e, t) { }

/* ---------------------------- FORM SUBMIT ---------------------------- */
async function submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const f = form.elements;            // form.name kaam nahi karta, elements se lena zaroori hai
    const btn = form.querySelector('[type="submit"]');

    if (btn) btn.disabled = true;

    try {
        const res = await fetch("https://YOUR-DOMAIN-HERE/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name:     f.name.value,
                email:    f.email.value,
                phone:    f.mobile.value,
                location: f.location ? f.location.value : "",
                course:   f.course.value,
                pageUrl:  window.location.href
            })
        });

        if (!res.ok) throw new Error("Server error " + res.status);

        if (window.Swal) {
            Swal.fire({ icon: "success", title: "Thank you!", text: "Hum jaldi aapse contact karenge.", timer: 4000, showConfirmButton: false });
        } else {
            alert("Thank you! Hum jaldi aapse contact karenge.");
        }
        form.reset();
        hideForm();
    } catch (err) {
        console.error("Lead submit failed:", err);
        if (window.Swal) {
            Swal.fire({ icon: "error", title: "Oops!", text: "Submit nahi ho paya. Please dobara try karein." });
        } else {
            alert("Submit nahi ho paya. Please dobara try karein.");
        }
    } finally {
        if (btn) btn.disabled = false;
    }
}

function numberOnly() { }

/* ---------------------------- POPUP (DEMO) FORM ---------------------------- */
function createPopUpForm() {
    const e = document.createElement("div");
    e.classList.add("pop-up-form-container");
    const t = document.createElement("div");
    t.classList.add("form-section");
    const n = document.createElement("i");
    n.classList.add("close-sign", "fa-sharp", "fa-solid", "fa-square-xmark"), n.style.color = "#ff5421", n.onclick = hidePopUpForm;
    const o = document.createElement("div");
    o.classList.add("form-top-head"), o.textContent = "Application Form";
    const a = document.createElement("form");
    a.onsubmit = submitPopUpForm, a.classList.add("form-thumb");
    const i = createInput("text", "name", "Enter Your Name*", !0, setPopUpFormValue),
          c = createInput("tel", "mobile", "Enter Your Phone No.*", !0, setPopUpFormValue),
          r = createInput("email", "email", "Enter Your Email*", !0, setPopUpFormValue),
          s = document.createElement("select");
    s.name = "course", s.required = !0;
    s.addEventListener("change", (function () { setPopUpFormValue("course", s.value) }));
    const l = document.createElement("option");
    l.selected = !0, l.disabled = !0, l.textContent = "Select Your Course";
    s.appendChild(l);
    for (const cc of COURSE_LIST) { const t2 = document.createElement("option"); t2.textContent = cc; s.appendChild(t2) }

    const m = document.createElement("div");
    m.classList.add("schedule-date", "schedule");
    const p = createInput("date", "date", "dd-mm-yyyy", !0, setPopUpFormValue),
          h = document.createElement("label");
    h.textContent = "dd-mm-yyyy", m.append(p, h);
    const f = document.createElement("div");
    f.classList.add("schedule-time");
    const g = createInput("time", "fromTime", "From*", !0, setPopUpFormValue),
          y = document.createElement("label");
    y.textContent = "From*";
    const S = createInput("time", "toTime", "To*", !0, setPopUpFormValue),
          E = document.createElement("label");
    E.textContent = "To*", f.append(g, y, S, E);
    const v = document.createElement("input");
    v.type = "submit", v.classList.add("submit-btn"), v.id = "submitBtn3";
    a.append(i, c, r, s, p, g, S, v), t.append(n, o, a), e.append(t), document.body.appendChild(e)
}

function showPopUpForm() { createPopUpForm(), displayPopForm() }
function displayPopForm() { document.querySelector(".pop-up-form-container").style.display = "block", document.getElementById("overlay").style.display = "block" }
function hidePopUpForm() { const e = document.querySelector(".pop-up-form-container"); e && (e.style.display = "none", document.getElementById("overlay").style.display = "none") }
function submitPopUpForm(e) { e.preventDefault() }
function setPopUpFormValue(e, t) { }

/* ------- FIX: page ke DONO static course dropdown bharna (duplicate id) ------- */
document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll("#staticCourse, .staticCourse, select[name='course']");
    if (!selects.length) return;

    selects.forEach(function (sel) {
        if (sel.dataset.courseLoaded === "true") return;
        if (sel.closest(".pop-up-form-container") || sel.closest("#form-parent")) return; // popup apna khud bharta hai
        COURSE_LIST.forEach(function (name) {
            const opt = document.createElement("option");
            opt.textContent = name;
            opt.value = name;
            sel.appendChild(opt);
        });
        sel.dataset.courseLoaded = "true";
    });
});

/* --------------------- INPUT SANITISATION --------------------- */
window.addEventListener("DOMContentLoaded", function () {
    var e = document.querySelectorAll('input[type="tel"]'),
        t = document.querySelectorAll('input[name="location"]');
    e.forEach(function (el) { el.addEventListener("input", function () { this.value = this.value.replace(/\D/g, "") }) });
    t.forEach(function (el) { el.addEventListener("input", function () { this.value = this.value.replace(/[^a-zA-Z\s]/g, "") }) });
});

loadScript("https://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js", (function () {
    initializeFastClick();
    document.querySelectorAll(".glow-on-hover").forEach((e => { e.addEventListener("click", handleKnowMoreClick) }))
}));

/* --------------------- NAV / DROPDOWN --------------------- */
let isDropdownVisible = !1;
function toggleDropdown(e) { const t = document.querySelectorAll(".dropdown-course")[e]; isDropdownVisible = !isDropdownVisible, t.style.display = isDropdownVisible ? "block" : "none" }
function handleScroll() { const e = document.querySelector("#main-nav"); e && window.innerWidth > 1e3 && (window.scrollY > 0 ? (e.classList.add("fixed"), document.querySelectorAll(".dropdown-course").forEach((el => { el.style.display = "none" })), isDropdownVisible = !1) : e.classList.remove("fixed")) }
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);

/* ------ CERTIFICATE FORM (har page pe nahi hota - guard zaroori hai) ------ */
const certForm = document.getElementById("certificateForm");
if (certForm) {
    certForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const t = new FormData(certForm),
              n = document.getElementById("phoneNumber").value;
        if (!/^[0-9]{10}$/.test(n)) return void alert("Please enter a valid 10-digit phone number.");
        const o = document.querySelector(".submit-button");
        o.disabled = !0;
        fetch("https://uncodemy.com/php/certificate-form.php", { method: "POST", body: t })
            .then((r => r.json()))
            .then((r => {
                r.success
                    ? Swal.fire({ icon: "success", title: "Success!", text: r.message, showConfirmButton: !1, timer: 5e3 }).then((() => { window.location.href = "/" }))
                    : Swal.fire({ icon: "error", title: "Oops!", text: "Error: " + r.error, showConfirmButton: !0 });
                o.disabled = !1;
            }))
            .catch((() => {
                Swal.fire({ icon: "error", title: "Oops!", text: "There was a problem submitting your request. Please try again.", showConfirmButton: !0 });
                o.disabled = !1;
            }));
    });
}