// ProjectsBuilt.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const TAGS = ["All", "Web", "Design", "VR", "Mobile"];

const PROJECTS = [
  {
    title: "Music Playlist Tracker",
    desc: "Spotify-style web app built with Node.js, Express, and EJS—CRUD for playlists/tracks with auth and a responsive UI.",
    img: "/assets/Music.png",
    href: "/portfolio/web/projectdetail2",
    tags: ["Web"],
  },
  {
    title: "CCA Tracker System",
    desc: "Role-based activity tracker using Node.js + MySQL—secure login, granular permissions, and streamlined CRUD workflows.",
    img: "/assets/CA2_Tracker.png",
    href: "/portfolio/web/projectdetail1",
    tags: ["Web"],
  },
  {
    title: "Project Foresight",
    desc: "React app for CCA guidance, containerized with Docker—clean navigation, reusable components, and easy deployment.",
    img: "/assets/projectForesight.png",
    href: "/portfolio/web/projectdetail3",
    tags: ["Web"],
  },
  {
    title: "BrandMe — Identity",
    desc: "Complete brand system designed in Illustrator—logo suite, color tokens, typography, and social/slide templates.",
    img: "/assets/Artwork/Digital_Banner.png",
    href: "/portfolio/design/projectdetail2",
    tags: ["Design"],
  },
  {
    title: "Escape Archive VR",
    desc: "Unity VR escape room with hand tracking—paced puzzles, diegetic UI, and an atmospheric, guided narrative.",
    img: "/assets/Screenshot.png",
    href: "/portfolio/VR/projectdetail2",
    tags: ["VR"],
  },
  {
    title: "VR image card",
    desc: "Key art from the VR project—entrance room composition, lighting, and tone showcased in high resolution.",
    img: "/assets/VR_ArtWork/Font.png",
    href: "/portfolio/VR/projectdetail1",
    tags: ["VR"],
  },
  {
    title: "GPA Tracker — Mobile",
    desc: "Flutter + Dart GPA calculator—lightweight mobile app for quick GPA inputs, instant results, and offline accessibility.",
    img: "/assets/Moblie/MobileView1.png",
    href: "/portfolio/Mobile/projectdetail1",
    tags: ["Mobile"],
  },
 
  {
    title: "Concept Design — Dashboard System",
    desc: "Exploratory UI/UX concept: multi-platform dashboard with component library, design tokens, and responsive layouts.",
    img: "/assets/files/L06WeijieEDM-1.png",
    href: "/portfolio/design/projectdetail2",
    tags: ["Design"],
  },
];

export default function ProjectsBuilt() {
  const sectionRef = useRef(null);
  const [tag, setTag] = useState("All");

  const filtered = useMemo(
    () => (tag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(tag))),
    [tag]
  );

  // Track scroll direction for entrance animation
  useEffect(() => {
    const root = sectionRef.current;
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

  // Mark cards as visible when they intersect
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".pb-card"));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("is-in", e.isIntersecting);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <section
      className="pb-section slide-dir"
      ref={sectionRef}
      id="projects"
      style={{
        backgroundImage:
          "url('/assets/PortfolioBackgroundImage/8723799.png')",
      }}
    >
      <header className="pb-header">
        {/* One glass panel: title + subtitle + pills */}
        <div className="pb-headpanel">
          <h2 className="pb-title">Projects I’ve Built</h2>
          <p className="pb-sub">
            Clear, readable overlay on every card — no hover needed.
          </p>

          <div
            className="pb-filters"
            role="tablist"
            aria-label="Project categories"
          >
            {TAGS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tag === t}
                className={`pb-chip ${tag === t ? "is-active" : ""}`}
                onClick={() => setTag(t)}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pb-grid">
        {filtered.map((p, i) => {
          const dir = i % 2 === 0 ? "left" : "right";
          const isLast = i === filtered.length - 1;
          const shouldSpanFull =
            isLast && filtered.length >= 3 && filtered.length % 2 === 1;

          return (
            <article
              key={p.title}
              className={`pb-card ${shouldSpanFull ? "pb-card-full" : ""}`}
              data-dir={dir}
              tabIndex={0}
            >
              <img
                className="pb-img"
                src={p.img}
                alt={p.title}
                loading={i < 2 ? "eager" : "lazy"}
              />

              {/* Always-visible overlay */}
              <div className="pb-overlay pb-overlay--always">
                <div className="pb-meta pb-meta--always">
                  <h3 className="pb-name">{p.title}</h3>
                  <p className="pb-desc">{p.desc}</p>
                  <ul className="pb-tags" aria-label="Categories">
                    {p.tags.map((t) => (
                      <li className="pb-tag" key={t}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.href} className="pb-cta">
                    View Case Study
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="pb-empty">No projects found.</p>
        )}
      </div>
    </section>
  );
}
