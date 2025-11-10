import React, { useEffect, useRef, useState } from "react";
import "./stack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-3199541_1920.jpg",
  fallbackImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/moon-3199541_1920.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // scroll dir (unchanged)
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // parallax (unchanged)
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
        const scale = 1 + (1 - d) * 0.02;
        const ty = (p - 0.5) * 30;
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // reveal (unchanged)
  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;

    const setVars = (el, fromX, fromY, toX, toY) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.willChange = "transform";
    };
    const settle = (el) => {
      el.classList.add("settled");
      el.style.removeProperty("--from-x");
      el.style.removeProperty("--from-y");
      el.style.removeProperty("--to-x");
      el.style.removeProperty("--to-y");
      el.style.removeProperty("transform");
      el.style.willChange = "auto";
    };
    const onEnd = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("is-in")) settle(el);
    };
    const enter = (el, side, dir) => {
      el.classList.remove("settled");
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
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left")  setVars(el, "0px", "0px", "-44px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "44px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      } else {
        if (side === "left")  setVars(el, "0px", "0px", "44px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-44px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
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
      el.addEventListener("transitionend", onEnd);
      io.observe(el);
    });

    return () => {
      targets.forEach((el) => el.removeEventListener("transitionend", onEnd));
      io.disconnect();
    };
  }, []);

  const stacks = [
    { name: "Node.js",     icon: "/assets/Web_Icons/icons8-node-js-96.png",    use: "Runtime for backend routing, logic, and middleware." },
    { name: "Express.js",  icon: "/assets/Web_Icons/icons8-express-js-48.png", use: "Framework for routes, authentication, and CRUD APIs." },
    { name: "MySQL",       icon: "/assets/Web_Icons/icons8-mysql-48.png",      use: "Relational database for users/resources with SQL search." },
    { name: "EJS",         icon: "/assets/Web_Icons/icons8-ejs-48.png",        use: "Server-side templating for dynamic HTML rendering." },
    { name: "Bootstrap",   icon: "/assets/Web_Icons/icons8-bootstrap-48.png",  use: "Responsive forms, tables, and layout utilities." },
    { name: "GitHub",      icon: "/assets/Web_Icons/icons8-github-48.png",     use: "Version control & collaboration; Week-12 ready." },
    { name: "Render",      icon: "/assets/Web_Icons/icons8-website-90.png",    use: "Cloud deploy for app + live demo URL." },
  ];

  return (
    <section className="section-bg tech-section" id={id} aria-label="Tech Stack">
      <div className="tech-viewport" ref={vpRef}>
        {/* Background */}
        <div className="bg-wrap" aria-hidden="true">
          <img className="bg-img" src={imgSrc} onError={() => setImgSrc(fallbackImage)} alt="" />
          <div className="bg-fallback" />
          <div className="bg-tint" />
        </div>

        {/* Content */}
        <div className="tech-content">
          {/* ONLY the title gets the galaxy look */}
          <h2 className="tech-title galaxy-title" data-reveal data-side="center" data-stagger>
            Tech Stack Overview
          </h2>

          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            The full-stack tools that power this web app — backend, database, UI, and deployment.
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
