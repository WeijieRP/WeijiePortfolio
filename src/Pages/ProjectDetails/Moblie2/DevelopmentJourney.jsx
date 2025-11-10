import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function DesignJourneyCarousel({
  id = "gpa-journey",
  bgImage = "/assets/PortfolioMoblieProjectDetail2BackgroundImage/universe.png",
  items = [
    {
      week: "Week 1",
      title: "Set the Goal",
      badges: ["Planning", "Research", "Setup"],
      tasks: [
        "Decided to build a Calorie & Exercise Tracker with Flutter + Dart.",
        "Wrote the main problem: log meals fast, see calories left, add workouts easily.",
        "Created the Flutter project, set up folders and basic routes.",
      ],
    },
    {
      week: "Week 1",
      title: "Wireframes & Flow",
      badges: ["UI Design", "Figma", "Layout"],
      tasks: [
        "Sketched the Home: daily calories left + quick add buttons.",
        "Designed simple forms for adding meals and exercises.",
        "Mapped flow: Home → Add Meal → Add Exercise → Progress.",
      ],
    },
    {
      week: "Week 2",
      title: "Build Core Screens",
      badges: ["Flutter", "Dart", "UI Coding"],
      tasks: [
        "Built Home to show today’s calories and quick shortcuts.",
        "Coded Add Meal: food name, calories, portion, time.",
        "Coded Add Exercise: type, duration, calories burned.",
      ],
    },
    {
      week: "Week 2",
      title: "Calorie Logic & State",
      badges: ["Logic", "State", "Testing"],
      tasks: [
        "Added functions to compute intake, burn, and net calories.",
        "Hooked up state so totals update instantly on add/edit/delete.",
        "Tested empty inputs, big values, and edge edits.",
      ],
    },
    {
      week: "Week 2–3",
      title: "Theme & Readability",
      badges: ["Theme", "Typography", "Brand"],
      tasks: [
        "Picked clear fonts and high-contrast colors for quick reading.",
        "Added friendly icons for meals, snacks, and workouts.",
        "Kept spacing consistent for easy taps on small screens.",
      ],
    },
    {
      week: "Week 3",
      title: "Better Experience",
      badges: ["UX", "Interaction", "Feedback"],
      tasks: [
        "Small animations when totals change.",
        "Snackbars for save/delete with clear messages.",
        "Scaled layouts to work well on small and large devices.",
      ],
    },
    {
      week: "Week 3",
      title: "Works Without Internet (Offline-First)",
      badges: ["Offline", "Sync", "Local Storage"],
      tasks: [
        "Saved meals and exercises to local storage first (e.g.SQLite).",
        "If offline: app still shows totals and lets you add/edit items.",
        "When back online: queued changes auto-sync to the server.",
      ],
    },
    {
      week: "Week 3–4",
      title: "QA & Fixes",
      badges: ["QA", "Refinement", "Fixes"],
      tasks: [
        "Tested on emulator and a real Android phone.",
        "Fixed small overflows on tiny screens and very long names.",
        "Removed unused code and improved first-launch load time.",
      ],
    },
    {
      week: "Week 4",
      title: "UI Polish",
      badges: ["Refine", "Consistency", "Finishing Touch"],
      tasks: [
        "Balanced colors for light/dark and sharpened icon clarity.",
        "Smoothed transitions between screens.",
        "Rewrote labels/buttons with simple, clear language.",
      ],
    },
    {
      week: "Week 4",
      title: "Build & Showcase",
      badges: ["Build", "Demo", "Presentation"],
      tasks: [
        "Built the final APK for Android.",
        "Recorded a short demo of logging meals and viewing progress.",
        "Prepared a short deck to explain choices and key features.",
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
    <section className="tf-stage" id={id} aria-label="Development journey timeline">
      <div className="tf-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="tf-overlay" />

      <div className="tf-container">
        <h2 className="tf-title">How I Built the App</h2>
        <p className="tf-sub">
          A week-by-week view of planning, design, build, testing, and release for my Calorie & Exercise Tracker.
        </p>

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
              <article className="tf-card" key={i} role="group" aria-roledescription="slide">
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
          <button className="tf-btn" onClick={next} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  );
}
