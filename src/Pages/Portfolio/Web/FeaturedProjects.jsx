import React, { useEffect, useRef } from "react";
import "./featured-projects.css";
import { Link } from "react-router-dom";

export default function FeaturedWeb() {
  const secRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  // track scroll direction for directional slide
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const dir = y > lastY.current ? "down" : "up";
      lastY.current = y;
      root.setAttribute("data-scroll", dir);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // parallax bg + fog
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const bg = el.querySelector(".fd-bg");
    const fog = el.querySelector(".fd-fog");

    const onScroll = () => {
      const y = window.scrollY || 0;
      const s = 1.03 + y * 0.00012;
      if (bg) {
        bg.style.transform = `translateY(${y * 0.14}px) scale(${s.toFixed(3)})`;
      }
      if (fog) {
        fog.style.transform = `translateY(${y * 0.08}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal cards
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll(".min-card")];

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.18, rootMargin: "0px 0px -4% 0px" }
    );

    cards.forEach((c, i) => {
      c.style.setProperty("--stagger", `${80 + (i % 4) * 70}ms`);
      io.observe(c);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="fd-min" id="projects" ref={secRef}>
      {/* Background layers */}
      <div
        className="fd-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("/assets/PortfolioWebBackgroundImage/nature-4649796.jpg")',
        }}
      />
      <div className="fd-vignette" aria-hidden="true" />
      <div className="fd-stars" aria-hidden="true" />
      <div className="fd-fog" aria-hidden="true" />

      <header className="fd-head">
        {/* Glass wrapper for title + subtitle */}
        <div className="fd-headpanel" role="group" aria-label="Featured web header">
          {/* h2 + .title-aurora uses global gradient from styles.css */}
          <h2 className="fd-title title-aurora">Web Projects I’ve Built</h2>
          <p className="fd-sub section-subtitle">
            Focused builds I shipped to solve real problems—fast, clear, and reliable.
          </p>
        </div>
      </header>

      <div className="fd-cards">
        {/* 1 — left: Music Playlist Tracker */}
        <article className="min-card" data-dir="left" tabIndex={0}>
          <img
            className="min-img"
            src="/assets/Music.png"
            alt="Music Playlist Tracker interface"
            loading="lazy"
          />
          <div className="min-top">
            <span className="min-badge">Web • Node</span>
            <h3 className="min-title">I built a fast Music Playlist Tracker</h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              I built this to help users create, save, and manage playlists quickly with
              snappy CRUD and a responsive, no-friction UI.
            </p>
            <div className="min-tags">
              <span>Node</span>
              <span>HTML</span>
              <span>CSS</span>
            </div>
            <Link to="/portfolio/web/projectdetail2" className="min-btn">
              View Case Study
            </Link>
          </div>
        </article>

        {/* 2 — right: CCA Tracker */}
        <article className="min-card needs-contrast" data-dir="right" tabIndex={0}>
          <img
            className="min-img"
            src="/assets/CA2_Tracker.png"
            alt="CCA Tracker system dashboard"
            loading="lazy"
          />
          <div className="min-top">
            <span className="min-badge">Full-stack</span>
            <h3 className="min-title">I built a CCA Tracker for schools</h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              I built this to streamline CCA operations—role-based access, sessions, and
              attendance tracking with secure server-side templates.
            </p>
            <div className="min-tags">
              <span>Express</span>
              <span>MySQL</span>
              <span>EJS</span>
            </div>
            <Link to="/portfolio/web/projectdetail1" className="min-btn">
              View Case Study
            </Link>
          </div>
        </article>

        {/* 3 — full width: Project Foresight */}
        <article
          className="min-card span-full needs-crop"
          data-dir="center"
          tabIndex={0}
        >
          <img
            className="min-img"
            src="/assets/projectForesight.png"
            alt="Project Foresight course exploration UI"
            loading="lazy"
          />
          <div className="min-top">
            <span className="min-badge">Hackathon</span>
            <h3 className="min-title">
              I built Project Foresight to guide course choices
            </h3>
          </div>

          <div className="min-overlay">
            <p className="min-desc">
              I built this during Geekout 2025 to help students explore courses with
              AI-assisted comparisons—React front-end, containerized services for smooth
              deploys.
            </p>
            <div className="min-tags">
              <span>React</span>
              <span>Docker</span>
              <span>API</span>
            </div>
            <Link to="/portfolio/web/projectdetail3" className="min-btn">
              View Case Study
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
