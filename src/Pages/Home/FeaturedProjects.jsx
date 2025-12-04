// FeaturedProjects.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./feature.css";

/* ---------- Utils ---------- */
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const enc = (p = "") =>
  /^https?:\/\//i.test(p)
    ? p
    : p
        .split("/")
        .map((s) => encodeURIComponent(decodeURIComponent(s)))
        .join("/");

/* ---------- Shared hooks ---------- */
function useParallax(root) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const layers = el.querySelectorAll("[data-parallax]");
    let raf = 0;

    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const into = Math.min(r.height + vh, Math.max(-vh, vh - r.top));
      layers.forEach((layer) => {
        const s = parseFloat(layer.dataset.speed || 0);
        layer.style.transform = `translate3d(0, ${(-into * s).toFixed(
          1
        )}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [root]);
}

function useReveal(root) {
  useEffect(() => {
    if (!root.current) return;
    const els = root.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}

/* ---------- Component ---------- */
export default function FeaturedProjects({
  heading = "Featured Projects",
  subtitle = "Selected work across Web, Mobile, VR/AR and Design.",
}) {
  const rootRef = useRef(null);
  const liveRef = useRef(null);
  useParallax(rootRef);
  useReveal(rootRef);

  const projects = useMemo(
    () => [
      {
        id: "escape-archive",
        title: "Escape Archive VR",
        blurb:
          "A sci-fi VR puzzle game built in Unity, featuring atmospheric rooms, emotional storytelling, and progressive challenge design.",
        img: "/assets/VR_ArtWork/EntraceRoom.png",
        tags: ["VR", "Unity", "XR"],
        caseUrl: "/portfolio/VR/projectdetail2",
      },
      {
        id: "playlist-logger",
        title: "Playlist Logger",
        blurb:
          "A simple web app to save daily music choices, organize playlists, and revisit your listening history anytime.",
        img: "/assets/CA2_Tracker.png",
        tags: ["Web", "Node.js", "Express"],
        caseUrl: "/portfolio/web/projectdetail2",
      },
      {
        id: "cca-tracker",
        title: "CCA Tracker",
        blurb:
          "A school CCA management system with features for attendance, schedules, and role-based access for teachers and students.",
        img: "/assets/Rectangle64.png",
        tags: ["Express", "Node.js", "Web"],
        caseUrl: "/portfolio/web/projectdetail1",
      },
      {
        id: "brandme-identity",
        title: "BrandMe Identity",
        blurb:
          "A personal branding project featuring a custom logo, colour palette, and layout system designed in Adobe Illustrator.",
        img: "/assets/Artwork/Digital_Banner.png",
        tags: ["Design", "UX", "UI"],
        caseUrl: "/portfolio/design/projectdetail1",
      },
      {
        id: "vuforia-image-target",
        title: "AR Image Target (Vuforia)",
        blurb:
          "An AR prototype using Vuforia image targets to explore spatial interfaces and gesture-based interactions.",
        img: "/assets/VR_ArtWork/Font.png",
        tags: ["XR", "Unity", "Prototype"],
        caseUrl: "/portfolio/VR/projectdetail1",
      },
      {
        id: "gpa-calculator-app",
        title: "GPA Calculator App",
        blurb:
          "A mobile app that helps students easily calculate their GPA anytime, anywhere — built with Flutter and Dart.",
        img: "/assets/Moblie/MobileView1.jpg",
        tags: ["Mobile", "Flutter", "Dart"],
        caseUrl: "/portfolio/Mobile/projectdetail1",
      },
 
    ],
    []
  );

  const [active, setActive] = useState(2);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight")
        setActive((a) => clamp(a + 1, 0, projects.length - 1));
      if (e.key === "ArrowLeft")
        setActive((a) => clamp(a - 1, 0, projects.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projects.length]);

  // Swipe nav
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let x0 = null;
    const onTouchStart = (e) => {
      x0 = e.touches?.[0]?.clientX ?? null;
    };
    const onTouchEnd = (e) => {
      if (x0 == null) return;
      const x1 = e.changedTouches?.[0]?.clientX ?? x0;
      const dx = x1 - x0;
      if (Math.abs(dx) > 40) {
        setActive((a) =>
          clamp(a + (dx < 0 ? 1 : -1), 0, projects.length - 1)
        );
      }
      x0 = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [projects.length]);

  // SR live
  useEffect(() => {
    const p = projects[active];
    if (liveRef.current && p)
      liveRef.current.textContent = `Showing: ${p.title}`;
  }, [active, projects]);

  const transformFor = (i) => {
    const d = i - active;
    const abs = Math.abs(d);
    const x = d * 22;
    const s = 1 - Math.min(0.12 * abs, 0.42);
    const r = clamp(-12 * d, -16, 16);
    const y = abs * 6;
    const z = -abs * 110;
    const blur = abs >= 3 ? 1.5 : 0;
    return {
      transform: `translate3d(${x}vw,${y}px,${z}px) rotateY(${r}deg) scale(${s})`,
      filter: `blur(${blur}px)`,
      zIndex: 100 - abs,
      opacity: abs > 3 ? 0 : 1,
    };
  };

  return (
    <section
      ref={rootRef}
      className="feat"
      aria-label="Featured projects"
    >
      {/* Parallax BG */}
      <div
        className="feat-layer bg-1"
        data-parallax
        data-speed="0.12"
        style={{
          backgroundImage: `url("${enc(
            "/assets/HomeBackgroundImage/8726420.png"
          )}")`,
        }}
        aria-hidden="true"
      />
      <div
        className="feat-layer bg-2"
        data-parallax
        data-speed="0.32"
        style={{
          backgroundImage: `url("${enc(
            "/assets/HomeBackgroundImage/8726420.png"
          )}")`,
        }}
        aria-hidden="true"
      />

      {/* Lights */}
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="feat-wrap">
        {/* Centered glass header */}
        <div
          className="feat-head-glass reveal"
          data-anim="down"
          role="group"
          aria-roledescription="panel"
        >
          {/* Title uses global gradient via .title-aurora */}
          <h2 className="title-aurora feat-title">{heading}</h2>

          {/* Subtitle uses global body style via .section-subtitle */}
          {subtitle ? (
            <p className="section-subtitle feat-sub">{subtitle}</p>
          ) : null}
        </div>

        {/* SR live */}
        <div className="sr-live" aria-live="polite" ref={liveRef} />

        {/* Arrows */}
        <button
          className="nav-btn left"
          onClick={() =>
            setActive((a) => clamp(a - 1, 0, projects.length - 1))
          }
          aria-label="Previous project"
        >
          ❮
        </button>
        <button
          className="nav-btn right"
          onClick={() =>
            setActive((a) => clamp(a + 1, 0, projects.length - 1))
          }
          aria-label="Next project"
        >
          ❯
        </button>

        {/* Cards */}
        <div className="cards reveal" data-anim="up" role="list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`card ${i === active ? "is-active" : ""}`}
              style={transformFor(i)}
              onClick={() => setActive(i)}
              aria-label={`${p.title} card`}
              role="listitem"
              tabIndex={i === active ? 0 : -1}
            >
              <div className="chrome">
                <span />
                <span />
                <span />
              </div>
              <div
                className="banner"
                style={{ backgroundImage: `url("${enc(p.img)}")` }}
              />
              <div className="body">
                <h3>{p.title}</h3>
                <p className="blurb">{p.blurb}</p>
                <div className="tags">
                  {p.tags.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
                <div className="actions">
                  <Link
                    to={p.caseUrl}
                    className="btn gradient"
                    aria-label={`Open case study: ${p.title}`}
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div
          className="dots reveal"
          data-anim="up"
          role="tablist"
          aria-label="Project selector"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`dot ${i === active ? "on" : ""}`}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${p.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
