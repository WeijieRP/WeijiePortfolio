// BrandMeSolution.jsx
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "ar-solution",
  sectionBg = "/assets/PortfolioVRProjectDetails1BackgroundImage/bhautik-patel-MqSkaMxfJQ0-unsplash.jpg",
  visual = "/assets/VR_ArtWork/Font.png",

  eyebrow = "Solution",
  title = "AR Name Card — Simple, Solid Solution",
  description = [
    "I designed a normal business card first with the logo, name, title, and contact details as the main focus, so it works in real life. Then I added AR using Vuforia, so the card gets recognised fast and a small 3D element pops up on top.I kept the AR subtle and believable choosing strong visual features for tracking, using smooth animation, and matching the lighting so it feels natural on a phone."
  ],
}) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting)),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll("[data-ani]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) return;
    const onScroll = () => {
      const y = (window.scrollY || 0) * 0.08;
      if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
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
      aria-label="AR Name Card — Solution Overview"
    >
      {/* overlay removed to let the background stand out */}

      <div className="bms-inner bms-balance">
        {/* LEFT: glass copy card */}
        <article className="bms-card slide-left" data-ani>
          <p className="bms-eyebrow">{eyebrow}</p>
          <h2 className="bms-title">{title}</h2>
          <div className="bms-desc">
            {description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        {/* RIGHT: image fills light card */}
        <figure className="bms-figure slide-right" data-ani>
          <div className="bms-lightcard">
            <img
              ref={imgRef}
              className="bms-media fill-mode"
              src={visual}
              alt="AR name card visual"
            />
          </div>
          <figcaption className="bms-cap">AR Name Card preview</figcaption>
        </figure>
      </div>
    </section>
  );
}
