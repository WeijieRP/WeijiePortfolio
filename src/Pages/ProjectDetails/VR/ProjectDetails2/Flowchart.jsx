// FlowchartsSection.jsx — crisp cards + slide-up reveal animation
import React, { useEffect, useRef, useState } from "react";
import "./flowchart.css";

export default function FlowchartsSection({
  id = "flowcharts",
  heading = "Flowcharts — Game Logic & Room Progression",
  subheading = "Escape Archive VR: Puzzle flow, fail logic, and narrative room progression.",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/engin-akyurt-F2juR7d_fNM-unsplash.jpg",
  height = "screen", // "screen" | "auto" | number (px)
  fixedBg = false,
  items = [],
}) {
  const [active, setActive] = useState(null);
  const [viewMode, setViewMode] = useState("fit");
  const viewerRef = useRef(null);

  // 🔁 Reveal animation for cards (slide-up + fade)
  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;

    const cards = section.querySelectorAll(".fc-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fc-in");
          } else {
            e.target.classList.remove("fc-in");
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card, i) => {
      // small stagger
      card.style.setProperty("--fc-delay", `${(i % 6) * 70}ms`);
      io.observe(card);
    });

    return () => io.disconnect();
  }, [id, items.length]);

  // Lock body scroll when modal open + keyboard shortcuts
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if ((e.key || "").toLowerCase() === "f") {
        setViewMode((m) => (m === "fit" ? "full" : "fit"));
      }
    };
    window.addEventListener("keydown", onKey);

    requestAnimationFrame(() => {
      if (viewerRef.current) {
        viewerRef.current.scrollTop = 0;
        viewerRef.current.scrollLeft = 0;
      }
    });

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // Default data if no props.items passed
  const defaultItems = [
    {
      key: "entrance_r1",
      title: "Entrance & Room 1 — Symbol Puzzle",
      thumb: "/assets/VR_Flowchart/EntranceRooms&Room1.png",
      full: "/assets/VR_Flowchart/EntranceRooms&Room1.png",
      meta: "Start scene → pick books → match symbol order to unlock Room 2.",
      bullets: ["Intro voice", "Book symbol pairing", "Fail → hint system"],
    },
    {
      key: "room2",
      title: "Room 2 — Diary Emotion Puzzle",
      thumb: "/assets/VR_Flowchart/Rooms2.png",
      full: "/assets/VR_Flowchart/Rooms2.png",
      meta: "Read diary → map emotions → unlock Room 3.",
      bullets: ["Flip diary pages", "Emotion mapping board", "Unlock animation"],
    },
    {
      key: "room3",
      title: "Room 3 — Time Loop Puzzle",
      thumb: "/assets/VR_Flowchart/Rooms3.png",
      full: "/assets/VR_Flowchart/Rooms3.png",
      meta: "Repeat light sequence → open Room 4.",
      bullets: ["Light pattern playback", "VR tap repeat", "Skip on fail ×3"],
    },
    {
      key: "room4",
      title: "Room 4 — Final Multi-Puzzle",
      thumb: "/assets/VR_Flowchart/Room4.png",
      full: "/assets/VR_Flowchart/Room4.png",
      meta: "Solve A + B + C puzzles → exit unlocks.",
      bullets: ["3-Stage puzzle", "Voice + light + objects", "Final reveal gate"],
    },
    {
      key: "exit",
      title: "Exit — Freedom Scene",
      thumb: "/assets/VR_Flowchart/ExitRoom.png",
      full: "/assets/VR_Flowchart/ExitRoom.png",
      meta: "Sky, trees, wind, leaves — “You are free” ending.",
      bullets: ["Calming music", "Nature VFX", "Credits & restart"],
    },
  ];

  const data = items.length ? items : defaultItems;
  const heightClass =
    height === "screen"
      ? "fc--screen"
      : height === "auto"
      ? "fc--auto"
      : typeof height === "number"
      ? "fc--px"
      : "fc--auto";

  return (
    <section
      id={id}
      className={`fc-section ${heightClass} ${fixedBg ? "fc--fixed" : ""}`}
      style={
        typeof height === "number" ? { minHeight: `${height}px` } : undefined
      }
      aria-label="Game flowcharts"
    >
      <div
        className="fc-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="fc-overlay" aria-hidden="true" />

      {/* Header glass with aurora title (from global h2 styles) */}
      <header className="fc-head">
        <div className="fc-headGlass">
          <h2 className="fc-title">{heading}</h2>
          <p className="fc-sub">{subheading}</p>
        </div>
      </header>

      {/* Cards */}
      <ul className="fc-grid" role="list">
        {data.map((item) => (
          <li key={item.key} className="fc-card">
            <button
              className="fc-card-btn"
              onClick={() => setActive(item)}
              aria-label={`Open ${item.title}`}
            >
              <div className="fc-thumb">
                <img
                  className="fc-thumb-img"
                  src={item.thumb}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="fc-meta">
                <h3 className="fc-card-title">{item.title}</h3>
                <button
                  type="button"
                  className="fc-more fc-btn-peach"
                  aria-label={`View details for ${item.title}`}
                >
                  View details
                </button>
              </div>

              <p className="fc-card-desc" title={item.meta}>
                {item.meta}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {/* Modal viewer */}
      {active && (
        <div
          className="fc-modal"
          onClick={(e) =>
            e.target.classList.contains("fc-modal") && setActive(null)
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="fc-modal-title"
        >
          <div className="fc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fc-toolbar">
              <div className="fc-toolbar-left">
                <h3 className="fc-toolbar-title" id="fc-modal-title">
                  {active.title}
                </h3>
                <span className="fc-toolbar-meta">{active.meta}</span>
              </div>

              <div className="fc-toolbar-actions">
                <button
                  className={`fc-btn small ${
                    viewMode === "fit" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("fit")}
                >
                  Fit
                </button>
                <button
                  className={`fc-btn small ghost ${
                    viewMode === "full" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("full")}
                >
                  Full
                </button>
                <a
                  className="fc-btn small ghost"
                  href={active.full}
                  target="_blank"
                  rel="noreferrer"
                >
                  Original
                </a>
              </div>
            </div>

            <div
              ref={viewerRef}
              className={`fc-viewer ${
                viewMode === "full" ? "is-scroll" : "is-fit"
              }`}
            >
              <img
                className={`fc-viewer-img ${viewMode}`}
                src={active.full}
                alt={active.title}
                draggable={false}
                loading="eager"
                decoding="sync"
              />
            </div>

            {active.bullets?.length > 0 && (
              <div className="fc-modal-body">
                <ul className="fc-bullets">
                  {active.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="fc-footer">
              <div className="fc-footer-left">
                <button
                  className="fc-btn ghost small"
                  onClick={() =>
                    setViewMode((m) => (m === "fit" ? "full" : "fit"))
                  }
                >
                  Toggle Fit/Full
                </button>
              </div>
              <div className="fc-footer-actions">
                <a
                  className="fc-btn small ghost"
                  href={active.full}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
                <button
                  className="fc-btn small"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <button
            className="fc-x"
            onClick={() => setActive(null)}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
