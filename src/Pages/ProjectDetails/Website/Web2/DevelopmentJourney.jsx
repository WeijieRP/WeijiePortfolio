import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

const defaultItems = [
  {
    week: "Week 8",
    title: "Set Up Repo & Schema",
    badges: ["Repo", "EJS Layout", ".env", "ERD"],
    tasks: [
      "Create Git repo; protect main; branch workflow.",
      "Bootstrap Express + EJS layout + partials.",
      "Configure .env (DB creds, session secret).",
      "Draft ERD: users, ccas, sessions, attendance, roles.",
    ],
  },
  {
    week: "Week 9",
    title: "Build CRUD for CCAs & Sessions",
    badges: ["Create", "Read", "Update", "Delete"],
    tasks: [
      "Write models/controllers for CCAs & sessions.",
      "Ship EJS list/detail + create/edit forms.",
      "Add server-side validation + flash states.",
      "Test happy/error paths for CRUD routes.",
    ],
  },
  {
    week: "Week 10",
    title: "Implement Auth & RBAC",
    badges: ["bcrypt", "Sessions", "Role Guard"],
    tasks: [
      "Add register/login/logout with bcrypt + sessions.",
      "Guard routes; enforce Student/Teacher/Admin roles.",
      "Allow Teacher create/edit; Admin manage roles/users.",
      "Handle expiry + unauthorized redirects.",
    ],
  },
  {
    week: "Week 11",
    title: "Add Attendance & SQL Search",
    badges: ["SQL WHERE", "Filters", "Attendance"],
    tasks: [
      "Search CCAs by name/type/teacher (SQL WHERE).",
      "Add filters (day/level/status) with safe params.",
      "Enable attendance mark/undo for sessions.",
      "Cover edge cases: empty query, no results, paging.",
    ],
  },
  {
    week: "Week 12",
    title: "Deploy & Demo",
    badges: ["Render", "Online MySQL", "Slides"],
    tasks: [
      "Deploy app + DB; smoke-test all routes.",
      "Seed Admin/Teacher/Student test accounts.",
      "Polish Bootstrap tables/forms + messages.",
      "Finalize README, slides, and demo script.",
    ],
  },
];

export default function TimeframeCarousel({
  id = "development-timeframe",
  bgImage = "/assets/PortfolioWebProjecDetail1BackgroundImage/mohammad-alizade-yYSXgCI1jP8-unsplash.jpg",
  items = defaultItems,
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  // slide to current index
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // drag/swipe
  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDown = useRef(false);

  const onPointerDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    deltaX.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDown.current || !trackRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? startX.current;
    deltaX.current = x - startX.current;
    trackRef.current.style.transition = "none";
    const base = -index * 100;
    const percentShift =
      (deltaX.current / trackRef.current.clientWidth) * 100;
    trackRef.current.style.transform = `translateX(calc(${base}% + ${percentShift}%))`;
  };

  const onPointerUp = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = "";
    isDown.current = false;
    const threshold = trackRef.current.clientWidth * 0.12;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    else goTo(index);
  };

  // scroll direction (for reveal direction)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
      if (stageRef.current) {
        stageRef.current.setAttribute("data-flow", dirRef.current);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal: direction-aware enter/exit
  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    const targets = host.querySelectorAll("[data-reveal]");

    const io = new IntersectionObserver(
      (entries) => {
        const dir = dirRef.current;
        entries.forEach((e) => {
          const el = e.target;
          const side = el.getAttribute("data-side") || "center";

          const enterRight = "56px";
          const enterLeft = "-56px";
          const exitRight = "56px";
          const exitLeft = "-56px";

          if (dir === "down") {
            el.style.setProperty(
              "--enter-x",
              side === "left" ? enterLeft : enterRight
            );
            el.style.setProperty(
              "--exit-x",
              side === "left" ? exitRight : exitLeft
            );
          } else {
            el.style.setProperty(
              "--enter-x",
              side === "left" ? enterRight : enterLeft
            );
            el.style.setProperty(
              "--exit-x",
              side === "left" ? exitLeft : exitRight
            );
          }

          if (e.isIntersecting) {
            el.classList.add("is-in");
            el.classList.remove("is-out");
          } else {
            el.classList.add("is-out");
            el.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t, i) => {
      t.style.setProperty("--delay", `${Math.min(80 + i * 40, 320)}ms`);
      io.observe(t);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="tf-stage"
      id={id}
      ref={stageRef}
      aria-label="Development timeline"
      data-flow="down"
    >
      <div
        className="tf-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div className="tf-container">
        {/* GLASS PANEL behind title + subtitle */}
        <div className="tf-headglass">
          <h2 className="" data-reveal data-side="left">
            CCA Tracker — Development Timeline
          </h2>
          <p className="tf-sub" data-reveal data-side="left">
            From kickoff to deployment and demo
          </p>
        </div>

        <div
          className="tf-viewport"
          data-reveal
          data-side="right"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article
                className="tf-card"
                key={i}
                role="group"
                aria-roledescription="slide"
              >
                <header className="tf-head">
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges">
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>
                      {b}
                    </li>
                  ))}
                </ul>

                <ul className="tf-list">
                  {w.tasks.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="tf-controls" data-reveal data-side="center">
          <button
            className="tf-btn"
            onClick={prev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <div className="tf-dots" role="tablist" aria-label="Slide dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tf-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
          <button className="tf-btn" onClick={next} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
