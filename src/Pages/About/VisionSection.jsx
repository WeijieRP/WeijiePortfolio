// VisionSection.jsx
import React, { useEffect, useRef } from "react";
import "./vision-section.css";

function normalizeSrc(src = "") {
  if (/^https?:\/\//i.test(src)) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

export default function VisionSection({
  title = "Vision Forward",
  quote = "I want to design and build digital solutions that look great, are simple to use, and make life easier for others.",
  cards = [
    {
      title: "Back-end Design",
      image: "assets/server-5451985.jpg",
      desc:
        "I build secure APIs, structure data, and ensure systems run fast, safe, and reliable.",
    },
    {
      title: "Front-end Design",
      image: "assets/programmer-1653351_1920.png",
      desc:
        "I craft smooth, responsive interfaces that feel natural and help users get things done.",
    },
    {
      title: "UI/UX Design",
      image: "assets/user-interface-1655006_1920.png",
      desc:
        "I turn ideas into usable experiences through research, wireframes, and testing.",
    },
    {
      title: "Innovation & Motion",
      image: "assets/gears-5193383_1920.png",
      desc:
        "I explore VR/AR, animation, and AI workflows to create future-forward digital experiences.",
    },
  ],
}) {
  const ref = useRef(null);
  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const dirRef = useRef("down");

  // Track scroll direction (adds .dir-down / .dir-up on section)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
      if (ref.current) {
        ref.current.classList.toggle(
          "dir-down",
          dirRef.current === "down"
        );
        ref.current.classList.toggle(
          "dir-up",
          dirRef.current === "up"
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax background
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(
        -1,
        Math.min(
          1,
          -(r.top + r.height * 0.5 - vh * 0.5) / (vh * 0.9)
        )
      );
      el.style.setProperty("--bg-ty", `${(p * 44).toFixed(1)}px`);
      el.style.setProperty(
        "--bg-scale",
        (1.02 + Math.abs(p) * 0.05).toFixed(3)
      );
      el.style.setProperty(
        "--bg-burn",
        (0.98 - Math.abs(p) * 0.1).toFixed(3)
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Direction-aware reveal
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll("[data-observe]");
    items.forEach((el, i) => {
      const d = Number(el.getAttribute("data-delay") || i * 90);
      el.style.setProperty("--reveal-delay", `${d}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("is-inview", "was-shown");
          } else {
            el.classList.remove("is-inview");
          }
        });
      },
      { threshold: 0.14, rootMargin: "-10% 0px -10% 0px" }
    );

    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const bgSrc = normalizeSrc(
    "/assets/AboutBackgroundImage/anik-deb-nath-8bSV4ulfbzo-unsplash.jpg"
  );

  return (
    <section
      ref={ref}
      className="vision-section"
      aria-labelledby="vision-title"
    >
      {/* Background */}
      <div className="vision-bg" aria-hidden="true">
        <div
          className="vision-img"
          style={{ backgroundImage: `url("${bgSrc}")` }}
        />
        <div className="vision-overlay" />
      </div>

      {/* Content */}
      <div className="vision-inner">
        {/* Glass wrapper for heading + quote */}
        <div
          className="vision-head-glass"
          data-observe
          data-side="up"
          data-delay="0"
          role="group"
          aria-roledescription="panel"
        >
          <h2
            id="vision-title"
            className="vision-title title-aurora"
          >
            {title}
          </h2>
          <p className="vision-quote section-subtitle">
            “{quote}”
          </p>
        </div>

        <div className="vision-grid">
          {cards.map((c, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <article
                key={i}
                className="vision-card"
                data-observe
                data-side={side}
                data-delay={140 + i * 110}
                tabIndex={0}
              >
                <div className="vision-card__media">
                  <img
                    src={normalizeSrc(c.image)}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className="vision-card__shade"
                    aria-hidden="true"
                  />
                </div>

                <div className="vision-card__body">
                  <h3 className="vision-card__title">{c.title}</h3>
                  <p className="vision-card__desc">{c.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
