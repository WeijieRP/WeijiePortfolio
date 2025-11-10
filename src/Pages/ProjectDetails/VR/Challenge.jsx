// ChallengeSection.jsx — problem-statement (3 short paragraphs)
import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "portfolio",

  // Background (swap to your own /public asset)
  bgImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/artyns-SF48tVdlyts-unsplash.jpg",

  // 🧩 Problem statement (simple English, balanced into 3 short paragraphs)
  eyebrow = "The challenge",
  title   = "Make a normal business card that works as an AR marker",
  summary = [
    "The card should look like a premium, professional print piece. Clean layout, clear text, and brand style—no techy look.",
    "At the same time, the artwork needs enough visual features and contrast so phones can detect it quickly and keep the 3D anchor stable, even in mixed lighting or when the card moves.",
    "Avoid noisy textures, keep small text readable, and maintain brand consistency across print and AR. Success = fast detection, minimal jitter, and a card that still looks great in hand."
  ],

  // Right figure
  problemImage   = "/assets/VR_ArtWork/Back.png",
  problemCaption = "Constraints: print clarity + AR feature density + fast detection + stable anchor."
}) {
  const rootRef = useRef(null);
  const vpRef   = useRef(null);

  // Parallax + subtle zoom on bg/stars (kept as-is)
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const loop = () => {
      const el = rootRef.current;
      const vp = vpRef.current;
      if (el && vp) {
        const r  = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1.0 + (1 - d) * 0.06;
        const ty    = (p - 0.5) * 90;

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

  // Reveal/stagger — toggles .is-shown for slide in/out
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
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

  // Helper to render 1 or many paragraphs without changing your CSS
  const renderSummary = (s) => {
    if (Array.isArray(s)) {
      return s.map((para, i) => (
        <p className="ch-summary" key={i} data-reveal="title">
          {para}
        </p>
      ));
    }
    return <p className="ch-summary" data-reveal="title">{s}</p>;
  };

  return (
    <section className="section-bg" id={id} ref={rootRef} aria-label="AR Name Card Problem Statement">
      <div className="ch-viewport" ref={vpRef}>
        {/* Full-bleed background */}
        <div
          className="ch-bg kb-layer"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />
        <div className="ch-stars" aria-hidden="true" />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Centered content container */}
        <div className="ch-inner">
          <div className="ch-left">
            {/* Glass hero card with title + summary */}
            <div className="ch-hero-card" data-reveal="title">
              {eyebrow && <p className="ch-eyebrow">{eyebrow}</p>}
              <h2 className="ch-title">{title}</h2>
              {renderSummary(summary)}
            </div>
          </div>

          <aside className="ch-right">
            <figure className="ch-figure" data-reveal="figure">
              <img
                src={problemImage}
                alt="Business card used as AR image target (needs print clarity and AR features)"
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
