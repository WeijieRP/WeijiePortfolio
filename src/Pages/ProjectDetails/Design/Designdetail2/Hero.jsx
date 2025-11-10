// BrandMeHero.jsx
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "design",
  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/javier-miranda-fSLGThEmY2Y-unsplash.jpg",

  // ✅ Simple, human copy
  eyebrow = "BrandMe — my design work",
  title = "I build clean, friendly visuals.",
  subtitle =
    "I design posters, character art, simple page layouts and social posts. I keep the look soft-glow, clear type, and roomy spacing so everything feels modern and easy to read.",

  // CTA
  primaryBtn = "See my work",
  primaryLink = "#portfolio",
  secondaryBtn = "See how I design",
  secondaryLink = "#process",
}) {
  const bgRef = useRef(null);

  // Parallax zoom + drift (keeps edges covered)
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
        const eased = p * (2 - p);      // easeOutQuad
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

  // Simple reveal on enter
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
    <section className="bm-hero" id={id}>
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="bm-hero-overlay" />

      <div className="bm-hero-inner">
        <header className="bm-head">
          <p className="bm-eyebrow" data-reveal>
            <span>{eyebrow}</span>
          </p>

          <h1 className="bm-title" data-reveal>
            <span>{title}</span>
          </h1>

          <p className="bm-sub" data-reveal>
            <span>{subtitle}</span>
          </p>

          <div className="bm-ctas" data-reveal>
            <a className="bm-btn" href={primaryLink}>
              {primaryBtn}
            </a>
            <a className="bm-btn ghost" href={secondaryLink}>
              {secondaryBtn}
            </a>
          </div>
        </header>
      </div>
    </section>
  );
}
