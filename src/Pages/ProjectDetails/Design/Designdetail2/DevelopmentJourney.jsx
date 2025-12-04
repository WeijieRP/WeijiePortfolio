// DesignJourneyCarousel.jsx
import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function DesignJourneyCarousel({
  id = "design-journey",
  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/jack-taylor-oe8sIOWI9xY-unsplash.jpg",
  items = [
    {
      week: "Week 1",
      title: "Understanding the Project",
      badges: ["Planning", "Goals", "Direction"],
      tasks: [
        "Read through the Travelly brief to know what’s needed.",
        "Confirmed the main tasks: poster, email design, and Instagram grid.",
        "Decided the brand mood — warm, friendly, and travel-inspired.",
      ],
    },
    {
      week: "Week 1",
      title: "Inspiration & Moodboard",
      badges: ["Ideas", "Style", "Colours"],
      tasks: [
        "Looked at travel visuals, sunsets, clouds and cozy colours.",
        "Collected photos and textures that feel warm and dreamy.",
        "Built a moodboard to lock the style direction.",
      ],
    },
    {
      week: "Week 1–2",
      title: "Choosing Fonts & Style Rules",
      badges: ["Fonts", "Spacing", "Colours"],
      tasks: [
        "Chose fonts for headings and body text.",
        "Set simple spacing rules so everything feels organised.",
        "Picked a soft orange colour theme with gentle glows.",
      ],
    },
    {
      week: "Week 2",
      title: "Logo & Icon Design",
      badges: ["Logo", "Icons", "Brand Feel"],
      tasks: [
        "Sketched simple logo ideas.",
        "Made friendly icons with soft lines.",
        "Added sparkles and curved lines to feel like movement and travel.",
      ],
    },
    {
      week: "Week 2–3",
      title: "Hero Poster Design",
      badges: ["Main Poster", "Visual Story", "CTA"],
      tasks: [
        "Combined travel landmarks into one poster.",
        "Added warm glow and slight haze to give depth.",
        "Placed the main button clearly so it stands out.",
      ],
    },
    {
      week: "Week 3",
      title: "Instagram 3x3 Grid",
      badges: ["Social Media", "Grid", "Visual Flow"],
      tasks: [
        "Designed a 9-post Instagram grid.",
        "Mixed destination photos, quotes, and hero visual.",
        "Kept calls-to-action consistent and easy to notice.",
      ],
    },
    {
      week: "Week 3",
      title: "Email Campaign (EDM)",
      badges: ["Email", "Layout", "CTA"],
      tasks: [
        "Built the email layout from top to bottom — hero first, offers, then CTA.",
        "Kept wording short and easy to read.",
        "Added QR code and checked everything aligns nicely.",
      ],
    },
    {
      week: "Week 3–4",
      title: "Final Clean-Up & Polish",
      badges: ["Refine", "Spacing", "Export"],
      tasks: [
        "Adjusted spacing so everything feels neat.",
        "Softened shadows and button glow for warmth.",
        "Exported all files cleanly and in good quality.",
      ],
    },
    {
      week: "Week 4",
      title: "Mascot & Extras",
      badges: ["Character", "Fun", "Brand Personality"],
      tasks: [
        "Drew a cute travel mascot idea.",
        "Played with shapes and facial expressions.",
        "Added soft glow highlights so it matches the brand look.",
      ],
    },
    {
      week: "Week 4",
      title: "Final Submission",
      badges: ["Submit", "Mockups", "Review"],
      tasks: [
        "Organised all final files into folders.",
        "Placed designs into mockups for presentation.",
        "Did final checks and submitted the work.",
      ],
    },
  ],
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  // Slide animation
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag / Swipe
  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDown = useRef(false);

  const onPointerDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    deltaX.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDown.current || !trackRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? startX.current;
    deltaX.current = x - startX.current;
    trackRef.current.style.transition = "none";
    const base = -index * 100;
    const percentShift = (deltaX.current / trackRef.current.clientWidth) * 100;
    trackRef.current.style.transform = `translateX(calc(${base}% + ${percentShift}%))`;
  };

  const onPointerUp = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = "";
    isDown.current = false;
    const threshold = trackRef.current.clientWidth * 0.12;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    else goTo(index);
  };

  return (
    <section className="tf-stage" id={id} aria-label="Design journey timeline">
      <div
        className="tf-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div className="tf-container">
        {/* ✅ Panel: uses global gradient title + warm subtitle */}
        <div className="tf-hero-panel">
          <h2 className="tf-title title-aurora">
            Design Journey From Concept to Launch
          </h2>
          <p className="tf-sub">
            A week-by-week view of how the brand and campaign came together.
          </p>
        </div>

        <div
          className="tf-viewport"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article
                className="tf-card"
                key={i}
                role="group"
                aria-roledescription="slide"
              >
                <header className="tf-head">
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges">
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>
                      {b}
                    </li>
                  ))}
                </ul>

                <ul className="tf-list">
                  {w.tasks.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="tf-controls">
          <button
            className="tf-btn"
            onClick={prev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <div className="tf-dots" role="tablist" aria-label="Slide dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tf-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
          <button className="tf-btn" onClick={next} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
