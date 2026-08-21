document.addEventListener('DOMContentLoaded', function () {
  // script.js

  // Auto-detect this script's own folder so image asset paths resolve
  // correctly no matter how deep the including page is nested.
  var FOOTER_BASE = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName("script");
      for (var i = 0; i < all.length; i++) {
        if (/footer-script\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    var src = (s && s.getAttribute("src")) || "";
    return src.substring(0, src.lastIndexOf("/") + 1);
  })();

  const footerHTML = `  <main class="Hemank-page">
    <footer class="Hemank-footer" aria-label="UnCodemy footer">
      <section class="Hemank-footer-top">
        <div class="Hemank-footer-wrap">
          <div class="Hemank-footer-grid">
            <section class="Hemank-brand-col">
              <a class="Hemank-brand-logo Hemank-link-reset" href="#" aria-label="UnCodemy home">
                <span class="Hemank-brand-mark">
                  <img class="Hemank-brand-img" src="${FOOTER_BASE}footer-assets/Uncodemy logo-10.png" alt="">
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
                <span class="Hemank-partner-item">Skill India</span>
                <span class="Hemank-partner-item Hemank-partner-item-red">NASSCOM</span>
                <span class="Hemank-partner-item Hemank-partner-item-blue">Google Partner</span>
                <span class="Hemank-partner-item">futureskills prime</span>
              </div>

              <div class="Hemank-award-card" aria-label="Awards">
                <img class="Hemank-award-img" src="${FOOTER_BASE}footer-assets/Stars.webp" alt="">
              </div>

              <div class="Hemank-rating-row">
                <div class="Hemank-trust-card" aria-label="Trustpilot rating">
                  <div class="Hemank-trust-title">
                    <span class="Hemank-trust-icon">*</span>
                    <strong class="Hemank-trust-name">Trustpilot</strong>
                  </div>
                  <div class="Hemank-trust-stars">
                    <span class="Hemank-star">*</span><span class="Hemank-star">*</span><span class="Hemank-star">*</span><span class="Hemank-star">*</span><span class="Hemank-star">*</span>
                  </div>
                </div>

                <a class="Hemank-contact-card Hemank-link-reset" href="https://uncodemy.com/contact-us">
                  <span class="Hemank-contact-icon">CALL</span>
                  <strong class="Hemank-contact-label">CONTACT<br />US</strong>
                </a>
              </div>
            </section>

            <section class="Hemank-contact-col">
              <h2 class="Hemank-heading">Get In Touch</h2>

              <div class="Hemank-contact-group">
                <div class="Hemank-contact-item">
                  <i class="Hemank-icon Hemank-icon-marker fa fa-map-marker-alt mr-2"></i>
                  <p class="Hemank-contact-text">B 14-15, Udhyog Marg, Block B, Sector 1, Near Noida Sector-15 Metro Station, Delhi NCR Uttar Pradesh 201301</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+919818366550">
                  <i class="Hemank-icon Hemank-icon-phone fa fa-phone-alt mr-2"></i>
                  <span class="Hemank-contact-text">+91 9818366550</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+918766313646">
                  <i class="Hemank-icon Hemank-icon-phone fa fa-phone-alt mr-2"></i>
                  <span class="Hemank-contact-text">+91 8766313646</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+918800023723">
                  <i class="Hemank-icon Hemank-icon-phone fa fa-phone-alt mr-2"></i>
                  <span class="Hemank-contact-text">+91 8800023723</span>
                </a>
                <a class="Hemank-contact-item Hemank-link-reset" href="mailto:info@uncodemy.com">
                  <i class="Hemank-icon Hemank-icon-mail fa fa-envelope mailto:mr-2"></i>
                  <span class="Hemank-contact-text">info@uncodemy.com</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                  <i class="Hemank-icon Hemank-icon-marker fa fa-map-marker-alt mr-2"></i>
                  <p class="Hemank-contact-text">USA- 2439 Bagwell Avenue, Gainesville, Florida-32601</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+17184169028">
                 <i class="Hemank-icon Hemank-icon-phone fa fa-phone-alt mr-2"></i>
                  <span class="Hemank-contact-text">+1-718 416 9028</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                   <i class="Hemank-icon Hemank-icon-marker fa fa-map-marker-alt mr-2"></i>
                  <p class="Hemank-contact-text">UK - 68 Southern Way, North Lopham, London IP22 0HE</p>
                </div>
                <a class="Hemank-contact-item Hemank-link-reset" href="tel:+442032870088">
                  <i class="Hemank-icon Hemank-icon-phone fa fa-phone-alt mr-2"></i>
                  <span class="Hemank-contact-text">+44 20 3287 0088</span>
                </a>
              </div>
            </section>

            <nav class="Hemank-links-col" aria-label="Quick links">
              <h2 class="Hemank-heading">Quick Links</h2>
              <ul class="Hemank-links-list">
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/privacy-policy">Privacy Policy</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/terms-and-conditions">Terms &amp; Condition</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/refund-policy">Refund Policy</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/register-now">Register Now</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/cancellation-policy">Cancellation Policy</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/product-pricing">Product Pricing</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/shipping-exchange-policy">Shipping Exchange policy</a></li>
                <li class="Hemank-link-item-wrap"><a class="Hemank-link-item Hemank-link-reset" href="https://uncodemy.com/contact-us">Contact Us</a></li>
              </ul>
            </nav>

            <aside class="Hemank-payment-col">
              <h2 class="Hemank-heading">Payments</h2>
              <p class="Hemank-payment-label">Secure Payments by :</p>

              <div class="Hemank-payment-methods" aria-label="Payment methods">
                <span class="Hemank-payment-item">VISA</span>
                <span class="Hemank-payment-item Hemank-payment-item-red">MC</span>
                <span class="Hemank-payment-item">PayPal</span>
                <span class="Hemank-payment-item Hemank-payment-item-purple">Skrill</span>
                <span class="Hemank-payment-item Hemank-payment-item-teal">Maestro</span>
                <span class="Hemank-payment-item">Visa Electron</span>
              </div>

              <a class="Hemank-promo-card Hemank-fee-card Hemank-link-reset" href="#">
                <span class="Hemank-fee-icon">CARD</span>
                <strong class="Hemank-promo-label">FEE<br />PAYMENT</strong>
              </a>

              <a class="Hemank-promo-card Hemank-whatsapp-card Hemank-link-reset" href="#">
                <span class="Hemank-round-icon">WA</span>
                <strong class="Hemank-promo-label">WhatsApp</strong>
              </a>

              <a class="Hemank-promo-card Hemank-demo-card Hemank-link-reset" href="#">
                <span class="Hemank-round-icon">BOX</span>
                <strong class="Hemank-promo-label">ASK FOR<br />DEMO</strong>
              </a>

              <a class="Hemank-promo-card Hemank-placement-card Hemank-link-reset" href="#">
                <strong class="Hemank-promo-label">PLACEMENT</strong>
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
    </footer>
  </main>

  <a class="Hemank-whatsapp-float Hemank-link-reset" href="https://wa.me/919818366550" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <img class="Hemank-whatsapp-img" src="${FOOTER_BASE}images/whatsapp.png" alt="WhatsApp">
  </a>`

  const UnCodeMyFooter = document.getElementById("UnCodeMy-Footer");
  console.log(UnCodeMyFooter);

  console.log('body width:', getComputedStyle(document.body).maxWidth, getComputedStyle(document.body).width);
console.log('footer parent width:', document.getElementById('UnCodeMy-Footer').parentElement.tagName, getComputedStyle(document.getElementById('UnCodeMy-Footer').parentElement).maxWidth);
  if (UnCodeMyFooter) {
    UnCodeMyFooter.innerHTML = footerHTML;
    // Adds bottom padding to <body> using a scoped class (not a raw `body{}` CSS rule),
    // so the fixed CTA bars don't cover page content without overriding the host page's own body styles.
    document.body.classList.add("Hemank-uc-page-pad");
  }
})