// SolutionCA1.jsx
import React, { useEffect, useMemo } from "react";
import "./solutions.css";

export default function SolutionCA1({
  id = "solution-ca1",
  bgImageSection = "/assets/PortfolioWebProjectDetail2BackgroundImage/blue-moon-6579849.jpg",
  rightImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/blue-moon-6579849.jpg",

  eyebrow = "Solution",
  title = "Building an Express App With In-Memory CRUD (GET/POST Only)",
  problemStatement = `My solution was to use one in-memory array to hold the data, build pages with basic GET and POST routes, and return full HTML directly from Express. I kept the forms and navigation simple, and used redirects after form submissions to keep the flow clean.`,
}) {
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;

    let lastY = window.scrollY || 0;
    let dir = "down";

    const onScrollDir = () => {
      const y = window.scrollY || 0;
      dir = y > lastY ? "down" : "up";
      lastY = y;
    };

    const setVars = (el, fromX, fromY, toX, toY) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
    };

    const enter = (el) => {
      const side = el.getAttribute("data-dir") || "center";
      if (dir === "down") {
        if (side === "left") setVars(el, "-28px", "10px", "0px", "0px");
        else if (side === "right") setVars(el, "28px", "10px", "0px", "0px");
        else setVars(el, "0px", "16px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "28px", "10px", "0px", "0px");
        else if (side === "right") setVars(el, "-28px", "10px", "0px", "0px");
        else setVars(el, "0px", "16px", "0px", "0px");
      }
      el.classList.add("is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el) => {
      const side = el.getAttribute("data-dir") || "center";
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-22px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "22px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      } else {
        if (side === "left") setVars(el, "0px", "0px", "22px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-22px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      }
      el.classList.add("is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const targets = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting ? enter(e.target) : leave(e.target)
        ),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t, i) => {
      t.style.setProperty("--delay", `${Math.min(i * 40, 320)}ms`);
      io.observe(t);
    });

    window.addEventListener("scroll", onScrollDir, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollDir);
    };
  }, [id]);

  const meteors = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 10 + i * 16,
        delay: 0.7 * i,
        dur: 5.5 + i,
      })),
    []
  );

  return (
    <section className="sol-stage" id={id} aria-label="Solution">
      {/* Backdrop */}
      <div
        className="sol-backdrop"
        style={{ backgroundImage: `url("${bgImageSection}")` }}
        aria-hidden="true"
      />
      <div className="sol-backdrop-overlay" aria-hidden="true" />

      <div className="sol-grid">
        {/* LEFT: eyebrow + GLASS PANEL (title + text) */}
        <article className="sol-copy" data-reveal data-dir="left">
          <p className="sol-eyebrow">{eyebrow}</p>

          <div className="sol-panel">
            {/* h2 uses GLOBAL gradient via .title-aurora (no shadow here) */}
            <h2 className="title-aurora sol-title">{title}</h2>
            <p className="sol-desc">{problemStatement}</p>
          </div>
        </article>

        {/* RIGHT: visual, still no glass card */}
        <aside
          className="sol-visual"
          aria-hidden="true"
          data-reveal
          data-dir="right"
        >
          <div
            className="sol-bg kb"
            style={{ backgroundImage: `url("${rightImage}")` }}
          />
          <div className="sol-overlay" />

          <div className="sol-meteors">
            {meteors.map((m) => (
              <span
                key={m.id}
                className="sol-meteor"
                style={{
                  top: `${m.top}vh`,
                  animationDelay: `${m.delay}s`,
                  animationDuration: `${m.dur}s`,
                }}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
