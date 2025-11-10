import React, { useEffect, useRef } from "react";
import "./showcase.css";

export default function ArcMobileShowcase({
  // Background
  bgImage = "/assets/PortfolioMobileProjectDetails1BackgroundImage/chamfjord-muUX3rENBX0-unsplash.jpg",

  // Right column text (wrapped in a glass card)
  title = "Mobile Demo — GPA Tracker",
  description = "This is a short demo video showcase of the GPA Tracker app, recorded directly from a phone screen to show how the interface looks and feels in action.",

  // Media (portrait)
  videoSrc = "/assets/Moblie/GPAMobile.mp4",
  poster = "/assets/demo/gpa_poster.jpg",

  // Video settings (kept as provided)
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
}) {
  const sectionRef = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // track scroll direction (kept as your flavor)
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // intersection-based slide in/out (LEFT/RIGHT only)
    const nodes = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.add("is-in");
            el.classList.remove("is-out");
          } else {
            el.classList.remove("is-in");
            el.classList.add("is-out");
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    nodes.forEach((n) => io.observe(n));

    return () => {
      window.removeEventListener("scroll", onScroll);
      nodes.forEach((n) => io.unobserve(n));
    };
  }, []);

  return (
    <section className="arc-section" ref={sectionRef}>
      {/* Background */}
      <div className="arc-bg" aria-hidden="true">
        <img className="arc-bg-img" src={bgImage} alt="" />
        <div className="arc-overlay" />
      </div>

      {/* Split layout */}
      <div className="arc-grid">
        {/* LEFT: Phone with inline video (slides from LEFT) */}
        <div className="arc-left reveal from-left" data-reveal>
          <div className="phone" aria-label="Mobile device preview">
            <div className="phone-bezel phone-bezel--wrap phone--tall">
              {/* Side buttons */}
              <span className="btn-side btn-vol-up" />
              <span className="btn-side btn-vol-down" />
              <span className="btn-side btn-power" />
              {/* Notch */}
              <div className="phone-notch">
                <span className="phone-speaker" />
                <span className="phone-camera" />
              </div>
              {/* Natural-size portrait video */}
              <video
                className="phone-screen phone-screen--natural"
                src={videoSrc}
                poster={poster}
                playsInline
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                controls={controls}
                preload="metadata"
              />
            </div>
          </div>
          <p className="arc-caption">A closer look at the app running on mobile.</p>
        </div>

        {/* RIGHT: Glass card with title + description (slides from RIGHT) */}
        <div className="arc-right reveal from-right" data-reveal>
          <div className="glass-card">
            <h2 className="arc-title">{title}</h2>
            <p className="arc-sub">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
