// FinalCTA.jsx — XR collaboration copy, same fcta-* structure & animations
import React, { useEffect, useRef } from "react";
import "./cta.css";
import { Link } from "react-router-dom";

export default function FinalCTA({
  id = "final-cta",

  // ✅ New copy
  heading = "Let’s Create Immersive Worlds Together",
  tagline =
    "I design and build immersive XR experiences — from emotional spaces and diegetic UI to hand-based interaction and puzzle logic in Unity. If you're exploring VR, AR, or real-time 3D storytelling, I'd love to collaborate.",

  // Background
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/planet-6977161_1920.jpg",

  // Buttons (renamed to match your spec)
  primaryHref = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  secondaryHref = "https://github.com/WebDeveloper1299",
  primaryLabel = "Connect with Me",
  secondaryLabel = "View Github",
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

    // 2) Reveal on intersection with stagger — keep your exact fcta-* hooks
    const items = root.querySelectorAll(".fcta-snap");
    items.forEach((el, i) => el.style.setProperty("--i", i.toString()));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
          else e.target.classList.remove("is-in");
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

  // Helper: render Link for internal routes, <a> for external
  const SmartButton = ({ to, className, children }) => {
    const isExternal = /^https?:\/\//i.test(to || "");
    return isExternal ? (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link to={to || "#"} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <section ref={rootRef} className="fcta-stage" id={id} aria-label="Final call to action">
      {/* Background */}
      <div
        className="fcta-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="fcta-overlay" aria-hidden="true" />

      {/* Content (same structure/classes) */}
      <div className="fcta-content">
        <h2 className="fcta-heading fcta-snap">{heading}</h2>
        <p className="fcta-tagline fcta-snap">{tagline}</p>

        <div className="fcta-actions fcta-snap">
          <SmartButton to={primaryHref} className="fcta-btn fcta-btn--primary">
            {primaryLabel}
          </SmartButton>

          <SmartButton to={secondaryHref} className="fcta-btn fcta-btn--ghost">
            {secondaryLabel}
          </SmartButton>
        </div>
      </div>
    </section>
  );
}
