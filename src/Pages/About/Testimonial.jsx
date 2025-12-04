// TestimonialsITE.jsx
import React, { useEffect, useRef } from "react";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    name: "Ms Cindy Heng",
    title: "Principal-in-Charge, Student Council CCA",
    org: "Student Development Dept, ITE College Central",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=60",
    quotes: [
      "Wei Jie has grown into a confident, service-minded leader who values teamwork and continuous growth. He is self-reliant and responsible.",
      "He takes initiative, supports high-intensity events, and manages player briefings and crowd control with care for participants’ well-being.",
    ],
  },
  {
    name: "Mr Winston Gan",
    title: "Senior Lecturer, IT Applications Development",
    org: "SEIT / ITE College Central",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=240&q=60",
    quotes: [
      "As IAD Academic Club President, he demonstrates strong leadership—planning activities, rallying Exco members, and following through with diligence.",
      "Strong web knowledge and programming skills—he consistently sets targets, motivates teammates, and helps peers complete projects successfully.",
    ],
  },
];

const DEFAULT_BG = "/assets/AboutBackgroundImage/8407843.jpg";

const LOGOS = ["assets/ITE Logo (FL)Pantone-01.avif", "assets/ITELogo_SC.png"];

export default function TestimonialsITE({
  id = "testimonials-ite",
  heading = "Testimonials",
  sub = "What my ITE lecturers say",
  bgImage = DEFAULT_BG,
}) {
  const ref = useRef(null);
  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const scrollDir = useRef("down");

  // background image
  useEffect(() => {
    const root = ref.current;
    if (root) root.style.setProperty("--ts-bg", `url(${bgImage})`);
  }, [bgImage]);

  // track scroll direction (for subtle reveals if you want later)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      scrollDir.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
      if (!ref.current) return;
      ref.current.classList.toggle("dir-down", scrollDir.current === "down");
      ref.current.classList.toggle("dir-up", scrollDir.current !== "down");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // simple intersection reveal
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const items = root.querySelectorAll("[data-observe]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("is-shown");
          } else {
            el.classList.remove("is-shown");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // content we’ll loop – duplicated into 2 tracks via JSX
  const loopLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="ite-ts-section" id={id} ref={ref}>
      <div className="ite-ts-bg" aria-hidden="true" />
      <div className="ite-ts-halo" aria-hidden="true" />

      <div className="ite-ts-inner">
        <header className="ite-ts-head" data-observe>
          <div
            className="ite-ts-head-glass"
            role="group"
            aria-roledescription="panel"
          >
            {/* 🔹 Use global gradient heading */}
            <h2 className="ite-ts-title title-aurora">{heading}</h2>
            {/* 🔹 Use global subtitle style */}
            <p className="ite-ts-sub section-subtitle">{sub}</p>
          </div>
          <span className="ite-ts-rule" />
        </header>

        {/* Seamless infinite logos – two tracks sliding, no gap */}
        <div className="ite-ts-logos" data-observe>
          <div className="ite-ts-logos-mask" />
          <div className="ite-ts-logos-track">
            {loopLogos.map((src, i) => (
              <div className="ite-ts-logo" key={i}>
                <img src={src} alt="Institution logo" />
              </div>
            ))}
          </div>
          <div className="ite-ts-logos-track ite-ts-logos-track--clone">
            {loopLogos.map((src, i) => (
              <div className="ite-ts-logo" key={`clone-${i}`}>
                <img src={src} alt="Institution logo" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="ite-ts-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="ite-ts-card" key={i} data-observe>
              <div className="ite-ts-quote">
                <span className="ite-ts-quote-mark">“</span>
                {t.quotes.map((q, qi) => (
                  <blockquote key={qi}>{q}</blockquote>
                ))}
              </div>
              <figcaption className="ite-ts-person">
                <img className="ite-ts-avatar" src={t.avatar} alt="" />
                <div className="ite-ts-meta">
                  <div className="ite-ts-name">{t.name}</div>
                  <div className="ite-ts-role">{t.title}</div>
                  <div className="ite-ts-org">{t.org}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
