/**
 * Why Choose Uncodemy — Dynamic Renderer
 * -----------------------------------------------------------------
 * Same HTML structure and CSS classes as original.
 * Sirf data change karna hai, HTML touch nahi karna padega.
 *
 * Usage:
 *   1. Container me ye markup rakho:
 *      <section id="stats-container"></section>
 *   2. Is file ko include karo aur renderStats() call karo
 *      (auto-init already niche diya hai DOMContentLoaded pe).
 * -----------------------------------------------------------------
 */

(function () {
    "use strict";
  
    // ------------------------------------------------------------------
    // 1. DATA — yahi ek jagah edit karni hai values change karne ke liye
    // ------------------------------------------------------------------
    const STATS_DATA = {
      heading: {
        text: "Why Choose",
        br: true, // <br> ke liye
        accent: "Uncodemy?",
      },
      stats: [
        {
          icon: "fa-solid fa-award",
          value: "14+",
          label: "Years of Excellence",
          labelBr: true,
        },
        {
          icon: "fa-solid fa-handshake",
          value: "850+",
          label: "Hiring Partners",
          labelBr: false,
        },
        {
          icon: "fa-solid fa-user-group",
          value: "54,000+",
          label: "Students Trained",
          labelBr: false,
        },
        {
          icon: "fa-solid fa-people-arrows",
          value: "200+",
          label: "Corporate Tie-ups",
          labelBr: false,
        },
        {
          icon: "fa-solid fa-location-dot",
          value: "40+",
          label: "Cities Across India",
          labelBr: false,
        },
        {
          icon: "fa-solid fa-clock-rotate-left",
          value: "95%",
          label: "Placement Support",
          labelBr: false,
        },
      ],
    };
  
    // ------------------------------------------------------------------
    // 2. RENDER FUNCTION
    // ------------------------------------------------------------------
    function renderStats(data = STATS_DATA, targetSelector = null) {
      // Build heading
      const headingHtml = `
        <h2 class="uc-why-heading">
          ${data.heading.text}${data.heading.br ? '<br class="uc-why-br">' : ' '}
          <span class="uc-why-accent">${data.heading.accent}</span>
        </h2>`;
  
      // Build stats
      const statsHtml = data.stats
        .map(
          (stat, index) => `
            <div class="uc-stat uc-stat-${index + 1}">
              <i class="uc-stat-icon ${stat.icon}"></i>
              <span class="uc-stat-value">${stat.value}</span>
              <span class="uc-stat-label">${stat.label}${stat.labelBr ? '<br class="uc-stat-br-1">' : ''}</span>
            </div>`
        )
        .join("\n");
  
      // Build complete HTML
      const html = `
        <section class="uc-why-card">
          ${headingHtml}
          ${statsHtml}
        </section>`;
  
      // Find target container
      const target =
        (targetSelector && document.querySelector(targetSelector)) ||
        document.getElementById("stats-container") ||
        document.querySelector(".uc-why-card")?.parentElement;
  
      if (!target) {
        console.warn(
          `[stats-renderer] Target container not found. Add <div id="stats-container"></div> to your page.`
        );
        return;
      }
  
      // If target already has uc-why-card, replace it; otherwise set innerHTML
      const existingCard = target.querySelector(".uc-why-card");
      if (existingCard) {
        existingCard.outerHTML = html;
      } else {
        target.innerHTML = html;
      }
    }
  
    // ------------------------------------------------------------------
    // 3. AUTO-INIT + PUBLIC API
    // ------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
      renderStats();
    });
  
    // Expose for manual re-render / external data injection
    window.StatsRenderer = {
      render: renderStats,
      data: STATS_DATA,
    };
  })();