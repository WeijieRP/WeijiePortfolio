// ProblemSection.jsx
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

  // Softer background parallax (no hiding)
  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const root = rootRef.current;
      const vp = vpRef.current;
      if (root && vp) {
        const r = root.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
        const p = clamp((vh - r.top) / (vh + r.height), 0, 1);

        const centerDist = Math.abs(p - 0.5) / 0.5; // 0 at center
        const scale = 1 + (1 - centerDist) * 0.02; // 1 → 1.02
        const ty = (p - 0.5) * 30; // -15 → +15

        vp.style.setProperty("--bg-scale", scale.toFixed(3));
        vp.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pixel-safe sizing for panel image (avoid blurry upscaling)
  const onPanelLoad = (e) => {
    const img = e.currentTarget;
    const natural = img.naturalWidth;
    const card = img.closest(".prob-figure-panel");
    if (!card || !natural) return;
    const dpr = window.devicePixelRatio || 1;
    const maxCSS = Math.floor(natural / dpr);

    card.style.setProperty(
      "--panel-maxw",
      `${Math.max(360, Math.min(520, maxCSS))}px`
    );

    if (card.clientWidth > maxCSS) {
      img.classList.add("prob-pixel-safe");
    } else {
      img.classList.remove("prob-pixel-safe");
    }
  };

  return (
    <section
      className="prob-stage"
      id={id}
      ref={rootRef}
      aria-label="Problem"
    >
      <div className="prob-viewport" ref={vpRef}>
        {/* Background */}
        <div className="prob-bg-wrap" aria-hidden="true">
          <img
            className="prob-bg-img"
            src={bgSrc}
            onError={onBgError}
            alt=""
          />
          <div className="prob-bg-tint" />
        </div>

        {/* Ambient layers */}
        <div className="prob-ambient" aria-hidden="true" />
        <div className="prob-sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Content */}
        <div className="prob-inner prob-centered">
          {/* Left card: eyebrow + title + summary */}
          <div className="prob-card">
            <p className="prob-eyebrow">{eyebrow}</p>

            {/* h2 uses GLOBAL gradient (styles.css) */}
            <h2 className="prob-title">{title}</h2>

            <p className="prob-summary">{summary}</p>
          </div>

          {/* Right panel image */}
          <aside className="prob-right">
            <figure className="prob-figure-panel">
              <img
                className="prob-panel-img"
                src={sideSrc}
                onError={onSideError}
                onLoad={onPanelLoad}
                alt="Problem UI"
                loading="eager"
                fetchpriority="high"
                decoding="sync"
              />
              <figcaption className="prob-panel-cap">
                {sideCaption}
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
