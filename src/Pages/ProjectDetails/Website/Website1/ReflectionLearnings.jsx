import React, { useEffect, useRef } from "react";
import "./learnings.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning",
  title = "What I learned from building Music Tracker",
  bgImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/nezt-xs--ItH6iXFo4Q-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

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

  // intersection reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-reveal]");
    const setVars = (el, fx, fy, tx, ty, fs = 0.96, ts = 1) => {
      el.style.setProperty("--from-x", fx);
      el.style.setProperty("--from-y", fy);
      el.style.setProperty("--to-x", tx);
      el.style.setProperty("--to-y", ty);
      el.style.setProperty("--from-scale", fs);
      el.style.setProperty("--to-scale", ts);
    };
    const enter = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "-54px", "10px", "0", "0");
        else if (side === "right") setVars(el, "54px", "10px", "0", "0");
        else setVars(el, "0", "16px", "0", "0");
      } else {
        if (side === "left") setVars(el, "54px", "10px", "0", "0");
        else if (side === "right") setVars(el, "-54px", "10px", "0", "0");
        else setVars(el, "0", "16px", "0", "0");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };
    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0", "0", "-54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0", "0", "54px", "18px", 1, 0.96);
        else setVars(el, "0", "0", "0", "18px", 1, 0.96);
      } else {
        if (side === "left") setVars(el, "0", "0", "54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0", "0", "-54px", "18px", 1, 0.96);
        else setVars(el, "0", "0", "0", "18px", 1, 0.96);
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
      <header className="rl-head" data-reveal data-side="center" data-stagger>
        <p className="rl-eyebrow">{eyebrow}</p>
        <h2 className="rl-title">{title}</h2>
      </header>

      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric"><span className="rl-metric-value">5</span><span className="rl-metric-label">Core pages (Home/List/Add/Edit/Delete)</span></li>
        <li className="rl-metric"><span className="rl-metric-value">3+</span><span className="rl-metric-label">Fields per track</span></li>
        <li className="rl-metric"><span className="rl-metric-value">2</span><span className="rl-metric-label">HTTP methods (GET/POST)</span></li>
        <li className="rl-metric"><span className="rl-metric-value">1</span><span className="rl-metric-label">In-memory data array</span></li>
      </ul>

      <div className="rl-grid" data-reveal data-side="center" data-stagger>
        <article className="rl-card" data-reveal data-side="left">
          <h3 className="rl-card-title">Idea and motivation</h3>
          <p>This music playlist app was my idea, inspired by Spotify but scoped to requirements. I wanted something simple I could create, save, and view anywhere.</p>
        </article>
        <article className="rl-card" data-reveal data-side="right">
          <h3 className="rl-card-title">Outcome</h3>
          <p>The final result is a clean playlist web app with simple routes and lightweight static rendering using <code>res.send()</code>.</p>
        </article>
        <article className="rl-card" data-reveal data-side="left">
          <h3 className="rl-card-title">Key learning</h3>
          <p>I learned time management and consistency—small daily goals and clear checklists helped me finish on time.</p>
        </article>
      </div>
    </section>
  );
}
