import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "portfolio",                               // ✅ keep same id & class names
  bgImage = "/assets/PortfolioMoblieProjectDetail2BackgroundImage/abhishek-mishra-9K_pFhTebBI-unsplash.jpg",         // ✅ unchanged style hook

  // ✅ Updated copy (Calorie & Exercise Tracker)
  eyebrow = "Calorie & Exercise Tracker",
  title   = "Problem & Challenge",
  summary =
    "Many people want to eat better and move more, but tracking everything is hard. Apps can feel confusing, slow, or packed with too many steps. Our challenge: make a simple mobile app where you can log meals fast, see your calories for the day, add exercises, and know how much you need to burn—without stress. It should be clean, quick, and work even when you’re offline.",

  // ✅ Visual (kept figure structure)
  problemImage   = "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1800&auto=format&fit=crop",
  problemCaption = "Goal: A fast, easy app to log food, track calories, add workouts, and see daily progress at a glance.",
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

  // Reveal/stagger — toggles .is-shown for slide in/out (kept as-is)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const targets = el.querySelectorAll("[data-reveal]");

    if (reduce) {
      targets.forEach(t => t.classList.add("is-shown"));
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
    <section className="section-bg" id={id} ref={rootRef} aria-label="Challenge">
      <div className="ch-viewport" ref={vpRef}>
        {/* Full-bleed background */}
        <div className="ch-bg kb-layer" style={{ backgroundImage: `url("${bgImage}")` }} aria-hidden="true" />
        <div className="ch-stars" aria-hidden="true" />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Centered content container */}
        <div className="ch-inner">
          <div className="ch-left">
            {/* Glass hero card with title + summary */}
            <div className="ch-hero-card" data-reveal="title">
              {eyebrow && <p className="ch-eyebrow">{eyebrow}</p>}
              <h2 className="ch-title">{title}</h2>
              <p className="ch-summary">{summary}</p>
            
            </div>
          </div>

          <aside className="ch-right">
            <figure className="ch-figure" data-reveal="figure">
              <img
                src={problemImage}
                alt="People tracking food and workouts simply on a phone"
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
