import React, { useState } from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState(null);
  const [openContact, setOpenContact] = useState(false);

  const closeAll = () => {
    setOpenPolicy(null);
    setOpenContact(false);
  };

  const policyContent = {
    privacy: (
      <>
        <h3>Privacy Policy</h3>
        <ul>
          <li>We do not share personal data with third parties.</li>
          <li>Email & phone are used only for communication.</li>
          <li>Payment data is processed securely.</li>
          <li>Cookies may be used for better experience.</li>
          <li>User data is protected as per IT laws.</li>
        </ul>
      </>
    ),
    terms: (
      <>
        <h3>Terms & Conditions</h3>
        <ul>
          <li>Course access is for registered students only.</li>
          <li>Sharing content is strictly prohibited.</li>
          <li>Fees once paid are subject to refund policy.</li>
          <li>Live class timings may change.</li>
          <li>Misuse may lead to account termination.</li>
        </ul>
      </>
    ),
    refund: (
      <>
        <h3>Refund Policy</h3>
        <ul>
          <li>Refund applicable only before course start.</li>
          <li>No refund after accessing live/recorded content.</li>
          <li>Refund processed within 7 working days.</li>
          <li>Transaction charges are non-refundable.</li>
        </ul>
      </>
    ),
    cancellation: (
      <>
        <h3>Cancellation Policy</h3>
        <ul>
          <li>Cancellation must be requested via email.</li>
          <li>No cancellation after course start.</li>
          <li>Company reserves cancellation rights.</li>
        </ul>
      </>
    ),
    disclaimer: (
      <>
        <h3>Disclaimer</h3>
        <ul>
          <li>Results may vary based on student effort.</li>
          <li>No guarantee of ranks or marks.</li>
          <li>Technical issues may occur.</li>
          <li>Content may be updated anytime.</li>
        </ul>
      </>
    ),
  };

  return (
    <>
      {/* FOOTER */}
      <footer className="mm-footer">
        <div className="footer-container">

          {/* BRAND */}
          <div className="footer-col">
            <h3>📘 Maths Master</h3>
            <p>
              Live & Recorded Classes for Class 11, 12, CBSE, Maharashtra Board &
              Competitive Exams.
            </p>
          </div>

          {/* POLICIES */}
          <div className="footer-col">
            <h4>Policies</h4>
            <ul className="policy-list">
              {["privacy", "terms", "refund", "cancellation", "disclaimer"].map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    className="policy-link"
                    onClick={() => setOpenPolicy(key)}
                  >
                    {key === "privacy" && "Privacy Policy"}
                    {key === "terms" && "Terms & Conditions"}
                    {key === "refund" && "Refund Policy"}
                    {key === "cancellation" && "Cancellation Policy"}
                    {key === "disclaimer" && "Disclaimer"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/join">Join Now</a></li>
              <li><a href="/login">Student Login</a></li>
              <li><a href="/admin-login">Admin Panel</a></li>
              <li>
                <button
                  type="button"
                  className="policy-link"
                  onClick={() => setOpenContact(true)}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="footer-col">
            <h4>Connect With Us</h4>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fb"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="insta"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="yt"><FaYoutube /></a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="tg"><FaTelegramPlane /></a>
              <a href="https://wa.me/919325005689" target="_blank" rel="noreferrer" className="wa"><FaWhatsapp /></a>
            </div>

            <p className="contact">
              <FaEnvelope /> support@mathsmaster.in <br />
              📞 +91 9325005689
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Maths Master. All Rights Reserved.
        </div>
      </footer>

      {/* GLOBAL MODAL */}
      {(openPolicy || openContact) && (
        <div className="policy-overlay">
          <div className="policy-box">
            <button type="button" className="close-btn" onClick={closeAll}>
              <FaTimes />
            </button>

            {openPolicy && policyContent[openPolicy]}

            {openContact && (
              <>
                <h3>Contact Us</h3>
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <input type="text" placeholder="Phone Number" />
                  <textarea rows="4" placeholder="Your Message"></textarea>
                  <button type="submit">Send Message</button>
                </form>

                <p className="contact-note">
                  📧 support@mathsmaster.in <br />
                  📞 +91 9XXXXXXXXX
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}