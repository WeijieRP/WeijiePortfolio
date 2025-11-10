// DesignShowcase.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./design-showcase.css";

export default function DesignShowcase({
  id = "design-showcase",
  title = "Design Showcase",
  subtitle = "Campaign visuals, posters, moodboards, type studies & character design."
}) {
  const MOOD = "/assets/files/Mood_Board_Instagram_grid_weijie_24040351.png";

  const artworks = useMemo(() => [
    { id: 1, title: "Travelly — Hero Banner",
      img: "/assets/files/L20_weijie_24040351_digital_banner_1.png",
      desc: "Hero branding visual with global landmarks & sparkles.",
      file: "/assets/L20_weijie_24040351_digital_banner.png", type: "png" },
    { id: 2, title: "Travelly — 3×3 Launch Grid",
      img: "/assets/files/Instagram_grid_3x3_weijie_24040351.png",
      desc: "Instagram grid showcasing destinations & CTA tiles.",
      file: "/assets/files/Instagram_grid_3x3_weijie_24040351.png", type: "png" },
    { id: 3, title: "Travelly — Moodboard",
      img: MOOD, desc: "Clouds, sand & orange palette capturing brand tone.",
      file: MOOD, type: "png" },
    { id: 4, title: "Travelly — EDM Poster",
      img: "/assets/files/L06WeijieEDM-1.png",
      desc: "Email campaign visual with CTA hierarchy & QR code.",
      file: "/assets/files/L06WeijieEDM-1.png", type: "png" },
    { id: 5, title: "EDM Design Brief",
      img: "/assets/files/L06WeijieEDM-2.png",
      desc: "Target, tone, layout rules & deliverables.",
      file: "/assets/files/L06WeijieEDM-2.png", type: "png" },
    { id: 6, title: "Typography Study",
      img: "/assets/files/L10WeijieTypography-1.png",
      desc: "Hierarchy, rhythm & emphasis typography poster studies.",
      file: "/assets/files/L10WeijieTypography-1.png", type: "png" },
    { id: 7, title: "Character Design Sheet",
      img: "/assets/files/L18_CharacterDesign_weijie_24040351-1.png",
      desc: "Character exploration — shapes, silhouettes & emotions.",
      file: "/assets/files/L18_CharacterDesign_weijie_24040351-1.png", type: "png" },
    { id: 8, title: "Moodboard Typography Study",
      img: "/assets/files/L10WeijieTypography-2.png",
      desc: "Moodboard color styles for typography design.",
      file: "/assets/files/L10WeijieTypography-2.png", type: "png" },
  ], []);

  const rootRef = useRef(null);

  // IntersectionObserver reveal (alternating left/right)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const targets = root.querySelectorAll("[data-reveal]");
    if (reduce) { targets.forEach(el => el.classList.add("is-in")); return; }

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("is-in");
        else e.target.classList.remove("is-in");
      }),
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lightbox
  const [previewIndex, setPreviewIndex] = useState(null);
  const open  = (idx) => setPreviewIndex(idx);
  const close = () => setPreviewIndex(null);
  const hasPreview = previewIndex !== null;
  const current = hasPreview ? artworks[previewIndex] : null;
  const stop = (e) => e.stopPropagation();
  const next = (e) => { e?.stopPropagation?.(); setPreviewIndex(i => (i + 1) % artworks.length); };
  const prev = (e) => { e?.stopPropagation?.(); setPreviewIndex(i => (i - 1 + artworks.length) % artworks.length); };

  useEffect(() => {
    if (!hasPreview) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasPreview]);

  return (
    <section className="ds-stage" id={id} ref={rootRef}>
      <div className="ds-bg" aria-hidden="true"
           style={{ backgroundImage: 'url("/assets/PortfolioDesignProjectDetails2BackgroundImage/nasa-hubble-space-telescope-IDK944LS8pw-unsplash.jpg")' }} />
      <div className="ds-vignette" />
      <div className="ds-sparkles" aria-hidden="true" />

      <header className="ds-head" data-reveal style={{ ["--d"]: "50ms" }}>
        <h2 className="ds-title">{title}</h2>
        <p className="ds-sub">{subtitle}</p>
      </header>

      <div className="ds-grid">
        {artworks.map((a, idx) => (
          <article
            key={a.id}
            className="ds-card"
            data-reveal
            data-dir={idx % 2 === 0 ? "left" : "right"}
            style={{ ["--d"]: `${120 + idx * 70}ms` }}
            onClick={() => open(idx)}
            aria-label={`Open ${a.title}`}
          >
            <div className="thumb" style={{ backgroundImage: `url(${a.img})` }}>
              <div className="thumb-shade" />
              <div className="thumb-overlay">
                <h3 className="ov-title">{a.title}</h3>
                <p className="ov-desc">{a.desc}</p>
                <button className="ov-view" type="button">View</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasPreview && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Artwork preview" onClick={close}>
          <div className="lb-inner" onClick={stop}>
            <div className="lb-topbar">
              <button className="lb-nav" onClick={prev} aria-label="Previous">←</button>
              <div className="lb-meta">
                <h3 className="lb-title">{current.title}</h3>
                <p className="lb-desc">{current.desc}</p>
              </div>
              <button className="lb-close" onClick={close} aria-label="Close">✕</button>
            </div>

            <div className="lb-body">
              <img className="lb-media" src={current.file} alt={current.title} />
            </div>

            <div className="lb-actions">
              <button className="lb-nav" onClick={prev} aria-label="Previous">Previous</button>
              <button className="lb-nav" onClick={next} aria-label="Next">Next</button>
              <a className="btn-ghost" href={current.file} target="_blank" rel="noreferrer">Open Original</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
