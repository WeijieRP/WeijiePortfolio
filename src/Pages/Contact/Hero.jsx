// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/ContactBackgroundImage/galaxy.jpg",

  // Portfolio hero copy (title + subtitle)
  titleTop = "Let’s collaborate and grow together",
  subtitle = "Let’s make the most of our time by building meaningful projects that inspire, connect, and create value for both users and ourselves.",

  // Buttons tuned for a portfolio hero
  leftBtnText = "Contact Me",
  leftBtnLink = "/projects",
  rightBtnText = "View Resume",
  rightBtnLink = "/about",
}) {
  const ref = useRef(null);

  // Apply background to CSS var and fallback <img>
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.style.setProperty("--cta-bg", `url("${bgImage}")`);
    const img = root.querySelector(".cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax effect
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const tick = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(r.top / vh));
      el.style.setProperty("--bg-scale", 1 + p * 0.06);
      el.style.setProperty("--bg-ty", `${p * -20}px`);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll(
      ".cta-title, .cta-sub, .cta-buttons a, .cta-buttons .cta-link"
    );
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={ref}>
      {/* Full-bleed background image (parallax via CSS vars) */}
      <div className="cta-bg" aria-hidden="true" />
      <img className="cta-bg-img" alt="" aria-hidden="true" />

      {/* Ambient effects */}
      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
      </div>

      {/* Hero content */}
      <div className="cta-content">
        <h2 className="cta-title">
          <span>{titleTop}</span><br />
        </h2>

        <p className="cta-sub">{subtitle}</p>

        <div className="cta-buttons">
          {/* Left: internal route to Projects */}
          <Link to={leftBtnLink} className="cta-btn primary">
            {leftBtnText}
          </Link>

          {/* Right: internal route to About/CV */}
          <Link to={rightBtnLink} className="cta-btn secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
