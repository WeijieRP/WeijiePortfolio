import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt({
  bgImage = "/assets/PortfolioDesignBackgroundImage/moon-7406604_1920.jpg", // section background
}) {
  const rootRef = useRef(null);

  // Set background image
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--pg-bg", `url("${bgImage}")`);
  }, [bgImage]);

  // Track scroll direction (for smooth reveal)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY ? "down" : "up");
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const cards = root.querySelectorAll(".pg-card");
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-in", e.isIntersecting)),
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Projects (simple human tone)
  const projects = [
    {
      title: "Visual Worlds & Storyscapes",
      desc:
        "I designed a creative set of travel posters, characters, and type studies that tell one story. It shows how I use colour and layout to guide emotion.",
      img: "/assets/L06WeijieEDM-1.png",
      href: "/portfolio/design/projectdetail2",
      cta: "View Project",
      fit: "cover",
      tag: "Creative Collection",
    },
    {
      title: "BrandMe — Visual Identity",
      desc:
        "I built my personal brand from scratch: logo system, colours, type scale, and banners. The aim was a clean, consistent look across all screens.",
      img: "/assets/Artwork/Digital_Banner.png",
      href: "/portfolio/design/projectdetail1",
      cta: "View Project",
      fit: "cover",
      tag: "Identity Design",
    },
  ];

  return (
    <section className="pg-section" ref={rootRef} id="design-projects">
      <div className="pg-bg" aria-hidden="true" />

      <header className="pg-header">
        <h2 className="pg-title">Design Projects I’ve Built</h2>
        <p className="pg-subtitle">
          A simple showcase of design work I created — branding, visual stories, and identity pieces made to be clear and usable.
        </p>
      </header>

      <div className="pg-grid-2x2">
        {projects.map((p, i) => {
          const dir = i % 2 === 0 ? "left" : "right";
          return (
            <article key={p.title} className="pg-card" data-dir={dir}>
              <figure className="pg-media" data-fit={p.fit || "cover"}>
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
