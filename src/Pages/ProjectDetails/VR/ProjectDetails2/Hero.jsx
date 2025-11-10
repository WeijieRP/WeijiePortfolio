// BrandMeHero.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "brandme-hero",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/boliviainteligente-4T8LEtOT2XM-unsplash.jpg",

  // Human, simple copy
  eyebrow = "VR Escape Room",
  title = "Escape Archive — A VR Puzzle Journey",
subtitle = "Step into a narrative-driven VR escape room built with multiple themed chambers, interactive puzzle mechanics, and atmospheric storytelling.",

  // CTA
  ctaHref = "#showcase",
  ctaLabel = "See more artwork & showcase",
}) {
  const bgRef = useRef(null);

  // Parallax zoom + drift
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const p = clamp(y / (vh * 2), 0, 1);
        const eased = p * (2 - p); // easeOutQuad
        const scale = 1.04 + eased * 0.12; // 1.04 → 1.16
        const ty = eased * 18;             // 0 → 18px

        el.style.setProperty("--bg-scale", String(scale));
        el.style.setProperty("--bg-ty", `${ty}px`);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal on enter
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.target.classList.toggle("is-shown", e.isIntersecting)
        );
      },
      { threshold: 0.06, rootMargin: "-20% 0px -20% 0px" }
    );
    els.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [id]);

  return (
    <section className="bm-hero" id={id} aria-label="VR Escape Room hero">
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="bm-hero-overlay" aria-hidden="true" />

      <div className="bm-hero-inner">
        <header className="bm-head">
          <p className="bm-eyebrow" data-reveal>
            <span className="float" style={{ animationDelay: "0ms" }}>
              {eyebrow}
            </span>
          </p>

          <h1 className="bm-title" data-reveal>
            <span className="float" style={{ animationDelay: "120ms" }}>
              {title}
            </span>
          </h1>

          <p className="bm-sub" data-reveal>
            <span className="float" style={{ animationDelay: "220ms" }}>
              {subtitle}
            </span>
          </p>


          <div className="bm-ctas float" data-reveal style={{ animationDelay: "520ms" }}>
            <a className="bm-btn" href={ctaHref}>
              {ctaLabel}
            </a>
          </div>
        </header>
      </div>
    </section>
  );
}
