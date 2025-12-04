import React, { useEffect, useRef, useState } from "react";
import "./hero.css";

export default function HomeHero({
  id = "home-hero",
  bgImage = "/assets/HomeBackgroundImage/Dark.jpg",
}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const rippleRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // ===== Config (must match CSS var --intro-dur) =====
  const INTRO_MS = 1800;

  // detect touch (for spotlight behaviour)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(hover: none)");
    const upd = () => setIsTouch(m.matches);
    upd();
    m.addEventListener?.("change", upd);
    return () => m.removeEventListener?.("change", upd);
  }, []);

  // entry focus + intro gate
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // start intro
    vp.classList.add("is-mounted", "is-autofocus");

    const t1 = setTimeout(() => vp.classList.remove("is-autofocus"), 900);
    const t2 = setTimeout(() => vp.classList.add("is-intro-done"), INTRO_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // subtle parallax zoom (while scrolling)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let rafId = 0;

    const frame = () => {
      const el = sectionRef.current;
      const vp = viewportRef.current;
      if (el && vp) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const enter = vh;
        const leave = -rect.height;
        const p = Math.min(
          1,
          Math.max(0, (enter - rect.top) / (enter - leave))
        );

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

  // mouse spotlight follow (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vp = viewportRef.current;
    if (!vp || isTouch) return;

    const handleMove = (e) => {
      const rect = vp.getBoundingClientClientRect
        ? vp.getBoundingClientRect()
        : vp.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      vp.style.setProperty("--mx", `${x}%`);
      vp.style.setProperty("--my", `${y}%`);
    };

    const handleLeave = () => {
      vp.style.setProperty("--mx", "50%");
      vp.style.setProperty("--my", "50%");
    };

    vp.addEventListener("pointermove", handleMove);
    vp.addEventListener("pointerleave", handleLeave);
    return () => {
      vp.removeEventListener("pointermove", handleMove);
      vp.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch]);

  // reveal on scroll (will only show after is-intro-done)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof window === "undefined") return;
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

  const skills = [
    {
      label: "UI/UX",
      info: "Prototype, logo design, wireframes, user-friendly flows.",
    },
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
          ["--intro-dur"]: `${INTRO_MS}ms`,
        }}
      >
        {/* Background image */}
        <div
          className="hero-bg"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />

        {/* Spotlight overlay */}
        <div className="hero-focus" />
        <div className="hero-ripple" ref={rippleRef} />

        <div className="hero-grid">
          {/* TOP — Left panel full-width */}
          <div className="hero-left">
            <div className="creative">
              <h1
                className="hero-title title-aurora reveal"
                data-anim="left"
                data-float
              >
                CREATIVITY
              </h1>
            </div>

            <div className="skills">
              <h2 className="hero-lead reveal" data-anim="up">
                Crafting seamless interfaces. Developing smart, scalable apps.
              </h2>
              <p className="hero-lead reveal" data-anim="up">
                From UX research to real-world applications — I design, build,
                and ship digital products with purpose.
              </p>

              <div className="skills-grid">
                {skills.map((s, i) => (
                  <article
                    key={i}
                    className={`skill-card reveal ${
                      i === skills.length - 1 ? "span-full" : ""
                    }`}
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

          {/* BOTTOM — Right panel full-width */}
          <div className="hero-right">
            <div className="astro">
              <div
                className="astro-ship reveal"
                data-anim="right"
                data-float
              >
                <span className="jet j1" aria-hidden="true" />
                <span className="jet j2" aria-hidden="true" />
                <span className="earth-glow" aria-hidden="true" />

                <img
                  className="astronaut"
                  src="/assets/vecteezy_astronaut-floating-in-space-with-earth-in-his-hand_50158022.png"
                  alt="Astronaut"
                  draggable="false"
                />
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
                    <div className="hint">
                      Design · React · Node · DB · Unity
                    </div>
                  </div>
                  <div className="stat">
                    <div className="value">1</div>
                    <div className="label">Main goal</div>
                    <div className="hint">
                      Turn ideas into working products
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UFO + shooting stars */}
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

        <div className="hero-bottom-spacer" />
      </div>
    </section>
  );
}
