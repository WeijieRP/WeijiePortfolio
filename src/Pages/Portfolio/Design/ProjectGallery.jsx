// FeaturedDesigns.jsx
import React, { useEffect, useRef } from "react";
import "./project-gallery.css";
import { Link } from "react-router-dom";

export default function FeaturedDesigns() {
  const secRef = useRef(null);

  // Gentle parallax + scroll direction
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

      const last = Number(el.getAttribute("data-lasty") || 0);
      el.setAttribute("data-scroll", y > last ? "down" : "up");
      el.setAttribute("data-lasty", String(y));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection reveal
  useEffect(() => {
    const root = secRef.current;
    if (!root) return;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const cards = root.querySelectorAll(".min-card");

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.22, rootMargin: "0px 0px -4% 0px" }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="fd-min" id="projects" ref={secRef}>
      {/* background layers */}
      <div
        className="fd-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("/assets/PortfolioDesignBackgroundImage/astronomy-3216966_1920.jpg")',
        }}
      />
      <div className="fd-vignette" aria-hidden="true" />
      <div className="fd-stars" aria-hidden="true" />
      <div className="fd-fog" aria-hidden="true" />

      <header className="fd-head">
        {/* 🔹 No glass panel – just title + subtitle */}
        <h2 className="title-aurora">
          Featured <span>Design</span>
        </h2>
        <p className="section-subtitle">
          Here is an overview of my design projects.
        </p>
      </header>

      <div className="fd-cards">
        {/* Card 1 — left */}
        <article
          className="min-card"
          data-dir="left"
          tabIndex={0}
          aria-labelledby="vw-title"
        >
          <img
            className="min-img"
            src="/assets/L06WeijieEDM-1.png"
            alt="Creative design collection preview"
            loading="lazy"
          />

          <div className="min-top">
            <span className="min-badge">Creative Collection</span>
            <h3 id="vw-title" className="min-title">
              A Creative Design Collection
            </h3>
          </div>

          <div className="min-info">
            <p className="min-desc">
              Posters, 3×3 social grid, moodboard, EDM layout, typography
              studies, and character explorations.
            </p>
            <div className="min-tags">
              <span>Posters</span>
              <span>Characters</span>
              <span>Typography</span>
            </div>
            <Link
              to={"/portfolio/design/projectdetail2"}
              className="min-link"
            >
              View Project
            </Link>
          </div>
        </article>

        {/* Card 2 — right */}
        <article
          className="min-card"
          data-dir="right"
          tabIndex={0}
          aria-labelledby="brand-title"
        >
          <img
            className="min-img"
            src="/assets/Artwork/Digital_Banner.png"
            alt="BrandMe identity banner"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop";
            }}
          />

          <div className="min-top">
            <span className="min-badge">Identity</span>
            <h3 id="brand-title" className="min-title">
              BrandMe Visual Identity
            </h3>
          </div>

          <div className="min-info">
            <p className="min-desc">
              Logo construction, palette, type scale, and digital banner—rules
              for a consistent, confident presence.
            </p>
            <div className="min-tags">
              <span>System</span>
              <span>Consistency</span>
              <span>Grid</span>
            </div>
            <Link
              to={"/portfolio/design/projectdetail1"}
              className="min-link"
            >
              View Project
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
