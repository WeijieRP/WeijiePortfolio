import React, { useEffect, useRef, useState } from "react";
import "./highlight.css";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [scrollDir, setScrollDir] = useState("down");

  // Track scroll direction
  useEffect(() => {
    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrollDir(y > lastY ? "down" : "up");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll (title + cards)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.dataset.dir = scrollDir;      // decide slide-from side
            el.classList.add("in-view");
          } else {
            el.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scrollDir]);

  const items = [
    {
      icon: "/assets/Icons/icons8-projects-48.png",
      value: "10+",
      title: "Projects Completed",
      desc:
        "Over ten shipped builds — from web systems to VR — merging clean code and thoughtful design.",
    },
    {
      icon: "/assets/Icons/icons8-skills-48.png",
      value: "5+",
      title: "Core Skills I Use",
      desc:
        "React, Node.js, MySQL, and UI/UX — combining usability with solid engineering.",
    },
    {
      icon: "/assets/Icons/icons8-goals-64.png",
      value: "1 Goal",
      title: "Make Things That Help People",
      desc:
        "I build tools and experiences that solve real problems and feel great to use.",
    },
  ];

  const bgImage = "/assets/AboutBackgroundImage/astronomy.jpg";

  return (
    <section ref={sectionRef} className="stats-section no-blur">
      {/* Background (no filters, no overlays) */}
      <div
        className="stats-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div className="stats-inner">
        <header className="stats-header" data-reveal>
          <h2 className="stats-heading galaxy-title--soft">
            Here Are Some Highlights
          </h2>
          <p className="stats-sub">
            A glimpse of my journey — design × code × creativity coming together.
          </p>
        </header>

        <div className="stats-grid">
          {items.map((it, i) => (
            <article
              key={i}
              className="stat-card"
              data-reveal
              style={{ transitionDelay: `${i * 0.12}s` }}
              tabIndex={0}
            >
              <div className="card-icon">
                <img src={it.icon} alt={it.title} />
              </div>
              <div className="card-number">{it.value}</div>
              <h3 className="card-title">{it.title}</h3>
              <p className="card-desc">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
