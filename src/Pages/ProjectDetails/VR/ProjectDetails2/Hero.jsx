// BrandMeHero.jsx — Glass panel wraps eyebrow + title + subtitle + CTA
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "brandme-hero",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/boliviainteligente-4T8LEtOT2XM-unsplash.jpg",

  eyebrow = "VR Escape Room",
  title = "Escape Archive — A VR Puzzle Journey",
  subtitle = "Step into a narrative-driven VR escape room built with multiple themed chambers, interactive puzzle mechanics, and atmospheric storytelling.",

  ctaHref = "#showcase",
  ctaLabel = "See more artwork & showcase",
}) {
  const bgRef = useRef(null);

  // BG parallax
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
        const eased = p * (2 - p);

        el.style.setProperty("--bg-scale", 1.05 + eased * 0.10);
        el.style.setProperty("--bg-ty", `${eased * 18}px`);

        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal
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
      { threshold: 0.1 }
    );

    els.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [id]);

  return (
    <section className="bm-hero" id={id}>
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="bm-hero-inner">
        <header className="bm-head">

          {/* 🔶 ONE GLASS PANEL FOR EVERYTHING */}
          <div className="bm-glass" data-reveal>
            <p className="bm-eyebrow">{eyebrow}</p>

            <h1 className="bm-title">{title}</h1>

            <p className="bm-sub">{subtitle}</p>

            <div className="bm-ctas">
              <a className="bm-btn" href={ctaHref}>
                {ctaLabel}
              </a>
            </div>
          </div>

        </header>
      </div>
    </section>
  );
}
