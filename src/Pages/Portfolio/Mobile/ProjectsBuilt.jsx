import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt({
  bgImage = "/assets/PortfolioMobileBackgroundImage/planet-5509642_1920.jpg",
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root) root.style.setProperty("--pg-bg", `url("${bgImage}")`);
  }, [bgImage]);

  // Scroll direction tracker
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      root.setAttribute("data-scroll", y > lastY ? "down" : "up");
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = root.querySelectorAll(".pg-card");
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-in", e.isIntersecting)),
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: "GPA Tracker — Grade Calculator",
      desc:
        "I built this app to help students calculate their GPA easily. Users add subjects, credits, and grades, and the results update instantly. It works offline and uses a clean, simple interface.",
      img: "/assets/Moblie/MobileView1.jpg",
      href: "/portfolio/Mobile/projectdetail1",
      tag: "Flutter · Dart",
    },
    {
      title: "Diary Tracker — Food & Calorie Log",
      desc:
        "I created this diary app so users can record meals, scan barcodes, and check calorie information in real time. It focuses on speed, usability, and helping people make healthier daily choices.",
      img: "/assets/mobile/diary-tracker.png",
      href: "/portfolio/Mobile/projectdetail2",
      tag: "Flutter · Dart",
    },
  ];

  return (
    <section className="pg-section" ref={rootRef} id="mobile-projects">
      <div className="pg-bg" aria-hidden="true" />

      <header className="pg-header">
        <h2 className="pg-title-metallic">Project that i build</h2>
        <p className="pg-subtitle">
          These were my early projects where I learned to design and develop
          full-featured Flutter applications for real-world use.
        </p>
      </header>

      <div className="pg-grid-2x2">
        {projects.map((p, i) => (
          <article key={p.title} className="pg-card" data-dir={i % 2 === 0 ? "left" : "right"}>
            <figure className="pg-media">
              <img src={p.img} alt={p.title} loading="lazy" />
            </figure>

            <div className="pg-body">
              <span className="pg-tag">{p.tag}</span>
              <h3 className="pg-card-title">{p.title}</h3>
              <p className="pg-card-desc">{p.desc}</p>
              <Link to={p.href} className="pg-btn">View Project</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
