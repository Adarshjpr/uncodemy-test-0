/* =====================================================================
   UNCODEMY — Location / Contact Section  (dynamic)   v2
   ---------------------------------------------------------------------
   Put this file in the site root:  /uncodemy-location.js

   Then drop these two lines wherever you want the section:

       <div id="uncodemy-location"></div>
       <script src="/uncodemy-location.js" defer></script>

   Everything lives in this one file — CSS is injected inline (class
   selectors only, no tag selectors), the map loads lazily, and the
   Open / Closed badge is calculated from real time.

   v2 changes:
   - All visible text is English
   - Much shorter on desktop (compact rows + two-column detail grid)
   - Tighter spacing, cleaner borders, better mobile stacking
   ===================================================================== */

   (function () {
    "use strict";
  
    /* ===================================================================
       1) DATA — this is the only part you need to edit
       =================================================================== */
  
    var CONFIG = {
      mountId: "uncodemy-location",
  
      eyebrow: "Visit Us",
      heading: "Come See the Uncodemy Campus",
      subheading: "Walk in for a free demo class, meet the trainers, and see where you'll be learning.",
  
      /* Section width. Use "" to fill the parent container. */
      maxWidth: "1180px",
  
      /* Brand colours */
      accent: "#ff5421",
      ink: "#000000",
      paper: "#ffffff",
  
      locations: [
        {
          id: "noida",
          name: "Noida (Head Office)",
          address: "B, 14-15, Udhyog Marg, Block B, Sector 1, Noida, Uttar Pradesh 201301",
          phone: "088000 23723",
          phoneDial: "+918800023723",
          website: "uncodemy.com",
          websiteUrl: "https://uncodemy.com",
          plusCode: "H8Q7+8P Noida, Uttar Pradesh",
  
          /* Google Maps embed src */
          mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.383831262008!2d77.31176047549913!3d28.58825987568895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d8c0000001%3A0xea5a624c23e5f7db!2sUncodemy!5e0!3m2!1sen!2sin!4v1786612613367!5m2!1sen!2sin",
  
          /* Link for the "Get Directions" button */
          directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Uncodemy+Sector+1+Noida",
  
          /* 0 = Sunday ... 6 = Saturday
             "24h" | "closed" | [["09:30","18:30"]]  (multiple slots allowed) */
          hours: {
            0: "24h", 1: "24h", 2: "24h", 3: "24h",
            4: "24h", 5: "24h", 6: "24h"
          },
  
          tags: ["Free demo class", "Walk-ins welcome", "Wheelchair accessible"]
        }
  
        /* -- Copy this block to add another centre; tabs appear automatically --
        ,{
          id: "delhi",
          name: "Delhi (Laxmi Nagar)",
          address: "...",
          phone: "088000 23723",
          phoneDial: "+918800023723",
          website: "uncodemy.com",
          websiteUrl: "https://uncodemy.com",
          plusCode: "",
          mapEmbed: "https://www.google.com/maps/embed?pb=...",
          directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=...",
          hours: { 0:"closed", 1:[["09:30","18:30"]], 2:[["09:30","18:30"]],
                   3:[["09:30","18:30"]], 4:[["09:30","18:30"]],
                   5:[["09:30","18:30"]], 6:[["09:30","18:30"]] },
          tags: []
        }
        */
      ],
  
      /* Holiday notes — key is "MM-DD" */
      specialDays: {
        "08-15": "Independence Day — hours may differ",
        "01-26": "Republic Day — hours may differ",
        "10-02": "Gandhi Jayanti — hours may differ"
      },
  
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  
      /* Should the full week be expanded on load? */
      hoursOpenByDefault: false,
  
      /* Text strings */
      text: {
        openNow: "Open now",
        closed: "Closed",
        mapLoading: "Loading map",
        address: "Address",
        hoursLabel: "Opening hours",
        phone: "Phone",
        website: "Website",
        plusCode: "Plus code",
        copy: "Copy",
        copied: "Copied",
        directions: "Get Directions",
        call: "Call Now"
      }
    };
  
    /* ===================================================================
       2) CSS — class selectors only, injected inline
       =================================================================== */
  
    var A = CONFIG.accent, INK = CONFIG.ink, PAPER = CONFIG.paper;
  
    /* shared reset so the site theme cannot leak into this section */
    var R = "margin:0 !important;padding:0 !important;border:0 !important;" +
            "list-style:none !important;box-sizing:border-box !important;" +
            "float:none !important;text-shadow:none !important;";
  
    var CSS = [
      ".uncloc .uncloc-x::before,.uncloc .uncloc-x::after{content:none !important;display:none !important;}",
  
      /* ---------- shell ---------- */
      ".uncloc{", R,
      "  display:block !important;width:100% !important;",
      (CONFIG.maxWidth ? "max-width:" + CONFIG.maxWidth + ";margin:0 auto !important;" : ""),
      "  padding:44px 20px !important;",
      "  font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif !important;",
      "  color:" + INK + " !important;line-height:1.5 !important;text-align:left !important;",
      "  -webkit-font-smoothing:antialiased;",
      "}",
  
      /* ---------- header ---------- */
      ".uncloc .uncloc__head{", R, "display:block;margin:0 0 22px !important;}",
      ".uncloc .uncloc__eyebrow{", R,
      "  display:inline-flex;align-items:center;gap:9px;color:" + A + " !important;",
      "  font-size:12px !important;font-weight:700 !important;",
      "  letter-spacing:.16em !important;text-transform:uppercase !important;margin-bottom:9px !important;",
      "}",
      ".uncloc .uncloc__rule{", R, "display:block;width:24px;height:2px;background:" + A + " !important;}",
      ".uncloc .uncloc__title{", R,
      "  display:block;color:" + INK + " !important;font-size:32px !important;",
      "  font-weight:800 !important;line-height:1.14 !important;letter-spacing:-.02em !important;",
      "  margin-bottom:7px !important;",
      "}",
      ".uncloc .uncloc__sub{", R,
      "  display:block;color:#5b5b5b !important;font-size:15.5px !important;",
      "  font-weight:400 !important;max-width:620px;",
      "}",
  
      /* ---------- branch tabs ---------- */
      ".uncloc .uncloc__tabs{", R, "display:flex;flex-wrap:wrap;gap:8px;margin-top:18px !important;}",
      ".uncloc .uncloc__tab{", R,
      "  display:inline-block;cursor:pointer;font-family:inherit !important;",
      "  padding:8px 16px !important;border:1.5px solid #e3e3e3 !important;border-radius:999px;",
      "  background:" + PAPER + " !important;color:#3a3a3a !important;",
      "  font-size:13.5px !important;font-weight:600 !important;transition:all .18s ease;",
      "}",
      ".uncloc .uncloc__tab:hover{border-color:" + A + " !important;color:" + A + " !important;}",
      ".uncloc .uncloc__tab--on{background:" + A + " !important;border-color:" + A + " !important;color:" + PAPER + " !important;}",
  
      /* ---------- card ---------- */
      ".uncloc .uncloc__card{", R,
      "  display:grid !important;grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);",
      "  align-items:stretch;background:" + PAPER + " !important;",
      "  border:1px solid #e8e8e8 !important;border-radius:16px;overflow:hidden;",
      "  box-shadow:0 14px 40px -30px rgba(0,0,0,.45);",
      "}",
  
      /* ---------- info side ---------- */
      ".uncloc .uncloc__panel{", R, "display:block;padding:26px 28px !important;min-width:0;}",
  
      ".uncloc .uncloc__status{", R,
      "  display:inline-flex;align-items:center;gap:8px;padding:6px 13px !important;",
      "  border-radius:999px;font-size:13px !important;font-weight:700 !important;",
      "  margin-bottom:18px !important;",
      "}",
      ".uncloc .uncloc__status--open{background:rgba(255,84,33,.1) !important;color:" + A + " !important;}",
      ".uncloc .uncloc__status--shut{background:#f1f1f1 !important;color:#606060 !important;}",
      ".uncloc .uncloc__dot{", R,
      "  display:block;width:8px;height:8px;border-radius:50%;background:currentColor !important;",
      "  animation:uncloc-pulse 2.2s ease-in-out infinite;",
      "}",
      "@keyframes uncloc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}",
  
      /* one row = icon + body */
      ".uncloc .uncloc__row{", R, "display:flex;align-items:flex-start;gap:12px;}",
      ".uncloc .uncloc__ico{", R,
      "  display:block;width:18px !important;height:18px !important;flex:none;",
      "  color:" + A + " !important;margin-top:2px !important;max-width:none !important;",
      "}",
      ".uncloc .uncloc__body{", R, "display:block;min-width:0;flex:1 1 auto;}",
      ".uncloc .uncloc__label{", R,
      "  display:block;font-size:10.5px !important;font-weight:700 !important;",
      "  letter-spacing:.11em !important;text-transform:uppercase !important;",
      "  color:#9a9a9a !important;margin-bottom:2px !important;",
      "}",
      ".uncloc .uncloc__value{", R,
      "  display:block;font-size:15px !important;font-weight:500 !important;",
      "  color:" + INK + " !important;line-height:1.45 !important;word-break:break-word;",
      "}",
      ".uncloc .uncloc__link{", R,
      "  display:inline;color:" + INK + " !important;font-size:15px !important;font-weight:500 !important;",
      "  text-decoration:none !important;box-shadow:inset 0 -1px 0 0 transparent;",
      "  transition:color .18s ease,box-shadow .18s ease;",
      "}",
      ".uncloc .uncloc__link:hover{color:" + A + " !important;box-shadow:inset 0 -1px 0 0 " + A + ";}",
      ".uncloc .uncloc__copy{", R,
      "  display:inline-block;cursor:pointer;font-family:inherit !important;",
      "  margin-top:4px !important;font-size:11.5px !important;font-weight:700 !important;",
      "  letter-spacing:.06em;text-transform:uppercase !important;color:" + A + " !important;",
      "  background:none !important;opacity:.85;transition:opacity .15s ease;",
      "}",
      ".uncloc .uncloc__copy:hover{opacity:1;}",
      ".uncloc .uncloc__code{", R,
      "  display:inline-block;font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace !important;",
      "  font-size:13.5px !important;font-weight:500 !important;color:" + INK + " !important;",
      "}",
  
      /* divider between blocks */
      ".uncloc .uncloc__hr{", R, "display:block;height:1px;background:#eee !important;margin:16px 0 !important;}",
  
      /* two-column detail grid — this is what shortens the card */
      ".uncloc .uncloc__cols{", R,
      "  display:grid !important;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 22px;",
      "}",
      ".uncloc .uncloc__cols--full{grid-template-columns:minmax(0,1fr);}",
  
      /* ---------- hours ---------- */
      ".uncloc .uncloc__hourshead{", R,
      "  display:flex;align-items:center;gap:8px;cursor:pointer;",
      "  font-family:inherit !important;text-align:left !important;background:none !important;",
      "}",
      ".uncloc .uncloc__today{", R,
      "  display:block;font-size:15px !important;font-weight:600 !important;color:" + INK + " !important;",
      "}",
      ".uncloc .uncloc__chev{", R,
      "  display:block;width:14px !important;height:14px !important;flex:none;",
      "  color:#a0a0a0 !important;transition:transform .22s ease;",
      "}",
      ".uncloc .uncloc__chev--up{transform:rotate(180deg);}",
      ".uncloc .uncloc__week{", R,
      "  display:none;margin-top:10px !important;padding:10px 12px !important;",
      "  background:#fafafa !important;border-radius:9px;",
      "}",
      ".uncloc .uncloc__week--on{display:block;}",
      ".uncloc .uncloc__day{", R,
      "  display:flex;align-items:center;justify-content:space-between;gap:14px;",
      "  padding:4px 0 !important;font-size:13.5px !important;color:#666 !important;",
      "}",
      ".uncloc .uncloc__day--now{color:" + INK + " !important;font-weight:700 !important;}",
      ".uncloc .uncloc__note{", R,
      "  display:block;margin-top:9px !important;padding:7px 11px !important;",
      "  background:rgba(255,84,33,.07) !important;border-left:3px solid " + A + " !important;",
      "  border-radius:0 7px 7px 0;font-size:12.5px !important;font-weight:500 !important;color:#8a3a1a !important;",
      "}",
  
      /* ---------- tags ---------- */
      ".uncloc .uncloc__tags{", R, "display:flex;flex-wrap:wrap;gap:7px;margin-top:16px !important;}",
      ".uncloc .uncloc__tag{", R,
      "  display:inline-block;padding:5px 12px !important;border-radius:999px;",
      "  background:#f5f5f5 !important;color:#4a4a4a !important;",
      "  font-size:12px !important;font-weight:600 !important;",
      "}",
  
      /* ---------- buttons ---------- */
      ".uncloc .uncloc__actions{", R, "display:flex;flex-wrap:wrap;gap:10px;margin-top:20px !important;}",
      ".uncloc .uncloc__btn{", R,
      "  display:inline-flex;align-items:center;justify-content:center;gap:8px;",
      "  flex:1 1 150px;padding:12px 20px !important;border-radius:9px;cursor:pointer;",
      "  font-family:inherit !important;font-size:14.5px !important;font-weight:700 !important;",
      "  text-decoration:none !important;white-space:nowrap;",
      "  transition:background .18s ease,color .18s ease,border-color .18s ease;",
      "}",
      ".uncloc .uncloc__btn--solid{background:" + A + " !important;color:" + PAPER + " !important;}",
      ".uncloc .uncloc__btn--solid:hover{background:#e6440f !important;color:" + PAPER + " !important;}",
      ".uncloc .uncloc__btn--line{background:" + PAPER + " !important;color:" + INK + " !important;border:1.5px solid #dcdcdc !important;}",
      ".uncloc .uncloc__btn--line:hover{border-color:" + INK + " !important;background:" + INK + " !important;color:" + PAPER + " !important;}",
      ".uncloc .uncloc__btnico{", R, "display:block;width:16px !important;height:16px !important;flex:none;max-width:none !important;}",
  
      /* ---------- map ---------- */
      ".uncloc .uncloc__mapwrap{", R,
      "  display:block;position:relative;height:100% !important;min-height:340px;",
      "  background:#f2f2f2 !important;border-left:1px solid #e8e8e8 !important;",
      "}",
      ".uncloc .uncloc__map{", R,
      "  display:block !important;position:absolute;top:0;left:0;",
      "  width:100% !important;height:100% !important;",
      "}",
      ".uncloc .uncloc__maphint{", R,
      "  display:flex;align-items:center;justify-content:center;height:100% !important;",
      "  color:#a8a8a8 !important;font-size:13.5px !important;font-weight:500 !important;",
      "}",
  
      /* ---------- tablet ---------- */
      "@media (max-width:920px){",
      "  .uncloc{padding:38px 18px !important;}",
      "  .uncloc .uncloc__title{font-size:27px !important;}",
      "  .uncloc .uncloc__sub{font-size:14.5px !important;}",
      "  .uncloc .uncloc__card{grid-template-columns:minmax(0,1fr) !important;}",
      "  .uncloc .uncloc__mapwrap{min-height:280px;height:280px !important;order:-1;",
      "    border-left:0 !important;border-bottom:1px solid #e8e8e8 !important;}",
      "  .uncloc .uncloc__panel{padding:24px 22px !important;}",
      "}",
  
      /* ---------- phone ---------- */
      "@media (max-width:600px){",
      "  .uncloc{padding:30px 14px !important;}",
      "  .uncloc .uncloc__head{margin-bottom:16px !important;}",
      "  .uncloc .uncloc__title{font-size:22px !important;}",
      "  .uncloc .uncloc__sub{font-size:14px !important;}",
      "  .uncloc .uncloc__card{border-radius:13px;}",
      "  .uncloc .uncloc__panel{padding:20px 16px !important;}",
      "  .uncloc .uncloc__mapwrap{min-height:210px;height:210px !important;}",
      "  .uncloc .uncloc__cols{grid-template-columns:minmax(0,1fr) !important;gap:14px;}",
      "  .uncloc .uncloc__value,.uncloc .uncloc__link,.uncloc .uncloc__today{font-size:14.5px !important;}",
      "  .uncloc .uncloc__btn{flex:1 1 100% !important;padding:13px 18px !important;}",
      "  .uncloc .uncloc__tab{padding:7px 14px !important;font-size:13px !important;}",
      "}",
  
      "@media (prefers-reduced-motion:reduce){",
      "  .uncloc .uncloc__dot{animation:none;}",
      "  .uncloc .uncloc__chev{transition:none;}",
      "}"
    ].join("");
  
    /* ===================================================================
       3) HELPERS
       =================================================================== */
  
    function injectCss() {
      if (document.getElementById("uncloc-style")) return;
      var s = document.createElement("style");
      s.id = "uncloc-style";
      s.appendChild(document.createTextNode(CSS));
      (document.head || document.documentElement).appendChild(s);
    }
  
    function esc(t) {
      return String(t == null ? "" : t)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
  
    function toMin(hhmm) {
      var p = String(hhmm).split(":");
      return (+p[0]) * 60 + (+p[1] || 0);
    }
  
    function to12(hhmm) {
      var m = toMin(hhmm), h = Math.floor(m / 60), mm = m % 60;
      var ap = h >= 12 ? "PM" : "AM";
      h = h % 12; if (h === 0) h = 12;
      return h + (mm ? ":" + (mm < 10 ? "0" + mm : mm) : "") + " " + ap;
    }
  
    /* "Open 24 hours" | "Closed" | "9:30 AM – 6:30 PM" */
    function dayText(spec) {
      if (spec === "24h") return "Open 24 hours";
      if (!spec || spec === "closed") return "Closed";
      return spec.map(function (s) { return to12(s[0]) + " – " + to12(s[1]); }).join(", ");
    }
  
    function isOpenNow(hours, now) {
      var spec = hours[now.getDay()];
      if (spec === "24h") return true;
      if (!spec || spec === "closed") return false;
      var mins = now.getHours() * 60 + now.getMinutes();
      for (var i = 0; i < spec.length; i++) {
        if (mins >= toMin(spec[i][0]) && mins < toMin(spec[i][1])) return true;
      }
      return false;
    }
  
    function specialNote(now) {
      var mm = ("0" + (now.getMonth() + 1)).slice(-2);
      var dd = ("0" + now.getDate()).slice(-2);
      return CONFIG.specialDays[mm + "-" + dd] || "";
    }
  
    var ICO = {
      pin: '<svg class="uncloc__ico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10.3" r="2.9"></circle></svg>',
      phone: '<svg class="uncloc__ico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.5 16.9v2.6a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.8 1.7h2.6a2 2 0 0 1 2 1.7c.1 1 .35 2 .7 2.9a2 2 0 0 1-.45 2.1L7.5 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.45c.94.35 1.92.6 2.9.7a2 2 0 0 1 1.8 2.05Z"></path></svg>',
      globe: '<svg class="uncloc__ico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M2.8 12h18.4M12 2.8a15 15 0 0 1 0 18.4 15 15 0 0 1 0-18.4Z"></path></svg>',
      clock: '<svg class="uncloc__ico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 6.8V12l3.4 2"></path></svg>',
      grid: '<svg class="uncloc__ico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"></rect><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"></rect><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"></rect><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"></rect></svg>',
      chev: '<svg class="uncloc__chev uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9.5 6 6 6-6"></path></svg>',
      nav: '<svg class="uncloc__btnico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.4 10.6 17.2-7-7 17.2-2.4-7.8-7.8-2.4Z"></path></svg>',
      call: '<svg class="uncloc__btnico uncloc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.5 16.9v2.6a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.8 1.7h2.6a2 2 0 0 1 2 1.7c.1 1 .35 2 .7 2.9a2 2 0 0 1-.45 2.1L7.5 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.45c.94.35 1.92.6 2.9.7a2 2 0 0 1 1.8 2.05Z"></path></svg>'
    };
  
    /* ===================================================================
       4) RENDER
       =================================================================== */
  
    var state = { index: 0, hoursOpen: CONFIG.hoursOpenByDefault };
    var T = CONFIG.text;
  
    function block(icon, label, bodyHtml) {
      return '<div class="uncloc__row uncloc-x">' + icon +
        '<div class="uncloc__body uncloc-x">' +
        '<span class="uncloc__label uncloc-x">' + esc(label) + "</span>" +
        bodyHtml + "</div></div>";
    }
  
    function panelHtml(loc) {
      var now = new Date();
      var open = isOpenNow(loc.hours, now);
      var today = now.getDay();
      var note = specialNote(now);
      var html = "";
  
      /* status badge */
      html += '<span class="uncloc__status uncloc-x ' +
        (open ? "uncloc__status--open" : "uncloc__status--shut") + '">' +
        '<span class="uncloc__dot uncloc-x"></span>' +
        esc(open ? T.openNow : T.closed) + "</span>";
  
      /* address — full width */
      html += block(ICO.pin, T.address,
        '<span class="uncloc__value uncloc-x">' + esc(loc.address) + "</span>" +
        '<span class="uncloc__copy uncloc-x" data-copy="' + esc(loc.address) + '">' + esc(T.copy) + "</span>");
  
      html += '<span class="uncloc__hr uncloc-x"></span>';
  
      /* hours — full width, collapsible */
      var week = "";
      for (var d = 0; d < 7; d++) {
        var i = (today + d) % 7;
        week += '<div class="uncloc__day uncloc-x' + (i === today ? " uncloc__day--now" : "") + '">' +
          "<span>" + esc(CONFIG.dayNames[i]) + "</span>" +
          "<span>" + esc(dayText(loc.hours[i])) + "</span></div>";
      }
  
      html += block(ICO.clock, T.hoursLabel,
        '<div class="uncloc__hourshead uncloc-x" data-toggle="hours">' +
        '<span class="uncloc__today uncloc-x">' + esc(CONFIG.dayShort[today]) + " · " +
        esc(dayText(loc.hours[today])) + "</span>" + ICO.chev + "</div>" +
        '<div class="uncloc__week uncloc-x' + (state.hoursOpen ? " uncloc__week--on" : "") + '">' + week + "</div>" +
        (note ? '<span class="uncloc__note uncloc-x">' + esc(note) + "</span>" : ""));
  
      html += '<span class="uncloc__hr uncloc-x"></span>';
  
      /* phone + website side by side */
      html += '<div class="uncloc__cols uncloc-x">';
      if (loc.phone) {
        html += block(ICO.phone, T.phone,
          '<a class="uncloc__link uncloc-x" href="tel:' + esc(loc.phoneDial || loc.phone) + '">' +
          esc(loc.phone) + "</a>");
      }
      if (loc.website) {
        html += block(ICO.globe, T.website,
          '<a class="uncloc__link uncloc-x" href="' + esc(loc.websiteUrl) + '">' +
          esc(loc.website) + "</a>");
      }
      html += "</div>";
  
      /* plus code */
      if (loc.plusCode) {
        html += '<div class="uncloc__cols uncloc__cols--full uncloc-x" style="margin-top:16px">' +
          block(ICO.grid, T.plusCode,
            '<span class="uncloc__code uncloc-x">' + esc(loc.plusCode) + "</span>" +
            '<span class="uncloc__copy uncloc-x" data-copy="' + esc(loc.plusCode) + '">' + esc(T.copy) + "</span>") +
          "</div>";
      }
  
      /* tags */
      if (loc.tags && loc.tags.length) {
        html += '<div class="uncloc__tags uncloc-x">';
        for (var t = 0; t < loc.tags.length; t++) {
          html += '<span class="uncloc__tag uncloc-x">' + esc(loc.tags[t]) + "</span>";
        }
        html += "</div>";
      }
  
      /* buttons */
      html += '<div class="uncloc__actions uncloc-x">' +
        '<a class="uncloc__btn uncloc__btn--solid uncloc-x" href="' + esc(loc.directionsUrl) +
        '" target="_blank" rel="noopener">' + ICO.nav + esc(T.directions) + "</a>";
      if (loc.phone) {
        html += '<a class="uncloc__btn uncloc__btn--line uncloc-x" href="tel:' +
          esc(loc.phoneDial || loc.phone) + '">' + ICO.call + esc(T.call) + "</a>";
      }
      html += "</div>";
  
      return html;
    }
  
    function render(mount) {
      var loc = CONFIG.locations[state.index];
      if (!loc) return;
  
      var tabs = "";
      if (CONFIG.locations.length > 1) {
        tabs += '<div class="uncloc__tabs uncloc-x">';
        for (var i = 0; i < CONFIG.locations.length; i++) {
          tabs += '<span class="uncloc__tab uncloc-x' +
            (i === state.index ? " uncloc__tab--on" : "") +
            '" data-index="' + i + '">' + esc(CONFIG.locations[i].name) + "</span>";
        }
        tabs += "</div>";
      }
  
      if (mount.className.indexOf("uncloc") === -1) {
        mount.className = (mount.className ? mount.className + " " : "") + "uncloc";
      }
  
      mount.innerHTML =
        '<div class="uncloc__head uncloc-x">' +
          '<span class="uncloc__eyebrow uncloc-x"><span class="uncloc__rule uncloc-x"></span>' +
          esc(CONFIG.eyebrow) + "</span>" +
          '<span class="uncloc__title uncloc-x">' + esc(CONFIG.heading) + "</span>" +
          '<span class="uncloc__sub uncloc-x">' + esc(CONFIG.subheading) + "</span>" +
          tabs +
        "</div>" +
        '<div class="uncloc__card uncloc-x">' +
          '<div class="uncloc__panel uncloc-x">' + panelHtml(loc) + "</div>" +
          '<div class="uncloc__mapwrap uncloc-x">' +
            '<span class="uncloc__maphint uncloc-x">' + esc(T.mapLoading) + "</span>" +
          "</div>" +
        "</div>";
  
      lazyMap(mount.querySelector(".uncloc__mapwrap"), loc);
      if (!mount.getAttribute("data-bound")) {
        bind(mount);
        mount.setAttribute("data-bound", "1");
      }
    }
  
    /* load the map only when the section comes near the viewport */
    function lazyMap(wrap, loc) {
      if (!wrap) return;
  
      var load = function () {
        if (wrap.getAttribute("data-loaded")) return;
        wrap.setAttribute("data-loaded", "1");
        var f = document.createElement("iframe");
        f.className = "uncloc__map uncloc-x";
        f.src = loc.mapEmbed;
        f.title = loc.name + " location map";
        f.loading = "lazy";
        f.setAttribute("allowfullscreen", "");
        f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        wrap.innerHTML = "";
        wrap.appendChild(f);
      };
  
      if (!("IntersectionObserver" in window)) { load(); return; }
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) { load(); io.disconnect(); }
        }
      }, { rootMargin: "300px" });
      io.observe(wrap);
    }
  
    function bind(mount) {
      mount.addEventListener("click", function (e) {
        var t = e.target;
        while (t && t !== mount) {
          if (t.getAttribute) {
  
            /* switch branch */
            if (t.getAttribute("data-index") !== null) {
              state.index = +t.getAttribute("data-index");
              render(mount);
              return;
            }
  
            /* expand / collapse the week */
            if (t.getAttribute("data-toggle") === "hours") {
              state.hoursOpen = !state.hoursOpen;
              var wk = mount.querySelector(".uncloc__week");
              var ch = mount.querySelector(".uncloc__chev");
              if (wk) wk.className = "uncloc__week uncloc-x" + (state.hoursOpen ? " uncloc__week--on" : "");
              if (ch) ch.className = "uncloc__chev uncloc-x" + (state.hoursOpen ? " uncloc__chev--up" : "");
              return;
            }
  
            /* copy to clipboard */
            if (t.getAttribute("data-copy")) {
              var el = t, txt = t.getAttribute("data-copy");
              var done = function () {
                el.innerHTML = T.copied;
                setTimeout(function () { el.innerHTML = T.copy; }, 1600);
              };
              if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () {});
              else done();
              return;
            }
          }
          t = t.parentNode;
        }
      });
    }
  
    /* ===================================================================
       5) START
       =================================================================== */
  
    function init() {
      var mount = document.getElementById(CONFIG.mountId);
      if (!mount) return;
      injectCss();
      render(mount);
  
      /* refresh the Open / Closed badge every 5 minutes */
      setInterval(function () {
        var m = document.getElementById(CONFIG.mountId);
        if (m) render(m);
      }, 300000);
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  
    window.UncodemyLocation = { refresh: init, config: CONFIG };
  })();