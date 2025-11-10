// ChallengeSection.jsx
import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "challenge",
  bgImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/javier-miranda-bDFP8PxzW1Q-unsplash.jpg",

  eyebrow = "Music Tracker Playlist",
  title = "Basic Express Web App",
  summary = "A simple Express project using only GET and POST routes, storing data in memory.",

  description = `This task required building a basic Express web app without using a database. All data had to be stored in an in-memory array, which resets whenever the server restarts. The app needed to include pages to view items, add new ones, edit them, and delete them, using only GET and POST routes. The focus was on implementing clean routing, handling form submissions correctly, and ensuring simple, intuitive navigation between pages.`,
  problemImage = "/assets/CA2_Tracker.png",
}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  // 🎬 Parallax & scroll reveal (unchanged)
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const loop = () => {
      const el = rootRef.current;
      const vp = vpRef.current;
      if (el && vp) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.06;
        const ty = (p - 0.5) * 90;

        vp.style.setProperty("--scroll-scale", scale);
        vp.style.setProperty("--scroll-ty", `${ty}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ✨ reveal anim logic (unchanged)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastY = window.scrollY;
    let dir = "down";
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      dir = y > lastY ? "down" : "up";
      lastY = y;
    });

    const setVars = (el, fx, fy, tx, ty) => {
      el.style.setProperty("--from-x", fx);
      el.style.setProperty("--from-y", fy);
      el.style.setProperty("--to-x", tx);
      el.style.setProperty("--to-y", ty);
    };

    const enter = (el) => {
      const side = el.dataset.dir;
      if (dir === "down") {
        setVars(el, side === "left" ? "-28px" : "28px", "18px", "0px", "0px");
      } else {
        setVars(el, side === "left" ? "28px" : "-28px", "18px", "0px", "0px");
      }
      el.classList.add("is-in");
    };

    const leave = (el) => el.classList.remove("is-in");

    const targets = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => (e.isIntersecting ? enter(e.target) : leave(e.target))),
      { threshold: 0.15 }
    );

    targets.forEach((t, i) => {
      t.style.setProperty("--delay", `${i * 40}ms`);
      io.observe(t);
    });
  }, []);

  return (
    <section className="section-bg" id={id} ref={rootRef}>
      <div className="ch-viewport" ref={vpRef}>
        <div className="ch-bg kb-layer" style={{ backgroundImage: `url("${bgImage}")` }} />
        <div className="ch-overlay" />

        <div className="ch-inner ch-left-aligned">
          <div className="ch-left">
            <p className="ch-eyebrow" data-reveal data-dir="left">{eyebrow}</p>
            <h2 className="ch-title" data-reveal data-dir="left">{title}</h2>
            <p className="ch-summary" data-reveal data-dir="left">{summary}</p>
            <p className="ch-desc" data-reveal data-dir="left">{description}</p>
          </div>

          <div className="ch-right">
            <figure className="ch-figure" data-reveal data-dir="right">
              <img src={problemImage} alt="Express app preview" className="ch-img" />
              <figcaption className="ch-cap">Express CA1 preview</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
