// DesignJourneyCarousel.jsx
import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function DesignJourneyCarousel({
  id = "design-journey",
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/javier-miranda-OiiVv1iiB0A-unsplash.jpg",
  items = [
    {
      week: "Week 1",
      title: "Discover the Direction",
      badges: ["Research", "Tone", "References"],
      tasks: [
        "Explore recent UI/UX work to understand warm and human visual styles.",
        "Select 3–5 reference brands for colour, spacing, and texture inspiration.",
        "Define five brand keywords: friendly, warm, crafted, clear, confident.",
        "Identify target users and what they want to get from the site quickly."
      ],
    },
    {
      week: "Week 1–2",
      title: "Shape the Moodboard",
      badges: ["Palette", "Texture", "Swatches"],
      tasks: [
        "Gather images featuring peach and cream warmth with soft lighting.",
        "Experiment with subtle paper and fabric textures for a tactile feel.",
        "Lock in the core colour palette and export swatches for design tools.",
        "Build a one-page moodboard to unify tone, lighting, and texture direction."
      ],
    },
    {
      week: "Week 2",
      title: "Develop the Logo and Icon Style",
      badges: ["Logo", "Grid", "SVG"],
      tasks: [
        "Sketch simple logo ideas that stay readable at small sizes.",
        "Create icons using a 24px grid with rounded strokes for a friendly look.",
        "Export crisp SVGs and preview them in the browser.",
        "Test visual clarity at favicon and social-icon sizes (16–24px)."
      ],
    },
    {
      week: "Week 3",
      title: "Design the Hero Banner",
      badges: ["CTA First", "Contrast", "Texture"],
      tasks: [
        "Structure a clear flow: headline → short pitch → primary action button.",
        "Add soft glow and dotted paper textures for depth and warmth.",
        "Use simple shapes to subtly guide attention toward the CTA.",
        "Check contrast levels to ensure readable text and accessible buttons."
      ],
    },
    {
      week: "Week 3–4",
      title: "Build the Homepage Structure",
      badges: ["Hierarchy", "Rhythm", "Reveal"],
      tasks: [
        "Arrange key sections in a logical order: hero → skills → brand message.",
        "Apply a consistent spacing and corner-radius system across components.",
        "Add gentle scroll-reveal animations for a polished feel.",
        "Test layout responsiveness across desktop, tablet, and mobile."
      ],
    },
    {
      week: "Week 4",
      title: "Write the About Section",
      badges: ["Bio", "Timeline", "Tone"],
      tasks: [
        "Craft a concise personal introduction that feels warm and genuine.",
        "Design an education and experience timeline with clear icon markers.",
        "Use friendly, simple language instead of technical jargon.",
        "Include a portrait or visual badge styled to match the brand."
      ],
    },
    {
      week: "Week 4–5",
      title: "Create the Portfolio Grid",
      badges: ["Cards", "Hover", "Captions"],
      tasks: [
        "Set up a balanced grid with consistent radiuses, shadows, and spacing.",
        "Apply light hover effects to emphasise content without distraction.",
        "Write short captions explaining what each piece represents and why it matters.",
        "Refine thumbnails for clean cropping and cohesive colour tone."
      ],
    },
    {
      week: "Week 5",
      title: "Refine the Contact Page",
      badges: ["Form", "States", "Socials"],
      tasks: [
        "Use clear labels and generous spacing to keep the form effortless to scan.",
        "Add friendly focus, error, and success indicators for confidence.",
        "Style email and social icons with consistent sizing and alignment.",
        "Maintain a welcoming tone that encourages collaboration and conversation."
      ],
    },
    {
      week: "Week 6–7",
      title: "Prepare the Final Delivery",
      badges: ["Assets", "Slides", "QA"],
      tasks: [
        "Export final design assets in clean folders (SVG/PNG/fonts).",
        "Review spacing, copy, links, and accessibility across pages.",
        "Create simple slides summarising the journey and key decisions.",
        "Compile files, polish presentation notes, and finalise submission package."
      ],
    },
  ]
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDown = useRef(false);

  const onPointerDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    deltaX.current = 0;
  };
  const onPointerMove = (e) => {
    if (!isDown.current || !trackRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? startX.current;
    deltaX.current = x - startX.current;
    trackRef.current.style.transition = "none";
    const base = -index * 100;
    const percentShift = (deltaX.current / trackRef.current.clientWidth) * 100;
    trackRef.current.style.transform = `translateX(calc(${base}% + ${percentShift}%))`;
  };
  const onPointerUp = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = "";
    isDown.current = false;
    const threshold = trackRef.current.clientWidth * 0.12;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    else goTo(index);
  };

  return (
    <section className="tf-stage" id={id} aria-label="Design journey timeline">
      <div className="tf-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      {/* overlay removed */}

      <div className="tf-container">
        <h2 className="tf-title">Design Journey From Concept to Launch</h2>
        <p className="tf-sub">A week-by-week view of how the brand and site came together.</p>

        <div
          className="tf-viewport"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article className="tf-card" key={i} role="group" aria-roledescription="slide">
                <header className="tf-head">
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges">
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>{b}</li>
                  ))}
                </ul>

                <ul className="tf-list">
                  {w.tasks.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="tf-controls">
          <button className="tf-btn" onClick={prev} aria-label="Previous slide">←</button>
          <div className="tf-dots" role="tablist" aria-label="Slide dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tf-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
          <button className="tf-btn" onClick={next} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  );
}
