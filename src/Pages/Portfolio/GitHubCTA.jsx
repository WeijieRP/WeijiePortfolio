// GitHubCTA.jsx
import React, { useEffect, useRef } from "react";
import "./github-cta.css";
import { Link } from "react-router-dom";

export default function GitHubCTA({
  id = "project-cta",
  bgImage = "/assets/PortfolioBackgroundImage/heaven.png",

  // 🔹 Updated text content
  titleTop = "Let’s collaborate on future projects",
  subtitle = "I’m always open to exciting new ideas and creative partnerships. Check out my GitHub repositories or reach out to start something together!",

  // 🔹 Updated buttons
  leftBtnText = "View GitHub",
  leftBtnLink = "https://github.com/WebDeveloper1299", // external link
  rightBtnText = "Contact Me",
  rightBtnLink = "/contact",
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

  // Reveal animation (same)
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
      {/* Background */}
      <div className="cta-bg" aria-hidden="true" />
      <img className="cta-bg-img" alt="" aria-hidden="true" />

      {/* Ambient Effects */}
      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
      </div>

      {/* Content */}
      <div className="cta-content">
        <h2 className="cta-title">
          <span>{titleTop}</span>
        </h2>

        <p className="cta-sub">{subtitle}</p>

        <div className="cta-buttons">
          {/* GitHub external */}
          <a
            href={leftBtnLink}
            target="_blank"
            rel="noreferrer"
            className="cta-btn primary"
          >
            {leftBtnText}
          </a>

          {/* Contact internal */}
          <Link to={rightBtnLink} className="cta-btn secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
