// ProjectsBuilt.jsx
import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt({
  bgImage = "/assets/PortfolioDesignBackgroundImage/moon-7406604_1920.jpg",
}) {
  const rootRef = useRef(null);

  // Set background
  useEffect(() => {
    const root = rootRef.current;
    if (root) root.style.setProperty("--pg-bg", `url("${bgImage}")`);
  }, [bgImage]);

  // Track scroll direction
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.dataset.scroll = y > lastY ? "down" : "up";
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal cards
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const cards = root.querySelectorAll(".pg-card");

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: "Visual Worlds & Storyscapes",
      desc:
        "A creative set of travel posters, characters, and type studies that connect colour and layout to emotion.",
      img: "/assets/L06WeijieEDM-1.png",
      href: "/portfolio/design/projectdetail2",
      cta: "View Project",
      tag: "Creative Collection",
    },
    {
      title: "BrandMe — Visual Identity",
      desc:
        "Built my personal brand from scratch: logo system, palette, and layout rules for consistent digital presence.",
      img: "/assets/Artwork/Digital_Banner.png",
      href: "/portfolio/design/projectdetail1",
      cta: "View Project",
      tag: "Identity Design",
    },
  ];

  return (
    <section className="pg-section" ref={rootRef} id="design-projects">
      <div className="pg-bg" aria-hidden="true" />

      <header className="pg-header">
        <h2 className="pg-title title-aurora">Design Projects I’ve Built</h2>
        <p className="pg-subtitle section-subtitle">
          A clean showcase of branding, visual stories, and identity design —
          each crafted for clarity and usability.
        </p>
      </header>

      <div className="pg-grid-2x2">
        {projects.map((p, i) => {
          const dir = i % 2 === 0 ? "left" : "right";
          return (
            <article key={p.title} className="pg-card" data-dir={dir}>
              <figure className="pg-media">
                <img src={p.img} alt={p.title} loading="lazy" />
              </figure>

              <div className="pg-body">
                <span className="pg-tag">{p.tag}</span>
                <h3 className="pg-card-title">{p.title}</h3>
                <p className="pg-card-desc">{p.desc}</p>
                <Link to={p.href} className="pg-btn">
                  {p.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
