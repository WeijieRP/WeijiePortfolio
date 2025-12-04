// ProjectsBuilt.jsx
import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt({
  bgImage = "/assets/PortfolioMobileBackgroundImage/planet-5509642_1920.jpg",
}) {
  const rootRef = useRef(null);

  // Apply background image via CSS variable
  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--pg-bg", `url("${bgImage}")`);
    }
  }, [bgImage]);

  // Track scroll direction for potential directional anims
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastY = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY ? "down" : "up");
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation for card
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".pg-card");
    if (!cards.length) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          e.target.classList.toggle("is-in", e.isIntersecting);
        }),
      { threshold: 0.2 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: "GPA Tracker — Grade Calculator",
      desc:
        "A simple offline GPA calculator that lets students add subjects, credits and grades with instant GPA updates.",
      img: "/assets/Moblie/MobileView1.png",
      href: "/portfolio/Mobile/projectdetail1",
      tag: "Flutter · Dart",
    },
  ];

  return (
    <section className="pg-section" ref={rootRef} id="mobile-projects">
      <div className="pg-bg" aria-hidden="true" />

      {/* Header */}
      <header className="pg-header">
        <h2 className="pg-title-metallic">Projects That I Built</h2>
        <p className="pg-subtitle">
          These were my early projects where I learned to design and develop
          real-world Flutter applications.
        </p>
      </header>

      {/* Centered single card */}
      <div className="pg-grid-center">
        {projects.map((p) => (
          <article className="pg-card" key={p.title}>
            <figure className="pg-media">
              <img src={p.img} alt={p.title} loading="lazy" />
            </figure>

            <div className="pg-body">
              <span className="pg-tag">{p.tag}</span>
              <h3 className="pg-card-title">{p.title}</h3>
              <p className="pg-card-desc">{p.desc}</p>
              <Link to={p.href} className="pg-btn">
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
