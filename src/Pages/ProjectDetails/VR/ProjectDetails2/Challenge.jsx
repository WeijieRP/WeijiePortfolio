// ChallengeSection.jsx — aligned to global title + body styles
import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "challenge",

  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/harsh-kumar-HthS2lB05RE-unsplash.jpg",

  eyebrow = "The challenge",
  title = "Make a VR escape room that’s easy to play and fun to finish",
  summary = [
    "Players should know what to do within seconds. Controls must be obvious. Each puzzle shows clear hints, simple actions (grab, place, press), and quick feedback so they can see what changed.",
    "Puzzles follow a clear order and get a bit harder each time. No tiny hidden items, no confusing hotspots, and no movement that makes people dizzy. Grabbing, placing, and turning objects should feel steady and smooth.",
  ],

  problemImage = "/assets/Screenshot.png",
  problemCaption = "Goals: clear hints, comfy movement, steady performance.",
}) {
  const rootRef = useRef(null);

  // Observe [data-ani] and toggle .in-view for slide-in
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-ani]");
    els.forEach((el, i) => el.style.setProperty("--i", String(i))); // stagger index

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          } else {
            e.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const renderSummary = (s) =>
    Array.isArray(s) ? (
      s.map((p, i) => (
        <p
          key={i}
          className="ch-summary slide-left"
          data-ani
          data-side="left"
        >
          {p}
        </p>
      ))
    ) : (
      <p className="ch-summary slide-left" data-ani data-side="left">
        {s}
      </p>
    );

  return (
    <section
      className="ch-stage"
      id={id}
      ref={rootRef}
      aria-label="VR Escape Room Challenge"
    >
      {/* Background image */}
      <div
        className="ch-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div className="ch-inner">
        {/* LEFT: text card */}
        <div className="ch-left">
          <article
            className="ch-card slide-left"
            data-ani
            data-side="left"
            role="group"
            aria-label="Challenge statement"
          >
            {eyebrow && (
              <p className="ch-eyebrow slide-left" data-ani data-side="left">
                {eyebrow}
              </p>
            )}

            {/* h2 uses global aurora gradient + sizing */}
            <h2 className="ch-title slide-left" data-ani data-side="left">
              {title}
            </h2>

            {renderSummary(summary)}
          </article>
        </div>

        {/* RIGHT: figure */}
        <aside className="ch-right">
          <figure
            className="ch-figure slide-right"
            data-ani
            data-side="right"
          >
            <img
              src={problemImage}
              alt="VR Escape Room illustration"
              className="ch-img"
              loading="lazy"
              decoding="async"
            />
            <figcaption
              className="ch-cap slide-right"
              data-ani
              data-side="right"
            >
              {problemCaption}
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
