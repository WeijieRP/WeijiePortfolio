// FeaturedVR.jsx
import React, { useEffect, useRef } from "react";
import "./featured-projects.css";
import { Link } from "react-router-dom";

export default function FeaturedVR() {
  const secRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  // Track scroll direction for reveal offsets
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax background
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const bg = el.querySelector(".fd-bg");
    const fog = el.querySelector(".fd-fog");
    const onScroll = () => {
      const y = window.scrollY || 0;
      const s = 1.03 + y * 0.00012;
      if (bg) bg.style.transform = `translateY(${y * 0.14}px) scale(${s.toFixed(3)})`;
      if (fog) fog.style.transform = `translateY(${y * 0.08}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on intersection
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll(".min-card")];
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.target.classList.toggle("is-in", e.isIntersecting)),
      { threshold: 0.18, rootMargin: "0px 0px -4% 0px" }
    );
    cards.forEach((c, i) => {
      c.style.setProperty("--stagger", `${80 + (i % 4) * 70}ms`);
      io.observe(c);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="fd-min" id="projects" ref={secRef}>
      {/* Background layers */}
      <div
        className="fd-bg"
        aria-hidden="true"
        style={{ backgroundImage: 'url("/assets/PortfolioVRBackgroundImage/moon-5272591.jpg")' }}
      />
      <div className="fd-vignette" aria-hidden="true" />
      <div className="fd-stars" aria-hidden="true" />
      <div className="fd-fog" aria-hidden="true" />

      <header className="fd-head">
        <h2 className="fd-title-emboss">Featured Projects</h2>
        <p className="fd-sub">
          This is my work in AR and VR. I built these to make interaction clear. I want
          the player to feel safe and inside the world.
        </p>
      </header>

      <div className="fd-cards">
        {/* AR Image Target ID Card */}
        <article className="min-card needs-contrast" data-dir="right" tabIndex={0}>
          <img
            className="min-img"
            src="/assets/VR_ArtWork/Font.png"
            alt="AR Image Target ID Card"
            loading="lazy"
          />
          <div className="min-top">
            <span className="min-badge">AR Vuforia</span>
            <h3 className="min-title">AR Image Target ID Card</h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              Point the camera at the card. A panel appears with info and smooth motion. It reacts when you move.
            </p>
            <div className="min-tags">
              <span>Unity</span><span>Vuforia</span><span>C#</span><span>AR</span><span>UX</span>
            </div>
            <Link to="/portfolio/VR/projectdetail-vuforia-card" className="min-btn">
              View Project
            </Link>
          </div>
        </article>

        {/* VR Escape Room */}
        <article className="min-card needs-crop" data-dir="left" tabIndex={0}>
          <img
            className="min-img"
            src="/assets/Screenshot.png"
            alt="VR Escape Room"
            loading="lazy"
          />
          <div className="min-top">
            <span className="min-badge">VR</span>
            <h3 className="min-title">VR Escape Room</h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              This is a puzzle room in VR. You move and pick up items. You solve tasks one by one. It feels gentle for new players.
            </p>
            <div className="min-tags">
              <span>Locomotion</span><span>XR Input</span><span>Diegetic UI</span><span>Comfort</span>
            </div>
            <Link to="/portfolio/VR/projectdetail-prototypes" className="min-btn">
              View Project
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
