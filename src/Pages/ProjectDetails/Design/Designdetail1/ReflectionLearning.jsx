// ReflectionLearning.jsx
import React, { useEffect, useRef } from "react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning",
  title = "What I learned and how it shaped my design identity",
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/nasa-hubble-space-telescope-UET2BRxg1dg-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  const winsIntro =
    "This project landed on a clear, warm look and kept that identity consistent from page to page. A few highlights stood out:";
  const wins = [
    "A warm orange–cream identity that feels friendly and shows up across every page.",
    "An icon set drafted with AI, then cleaned and finalised as precise vectors in Illustrator.",
    "Clear visual hierarchy driven by a simple grid and a dependable spacing system.",
    "A friendly tone expressed through rounded UI, soft gradients, and small glow accents.",
    "A direct portfolio flow — Hero → About → Work → Contact — that’s fast to scan.",
  ];
  const winsText = wins.join(" ");

  const challengesIntro =
    "There were bumps along the way. These were the tough parts and how they were handled:";
  const challenges = [
    "Keeping a steady rhythm of spacing and alignment across all sections.",
    "Turning rough AI icon drafts into crisp, scalable vectors without visual noise.",
    "Balancing decoration with legibility so text stays readable at every size.",
    "Managing time sensibly while other modules were running in parallel.",
  ];
  const challengesText = challenges.join(" ");

  const learnings = [
    "Design tokens — colour, type, and spacing — make iteration faster and keep everything consistent.",
    "AI is great for starting ideas, but human judgment and vector polish finish the work.",
    "Micro-interactions should clarify what to do next, not steal attention.",
    "A strong type scale and good contrast beat heavy effects every time.",
    "Locking direction with a moodboard early saves a lot of rework later.",
  ];
  const learningsText = learnings.join(" ");

  // track scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // direction-aware reveal
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
      <div className="rl-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      {/* Header: solid panel, gradient title from global .title-aurora */}
      <header
        className="rl-head"
        data-reveal
        data-side="center"
        data-stagger
      >
        <div className="rl-hero-panel">
          <p className="rl-eyebrow">{eyebrow}</p>
          <h2 className="">{title}</h2>
        </div>
      </header>

      {/* Metrics */}
      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">4</span>
          <span className="rl-metric-label">Pages</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">9+</span>
          <span className="rl-metric-label">Icons</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">7</span>
          <span className="rl-metric-label">Screens</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">3</span>
          <span className="rl-metric-label">Breakpoints</span>
        </li>
      </ul>

      {/* Two narrative cards */}
      <div className="rl-grid">
        <div className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">Wins</h3>
          <p className="rl-lead">{winsIntro}</p>
          <p className="rl-lead">{winsText}</p>
        </div>

        <div className="rl-card" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">Challenges</h3>
          <p className="rl-lead">{challengesIntro}</p>
          <p className="rl-lead">{challengesText}</p>
        </div>
      </div>

      {/* Key learnings */}
      <div
        className="rl-card rl-learn"
        data-reveal
        data-side="left"
        data-stagger
        style={{ marginTop: 16 }}
      >
        <h3 className="rl-card-title">Key learnings</h3>
        <p className="rl-lead">{learningsText}</p>
      </div>
    </section>
  );
}
