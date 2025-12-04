// ChallengeSection.jsx
import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "portfolio",

  // Background (swap to your own /public asset)
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/antonio-rosales-9qFzvphbZFI-unsplash.jpg",

  // Copy
  eyebrow = "Brand Me",
  title = "BrandMe design challenge",
  summary =
    "Build your personal brand and use it to design a simple 4-page portfolio site. Make at least five original visuals, use AI tools properly, and share one social media post. Keep the style consistent and explain your design choices in an easy, clear way.",

  // Right figure (swap later)
  problemImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
  problemCaption =
    "Scope: brand system + 5 assets + AI proof + 4 pages + one social piece",
}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  // Parallax (only vertical drift, NO scale)
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

        const ty = (p - 0.5) * 60; // small vertical drift

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

  // Reveal / stagger
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const targets = el.querySelectorAll("[data-reveal]");

    if (reduce) {
      targets.forEach((t) => t.classList.add("is-shown"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-shown");
          else e.target.classList.remove("is-shown");
        }),
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.06 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="section-bg"
      id={id}
      ref={rootRef}
      aria-label="BrandMe design challenge"
    >
      <div className="ch-viewport" ref={vpRef}>
        {/* Full-bleed background (no blur, no scaling) */}
        <div
          className="ch-bg"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />
        <div className="ch-stars" aria-hidden="true" />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Centered content container */}
        <div className="ch-inner">
          <div className="ch-left">
            <div className="ch-hero-card" data-reveal="title">
              {eyebrow && <p className="ch-eyebrow">{eyebrow}</p>}

              {/* h2 uses global gradient from styles.css via .title-aurora if you add it */}
              <h2 className="ch-title">{title}</h2>

              <p className="ch-summary">{summary}</p>
            </div>
          </div>

          <aside className="ch-right">
            <figure className="ch-figure" data-reveal="figure">
              <img
                src={problemImage}
                alt="BrandMe deliverables overview"
                className="ch-img"
                loading="lazy"
              />
              <figcaption className="ch-cap">{problemCaption}</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
