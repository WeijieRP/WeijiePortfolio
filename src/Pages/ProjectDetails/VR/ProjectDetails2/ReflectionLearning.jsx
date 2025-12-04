// ReflectionLearning.jsx
import React, { useEffect, useRef } from "react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning",
  title = "what was challenging, what I learned",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/nasa-hubble-space-telescope-jjPJYxZtzJc-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down"); // "down" | "up"

  // —— Simple, first-person prose —— //
  const winsText =
    "I built six cohesive spaces — each with its own emotion and purpose. All interactions are natural and inside the world, so players discover clues from real objects instead of floating UI. Hand actions like grabbing, flipping, and inspecting feel intuitive. The looping moment in the Fear room worked as planned and supported the story without confusing players. The Exit Room delivered the emotional payoff I wanted — open sky, gentle movement, and calm narration to let players breathe and reflect.";

  const challengesText =
    "Finding the right balance between mood and clarity was tough — I wanted cinematic lighting, but players still needed to see clues easily. Building for mobile VR forced me to optimise textures, lights, and effects to keep performance smooth. I also had to support both smooth movement and teleport to reduce motion sickness. Keeping puzzle feedback realistic (not game-y) took several iterations. The loop system in the Fear room created timing bugs that I fixed by tightening state changes and transitions.";

  const learningsText =
    "I learned that leading with emotion helps players understand the purpose of each puzzle before they deal with mechanics. Keeping clues diegetic made the experience feel believable. Targeting Quest taught me to optimise aggressively and be intentional with every asset. Short, focused rooms kept players engaged without fatigue. Most of all, sound did the heavy lifting — voice hints and spatial audio guided players more naturally than any menu or HUD.";

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

  // Direction-aware enter/leave using CSS variables
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");

    const setVars = (
      el,
      fromX,
      fromY,
      toX,
      toY,
      fromScale = 0.96,
      toScale = 1
    ) => {
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
        if (side === "left")
          setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else if (side === "right")
          setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left")
          setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else if (side === "right")
          setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
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
      {/* Full-section background image + soft overlay */}
      <div
        className="rl-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="rl-overlay" aria-hidden="true" />

      {/* 🔶 Header inside glass */}
      <header className="rl-head">
        <div
          className="rl-headGlass"
          data-reveal
          data-side="center"
          data-stagger
        >
          <p className="rl-eyebrow">{eyebrow}</p>
          {/* h2 picks up global aurora gradient + sizing */}
          <h2 className="rl-title">{title}</h2>
        </div>
      </header>

      {/* Quick metrics */}
      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">6</span>
          <span className="rl-metric-label">Rooms (incl. Exit)</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">XR</span>
          <span className="rl-metric-label">Hand Interactions</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">UI inside the world</span>
          <span className="rl-metric-label">UI Style</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Player missions / tasks</span>
          <span className="rl-metric-label">Quest System</span>
        </li>
      </ul>

      {/* Three descriptive cards */}
      <div className="rl-grid">
        <article className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">Wins</h3>
          <p className="rl-copy">{winsText}</p>
        </article>

        <article className="rl-card" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">Challenges</h3>
          <p className="rl-copy">{challengesText}</p>
        </article>

        <article className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">Key Learnings</h3>
          <p className="rl-copy">{learningsText}</p>
        </article>
      </div>
    </section>
  );
}
