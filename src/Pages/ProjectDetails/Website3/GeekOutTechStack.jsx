// TechStackSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/daniel-castellon-MVPisgNA-3Q-unsplash.jpg",
  fallbackImage = "/assets/PortfolioWebProjectDetail3BackgroundImage/daniel-castellon-MVPisgNA-3Q-unsplash.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // Parallax that keeps edges safely covered
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const tick = () => {
      const r = vpRef.current?.getBoundingClientRect();
      if (r && vpRef.current) {
        const vh = innerHeight || 1;
        const enter = vh, leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.06;  // 1 → 1.06
        const ty = (p - 0.5) * 60;         // -30px → +30px
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Direction-aware slide in/out
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;

    const setVars = (el, fromX, fromY, toX, toY, fromScale = 0.96, toScale = 1) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.setProperty("--from-scale", String(fromScale));
      el.style.setProperty("--to-scale", String(toScale));
    };

    const enter = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left")  setVars(el, "-48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      } else {
        if (side === "left")  setVars(el, "48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left")  setVars(el, "0px", "0px", "-46px", "16px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "46px", "16px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left")  setVars(el, "0px", "0px", "46px", "16px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "-46px", "16px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      }
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const targets = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        const dir = dirRef.current;
        entries.forEach((e) => {
          const el = e.target;
          const side = el.getAttribute("data-side") || "center";
          if (e.isIntersecting) enter(el, side, dir);
          else leave(el, side, dir);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 8) * 60}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const stacks = [
    {
      name: "React.js",
      icon: "/assets/Web_Icons/icons8-react-js-48.png",
      use: "Component-based UI for fast interactions, reusable views, and clean state handling.",
      tags: ["SPA", "Hooks", "Reusable UI"],
    },
    {
      name: "Bootstrap",
      icon: "/assets/Web_Icons/icons8-bootstrap-48.png",
      use: "Responsive grid, utilities, and accessible components for forms, tables, and modals.",
      tags: ["Responsive", "Utilities", "A11y"],
    },
    {
      name: "CSS",
      icon: "/assets/Web_Icons/icons8-css-48.png",
      use: "Custom animations, layout polish, and consistent design tokens over the base components.",
      tags: ["Animations", "Variables", "Utility classes"],
    },
    {
      name: "Git",
      icon: "/assets/Web_Icons/icons8-git-48.png",
      use: "Branching strategy (feature → PR → main), commit history, and safe rollbacks.",
      tags: ["Branches", "PRs", "History"],
    },
    {
      name: "GitHub",
      icon: "/assets/Web_Icons/icons8-github-48.png",
      use: "Remote repo, issues, project boards, and CI hooks for build/test pipelines.",
      tags: ["Issues", "Projects", "Actions"],
    },
    {
      name: "Docker",
      icon: "/assets/Web_Icons/icons8-docker-48.png",
      use: "Containerized runtime for consistent dev/prod environments and easy deployment.",
      tags: ["Containers", "Reproducible", "Dev/Prod parity"],
    },
  ];

  return (
    <section className="section-bg tech-section" id={id} aria-label="Tech Stack">
      <div className="tech-viewport" ref={vpRef}>
        {/* Full-bleed background */}
        <div className="bg-wrap" aria-hidden="true">
          <img
            className="bg-img"
            src={imgSrc}
            onError={() => setImgSrc(fallbackImage)}
            alt=""
          />
          <div className="bg-fallback" />
          {/* ⛔️ tint/overlay removed visually via CSS */}
          <div className="bg-tint" />
        </div>

        {/* Content */}
        <div className="tech-content">
          <h2 className="tech-title" data-reveal data-side="center" data-stagger>
            Tech Stack Overview
          </h2>
          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            The core tools powering the app — from interactive UI to versioning and deployment.
          </p>

          <div className="tech-grid" role="list">
            {stacks.map((s, i) => (
              <article
                className="tech-card"
                role="listitem"
                key={i}
                data-reveal
                data-stagger
                data-side={i % 2 === 0 ? "left" : "right"}
              >
                <div className="tech-card-head">
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="tech-card-icon"
                    loading="lazy"
                    width={52}
                    height={52}
                  />
                  <h3 className="tech-card-title">{s.name}</h3>
                </div>
                <p className="tech-card-body">{s.use}</p>
                <div className="tech-card-pills">
                  {s.tags.map((t, j) => (
                    <span className="tech-pill" key={j}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
