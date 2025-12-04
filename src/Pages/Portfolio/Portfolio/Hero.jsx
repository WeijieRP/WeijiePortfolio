// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./top.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/PortfolioBackgroundImage/space-11099_1920 1.png",

  titleTop = "Exploring my work",
  subtitle = "A collection of the projects I’ve worked on, including the design process, development journey, and finished pieces.",

  leftBtnText = "See Projects",
  leftBtnLink = "/projects",
  rightBtnText = "Resume",
  rightBtnLink = "/about",
}) {
  const ref = useRef(null);

  // Set background image
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.style.setProperty("--top-cta-bg", `url("${bgImage}")`);

    const img = root.querySelector(".top-cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(r.top / vh)); // 0..1

      const scale = 1 + p * 0.06;
      const ty = -20 * p;

      el.style.setProperty("--top-bg-scale", scale.toFixed(2));
      el.style.setProperty("--top-bg-ty", `${ty.toFixed(1)}px`);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animations
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const nodes = el.querySelectorAll(
      ".top-cta-title, .top-cta-sub, .top-cta-btn"
    );

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("top-visible", entry.isIntersecting);
        }),
      { threshold: 0.2 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="top-cta-section" id={id} ref={ref}>
      {/* Background */}
      <div className="top-cta-bg" aria-hidden="true" />
      <img className="top-cta-bg-img" alt="" aria-hidden="true" />
      <div className="top-cta-overlay" aria-hidden="true" />

      {/* ONE glass panel covering title + subtitle + buttons */}
      <div className="top-cta-content">
        <h2 className="top-cta-title clean-gradient-title">{titleTop}</h2>

        <p className="top-cta-sub">{subtitle}</p>

        <div className="top-cta-buttons">
          <Link to={leftBtnLink} className="top-cta-btn top-primary">
            {leftBtnText}
          </Link>
          <Link to={rightBtnLink} className="top-cta-btn top-secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
