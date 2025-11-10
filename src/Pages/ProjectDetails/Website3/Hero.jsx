import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function ForesightHero({
  id = "foresight-hero",
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/super-5017901.jpg",

  eyebrow = "Geekout 2025 — Project Foresight",
  title = "Choose a Course with Confidence",
  subtitle = "Take a short quiz, get course matches, read plain-English pages, and talk to real mentors. Compare options side-by-side and decide with confidence.",

  primaryText = "Try the Quiz",
  primaryHref = "https://nofuturemain.netlify.app/",
  secondaryText = "Explore the Solution",
  secondaryHref = "#solution",
}) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  // Parallax (unchanged)
  useEffect(() => {
    const onScroll = () => {
      const y = (window.scrollY || 0) * 0.12;
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reveal (unchanged)
  useEffect(() => {
    const root = document.querySelector(`#${id}`);
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-shown", e.isIntersecting)),
      { threshold: 0.05, rootMargin: "-20% 0px -20% 0px" }
    );
    els.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [id]);

  return (
    <section className="fs-hero" id={id} ref={sectionRef} aria-label="Project Foresight hero">
      <div className="fs-bg" ref={bgRef} style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true" />
      <div className="fs-stars" aria-hidden="true" />
      <div className="fs-overlay" aria-hidden="true" />

      <div className="fs-inner fs-no-blur">
        <header className="fs-head fs-no-blur">
          <p className="fs-eyebrow" data-reveal>{eyebrow}</p>
          <h1 className="fs-title" data-reveal>{title}</h1>
          <p className="fs-sub" data-reveal>{subtitle}</p>

          <div className="fs-ctas" data-reveal role="group" aria-label="Hero actions">
            <a className="fs-btn" href={primaryHref}>{primaryText}</a>
            <a className="fs-btn ghost" href={secondaryHref}>{secondaryText}</a>
          </div>
        </header>
      </div>
    </section>
  );
}
