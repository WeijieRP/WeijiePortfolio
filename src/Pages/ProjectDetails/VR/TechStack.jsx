// TechStackSection.jsx — AR Name Card toolchain (content from your DesignTechStack items)
import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  // Background tuned for the AR section
  bgImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/zoltan-tasi-55asYcav9uc-unsplash.jpg",
  fallbackImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/zoltan-tasi-55asYcav9uc-unsplash.jpg",

  // Head copy (from DesignTechStack)
  eyebrow = "AR Name Card Toolchain",
  title = "Tools I used from design to AR demo",
  desc = "Tools I use to prepare a reliable image target, build the AR scene, and accurately identify my custom artwork in a professional AR experience",

  // Items from your DesignTechStack (Vuforia → Unity → SDK)
  items = [
    {
      key: "vuforia",
      icon: "/assets/VR_Icons/icons8-website-100.png",
      name: "Vuforia Target Manager",
      usedFor:
        "I upload the card artwork here and tweak the design until it gets a solid 3-star or better rating. When it’s stable, I download the target database for Unity.",
      badge: "Target DB",
    },
    {
      key: "unity",
      icon: "/assets/VR_Icons/icons8-unity-48.png",
      name: "Unity Editor",
      usedFor:
        "I build an AR scene with an AR Camera, place the Image Target, then sit the 3D object on top with the right scale, angle, and shadow.",
      badge: "Engine",
    },
    {
      key: "sdk",
      icon: "/assets/VR_Icons/icons8-sdk-24.png",
      name: "Vuforia SDK",
      usedFor:
        "Handles tracking. It recognises the card in the live camera feed and pins my 3D model to it so the animation feels glued to the print.",
      badge: "AR SDK",
    },
  ],
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

  // Background parallax (background only)
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const tick = () => {
      const r = vpRef.current?.getBoundingClientRect();
      if (r && vpRef.current) {
        const vh = innerHeight || 1;
        const enter = vh,
          leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.02; // 1 → 1.02 (keeps crisp)
        const ty = (p - 0.5) * 30; // -15 → +15
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // IO reveal + settle (drop transforms after enter)
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

  return (
    <section
      className="section-bg tech-section"
      id={id}
      aria-label="AR Name Card Toolchain"
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
          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            {eyebrow}
          </p>
          <h2 className="tech-title" data-reveal data-side="center" data-stagger>
            {title}
          </h2>
          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            {desc}
          </p>

          <div className="tech-grid" role="list">
            {items.map((t, i) => (
              <article
                className="tech-card"
                role="listitem"
                key={t.key ?? t.name ?? i}
                data-reveal
                data-stagger
                data-side={i % 2 === 0 ? "left" : "right"}
              >
                <div className="tech-card-head">
                  <img src={t.icon} alt={t.name} className="tech-card-icon" />
                  <h3 className="tech-card-title">{t.name}</h3>
                </div>
                <p className="tech-card-body">{t.usedFor}</p>
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
