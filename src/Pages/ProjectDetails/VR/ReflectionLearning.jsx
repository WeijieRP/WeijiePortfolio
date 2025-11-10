// ReflectionLearning.jsx
import React, { useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, GraduationCap, StarIcon } from "lucide-react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "What I took away",
  title = "How AR changed the way I design",
  bgImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/nasa-hubble-space-telescope-BW-rH_JGVrU-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down"); // "down" | "up"

  const winsText =
    "The core flow works and feels clean. I designed a consistent front and back for the name card, raised the Vuforia target rating to at least three stars, and integrated Unity with Vuforia so the model stays firmly attached to the print. I kept the 3D logo lightweight so it runs smoothly on phones. The final demo is simple and focused: the camera scans the card, the system recognises it quickly, the logo appears in place, and the clip ends with a clear call-to-action within thirty seconds.";

  const challengesText =
    "The hardest part was improving the target rating without cluttering the design. I also had to optimise materials to remove shimmer while keeping performance high. Lighting and scale needed careful tuning so the logo looked grounded on the card. The schedule was tight, so I moved quickly between design updates, target tests, builds, and recording.";

  const learningsText =
    "Strong, high-frequency details and good contrast gave the most reliable tracking. Simple assets with small textures and low polygon counts made the experience feel stable. A clear information hierarchy on the card helped both usability and recognition. Short, purposeful demos communicate intent better than long effect reels. A tight loop of design, target evaluation, implementation, and iteration saved the most time.";

  // Track scroll direction (for reversing reveal)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direction-aware enter/leave using CSS variables
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
        if (side === "left") setVars(el, "-54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "54px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-54px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left") setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 6) * 60}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="rl-stage" id={id} ref={rootRef}>
      {/* Background */}
      <div className="rl-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      {/* Header */}
      <header className="rl-head" data-reveal data-side="center" data-stagger>
        <p className="rl-eyebrow">{eyebrow}</p>
        <h2 className="rl-title">{title}</h2>
      </header>

      {/* Metrics */}
      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">2</span>
          <span className="rl-metric-label">Card sides</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">≥3<StarIcon size={15}/></span>
          <span className="rl-metric-label">Target rating</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">1</span>
          <span className="rl-metric-label">3D model</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">≤30s</span>
          <span className="rl-metric-label">Demo length</span>
        </li>
      </ul>

      {/* Three descriptive cards (last one is full-width on small screens) */}
      <div className="rl-grid">
        <div className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">
            <CheckCircle2 size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What went well
          </h3>
          <p className="rl-copy">{winsText}</p>
        </div>

        <div className="rl-card" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">
            <AlertTriangle size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What was hard
          </h3>
          <p className="rl-copy">{challengesText}</p>
        </div>

        {/* Wide on all screen sizes; especially useful on small screens */}
        <div className="rl-card wide" data-reveal data-side="center" data-stagger>
          <h3 className="rl-card-title">
            <GraduationCap size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            Key learning
          </h3>
          <p className="rl-copy">{learningsText}</p>
        </div>
      </div>
    </section>
  );
}
