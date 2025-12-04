// BrandMeHero.jsx (GPA Calculator App hero with glass panel)
import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function BrandMeHero({
  id = "gpa-hero",
  bgImage = "/assets/PortfolioMobileProjectDetails1BackgroundImage/astronomy.png",

  eyebrow = "Flutter & Dart Mobile Application",
  title = "GPA Calculator App",
  subtitle =
    "A cross-platform mobile app that helps students calculate their GPA instantly. Users can add modules, credits, and grades with a simple interface. The app runs smoothly on Android and iOS, supports offline use, and delivers a fast, clean user experience.",

  primaryBtn = "View Case Study",
  primaryLink = "/case-study/gpa-tracker",
  secondaryBtn = "See My Projects",
  secondaryLink = "https://github.com/WebDeveloper1299",
}) {
  const bgRef = useRef(null);

  // Parallax zoom
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

        const scale = 1.05 + eased * 0.12;
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

  // Reveal on enter
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
    <section className="fs-hero" id={id}>
      {/* Background */}
      <div
        className="fs-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="fs-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="fs-inner">
        <header className="fs-head fs-no-blur">
          {/* Glass Panel */}
          <div className="fs-glass" data-reveal>
            <p className="fs-eyebrow">
              <span>{eyebrow}</span>
            </p>

            {/* h1 uses GLOBAL gradient + this layout spacing */}
            <h1 className="fs-title title-aurora">{title}</h1>

            <p className="fs-sub">
              <span>{subtitle}</span>
            </p>

            <div className="fs-ctas">
              <a className="fs-btn" href={primaryLink}>
                {primaryBtn}
              </a>
              <a
                className="fs-btn ghost"
                href={secondaryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryBtn}
              </a>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
