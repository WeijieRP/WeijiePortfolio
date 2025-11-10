// FinalCTA.jsx
import React, { useEffect, useRef } from "react";
import "./cta.css";
import { Link } from "react-router-dom";

export default function FinalCTA({
  id = "final-cta",
  heading = "GeekOut project is to help students find their path",
  tagline = "This started at the GeekOut hackathon. I’m making a simple playlist-style app to share study tips, career paths, and music to focus. Want to build with me or give feedback?",
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/planet-6977161_1920.jpg",
  contactHref = "/contact",
  githubHref = "https://github.com/WebDeveloper1299",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Track scroll direction (down/up)
    const onScroll = () => {
      const y = window.scrollY || 0;
      const dir = y > lastY.current ? "down" : "up";
      root.setAttribute("data-dir", dir);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal on intersection with stagger
    const items = root.querySelectorAll(".fcta-snap");
    items.forEach((el, i) => el.style.setProperty("--i", i.toString()));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
          } else {
            e.target.classList.remove("is-in");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      items.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="fcta-stage" id={id} aria-label="Final call to action">
      {/* Background */}
      <div
        className="fcta-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="fcta-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="fcta-content">
        <h2 className="fcta-heading fcta-snap">{heading}</h2>
        <p className="fcta-tagline fcta-snap">{tagline}</p>

        <div className="fcta-actions fcta-snap">
          <Link to={contactHref} className="fcta-btn fcta-btn--primary">
            Message Me
          </Link>

          <Link
            to={githubHref}
            className="fcta-btn fcta-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Code
          </Link>
        </div>
      </div>
    </section>
  );
}
