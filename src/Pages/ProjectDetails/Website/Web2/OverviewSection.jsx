import React from "react";
import "./overview.css";

export default function OverviewSection({
  id = "overview",
  title = "Overview",
  subtitle = "A fast, modern front-end for small retailers — built to browse, compare, and checkout with minimal friction.",
  bullets = [
    "Built with React 18 + Vite for instant dev and lean bundles.",
    "Responsive 12-column layout across mobile → ultrawide.",
    "Focus on perceived speed: skeletons, prefetch, lazy images.",
  ],
  highlights = [
    { k: "Use Case", v: "Front-End E-Commerce" },
    { k: "Audience", v: "Small brands & indie sellers" },
    { k: "Outcome", v: "Faster browsing, simpler checkout" },
  ],
  image = "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=2000&auto=format&fit=crop",
  imageAlt = "E-commerce product listing preview",
  bgImage = "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2400&auto=format&fit=crop",
}) {
  return (
    <section id={id} className="ov-stage" aria-labelledby={`${id}-title`}>
      {/* Background */}
      <div
        className="ov-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />
      <div className="ov-overlay" aria-hidden="true" />

      <div className="ov-inner">
        <header className="ov-head">
          <h2 id={`${id}-title`} className="ov-title">{title}</h2>
          {subtitle && <p className="ov-sub">{subtitle}</p>}
        </header>

        <div className="ov-grid">
          {/* Left: copy */}
          <div className="ov-left">
            <ul className="ov-bullets">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="ov-highlights">
              {highlights.map((h) => (
                <div className="ov-chip" key={h.k}>
                  <span className="k">{h.k}</span>
                  <span className="v">{h.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <figure className="ov-figure">
            <img src={image} alt={imageAlt} />
            <figcaption className="ov-cap">Product grid + quick view</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
