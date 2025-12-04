// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/PortfolioDesignBackgroundImage/8984178.png",
  titleTop = "Design Systems That Drive ",
  titleBottom = "Real Impact",
  subtitle = "I turn ideas into tested workflows, clean UI, and reusable components ready for production.",
  leftBtnText = "Contact Me",
  leftBtnLink = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  rightBtnText = "See My Project",
  rightBtnLink = "https://github.com/WebDeveloper1299",
}) {
  const sectionRef = useRef(null);

  // Background parallax
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const bg = el.querySelector(".cta-bg");
    if (!bg) return;

    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = 1 - Math.min(1, Math.abs(rect.top / vh)); // 0..1

      const scale = 1 + p * 0.03;
      const ty = p * -8;

      bg.style.transform = `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(
        3
      )})`;
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting)
        );
      },
      { threshold: 0.18 }
    );

    items.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={sectionRef}>
      {/* Background image */}
      <div
        className="cta-bg"
        style={{ backgroundImage: `url("${bgImage}")` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      {/* Content */}
      <div
        className="cta-content"
        role="region"
        aria-labelledby={`${id}-title`}
      >
        {/* Glass panel (soft) */}
        <div className="cta-panel">
          <h2 id={`${id}-title`} className="cta-title title-aurora">
            <span>{titleTop}</span>
            <br />
            <span>{titleBottom}</span>
          </h2>

          <p className="cta-sub section-subtitle">{subtitle}</p>

          <div className="cta-buttons">
            <a
              href={leftBtnLink}
              className="cta-btn primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {leftBtnText}
            </a>

            <a
              href={rightBtnLink}
              className="cta-btn secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {rightBtnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
