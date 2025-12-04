import React, { useEffect, useRef, useState } from "react";
import "./solutions.css";

export default function SolutionSection({
  id = "solution",
  // Backgrounds
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-7741647.jpg",
  fallbackImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-7741647.jpg",

  // Content
  eyebrow = "Solution",
  title = "CCA Tracker where everyone can use to track CCA and schedule",
  summary = "I developed a secure full-stack web app with hashed login, session auth, and role-based permissions. It supports full CRUD, server-side SQL search, and responsive EJS + Bootstrap pages, deployed live with an online MySQL database.",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const dirRef = useRef("down"); // "down" | "up"

  const [imgSrc, setImgSrc] = useState(bgImage);
  const onImgError = () => setImgSrc(fallbackImage);

  // Track scroll direction for reveal
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;

    const setDir = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      host.dataset.flow = dirRef.current;
      lastY.current = y;
    };

    setDir();
    window.addEventListener("scroll", setDir, { passive: true });
    return () => window.removeEventListener("scroll", setDir);
  }, []);

  // Direction-aware reveal
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
      if (dir === "down") {
        if (side === "left") setVars(el, "-48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "48px", "12px", "0px", "0px");
        else setVars(el, "48px", "12px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-48px", "12px", "0px", "0px");
        else setVars(el, "-48px", "12px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, dir, side) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-42px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "42px", "16px");
        else setVars(el, "0px", "0px", "-42px", "16px");
      } else {
        if (side === "left") setVars(el, "0px", "0px", "42px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-42px", "16px");
        else setVars(el, "0px", "0px", "42px", "16px");
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
          const side = el.getAttribute("data-dir");
          if (e.isIntersecting) enter(el, dir, side);
          else leave(el, dir, side);
        });
      },
      { threshold: 0.12, rootMargin: "-10% 0% -10% 0%" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${110 + (i % 6) * 60}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="sol-stage"
      id={id}
      ref={rootRef}
      aria-label="Solution"
    >
      {/* Full-bleed background image with tint (no parallax) */}
      <div className="sol-bg-wrap" aria-hidden="true">
        <div className="sol-bg-fallback" />
        <img
          className="sol-bg-img"
          src={imgSrc}
          onError={onImgError}
          alt=""
        />
        <div className="sol-bg-tint" />
      </div>

      <div className="sol-inner">
        {/* LEFT: hero card */}
        <div
          className="sol-hero-card"
          data-reveal
          data-stagger
          data-dir="left"
        >
          {eyebrow && <p className="sol-eyebrow">{eyebrow}</p>}
          <h2 className="sol-title title-aurora">{title}</h2>
          <p className="sol-summary">{summary}</p>
        </div>

        {/* RIGHT: panel */}
        <aside
          className="sol-right-card"
          data-reveal
          data-stagger
          data-dir="right"
          aria-label="Demo panel"
        >
          <div className="sol-window-bar">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
          </div>

          <div className="sol-button-grid">
            <button className="sol-grid-item" type="button" aria-label="Login">
              Login
            </button>
            <button className="sol-grid-item" type="button" aria-label="CCAs">
              CCAs
            </button>
            <button className="sol-grid-item" type="button" aria-label="Session">
              Session
            </button>
            <button
              className="sol-grid-item"
              type="button"
              aria-label="Attendance"
            >
              Attendance
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
