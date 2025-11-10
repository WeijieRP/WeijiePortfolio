// BrandMeSolution.jsx
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "brandme-solution",
  sectionBg = "/assets/PortfolioDesignProjectDetail1BackgroundImage/nasa-hubble-space-telescope-DeLLFpNmu1o-unsplash.jpg",
  visual = "/assets/Artwork/creative-innovation-inspiration-light-bulb-graphic-word.jpg",
}) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  // Reveal on scroll
  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll("[data-ani]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
          else e.target.classList.remove("in-view");
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax image movement
  useEffect(() => {
    const onScroll = () => {
      const y = (window.scrollY || 0) * 0.12;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="bms-stage"
      style={{ backgroundImage: `url(${sectionBg})` }}
      aria-label="Brand Me solution"
    >
      {/* overlay is now non-blurry and lighter so the bg image is visible */}
      <div className="bms-overlay" aria-hidden="true" />

      <div className="bms-inner">
        {/* LEFT: CARD PANEL */}
        <div className="bms-col-left" data-ani>
          <div className="bms-card">
            <p className="bms-eyebrow">Brand Me</p>
            <h2 className="bms-title">My BrandMe approach</h2>

            <p className="bms-sub">
              For this project, I built a clean and soft-glow identity that feels both friendly and modern.
              I started by setting a calm but confident color palette and chose simple typography with
              plenty of space so everything feels light and easy to read. I created small icons and
              illustrations to bring a playful side to the visuals. From there, I built the full system —
              defining the vibe, applying the same style across every page, and refining each detail until
              the whole brand felt like <em>me</em>.
            </p>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <figure className="bms-col-right" data-ani>
          <div
            className="bms-img"
            ref={imgRef}
            style={{ backgroundImage: `url(${visual})` }}
            role="img"
            aria-label="Brand visuals: logo, palette, and UI samples"
          />
          <figcaption className="bms-cap">
            Visual system preview — palette, type, and UI accents
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
