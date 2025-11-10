import React, { useEffect, useRef } from "react";
import "./solution.css";

/* Bi-directional slide-only reveal */
function useSlideInOut(rootRef, { threshold = 0.2, rootMargin = "-12% 0px -12% 0px" } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduce && reduce.matches) {
      root.querySelectorAll(".sd-reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-in");
          else e.target.classList.remove("is-in");
        }
      },
      { threshold, rootMargin }
    );

    root.querySelectorAll(".sd-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, threshold, rootMargin]);
}

export default function SolutionDesign({
  id = "solution-design",
  bgImage = "/assets/PortfolioDesignProjectDetails2BackgroundImage/bhautik-patel-9Dat9vc-WUE-unsplash.jpg",

  eyebrow = "Solution",
  title = "A clear and consistent design system",
  description = `We keep things simple and intentional. Every page follows the same grid, typography, and color approach, so everything feels connected and easy to follow. Large headlines draw attention to the key message, friendly body text explains things clearly, and buttons stand out just enough to guide users without shouting for attention. The goal is to make the design feel calm, helpful, and confident so people always know where to look, what’s important, and what action to take next.`,

  // Four images for the 2×2 mosaic (right)
  images = [
    { src: "/assets/retro-8581825.jpg", alt: "System example 1" },
    { src: "/assets/1096400_OO6MR20 (1).jpg", alt: "System example 2" },
    { src: "/assets/14546348_rm183-aew-01.jpg", alt: "System example 3" },
    { src: "/assets/2605671_5272.jpg", alt: "System example 4" }
  ],
}) {
  const rootRef = useRef(null);
  useSlideInOut(rootRef, { threshold: 0.2, rootMargin: "-12% 0px -12% 0px" });

  return (
    <section
      ref={rootRef}
      className="sd2-stage"
      id={id}
      style={{ ["--sd2-bg"]: `url(${bgImage})` }}
      aria-label="Design solution"
    >
      <div className="sd2-grid">
        {/* LEFT — card panel */}
        <div className="sd2-copy sd-reveal sd-slide-left" style={{ ["--delay"]: "0ms" }}>
          <div className="sd2-card" role="group" aria-labelledby={`${id}-title`}>
            <p className="sd2-eyebrow">{eyebrow}</p>
            <h2 className="sd2-title" id={`${id}-title`}>{title}</h2>
            <p className="sd2-desc">{description}</p>
          </div>
        </div>

        {/* RIGHT — 2×2 mosaic */}
        <div
          className="sd-reveal sd-slide-right"
          style={{
            ["--delay"]: "140ms",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            alignSelf: "stretch"
          }}
          role="group"
          aria-label="Visual examples"
        >
          {images.slice(0, 4).map((img, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(0,0,0,.38)",
                boxShadow: "0 16px 36px rgba(0,0,0,.46)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <img
                src={img.src}
                alt={img.alt || `Visual ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              {/* optional caption; remove text if you don't want it visible */}
              <figcaption
                style={{
                  margin: 0,
                  padding: "8px 10px",
                  fontSize: "12px",
                  color: "var(--sd2-muted)",
                  borderTop: "1px solid rgba(255,255,255,.18)",
                  textAlign: "center"
                }}
              >
                {img.alt || `Visual ${i + 1}`}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
