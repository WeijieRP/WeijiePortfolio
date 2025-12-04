// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./top.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/PortfolioWebBackgroundImage/moon.png",

  titleTop = "Let’s Create Your Website",
  titleBottom = "From Idea to Launch",
  subtitle = "I design and build clean, responsive websites that help you stand out online. Let’s make something great together.",

  leftBtnText = "Contact Me",
  leftBtnLink = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  rightBtnText = "See My Projects",
  rightBtnLink = "https://github.com/WebDeveloper1299",
}) {
  const ref = useRef(null);

  // Set background image via CSS var + <img> fallback
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.style.setProperty("--web-cta-bg", `url("${bgImage}")`);
    const img = root.querySelector(".web-cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(rect.top / vh)); // 0..1

      const scale = 1 + p * 0.06;
      const ty = -20 * p;

      el.style.setProperty("--web-bg-scale", scale.toString());
      el.style.setProperty("--web-bg-ty", `${ty}px`);

      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animation
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const nodes = el.querySelectorAll(
      ".web-cta-title, .web-cta-sub, .web-cta-btn"
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="web-cta-section" id={id} ref={ref}>
      {/* Background */}
      <div className="web-cta-bg" aria-hidden="true" />
      <img className="web-cta-bg-img" alt="" aria-hidden="true" />
      <div className="web-cta-overlay" aria-hidden="true" />

      {/* Ambient + sparkles */}
      <div className="web-cta-ambient" aria-hidden="true" />
      <div className="web-cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* Single glass panel */}
      <div className="web-cta-panel">
        <h2 className="web-cta-title title-aurora">
          {titleTop}
          <br />
          {titleBottom}
        </h2>

        <p className="web-cta-sub section-subtitle">{subtitle}</p>

        <div className="web-cta-buttons">
          <Link
            to={leftBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="web-cta-btn primary"
          >
            {leftBtnText}
          </Link>
          <Link
            to={rightBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="web-cta-btn secondary"
          >
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
