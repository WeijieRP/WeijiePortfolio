import React, { useEffect, useRef } from "react";
import "./hero.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
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

  // Gentle parallax for background image
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const bg = el.querySelector(".cta-bg");
    if (!bg) return;

    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const p = 1 - Math.min(1, Math.abs(r.top / vh)); // 0..1
      const scale = 1 + p * 0.035;
      const ty = p * -12;
      bg.style.transform = `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal text + buttons when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".cta-title, .cta-sub, .cta-btn");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.18 }
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={sectionRef}>
      <div
        className="cta-bg"
        style={{ backgroundImage: `url("${bgImage}")` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      <div className="cta-content" role="region" aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`} className="cta-title">
          {/* Layered lines: solid + gradient so the title never disappears */}
          <span className="line">
            <span className="line-grad" aria-hidden="true">{titleTop}</span>
            <span className="line-solid">{titleTop}</span>
          </span>
          <span className="line">
            <span className="line-grad" aria-hidden="true">{titleBottom}</span>
            <span className="line-solid">{titleBottom}</span>
          </span>
        </h2>

        <p className="cta-sub">{subtitle}</p>

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
    </section>
  );
}
