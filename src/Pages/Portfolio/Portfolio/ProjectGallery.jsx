// PortfolioCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import "./project-gallery.css";

const SLIDES = [
  {
    img: "/assets/Rectangle64.png",
    title: "CCA Tracker — Full Stack",
    desc: "Role-based CCA management with secure sign-in and controlled access.",
    link: "/case-study/cca-tracker",
  },
  {
    img: "/assets/Artwork/Digital_Banner.png",
    title: "Brand Me — Visual Identity",
    desc: "Logo system, color palette, and campaign assets for a personal brand.",
    link: "/case-study/brand-me",
  },
  {
    img: "/assets/CA2_Tracker.png",
    title: "Music Tracker — CRUD App",
    desc: "Playlist CRUD app with Firebase auth and clean UI flows.",
    link: "/case-study/music-tracker",
  },
  {
    img: "/assets/Screenshot.png",
    title: "Escape Archive VR — Immersive",
    desc: "Unity VR escape journey with hand tracking and emotional pacing.",
    link: "/case-study/escape-archive-vr",
  },
];

export default function PortfolioCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState("right"); // "right" | "left"
  const max = SLIDES.length;

  const timer = useRef(null);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const animLockRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const touchStartYRef = useRef(null);

  const AUTOPLAY_MS = 3500;
  const TRANSITION_MS = 600; // keep in sync with CSS

  const next = useCallback(() => {
    if (animLockRef.current) return;
    animLockRef.current = true;
    setDir("right");
    setIndex((p) => (p + 1) % max);
    setTimeout(() => {
      animLockRef.current = false;
    }, TRANSITION_MS);
  }, [max]);

  const prev = useCallback(() => {
    if (animLockRef.current) return;
    animLockRef.current = true;
    setDir("left");
    setIndex((p) => (p - 1 + max) % max);
    setTimeout(() => {
      animLockRef.current = false;
    }, TRANSITION_MS);
  }, [max]);

  // Autoplay
  useEffect(() => {
    timer.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer.current);
  }, [next]);

  const pause = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const resume = () => {
    if (!timer.current) {
      timer.current = setInterval(next, AUTOPLAY_MS);
    }
  };

  // Translate track + set easing direction
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
      trackRef.current.setAttribute("data-dir", dir);
    }
  }, [index, dir]);

  // Wheel / touch / keyboard controls
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onWheel = (e) => {
      wheelAccumRef.current += e.deltaY;
      const THRESHOLD = 80;
      if (Math.abs(wheelAccumRef.current) > THRESHOLD) {
        pause();
        wheelAccumRef.current > 0 ? next() : prev();
        wheelAccumRef.current = 0;
        setTimeout(resume, AUTOPLAY_MS);
      }
    };

    const onTouchStart = (e) => {
      touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchEnd = (e) => {
      const sy = touchStartYRef.current;
      const ey = e.changedTouches?.[0]?.clientY ?? null;
      if (sy == null || ey == null) return;
      const dy = sy - ey;
      if (Math.abs(dy) > 40) {
        pause();
        dy > 0 ? next() : prev();
        setTimeout(resume, AUTOPLAY_MS);
      }
      touchStartYRef.current = null;
    };

    const onKey = (e) => {
      if (["ArrowDown", "ArrowRight"].includes(e.key)) {
        pause();
        next();
        setTimeout(resume, AUTOPLAY_MS);
      }
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        pause();
        prev();
        setTimeout(resume, AUTOPLAY_MS);
      }
    };

    wrap.addEventListener("wheel", onWheel, { passive: true });
    wrap.addEventListener("touchstart", onTouchStart, { passive: true });
    wrap.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("touchstart", onTouchStart);
      wrap.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev]);

  // Click on dots with correct easing direction
  const goTo = (i) => {
    if (i === index) return;
    setDir(i > index ? "right" : "left");
    setIndex(i);
  };

  return (
    <section
      className="pc-wrap"
      ref={wrapRef}
      style={{
        "--pc-bg": 'url("/assets/PortfolioBackgroundImage/moon-6995110.jpg")',
      }}
      aria-labelledby="pc-title"
    >
      {/* Title (glass panel around title + subtitle) */}
      <div className="pc-header">
        <div
          className="pc-header-glass"
          role="group"
          aria-roledescription="panel"
        >
          <h2 id="pc-title" className="pc-title">
            Featured Projects
          </h2>
          <p className="pc-sub">
            A snapshot of my work from production apps, brand systems, and
            immersive VR.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="pc-container"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <button
          className="pc-arrow left"
          onClick={prev}
          aria-label="Previous slide"
          type="button"
        >
          <ChevronLeft size={26} />
        </button>

        <div
          className="pc-viewport"
          role="region"
          aria-roledescription="carousel"
        >
          <div className="pc-track" ref={trackRef}>
            {SLIDES.map((slide, i) => (
              <article
                className={`pc-slide ${i === index ? "is-active" : ""}`}
                key={`${slide.title}-${i}`}
                role="group"
                aria-label={`${slide.title} (${i + 1} of ${max})`}
              >
                <img
                  className="pc-img"
                  src={slide.img}
                  alt={slide.title}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="pc-hover" tabIndex={-1}>
                  <h3>{slide.title}</h3>
                  <p>{slide.desc}</p>
                  <a className="pc-btn" href={slide.link}>
                    View Case Study <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className="pc-arrow right"
          onClick={next}
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Dots */}
      <div className="pc-dots" role="tablist" aria-label="Carousel indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`pc-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
