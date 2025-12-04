import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function DesignJourneyCarousel({
  id = "gpa-journey",
  bgImage = "/assets/PortfolioMobileProjectDetails1BackgroundImage/viktor-mindt-tEFU_w6_kMo-unsplash.jpg",
  items = [
    {
      week: "Week 1",
      title: "Defining the App Goal",
      badges: ["Planning", "Research", "Setup"],
      tasks: [
        "Planned to build a GPA Calculator App using Flutter and Dart.",
        "Identified what students need — quick GPA updates and easy input.",
        "Set up the main structure and project folder in Android Studio."
      ],
    },
    {
      week: "Week 1",
      title: "Designing Wireframes",
      badges: ["UI Design", "Figma", "Layout"],
      tasks: [
        "Created basic wireframes showing how users add grades and credits.",
        "Kept layouts simple with large buttons and clean spacing.",
        "Planned where to place GPA results and input sections."
      ],
    },
    {
      week: "Week 2",
      title: "Building Core Screens",
      badges: ["Flutter", "Dart", "UI Coding"],
      tasks: [
        "Built the Home Screen to display the current GPA instantly.",
        "Coded the Add Module page to input subjects, grades, and credits.",
        "Used Dart widgets to make navigation smooth and simple."
      ],
    },
    {
      week: "Week 2",
      title: "Adding GPA Calculation Logic",
      badges: ["Logic", "Formula", "Testing"],
      tasks: [
        "Wrote functions in Dart to calculate GPA automatically.",
        "Tested multiple input values to confirm accuracy.",
        "Ensured the results update in real time after each change."
      ],
    },
    {
      week: "Week 2–3",
      title: "Design and Theme Setup",
      badges: ["Theme", "Typography", "Brand"],
      tasks: [
        "Added soft gradients and clear text colors for readability.",
        "Chose fonts that feel friendly and easy to read.",
        "Used consistent icons and padding across all screens."
      ],
    },
    {
      week: "Week 3",
      title: "Enhancing User Experience",
      badges: ["UX", "Interaction", "Feedback"],
      tasks: [
        "Added simple animations when GPA updates.",
        "Used snackbars and dialogs to confirm when data is saved or cleared.",
        "Made sure all screens resize well on different phone sizes."
      ],
    },
    {
      week: "Week 3",
      title: "Offline Functionality",
      badges: ["Local Storage", "Testing", "Stability"],
      tasks: [
        "Added local storage so users can access their GPA without internet.",
        "Saved module data safely inside the app.",
        "Tested offline use and confirmed results still display correctly."
      ],
    },
    {
      week: "Week 3–4",
      title: "App Testing and Debugging",
      badges: ["QA", "Refinement", "Fixes"],
      tasks: [
        "Tested the app on both emulator and real Android device.",
        "Fixed layout alignment and text overflow issues.",
        "Improved loading time and cleaned up unused code."
      ],
    },
    {
      week: "Week 4",
      title: "Final UI Polish",
      badges: ["Refine", "Consistency", "Finishing Touch"],
      tasks: [
        "Refined the color palette for better contrast.",
        "Smoothed out transition animations between screens.",
        "Checked every button and label for consistency."
      ],
    },
    {
      week: "Week 4",
      title: "Deployment & Showcase",
      badges: ["Build", "Demo", "Presentation"],
      tasks: [
        "Built the final APK file for Android phones.",
        "Recorded a short demo video showing how the app works.",
        "Prepared a simple presentation explaining design choices and app features."
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
        <h2 className="">Development Journey — From Idea to Working App</h2>
        <p className="tf-sub">
          A week-by-week journey showing how I built, designed, tested, and launched my GPA Calculator mobile app.
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
