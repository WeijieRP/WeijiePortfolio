// TechStackSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./stack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-3199541_1920.jpg",
  fallbackImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-3199541_1920.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // Soft parallax background using global body-bg vibe
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const tick = () => {
      const rect = vpRef.current?.getBoundingClientRect();
      if (rect && vpRef.current) {
        const vh = window.innerHeight || 1;
        const enter = vh;
        const leave = -rect.height;
        const p = clamp((enter - rect.top) / (enter - leave), 0, 1);

        const d = Math.abs(p - 0.5) / 0.5; // 0 at center
        const scale = 1 + (1 - d) * 0.02;  // 1 → 1.02
        const ty = (p - 0.5) * 30;         // -15 → 15

        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stacks = [
    {
      name: "Node.js",
      icon: "/assets/Web_Icons/icons8-node-js-96.png",
      use: "Runtime for backend routing, logic, and middleware.",
    },
    {
      name: "Express.js",
      icon: "/assets/Web_Icons/icons8-express-js-48.png",
      use: "Framework for routes, authentication, and CRUD APIs.",
    },
    {
      name: "MySQL",
      icon: "/assets/Web_Icons/icons8-mysql-48.png",
      use: "Relational database for users/resources with SQL search.",
    },
    {
      name: "EJS",
      icon: "/assets/Web_Icons/icons8-ejs-48.png",
      use: "Server-side templating for dynamic HTML rendering.",
    },
    {
      name: "Bootstrap",
      icon: "/assets/Web_Icons/icons8-bootstrap-48.png",
      use: "Responsive forms, tables, and layout utilities.",
    },
    {
      name: "GitHub",
      icon: "/assets/Web_Icons/icons8-github-96.png",
      use: "Version control & collaboration; Week-12 ready.",
    },
    {
      name: "Render",
      icon: "/assets/Web_Icons/icons8-website-90.png",
      use: "Cloud deploy for app + live demo URL.",
    },
  ];

  return (
    <section
      className="stack-stage"
      id={id}
      aria-label="Tech Stack"
    >
      <div className="tech-viewport" ref={vpRef}>
        {/* Background */}
        <div className="stack-bg-wrap" aria-hidden="true">
          <img
            className="stack-bg-img"
            src={imgSrc}
            onError={() => setImgSrc(fallbackImage)}
            alt=""
          />
          <div className="stack-bg-fallback" />
          <div className="stack-bg-tint" />
        </div>

        {/* Content */}
        <div className="tech-content">
          {/* Title + subtitle glass, using global heading + subtitle styles */}
          <div className="glass-head">
            <h2 className="title-aurora stack-title">
              Tech Stack Overview
            </h2>
            <p className="section-subtitle stack-sub">
              The full-stack tools that power this web app — backend, database,
              UI, and deployment.
            </p>
          </div>

          <div className="tech-grid" role="list">
            {stacks.map((s) => (
              <article className="tech-card" role="listitem" key={s.name}>
                <div className="tech-card-head">
                  <img src={s.icon} alt={s.name} className="tech-card-icon" />
                  <h3 className="tech-card-title">{s.name}</h3>
                </div>
                <p className="tech-card-body">{s.use}</p>
                <div className="tech-card-pills">
                  <span className="tech-pill">Stable</span>
                  <span className="tech-pill ghost">Production</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
