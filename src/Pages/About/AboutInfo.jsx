// AboutIntro.jsx
import React, { useEffect, useRef } from "react";
import "./aboutinfo.css";

export default function AboutIntro({
  bgImage = "/about-bg-4k.jpg",
  title = "Hi, I’m Wei Jie",
  paragraphs = [
    <>I’m an <span className="accent">aspiring full-stack developer</span> with a strong UI/UX mindset.</>,
    <>I’m learning to <span className="accent">design clean interfaces</span> and <span className="accent">build reliable apps</span> end-to-end.</>,
    <>From sketch to ship — I <span className="accent">turn ideas into working products</span> and improve with each project.</>,
  ],
}) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const lastY = useRef(0);

  // Track scroll direction on the section (adds .dir-down / .dir-up)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      el.classList.toggle("dir-down", y > lastY.current);
      el.classList.toggle("dir-up", y <= lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on enter (LEFT/RIGHT) and slide back out on exit; add per-element stagger
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const targets = Array.from(root.querySelectorAll("[data-reveal]"));
    targets.forEach((el, i) => {
      const delay = Number(el.getAttribute("data-delay") || i * 120);
      el.style.transitionDelay = `${delay}ms`;
    });

    if (prefersReduced) {
      targets.forEach((t) => t.classList.add("is-inview", "was-shown"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.add("is-inview", "was-shown");
          } else {
            el.classList.remove("is-inview");
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Gentle background/content parallax (doesn't touch child transforms)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY || 0;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.02)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * 0.04}px, 0)`;
      }
    };
    const onScroll = () => (raf ? null : (raf = requestAnimationFrame(tick)));
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="about-intro has-bg" id="about-intro" ref={sectionRef}>
      <div
        ref={bgRef}
        className="intro-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />
      <div className="intro-vignette" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-sweep" aria-hidden="true" />

      <div ref={contentRef} className="intro-inner">
        {/* Slides in from LEFT */}
        <h2 className="intro-title" data-reveal data-anim="left" data-delay="0">
          {title}
        </h2>

        {/* Lines alternate RIGHT / LEFT */}
        <div className="intro-copy">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="intro-line"
              data-reveal
              data-anim={i % 2 === 0 ? "right" : "left"}
              data-delay={160 + i * 140}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
