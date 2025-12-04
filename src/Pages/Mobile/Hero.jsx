// PortfolioHeroMobile.jsx
import React, { useEffect, useRef, useMemo } from "react";
import "./hero.css";

/** Split into words so each can float with a stagger */
function HPFloatWords({ text, startDelay = 0 }) {
  const words = useMemo(() => (text || "").trim().split(/\s+/), [text]);

  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="hp-float-word"
          style={{
            "--hp-delay": `${startDelay + i * 90}ms`,
            "--hp-time": `${2300 + (i % 3) * 300}ms`,
            "--hp-amp": `${6 + (i % 2) * 2}px`,
          }}
        >
          {w}
        </span>
      ))}
    </>
  );
}

export default function PortfolioHeroMobile({
  id = "portfolio-hero",
  // You can swap this to /assets/PortfolioMobileBackgroundImage/xxx.jpg
  bgImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80",
  titleTop = "MOBILE APP",
  titleBottom = "DEVELOPMENT",
  subtitle = "Cross-platform, Flutter, clean UI, secure auth, fast APIs.",
  ctaText = "View Mobile Projects",
  ctaHref = "#projects",
}) {
  const rootRef = useRef(null);

  // Parallax + reactive zoom
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let prevY = window.scrollY || 0;
    let vel = 0;

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const frame = () => {
      const rect = el.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);

      const p = clamp(1 - Math.abs(rect.top / vh), 0, 1);

      const y = window.scrollY || 0;
      const dy = y - prevY;
      prevY = y;
      vel = lerp(vel, dy, 0.12);

      const base = 1 + p * 0.12;
      const pulse = clamp(vel * 0.0008, -0.04, 0.04);
      const scale = (base + pulse).toFixed(3);

      const bgTy = (p * 24).toFixed(1);
      const stackTy = (p * -8).toFixed(1);

      el.style.setProperty("--hp-bg-scale", scale);
      el.style.setProperty("--hp-bg-ty", `${bgTy}px`);
      el.style.setProperty("--hp-stack-ty", `${stackTy}px`);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal on enter
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-hp-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-shown", e.isIntersecting)
        ),
      { threshold: 0.18 }
    );

    targets.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="hp-hero" id={id} ref={rootRef}>
      <div
        className="hp-hero__bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Soft cinematic overlay */}
      <div className="hp-hero__shade" aria-hidden="true">
        <div className="hp-hero__overlay" />
      </div>

      <div className="hp-hero__content">
        <div className="hp-hero__stack" data-hp-reveal>
          <h1 className="hp-title">
            <span className="hp-title-line">
              <HPFloatWords text={titleTop} />
            </span>
            <span className="hp-title-line">
              <HPFloatWords text={titleBottom} startDelay={180} />
            </span>
          </h1>

          <p className="hp-sub">{subtitle}</p>

          <a href={ctaHref} className="hp-btn">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
