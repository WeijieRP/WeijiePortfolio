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
    const nodes = el.querySelectorAll(".cta-title, .cta-sub, .cta-buttons a, .cta-buttons .cta-link");
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={ref}>
      <div className="cta-bg" aria-hidden="true" />
      <img className="cta-bg-img" alt="" aria-hidden="true" />

      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="cta-content">
        <h2 className="cta-title">
          <span>{titleTop}</span><br />
          <span>{titleBottom}</span>
        </h2>

        <p className="cta-sub">{subtitle}</p>

        <div className="cta-buttons">
          {/* ✅ External route using Link */}
          <Link
            to={leftBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn primary"
          >
            {leftBtnText}
          </Link>

          {/* ✅ Internal route using Link */}
          <Link to={rightBtnLink} className="cta-btn secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
