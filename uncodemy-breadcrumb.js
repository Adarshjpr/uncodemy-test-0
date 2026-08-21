/* =====================================================================
   UNCODEMY — Dynamic Breadcrumb + Published Date + Author Bar
   v3 — better URL parsing
   ---------------------------------------------------------------------
   Root me rakho:  /uncodemy-breadcrumb.js

   Hero section ke ANDAR (H1 se upar):
       <div id="uncodemy-crumbbar"></div>
       <script src="/uncodemy-breadcrumb.js" defer></script>

   PATH kahan se aata hai (isi order me, jo pehle mile wahi use hoga):
     1. div ka  data-path="/course/data-analytics-training-course-in-delhi"
     2. URL me  ?uncPath=/course/xyz          (sirf testing ke liye)
     3. <link rel="canonical">  ka path       ← live site pe sabse reliable
     4. window.location.pathname

   PROBLEM AA RAHI HAI? niche CONFIG.debug = true kar do, page kholo,
   browser console (F12) me poori parsing report dikhegi.
   Console me ye bhi chala sakte ho:
       UncodemyCrumbBar.test("/course/data-analytics-training-course-in-delhi")
   ===================================================================== */

   (function () {
    "use strict";
  
    /* ===================================================================
       1) SETTINGS
       =================================================================== */
  
    var CONFIG = {
      mountId: "uncodemy-crumbbar",
  
      /* true karo to console me parsing report aayegi */
      debug: false,
  
      /* canonical tag se path lena hai? (recommended: true) */
      useCanonical: true,
  
      /* agar site kisi subfolder me hai to yahan likho, e.g. ["/uncodemy", "/dist"] */
      stripPrefixes: [],
  
      /* ye segments breadcrumb me dikhenge hi nahi */
      ignoreSegments: ["index", "index.html", "index.php", "home", "page", "en", "hi"],
  
      homeLabel: "Home",
      homeUrl: "/",
  
      /* URL segment -> label + link */
      segmentLabels: {
        course: { label: "Courses", url: "/courses" },
        courses: { label: "Courses", url: "/courses" },
        blog: { label: "Blog", url: "/blog" },
        "training-institute": { label: "Training Institute", url: "/training-institute" }
      },
  
      /* slug se ye words hata do */
      removeWords: ["training"],
  
      lowercaseWords: ["in", "of", "and", "or", "for", "with", "at", "the", "a", "an", "to", "near"],
  
      acronyms: {
        it: "IT", hr: "HR", sql: "SQL", aws: "AWS", ai: "AI", ml: "ML",
        ui: "UI", ux: "UX", php: "PHP", css: "CSS", html: "HTML",
        seo: "SEO", api: "API", qa: "QA", devops: "DevOps",
        js: "JS", mern: "MERN", mean: "MEAN", sap: "SAP",
        bi: "BI", cad: "CAD", iot: "IoT", rpa: "RPA"
      },
  
      defaultDate: "2025-08-24",
      defaultAuthor: "Uncodemy Team",
      defaultAuthorUrl: "",
  
      /* ---- DATE + AUTHOR: specific rule hamesha UPAR ---- */
      rules: [
        {
          match: "data-analytics-training-course-in-delhi",
          exact: true,
          date: "2025-05-24",
          author: "Rahul Sharma"
        },
        { match: "data-analytics",    date: "2025-05-24", author: "Rahul Sharma" },
        { match: "data-science",      date: "2025-06-10", author: "Rahul Sharma" },
        { match: "full-stack",        date: "2025-06-18", author: "Amit Verma" },
        { match: "python",            date: "2025-07-02", author: "Amit Verma" },
        { match: "digital-marketing", date: "2025-07-15", author: "Neha Gupta" }
      ],
  
      publishedLabel: "Published:",
      updatedLabel: "Last Updated:",
      showAuthor: true,
      dateLocale: "en-US",
  
      maxWidth: "",
      addSchema: true,
      lastItemLink: false
    };
  
    function log() {
      if (!CONFIG.debug || !window.console) return;
      var a = Array.prototype.slice.call(arguments);
      a.unshift("%c[CrumbBar]", "color:#f4511e;font-weight:700");
      console.log.apply(console, a);
    }
  
    /* ===================================================================
       2) CSS — sirf class selectors, inline inject
       =================================================================== */
  
    var R = "margin:0 ;padding:0 ;border:0 ;" +
            "background:none ;list-style:none ;" +
            "box-sizing:border-box ;float:none ;" +
            "text-transform:none ;letter-spacing:normal ;" +
            "text-shadow:none ;width:auto ;height:auto ;";
  
    var CSS = [
      ".unc-crumbbar .unc-x::before,.unc-crumbbar .unc-x::after{content:none ;display:none ;}",
  
      ".unc-crumbbar{", 
      "      display:flex ;align-items:center;justify-content:space-between;",
      "  flex-wrap:wrap;gap:10px 18px;width:98vw ;",
      (CONFIG.maxWidth ? "  max-width:" + CONFIG.maxWidth + ";margin:0 auto ;" : ""),
      "  padding:14px 0 ;",
      "  font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif ;",
      "  font-size:15px ;font-weight:400 ;line-height:1.4 ;",
      "  color:#3c4250 ;text-align:left ;position:relative;",
      "}",
  
      ".unc-crumbbar .unc-crumbs{", R,
      "  display:flex ;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0;",
      "}",
      ".unc-crumbbar .unc-crumbs__link{", R,
      "  display:inline-flex ;align-items:center;gap:7px;",
      "  color:#3c4250 ;text-decoration:none ;",
      "  font-size:inherit ;font-weight:500 ;",
      "  cursor:pointer;transition:color .18s ease;",
      "}",
      ".unc-crumbbar .unc-crumbs__link:hover{color:#f4511e ;text-decoration:none ;}",
      ".unc-crumbbar .unc-crumbs__link:focus-visible{outline:2px solid #f4511e;outline-offset:3px;}",
      ".unc-crumbbar .unc-crumbs__text{", R, "display:inline ;color:inherit ;font:inherit ;}",
      ".unc-crumbbar .unc-crumbs__current{", R,
      "  display:inline-block ;color:#111418 ;",
      "  font-size:inherit ;font-weight:600 ;",
      "  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100% ;",
      "}",
      ".unc-crumbbar .unc-crumbs__sep{", R,
      "  display:inline-flex ;align-items:center;",
      "  color:#9aa1ad ;font-size:13px ;-webkit-user-select:none;user-select:none;",
      "}",
      ".unc-crumbbar .unc-ico{width:17px ;height:17px ;flex:none;display:block ;max-width:none ;}",
  
      ".unc-crumbbar .unc-crumbbar__meta{", R,
      "  display:flex ;align-items:center;flex-wrap:wrap;gap:8px 14px;",
      "  color:#4a5160 ;font-size:14.5px ;",
      "}",
      ".unc-crumbbar .unc-meta__block{", R, "display:inline-flex ;align-items:center;gap:8px;color:inherit ;}",
      ".unc-crumbbar .unc-meta__label{", R, "display:inline ;color:#5b6270 ;font-size:inherit ;font-weight:500 ;}",
      ".unc-crumbbar .unc-meta__value{", R, "display:inline ;color:#111418 ;font-size:inherit ;font-weight:600 ;white-space:nowrap;}",
      ".unc-crumbbar .unc-meta__link{", R, "display:inline ;color:#111418 ;font-size:inherit ;font-weight:600 ;text-decoration:none ;}",
      ".unc-crumbbar .unc-meta__link:hover{color:#f4511e ;text-decoration:underline ;}",
      ".unc-crumbbar .unc-meta__rule{", R, "display:block ;width:1px ;height:20px ;background:#d7dbe2 ;flex:none;}",
  
      "@media (max-width:900px){",
      "  .unc-crumbbar{gap:8px 12px;font-size:14px ;padding:12px 0 ;}",
      "  .unc-crumbbar .unc-crumbbar__meta{font-size:13.5px ;}",
      "}",
  
      "@media (max-width:640px){",
      "  .unc-crumbbar{flex-direction:column;align-items:flex-start;gap:8px;padding:10px 0 ;}",
      "  .unc-crumbbar .unc-crumbs{flex-wrap:nowrap;white-space:nowrap;width:100% ;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}",
      "  .unc-crumbbar .unc-crumbs::-webkit-scrollbar{display:none;}",
      "  .unc-crumbbar .unc-crumbs__current{max-width:70vw ;}",
      "  .unc-crumbbar .unc-crumbbar__meta{width:100% ;font-size:12.5px ;gap:6px 10px;}",
      "  .unc-crumbbar .unc-ico{width:15px ;height:15px ;}",
      "  .unc-crumbbar .unc-meta__rule{display:none ;}",
      "}",
  
      "@media (max-width:380px){.unc-crumbbar{font-size:13px ;}}",
      "@media (prefers-reduced-motion:reduce){.unc-crumbbar .unc-crumbs__link{transition:none;}}"
    ].join("");
  
    function injectCss() {
      if (document.getElementById("unc-crumbbar-style")) return;
      var s = document.createElement("style");
      s.id = "unc-crumbbar-style";
      s.appendChild(document.createTextNode(CSS));
      (document.head || document.documentElement).appendChild(s);
    }
  
    /* ===================================================================
       3) PATH RESOLUTION — asli fix yahan hai
       =================================================================== */
  
    function fromCanonical() {
      if (!CONFIG.useCanonical) return "";
      var el = document.querySelector('link[rel="canonical"]') ||
               document.querySelector('meta[property="og:url"]');
      if (!el) return "";
      var href = el.getAttribute("href") || el.getAttribute("content") || "";
      if (!href) return "";
      try {
        return new URL(href, window.location.origin).pathname;
      } catch (e) { return ""; }
    }
  
    function fromQuery() {
      var m = window.location.search.match(/[?&]uncPath=([^&]+)/);
      return m ? decodeURIComponent(m[1]) : "";
    }
  
    function resolvePath(mount) {
      var src = "location.pathname";
      var p = "";
  
      if (mount && mount.getAttribute("data-path")) {
        p = mount.getAttribute("data-path"); src = "data-path attribute";
      }
      if (!p) { p = fromQuery(); if (p) src = "?uncPath query"; }
      if (!p) { p = fromCanonical(); if (p) src = "canonical / og:url"; }
      if (!p) { p = window.location.pathname || "/"; }
  
      /* file:// ya local html — sirf aakhri hissa lo */
      if (window.location.protocol === "file:") {
        p = "/" + p.split("/").pop();
        src += " (file:// mode)";
      }
  
      /* subfolder prefix hatao */
      for (var i = 0; i < CONFIG.stripPrefixes.length; i++) {
        var pre = CONFIG.stripPrefixes[i];
        if (pre && p.indexOf(pre) === 0) p = p.slice(pre.length) || "/";
      }
  
      /* query / hash agar galti se aa gaye ho */
      p = p.split("?")[0].split("#")[0];
  
      log("path source:", src, "→", p);
      return p;
    }
  
    /* ===================================================================
       4) TEXT HELPERS
       =================================================================== */
  
    function prettify(slug) {
      if (!slug) return "";
      var words = decodeURIComponent(slug)
        .replace(/\.(html?|php|aspx?|jsp)$/i, "")
        .split(/[-_%20\s]+/)
        .filter(Boolean)
        .filter(function (w) {
          return CONFIG.removeWords.indexOf(w.toLowerCase()) === -1;
        });
  
      return words.map(function (w, i) {
        var lower = w.toLowerCase();
        if (CONFIG.acronyms[lower]) return CONFIG.acronyms[lower];
        if (i !== 0 && i !== words.length - 1 &&
            CONFIG.lowercaseWords.indexOf(lower) !== -1) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join(" ");
    }
  
    function formatDate(raw) {
      if (!raw) return "";
      var p = String(raw).trim().split("-");
      var d = (p.length === 3 && p[0].length === 4)
        ? new Date(+p[0], +p[1] - 1, +p[2]) : new Date(raw);
      if (isNaN(d.getTime())) return String(raw);
      try {
        return d.toLocaleDateString(CONFIG.dateLocale, { year: "numeric", month: "long", day: "numeric" });
      } catch (e) { return String(raw); }
    }
  
    function isoDate(raw) {
      var p = String(raw).trim().split("-");
      if (p.length === 3 && p[0].length === 4) return raw;
      var d = new Date(raw);
      return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
    }
  
    function resolveMeta(slug, fullPath) {
      var hay = (slug || "") + " " + (fullPath || "");
      for (var i = 0; i < CONFIG.rules.length; i++) {
        var r = CONFIG.rules[i];
        if (!r || !r.match) continue;
        var hit = r.exact ? slug === r.match : hay.indexOf(r.match) !== -1;
        if (hit) {
          log("rule matched:", r.match);
          return {
            date: r.date || CONFIG.defaultDate,
            updated: r.updated || "",
            author: r.author || CONFIG.defaultAuthor,
            authorUrl: r.authorUrl || CONFIG.defaultAuthorUrl,
            matched: r.match
          };
        }
      }
      log("koi rule match nahi hua — default use ho raha hai");
      return {
        date: CONFIG.defaultDate, updated: "",
        author: CONFIG.defaultAuthor, authorUrl: CONFIG.defaultAuthorUrl,
        matched: null
      };
    }
  
    var ICONS = {
      home: '<svg class="unc-ico unc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.8V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.8"></path></svg>',
      calendar: '<svg class="unc-ico unc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>',
      user: '<svg class="unc-ico unc-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"></circle><path d="M4.5 20a7.5 7.5 0 0 1 15 0"></path></svg>'
    };
  
    function esc(t) {
      return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
  
    /* ===================================================================
       5) BUILD
       =================================================================== */
  
    function buildTrail(pathname) {
      var segs = pathname.split("/").filter(function (s) {
        if (!s) return false;
        return CONFIG.ignoreSegments.indexOf(s.toLowerCase()) === -1;
      });
  
      log("segments:", segs);
  
      var trail = [{ label: CONFIG.homeLabel, url: CONFIG.homeUrl, home: true }];
      var path = "";
  
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        path += "/" + seg;
        var known = CONFIG.segmentLabels[seg.toLowerCase()];
        if (known) {
          trail.push({ label: known.label, url: known.url || path });
        } else {
          trail.push({ label: prettify(seg), url: path, slug: seg });
        }
      }
      return trail;
    }
  
    function render(mount, forcedPath) {
      var pathname = forcedPath || resolvePath(mount);
      var trail = buildTrail(pathname);
      var last = trail[trail.length - 1] || {};
      var slug = last.slug || "";
      var meta = resolveMeta(slug, pathname);
  
      if (mount.getAttribute("data-date")) meta.date = mount.getAttribute("data-date");
      if (mount.getAttribute("data-updated")) meta.updated = mount.getAttribute("data-updated");
      if (mount.getAttribute("data-author")) meta.author = mount.getAttribute("data-author");
      if (mount.getAttribute("data-author-url")) meta.authorUrl = mount.getAttribute("data-author-url");
      if (mount.getAttribute("data-title")) last.label = mount.getAttribute("data-title");
  
      log("slug:", slug, "| title:", last.label, "| date:", meta.date, "| author:", meta.author);
  
      var parts = [];
      for (var i = 0; i < trail.length; i++) {
        var it = trail[i];
        var isLast = i === trail.length - 1;
  
        if (isLast && !CONFIG.lastItemLink) {
          parts.push('<div class="unc-crumbs__current unc-x" aria-current="page">' + esc(it.label) + "</div>");
        } else {
          parts.push('<a class="unc-crumbs__link unc-x" href="' + esc(it.url) + '">' +
            (it.home ? ICONS.home : "") +
            '<div class="unc-crumbs__text unc-x">' + esc(it.label) + "</div></a>");
        }
        if (!isLast) parts.push('<div class="unc-crumbs__sep unc-x" aria-hidden="true">&#8250;</div>');
      }
  
      var metaHtml =
        '<div class="unc-meta__block unc-x">' + ICONS.calendar +
        '<div class="unc-meta__label unc-x">' + esc(CONFIG.publishedLabel) + "</div>" +
        '<time class="unc-meta__value unc-x" datetime="' + esc(isoDate(meta.date)) + '">' +
        esc(formatDate(meta.date)) + "</time></div>";
  
      if (meta.updated) {
        metaHtml += '<div class="unc-meta__rule unc-x"></div>' +
          '<div class="unc-meta__block unc-x">' +
          '<div class="unc-meta__label unc-x">' + esc(CONFIG.updatedLabel) + "</div>" +
          '<time class="unc-meta__value unc-x" datetime="' + esc(isoDate(meta.updated)) + '">' +
          esc(formatDate(meta.updated)) + "</time></div>";
      }
  
      if (CONFIG.showAuthor && meta.author) {
        var who = meta.authorUrl
          ? '<a class="unc-meta__link unc-x" href="' + esc(meta.authorUrl) + '">' + esc(meta.author) + "</a>"
          : '<div class="unc-meta__value unc-x">' + esc(meta.author) + "</div>";
        metaHtml += '<div class="unc-meta__rule unc-x"></div>' +
          '<div class="unc-meta__block unc-x">' + ICONS.user + who + "</div>";
      }
  
      if (mount.className.indexOf("unc-crumbbar") === -1) {
        mount.className = (mount.className ? mount.className + " " : "") + "unc-crumbbar";
      }
  
      mount.innerHTML =
        '<div class="unc-crumbs unc-x" role="navigation" aria-label="Breadcrumb">' + parts.join("") + "</div>" +
        '<div class="unc-crumbbar__meta unc-x" style="display:none">' + metaHtml + "</div>";
  
      if (CONFIG.addSchema && !forcedPath) addSchema(trail);
    }
  
    function addSchema(trail) {
      var old = document.getElementById("unc-crumbbar-schema");
      if (old) old.parentNode.removeChild(old);
      var list = trail.map(function (it, i) {
        return {
          "@type": "ListItem",
          position: i + 1,
          name: it.label,
          item: new URL(it.url, window.location.origin).href
        };
      });
      var tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "unc-crumbbar-schema";
      tag.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: list
      });
      document.head.appendChild(tag);
    }
  
    /* ===================================================================
       6) START
       =================================================================== */
  
    function init(forcedPath) {
      var mount = document.getElementById(CONFIG.mountId);
      if (!mount) {
        log('ERROR: div id="' + CONFIG.mountId + '" page pe mila hi nahi');
        return;
      }
      injectCss();
      render(mount, forcedPath);
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { init(); });
    } else {
      init();
    }
  
    window.UncodemyCrumbBar = {
      refresh: function () { init(); },
      /* console se koi bhi URL try karo:
         UncodemyCrumbBar.test("/course/python-training-course-in-noida") */
      test: function (path) { init(path); },
      config: CONFIG
    };
  })();