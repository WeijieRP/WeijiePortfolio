// FinalCTA.jsx
import React, { useEffect, useRef } from "react";
import "./cta.css";
import { Link } from "react-router-dom";

export default function FinalCTA({
  id = "final-cta",

  // ✨ BrandMe version (simple English)
  heading = "Like my BrandMe identity? Want to build it further together?",
  tagline = "I designed a clean, soft-glow brand system — logo, colors, type, and a 4-page portfolio (Home, Work, About, Contact). If you’ve got ideas or feedback, let’s iterate and make it even better.",

  // Swap to any BrandMe-themed background image you have
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/planet-6977161_1920.jpg",

  contactHref = "/contact",
  githubHref = "https://github.com/WebDeveloper1299",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1) Track scroll direction (down/up)
    const onScroll = () => {
      const y = window.scrollY || 0;
      const dir = y > lastY.current ? "down" : "up";
      root.setAttribute("data-dir", dir);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 2) Reveal on intersection with stagger
    const items = root.querySelectorAll(".fcta-snap");
    items.forEach((el, i) => el.style.setProperty("--i", i.toString()));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
          else e.target.classList.remove("is-in"); // allows slide-out based on direction
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
    <section
      ref={rootRef}
      className="fcta-stage"
      id={id}
      aria-label="Final call to action"
    >
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
            Collaborate with Me
          </Link>

          <Link
            to={githubHref}
            className="fcta-btn fcta-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            View BrandMe Repo
          </Link>
        </div>
      </div>
    </section>
  );
}
