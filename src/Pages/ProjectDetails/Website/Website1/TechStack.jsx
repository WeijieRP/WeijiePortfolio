import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/time-CvYgWHSE6MU-unsplash.jpg",
  fallbackImage = "/assets/PortfolioWebProjectDetail2BackgroundImage/time-CvYgWHSE6MU-unsplash.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

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
        const scale = 1 + (1 - d) * 0.06;
        const ty = (p - 0.5) * 60;
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
        if (side === "left") setVars(el, "-48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-46px", "16px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "46px", "16px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left") setVars(el, "0px", "0px", "46px", "16px", 1, 0.96);
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
    { name: "Dribbble",  icon: "/assets/Icons/icons8-dribble-96.png",  use: "UI/UX inspiration & benchmarking for clean, modern interfaces.", pills: ["Inspiration", "UI/UX"] },
    { name: "Node.js",   icon: "/assets/Web_Icons/icons8-node-js-96.png", use: "Backend runtime for routing, basic logic, and form handling.",   pills: ["Backend", "Runtime"] },
    { name: "JavaScript",icon: "/assets/Web_Icons/icons8-javascript-48.png", use: "Core scripting for interactivity and client-side enhancements.", pills: ["ESNext", "Client"] },
    { name: "HTML5",     icon: "/assets/Web_Icons/icons8-html5-48.png",  use: "Semantic page structure for accessibility and SEO.",               pills: ["Semantic", "Markup"] },
    { name: "CSS3",      icon: "/assets/Web_Icons/icons8-css-48.png",    use: "Layout, theming variables, and responsive design system.",         pills: ["Responsive", "Design"] },
    { name: "Bootstrap", icon: "/assets/Web_Icons/icons8-bootstrap-48.png", use: "Rapid, consistent UI with grid, tables, and form components.",  pills: ["Components", "Grid"] },
    { name: "GitHub",    icon: "/assets/Web_Icons/icons8-github-48.png", use: "Version control, issues, and project collaboration.",              pills: ["VCS", "Collab"] },
  ];

  return (
    <section className="section-bg tech-section" id={id} aria-label="Tech Stack">
      <div className="tech-viewport" ref={vpRef}>
        <div className="bg-wrap" aria-hidden="true">
          <img className="bg-img" src={imgSrc} onError={() => setImgSrc(fallbackImage)} alt="" />
          <div className="bg-fallback" />
          <div className="bg-tint" />
        </div>

        <div className="tech-content">
          <h2 className="tech-title" data-reveal data-side="center" data-stagger>
            Tech Stack Overview
          </h2>
          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            The tools I actually use for this project — from UI inspiration to code, styles, and workflow.
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
                  <img src={s.icon} alt={s.name} className="tech-card-icon" />
                  <h3 className="tech-card-title">{s.name}</h3>
                </div>
                <p className="tech-card-body">{s.use}</p>
                <div className="tech-card-pills">
                  {s.pills.map((p, idx) => (
                    <span key={idx} className={`tech-pill ${idx ? "ghost" : ""}`}>
                      {p}
                    </span>
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
