import React, { useEffect, useRef } from "react";
import "./footer.css";

export default function Footer() {
  const ref = useRef(null);

  // Reveal animation on scroll
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e =>
          e.isIntersecting
            ? e.target.classList.add("is-inview")
            : e.target.classList.remove("is-inview")
        ),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Floating bubbles animation (alive background)
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
  }));

  return (
    <footer ref={ref} className="footer">
      {/* Parallax background */}
      <div
        className="footer-bg"
        style={{
          backgroundImage:
            'url("/assets/footer.png")',
        }}
      />

      {/* Floating bubbles */}
      <div className="footer-bubbles" aria-hidden>
        {bubbles.map(b => (
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

      {/* Overlay gradient */}
      <div className="footer-overlay" />

      <div className="footer-content">
        <div className="footer-left reveal" data-anim="up">
          <img
            className="footer-logo"
            src="assets/WeijieLogo_Website.png"
            alt="Wei Jie Logo"
          />
          <h3 className="brand-name">Wei Jie</h3>
          <p>Designing with empathy, building with innovation</p>
        </div>

        <div className="footer-links reveal" data-anim="up">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-connect reveal" data-anim="up">
          <h4>Connect</h4>
          <div className="socials">
            <a
              className="social-btn ln"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn"/>
            </a>
            <a
              className="social-btn gh"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" alt="GitHub"/>
            </a>
            <a
              className="social-btn ol"
              href="mailto:someone@example.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftoutlook.svg" alt="Outlook"/>
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom line */}
      <div className="footer-bottom reveal" data-anim="up">
        <p>© 2025 Wei Jie · All Rights Reserved</p>
      </div>
    </footer>
  );
}
