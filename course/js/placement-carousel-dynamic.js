/**
 * Student Placement Carousel — Dynamic Renderer
 * -----------------------------------------------------------------
 * CSS/classes bilkul same rakhe gaye hain (uc-placement-*, uc-carousel-*).
 * Structure ab PLACEMENT_DATA se generate hota hai. Original markup me
 * saare slides do baar the (seamless infinite-scroll loop ke liye) —
 * ab wo duplication auto ho jata hai, data sirf ek baar likhna hai.
 * -----------------------------------------------------------------
 */

(function () {
    "use strict";
  
    // ------------------------------------------------------------------
    // 1. DATA — naya placement add karna ho to bas yahan ek entry daal do
    // ------------------------------------------------------------------
    const PLACEMENT_DATA = {
      sectionSelector: ".uc-placement-carousel",
      header: {
        title: "Our Student Success Stories",
        subtitle:
          "Join thousands of students who transformed their careers with Uncodemy and landed dream jobs at top companies",
      },
      duplicateForLoop: true, // true => slides 2x render honge (seamless marquee loop)
      students: [
        { img: "ds-plac1.jpeg", badge: "HIGHEST", name: "Sweety", company: "Infosys", package: "18 LPA", role: "Scrum Master" },
        { img: "ds-plac2.jpeg", badge: "TOP PLACEMENT", name: "Akshay Patil", company: "", package: "14 LPA", role: "Data Scientist" },
        { img: "ds-plac3.jpeg", badge: "TOP PLACEMENT", name: "Farhan Noman", company: "Cubastion", package: "9.5 LPA", role: "Senior Associate Consultant" },
        { img: "ds-plac4.jpeg", badge: "TOP PLACEMENT", name: "Divya Pandey", company: "Qudys", package: "8.5 LPA", role: "Data Quality Analyst" },
        { img: "ds-plac5.jpeg", badge: "TOP PLACEMENT", name: "Shahil Growar", company: "Midland Credit", package: "7.5 LPA", role: "Senior Marketing Analyst" },
        { img: "ds-plac6.jpeg", badge: "TOP PLACEMENT", name: "Shweta Nigam", company: "F15", package: "6.8 LPA", role: "Business Analyst" },
        { img: "ds-plac7.jpeg", badge: "TOP PLACEMENT", name: "Saniya Agarwal", company: "Fiserv", package: "6.5 LPA", role: "Business Analyst" },
        { img: "ds-plac8.jpeg", badge: "TOP PLACEMENT", name: "Rupali Ojha", company: "HSBC", package: "5.5 LPA", role: "Business Analyst" },
        { img: "ds-plac9.jpeg", badge: "TOP PLACEMENT", name: "", company: "Capaeminia", package: "5.5 LPA", role: "Pune Location" },
        { img: "ds-plac10.jpeg", badge: "RECENT", name: "Pawan Mehra", company: "upGrad", package: "5.0 LPA", role: "MIS Analyst" },
        { img: "ds-plac11.jpeg", badge: "RECENT", name: "Fatima", company: "Cess Meditech", package: "4.8 LPA", role: "Business Analyst" },
        { img: "ds-plac12.jpeg", badge: "RECENT", name: "Neeva Shah", company: "Make", package: "4.5 LPA", role: "Business Analyst" },
        { img: "ds-plac13.jpeg", badge: "RECENT", name: "Neeva Shah", company: "Make", package: "4.5 LPA", role: "Business Analyst" },
        { img: "ds-plac14.jpeg", badge: "RECENT", name: "Nikhil Sawran", company: "Jetking", package: "4.44 LPA", role: "Technical Trainer" },
        { img: "ds-plac15.jpeg", badge: "RECENT", name: "Mehak Khan", company: "Clarivate", package: "4 LPA", role: "IP Renewals Analyst" },
        { img: "ds-plac16.jpeg", badge: "RECENT", name: "Kundan Kumar", company: "FabricRear", package: "3.5 LPA", role: "MIS Executive" },
        { img: "ds-plac17.jpeg", badge: "RECENT", name: "Rituraj", company: "HCL", package: "3.5 LPA", role: "MIS Executive" },
        { img: "ds-plac18.jpeg", badge: "RECENT", name: "Rohit Dhulankar", company: "BrownWall", package: "3.24 LPA", role: "Purchase Executive" },
        { img: "ds-plac19.jpeg", badge: "RECENT", name: "Kartikeya", company: "MarkScan", package: "3 LPA", role: "Research Analyst" },
        { img: "ds-plac20.jpeg", badge: "RECENT", name: "Yash", company: "BIZS Technologies", package: "3 LPA", role: "Business Analyst" },
      ],
    };
  
    const IMG_BASE_PATH = "/img/placement/";
  
    // ------------------------------------------------------------------
    // 2. HELPERS
    // ------------------------------------------------------------------
    function buildAltText(s) {
      const namePart = s.name ? `${s.name} - ` : "";
      const companyPart = s.company ? ` at ${s.company}` : "";
      return `${namePart}Placed${companyPart} as ${s.role} - ${s.package}`;
    }
  
    function buildSlide(s) {
      const nameLine = s.name ? `<div class="uc-student-name">${s.name}</div>` : "";
      const companyLine = s.company ? `<div class="uc-placement-company">${s.company}</div>` : "";
  
      return `
          <div class="uc-carousel-slide">
            <div class="uc-placement-badge">${s.badge}</div>
            <img
              src="${IMG_BASE_PATH}${s.img}"
              alt="${buildAltText(s)}"
              class="uc-carousel-img"
              loading="lazy"
            />
            <div class="uc-placement-overlay">
              ${nameLine}
              ${companyLine}
              <div class="uc-placement-package">${s.package}</div>
              <div class="uc-placement-role">${s.role}</div>
            </div>
          </div>`;
    }
  
    // ------------------------------------------------------------------
    // 3. MAIN RENDER FUNCTION
    // ------------------------------------------------------------------
    function renderPlacementCarousel(data = PLACEMENT_DATA, targetSelector = null) {
      const slidesOnce = data.students.map(buildSlide).join("\n");
      const slidesHtml = data.duplicateForLoop ? slidesOnce + "\n" + slidesOnce : slidesOnce;
  
      const html = `
        <div class="uc-placement-header">
          <h2 class="uc-placement-title">${data.header.title}</h2>
          <p class="uc-placement-subtitle">
            ${data.header.subtitle}
          </p>
        </div>
        <div class="uc-carousel-track">
          ${slidesHtml}
        </div>`;
  
      const target = document.querySelector(targetSelector || data.sectionSelector);
  
      if (!target) {
        console.warn(
          `[placement-carousel-dynamic] Target section not found. Add <section class="uc-placement-carousel" aria-label="Student Placement Records"></section> to your page.`
        );
        return;
      }
  
      target.setAttribute("aria-label", "Student Placement Records");
      target.innerHTML = html;
    }
  
    // ------------------------------------------------------------------
    // 4. AUTO-INIT + PUBLIC API
    // ------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
      renderPlacementCarousel();
    });
  
    window.PlacementCarouselRenderer = {
      render: renderPlacementCarousel,
      data: PLACEMENT_DATA,
    };
  })();