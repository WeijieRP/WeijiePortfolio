// TechStackSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/ally-griffin-jni920AGX7w-unsplash.jpg",
  fallbackImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/ally-griffin-jni920AGX7w-unsplash.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // Track scroll direction for cards
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

  // Background parallax (background only)
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const tick = () => {
      const node = vpRef.current;
      const r = node?.getBoundingClientRect();
      if (r && node) {
        const vh = innerHeight || 1;
        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.02; // 1 → 1.02
        const ty = (p - 0.5) * 30;        // -15 → +15
        node.style.setProperty("--bg-scale", scale.toFixed(3));
        node.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // IO reveal + settle (CARDS ONLY)
  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;

    const setVars = (el, fromX, fromY, toX, toY) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.willChange = "transform, opacity";
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

    // ✅ only cards are animated, NOT the header panel
    const targets = root.querySelectorAll(".tech-card[data-reveal]");
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
      el.style.transitionDelay = `${120 + (i % 8) * 60}ms`;
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
      use:
        "I collect visual references and mood ideas here to shape the tone before designing. It helps me understand what feeling a project should give the audience.",
      badge: "Ideation & Mood",
    },
    {
      name: "Dribbble",
      icon: "/assets/Icons/icons8-dribble-96.png",
      use:
        "I study clean layouts, spacing, and modern interaction styles so my work feels sharp, intentional, and easy to follow.",
      badge: "Layout & UI Sense",
    },
    {
      name: "Photoshop",
      icon: "/assets/Icons/Adobe-Photoshop.png",
      use:
        "I refine visuals, adjust lighting, and enhance details to make everything clear and immersive. This helps ideas feel polished and believable.",
      badge: "Visual Polish",
    },
    {
      name: "Illustrator",
      icon: "/assets/Icons/Adobe_Illustrator.png",
      use:
        "I create clean icons, logos, and vector elements that scale well on any screen. It ensures visual storytelling stays consistent and professional.",
      badge: "Brand & Structure",
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
          {/* ✅ NO animation here, super crisp panel + title */}
          <div className="tech-hero-glass">
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
