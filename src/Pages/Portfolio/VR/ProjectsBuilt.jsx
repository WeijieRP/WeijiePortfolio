// ProjectsBuiltVR.jsx
import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuiltVR() {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  // Track scroll direction and set data-scroll on the section
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
      const root = rootRef.current;
      if (root) root.setAttribute("data-scroll", dirRef.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation (toggle .is-in when intersecting)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = root.querySelectorAll(".vr-card");

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("is-in", e.isIntersecting)),
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: "AR Name Card in Vuforia",
      desc:
        "This is an AR business card. You point your phone at the card. A 3D panel shows your info. You tap to open links. It feels smooth and neat.",
      stack: "Unity · C# · Vuforia · Image Targets · UI Animation",
      img: "/assets/VR_ArtWork/Font.png",
      href: "/portfolio/VR/projectdetail1",
    },
    {
      title: "VR Escape Room",
      desc:
        "This is an immersive puzzle room. You walk or you teleport. You pick up items. You solve each step with clear hints. The world feels calm and amazing.",
      stack: "Unity · XR Interaction Toolkit · Locomotion · Diegetic UI",
      img: "/assets/Screenshot.png",
      href: "/portfolio/VR/projectdetail2",
    },
  ];

  return (
    <section className="vr-section" ref={rootRef} id="vr-projects">
      <div
        className="vr-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("/assets/PortfolioVRBackgroundImage/saturn-7044849_1920.jpg")',
        }}
      />

      <header className="vr-header">
        <h2 className="vr-title-emboss">Projects that I built</h2>
        <p className="vr-subtitle">
          I built two projects in Unity. One is an AR business card. One is a VR escape room. Both focus on clear action and a good feeling.
        </p>
      </header>

      <div className="vr-grid">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="vr-card"
            data-dir={i % 2 === 0 ? "left" : "right"}
          >
            <figure className="vr-media">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
            
              />
            </figure>

            <div className="vr-body">
              <h3 className="vr-name">{p.title}</h3>
              <p className="vr-desc">{p.desc}</p>
              <p className="vr-stack">{p.stack}</p>
              <Link to={p.href} className="vr-btn" aria-label={`View ${p.title}`}>
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
