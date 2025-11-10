// ForesightJourneyCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import "./journey.css";

export default function ForesightJourneyCarousel({
  id = "foresight-journey",
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/anthony-cantin-4Xdi1MGpyOQ-unsplash.jpg",
  items = [
    {
      week: "Day 1",
      title: "Frame the problem & scope the MVP",
      badges: ["Personas", "Pain Points", "Journey Map", "Scope"],
      desc:
        "Identified blockers like survey fatigue, fragmented information, and limited mentor access. Defined two personas—an undecided student and a course mentor—then mapped the decision journey from discovery to decision. Locked the MVP to a quiz-led discovery with mentor and event hooks."
    },
    {
      week: "Day 1",
      title: "Design the flow & compose the UI",
      badges: ["Wireframes", "Figma", "Flows"],
      desc:
        "Sketched low-fi screens for the quiz, results, and course pages. Built Figma mockups with interest tags, a confidence meter, and a compare view. Planned empty states and loading patterns, and outlined a content model for one-screen course summaries with short alumni snippets."
    },
    {
      week: "Day 2",
      title: "Build the frontend interactions",
      badges: ["React", "State", "Transitions"],
      desc:
        "Implemented responsive layouts in React powered by a quiz state machine. Added smooth step transitions and animated result cards, plus a compare panel and shortlist saving. Ensured basic accessibility with clear focus order, ARIA roles/labels, and keyboard paths."
    },
    {
      week: "Day 2",
      title: "Implement the backend & seed realistic data",
      badges: ["Node/Express", "SQL Schema", "API"],
      desc:
        "Created Express endpoints for courses, reviews, and events. Drafted a SQL schema for courses, tags, mentors, and event slots, then seeded demo data to exercise filters. Wired fetch calls and added defensive UI for timeouts and intermittent API responses."
    },
    {
      week: "Day 2",
      title: "Validate the flows & prepare the demo",
      badges: ["User Test", "Refine", "Demo Video"],
      desc:
        "Ran quick peer tests to tune quiz weights and copy. Hardened edge cases such as empty queries, no matches, and slow networks. Polished visuals and microcopy, tightened the hero/CTA, recorded the final demo video, and packaged the submission."
    }
  ]
}) {
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  // slide movement
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // drag / swipe
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

  // direction-aware slide in/out on scroll
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-reveal]");

    const setVars = (el, fromX, fromY, toX, toY, fromScale = 0.96, toScale = 1) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.setProperty("--from-scale", String(fromScale));
      el.style.setProperty("--to-scale", String(toScale));
    };

    const enter = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left")  setVars(el, "-54px", "14px", "0px", "0px");
        else if (side === "right") setVars(el, "54px", "14px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      } else {
        if (side === "left")  setVars(el, "54px", "14px", "0px", "0px");
        else if (side === "right") setVars(el, "-54px", "14px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left")  setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left")  setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      }
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const dir = dirRef.current;
        entries.forEach((e) => {
          const el = e.target;
          const side = el.getAttribute("data-side") || "center";
          if (e.isIntersecting) enter(el, side, dir);
          else leave(el, side, dir);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 8) * 65}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="tf-stage" id={id} ref={rootRef} aria-label="Foresight development timeline">
      {/* Crisp background image (no overlay, no dimming) */}
      <div className="tf-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      {/* Overlay removed visually in CSS (display:none) */}
      <div className="tf-overlay" />

      <div className="tf-container">
        <h2 className="tf-title" data-reveal data-side="center" data-stagger>
          Foresight — Development Timeline
        </h2>
        <p className="tf-sub" data-reveal data-side="center" data-stagger>
          From ideation to working prototype in 48 hours
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
          data-reveal
          data-side="right"
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article
                className="tf-card"
                key={i}
                role="group"
                aria-roledescription="slide"
                data-reveal
                data-side={i % 2 ? "left" : "right"}
                data-stagger
              >
                <header className="tf-head" data-reveal data-side="center" data-stagger>
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges" data-reveal data-side={i % 2 ? "right" : "left"} data-stagger>
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>{b}</li>
                  ))}
                </ul>

                <p className="tf-desc" data-reveal data-side={i % 2 ? "left" : "right"}>
                  {w.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="tf-controls" data-reveal data-side="center" data-stagger>
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
