// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./projectcta.css";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/AboutBackgroundImage/7877341.jpg",

  titleTop = "This is about me",
  subtitle = "Get to know me more and take a quick snapshot of my background, tools, and what I’m building next.",

  leftBtnText = "See Projects",
  leftBtnLink = "/projects",
  rightBtnText = "Resume",
  rightBtnLink = "/about",
}) {
  const ref = useRef(null);

  // Set background image via CSS var + img fallback
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.style.setProperty("--cta-bg", `url("${bgImage}")`);

    const img = root.querySelector(".proj-cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(r.top / vh));

      el.style.setProperty("--bg-scale", (1 + p * 0.04).toString());
      el.style.setProperty("--bg-ty", `${p * -14}px`);

      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animations
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const targets = el.querySelectorAll(
      ".proj-cta-title, .proj-cta-sub, .proj-cta-btn"
    );

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section className="proj-cta-section" id={id} ref={ref}>
      <div className="proj-cta-bg" aria-hidden="true" />
      <img className="proj-cta-bg-img" alt="" aria-hidden="true" />

      {/* ONE GLASS PANEL */}
      <div className="proj-cta-panel">
        <div className="proj-cta-content">
          {/* 🔹 Title uses global gradient class */}
          <h2 className="proj-cta-title title-aurora">{titleTop}</h2>

          {/* 🔹 Subtitle uses global section-subtitle */}
          <p className="proj-cta-sub section-subtitle">{subtitle}</p>

          <div className="proj-cta-buttons">
            <Link
              to={leftBtnLink}
              className="proj-cta-btn primary"
            >
              {leftBtnText}
            </Link>
            <Link
              to={rightBtnLink}
              className="proj-cta-btn secondary"
            >
              {rightBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
