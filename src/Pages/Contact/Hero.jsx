// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./projectcta.css";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/ContactBackgroundImage/galaxy.jpg",

  titleTop = "Let’s collaborate and grow together",
  subtitle = "Let’s make the most of our time by building meaningful projects that inspire, connect, and create value for both users and ourselves.",

  leftBtnText = "Contact Me",
  leftBtnLink = "/projects",
  rightBtnText = "View Resume",
  rightBtnLink = "/about",
}) {
  const sectionRef = useRef(null);

  // Set background image via CSS var + img fallback
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    root.style.setProperty("--proj-cta-bg", `url("${bgImage}")`);

    const img = root.querySelector(".proj-cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    const onFrame = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const norm = Math.max(-1, Math.min(1, centerOffset / vh)); // -1..1

      const scale = 1.03 + Math.abs(norm) * 0.05;
      const ty = norm * -24;

      el.style.setProperty("--proj-bg-scale", scale.toString());
      el.style.setProperty("--proj-bg-ty", `${ty}px`);

      raf = requestAnimationFrame(onFrame);
    };

    raf = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal title + subtitle + buttons
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const targets = el.querySelectorAll(
      ".proj-cta-title, .proj-cta-sub, .proj-cta-btn"
    );

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        }),
      { threshold: 0.15 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section className="proj-cta-section" id={id} ref={sectionRef}>
      {/* Background */}
      <div className="proj-cta-bg" aria-hidden="true" />
      <img className="proj-cta-bg-img" alt="" aria-hidden="true" />

      {/* Soft overlay */}
      <div className="proj-cta-overlay" aria-hidden="true" />

      {/* Glass panel */}
      <div className="proj-cta-panel">
        <div className="proj-cta-content">
          {/* Uses global gradient via .title-aurora */}
          <h2 className="proj-cta-title title-aurora">{titleTop}</h2>

          <p className="proj-cta-sub section-subtitle">{subtitle}</p>

          <div className="proj-cta-buttons">
            <Link to={leftBtnLink} className="proj-cta-btn primary">
              {leftBtnText}
            </Link>
            <Link to={rightBtnLink} className="proj-cta-btn secondary">
              {rightBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
