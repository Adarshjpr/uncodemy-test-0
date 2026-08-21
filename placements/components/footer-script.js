document.addEventListener('DOMContentLoaded', function () {
  // ── Auto‑detect the script's folder ───────────────────────────────
  var FOOTER_BASE = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = 0; i < all.length; i++) {
        if (/footer-script\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    var src = (s && s.getAttribute('src')) || '';
    return src.substring(0, src.lastIndexOf('/') + 1);
  })();

  // ── Footer HTML ─────────────────────────────────────────────────────
  const footerHTML = `
  <main class="Hemank-page">
    <footer class="Hemank-footer" aria-label="UnCodemy footer">
      <section class="Hemank-footer-top">
        <div class="Hemank-footer-wrap">
          <div class="Hemank-footer-grid">
            <section class="Hemank-brand-col">
              <a class="Hemank-brand-logo Hemank-link-reset" href="#" aria-label="UnCodemy home">
                <span class="Hemank-brand-mark">
                  <img class="Hemank-brand-img" src="${FOOTER_BASE}footer-assets/Uncodemy logo-10.png" alt="Uncodemy Logo">
                </span>
              </a>

              <p class="Hemank-about-text">
                Uncodemy is a team of high-class working professionals associated with a Fortune500
                company. We are on a mission to employ millions. If you want a job, or career change,
                Uncodemy is the right place for you. We will teach you how to work with the latest
                technology.
              </p>

              <div class="Hemank-social-row" aria-label="Social media links">
                <a class="Hemank-social-link Hemank-social-x Hemank-link-reset" href="https://x.com/uncodemy?lang=en" aria-label="X">X</a>
                <a class="Hemank-social-link Hemank-social-fb Hemank-link-reset" href="https://www.facebook.com/uncodemyofficial/" aria-label="Facebook">f</a>
                <a class="Hemank-social-link Hemank-social-in Hemank-link-reset" href="https://www.linkedin.com/company/uncodemy/?originalSubdomain=in" aria-label="LinkedIn">in</a>
                <a class="Hemank-social-link Hemank-social-ig Hemank-link-reset" href="https://www.instagram.com/uncodemyofficial/?hl=en" aria-label="Instagram">IG</a>
              </div>

              <p class="Hemank-certified">Certified By-</p>

              <div class="Hemank-partner-card" aria-label="Certification partners">
                <img src="${FOOTER_BASE}images/1.jpeg" alt="Certification partners">
              </div>

              <div class="Hemank-award-card" aria-label="Awards">
                <img src="${FOOTER_BASE}images/acheive.webp" alt="Awards">
              </div>

              <div class="Hemank-rating-row">
                <div class="Hemank-trust-card" aria-label="Trustpilot rating">
                  <img src="${FOOTER_BASE}images/Trustpilot-Reviews-Services-1.webp" alt="Trustpilot">
                </div>

                <a class="Hemank-contact-card Hemank-link-reset" href="https://uncodemy.com/contact-us">
                  <img src="${FOOTER_BASE}images/CONTACT-US.webp" alt="Contact Us">
                </a>
              </div>
            </section>

            <section class="Hemank-contact-col">
              <h2 class="Hemank-heading">Get In Touch</h2>

              <div class="Hemank-contact-group">
                <div class="Hemank-contact-item">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <p>B 14-15, Udhyog Marg, Block B, Sector 1, Near Noida Sector-15 Metro Station, Delhi NCR Uttar Pradesh 201301</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+919818366550">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                  <span>+91 9818366550</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+918766313646">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                  <span>+91 8766313646</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+918800023723">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                  <span>+91 8800023723</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="mailto:info@uncodemy.com">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 6-10 7L2 6"></path></svg>
                  <span>info@uncodemy.com</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <p>USA- 2439 Bagwell Avenue, Gainesville, Florida-32601</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+17184169028">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                  <span>+1-718 416 9028</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <p>UK - 68 Southern Way, North Lopham, London IP22 0HE</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+442032870088">
                  <svg class="ftr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                  <span>+44 20 3287 0088</span>
                </a>
              </div>
            </section>

            <nav class="Hemank-links-col" aria-label="Quick links">
              <h2 class="Hemank-heading">Quick Links</h2>
              <ul class="Hemank-links-list">
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/privacy-policy">Privacy Policy</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/terms-and-conditions">Terms &amp; Condition</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/refund-policy">Refund Policy</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/register-now">Register Now</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/cancellation-policy">Cancellation Policy</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/product-pricing">Product Pricing</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/shipping-exchange-policy">Shipping Exchange policy</a></li>
                <li><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/contact-us">Contact Us</a></li>
              </ul>
            </nav>

            <aside class="Hemank-payment-col">
              <h2 class="Hemank-heading">Payments</h2>
              <p class="Hemank-payment-label">Secure Payments by :</p>

              <div class="Hemank-payment-methods" aria-label="Payment methods">
                <img src="${FOOTER_BASE}images/payment.webp" alt="Payment methods">
              </div>

              <a class="Hemank-promo-card Hemank-fee-card Hemank-link-reset" href="#">
                <img src="${FOOTER_BASE}images/payment.jpeg" alt="Fee payment">
              </a>

              <a class="Hemank-promo-card Hemank-whatsapp-card Hemank-link-reset" href="#">
                <img src="${FOOTER_BASE}images/whatsappp-logo-png-2293-768x512.png" alt="WhatsApp">
              </a>

              <a class="Hemank-promo-card Hemank-demo-card Hemank-link-reset" href="#">
                <img src="${FOOTER_BASE}images/demo.jpeg" alt="Demo classes">
              </a>

              <a class="Hemank-promo-card Hemank-placement-card Hemank-link-reset" href="#">
                <img src="${FOOTER_BASE}images/pc5.jpg" alt="Placement">
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section class="Hemank-course-footer" aria-label="Students zone and city course pages">
        <div class="Hemank-course-wrap">
          <section class="Hemank-students-zone">
            <h2 class="Hemank-heading">Students Zone</h2>
            <div class="Hemank-text-links">
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/blog/">Blogs</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/summer-training-in-noida">Summer Training</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/winter-training-in-noida">Winter Training</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/industrial-training">Industrial Training</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/corporate-training">Corporate Training</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/placement">Placement</a>
              <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/#specific-section">VideoReviews</a>
            </div>
          </section>

          <section class="Hemank-city-pages">
            <h2 class="Hemank-heading">Cities Course Pages.</h2>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Noida</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-noida">Software Testing Training Course in Noida</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-noida">Data Science Training Course in Noida</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-noida">Data Analytics Training Course in Noida</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-noida">Full Stack Developer Training Course in Noida</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-noida">Digital Marketing Training course in Noida</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Delhi</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-delhi">Software Testing Training Course in Delhi</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-delhi">Data Science Training Course in Delhi</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-delhi">Data Analytics Training Course in Delhi</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi">Full Stack Developer Training Course in Delhi</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-delhi">Digital Marketing Training Course in Delhi</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Pune</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-pune">Software Testing Training Course in Pune</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-pune">Data Science Training Course in Pune</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-pune">Data Analytics Training Course in Pune</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-pune">Full Stack Developer Training Course in Pune</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-pune">Digital Marketing Training Course in Pune</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Bangalore</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-bangalore">Software Testing Training Course in Bangalore</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-bangalore">Data Science Training Course in Bangalore</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-bangalore">Data Analytics Training in Bangalore</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-bangalore">Full Stack Developer Training Course in Bangalore</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-bangalore">Digital Marketing Training Course in Bangalore</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Mumbai</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-mumbai">Software Testing Training Course in Mumbai</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-mumbai">Data Science Training Course in Mumbai</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-mumbai">Data Analytics Training in Mumbai</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-mumbai">Full Stack Developer Training Course in Mumbai</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-mumbai">Digital Marketing Training Course in Mumbai</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3 class="Hemank-city-title">Best Courses in Hyderabad</h3>
              <div class="Hemank-text-links">
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/software-testing-training-course-in-hyderabad">Software Testing Training Course in Hyderabad</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-science-training-course-in-hyderabad">Data Science Training Course in Hyderabad</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/data-analytics-training-course-in-hyderabad">Data Analytics Training Course in Hyderabad</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/full-stack-development-training-course-in-hyderabad">Full Stack Developer Training Course in Hyderabad</a>
                <a class="Hemank-text-link Hemank-link-reset" href="https://uncodemy.com/course/digital-marketing-training-course-in-hyderabad">Digital Marketing Training Course in Hyderabad</a>
              </div>
            </article>
          </section>
        </div>
      </section>

      <section class="Hemank-copyright-section">
        <p class="Hemank-copyright-text Hemank-copyright-line-1">Copyright &copy; <strong class="Hemank-copyright-strong">Uncodemy Edutech Pvt. Ltd.</strong></p>
        <p class="Hemank-copyright-text Hemank-copyright-line-2">All Rights Reserved.</p>
        <p class="Hemank-copyright-text Hemank-copyright-line-3">Designed by <strong class="Hemank-copyright-strong">Uncodemy</strong></p>
      </section>

      <nav class="Hemank-desktop-cta" aria-label="Desktop footer actions">
        <a class="Hemank-cta-link Hemank-link-reset" href="#">Ask For Demo</a>
        <a class="Hemank-cta-link Hemank-link-reset" href="https://pages.razorpay.com/fees-uncodemy">Fee Payment</a>
        <a class="Hemank-cta-link Hemank-link-reset" href="https://api.whatsapp.com/send?phone=918800023723">WhatsApp</a>
        <a class="Hemank-cta-link Hemank-link-reset" href="mailto:info@uncodemy.com">Email</a>
        <a class="Hemank-cta-link Hemank-link-reset" href="tel:+919818366550">Call Us Now</a>
      </nav>

      <nav class="Hemank-mobile-cta" aria-label="Mobile footer actions">
        <a class="Hemank-mobile-cta-link Hemank-mobile-whatsapp Hemank-link-reset" href="#">WhatsApp</a>
        <span class="Hemank-support-avatar" aria-hidden="true">
          <span class="Hemank-avatar-head"></span>
          <span class="Hemank-avatar-body"></span>
          <span class="Hemank-avatar-headset"></span>
        </span>
        <a class="Hemank-mobile-cta-link Hemank-mobile-call Hemank-link-reset" href="tel:+919818366550">Call Us Now</a>
      </nav>

      <!-- ===== STICKY WHATSAPP BUTTON (floating) ===== -->
      <a class="Hemank-whatsapp-float Hemank-link-reset"
         href="https://wa.me/919818366550"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Chat on WhatsApp">
        <img class="Hemank-whatsapp-img"
             src="${FOOTER_BASE}images/whatsapp.png"
             alt="WhatsApp">
      </a>
    </footer>
  </main>
  `;

  // ── Inject into container ────────────────────────────────────────────
  const container = document.getElementById('UnCodeMy-Footer');
  if (container) {
    container.innerHTML = footerHTML;
    // Add a class to <body> for the required bottom padding (fixed CTAs)
    document.body.classList.add('Hemank-uc-page-pad');
  }
});