// FeaturedDesigns.jsx
import React, { useEffect, useRef } from "react";
import "./gallery.css";
import { Link } from "react-router-dom";

export default function FeaturedDesigns({
  id = "mobile-projects",
  title = "Featured Projects",
  subtitle = "A look at the mobile apps I’ve built with Flutter and Dart — practical, intuitive, and designed to help users in their daily life.",
}) {
  const secRef = useRef(null);

  // Flag gradient-clip support (for metallic title layer)
  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const supports =
      (window.CSS && CSS.supports?.("-webkit-background-clip:text")) ||
      (window.CSS && CSS.supports?.("background-clip:text"));
    if (supports) sec.classList.add("has-clip");
    else sec.classList.remove("has-clip");
  }, []);

  // Parallax + scroll direction
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const bg = el.querySelector(".fd-bg");
    const fog = el.querySelector(".fd-fog");

    const onScroll = () => {
      const y = window.scrollY || 0;
      const s = 1.03 + y * 0.00012;

      if (bg) {
        bg.style.transform = `translateY(${(y * 0.14).toFixed(
          1
        )}px) scale(${s.toFixed(3)})`;
      }
      if (fog) {
        fog.style.transform = `translateY(${(y * 0.08).toFixed(1)}px)`;
      }

      const last = Number(el.getAttribute("data-lasty") || 0);
      el.setAttribute("data-scroll", y > last ? "down" : "up");
      el.setAttribute("data-lasty", String(y));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animations
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const cards = root.querySelectorAll(".min-card");

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.22, rootMargin: "0px 0px -4% 0px" }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="fd-min" id={id} ref={secRef}>
      {/* Background layers */}
      <div
        className="fd-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("/assets/PortfolioMobileBackgroundImage/planet-5509637_1920.jpg")',
        }}
      />
      <div className="fd-vignette" aria-hidden="true" />
      <div className="fd-stars" aria-hidden="true" />
      <div className="fd-fog" aria-hidden="true" />

      {/* Glass header (centered) */}
      <header className="fd-head">
        {/* Layered title – custom metallic look, independent from global h2 gradient */}
        <h2 className="fd-title-layered">
          <span className="fd-title-gradient" aria-hidden="true">
            {title}
          </span>
          <span className="fd-title-solid">{title}</span>
        </h2>

        {/* Gold subtitle line, separate from global .section-subtitle */}
        <p className="fd-sub">{subtitle}</p>
      </header>

      {/* Single centered card */}
      <div className="fd-cards fd-cards-center">
        <article
          className="min-card"
          data-dir="left"
          tabIndex={0}
          aria-labelledby="gpa-title"
        >
          <img
            className="min-img"
            src="/assets/Moblie/MobileView1.jpg"
            alt="GPA Tracker app preview"
            loading="lazy"
            decoding="async"
          />

          <div className="min-top">
            <span className="min-badge">Flutter &amp; Dart</span>
            <h3 id="gpa-title" className="min-title">
              GPA Calculator Tracker App
            </h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              A simple mobile tool for students to calculate and track their GPA
              in real time. Users can add modules, grades, and credits — the app
              instantly updates results with a clean interface.
            </p>
            <div className="min-tags">
              <span>Offline Support</span>
              <span>Lightweight</span>
              <span>Student Utility</span>
            </div>
            <Link to="/portfolio/Mobile/projectdetail1" className="min-link">
              View case study
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
