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
      "He takes initiative, supports high-intensity events, and manages player briefings and crowd control with care for participants’ well-being."
    ]
  },
  {
    name: "Mr Winston Gan",
    title: "Senior Lecturer, IT Applications Development",
    org: "SEIT / ITE College Central",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=240&q=60",
    quotes: [
      "As IAD Academic Club President, he demonstrates strong leadership—planning activities, rallying Exco members, and following through with diligence.",
      "Strong web knowledge and programming skills—he consistently sets targets, motivates teammates, and helps peers complete projects successfully."
    ]
  }
];

const DEFAULT_BG = "/assets/AboutBackgroundImage/8407843.jpg";

const LOGOS = [
  "assets/ITE Logo (FL)Pantone-01.avif",
  "assets/ITELogo_SC.png"
];

export default function TestimonialsITE({
  id = "testimonials-ite",
  heading = "Testimonials",
  sub = "What my ITE lecturers say",
  bgImage = DEFAULT_BG
}) {
  const ref = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollDir = useRef("down");

  // Apply background image
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.style.setProperty("--ts-bg", `url(${bgImage})`);
  }, [bgImage]);

  // Track scroll direction (for left/right slide)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      scrollDir.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
      ref.current?.classList.toggle("dir-down", scrollDir.current === "down");
      ref.current?.classList.toggle("dir-up", scrollDir.current !== "down");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection + direction-aware animations
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll("[data-observe]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const dir = scrollDir.current; // "down" | "up"
          if (entry.isIntersecting) {
            el.classList.remove("leave-up", "leave-down");
            el.classList.add(dir === "down" ? "enter-up" : "enter-down", "is-shown");
          } else {
            el.classList.remove("enter-up", "enter-down", "is-shown");
            el.classList.add(dir === "down" ? "leave-up" : "leave-down");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Duplicate logos for seamless loop
  const loopLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      className="ite-ts-section"
      id={id}
      ref={ref}
      aria-labelledby={`${id}-title`}
      style={{ "--ts-bg": `url(${bgImage})` }}
    >
      {/* Background */}
      <div className="ite-ts-bg" aria-hidden="true" />
      <div className="ite-ts-halo" aria-hidden="true" />

      {/* Content */}
      <div className="ite-ts-inner" data-observe data-dir="left">
        <header className="ite-ts-head" data-observe data-dir="left">
          <h2 className="ite-ts-title" id={`${id}-title`}>{heading}</h2>
          <p className="ite-ts-sub">{sub}</p>
          <span className="ite-ts-rule" />
        </header>

        {/* Logos */}
        <div className="ite-ts-logos" data-observe data-dir="right" aria-label="Institutions">
          <div className="ite-ts-logos-mask" aria-hidden="true" />
          <div className="ite-ts-logos-track" role="list">
            {loopLogos.map((src, i) => (
              <div className="ite-ts-logo" role="listitem" key={`${src}-${i}`}>
                <img src={src} alt="Institution logo" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="ite-ts-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              className="ite-ts-card sheen"
              key={i}
              data-observe
              data-dir={i % 2 === 0 ? "left" : "right"}
            >
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
