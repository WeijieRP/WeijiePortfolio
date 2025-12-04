// src/pages/SnapScrollLayout.jsx
import React, { useEffect, useRef } from "react";
import "./snap-layout.css";

/* Import your existing sections */
import HomeHero from "../Pages/Home/Hero";
import Experience from "../Pages/Home/ExperienceSection";
//import VisionSection from "../components/VisionSection";
// import TestimonialsITE from "../components/TestimonialsITE";
// import CCASection from "../components/CCASection";

export default function SnapScrollLayout() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const sections = [...root.querySelectorAll(".snap-section")];

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("is-active");
            el.querySelectorAll("[data-observe], .reveal").forEach(n => {
              n.classList.add("is-inview");
            });
          } else {
            el.classList.remove("is-active");
            el.querySelectorAll("[data-observe], .reveal").forEach(n => {
              n.classList.remove("is-inview");
            });
          }
        });
      },
      { root: containerRef.current, threshold: 0.55 }
    );

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <main className="snap-container" ref={containerRef}>
      <section className="snap-section">
        <div className="snap-frame">
          <HomeHero /> {/* leave as-is (no snap classes inside HomeHero) */}
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-frame">
          <Experience />
        </div>
      </section>

      {/* Add more sections the same way */}
      {/* 
      <section className="snap-section">
        <div className="snap-frame">
          <TestimonialsITE />
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-frame">
          <CCASection />
        </div>
      </section>
      */}
    </main>
  );
}
