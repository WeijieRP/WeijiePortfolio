// StoryboardGallery.jsx (background visibility fix — functionality unchanged)
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./storyboard.css";

export default function StoryboardGallery({
  id = "storyboard-gallery",
  heading = "Escape Archive VR — Storyboards",
  subheading = "Concept → Rooms 1–4 → Exit Room (flow & puzzle logic)",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/eirene-thoms-spWdryVJa7o-unsplash.jpg",
  height = "screen",
  fixedBg = false,
  items = [
    { title: "Entrance Room", thumb: "/assets/VR_ArtWork/EntraceRoom.png", full: "/assets/VR_ArtWork/EntraceRoom.png",
      desc: "The player spawns here. Ambient lights flicker; a voice says 'Solve the four…'. Start panel interaction unlocks Door 1.",
      tags: ["Spawn", "Atmosphere", "Start Panel"] },
    { title: "Room 1 — Symbol Puzzle", thumb: "/assets/VR_ArtWork/Room1.png", full: "/assets/VR_ArtWork/Room1.png",
      desc: "3×3 symbol panel + bookshelf. Read symbols on books (1→2→3). Press matching sequence on panel to unlock Door 2.",
      tags: ["Cues", "Sequence", "Audio Feedback"] },
    { title: "Room 2 — Diary & Emotion", thumb: "/assets/VR_ArtWork/Room2.png", full: "/assets/VR_ArtWork/Room2.png",
      desc: "Read 3 diary entries → map emotions to colors on the panel. 2 fails → hint. 3 fails → optional Skip UI.",
      tags: ["Narrative", "Emotion", "Hint/Skip"] },
    { title: "Room 3 — Time Loop Pattern", thumb: "/assets/VR_ArtWork/Room3.png", full: "/assets/VR_ArtWork/Room3.png",
      desc: "Light sequence plays (e.g., Blue→Green→Red→Yellow→Purple). Player replicates with XR hands. Door 4 opens on success.",
      tags: ["Rhythm", "Pattern", "Memory"] },
    { title: "Room 4 — Final Multi-Puzzle", thumb: "/assets/VR_ArtWork/Room4.png", full: "/assets/VR_ArtWork/Room4.png",
      desc: "Three smaller puzzles (A: voice, B: light, C: riddle). All must be solved to unlock Exit Room.",
      tags: ["Gate", "Multi-stage", "Integration"] },
    { title: "Exit Room — Freedom", thumb: "/assets/VR_ArtWork/EntraceRoom.png", full: "/assets/VR_ArtWork/EntraceRoom.png",
      desc: "Visible sky, trees, leaves drifting. Background narration. Final text: “You are free”. Emotional release & closure.",
      tags: ["Closure", "Sky", "Leaves"] },
  ],
}) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(-1); // -1 = closed
  const [dir, setDir] = useState("next");   // "next" | "prev"
  const modalOpen = active >= 0;

  const open  = useCallback((i) => setActive(i), []);
  const close = useCallback(() => setActive(-1), []);
  const next  = useCallback(() => {
    if (active < 0) return;
    setDir("next");
    setActive((i) => (i + 1) % items.length);
  }, [active, items.length]);
  const prev  = useCallback(() => {
    if (active < 0) return;
    setDir("prev");
    setActive((i) => (i - 1 + items.length) % items.length);
  }, [active, items.length]);

  // Slide-in reveal on scroll
  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll(".sb-card"));
    cards.forEach((el, i) => {
      const col = i % 3;
      const side = col === 0 ? "left" : col === 2 ? "right" : (i % 2 ? "right" : "left");
      el.dataset.side = side;
      el.style.setProperty("--delay", `${(i % 6) * 60}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("sb-in", e.isIntersecting)),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ESC / arrows + body scroll lock when modal is open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    if (modalOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen, close, next, prev]);

  const heightClass =
    height === "screen" ? "sb--screen" :
    height === "auto"   ? "sb--auto"   :
    typeof height === "number" ? "sb--px" : "sb--auto";

  return (
    <section
      className={`sb-section ${heightClass} ${fixedBg ? "sb--fixed" : ""}`}
      id={id}
      ref={rootRef}
      style={typeof height === "number" ? { minHeight: `${height}px` } : undefined}
    >
      {/* ✅ Full-bleed background (no overlay) */}
      <div
        className="sb-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <header className="sb-head">
        <h2 className="sb-title">{heading}</h2>
        <p className="sb-sub">{subheading}</p>
      </header>

      {/* GRID (3 columns) */}
      <ul className="sb-grid" role="list">
        {items.map((it, i) => (
          <li key={it.title + i} className="sb-card" style={{ transitionDelay: "var(--delay, 0ms)" }}>
            <button className="sb-thumbBtn" onClick={() => open(i)} aria-label={`View details: ${it.title}`}>
              <img className="sb-thumb" src={it.thumb} alt={it.title} />
            </button>
            <div className="sb-meta">
              <h3 className="sb-name">{it.title}</h3>
              <button className="sb-more" onClick={() => open(i)} aria-label={`Open details for ${it.title}`}>
                View details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* MODAL */}
      {modalOpen && (
        <div className="sb-modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="sb-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sb-modal-head">
              <h3 className="sb-modal-title">{items[active].title}</h3>
              <button className="sb-x" onClick={close} aria-label="Close">×</button>
            </div>

            <div className={`sb-modal-body ${dir === "next" ? "slide-next" : "slide-prev"}`}>
              <img className="sb-full" src={items[active].full} alt={items[active].title} />
              <div className="sb-desc">
                <p>{items[active].desc}</p>
                {items[active].tags?.length > 0 && (
                  <div className="sb-tags">
                    {items[active].tags.map((t, j) => (
                      <span className="sb-tag" key={j}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sb-nav">
              <button className="sb-nav-btn" onClick={prev} aria-label="Previous">‹</button>
              <span className="sb-count">{active + 1} / {items.length}</span>
              <button className="sb-nav-btn" onClick={next} aria-label="Next">›</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
