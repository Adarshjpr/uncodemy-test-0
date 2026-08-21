/**
 * Offer Card — Dynamic Renderer (Multi-Course, URL-based)
 * Same HTML structure aur CSS classes jo pehle the — CSS me KUCH change nahi.
 * Sirf ye ek JS file sab pages par include karo.
 *
 * Usage (har page par same):
 *   <div id="offer-card-container"></div>
 *   <script src="js/offer-card.js"></script>
 */

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // 1. COMMON DATA — jo har course card me same rehta hai
  // ------------------------------------------------------------------
  const OFFER_DATA = {
    ribbonText: "LIMITED TIME OFFER",
    heading: "Special Offer Fee",
    subText: "(For Limited Seats Only)",
    nowPayText: "Now Pay Only",
    emiLabel: "EMI AVAILABLE",
    features: [
      {
        icon: "fa-solid fa-bullseye",
        text: "Risk-Free Trial – Attend 2 Classes",
      },
      {
        icon: "fa-regular fa-circle-check",
        text: "No Hidden Charges",
      },
    ],
    btnText: "Book Your Seat Now",
    btnOnClick: "showForm()",
    fillingText: "Seats are filling fast!",
  };

  // ------------------------------------------------------------------
  // 2. COURSE-WISE DATA — yahi ek jagah edit karni hai pricing change ke liye
  // ------------------------------------------------------------------
  // NOTE:
  //  - priceBox   = OTP "With GST" column value (fee structure sheet se)
  //  - priceGst   = khaali rakha hai kyunki priceBox already GST-inclusive hai
  //  - emiValue   = EMI/2-Installments "With GST" value ko 6 se divide karke
  //                 monthly figure banaya gaya hai
  const COURSE_DATA = {
    "data-science": {
      courseName: "Data Science with AI",
      oldPrice: "₹ 60,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 21500/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 4,622 / Month",
    },
    "data-analytics": {
      courseName: "Data Analytics with AI",
      oldPrice: "₹ 50,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 17500/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 4,032 / Month",
    },
    "business-analyst": {
      courseName: "Business Analytics with AI",
      oldPrice: "₹ 50,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 20,650/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 4,032 / Month",
    },
    "data-business-analytics": {
      courseName: "Data Analytics + Business Analytics",
      oldPrice: "₹ 60,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 25,370/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 4,622 / Month",
    },
    "artificial-intelligence": {
      courseName: "Artificial Intelligence",
      oldPrice: "₹ 70,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 28,910/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 5,310 / Month",
    },
    "software-testing": {
      courseName: "Software Testing with AI",
      oldPrice: "₹ 35,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 20,650/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 4,032 / Month",
    },
    "automation": {
      courseName: "Automation with AI",
      oldPrice: "₹ 25,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 14,750/-",
      priceGst: "+GST",
      emiLabel: "",   // EMI column sheet me nahi hai
      emiValue: "",
    },
    "playwright": {
      courseName: "Playwright with AI",
      oldPrice: "₹ 25,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 14,750/-",
      priceGst: "+GST",
      emiLabel: "",   // EMI column sheet me nahi hai
      emiValue: "",
    },
    "playwright-selenium": {
      courseName: "Playwright + Selenium",
      oldPrice: "₹ 40,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 18,880/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 3,540 / Month",
    },
    "digital-marketing": {
      courseName: "Adv Digital Marketing",
      oldPrice: "₹ 35,000/-",
      oldPriceGst: "+GST",
      priceBox: "₹ 17,700/-",
      priceGst: "+GST",
      emiValue: "Starts at ₹ 3,343 / Month",
    },
  };

  // ------------------------------------------------------------------
  // 3. URL SE COURSE DETECT KARO
  //    (order important hai — jyada specific match pehle check hota hai)
  // ------------------------------------------------------------------
  function detectCourse() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("data-analytics") && path.includes("business")) {
      return COURSE_DATA["data-business-analytics"];
    }
    if (path.includes("playwright") && path.includes("selenium")) {
      return COURSE_DATA["playwright-selenium"];
    }
    if (path.includes("data-science")) {
      return COURSE_DATA["data-science"];
    }
    if (path.includes("data-analytics")) {
      return COURSE_DATA["data-analytics"];
    }
    if (path.includes("business-analyst")) {
      return COURSE_DATA["business-analyst"];
    }
    if (path.includes("artificial-intelligence")) {
      return COURSE_DATA["artificial-intelligence"];
    }
    if (path.includes("software-testing")) {
      return COURSE_DATA["software-testing"];
    }
    if (path.includes("automation")) {
      return COURSE_DATA["automation"];
    }
    if (path.includes("playwright")) {
      return COURSE_DATA["playwright"];
    }
    if (path.includes("digital-marketing")) {
      return COURSE_DATA["digital-marketing"];
    }

    return null;
  }

  // ------------------------------------------------------------------
  // 4. RENDER FUNCTION — HTML structure/classes bilkul same, CSS untouched
  // ------------------------------------------------------------------
  function renderOfferCard(data, targetSelector = null) {
    const featuresHtml = data.features
      .map(
        (item) => `
        <li class="uc-offer-li">
          <i class="uc-offer-li-icon ${item.icon}"></i>
          <span class="uc-offer-li-text">${item.text}</span>
        </li>`
      )
      .join("\n");

    // EMI box sirf tab dikhana hai jab emiValue mojood ho
    const emiBoxHtml = data.emiValue
      ? `
        <div class="uc-emi-box">
          <span class="uc-emi-label">${data.emiLabel}</span>
          <span class="uc-emi-value">${data.emiValue}</span>
        </div>`
      : "";

    const html = `
    <div class="uc-offer-wrap">
      <div class="uc-offer-card">
        <span class="uc-offer-ribbon">${data.ribbonText}</span>

        <h2 class="uc-offer-heading">${data.heading}</h2>
        <p class="uc-offer-course-name" style="text-align: center !important; margin: 0 !important;">${data.courseName || ""}</p>
        <p class="uc-offer-sub" style="text-align: center !important; margin: 0 !important;">${data.subText}</p>

        <span class="uc-old-price">
          <span class="uc-old-amount">${data.oldPrice}</span><span class="uc-gst">${data.oldPriceGst}</span>
        </span>

        <p class="uc-now-pay" style="text-align: center !important;">${data.nowPayText}</p>

        <span class="uc-price-box" onclick="showForm()">${data.priceBox}<span class="uc-price-gst">${data.priceGst}</span></span>

        ${emiBoxHtml}

        <ul class="uc-offer-list">
          ${featuresHtml}
        </ul>

        <button class="uc-book-btn" type="button" onclick="${data.btnOnClick}">${data.btnText}</button>
        <p class="uc-filling">${data.fillingText}</p>
      </div>
    </div>`;

    const target =
      (targetSelector && document.querySelector(targetSelector)) ||
      document.getElementById("offer-card-container") ||
      document.querySelector(".uc-offer-wrap")?.parentElement;

    if (!target) {
      console.warn(
        `[offer-card] Target container not found. Add <div id="offer-card-container"></div> to your page.`
      );
      return;
    }

    const existingWrap = target.querySelector(".uc-offer-wrap");
    if (existingWrap) {
      existingWrap.outerHTML = html;
    } else {
      target.innerHTML = html;
    }
  }

  // ------------------------------------------------------------------
  // 5. AUTO-INIT — URL detect karke render karega
  // ------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    const courseData = detectCourse();

    if (!courseData) {
      console.warn("[offer-card] Course offer data not found for URL:", window.location.pathname);
      return;
    }

    renderOfferCard({ ...OFFER_DATA, ...courseData });
  });

  // Manual re-render / external use ke liye expose
  window.OfferCardRenderer = {
    render: renderOfferCard,
    data: OFFER_DATA,
    courses: COURSE_DATA,
    detectCourse: detectCourse,
  };
})();