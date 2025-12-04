// ProjectsBuilt.jsx
import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt() {
  const rootRef = useRef(null);

  const PRIMARY_BG = "/assets/PortfolioWebBackgroundImage/swiss-alps-8216616.jpg";
  const FALLBACK_BG = "/assets/PortfolioWebBackgroundImage/swiss-alps-8216616.jpg";

  // Set section background with preloaded fallback
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setBG = (url) => root.style.setProperty("--pg-bg", `url("${url}")`);

    const img = new Image();
    img.onload = () => setBG(PRIMARY_BG);
    img.onerror = () => setBG(FALLBACK_BG);
    img.src = PRIMARY_BG;
  }, []);

  // Track scroll direction (adds data-scroll="up|down" on the section)
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

  // Reveal cards on intersect (toggle .is-in)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".pg-card");
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.18 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Projects
  const projects = [
    {
      title: "I built a Music Playlist Tracker",
      desc:
        "A simple Spotify-style web app I coded to create, search, and organise playlists. It’s fast, clean, and focuses on the core flow of adding tracks you love. Stack: Node.js + Express.",
      img: "/assets/Music.png",
      link: "/portfolio/web/projectdetail2",
      fit: "cover",
    },
    {
      title: "I designed a CCA Tracker for schools",
      desc:
        "A role-based system I shipped to help teachers and leaders manage CCAs—members, attendance, and activities—in one place. Built with Node.js + MySQL + Bootstrap.",
      img: "/assets/CA2_Tracker.png",
      link: "/portfolio/web/projectdetail1",
      fit: "cover",
    },
    {
      title: "I co-created Project Foresight",
      desc:
        "A guidance platform from GeekOut Hackathon that helps students pick a CCA wisely using interests and outcomes. I handled the UX and front end in React, with Docker and Git for delivery.",
      img: "/assets/projectForesight.png",
      link: "/portfolio/web/projectdetail3",
      fit: "cover",
    },
  ];

  const isOdd = projects.length % 2 === 1;

  return (
    <section className="pg-section" ref={rootRef} id="projects">
      <div className="pg-bg" aria-hidden="true" />

      {/* HEADER – NO GLASS WRAPPER */}
      <header className="pg-header">
        <h2 className="pg-title title-aurora">Web Projects I’ve Built</h2>

        <p className="pg-subtitle section-subtitle">
          Practical tools and school projects I designed, coded, and shipped.
        </p>
      </header>

      {/* GRID */}
      <div className="pg-grid pg-grid-2x2">
        {projects.map((p, i) => {
          const spanFull = isOdd && i === projects.length - 1; // last odd spans full width
          const dir = spanFull ? "center" : i % 2 === 0 ? "left" : "right";

          return (
            <article
              className={`pg-card${spanFull ? " span-full" : ""}`}
              data-dir={dir}
              key={p.title}
            >
              {/* Media */}
              <figure className="pg-media" data-fit={p.fit || "cover"}>
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_BG;
                  }}
                />
              </figure>

              {/* Body */}
              <div className="pg-body">
                <h3 className="pg-card-title">{p.title}</h3>
                <p className="pg-card-desc">{p.desc}</p>
                <Link to={p.link} className="pg-btn">
                  View case study
                </Link>
              </div>
            </article>
          );
        })}

        {projects.length === 0 && (
          <p className="pg-empty section-subtitle">No projects yet.</p>
        )}
      </div>
    </section>
  );
}
