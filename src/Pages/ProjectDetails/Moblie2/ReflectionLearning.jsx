import React, { useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, GraduationCap, StarIcon } from "lucide-react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "What I learned from this project",
  title = "How building the Calorie & Exercise Tracker helped me grow",
  bgImage = "/assets/PortfolioMoblieProjectDetail2BackgroundImage/moon-6892902.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  // ✅ Updated simple copy (Calorie & Exercise Tracker)
  const winsText =
    "I built a working Calorie & Exercise Tracker with Flutter and Dart. You can log meals in seconds, add workouts, and see calories left for today instantly. The screens are clean, buttons are easy to tap, and the app feels fast on mobile. I’m happy that totals update right away and the experience is simple for everyday use.";

  const challengesText =
    "Getting the calorie math right for many different foods and exercises was tough. I also fixed layout issues on small screens and handled edge cases like large inputs or edits. Managing state across the home, add-meal, and add-exercise screens took care and testing. It was tricky at first, but repeat testing helped me smooth it out.";

  const learningsText =
    "I learned to plan the data flow before coding, manage app state clearly, and write UI that stays simple and friendly. I saw the value of testing on real devices to catch small bugs early. Most of all, I learned to balance clean design with correct logic so the app is useful, fast, and easy to trust every day.";

  // Track scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direction-aware enter/leave animations
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

      {/* Metrics (tuned for tracker app) */}
      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">1</span>
          <span className="rl-metric-label">Mobile App</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">100%</span>
          <span className="rl-metric-label">Instant totals</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">6+</span>
          <span className="rl-metric-label">Core features</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Offline</span>
          <span className="rl-metric-label">Works anywhere</span>
        </li>
      </ul>

      {/* Reflection Cards */}
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
            What was challenging
          </h3>
          <p className="rl-copy">{challengesText}</p>
        </div>

        <div className="rl-card wide" data-reveal data-side="center" data-stagger>
          <h3 className="rl-card-title">
            <GraduationCap size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What I learned
          </h3>
          <p className="rl-copy">{learningsText}</p>
        </div>
      </div>
    </section>
  );
}
