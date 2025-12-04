// VRHero.jsx
import React from "react";
import "./projectCTA.css";

export default function VRHero({
  id = "vr-hero",
  bgImage = "/assets/PortfolioVRBackgroundImage/moon-8013743_1920.jpg",

  titleTop = "FEATURED",
  titleBottom = "PROJECTS",

  subtitle = "A collection of AR/VR experiences I built — focused on clear interaction, player comfort, and immersive moments.",

  ctaText = "View VR Demo",
  ctaHref = "#vr-demo",

  secondaryText = "View Project Details",
  secondaryHref = "#vr-details",
}) {
  return (
    <section
      className="vr-hero"
      id={id}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="vr-hero-overlay" aria-hidden="true" />

      <div className="vr-hero-content">
        {/* Panel (no blur, just solid color + border) */}
        <div className="vr-panel">
          {/* Title uses global gradient via .title-aurora */}
          <h1 className="vr-title title-aurora">
            <span>{titleTop}</span>
            <br />
            <span>{titleBottom}</span>
          </h1>

          <p className="vr-sub section-subtitle">{subtitle}</p>

          <div className="vr-actions">
            <a href={ctaHref} className="vr-btn vr-btn-primary">
              {ctaText}
            </a>

            <a href={secondaryHref} className="vr-btn vr-btn-secondary">
              {secondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
