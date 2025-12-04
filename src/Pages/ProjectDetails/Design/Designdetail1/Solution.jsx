// BrandMeSolution.jsx
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "brandme-solution",
  sectionBg = "/assets/PortfolioDesignProjectDetail1BackgroundImage/nasa-hubble-space-telescope-DeLLFpNmu1o-unsplash.jpg",
  visual = "/assets/Artwork/creative-innovation-inspiration-light-bulb-graphic-word.jpg",
}) {
  const sectionRef = useRef(null);

  // Reveal on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-ani]");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          } else {
            e.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="bms-stage"
      style={{ backgroundImage: `url(${sectionBg})` }}
      aria-label="Brand Me solution"
    >
      {/* Overlay for contrast */}
      <div className="bms-overlay" aria-hidden="true" />

      <div className="bms-inner">
        {/* LEFT: TEXT CARD */}
        <div className="bms-col bms-col-left" data-ani>
          <div className="bms-card">
            <p className="bms-eyebrow">Brand Me</p>
            <h2 className="bms-title title-aurora">My BrandMe approach</h2>

            <p className="bms-sub">
              For this project, I built a clean and soft-glow identity that feels
              both friendly and modern. I started by setting a calm but confident
              color palette and chose simple typography with plenty of space so
              everything feels light and easy to read. I created small icons and
              illustrations to bring a playful side to the visuals. From there,
              I built the full system — defining the vibe, applying the same
              style across every page, and refining each detail until the whole
              brand felt like <em>me</em>.
            </p>
          </div>
        </div>

        {/* RIGHT: IMAGE PREVIEW */}
        <div className="bms-col bms-col-right" data-ani>
          <figure className="bms-figure">
            <div
              className="bms-img"
              style={{ backgroundImage: `url(${visual})` }}
              role="img"
              aria-label="Brand visuals: logo, palette, and UI samples"
            />
            <figcaption className="bms-cap">
              Visual system preview — palette, type, and UI accents
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
