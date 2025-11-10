import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ProblemVisual({
  id = "problem-visual",

  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/philipp-hubert-lqK2ROfPfyQ-unsplash.jpg",
  image = "/assets/24014045_6866503.jpg",
  imageAlt = "Illustration of the problem context",
  imageCaption = "Clear story + clean hierarchy help messages land fast.",
  eyebrow = "Problem Insight",
  title = "Making ideas easier for people to understand",
  description =
    "We only get a moment to catch attention. When layouts are cluttered or feel flat, the message gets lost. The goal here is to turn ideas into clear, engaging visuals that people grasp quickly — and care enough to stay."
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const targets = root.querySelectorAll(".pv-reveal");
    if (prefersReduced) {
      targets.forEach(el => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            e.target.classList.remove("is-out");
          } else {
            e.target.classList.add("is-out");
            e.target.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="pv-stage" id={id} aria-label="Problem insight with illustration" ref={rootRef}>
      <div className="pv-bg" style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true" />
      <div className="pv-overlay" aria-hidden="true" />

      <div className="pv-inner">
        <div
          className="pv-card pv-reveal pv-slide-left"
          role="group"
          aria-labelledby={`${id}-title`}
          style={{ ["--pv-delay"]: "80ms" }}
        >
          <p className="pv-eyebrow">{eyebrow}</p>
          <h1 className="pv-title" id={`${id}-title`}>{title}</h1>
          <p className="pv-desc">{description}</p>
        </div>

        <figure className="pv-figure pv-reveal pv-slide-right" style={{ ["--pv-delay"]: "160ms" }}>
          <img
            className="pv-image"
            src={image}
            alt={imageAlt}
            width={1280}
            height={960}
            loading="eager"
          />
          {imageCaption && <figcaption className="pv-cap">{imageCaption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
