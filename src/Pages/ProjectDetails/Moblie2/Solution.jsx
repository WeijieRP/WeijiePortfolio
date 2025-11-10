// BrandMeSolution.jsx (Calorie & Exercise Tracker)
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "brandme-solution",
  sectionBg = "/assets/PortfolioMoblieProjectDetail2BackgroundImage/daniel-olah-_j6wbAlQ1ow-unsplash.jpg",
  // ✅ Replace visual with fitness mockup or stock photo
  visual = "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1800&auto=format&fit=crop",
}) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  // Reveal on scroll (fade in when visible)
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

  // Parallax effect for the image
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
      aria-label="Calorie Tracker solution"
    >
      <div className="bms-overlay" aria-hidden="true" />

      <div className="bms-inner">
        {/* LEFT: Solution Description */}
        <div className="bms-col-left" data-ani>
          <div className="bms-card">
            <p className="bms-eyebrow">Calorie & Exercise Tracker</p>
            <h2 className="bms-title">Solution & Approach</h2>

            <p className="bms-sub">
              I designed a simple mobile app to help people eat better and stay
              active. Users can log their meals in seconds, check how many
              calories they’ve eaten, and see how much they still need to burn.
              The app also lets you add your daily workouts to track your total
              progress.
            </p>

            <p className="bms-sub">
              The focus is on being fast and clear — big buttons, smooth flow,
              and no clutter. Everything works offline too, so you can still
              track your food and exercises without an internet connection. The
              goal is to keep things easy: one screen, simple numbers, real
              progress.
            </p>
          </div>
        </div>

        {/* RIGHT: App Mockup / Visual */}
        <figure className="bms-col-right" data-ani>
          <div
            className="bms-img"
            ref={imgRef}
            style={{ backgroundImage: `url(${visual})` }}
            role="img"
            aria-label="App screens showing calorie tracking and workout summary"
          />
          <figcaption className="bms-cap">
            Screens: log meals → add exercises → see progress instantly.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
