/*!
 * uncodemy-navbar.js
 * Reusable UnCodemy site navbar — Web Component.
 *
 * USAGE (on every page):
 *   1. Copy this file, All.css, and the images/ folder next to your HTML pages
 *      (or host them and use absolute URLs below).
 *   2. In each page's <head>, add:
 *        <script src="uncodemy-navbar.js" defer></script>
 *   3. In the <body>, wherever you want the navbar to appear, add:
 *        <uncodemy-navbar></uncodemy-navbar>
 *
 * That's it — this single script injects the markup, the required
 * stylesheets (All.css + Font Awesome), and all the dropdown/popup
 * interactivity automatically. Update this ONE file and every page
 * that includes <uncodemy-navbar></uncodemy-navbar> updates together.
 */
(function () {
  "use strict";

  var NAVBAR_HTML = `<header class="abhay-site-header">
    <div class="abhay-top-row">
      <a class="abhay-brand" href="#" aria-label="UnCodemy home">
        <img class="abhay-brand-logo" src="images/Logo (1).png" alt="UnCodemy" />
      </a>

      <div class="abhay-rank">
        <strong>#1</strong>
        <span>India's Top IT<br />Training Institute</span>
      </div>

      <button class="abhay-mobile-btn abhay-contact-toggle" type="button" aria-expanded="false" aria-controls="contactBar">
        Contact
      </button>

      <div class="abhay-contact-bar" id="contactBar">
        <span class="abhay-sep"></span>
        <a href="tel:+919818366550">For Counseling : +91 9818366550 / +91 8448807675</a>
        <span class="abhay-tel1">
          <a href="tel">/ +91 8766313646</a>
        </span>

        <span class="abhay-sep"></span>
        <a href="tel:+918800023723">For Support : +91 8800023723</a>
        <span class="abhay-sep"></span>
        <a href="mailto:info@uncodemy.com">info@uncodemy.com</a>
        <span class="abhay-sep"></span>
        <a class="abhay-whatsapp" href="https://wa.me/919818366550" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
          <img src="images/whatsapp.png" alt="WhatsApp" />
        </a>
        <span class="abhay-sep"></span>
      </div>
    </div>

    <nav class="abhay-nav-row" aria-label="Primary navigation">
      <div class="abhay-category-wrap">
        <button class="abhay-category-btn" type="button" aria-expanded="false" aria-controls="categoryMenu">
          CATEGORIES
        </button>
        <div class="abhay-category-menu" id="categoryMenu">
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Full-Stack-Development</a>
            <div class="abhay-submenu" aria-label="Full Stack Development courses">
              <a href="https://uncodemy.com/course/full-stack-with-nodejs-training-course-in-noida">Full Stack With NodeJs</a>
              <a href="https://uncodemy.com/course/python-full-stack-training-course-in-noida">Python Full Stack</a>
              <a href="https://uncodemy.com/course/java-full-stack-using-react-training-course-in-noida">Java Full Stack Using React</a>
              <a href="https://uncodemy.com/course/web-designing-training-course-in-noida">Web Designing</a>
              <a href="https://uncodemy.com/course/web-development-training-course-in-noida">Web Development</a>
              <a href="https://uncodemy.com/course/frontend-development-training-course-in-noida">Frontend</a>
              <a href="https://uncodemy.com/course/angular-training-course-in-noida">Angular</a>
              <a href="https://uncodemy.com/course/react-js-training-course-in-noida">ReactJs</a>
              <a href="https://uncodemy.com/course/data-structure-and-algorithm-training-course-in-noida">Data Structureand Algorithm</a>
              <a href="https://uncodemy.com/course/mean-stack-development-training-course-in-noida">Mean</a>
              <a href="https://uncodemy.com/course/mern-stack-development-training-course-in-noida">Mern</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Data Science</a>
            <div class="abhay-submenu" aria-label="Data Science courses">
              <a href="https://uncodemy.com/course/business-analyst-training-course-in-noida">Business Analytics</a>
              <a href="https://uncodemy.com/course/python-training-course-in-noida">Python</a>
              <a href="https://uncodemy.com/course/data-analytics-using-python-training-course-in-noida">Data Analytics using Python</a>
              <a href="https://uncodemy.com/course/data-science-machine-learning-using-python-training-course-in-noida">Data Science &amp; Machine Learning using Python</a>
              <a href="https://uncodemy.com/course/machine-learning-using-python-training-course-in-noida">Machine Learning using Python</a>
              <a href="https://uncodemy.com/course/ai-using-python-training-course-in-noida">AI Using Python</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Software Testing</a>
            <div class="abhay-submenu" aria-label="Software Testing courses">
              <a href="https://uncodemy.com/course/software-testing-training-course-in-noida">Software Testing</a>
              <a href="https://uncodemy.com/course/manual-testing-course-in-noida">Manual Testing</a>
              <a href="https://uncodemy.com/course/automation-testing-course-in-noida">Automation Testing</a>
              <a href="https://uncodemy.com/course/istqb-training-course-in-noida">ISTQB Testing</a>
              <a href="https://uncodemy.com/course/manual-testing-course-in-noida">Manual + Selenium</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Cloud Tools</a>
            <div class="abhay-submenu" aria-label="Cloud Tools courses">
              <a href="https://uncodemy.com/course/microsoft-azure-training-course-in-noida">Microsoft Azure</a>
              <a href="https://uncodemy.com/course/devops-training-course-in-noida">DevOps</a>
              <a href="https://uncodemy.com/course/aws-training-course-in-noida">Amazon Web Services (AWS)</a>
              <a href="https://uncodemy.com/course/cloud-computing-training-course-in-noida">Cloud Computing</a>
              <a href="https://uncodemy.com/course/salesforce-training-course-in-noida">Salesforce</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Digital Marketing</a>
            <div class="abhay-submenu" aria-label="Digital Marketing courses">
              <a href="https://uncodemy.com/course/digital-marketing-training-course-in-noida">Digital Marketing</a>
              <a href="https://uncodemy.com/course/advance-digital-marketing-training-course-in-noida">AdvanceDigital Marketing</a>
              <a href="https://uncodemy.com/course/seo-training-course-in-noida">SEO(SearchEngine Optimization)</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Java Technology+</a>
            <div class="abhay-submenu" aria-label="Java Technology courses">
              <a href="https://uncodemy.com/course/java-training-course-in-noida">Java</a>
              <a href="https://uncodemy.com/course/java-for-beginners-training-course-in-noida">Java For Beginners</a>
              <a href="https://uncodemy.com/course/java-expert-training-course-in-noida">Java Expert</a>
              <a href="https://uncodemy.com/course/spring-boot-microservices-security-with-hibernate-training-course-in-noida">SpringBoot Microservices Security With Hibernate</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Network &amp; Security</a>
            <div class="abhay-submenu" aria-label="Network and Security courses">
              <a href="https://uncodemy.com/course/ethical-hacking-course-in-noida">Ethical Hacking</a>
              <a href="https://uncodemy.com/course/cyber-security-training-course-in-noida">Cyber Security</a>
              <a href="https://uncodemy.com/course/ccnp-training-course-in-noida">CCNP</a>
              <a href="https://uncodemy.com/course/mcsa-training-course-in-noida">MCSA</a>
              <a href="https://uncodemy.com/course/vmware-training-course-in-noida">Vmware</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Programming Language</a>
            <div class="abhay-submenu" aria-label="Programming Language courses">
              <a href="https://uncodemy.com/course/c-with-data-structure-and-algorithm-training-course-in-noida">C With Data Structure And Algorithms</a>
              <a href="https://uncodemy.com/course/cpptraining-training-course-in-noida">Object Oriented DataStructure &amp; Algorithms Training</a>
              <a href="https://uncodemy.com/course/net-4-months-training-course-in-noida">.NET 4 Months</a>
              <a href="https://uncodemy.com/course/dotnet-full-stack-training-course-in-noida">.NET Full Stack</a>
              <a href="https://uncodemy.com/course/r-programming-training-course-in-noida">R Programming</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">CAD Training</a>
            <div class="abhay-submenu" aria-label="CAD Training courses">
              <a href="https://uncodemy.com/course/autocad-training-course-in-noida">AUTOCAD</a>
              <a href="https://uncodemy.com/course/cnc-programming-training-course-in-noida">CNC Programming</a>
            </div>
          </div>
          <div class="abhay-menu-item abhay-has-submenu">
            <a href="#">Graphic Designing</a>
            <div class="abhay-submenu" aria-label="Graphic Designing courses">
              <a href="https://uncodemy.com/course/graphic-designing-training-course-in-noida">Graphic Designing</a>
              <a href="https://uncodemy.com/course/uiux-training-course-in-noida">UI/UX Designing</a>
            </div>
          </div>
        </div>
      </div>

      <button class="abhay-mobile-btn abhay-menu-toggle" type="button" aria-expanded="false" aria-controls="primaryNav">
        Menu <span aria-hidden="true"></span>
      </button>

      <div class="abhay-primary-nav" id="primaryNav">
        <a href="https://uncodemy.com/">Home</a>
        <div class="abhay-abhasu-dropdown-wrap">
          <button class="abhay-abhasu-trigger" id="abhasuTrigger" aria-expanded="false" aria-haspopup="true">
            Courses
            <span aria-hidden="true">▾</span>
          </button>

          <div class="abhay-abhasu-overlay" id="abhasuOverlay"></div>

          <div class="abhay-abhasu-panel" id="abhasuPanel">
            <button class="abhay-abhasu-close" id="abhasuClose" aria-label="Close">&times;</button>
            <div class="abhay-abhasu-sidebar" id="abhasuSidebar"></div>
            <div class="abhay-abhasu-content">
              <div class="abhay-abhasu-content-head">
                <div>
                  <h3 class="abhay-abhasu-content-title" id="abhasuContentTitle"></h3>
                  <p class="abhay-abhasu-content-sub" id="abhasuContentSub"></p>
                </div>
              </div>
              <div class="abhay-abhasu-grid" id="abhasuGrid"></div>
            </div>
          </div>
        </div> <a href="https://uncodemy.com/placement">Placement</a>
        
        <a href="#" id="trainingBtn">Training
          <span aria-hidden="true">▾</span>
        </a>

        <!-- claude-changes: start -->
        <div class="abhay-popup" id="popup">
          <div class="abhay-popup-content">
            <span class="abhay-close">&times;</span>

            <div class="abhay-training-heading">
              <!-- <h2>Training Programs</h2> -->
              <p>Choose the best training program according to your career.</p>
            </div>

            <div class="abhay-training-card-container">
              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/industrial training .png" alt="Industrial Training">
                  <h3>Industrial Training</h3>
                </div>
                <p>Improve the performance of your business with our innovative Industrial Training Program.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/corporate training .png" alt="Corporate Training">
                  <h3>Corporate Training</h3>
                </div>
                <p>Our instructor-led training classes are designed to make you an expert.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/summer training.png" alt="Summer Training">
                  <h3>Summer Training</h3>
                </div>
                <p>Real-life case studies are a great way to demonstrate your practical knowledge.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/winter training .png" alt="Winter Training">
                  <h3>Winter Training</h3>
                </div>
                <p>Learn from professionals and earn an industry-recognized certificate.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/Blog training .png" alt="Blog Session">
                  <h3>Blog Session</h3>
                </div>
                <p>Explore blogs, latest technologies and industry updates with practical examples.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-image-heading">
                  <img src="images/all courses.png" alt="All Courses">
                  <h3>All Courses</h3>
                </div>
                <p>Browse all available training programs and choose the right one for your career.</p>
                <a href="#">Read More →</a>
              </div>
            </div>
          </div>
        </div>
        <!-- claude-changes: end -->
        <!-- claude-changes: about-popup start -->
        <a href="#" id="aboutBtn">About <span aria-hidden="true">&#9662;</span></a>
        <div class="abhay-popup" id="popupAbout">
          <div class="abhay-popup-content">
            <span class="abhay-close" id="aboutClose">&times;</span>

            <div class="abhay-training-heading">
              <h2>About Uncodemy</h2>
              <p>Know more about who we are and what we stand for.</p>
            </div>

            <div class="abhay-training-card-container">
              <div class="abhay-card">
                <div class="abhay-abt-img-head">
                  <img src="images/About us .png" alt="About Us">
                  <h3>About Us</h3>
                </div>
                <p>Discover our mission to equip individuals with essential IT skills and industry expertise.</p>
                <a href="#">Read More →</a>
              </div>

              <div class="abhay-card">
                <div class="abhay-abt-img-head">
                  <img src="images/uncodemy gallery.png" alt="UnCodeMy Gallery">
                  <h3>UnCodeMy Gallery</h3>
                </div>
                <p>Explore highlights from our IT training sessions and success stories.</p>
                <a href="#">Read More →</a>
              </div>
            </div>
          </div>
        </div>
        <!-- claude-changes: about-popup end -->
        <a class="abhay-career-link" href="https://uncodemy.com/career-guidance-by-ai">
          <span class="abhay-ai-badge">AI-Powered</span>
          Career Guidance
        </a>
        <a href="https://uncodemy.com/contact-us">Contact</a>
        <a class="abhay-fee-pay-btn" href="#">Fees Payment</a>
      </div>
    </nav>

    <div class="abhay-launch-strip" aria-label="Quick links">
      <a class="abhay-header-pill abhay-green-pill" href="https://uncodemy.com/new-launches-products"><span class="abhay-mini-icon abhay-megaphone" aria-hidden="true"></span>New
        Launches</a>
      <a class="abhay-header-pill abhay-blue-pill" href="https://uncodemy.com/course/project-management-course-details">Project Management</a>
      <a class="abhay-header-pill abhay-blue-pill" href="https://uncodemy.com/course/pg-program-course-details">PG Programs</a>
      <a class="abhay-header-pill abhay-lime-pill" href="https://uncodemy.com/course/pg-program-course-details"><i class="fa-solid fa-video"></i> Counselling Session</a>
      <a class="abhay-header-pill abhay-lime-pill" href="https://uncodemy.com/placement#placement-2024"><span aria-hidden="true">💼</span>Placement Report</a>
      <a class="abhay-header-pill abhay-lime-pill" href="https://certificate.uncodemy.com/">Download Certificate</a>
    </div>
  </header>`;

  var REQUIRED_STYLES = [
    { id: "uncodemy-navbar-css", href: "All.css" },
    {
      id: "uncodemy-navbar-fa",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
      integrity: "sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==",
      crossorigin: "anonymous",
      referrerpolicy: "no-referrer"
    }
  ];

  function ensureStylesLoaded() {
    REQUIRED_STYLES.forEach(function (style) {
      if (document.getElementById(style.id)) return;
      var link = document.createElement("link");
      link.id = style.id;
      link.rel = "stylesheet";
      link.href = style.href;
      if (style.integrity) link.integrity = style.integrity;
      if (style.crossorigin) link.crossOrigin = style.crossorigin;
      if (style.referrerpolicy) link.referrerPolicy = style.referrerpolicy;
      document.head.appendChild(link);
    });
  }

  function initNavbarBehavior() {
  const categoryButton = document.querySelector(".abhay-category-btn");
  const categoryMenu = document.querySelector("#categoryMenu");
  const contactButton = document.querySelector(".abhay-contact-toggle");
  const contactBar = document.querySelector("#contactBar");
  const menuButton = document.querySelector(".abhay-menu-toggle");
  const primaryNav = document.querySelector("#primaryNav");
  const categoryLinks = document.querySelectorAll(".abhay-category-menu a");
  const submenuParents = document.querySelectorAll(".abhay-has-submenu");

  function setPanel(button, panel, forcedState) {
    if (!button || !panel) return;

    const isOpen = typeof forcedState === "boolean"
      ? forcedState
      : !panel.classList.contains("abhay-is-open");

    panel.classList.toggle("abhay-is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  }

  categoryButton?.addEventListener("click", () => {
    setPanel(categoryButton, categoryMenu);
  });

  contactButton?.addEventListener("click", () => {
    setPanel(contactButton, contactBar);
  });

  menuButton?.addEventListener("click", () => {
    setPanel(menuButton, primaryNav);
  });

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const parent = link.parentElement;
      const isParentLink = parent?.classList.contains("abhay-has-submenu");
      const isMobile = window.matchMedia("(max-width: 760px)").matches;

      if (link.getAttribute("href") === "#") {
        event.preventDefault();
      }

      if (isParentLink && isMobile) {
        submenuParents.forEach((item) => {
          if (item !== parent) item.classList.remove("abhay-is-submenu-open");
        });
        parent.classList.toggle("abhay-is-submenu-open");
      }

      categoryLinks.forEach((item) => item.classList.remove("abhay-is-selected"));
      link.classList.add("abhay-is-selected");
      link.blur();
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".abhay-category-wrap")) {
      setPanel(categoryButton, categoryMenu, false);
    }

    if (!event.target.closest(".abhay-contact-bar") && !event.target.closest(".abhay-contact-toggle")) {
      setPanel(contactButton, contactBar, false);
    }

    if (!event.target.closest(".abhay-primary-nav") && !event.target.closest(".abhay-menu-toggle")) {
      setPanel(menuButton, primaryNav, false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    setPanel(categoryButton, categoryMenu, false);
    setPanel(contactButton, contactBar, false);
    setPanel(menuButton, primaryNav, false);
  });



  (function(){

    var abhasuCategories = [
      {
        name: "On Demand Courses",
        courses: [
          {name:"Data Science", image:"images/data-science.png" , href:"https://uncodemy.com/course/data-science-training-course-in-noida", desc:"A powerful blend of statistics, programming, and domain expertise."},
          {name:"Data Analytics", image:"images/data-analytics.png" , href:"https://uncodemy.com/course/data-analytics-training-course-in-noida", desc:"Transform raw data into meaningful business insights."},
          {name:"Software Testing", image:"images/software testing.png" ,href:"https://uncodemy.com/course/software-testing-training-course-in-noida", desc:"Ensure software quality, performance, and reliability."},
          {name:"Full Stack Development", image:"images/full stack development.png" , href:"https://uncodemy.com/course/full-stack-development-training-course-in-noida", desc:"Master both front-end and back-end development."},
          {name:"Digital Marketing", image:"images/digital-marketing.png" , href:"https://uncodemy.com/course/digital-marketing-training-course-in-noida", desc:"Learn SEO, social media, and content marketing strategies."},
          {name:"Playwright Automation", image:"images/playwright-automation.png" , href:"https://uncodemy.com/course/playwright-training-course-in-noida", desc:"Automate testing for modern web applications."},
          {name:"Java", image:"images/java.png" , href:"https://uncodemy.com/course/java-training-course-in-noida", desc:"Build robust and scalable enterprise applications."},
          {name:"MERN Stack", image:"images/mern.png" , href:"https://uncodemy.com/course/mern-stack-development-training-course-in-noida", desc:"Develop full-stack applications with MongoDB, Express, React, and Node.js."},
          {name:"Python", image:"images/python.png" , href:"https://uncodemy.com/course/python-training-course-in-noida", desc:"A versatile language for web, software, and data applications."}
        ]
      },
      {
        name: "Data Science Program",
        courses: [
          {name:"Data Science",image:"images/data-science.png" , href:"https://uncodemy.com/course/data-science-training-course-in-noida", desc:"Gain expertise in statistics, programming, and data-driven insights."},
          {name:"Data Analytics",image:"images/data-analytics.png" , href:"https://uncodemy.com/course/data-analytics-training-course-in-noida", desc:"Leverage analytics to solve business challenges."},
          {name:"Business Analyst",image:"images/business-analytics.png" ,  href:"https://uncodemy.com/course/business-analyst-training-course-in-noida", desc:"Bridge the gap between business needs and technology solutions."},
          {name:"Machine Learning",image:"images/machine learning.png" ,  href:"https://uncodemy.com/course/machine-learning-training-course-in-noida", desc:"Build intelligent systems that learn from data."},
          {name:"Python",image:"images/python.png" ,  href:"https://uncodemy.com/course/python-training-course-in-noida", desc:"The most popular programming language for data science."},
          {name:"Data Analytics using Python",image:"images/data analytics using python.png" ,  href:"https://uncodemy.com/course/data-analytics-using-python-training-course-in-noida", desc:"Perform advanced data analysis using Python tools."},
          {name:"Machine Learning using Python",image:"images/ML using python.png" ,  href:"https://uncodemy.com/course/machine-learning-using-python-training-course-in-noida", desc:"Create predictive models efficiently with Python."},
          {name:"AI using Python",image:"images/AI using python.png" ,  href:"https://uncodemy.com/course/ai-using-python-training-course-in-noida", desc:"Develop intelligent applications using AI libraries."},
          {name:"Data Science & ML using Python",image:"images/DS andML using python.png" ,  href:"https://uncodemy.com/course/data-science-machine-learning-using-python-training-course-in-noida", desc:"Master advanced analytics and machine learning techniques."}
        ]
      },
      {
        name: "Full Stack Development",
        courses: [
          {name:"Full Stack Development", image:"images/full stack development.png" , href:"https://uncodemy.com/course/full-stack-development-training-course-in-noida", desc:"Front-end aur back-end dono covers."},
          {name:"Python", image:"images/python.png" , href:"https://uncodemy.com/course/python-training-course-in-noida", desc:"Backend development ke liye versatile."},
          {name:"Java", image:"images/java.png" , href:"https://uncodemy.com/course/java-training-course-in-noida", desc:"Robust applications ke liye industry standard."},
          {name:"Full Stack with Node.js", image:"images/ful stack with node.js.png" , href:"https://uncodemy.com/course/full-stack-with-nodejs-training-course-in-noida", desc:"Scalable web applications banaye."},
          {name:"Java Full Stack Using ReactJS", image:"images/java full stack using react.png" , href:"https://uncodemy.com/course/java-full-stack-using-react-training-course-in-noida", desc:"Modern web apps Java + React se."},
          {name:"Web Designing", image:"images/web designing.png" , href:"https://uncodemy.com/course/web-designing-training-course-in-noida", desc:"Visually appealing user-friendly websites."},
          {name:"ReactJS", image:"images/react js.png" , href:"https://uncodemy.com/course/react-js-training-course-in-noida", desc:"Dynamic user interfaces JavaScript se."},
          {name:"Angular", image:"images/angular.png" , href:"https://uncodemy.com/course/angular-training-course-in-noida", desc:"Robust single-page applications."},
          {name:"MERN Stack", image:"images/mern1.png" , href:"https://uncodemy.com/course/mern-stack-development-training-course-in-noida", desc:"MongoDB, Express, React, Node.js combo."}
        ]
      },
      {
        name: "Software Testing",
        courses: [
          {name:"Software Testing", image:"images/software-tsting.png" , href:"https://uncodemy.com/course/software-testing-training-course-in-noida", desc:"Quality aur reliability sunishchit kare."},
          {name:"Manual Testing", image:"images/mannual testing.png" , href:"https://uncodemy.com/course/manual-testing-course-in-noida", desc:"Hands-on testing se functionality verify."},
          {name:"Automation Testing", image:"images/automation testing.png" , href:"https://uncodemy.com/course/automation-testing-course-in-noida", desc:"Automated tools se test cases execute."},
          {name:"ISTQB Training", image:"images/ISTQB training.png" , href:"https://uncodemy.com/course/istqb-training-course-in-noida", desc:"International testing qualification prep."},
          {name:"Manual + Selenium", image:"images/mannual testing.png" , href:"https://uncodemy.com/course/manual-selenium-training-course-in-noida", desc:"Manual aur automated skills ka combo."},
          {name:"Playwright Automation", image:"images/playwright-automation.png" , href:"https://uncodemy.com/course/playwright-training-course-in-noida", desc:"Modern web apps ka automation."}
        ]
      },
      {
        name: "Cloud Tools",
        courses: [
          {name:"Amazon Web Services (AWS)", image:"images/AWS.png" , href:"https://uncodemy.com/course/aws-training-course-in-noida", desc:"Comprehensive cloud computing solutions."},
          {name:"DevOps", image:"images/DevOps.png" , href:"https://uncodemy.com/course/devops-training-course-in-noida", desc:"Dev aur operations teams ka collaboration."},
          {name:"Microsoft Azure", image:"images/MicrosoftAzure.png" , href:"https://uncodemy.com/course/microsoft-azure-training-course-in-noida", desc:"Development, testing aur deployment support."},
          {name:"Cloud Computing", image:"images/cloud computing.png" , href:"https://uncodemy.com/course/cloud-computing-training-course-in-noida", desc:"Scalable on-demand computing resources."},
          {name:"Salesforce", image:"images/salesforce.png" , href:"https://uncodemy.com/course/salesforce-training-course-in-noida", desc:"Leading CRM platform ki training."}
        ]
      },
      {
        name: "SAP",
        courses: [
          {name:"SAP Training", image:"images/sap training.png" ,  href:"https://uncodemy.com/course/sap-training-course-in-noida", desc:"ERP software solutions ki foundation."},
          {name:"SAP SD Training", image:"images/sap sd training.png" ,  href:"https://uncodemy.com/course/sap-sd-training-course-in-noida", desc:"Sales aur distribution processes manage."},
          {name:"SAP SCM Training", image:"images/sap sm training .png" ,  href:"https://uncodemy.com/course/sap-scm-training-course-in-noida", desc:"Supply chain management optimize kare."},
          {name:"SAP PP Training", image:"images/sap pp training .png" ,  href:"https://uncodemy.com/course/sap-pp-training-course-in-noida", desc:"Production planning ERP me streamline."},
          {name:"SAP PM", image:"images/sap pm.png" ,  href:"https://uncodemy.com/course/sap-pm-training-course-in-noida", desc:"Plant maintenance ERP environments me."},
          {name:"SAP MM", image:"images/sap mm.png" ,  href:"https://uncodemy.com/course/sap-mm-training-course-in-noida", desc:"Materials management ERP systems me."},
          {name:"SAP FICO", image:"images/SAP fico.png" ,  href:"https://uncodemy.com/course/sap-fico-training-course-in-noida", desc:"Finance aur controlling ERP me manage."}
        ]
      },
      {
        name: "Foreign Languages",
        courses: [
          {name:"Japanese Language", image:"images/japanese language .png" , href:"https://uncodemy.com/course/japanese-language-course-in-noida", desc:"Fluency se career opportunities enhance."},
          {name:"German Language", image:"images/German language.png" , href:"https://uncodemy.com/course/german-language-course-in-delhi", desc:"Proficiency se career prospects boost."},
          {name:"French Language", image:"images/french language.png" , href:"https://uncodemy.com/course/french-language-course-in-noida", desc:"Global communication skills enhance."},
          {name:"Spanish Language", image:"images/spanish language .png" , href:"https://uncodemy.com/course/spanish-language-course-in-noida", desc:"Career growth ke liye fluency."}
        ]
      },
      {
        name: "Project Management",
        courses: [
          {name:"PgMP Training",  image:"images/PGMP COURSE.png" , href:"https://uncodemy.com/course/pgmp-training-course-in-noida", desc:"Program management certification skills."},
          {name:"PfMP Training",  image:"images/PFMP TRAINING.png" , href:"https://uncodemy.com/course/pfmp-training-course-in-noida", desc:"Portfolio management certification prep."},
          {name:"PMP Training",  image:"images/PMP TRAINING.png" , href:"https://uncodemy.com/course/pmp-training-course-in-noida", desc:"Exceptional project management education."},
          {name:"Scrum Master Training", image:"images/SCRUM MASTER.png" ,  href:"https://uncodemy.com/course/scrum-master-training-course-in-noida", desc:"Agile project management ki taiyari."}
        ]
      },
      {
        name: "PG Programs",
        courses: [
          {name:"PG Program in Data Science",  image:"images/data-science.png" , href:"https://uncodemy.com/course/pg-program-data-science", desc:"Data-driven decision-making master kare."},
          {name:"PG Program in Data Analyst",  image:"images/PG PROGRAM IN DA.png" , href:"https://uncodemy.com/course/pg-program-data-analyst", desc:"Data skills se career boost kare."},
          {name:"PG Program in Software Testing",  image:"images/PG PROGRAM IN SOFTWARE TESTING.png" , href:"https://uncodemy.com/course/pg-program-software-testing", desc:"Quality assurance master kare."},
          {name:"PG Program in Business Analyst", image:"images/AV BUSINESS ANALYST.png" ,  href:"https://uncodemy.com/course/pg-program-business-analyst", desc:"Business analytics skills master kare."},
          {name:"PG Program in Digital Marketing",  image:"images/PG IN DIGITAL MARKETING.png" , href:"https://uncodemy.com/course/pg-program-digital-marketing", desc:"SEO aur marketing strategy master kare."},
          {name:"PG Program in Automation Testing", image:"images/PG IN AUTOMATION TESTING.png" ,  href:"https://uncodemy.com/course/pg-program-automation-testing", desc:"Automated testing master kare."},
          {name:"PG Program in Cyber Security",  image:"images/PG IN CYBER SECURITY.png" ,  href:"https://uncodemy.com/course/pg-program-cyber-security", desc:"Digital security me expertise banaye."}
        ]
      }
    ];

    /* Badge colors — matched to the new brand palette:
       orange (accent), teal (secondary accent), indigo-blue (contrast) */
    var abhasuBadgeColors = ["#FF6A3D","#17B8A6","#5B6EE8"];

    var trigger   = document.getElementById('abhasuTrigger');
    var panel     = document.getElementById('abhasuPanel');
    var overlay   = document.getElementById('abhasuOverlay');
    var sidebar   = document.getElementById('abhasuSidebar');
    var grid      = document.getElementById('abhasuGrid');
    var titleEl   = document.getElementById('abhasuContentTitle');
    var subEl     = document.getElementById('abhasuContentSub');
    var closeBtn  = document.getElementById('abhasuClose');
    var activeIndex = 0;

    function abhasuInitials(name){
      var words = name.replace(/\(.*?\)/g,'').trim().split(/\s+/);
      var letters = words.slice(0,2).map(function(w){ return w[0]; }).join('');
      return letters.toUpperCase();
    }

    function abhasuBuildSidebar(){
      var eyebrow = document.createElement('div');
      eyebrow.className = 'abhay-abhasu-sidebar-eyebrow';
      eyebrow.textContent = 'Browse categories';
      sidebar.appendChild(eyebrow);

      abhasuCategories.forEach(function(cat, i){
        var btn = document.createElement('button');
        btn.className = 'abhay-abhasu-sidebar-item' + (i === activeIndex ? ' abhay-abhasu-active' : '');
        btn.setAttribute('role','menuitem');
        btn.innerHTML =
          '<span class="abhay-abhasu-sidebar-dot"></span>' +
          '<span>' + cat.name + '</span>' +
          '<span class="abhay-abhasu-sidebar-count">' + cat.courses.length + '</span>';
        btn.addEventListener('click', function(){ abhasuSetActive(i); });
        sidebar.appendChild(btn);
      });
    }

    function abhasuRenderGrid(cat){
      grid.innerHTML = '';
      titleEl.textContent = cat.name;
      subEl.textContent = cat.sub;
      cat.courses.forEach(function(course, idx){
        var a = document.createElement('a');
        a.className = 'abhay-abhasu-card';
        a.href = course.href;
        a.style.animationDelay = (idx * 18) + 'ms';
        var color = abhasuBadgeColors[idx % abhasuBadgeColors.length];
        a.innerHTML =
          '<div class="abhay-abhasu-card-top">' +
            // '<div class="abhay-abhasu-badge" style="background:' + color + '">' + abhasuInitials(course.name) + '</div>' +
          
          '<img class="abhay-abhasu-course-img" src="' + course.image + '" alt="' + course.name + '">' +
          '<div class="abhay-abhasu-card-title">' + course.name + '</div>' +

          '</div>' +
          '<p class="abhay-abhasu-card-desc">' + course.desc + '</p>' +
          '<span class="abhay-abhasu-card-cta">Know more</span>';
        grid.appendChild(a);
      });
    }

    function abhasuSetActive(i){
      activeIndex = i;
      var items = sidebar.querySelectorAll('.abhay-abhasu-sidebar-item');
      items.forEach(function(el, idx){
        el.classList.toggle('abhay-abhasu-active', idx === i);
      });
      abhasuRenderGrid(abhasuCategories[i]);
    }

    function abhasuOpen(){
      panel.classList.add('abhay-abhasu-open');
      overlay.classList.add('abhay-abhasu-open');
      trigger.setAttribute('aria-expanded','true');
    }
    function abhasuCloseMenu(){
      panel.classList.remove('abhay-abhasu-open');
      overlay.classList.remove('abhay-abhasu-open');
      trigger.setAttribute('aria-expanded','false');
    }

    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = panel.classList.contains('abhay-abhasu-open');
      isOpen ? abhasuCloseMenu() : abhasuOpen();
    });
    overlay.addEventListener('click', abhasuCloseMenu);
    closeBtn.addEventListener('click', abhasuCloseMenu);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') abhasuCloseMenu();
    });
    document.addEventListener('click', function(e){
      if(!panel.contains(e.target) && !trigger.contains(e.target)){
        abhasuCloseMenu();
      }
    });

    abhasuBuildSidebar();
    abhasuRenderGrid(abhasuCategories[activeIndex]);




    // TRAINING DD



  
   const popup = document.getElementById("popup");

  const btn = document.getElementById("trainingBtn");

  const close = document.querySelector(".abhay-close");

  btn.addEventListener("click", function(e){

      e.preventDefault();

      popup.classList.add("abhay-active");

  });

  close.addEventListener("click", function(){

      popup.classList.remove("abhay-active");

  });

  window.addEventListener("click", function(e){

      if(e.target==popup){

          popup.classList.remove("abhay-active");

      }

  });

    // claude-changes: about-popup start (same pattern as TRAINING DD above)

    const popupAbout = document.getElementById("popupAbout");

    const aboutBtn = document.getElementById("aboutBtn");

    const aboutClose = document.getElementById("aboutClose");

    aboutBtn.addEventListener("click", function(e){

        e.preventDefault();

        popupAbout.classList.add("abhay-active");

    });

    aboutClose.addEventListener("click", function(){

        popupAbout.classList.remove("abhay-active");

    });

    window.addEventListener("click", function(e){

        if(e.target==popupAbout){

            popupAbout.classList.remove("abhay-active");

        }

    });

    // claude-changes: about-popup end
  })();
  }

  function defineNavbarElement() {
    if (customElements.get("uncodemy-navbar")) return;

    customElements.define(
      "uncodemy-navbar",
      class extends HTMLElement {
        connectedCallback() {
          ensureStylesLoaded();
          this.innerHTML = NAVBAR_HTML;
          // Run after the markup is in the DOM so getElementById/querySelector calls resolve.
          initNavbarBehavior();
        }
      }
    );
  }

  defineNavbarElement();
})();
