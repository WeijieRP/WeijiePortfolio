// TechStackSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  // design bg by default
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/matthew-stephenson-HHhDlTqwPfk-unsplash.jpg",
  fallbackImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/matthew-stephenson-HHhDlTqwPfk-unsplash.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // Track scroll direction
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down"); // "down" | "up"

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

  // Background parallax (background only, NO scale → keep crisp)
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const tick = () => {
      const r = vpRef.current?.getBoundingClientRect();
      if (r && vpRef.current) {
        const vh = innerHeight || 1;
        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const ty = (p - 0.5) * 30; // -15 → +15
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // IO reveal + settle
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
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-44px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "44px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      } else {
        if (side === "left") setVars(el, "0px", "0px", "44px", "16px");
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

  const items = [
    {
      name: "Pinterest",
      icon: "/assets/Icons/Pinterest.png",
      use: "I start with moodboards. Pin ideas, spot patterns, then decide the look and feel before I design.",
      badge: "Inspiration",
    },
    {
      name: "Dribbble",
      icon: "/assets/Icons/icons8-dribble-96.png",
      use: "I study clean layouts, spacing, and small interactions to keep my UI crisp and lively.",
      badge: "Inspiration",
    },
    {
      name: "Photoshop",
      icon: "/assets/Icons/Adobe-Photoshop.png",
      use: "I polish assets — lighting, texture, clean-ups, plus fast variations with Generative Fill.",
      badge: "Asset Making",
    },
    {
      name: "Illustrator",
      icon: "/assets/Icons/Adobe_Illustrator.png",
      use: "Logos and icons. Vectors stay sharp at any size, so the brand looks consistent everywhere.",
      badge: "Vector Work",
    },
    {
      name: "ChatGPT",
      icon: "/assets/Icons/icons8-chatgpt-480.png",
      use: "Brainstorms, UX microcopy, alt text, and naming. Helps me move faster without losing quality.",
      badge: "AI Assist",
    },
    {
      name: "Brand Palette",
      icon: "/assets/Icons/icons8-colors-58.png",
      use: "Warm glow oranges on deep blues — high contrast, readable, and memorable.",
      badge: "Brand System",
    },
    {
      name: "Typography",
      icon: "/assets/Icons/icons8-typography-96.png",
      use: "Poppins for bold headings, Inter for body copy — clear hierarchy and smooth reading.",
      badge: "Brand System",
    },
  ];

  return (
    <section
      className="section-bg tech-section"
      id={id}
      aria-label="Design Tools & Creative Workflow"
    >
      <div className="tech-viewport" ref={vpRef}>
        {/* Background */}
        <div className="bg-wrap" aria-hidden="true">
          <img
            className="bg-img"
            src={imgSrc}
            onError={() => setImgSrc(fallbackImage)}
            alt=""
          />
          <div className="bg-fallback" />
          <div className="bg-tint" />
        </div>

        {/* Content */}
        <div className="tech-content">
          {/* Glass panel: title + description */}
          <div
            className="tech-glass"
            data-reveal
            data-side="center"
            data-stagger
          >
            <h2 className="tech-title title-aurora">
              Tools I used to build my visual style
            </h2>
            <p className="tech-sub">
              Design tools, inspiration sources, and brand system pieces I rely
              on.
            </p>
          </div>

          <div className="tech-grid" role="list">
            {items.map((t, i) => (
              <article
                className="tech-card"
                role="listitem"
                key={t.name + i}
                data-reveal
                data-stagger
                data-side={i % 2 === 0 ? "left" : "right"}
              >
                <div className="tech-card-head">
                  <img src={t.icon} alt={t.name} className="tech-card-icon" />
                  <h3 className="tech-card-title">{t.name}</h3>
                </div>
                <p className="tech-card-body">{t.use}</p>
                <div className="tech-card-pills">
                  <span className="tech-pill">{t.badge}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
