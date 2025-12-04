import React, { useEffect, useRef } from "react";
import "./learnings.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "Reflection & Learning — CCA Tracker",
  title = "What I learned building a role-aware CCA Tracker web app",
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/slava-auchynnikau-ytVuRjBtMZw-unsplash.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down"); // "down" | "up"

  // Track scroll direction (for slide-in/out)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direction-aware enter/leave + settle (drop transforms after enter)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");

    const setVars = (el, fromX, fromY, toX, toY) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.willChange = "transform";
    };

    const settle = (el) => {
      el.classList.add("settled");
      el.style.removeProperty("--from-x");
      el.style.removeProperty("--from-y");
      el.style.removeProperty("--to-x");
      el.style.removeProperty("--to-y");
      el.style.removeProperty("transform");
      el.style.willChange = "auto";
    };

    const onEnd = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("is-in")) settle(el);
    };

    const enter = (el, side, dir) => {
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left") setVars(el, "-54px", "10px", "0px", "0px");
        else if (side === "right") setVars(el, "54px", "10px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "54px", "10px", "0px", "0px");
        else if (side === "right") setVars(el, "-54px", "10px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-54px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "54px", "16px");
        else setVars(el, "0px", "0px", "0px", "16px");
      } else {
        if (side === "left") setVars(el, "0px", "0px", "54px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-54px", "16px");
        else setVars(el, "0px", "0px", "0px", "16px");
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
      el.addEventListener("transitionend", onEnd);
      io.observe(el);
    });

    return () => {
      targets.forEach((el) => el.removeEventListener("transitionend", onEnd));
      io.disconnect();
    };
  }, []);

  return (
    <section className="rl-stage" id={id} ref={rootRef}>
      {/* Background */}
      <div
        className="rl-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Header (glass) */}
      <header className="rl-head">
        <div
          className="rl-glass-head"
          data-reveal
          data-side="center"
          data-stagger
        >
          <p className="rl-eyebrow">{eyebrow}</p>
          <h2 className="">{title}</h2>
        </div>
      </header>

      {/* Quick metrics */}
      <ul
        className="rl-metrics"
        data-reveal
        data-side="center"
        data-stagger
      >
        <li className="rl-metric">
          <span className="rl-metric-value">3</span>
          <span className="rl-metric-label">
            Roles (Student / Teacher / Admin)
          </span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">1</span>
          <span className="rl-metric-label">Main CRUD resource (CCA)</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">6+</span>
          <span className="rl-metric-label">Protected routes</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">1</span>
          <span className="rl-metric-label">Live deployment</span>
        </li>
      </ul>

      {/* Two-column reflection cards */}
      <div className="rl-grid">
        <article
          className="rl-card"
          data-reveal
          data-side="left"
          data-stagger
        >
          <h3 className="rl-card-title">Reflection</h3>
          <p className="rl-paragraph">
            This project was challenging because it demanded true teamwork and
            steady discipline. With different teammates moving at different
            speeds, I had to keep everyone aligned while maintaining code
            quality and deadlines. Balancing hashed auth, session guards, role
            permissions, and server-side search under time pressure forced me to
            prioritise what mattered: a correct, stable core with clean
            navigation and simple EJS forms that always work.
          </p>
        </article>

        <article
          className="rl-card"
          data-reveal
          data-side="right"
          data-stagger
        >
          <h3 className="rl-card-title">Leadership</h3>
          <p className="rl-paragraph">
            As the lead, I set a clear plan (schema first, routes/controllers
            next, then views and validation), broke tasks into small commits,
            and checked progress daily. When blockers appeared, I unblocked
            fast—pairing on RBAC, writing examples, and keeping the README
            current. Most importantly, I pushed for on-time submissions by
            aligning scope, setting review cut-offs, and insisting on one solid
            CRUD flow before adding extras.
          </p>
        </article>
      </div>

      {/* Wide takeaway card */}
      <article
        className="rl-card rl-card--wide"
        data-reveal
        data-side="center"
        data-stagger
      >
        <h3 className="rl-card-title">Key Takeaways</h3>
        <p className="rl-paragraph">
          Start with the data model and roles—they shape every page and route.
          Apply middleware in the right order (auth → role guard → controller).
          Keep server-side search simple and safe. Use the PRG pattern to avoid
          duplicate posts. And get one path perfect (CCA CRUD) before scaling
          out.
        </p>
      </article>
    </section>
  );
}
