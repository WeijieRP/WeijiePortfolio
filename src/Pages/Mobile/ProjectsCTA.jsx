// ProjectCTA.jsx
import React, { useEffect, useRef } from "react";
import "./projectCTA.css";

export default function ProjectCTA({
  id = "project-cta",
  bgImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80",
  titleTop = "Let’s Build Something",
  titleBottom = "Amazing Together",
  subtitle = "Have a web idea or project? I can help design and ship it.",
  leftBtnText = "Get In Touch",
  leftBtnLink = "#contact",
  rightBtnText = "View Projects",
  rightBtnLink = "#projects",
}) {
  const sectionRef = useRef(null);

  // Parallax + zoom background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const animate = () => {
      const rect = el.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);

      // how much of the section is in view (0–1)
      const p = clamp(1 - Math.abs(rect.top / vh), 0, 1);

      const scale = 1 + p * 0.06; // zoom intensity
      const ty = p * -20;

      el.style.setProperty("--bg-scale", scale.toFixed(3));
      el.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal slide-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const elems = el.querySelectorAll(".cta-title, .cta-sub, .cta-btn");
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      elems.forEach((n) => n.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );

    elems.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" id={id} ref={sectionRef}>
      <div
        className="cta-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      <div className="cta-content">
        <h2 className="cta-title">
          <span>{titleTop}</span>
          <br />
          <span>{titleBottom}</span>
        </h2>

        <p className="cta-sub">{subtitle}</p>

        <div className="cta-buttons">
          <a href={leftBtnLink} className="cta-btn primary">
            {leftBtnText}
          </a>
          <a href={rightBtnLink} className="cta-btn secondary">
            {rightBtnText}
          </a>
        </div>
      </div>
    </section>
  );
}
