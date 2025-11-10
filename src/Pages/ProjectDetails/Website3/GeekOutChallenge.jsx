// ChallengeSection.jsx
import React, { useEffect, useMemo, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "challenge",

  // Full-bleed background
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/vadim-sadovski-E0zX8nq-w9A-unsplash.jpg",

  // Content
  eyebrow = "Geekout 2025 — Problem & Insights",
  title = "Help students choose with confidence (not confusion)",
  summary =
    "Students feel lost between brochures, ads, and scattered reviews. Project Foresight turns choice overload into a guided journey: quick quiz, concise course pages, authentic reviews, mentors and hands-on events. The goal is clarity in under five minutes.",

  // Right figure
  problemImage = "/assets/42076848_8861625.jpg",

}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  // Parallax + subtle zoom on bg/stars
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const loop = () => {
      const el = rootRef.current;
      const vp = vpRef.current;
      if (el && vp) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.06; // 1 → 1.06
        const ty = (p - 0.5) * 90;        // -45 → +45

        vp.style.setProperty("--scroll-scale", scale.toFixed(3));
        vp.style.setProperty("--scroll-ty", `${ty.toFixed(1)}px`);
        vp.style.setProperty("--stars-tx", `${(-10 + 20 * p).toFixed(1)}px`);
        vp.style.setProperty("--stars-ty", `${(6 - 12 * p).toFixed(1)}px`);
        vp.style.setProperty("--stars-rot", `${(-1 + 2 * p).toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal/stagger (slides IN on enter, OUT on exit)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          e.target.classList.toggle("is-shown", e.isIntersecting);
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);


  return (
    <section className="section-bg" id={id} ref={rootRef} aria-label="Challenge & Insights">
      <div className="ch-viewport" ref={vpRef}>
        {/* Full-bleed background */}
        <div
          className="ch-bg kb-layer"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />
        <div className="ch-stars" aria-hidden="true" />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Centered content */}
        <div className="ch-inner">
          {/* LEFT — Glass hero card (title + description) */}
          <div className="ch-col">
            <div className="ch-hero-card" data-reveal data-dir="left">
              {eyebrow && <p className="ch-eyebrow">{eyebrow}</p>}
              <h2 className="ch-title">{title}</h2>
              <p className="ch-summary">{summary}</p>
            </div>

            {/* Insights (chips removed) */}
          </div>

          {/* RIGHT — Image panel that balances height */}
          <aside className="ch-col">
            <figure className="ch-figure ch-figure--fill" data-reveal data-dir="right">
              <div className="ch-media">
                <img
                  src={problemImage}
                  alt="Prospect journey pain points and insight highlights"
                  className="ch-img"
                  loading="lazy"
                />
              </div>
              <figcaption className="ch-cap">
                Problem context — why a guided choice flow works
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
