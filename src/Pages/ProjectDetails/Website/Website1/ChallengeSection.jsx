// ChallengeSection.jsx
import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "challenge",
  bgImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/javier-miranda-bDFP8PxzW1Q-unsplash.jpg",

  eyebrow = "Music Tracker Playlist",
  title = "Basic Express Web App",
  description = `This task required building a basic Express web app without using a database. All data had to be stored in an in-memory array, which resets whenever the server restarts. The app needed to include pages to view items, add new ones, edit them, and delete them, using only GET and POST routes. The focus was on implementing clean routing, handling form submissions correctly, and ensuring simple, intuitive navigation between pages.`,
  problemImage = "/assets/CA2_Tracker.png",
}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  // Parallax & scroll-based scaling / translation
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const loop = () => {
      const el = rootRef.current;
      const vp = vpRef.current;
      if (el && vp) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);

        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.06;
        const ty = (p - 0.5) * 90;

        vp.style.setProperty("--scroll-scale", String(scale));
        vp.style.setProperty("--scroll-ty", `${ty}px`);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="ch-section" id={id} ref={rootRef}>
      <div className="ch-viewport" ref={vpRef}>
        {/* Background */}
        <div
          className="ch-bg kb-layer"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Foreground content */}
        <div className="ch-inner ch-left-aligned">
          {/* LEFT GLASS PANEL: eyebrow + title + description */}
          <div className="ch-card ch-card-text">
            <p className="ch-eyebrow">{eyebrow}</p>

            {/* h2 uses GLOBAL gradient via .title-aurora */}
            <h2 className="title-aurora ch-title">{title}</h2>

            <p className="ch-desc">{description}</p>
          </div>

          {/* RIGHT: plain image (NO glass) */}
          <div className="ch-right">
            <figure className="ch-card-media">
              <img
                src={problemImage}
                alt="Express app preview"
                className="ch-img"
              />
              <figcaption className="ch-cap">
                Express CA1 preview
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
