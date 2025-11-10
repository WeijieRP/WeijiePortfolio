import React, { useEffect, useMemo, useRef } from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const ref = useRef(null);

  // Reveal animation on scroll
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Floating bubbles stable
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 12 + 8,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 10 + Math.random() * 8,
      })),
    []
  );

  return (
    <footer ref={ref} className="footer">
      {/* Background */}
      <div
        className="footer-bg"
        style={{ backgroundImage: 'url("/assets/footer.png")' }}
      />

      {/* Bubbles */}
      <div className="footer-bubbles" aria-hidden="true">
        {bubbles.map((b) => (
          <span
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="footer-overlay" aria-hidden="true" />

      <div className="footer-content">
        {/* Logo + tagline */}
        <div className="footer-left reveal" data-anim="up">
          <img
            className="footer-logo"
            src="/assets/Weijie_Logo1.png"
            alt="Wei Jie logo"
            style={{ width: "200px", height: "80px" }}
          />
          <p>Full-Stack Vision. Design Precision. Real-World Creation.</p>
        </div>

        {/* Navigation */}
        <div className="footer-links reveal" data-anim="up">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
          </ul>
        </div>

        {/* Socials — ONLY <Link> */}
        <div className="footer-connect reveal" data-anim="up">
          <h4>Connect</h4>
          <div className="socials">
            <Link
              className="social-btn ln"
              to="https://www.linkedin.com/in/hooi-weijie-b13b11310/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-linkedin-48.png" alt="LinkedIn" />
            </Link>

            <Link
              className="social-btn gh"
              to="https://github.com/WebDeveloper1299"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-github-30.png" alt="GitHub" />
            </Link>

            <Link
              className="social-btn ol"
              to="mailto:24040351@myrp.edu.sg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-outlook-48.png" alt="Email" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom reveal" data-anim="up">
        <p>© 2025 Wei Jie · All Rights Reserved</p>
      </div>
    </footer>
  );
}
