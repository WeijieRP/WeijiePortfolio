// SolutionForesight.jsx
import React, { useEffect, useMemo } from "react";
import "./solution.css";

export default function SolutionForesight({
  id = "solution-foresight",
  bgImageSection = "/assets/PortfolioWebProjectDetail3BackgroundImage/nasa-hubble-space-telescope-PcW34xhHvek-unsplash.jpg",
  rightImage = "/assets/Screenshot 2025_foresight.png",
  eyebrow = "Solution — Project Foresight",
  title = "Turn choice overload into a guided, trustworthy journey",
  insightStatement = `Students are overwhelmed by brochures, ads, and scattered reviews. Our solution sequences decisions so the next step is always obvious and credible. Start with a lightweight interest quiz to narrow options, move to one-screen course summaries for fast comparison, ground decisions with authentic alumni and mentor voices, then commit through hands-on events and try-outs.`,
}) {
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;

    // track scroll direction
    let lastY = window.scrollY || 0;
    let dir = "down";
    const onScrollDir = () => {
      const y = window.scrollY || 0;
      dir = y > lastY ? "down" : "up";
      lastY = y;
    };

    const setVars = (el, fx, fy) => {
      el.style.setProperty("--from-x", fx);
      el.style.setProperty("--from-y", fy);
    };

    // ensure transitions run by forcing reflow between state changes
    const play = (el, cls) => {
      el.classList.remove("is-in", "is-out");
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      el.classList.add(cls);
    };

    const enter = (el) => {
      const side = el.getAttribute("data-dir") || "center";
      if (dir === "down") {
        if (side === "left") setVars(el, "-24px", "10px");
        else if (side === "right") setVars(el, "24px", "10px");
        else setVars(el, "0px", "14px");
      } else {
        if (side === "left") setVars(el, "24px", "10px");
        else if (side === "right") setVars(el, "-24px", "10px");
        else setVars(el, "0px", "14px");
      }
      play(el, "is-in");
    };

    const leave = (el) => {
      const side = el.getAttribute("data-dir") || "center";
      if (dir === "down") {
        if (side === "left") setVars(el, "-18px", "14px");
        else if (side === "right") setVars(el, "18px", "14px");
        else setVars(el, "0px", "16px");
      } else {
        if (side === "left") setVars(el, "18px", "14px");
        else if (side === "right") setVars(el, "-18px", "14px");
        else setVars(el, "0px", "16px");
      }
      play(el, "is-out");
    };

    const targets = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? enter(e.target) : leave(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t, i) => {
      t.style.setProperty("--delay", `${Math.min(i * 40, 320)}ms`);
      // seed initial offset so first entry animates
      const side = t.getAttribute("data-dir") || "center";
      if (side === "left") setVars(t, "-24px", "10px");
      else if (side === "right") setVars(t, "24px", "10px");
      else setVars(t, "0px", "14px");
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
    <section className="sol-stage" id={id}>
      <div
        className="sol-backdrop"
        style={{ backgroundImage: `url("${bgImageSection}")` }}
        aria-hidden="true"
      />
      <div className="sol-backdrop-overlay" aria-hidden="true" />

      <div className="sol-grid">
        {/* LEFT */}
        <article className="sol-glass" data-reveal data-dir="left">
          <div className="no-blur">
            <p className="sol-eyebrow">{eyebrow}</p>
            <h2 className="sol-title">{title}</h2>
            <p className="sol-desc">{insightStatement}</p>
          </div>
        </article>

        {/* RIGHT */}
        <aside className="sol-visual" data-reveal data-dir="right">
          <img className="sol-img" src={rightImage} alt="Foresight UI mockup" />
          <div className="sol-meteors" aria-hidden="true">
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
