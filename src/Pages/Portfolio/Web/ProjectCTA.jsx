// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./projectCTA.css";
import { Link } from "react-router-dom";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "/assets/heaven.png",
  titleTop = "Let’s Build Something",
  titleBottom = "Amazing Together",
  subtitle = "Have a web idea or project? I can help design and ship it.",
  leftBtnText = "Get In Touch",
  leftBtnLink = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  rightBtnText = "View Projects",
  rightBtnLink = "https://github.com/WebDeveloper1299",
}) {
  const ref = useRef(null);

  // Apply background both as CSS var and <img> src
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.style.setProperty("--project-cta-bg", `url("${bgImage}")`);
    const img = root.querySelector(".cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // Parallax effect
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(r.top / vh));
      el.style.setProperty("--bg-scale", (1 + p * 0.06).toString());
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
      ".project-cta-section .cta-title span, .project-cta-section .cta-sub, .project-cta-section .cta-btn"
    );
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="project-cta-section" id={id} ref={ref}>
      {/* Background layers */}
      <div className="cta-bg" aria-hidden="true" />
      <img className="cta-bg-img" alt="" aria-hidden="true" />

      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* Content */}
      <div className="cta-content">
        {/* gradient from global .title-aurora */}
        <h2 className="">
          <span>{titleTop}</span>
          <br />
          <span>{titleBottom}</span>
        </h2>

        {/* typography/color from global .section-subtitle, plus local spacing */}
        <p className="cta-sub section-subtitle">{subtitle}</p>

        <div className="cta-buttons">
          {/* External route */}
          <Link
            to={leftBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn primary"
          >
            {leftBtnText}
          </Link>

          {/* Another external (GitHub) – still ok to use Link with target=_blank */}
          <Link
            to={rightBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn secondary"
          >
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
