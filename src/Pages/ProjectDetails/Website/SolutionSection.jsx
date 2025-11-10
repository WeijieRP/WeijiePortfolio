import React, { useEffect, useRef, useState } from "react";
import "./solutions.css";

export default function SolutionSection({
  id = "solution",
  // Backgrounds (keep leading slash for public/)
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-7741647.jpg",
  fallbackImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-7741647.jpg",

  // Content
  eyebrow = "Solution",
  title   = "CCA Tracker where everyone can use to track cca and schedule",
  summary =
    "I developed a secure full-stack web app with hashed login, session auth, and role-based permissions. It supports full CRUD, server-side SQL search, and responsive EJS + Bootstrap pages, deployed live with an online MySQL database.",
}) {
  const rootRef = useRef(null);
  const vpRef   = useRef(null);
  const lastY   = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef  = useRef("down"); // "down" | "up"
  const [imgSrc, setImgSrc] = useState(bgImage);
  const onImgError = () => setImgSrc(fallbackImage);

  // Track scroll direction
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const setDir = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      host.dataset.flow = dirRef.current; // for debugging if you want
      lastY.current = y;
    };
    setDir();
    window.addEventListener("scroll", setDir, { passive: true });
    return () => window.removeEventListener("scroll", setDir);
  }, []);

  // Parallax background
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const r = rootRef.current?.getBoundingClientRect();
      const vp = vpRef.current;
      if (r && vp) {
        const vh = window.innerHeight || 1;
        const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
        const scale = 1 + (1 - Math.abs(p - 0.5) * 2) * 0.06; // 1 → 1.06
        const ty = (p - 0.5) * 60;                            // -30 → +30
        vp.style.setProperty("--bg-scale", scale.toFixed(3));
        vp.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Intersection: set per-element from→to vectors every time
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const targets = host.querySelectorAll("[data-reveal]");

    const setVars = (el, fromX, fromY, toX, toY, fromScale = 1, toScale = 1) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.setProperty("--from-scale", String(fromScale));
      el.style.setProperty("--to-scale", String(toScale));
    };

    const enter = (el, dir, side) => {
      // When scrolling DOWN: enter from right, UP: enter from left.
      // If a side is explicitly set (data-dir), we follow the rule but flip on scroll.
      if (dir === "down") {
        if (side === "left")  setVars(el, "-48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "48px", "12px", "0px", "0px");
        else setVars(el, "48px", "12px", "0px", "0px"); // default: from right
      } else {
        if (side === "left")  setVars(el, "48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-48px", "12px", "0px", "0px");
        else setVars(el, "-48px", "12px", "0px", "0px"); // default: from left
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      // force style recalc for consistent animation start
      void el.offsetWidth;
    };

    const leave = (el, dir, side) => {
      // Slide back toward the opposite side (gives a proper OUT motion)
      if (dir === "down") {
        if (side === "left")  setVars(el, "0px", "0px", "-42px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "42px", "16px");
        else setVars(el, "0px", "0px", "-42px", "16px"); // default: out to left
      } else {
        if (side === "left")  setVars(el, "0px", "0px", "42px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-42px", "16px");
        else setVars(el, "0px", "0px", "42px", "16px"); // default: out to right
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
          const side = el.getAttribute("data-dir"); // optional override
          if (e.isIntersecting) enter(el, dir, side);
          else leave(el, dir, side);
        });
      },
      { threshold: 0.12, rootMargin: "-10% 0% -10% 0%" }
    );

    targets.forEach((el, i) => {
      // subtle stagger option
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${110 + (i % 6) * 60}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="section-bg" id={id} ref={rootRef} aria-label="Solution">
      <div className="sol-viewport" ref={vpRef}>
        {/* Background */}
        <div className="bg-wrap" aria-hidden="true">
          <img className="bg-img" src={imgSrc} onError={onImgError} alt="" />
          <div className="bg-fallback" />
          <div className="bg-tint" />
        </div>

        {/* Content */}
        <div className="sol-inner">
          {/* LEFT: hero card (direction-aware) */}
          <div className="sol-hero-card" data-reveal data-stagger>
            {eyebrow && <p className="sol-eyebrow">{eyebrow}</p>}
            <h2 className="sol-title">{title}</h2>
            <p className="sol-summary">{summary}</p>
          </div>

          {/* RIGHT: panel (no blur anywhere, crisp grid) */}
          <aside className="sol-right-card" data-reveal data-stagger aria-label="Demo panel">
            <div className="sol-window-bar">
              <span className="dot dot-1" />
              <span className="dot dot-2" />
              <span className="dot dot-3" />
            </div>

            <div className="button-grid">
              <button className="grid-item" type="button" aria-label="Login">Login</button>
              <button className="grid-item" type="button" aria-label="CCAs">CCAs</button>
              <button className="grid-item" type="button" aria-label="Session">Session</button>
              <button className="grid-item" type="button" aria-label="Attendance">Attendance</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
