// GitHubCTA.jsx
import React, { useEffect, useRef } from "react";
import "./github-cta.css";
import { Link } from "react-router-dom";

export default function GitHubCTA({
  id = "github-cta",
  bgImage = "/assets/PortfolioBackgroundImage/heaven.png",

  titleTop = "Let’s collaborate on future projects",
  subtitle = "I’m always open to exciting new ideas and creative partnerships. Check out my GitHub or reach out to start something!",

  leftBtnText = "View GitHub",
  leftBtnLink = "https://github.com/WebDeveloper1299",
  rightBtnText = "Contact Me",
  rightBtnLink = "/contact",
}) {
  const ref = useRef(null);

  // ===== Set background image via CSS var + img fallback =====
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--gh-cta-bg", `url("${bgImage}")`);
    const img = el.querySelector(".gh-cta-bg-img");
    if (img) img.src = bgImage;
  }, [bgImage]);

  // ===== Parallax background =====
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, 1 - Math.abs(rect.top / vh)); // 0..1

      const scale = 1 + p * 0.06;
      const ty = -20 * p;

      el.style.setProperty("--gh-bg-scale", scale.toString());
      el.style.setProperty("--gh-bg-ty", `${ty}px`);

      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ===== Reveal animations =====
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(
      ".gh-cta-title, .gh-cta-sub, .gh-cta-btn"
    );

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("gh-visible", entry.isIntersecting);
        }),
      { threshold: 0.2 }
    );

    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section className="gh-cta-section" id={id} ref={ref}>
      {/* Background + ambient */}
      <div className="gh-cta-bg" aria-hidden="true" />
      <img className="gh-cta-bg-img" alt="" aria-hidden="true" />
      <div className="gh-cta-ambient" aria-hidden="true" />
      <div className="gh-cta-overlay" aria-hidden="true" />

      {/* Sparkles */}
      <div className="gh-cta-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* ONE glass panel with all content */}
      <div className="gh-cta-content">
        <h2 className="gh-cta-title title-aurora">{titleTop}</h2>

        <p className="gh-cta-sub section-subtitle">{subtitle}</p>

        <div className="gh-cta-buttons">
          <a
            href={leftBtnLink}
            target="_blank"
            rel="noreferrer"
            className="gh-cta-btn gh-primary"
          >
            {leftBtnText}
          </a>

          <Link to={rightBtnLink} className="gh-cta-btn gh-secondary">
            {rightBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
