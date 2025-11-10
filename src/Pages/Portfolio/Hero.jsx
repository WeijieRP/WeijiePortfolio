// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/PortfolioBackgroundImage/space-11099_1920 1.png",

  // Copy
  titleTop = "Exploring my work",
  subtitle = "A collection of the projects I’ve worked on, including the design process, development journey, and finished pieces.",

  // Buttons
  leftBtnText = "See Projects",
  leftBtnLink = "/projects",
  rightBtnText = "Resume",
  rightBtnLink = "/about",
}) {
  const ref = useRef(null);

  // Apply background to CSS var and fallback <img>
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // If your path has spaces, keep quotes around url(...)
    root.style.setProperty("--cta-bg", `url("${bgImage}")`);
    const img = root.querySelector(".cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const tick = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const p = Math.max(0, 1 - Math.abs(r.top / vh)); // 0..1 as hero enters/leaves
      el.style.setProperty("--bg-scale", (1 + p * 0.06).toFixed(3));
      el.style.setProperty("--bg-ty", `${(-20 * p).toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll(".cta-title, .cta-sub, .cta-btn");
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={ref}>
      {/* Background */}
      <div className="cta-bg" aria-hidden="true" />
      <img className="cta-bg-img" alt="" aria-hidden="true" />

      {/* Ambient layers */}
      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
      </div>

      {/* Content */}
      <div className="cta-content" role="region" aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`} className="cta-title fd-title-aurora">
          <span>{titleTop}</span>
        </h2>

        <p className="cta-sub">{subtitle}</p>

        <div className="cta-buttons">
          <Link to={leftBtnLink} className="cta-btn primary">
            {leftBtnText}
          </Link>
          <Link to={rightBtnLink} className="cta-btn secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
