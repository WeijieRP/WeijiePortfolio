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
    let raf;
    const animate = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - Math.abs(rect.top / vh);
      const scale = 1 + p * 0.06; // zoom intensity
      const ty = p * -20;
      el.style.setProperty("--bg-scale", scale);
      el.style.setProperty("--bg-ty", `${ty}px`);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal slide-in
  useEffect(() => {
    const elems = sectionRef.current.querySelectorAll(".cta-title, .cta-sub, .cta-buttons a");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
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
          <span>{titleTop}</span><br />
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
