// BrandMeHero.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "brandme-hero",
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/boliviainteligente-vZg_skZOWIU-unsplash.jpg",

  eyebrow = "BrandMe – Visual Identity Portfolio",
  title = "My Personal Brand Identity Website",
  subtitle = "A 4-page responsive portfolio that reflects my design personality — Home, About, Portfolio, and Contact. Each page follows my unique color palette, typography, and layout, built to express creativity and professionalism.",

  primaryBtn = "View Portfolio",
  primaryLink = "#portfolio",
  secondaryBtn = "See Design Process",
  secondaryLink = "#process",
}) {
  const bgRef = useRef(null);

  // Parallax
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

        const scale = 1.04 + eased * 0.12;
        const ty = eased * 18;

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

  // Reveal
  useEffect(() => {
    const section = document.getElementById(id);
    const targets = section?.querySelectorAll("[data-reveal]");
    if (!targets?.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-shown", e.isIntersecting)
        ),
      { threshold: 0.06, rootMargin: "-20% 0px -20% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [id]);

  return (
    <section className="bm-hero" id={id} aria-label="BrandMe hero">
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="bm-hero-overlay" aria-hidden="true" />

      <div className="bm-hero-inner bm-no-blur">
        <header className="bm-head bm-no-blur">
          {/* Glass panel wraps everything */}
          <div className="bm-glass" data-reveal>
            <p className="bm-eyebrow">{eyebrow}</p>

            {/* Global gradient via .title-aurora */}
            <h1 className="bm-title title-aurora">{title}</h1>

            <p className="bm-sub">{subtitle}</p>

            <div className="bm-ctas" role="group" aria-label="Hero actions">
              <a className="bm-btn" href={primaryLink}>
                {primaryBtn}
              </a>
              <a className="bm-btn ghost" href={secondaryLink}>
                {secondaryBtn}
              </a>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
