import React, { useEffect, useRef, useState } from "react";
import "./challenge.css";

export default function ProblemSection({
  id = "problem",

  // Background
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/planet-2666103.jpg",
  fallbackImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/planet-2666103.jpg",

  // Text
  eyebrow = "Problem",
  title = "Create a CCA Tracker where everyone can use it",
  summary = `Build a small full-stack app with hashed auth (register/login), session-protected routes, and role-based actions (e.g., admin delete). Implement one resource with full CRUD via EJS/Bootstrap and SQL WHERE search, deploy on a live host with online MySQL, and keep routes/controllers/validation clean and navigable.`,

  // Panel image
  sideImage = "/assets/Rectangle64.png",
  sideImageFallback = "https://images.unsplash.com/photo-1551281044-8b89c5b2edd2?q=80&w=1500&auto=format&fit=crop",
  sideCaption = "Problem — secure full-stack system requirements",
}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  const [bgSrc, setBgSrc] = useState(bgImage);
  const [sideSrc, setSideSrc] = useState(sideImage);

  const onBgError = () => setBgSrc(fallbackImage);
  const onSideError = () => setSideSrc(sideImageFallback);

  // Track scroll direction
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

  // Softer parallax (keeps BG crisp)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const r = rootRef.current?.getBoundingClientRect();
      if (r && vpRef.current) {
        const vh = window.innerHeight || 1;
        const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
        const scale = 1 + (1 - Math.abs(p - 0.5) * 2) * 0.02; // 1 → 1.02
        const ty = (p - 0.5) * 30;                             // -15 → +15
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Direction-aware slide + settle
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const items = host.querySelectorAll("[data-reveal]");

    const setVars = (el, fromX, toX) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--to-x", toX);
      el.style.willChange = "transform";
    };

    const settle = (el) => {
      el.classList.add("settled");
      el.style.removeProperty("--from-x");
      el.style.removeProperty("--to-x");
      el.style.removeProperty("transform");
      el.style.willChange = "auto";
    };

    const onEnd = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("is-in")) settle(el);
    };

    const enter = (el, dir) => {
      el.classList.remove("settled");
      setVars(el, dir === "down" ? "48px" : "-48px", "0px");
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, dir) => {
      el.classList.remove("settled");
      setVars(el, "0px", dir === "down" ? "-44px" : "44px");
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const d = dirRef.current;
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) enter(el, d);
          else leave(el, d);
        });
      },
      { threshold: 0.12, rootMargin: "-10% 0% -10% 0%" }
    );

    items.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 6) * 60}ms`;
      }
      el.addEventListener("transitionend", onEnd);
      io.observe(el);
    });

    return () => {
      items.forEach((el) => el.removeEventListener("transitionend", onEnd));
    };
  }, []);

  // Avoid upscaling blur on the panel image
  const onPanelLoad = (e) => {
    const img = e.currentTarget;
    const natural = img.naturalWidth;
    const card = img.closest(".sol-figure-panel");
    if (!card || !natural) return;
    const dpr = window.devicePixelRatio || 1;
    const maxCSS = Math.floor(natural / dpr);
    card.style.setProperty("--panel-maxw", `${Math.max(360, Math.min(560, maxCSS))}px`);
    if (card.clientWidth > maxCSS) img.classList.add("pixel-safe");
    else img.classList.remove("pixel-safe");
  };

  return (
    <section className="section-bg" id={id} ref={rootRef} aria-label="Problem">
      <div className="sol-viewport" ref={vpRef}>
        {/* Background */}
        <div className="bg-wrap" aria-hidden="true">
          <img className="bg-img" src={bgSrc} onError={onBgError} alt="" />
          <div className="bg-tint" />
        </div>

        {/* Ambient layers */}
        <div className="cta-ambient" aria-hidden="true" />
        <div className="cta-overlay" aria-hidden="true" />
        <div className="cta-sparkles" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>

        {/* Content */}
        <div className="sol-inner sol-centered">
          {/* Left card */}
          <div className="sol-hero-card" data-reveal data-stagger>
            <p className="sol-eyebrow">{eyebrow}</p>
            <h2 className="sol-title">{title}</h2>
            <p className="sol-summary">{summary}</p>
          </div>

          {/* Right image panel */}
          <aside className="sol-right" data-reveal data-stagger>
            <figure className="sol-figure-panel">
              <img
                className="sol-panel-img"
                src={sideSrc}
                onError={onSideError}
                onLoad={onPanelLoad}
                alt="Problem UI"
                loading="eager"
                fetchpriority="high"
                decoding="sync"
              />
              <figcaption className="sol-panel-cap">{sideCaption}</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
