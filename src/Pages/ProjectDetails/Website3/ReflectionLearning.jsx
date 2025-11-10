// ReflectionLearning.jsx
import React, { useEffect, useRef } from "react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning — Project Foresight (Geekout)",
  title = "What we learned building Foresight",
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/anders-drange-EpLCuvjhBK4-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  // Content
  const wins = [
    "First-time hackathon — gained confidence and momentum.",
    "Built a working interactive quiz, course discovery and mentor concept.",
    "Clear user problem framing and solution narrative.",
    "Strong teamwork, communication and time-boxing under pressure.",
  ];

  const challenges = [
    "Balancing research, UI polish, development and testing within 48 hours.",
    "Fast alignment across team roles and ideas.",
    "Pushing through fatigue and tight deadlines.",
    "Learning to scope only essential features for the MVP.",
  ];

  const learnings = [
    "This was my first hackathon and it taught me how to stay calm under pressure, manage time and trust the process.",
    "Teamwork and communication mattered as much as tech — we divided tasks quickly, supported each other and kept energy high.",
    "Meeting new people and mentors helped me improve not just the idea, but also how I present and think about user problems.",
    "We won 2nd runner-up despite tough competition — proving that determination, focus and feedback loops can out-perform even limited time.",
    "Hard moments happen — powering through, iterating fast and relying on teammates led to success.",
  ];

  const impact = [
    "Gained confidence to compete again in future hackathons.",
    "Stronger collaboration and fast-decision making skills.",
    "Better at scoping MVPs and keeping focus under time pressure.",
  ];

  // Scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal engine
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
        if (side === "left")  setVars(el, "-54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "54px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      } else {
        if (side === "left")  setVars(el, "54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-54px", "12px", "0px", "0px");
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
      el.classList.add("is-out");
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

  const toSentence = (arr) => arr.join(" ");

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
          <span className="rl-metric-value">48h</span>
          <span className="rl-metric-label">Hackathon build</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">1st</span>
          <span className="rl-metric-label">Hackathon experience</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">2nd</span>
          <span className="rl-metric-label">Runner-up (GovTech)</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Team</span>
          <span className="rl-metric-label">Collaboration & mentor support</span>
        </li>
      </ul>

      {/* Cards as paragraphs */}
      <div className="rl-grid">
        <div className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">What went well</h3>
          <p>{toSentence(wins)}</p>
        </div>

        <div className="rl-card" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">Key challenges</h3>
          <p>{toSentence(challenges)}</p>
        </div>
      </div>

      {/* Impact */}
      <div className="rl-grid" style={{ marginTop: 12 }}>
        <div className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">Impact</h3>
          <p>{toSentence(impact)}</p>
        </div>
      </div>
    </section>
  );
}
