// EscapeJourneyCarousel.jsx
import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function EscapeJourneyCarousel({
  id = "escape-journey",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/mirella-callage-GQSCgwomFhk-unsplash.jpg",
  items = [
    {
      week: "Week 5",
      title: "Design Document & Project Setup",
      badges: ["GDD", "Scope", "Planning"],
      tasks: [
        "Wrote the Game Design Document covering the concept and emotional arc.",
        "Defined the six-room flow and progression logic.",
        "Set XR input, comfort guidelines, and performance targets for Quest.",
      ],
    },
    {
      week: "Week 6",
      title: "Storyboards & Puzzle Flow",
      badges: ["Flowchart", "Narrative", "Puzzles"],
      tasks: [
        "Outlined the emotional sequence: Entrance → Curiosity → Doubt → Fear → Acceptance → Exit.",
        "Sketched room layouts and player task logic.",
        "Specified puzzle goals, feedback states, and failure handling.",
      ],
    },
    {
      week: "Week 7",
      title: "Environment Blockout",
      badges: ["Scene Layout", "Lighting", "Visual Mood"],
      tasks: [
        "Built blockouts for the Entrance and Rooms 1–3.",
        "Checked scale, navigation, and sightlines.",
        "Established the ‘archive’ mood with dust and light haze.",
      ],
    },
    {
      week: "Week 8–9",
      title: "Art Pass & Room Completion",
      badges: ["Models", "Materials", "FX"],
      tasks: [
        "Finished remaining rooms and dressed them with textured props.",
        "Improved lighting clarity and depth.",
        "Added subtle FX and environmental particles.",
      ],
    },
    {
      week: "Week 9",
      title: "Puzzle Logic & XR Interactions",
      badges: ["XR Toolkit", "Interaction", "Feedback"],
      tasks: [
        "Implemented hand interactions with XR Toolkit.",
        "Curiosity puzzle: symbol and colour reveal.",
        "Doubt puzzle: emotion–colour matching.",
      ],
    },
    {
      week: "Week 10",
      title: "Sequencing & Memory Loop",
      badges: ["State Machine", "Events", "Narrative Beats"],
      tasks: [
        "Built memory-loop checks for the Fear room.",
        "Added voice cues and light animations.",
        "Linked emotional triggers to progression.",
      ],
    },
    {
      week: "Week 11",
      title: "Testing & Performance Polish",
      badges: ["QA", "Comfort", "Optimisation"],
      tasks: [
        "Play-tested for clarity, comfort, and pacing.",
        "Refined teleport and comfort settings.",
        "Optimised textures, shadows, and batching.",
      ],
    },
    {
      week: "Final",
      title: "Exit Room & Final Build",
      badges: ["Narrative", "Final Polish", "Release"],
      tasks: [
        "Added open sky, grass, and drifting leaves for emotional release.",
        "Recorded the final narration for calm closure.",
        "Built and exported the vertical slice for showcase.",
      ],
    },
  ],
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <section
      className="tf-stage"
      id={id}
      /* set CSS var + hard fallback background directly */
      style={{
        ["--tf-bg"]: `url("${bgImage}")`,
        backgroundImage: `url("${bgImage}")`,
      }}
      aria-label="Escape Archive VR — Journey & Milestones"
    >
      <div className="tf-container">
        <h2 className="tf-title">Escape Archive VR — Journey & Milestones</h2>
        <p className="tf-sub">A calm, room-by-room progression from concept to the open sky.</p>

        <div
          className="tf-viewport"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="region"
          aria-roledescription="carousel"
          aria-label="Development timeline slides"
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article
                className="tf-card"
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${w.week}: ${w.title}`}
              >
                <header className="tf-head">
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges">
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>{b}</li>
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
          <button className="tf-btn" onClick={prev} aria-label="Previous slide">←</button>
          <div className="tf-dots" role="tablist" aria-label="Slide navigation">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tf-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-selected={i === index}
                role="tab"
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="tf-btn" onClick={next} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  );
}
