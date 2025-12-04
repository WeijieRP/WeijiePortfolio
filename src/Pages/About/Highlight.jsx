import React, { useEffect, useRef, useState } from "react";
import "./highlight.css";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [scrollDir, setScrollDir] = useState("down");

  // Detect scroll direction
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

  // Reveal animation observer
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.dataset.dir = scrollDir;
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

  // Content
  const items = [
    {
      icon: "/assets/Icons/icons8-projects-48.png",
      value: "10+",
      title: "Projects Completed",
      desc:
        "I have completed over 10 projects, creating useful and easy-to-use solutions for everyone.",
    },
    {
      icon: "/assets/Icons/icons8-skills-48.png",
      value: "5+",
      title: "Core Skills I Use",
      desc:
        "React.js, Node.js, Express.js, Python, CSS, HTML, and JavaScript are my main skills.",
    },
    {
      icon: "/assets/Icons/icons8-goals-64.png",
      value: "1 Goal",
      title: "Make Things That Help People",
      desc:
        "My goal is to create projects that improve people’s experiences, combining my skills and projects to always focus on the user.",
    },
  ];

  const bgImage = "/assets/AboutBackgroundImage/astronomy.jpg";

  return (
    <section ref={sectionRef} className="stats-section no-blur">
      <div
        className="stats-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div className="stats-inner">
        <header className="stats-header" data-reveal>
          {/* Glass panel wrapper for title + subtitle (no blur) */}
          <div
            className="stats-header-glass"
            role="group"
            aria-roledescription="panel"
          >
            {/* 🔹 Title uses global gradient */}
            <h2 className="stats-heading title-aurora">
              Here Are Some Highlights
            </h2>

            {/* 🔹 Subtitle uses global section-subtitle */}
            <p className="stats-sub section-subtitle">
              A glimpse of my journey — design × code × creativity coming
              together.
            </p>
          </div>
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
