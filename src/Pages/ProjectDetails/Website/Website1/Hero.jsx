import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function PortfolioHero({
  id = "hero",
  bgImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/johnny-kaufman-rVJ9P6KtX_I-unsplash.jpg",

  title = "Music Tracker Playlists",
  subtitle = "I built this app to make it easy to add songs, tag moods/genres, track listening, and manage playlists in one place.",

  primaryBtn = "View Live Demo",
  primaryLink = "https://musictracker-568127751634.asia-southeast1.run.app/",
  secondaryBtn = "View GitHub Repo",
  secondaryLink = "https://github.com/WebDeveloper1299",
}) {
  const bgRef = useRef(null);

  /* -------- Parallax BG -------- */
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

        const scale = 1.04 + eased * 0.08;
        const ty = eased * 12;

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

  /* -------- Reveal Animation -------- */
  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;

    const targets = section.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

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
        aria-hidden="true"
      />

      <div className="bm-hero-inner">
        <header className="bm-head">
          {/* Glass panel wraps title + subtitle + CTAs */}
          <div className="bm-panel" data-reveal>
            <h1 className="bm-title">{title}</h1>
            <p className="bm-sub">{subtitle}</p>

            <div className="bm-ctas">
              <a
                className="bm-btn"
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
              >
                {primaryBtn}
              </a>
              <a
                className="bm-btn ghost"
                href={secondaryLink}
                target="_blank"
                rel="noreferrer"
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
