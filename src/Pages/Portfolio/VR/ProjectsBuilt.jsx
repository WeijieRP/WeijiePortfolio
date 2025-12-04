// ProjectsBuiltVR.jsx — VR projects section
import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuiltVR() {
  const rootRef = useRef(null);
  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const dirRef = useRef("down");

  // Track scroll direction -> data-scroll="up|down"
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

  // Reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".vr-card");
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

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
      title: "AR Name Card in Vuforia",
      desc:
        "An AR business card where a 3D panel appears when you point the camera at it. It shows key info with smooth motion and tappable links.",
      stack: "Unity · C# · Vuforia · Image Targets · UI Animation",
      img: "/assets/VR_ArtWork/Font.png",
      href: "/portfolio/VR/projectdetail1",
    },
    {
      title: "VR Escape Room",
      desc:
        "A calm VR puzzle room built for new players. You move, pick up items, and solve each step with clear hints and readable cues.",
      stack: "Unity · XR Interaction Toolkit · Locomotion · Diegetic UI",
      img: "/assets/Screenshot.png",
      href: "/portfolio/VR/projectdetail2",
    },
  ];

  return (
    <section
      className="vr-section"
      ref={rootRef}
      id="vr-projects"
    >
      <div
        className="vr-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("/assets/PortfolioVRBackgroundImage/saturn-7044849_1920.jpg")',
        }}
      />

      <header className="vr-header">
        {/* Glass panel wraps title + subtitle */}
        <div
          className="vr-headpanel"
          role="group"
          aria-label="VR projects overview"
        >
          <h2 className="">
            VR &amp; AR Projects I’ve Built
          </h2>
          <p className="vr-subtitle">
            These Unity projects explore AR image targets and VR escape
            spaces, with a focus on clear actions, comfort, and a smooth
            first-time experience.
          </p>
        </div>
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
              <Link
                to={p.href}
                className="vr-btn"
                aria-label={`View ${p.title}`}
              >
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
