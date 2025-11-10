import React, { useEffect, useMemo, useRef, useState } from "react";
import "./hero.css";

/* tiny helper for animated words */
function Words({ text, className }) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  return (
    <span className={`words ${className || ""}`} aria-label={text}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={`s-${i}`} className="sp" aria-hidden="true">
            {tok}
          </span>
        ) : (
          <span
            key={`w-${i}`}
            className="word"
            style={{
              ["--delay"]: `${i * 60}ms`,
              ["--dur"]: `${2600 + (i % 5) * 140}ms`,
              ["--amp"]: `${6 + (i % 3) * 2}px`,
            }}
          >
            {tok}
          </span>
        )
      )}
    </span>
  );
}

export default function HomeHero({
  id = "home-hero",
  bgImage = "/assets/HomeBackgroundImage/Dark.jpg",
}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const rippleRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(hover: none)");
    const upd = () => setIsTouch(m.matches);
    upd();
    m.addEventListener?.("change", upd);
    return () => m.removeEventListener?.("change", upd);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.classList.add("is-mounted");
    vp.classList.add("is-autofocus");
    const t = setTimeout(() => vp.classList.remove("is-autofocus"), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const frame = () => {
      const el = sectionRef.current;
      const vp = viewportRef.current;
      if (el && vp) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const enter = vh;
        const leave = -rect.height;
        const p = Math.min(1, Math.max(0, (enter - rect.top) / (enter - leave)));
        const wide = window.innerWidth >= 1024;
        const startScale = wide ? 1.45 : 1.28;
        const scale = startScale - (startScale - 1) * p;
        const drift = (wide ? 140 : 80) * (1 - p);
        vp.style.setProperty("--z-scale", scale.toFixed(4));
        vp.style.setProperty("--z-ty", `${drift.toFixed(1)}px`);
      }
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting
            ? e.target.classList.add("is-inview")
            : e.target.classList.remove("is-inview")
        ),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!viewportRef.current || isTouch) return;
    const vp = viewportRef.current;
    const ripple = rippleRef.current;
    let raf = 0;
    const onMove = (e) => {
      if (!ripple) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = vp.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        vp.style.setProperty("--mx", `${x}px`);
        vp.style.setProperty("--my", `${y}px`);
      });
    };
    const onEnter = () => vp.classList.add("is-hovering");
    const onLeave = () => vp.classList.remove("is-hovering");

    vp.addEventListener("mousemove", onMove, { passive: true });
    vp.addEventListener("mouseenter", onEnter);
    vp.addEventListener("mouseleave", onLeave);
    return () => {
      vp.removeEventListener("mousemove", onMove);
      vp.removeEventListener("mouseenter", onEnter);
      vp.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  const skills = [
    { label: "UI/UX", info: "Prototype, Logo Design, wireframes, user-friendly flows." },
    { label: "Programming", info: "React, JavaScript, Node.js, HTML/CSS." },
    { label: "VR Design", info: "Unity, C#." },
  ];

  const starCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 5 : 10;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    left: Math.random() * 90 + 3,
    delay: (i % 5) * 1.2 + Math.random(),
    duration: 6 + Math.random() * 4,
  }));

  return (
    <section className="hero-stage" id={id} ref={sectionRef}>
      <div
        className="hero-viewport"
        ref={viewportRef}
        style={{
          ["--ripple-size"]:
            typeof window !== "undefined" && window.innerWidth > 1280
              ? "640px"
              : "520px",
        }}
      >
        <div
          className="hero-bg"
          style={{ backgroundImage: `url('${bgImage}')` }}
          aria-hidden="true"
        />
        <div className="hero-focus" aria-hidden="true" />
        <div className="hero-ripple" ref={rippleRef} aria-hidden="true" />

        <div className="hero-grid">
          <div className="creative">
            {/* 👇 galaxy style added */}
            <h1 className="reveal galaxy-title--soft" data-anim="left">CREATIVITY</h1>
          </div>

          <div className="astro">
            <div className="astro-ship reveal" data-anim="right">
              <div className="thrusters" aria-hidden="true">
                <div className="flame left" />
                <div className="flame right" />
                <div className="thrust-glow" />
              </div>
              <img className="astronaut" src="assets/bot.png" alt="Astronaut" draggable="false" />
            </div>

            <div className="panel-under-astro reveal" data-anim="up">
              <div className="panel-glass">
                <div className="stat">
                  <div className="value">10+</div>
                  <div className="label">Projects shipped</div>
                  <div className="hint">Web apps, UI/UX, VR</div>
                </div>
                <div className="stat">
                  <div className="value">5+</div>
                  <div className="label">Core skills</div>
                  <div className="hint">Design · React · Node · DB · Unity</div>
                </div>
                <div className="stat">
                  <div className="value">1</div>
                  <div className="label">Main goal</div>
                  <div className="hint">Turn ideas into working products</div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills">
            <h2 className="hero-lead reveal" data-anim="up">
              Crafting seamless interfaces. Developing smart, scalable apps.
            </h2>
            <p className="hero-lead reveal" data-anim="up">
              From UX research to real-world applications — I design, build, and ship digital products with purpose.
            </p>

            <div className="skills-grid">
              {skills.map((s, i) => (
                <article
                  key={i}
                  className={`skill-card reveal ${i === skills.length - 1 ? "span-full" : ""}`}
                  data-anim={i % 2 === 0 ? "left" : "right"}
                >
                  <div className="card-title">
                    <h3>{s.label}</h3>
                    <p className="muted">{s.info}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <img className="ufo" src="assets/UFO.png" alt="UFO" />
        {stars.map((s) => (
          <img
            key={s.id}
            className="shooting-star"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2b50.png"
            alt=""
            style={{
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

        <div className="hero-bottom-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
