// MobileHero.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./mobiletop.css";

export default function MobileHero({
  id = "mobile-hero",
  bgImage = "/assets/PortfolioMobileBackgroundImage/planet-2666129.jpg",
  titleTop = "Building Mobile Apps",
  titleBottom = "That Empower Everyday Life",
  subtitle = "I create modern mobile experiences using Flutter and Dart — blending fast performance, clean interfaces, and smooth user journeys for both Android and iOS.",
  leftBtnText = "Contact Me",
  leftBtnLink = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  rightBtnText = "See My Projects",
  rightBtnLink = "https://github.com/WebDeveloper1299",
}) {
  const sectionRef = useRef(null);

  // Background parallax (only moves the bg, not the text)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const bg = el.querySelector(".cta-bg");
    if (!bg) return;

    let raf = 0;

    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const p = 1 - Math.min(1, Math.abs(r.top / vh)); // 0..1

      const ty = p * -12;
      const scale = 1 + p * 0.035;

      bg.style.transform = `translateY(${ty.toFixed(
        1
      )}px) scale(${scale.toFixed(3)})`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".cta-title, .cta-sub, .cta-btn");
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((n) => io.observe(n));

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="cta-section mobile-cta"
      id={id}
      ref={sectionRef}
    >
      <div
        className="cta-bg"
        style={{ backgroundImage: `url("${bgImage}")` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      <div className="cta-content">
        <div className="cta-panel">
          <h2 className="cta-title">
            <span className="line">{titleTop}</span>
            <span className="line">{titleBottom}</span>
          </h2>

          <p className="cta-sub section-subtitle">{subtitle}</p>

          <div className="cta-buttons">
            <Link
              to={leftBtnLink}
              className="cta-btn primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {leftBtnText}
            </Link>
            <Link
              to={rightBtnLink}
              className="cta-btn secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {rightBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
