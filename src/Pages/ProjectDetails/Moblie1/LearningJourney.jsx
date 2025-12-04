import React, { useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, GraduationCap } from "lucide-react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "What I learned from this project",
  title = "How building the GPA Calculator App helped me grow",
  subtitle = "A short reflection on what worked well, what was challenging, and what I learned while building this app.",
  bgImage = "/assets/PortfolioMobileProjectDetails1BackgroundImage/lara-bellens-Vto8N2P8urQ-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  // ✅ Simplified text content
  const winsText =
    "I successfully built a working GPA Calculator App using Flutter and Dart. The app lets students add their modules, input grades and credits, and see their GPA update instantly. The layout is clean, the buttons are easy to use, and everything works smoothly on mobile. I’m happy that the app runs fast and gives real-time results without any delay.";

  const challengesText =
    "The hardest part was making sure the GPA formula worked correctly for all grade inputs. I also had to fix small layout issues when testing on different phone sizes. Managing state and storing user data safely took some time to understand. Debugging the logic for instant updates was tricky, but I managed to fix it with testing and patience.";

  const learningsText =
    "I learned how to plan my code before building, how to manage app state in Flutter, and how to keep my UI simple so users don’t get confused. I also understood the value of testing — checking my app on real devices helped me find and fix small bugs early. Most importantly, I learned how to balance design and logic to make an app that feels both useful and pleasant to use.";

  // Scroll direction tracker
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
      <div
        className="rl-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Header with glass panel */}
      <header className="rl-head">
        <div
          className="rl-headGlass reveal"
          data-reveal
          data-side="center"
          data-stagger
        >
          <p className="rl-eyebrow">{eyebrow}</p>
          <h2 className="rl-title">{title}</h2>
          <p className="rl-subtitle">{subtitle}</p>
        </div>
      </header>

      {/* Metrics */}
      <ul className="rl-metrics reveal" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">1</span>
          <span className="rl-metric-label">Mobile App</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">100%</span>
          <span className="rl-metric-label">Real-time updates</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">5+</span>
          <span className="rl-metric-label">Main features</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">∞</span>
          <span className="rl-metric-label">Learning gained</span>
        </li>
      </ul>

      {/* Reflection Cards */}
      <div className="rl-grid">
        <div className="rl-card reveal" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">
            <CheckCircle2 size={18} style={{ marginRight: 8 }} />
            What went well
          </h3>
          <p className="rl-copy">{winsText}</p>
        </div>

        <div className="rl-card reveal" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">
            <AlertTriangle size={18} style={{ marginRight: 8 }} />
            What was challenging
          </h3>
          <p className="rl-copy">{challengesText}</p>
        </div>

        <div
          className="rl-card wide reveal"
          data-reveal
          data-side="center"
          data-stagger
        >
          <h3 className="rl-card-title">
            <GraduationCap size={18} style={{ marginRight: 8 }} />
            What I learned
          </h3>
          <p className="rl-copy">{learningsText}</p>
        </div>
      </div>
    </section>
  );
}
