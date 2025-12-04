import React, { useEffect, useRef } from "react";
import "./herosection.css";

export default function PortfolioHero({
  id = "c237-hero",
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-5858658_1920.jpg",

  title = "CCA Tracker",
  subtitle = "A role-based web app for Co-Curricular Activities; students can view CCAs and schedules, teachers can create CCAs, manage sessions and attendance, and admins handle user roles, approvals, and platform settings. Built with Node.js, Express, EJS, MySQL, Bootstrap.",

  primaryBtn = "Open Live Demo",
  primaryLink = "#demo",
  secondaryBtn = "View GitHub Repo",
  secondaryLink = "#github",
}) {
  const bgRef = useRef(null);

  // Background parallax (content never scaled → stays sharp)
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const p = clamp(y / (vh * 2), 0, 1);
        const eased = p * (2 - p);
        const scale = 1.04 + eased * 0.12;
        const ty = eased * 18;
        el.style.setProperty("--bg-scale", String(scale));
        el.style.setProperty("--bg-ty", `${ty}px`);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Simple reveal for glass panel
  useEffect(() => {
    const section = document.getElementById(id);
    const targets = section?.querySelectorAll("[data-reveal]");
    if (!targets?.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-shown", e.isIntersecting)
        ),
      { threshold: 0.08, rootMargin: "-20% 0px -20% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [id]);

  return (
    <section className="bm-hero" id={id}>
      <div
        className="bm-hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="bm-hero-overlay" aria-hidden="true" />

      <div className="bm-hero-inner">
        {/* Single glass panel with title + subtitle + buttons */}
        <div className="bm-panel" data-reveal>
          {/* h1 can still use global gradient styles */}
          <h1 className="bm-title">
            <span>{title}</span>
          </h1>

          <p className="bm-sub">
            <span>{subtitle}</span>
          </p>

          <div className="bm-ctas">
            <a className="bm-btn bm-primary" href={primaryLink}>
              {primaryBtn}
            </a>
            <a className="bm-btn bm-outline" href={secondaryLink}>
              {secondaryBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
