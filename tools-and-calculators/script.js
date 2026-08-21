document.addEventListener('DOMContentLoaded', function () {
  // script.js

  const footerHTML = `  <main class="Hemank-page">
    <footer class="Hemank-footer" aria-label="UnCodemy footer">
      <section class="Hemank-footer-top">
        <div class="Hemank-footer-wrap">
          <div class="Hemank-footer-grid">
            <section class="Hemank-brand-col">
              <a class="Hemank-brand-logo" href="#" aria-label="UnCodemy home">
                <span class="Hemank-brand-mark">
                  <img src="Assets/Uncodemy logo-10.png" alt="">
                </span>
              </a>

              <p class="Hemank-about-text">
                Uncodemy is a team of high-class working professionals associated with a Fortune500
                company. We are on a mission to employ millions. If you want a job, or career change,
                Uncodemy is the right place for you. We will teach you how to work with the latest
                technology.
              </p>

              <div class="Hemank-social-row" aria-label="Social media links">
                <a class="Hemank-social-link Hemank-social-x" href="https://x.com/uncodemy?lang=en" aria-label="X">X</a>
                <a class="Hemank-social-link Hemank-social-fb" href="https://www.facebook.com/uncodemyofficial/" aria-label="Facebook">f</a>
                <a class="Hemank-social-link Hemank-social-in" href="https://www.linkedin.com/company/uncodemy/?originalSubdomain=in" aria-label="LinkedIn">in</a>
                <a class="Hemank-social-link Hemank-social-ig" href="https://www.instagram.com/uncodemyofficial/?hl=en" aria-label="Instagram">IG</a>
              </div>

              <p class="Hemank-certified">Certified By-</p>

              <div class="Hemank-partner-card" aria-label="Certification partners">
                <span>Skill India</span>
                <span>NASSCOM</span>
                <span>Google Partner</span>
                <span>futureskills prime</span>
              </div>

              <div class="Hemank-award-card" aria-label="Awards">
                <img src="Assets/Stars.webp" alt="">
              </div>

              <div class="Hemank-rating-row">
                <div class="Hemank-trust-card" aria-label="Trustpilot rating">
                  <div class="Hemank-trust-title">
                    <span>*</span>
                    <strong>Trustpilot</strong>
                  </div>
                  <div class="Hemank-trust-stars">
                    <span>*</span><span>*</span><span>*</span><span>*</span><span>*</span>
                  </div>
                </div>

                <a class="Hemank-contact-card" href="https://uncodemy.com/contact-us">
                  <span>CALL</span>
                  <strong>CONTACT<br />US</strong>
                </a>
              </div>
            </section>

            <section class="Hemank-contact-col">
              <h2>Get In Touch</h2>

              <div class="Hemank-contact-group">
                <div class="Hemank-contact-item">
                  <i class="fa fa-map-marker-alt mr-2"></i>
                  <p>B 14-15, Udhyog Marg, Block B, Sector 1, Near Noida Sector-15 Metro Station, Delhi NCR Uttar Pradesh 201301</p>
                </div>
                <a class="Hemank-contact-item" href="tel:+919818366550">
                  <i class="fa fa-phone-alt mr-2"></i>
                  <span>+91 9818366550</span>
                </a>
                <a class="Hemank-contact-item" href="tel:+918766313646">
                  <i class="fa fa-phone-alt mr-2"></i>
                  <span>+91 8766313646</span>
                </a>
                <a class="Hemank-contact-item" href="tel:+918800023723">
                  <i class="fa fa-phone-alt mr-2"></i>
                  <span>+91 8800023723</span>
                </a>
                <a class="Hemank-contact-item" href="mailto:info@uncodemy.com">
                  <i class="fa fa-envelope mailto:mr-2"></i>
                  <span>info@uncodemy.com</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                  <i class="fa fa-map-marker-alt mr-2"></i>
                  <p>USA- 2439 Bagwell Avenue, Gainesville, Florida-32601</p>
                </div>
                <a class="Hemank-contact-item" href="tel:+17184169028">
                 <i class="fa fa-phone-alt mr-2"></i>
                  <span>+1-718 416 9028</span>
                </a>
              </div>

              <div class="Hemank-divider"></div>

              <div class="Hemank-contact-group Hemank-small">
                <div class="Hemank-contact-item">
                   <i class="fa fa-map-marker-alt mr-2"></i>
                  <p>UK - 68 Southern Way, North Lopham, London IP22 0HE</p>
                </div>
                <a class="Hemank-contact-item" href="tel:+442032870088">
                  <i class="fa fa-phone-alt mr-2"></i>
                  <span>+44 20 3287 0088</span>
                </a>
              </div>
            </section>

            <nav class="Hemank-links-col" aria-label="Quick links">
              <h2>Quick Links</h2>
              <ul>
                <li><a href="https://uncodemy.com/privacy-policy">Privacy Policy</a></li>
                <li><a href="https://uncodemy.com/terms-and-conditions">Terms &amp; Condition</a></li>
                <li><a href="https://uncodemy.com/refund-policy">Refund Policy</a></li>
                <li><a href="https://uncodemy.com/register-now">Register Now</a></li>
                <li><a href="https://uncodemy.com/cancellation-policy">Cancellation Policy</a></li>
                <li><a href="https://uncodemy.com/product-pricing">Product Pricing</a></li>
                <li><a href="https://uncodemy.com/shipping-exchange-policy">Shipping Exchange policy</a></li>
                <li><a href="https://uncodemy.com/contact-us">Contact Us</a></li>
              </ul>
            </nav>

            <aside class="Hemank-payment-col">
              <h2>Payments</h2>
              <p>Secure Payments by :</p>

              <div class="Hemank-payment-methods" aria-label="Payment methods">
                <span>VISA</span>
                <span>MC</span>
                <span>PayPal</span>
                <span>Skrill</span>
                <span>Maestro</span>
                <span>Visa Electron</span>
              </div>

              <a class="Hemank-promo-card Hemank-fee-card" href="#">
                <span>CARD</span>
                <strong>FEE<br />PAYMENT</strong>
              </a>

              <a class="Hemank-promo-card Hemank-whatsapp-card" href="#">
                <span>WA</span>
                <strong>WhatsApp</strong>
              </a>

              <a class="Hemank-promo-card Hemank-demo-card" href="#">
                <span>BOX</span>
                <strong>ASK FOR<br />DEMO</strong>
              </a>

              <a class="Hemank-promo-card Hemank-placement-card" href="#">
                <strong>PLACEMENT</strong>
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section class="Hemank-course-footer" aria-label="Students zone and city course pages">
        <div class="Hemank-course-wrap">
          <section class="Hemank-students-zone">
            <h2>Students Zone</h2>
            <div class="Hemank-text-links">
              <a href="https://uncodemy.com/blog/">Blogs</a>
              <a href="https://uncodemy.com/summer-training-in-noida">Summer Training</a>
              <a href="https://uncodemy.com/winter-training-in-noida">Winter Training</a>
              <a href="https://uncodemy.com/industrial-training">Industrial Training</a>
              <a href="https://uncodemy.com/corporate-training">Corporate Training</a>
              <a href="https://uncodemy.com/placement">Placement</a>
              <a href="https://uncodemy.com/#specific-section">VideoReviews</a>
            </div>
          </section>

          <section class="Hemank-city-pages">
            <h2>Cities Course Pages.</h2>

            <article class="Hemank-city-row">
              <h3>Best Courses in Noida</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-noida">Software Testing Training Course in Noida</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-noida">Data Science Training Course in Noida</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-noida">Data Analytics Training Course in Noida</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-noida">Full Stack Developer Training Course in Noida</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-noida">Digital Marketing Training course in Noida</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3>Best Courses in Delhi</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-delhi">Software Testing Training Course in Delhi</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-delhi">Data Science Training Course in Delhi</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-delhi">Data Analytics Training Course in Delhi</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi">Full Stack Developer Training Course in Delhi</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-delhi">Digital Marketing Training Course in Delhi</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3>Best Courses in Pune</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-pune">Software Testing Training Course in Pune</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-pune">Data Science Training Course in Pune</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-pune">Data Analytics Training Course in Pune</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-pune">Full Stack Developer Training Course in Pune</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-pune">Digital Marketing Training Course in Pune</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3>Best Courses in Bangalore</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-bangalore">Software Testing Training Course in Bangalore</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-bangalore">Data Science Training Course in Bangalore</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-bangalore">Data Analytics Training in Bangalore</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-bangalore">Full Stack Developer Training Course in Bangalore</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-bangalore">Digital Marketing Training Course in Bangalore</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3>Best Courses in Mumbai</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-mumbai">Software Testing Training Course in Mumbai</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-mumbai">Data Science Training Course in Mumbai</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-mumbai">Data Analytics Trainingin Mumbai</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-mumbai">Full Stack Developer Training Course in Mumbai</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-mumbai">Digital Marketing Training Course in Mumbai</a>
              </div>
            </article>

            <article class="Hemank-city-row">
              <h3>Best Courses in Hyderabad</h3>
              <div class="Hemank-text-links">
                <a href="https://uncodemy.com/course/software-testing-training-course-in-hyderabad">Software Testing Training Course in Hyderabad</a>
                <a href="https://uncodemy.com/course/data-science-training-course-in-hyderabad">Data Science Training Course in Hyderabad</a>
                <a href="https://uncodemy.com/course/data-analytics-training-course-in-hyderabad">Data Analytics Training Course in Hyderabad</a>
                <a href="https://uncodemy.com/course/full-stack-development-training-course-in-hyderabad">Full Stack Developer Training Course in Hyderabad</a>
                <a href="https://uncodemy.com/course/digital-marketing-training-course-in-hyderabad">Digital Marketing Training Course in Hyderabad</a>
              </div>
            </article>
          </section>
        </div>
      </section>

      <section class="Hemank-copyright-section">
        <p>Copyright &copy; <strong>Uncodemy Edutech Pvt. Ltd.</strong></p>
        <p>All Rights Reserved.</p>
        <p>Designed by <strong>Uncodemy</strong></p>
      </section>

      <nav class="Hemank-desktop-cta" aria-label="Desktop footer actions">
        <a href="#">Ask For Demo</a>
        <a href="https://pages.razorpay.com/fees-uncodemy">Fee Payment</a>
        <a href="https://api.whatsapp.com/send?phone=918800023723">WhatsApp</a>
        <a href="mailto:info@uncodemy.com">Email</a>
        <a href="tel:+919818366550">Call Us Now</a>
      </nav>

      <nav class="Hemank-mobile-cta" aria-label="Mobile footer actions">
        <a class="Hemank-mobile-whatsapp" href="#">WhatsApp</a>
        <span class="Hemank-support-avatar" aria-hidden="true">
          <span class="Hemank-avatar-head"></span>
          <span class="Hemank-avatar-body"></span>
          <span class="Hemank-avatar-headset"></span>
        </span>
        <a class="Hemank-mobile-call" href="tel:+919818366550">Call Us Now</a>
      </nav>
    </footer>
  </main>`

  const UnCodeMyFooter = document.getElementById("UnCodeMy-Footer");
  console.log(UnCodeMyFooter);

  if (UnCodeMyFooter) {
    UnCodeMyFooter.innerHTML = footerHTML;
  }
})