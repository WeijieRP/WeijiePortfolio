// BrandMeHero.jsx — AR Name Card hero (one glass panel, two buttons)
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "brandme-hero",
  bgImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/abolfazl-sorkhi-O02Cd1-_4LU-unsplash.jpg",

  eyebrow = "Immersive Technologies",
  title = "AR Name Card Interactive Identity",
  subtitle =
    "A professional business card that reveals a 3D layer through AR, built with Unity and Vuforia. The digital scene locks to the printed card and moves naturally with it.",
}) {
  const bgRef = useRef(null);

  // Parallax background motion
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let raf = 0;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const p = clamp(y / (vh * 2), 0, 1);
        const eased = p * (2 - p); // easeOutQuad

        const scale = 1.04 + eased * 0.12; // 1.04 → 1.16
        const ty = eased * 18; // 0 → 18px

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

  // Reveal animation (panel)
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
    <section className="bm-hero" id={id} aria-label="AR Name Card hero">
      {/* Background image */}
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="bm-hero-overlay" aria-hidden="true" />

      <div className="bm-hero-inner">
        <header className="bm-head">
          {/* ✅ Single glass-like panel wrapping eyebrow, title, subtitle, and both CTAs */}
          <div className="bm-hero-panel" data-reveal>
            <p className="bm-eyebrow">
              <span>{eyebrow}</span>
            </p>

            <h1 className="bm-title title-aurora">
              <span>{title}</span>
            </h1>

            <p className="bm-sub">
              <span>{subtitle}</span>
            </p>

            <div className="bm-ctas">
              <a className="bm-btn" href="#process">
                View Project
              </a>
              <a
                className="bm-btn bm-btn-secondary"
                href="https://github.com/WebDeveloper1299"
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
              </a>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
