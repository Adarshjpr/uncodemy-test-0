
/**
 * Student Placement Carousel — Dynamic Renderer (Images with Text Labels)
 * WITH INFINITE SLIDER FUNCTIONALITY
 * -----------------------------------------------------------------
 * <div class="college"> ke andar images ke saath unke niche text bhi dikhega.
 * Left/Right arrows se carousel infinite loop mein slide karega.
 * Arrows kabhi hide nahi honge — hamesha visible rahenge.
 *
 * Usage:
 *   1. Container me ye markup rakho:
 *      <div id="placement-carousel-container"></div>
 *   2. Is file ko include karo aur renderCarousel() call karo
 *      (auto-init already niche diya hai DOMContentLoaded pe).
 * -----------------------------------------------------------------
 */

(function () {
    "use strict";
  
    // ------------------------------------------------------------------
    // 1. DATA — yahi ek jagah edit karni hai students add/remove/update karne ke liye
    // ------------------------------------------------------------------
    const STUDENTS_DATA = [
      {
        id: 1,
        name: "Rajendra Yadav",
        img: "/img/placement/rajendra.jpg",
        from: "Rajendra Institute",
        fromLogo: "/img/placement/rajendra.png",
        to: "Microsoft",
        toLogo: "/img/placement/rajendra (2).png",
      },
      {
        id: 2,
        name: "Neelam Nishad",
        img: "/img/placement/neelam.jpeg",
        from: "Ashoka University",
        fromLogo: "/img/placement/ashoka.png",
        to: "Deloitte",
        toLogo: "/img/placement/deloitte.png",
      },
      {
        id: 3,
        name: "Arun Pal",
        img: "/img/placement/arun.jpeg",
        from: "Indiana University",
        fromLogo: "/img/placement/Indiana-University-Symbol1.png",
        to: "Maruti Suzuki",
        toLogo: "/img/placement/maruti.png",
      },
      {
        id: 4,
        name: "Juhi Sharma",
        img: "/img/placement/juhi.jpeg",
        from: "Galgotias University",
        fromLogo: "/img/placement/galgotias1.png",
        to: "Rapidops",
        toLogo: "/img/placement/rapidops.png",
      },
      {
        id: 5,
        name: "Deepak",
        img: "/img/placement/deepak.jpeg",
        from: "Nalanda University",
        fromLogo: "/img/placement/nalanda.png",
        to: "IBM",
        toLogo: "/img/placement/IBM_logo.svg.png",
      },
      {
        id: 6,
        name: "Abhilasha Rathi",
        img: "/img/placement/abhilasha.jpg",
        from: "Amity University",
        fromLogo: "/img/placement/amity.png",
        to: "Infosys",
        toLogo: "/img/placement/infosys.png",
      },
      {
        id: 7,
        name: "Aditya Singh",
        img: "/img/placement/adityaSingh.jpg",
        from: "LPU",
        fromLogo: "/img/placement/lpu.png",
        to: "Deloitte",
        toLogo: "/img/placement/deloitte.png",
      },
      {
        id: 8,
        name: "Ritesh Singh",
        img: "/img/placement/riteshSingh.jpg",
        from: "Nalanda University",
        fromLogo: "/img/placement/nalanda.png",
        to: "Bloohash",
        toLogo: "/img/placement/bloohash.png",
      },
      {
        id: 9,
        name: "Tanvi Singh",
        img: "/img/placement/Tanvi.png",
        from: "IMS Ghaziabad",
        fromLogo: "/img/placement/imsghaziabad.png",
        to: "Deloitte",
        toLogo: "/img/placement/deloitte.png",
      },
      {
        id: 10,
        name: "Riya Tiwari",
        img: "/img/placement/riyatiwari1.jpg",
        from: "Delhi University",
        fromLogo: "/img/placement/download.png",
        to: "HCL",
        toLogo: "/img/placement/hcl.jpg",
      },
      {
        id: 11,
        name: "Vishal Singh",
        img: "/img/placement/vishal.jpeg",
        from: "Amity University",
        fromLogo: "/img/placement/amity.png",
        to: "Mindit",
        toLogo: "/img/placement/mindit.png",
      },
      {
        id: 12,
        name: "Shruti",
        img: "/img/placement/shruti.jpeg",
        from: "Indiana University",
        fromLogo: "/img/placement/Indiana-University-Symbol1.png",
        to: "AppInventive",
        toLogo: "/img/placement/appinventive.png",
      },
      {
        id: 13,
        name: "Prashant",
        img: "/img/placement/prashant.jpeg",
        from: "SRM University",
        fromLogo: "/img/placement/srm.jpg",
        to: "TechExactly",
        toLogo: "/img/placement/techexactly1.jpeg",
      },
      {
        id: 14,
        name: "Babita Singh",
        img: "/img/placement/babita.jpeg",
        from: "SRM University",
        fromLogo: "/img/placement/srm.jpg",
        to: "HCL",
        toLogo: "/img/placement/hcl.jpg",
      },
      {
        id: 15,
        name: "Abhishek Kumar",
        img: "/img/placement/Abhishek Kumar.jpeg",
        from: "Runex",
        fromLogo: "/img/placement/runex.png",
        to: "MamaEarth",
        toLogo: "/img/placement/mama.png",
      },
      {
        id: 16,
        name: "Saurabh Mishra",
        img: "/img/placement/saurabh.jpg",
        from: "NIIT",
        fromLogo: "/img/placement/niit.png",
        to: "KPMG",
        toLogo: "/img/placement/kpmg.png",
      },
      {
        id: 17,
        name: "Neha Sharma",
        img: "/img/placement/Abhilasha Rathi .jpeg",
        from: "Sikkim University",
        fromLogo: "/img/placement/sikkim.png",
        to: "Infosys",
        toLogo: "/img/placement/infosys.png",
      },
      {
        id: 18,
        name: "Himanshu Tyagi",
        img: "/img/placement/Himanshu Tyagi .jpeg",
        from: "Grelogic",
        fromLogo: "/img/placement/grelogic (1).png",
        to: "RipensApps",
        toLogo: "/img/placement/ripensapps.png",
      },
    ];
  
    // Arrow image path (constant)
    const ARROW_IMG = "/img/tools/arrows-removebg-preview.png";
  
    // ------------------------------------------------------------------
    // 2. SLIDER FUNCTIONALITY — INFINITE LOOP
    // ------------------------------------------------------------------
    function initCarousel() {
      const carousel = document.querySelector(".carousel");
      const leftArrow = document.getElementById("left");
      const rightArrow = document.getElementById("right");
  
      if (!carousel || !leftArrow || !rightArrow) return;
  
      const cards = carousel.querySelectorAll(".card");
      if (!cards || cards.length === 0) return;
  
      // Get card width with gap
      function getCardWidth() {
        const firstCard = cards[0];
        if (!firstCard) return 180;
        // Get computed gap from CSS
        const style = window.getComputedStyle(carousel);
        const gap = parseFloat(style.gap) || 16;
        return firstCard.offsetWidth + gap;
      }
  
      function getMaxScroll() {
        return carousel.scrollWidth - carousel.clientWidth;
      }
  
      // Scroll function with infinite loop
      function scrollCarousel(direction) {
        const cardWidth = getCardWidth();
        const currentScroll = carousel.scrollLeft;
        const maxScroll = getMaxScroll();
  
        let newScroll;
        if (direction === "left") {
          newScroll = currentScroll - cardWidth;
          // Agar start pe hai toh end pe jump karo
          if (newScroll < 0) {
            newScroll = maxScroll;
          }
        } else {
          newScroll = currentScroll + cardWidth;
          // Agar end pe hai toh start pe jump karo
          if (newScroll > maxScroll) {
            newScroll = 0;
          }
        }
  
        carousel.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }
  
      // Event listeners — arrows hamesha visible rahenge
      leftArrow.addEventListener("click", function (e) {
        e.preventDefault();
        scrollCarousel("left");
      });
  
      rightArrow.addEventListener("click", function (e) {
        e.preventDefault();
        scrollCarousel("right");
      });
  
      // Keyboard support
      carousel.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollCarousel("left");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollCarousel("right");
        }
      });
  
      // Touch/Swipe support
      let touchStartX = 0;
      let touchEndX = 0;
  
      carousel.addEventListener(
        "touchstart",
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );
  
      carousel.addEventListener(
        "touchend",
        function (e) {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 50) {
            // Minimum swipe distance
            if (diff > 0) {
              scrollCarousel("right");
            } else {
              scrollCarousel("left");
            }
          }
        },
        { passive: true }
      );
  
      // Arrows ko hamesha visible rakho — kabhi hide mat karo
      leftArrow.style.display = "flex";
      rightArrow.style.display = "flex";
  
      // Window resize par card width recalculate karne ke liye
      let resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          // Bas card width recalculate ho jayegi next click pe
        }, 250);
      });
    }
  
    // ------------------------------------------------------------------
    // 3. RENDER FUNCTION
    // ------------------------------------------------------------------
    function renderCarousel(data = STUDENTS_DATA, targetSelector = null) {
      // Build carousel cards
      const cardsHtml = data
        .map(
          (student) => `
            <li class="card">
              <div class="img">
                <img draggable="false" class="lazy-load" data-src="${student.img}" alt="${student.name}">
              </div>
              <b class="placed-student-name">${student.name}</b>
              <div class="college">
                <div class="college-item">
                  <img class="school lazy-load" data-src="${student.fromLogo}" alt="${student.name} - College Logo">
                  <span class="college-label">${student.from}</span>
                </div>
                <img class="arro lazy-load" data-src="${ARROW_IMG}" alt="arrow">
                <div class="college-item">
                  <img class="school lazy-load" data-src="${student.toLogo}" alt="${student.name} - Company Logo">
                  <span class="college-label">${student.to}</span>
                </div>
              </div>
            </li>`
        )
        .join("\n");
  
      // Build complete HTML
      const html = `
        <div class="wrapper">
          <i id="left" class="fa-solid fa-angle-left"></i>
          <ul class="carousel">
            ${cardsHtml}
          </ul>
          <i id="right" class="fa-solid fa-angle-right"></i>
        </div>`;
  
      // Find target container
      const target =
        (targetSelector && document.querySelector(targetSelector)) ||
        document.getElementById("placement-carousel-container") ||
        document.querySelector(".wrapper")?.parentElement;
  
      if (!target) {
        console.warn(
          `[placement-carousel] Target container not found. Add <div id="placement-carousel-container"></div> to your page.`
        );
        return;
      }
  
      // If target already has wrapper, replace it; otherwise set innerHTML
      const existingWrapper = target.querySelector(".wrapper");
      if (existingWrapper) {
        existingWrapper.outerHTML = html;
      } else {
        target.innerHTML = html;
      }
  
      // Initialize carousel slider
      setTimeout(initCarousel, 50);
    }
  
    // ------------------------------------------------------------------
    // 4. AUTO-INIT + PUBLIC API
    // ------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
      renderCarousel();
    });
  
    // Expose for manual re-render / external data injection
    window.PlacementCarousel = {
      render: renderCarousel,
      data: STUDENTS_DATA,
    };
  })();