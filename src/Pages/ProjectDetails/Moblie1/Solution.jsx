// BrandMeSolution.jsx
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "brandme-solution",
  sectionBg = "/assets/PortfolioMobileProjectDetails1BackgroundImage/matteo-kutufa-Cbe8jHqoPkA-unsplash.jpg",
  // You can swap this to your own mockups any time
  visual = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1800&auto=format&fit=crop",
}) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  // Reveal on scroll
  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll("[data-ani]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
          else e.target.classList.remove("in-view");
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax image movement
  useEffect(() => {
    const onScroll = () => {
      const y = (window.scrollY || 0) * 0.12;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="bms-stage"
      style={{ backgroundImage: `url(${sectionBg})` }}
      aria-label="GPA Calculator solution"
    >
      <div className="bms-overlay" aria-hidden="true" />

      <div className="bms-inner">
        {/* LEFT: CARD PANEL */}
        <div className="bms-col-left" data-ani>
          <div className="bms-card">
            <p className="bms-eyebrow">GPA Calculator App</p>
            <h2 className="bms-title">Solution & Approach</h2>

            <p className="bms-sub">
              I built a small, fast mobile app with Flutter and Dart. The flow is
              simple: add a module, enter the credits and grade, and the GPA updates
              instantly. Data is saved on the device so it works offline. The screens
              use clear labels, big touch targets, and checks to prevent mistakes.
              You can group modules by semester, see current and overall GPA, and
              reset or export your data when needed. The goal is a clean tool that
              does one job well—help students track results without stress.
            </p>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <figure className="bms-col-right" data-ani>
          <div
            className="bms-img"
            ref={imgRef}
            style={{ backgroundImage: `url(${visual})` }}
            role="img"
            aria-label="App mockups showing module entry and instant GPA result"
          />
          <figcaption className="bms-cap">
            Screens: add module → enter credits & grade → instant GPA.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
