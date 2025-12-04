// ReflectionLearning.jsx
import React, { useEffect, useRef } from "react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning",
  title = "What I learned from the Poster, EDM, and Character Design",
  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/aron-visuals-LdWZEIyWZAE-unsplash.jpg",
}) {
  const rootRef = useRef(null);

  const winsIntro =
    "The set feels like one family. The poster, EDM, and character pieces share the same colour mood, type rhythm, and spacing, so everything reads as a single campaign.";

  const wins = [
    "Poster: a clear headline → short support line → CTA; the glow/overlay helped the type pop without crushing the photo.",
    "EDM: simple repeatable modules (hero, package rows, CTA) made it easy to scan and adjust for mobile.",
    "Character design: kept a friendly base shape and consistent eyes/mouth so expressions stay readable at small sizes.",
    "Colour: the warm orange–cream palette links all assets; subtle vignettes add depth without muddying the image.",
    "Production: a tidy export flow (sizes, naming, compression) kept rework low when versions changed.",
  ];

  const challengesIntro =
    "Not everything clicked on the first try. These were the rough spots and how I solved them:";

  const challenges = [
    "Poster text on busy backgrounds—solved with gentle dark overlays (about 10–15%) and careful placement in calm areas.",
    "EDM image weight—balanced sharpness and file size by exporting hero at a fixed width and compressing supporting images.",
    "Character proportions—early sketches looked stiff; rounding joints and exaggerating silhouettes improved personality.",
    "Icon tidying—AI drafts were noisy; re-built key icons in Illustrator on a 24px grid for crisp results.",
    "Time juggling—locked a small design system (type sizes, spacing, corner radius) first to speed up all later decisions.",
  ];

  const learnings = [
    "Hierarchy first: headline, short support, then a clear action. It works for posters and emails alike.",
    "Re-use beats re-invent: one card module in the EDM covered multiple sections with only copy/icon changes.",
    "Contrast over chaos: light overlays and warm grading lift mood while keeping text readable.",
    "Vectors matter: redrawing AI icons in Illustrator saved more time than endless cleaning.",
    "Small character rules (eye size, mouth height, stroke weight) keep expressions consistent across poses.",
    "Export discipline: fixed widths and naming save hours when updating assets.",
  ];

  // ====== SCROLL REVEAL ======
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-reveal]");

    root
      .querySelectorAll(".rl-head [data-reveal-inner]")
      .forEach((el) => (el.dataset.dir = "up"));

    root
      .querySelectorAll(".rl-card")
      .forEach((el, i) => (el.dataset.dir = i % 2 ? "right" : "left"));

    root
      .querySelectorAll(".rl-learn")
      .forEach((el) => (el.dataset.dir = "up"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in", entry.isIntersecting);
          entry.target.classList.toggle("is-out", !entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => {
      el.classList.add("rln-reveal", "is-out");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="rl-stage" id={id} ref={rootRef}>
      <div className="rl-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="rl-overlay" />

      <div className="rl-shell">
        {/* HEADER */}
        <header className="rl-head" data-reveal data-reveal-inner>
          <div className="rl-hero-panel">
            <p className="rl-eyebrow">{eyebrow}</p>
            <h2 className="rl-title title-aurora">{title}</h2>
          </div>
        </header>

        {/* METRICS */}
        <ul className="rl-metrics" data-reveal>
          <li className="rl-metric">
            <span className="rl-metric-value">1</span>
            <span className="rl-metric-label">Poster</span>
          </li>
          <li className="rl-metric">
            <span className="rl-metric-value">1</span>
            <span className="rl-metric-label">EDM</span>
          </li>
          <li className="rl-metric">
            <span className="rl-metric-value">1</span>
            <span className="rl-metric-label">Character Set</span>
          </li>
          <li className="rl-metric">
            <span className="rl-metric-value">3</span>
            <span className="rl-metric-label">Breakpoints</span>
          </li>
        </ul>

        {/* GRID */}
        <div className="rl-grid">
          <div className="rl-card" data-reveal>
            <h3 className="rl-card-title">Wins</h3>
            <p className="rl-lead">{winsIntro}</p>
            <ul className="rl-bullets">
              {wins.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          <div className="rl-card" data-reveal>
            <h3 className="rl-card-title">Challenges</h3>
            <p className="rl-lead">{challengesIntro}</p>
            <ul className="rl-bullets">
              {challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEARNINGS */}
        <div className="rl-card rl-learn" data-reveal>
          <h3 className="rl-card-title">Key learnings</h3>
          <ul className="rl-bullets">
            {learnings.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
