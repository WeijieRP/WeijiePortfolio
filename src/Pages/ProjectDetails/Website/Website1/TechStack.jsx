// TechStackSection.jsx
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

  // ----- Parallax: translateY only -----
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

        const ty = (p - 0.5) * 32; // -16 → +16
        vpRef.current.style.setProperty("--mt-bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ----- track scroll direction -----
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ----- direction-aware reveal (scoped to .mt-reveal) -----
  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;

    const setVars = (
      el,
      fromX,
      fromY,
      toX,
      toY,
      fromScale = 0.98,
      toScale = 1
    ) => {
      el.style.setProperty("--mt-from-x", fromX);
      el.style.setProperty("--mt-from-y", fromY);
      el.style.setProperty("--mt-to-x", toX);
      el.style.setProperty("--mt-to-y", toY);
      el.style.setProperty("--mt-from-scale", String(fromScale));
      el.style.setProperty("--mt-to-scale", String(toScale));
    };

    const enter = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "-40px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "40px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "40px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-40px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      }
      el.classList.add("mt-reveal-in");
      el.classList.remove("mt-reveal-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left")
          setVars(el, "0px", "0px", "-32px", "16px", 1, 0.98);
        else if (side === "right")
          setVars(el, "0px", "0px", "32px", "16px", 1, 0.98);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.98);
      } else {
        if (side === "left")
          setVars(el, "0px", "0px", "32px", "16px", 1, 0.98);
        else if (side === "right")
          setVars(el, "0px", "0px", "-32px", "16px", 1, 0.98);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.98);
      }
      el.classList.add("mt-reveal-out");
      el.classList.remove("mt-reveal-in");
      void el.offsetWidth;
    };

    const targets = root.querySelectorAll(".mt-reveal");
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
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 8) * 80}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const stacks = [
    {
      name: "Dribbble",
      icon: "/assets/Icons/icons8-dribble-96.png",
      use: "UI/UX inspiration & benchmarking for clean, modern interfaces.",
      pills: ["Inspiration", "UI/UX"],
    },
    {
      name: "Node.js",
      icon: "/assets/Web_Icons/icons8-node-js-96.png",
      use: "Backend runtime for routing, basic logic, and form handling.",
      pills: ["Backend", "Runtime"],
    },
    {
      name: "JavaScript",
      icon: "/assets/Web_Icons/icons8-javascript-48.png",
      use: "Core scripting for interactivity and client-side enhancements.",
      pills: ["ESNext", "Client"],
    },
    {
      name: "HTML5",
      icon: "/assets/Web_Icons/icons8-html5-48.png",
      use: "Semantic structure for accessibility and SEO.",
      pills: ["Semantic", "Markup"],
    },
    {
      name: "CSS3",
      icon: "/assets/Web_Icons/icons8-css-48.png",
      use: "Layout, variables, and responsive design system.",
      pills: ["Responsive", "Design"],
    },
    {
      name: "Bootstrap",
      icon: "/assets/Web_Icons/icons8-bootstrap-48.png",
      use: "Grid system and ready UI components.",
      pills: ["Components", "Grid"],
    },
    {
      name: "GitHub",
      icon: "/assets/Web_Icons/icons8-github-96.png",
      use: "Collaboration, versioning, project tracking.",
      pills: ["VCS", "Collab"],
    },
  ];

  return (
    <section className="mt-section" id={id} aria-label="Tech Stack">
      <div className="mt-viewport" ref={vpRef}>
        {/* Background */}
        <div className="mt-bg-wrap" aria-hidden="true">
          <img
            className="mt-bg-img"
            src={imgSrc}
            onError={() => setImgSrc(fallbackImage)}
            alt=""
          />
          <div className="mt-bg-fallback" />
          <div className="mt-bg-tint" />
        </div>

        {/* Content */}
        <div className="mt-content">
          <div
            className="mt-head-panel mt-reveal"
            data-side="center"
            data-stagger
          >
            <h2 className="mt-title">Tech Stack Overview</h2>
            <p className="mt-sub">
              The tools I actually use for this project — from UI inspiration
              to code, styles, and workflow.
            </p>
          </div>

          <div className="mt-grid" role="list">
            {stacks.map((s, i) => (
              <article
                key={s.name}
                className="mt-card mt-reveal"
                role="listitem"
                data-side={i % 2 === 0 ? "left" : "right"}
                data-stagger
              >
                <div className="mt-card-head">
                  <img src={s.icon} alt={s.name} className="mt-icon" />
                  <h3 className="mt-card-title">{s.name}</h3>
                </div>

                <p className="mt-card-body">{s.use}</p>

                <div className="mt-pill-row">
                  {s.pills.map((p, idx) => (
                    <span
                      key={idx}
                      className={`mt-pill ${idx ? "ghost" : ""}`}
                    >
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
