// BrandMeDesignShowcase.jsx
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./showcase.css";

export default function BrandMeDesignShowcase({
  id = "brandme-design-showcase",
  eyebrow = "Featured Works",
  title = "Digital Design Showcase",
  note =
    "A small set of work that shows my brand style. Click a tile to view the full image and read short notes.",
  bgImage = "/assets/PortfolioDesignProjectDetail1BackgroundImage/aman-jakhar-XGpFKxP5Llk-unsplash.jpg",
}) {
  const items = [
    {
      id: "w01",
      title: "Brand Moodboard",
      img: "/assets/Artwork/Moodboard.png",
      desc: `I put this moodboard together first. I pinned warm colours (peach/cream) and soft textures so the brand feels friendly.

What I did
- Collected images, colours and shapes I like
- Chose round forms and light grain for a human feel

How I used it
- Guided my colours, spacing and shadows across pages

Tools
- Pinterest to gather, Photoshop/Illustrator to try combinations.`,
    },
    {
      id: "w02",
      title: "Studio Logo Badge",
      img: "/assets/Artwork/Logo.png",
      desc: `I designed a simple round badge that mixes creativity and tech (brush + laptop). It must work from favicon size to stickers.

Choices
- Clean lines so it stays clear when small
- Gentle inner glow for warmth (no fuzzy edges)

Deliverables
- Colour, outline and single-colour SVG versions.`,
    },
    {
      id: "w03",
      title: "Skills Icons — Set 1",
      img: "/assets/Artwork/Skills_Icons.png",
      desc: `I drew small icons on a 24px grid. The style is playful but tidy.

Rules I followed
- Same grid and padding on every icon
- Same stroke width with rounded ends
- Brand orange plus a darker shadow tint

Use cases
- Skill tiles, feature callouts, social posts.`,
    },
    {
      id: "w04",
      title: "Digital Banner (Hero)",
      img: "/assets/Artwork/Digital_Banner.png",
      desc: `I built a hero that shows my brand at a glance—soft lighting, dotted texture, and simple shapes.

Layout
- Clear flow: title → short line → button
- Shapes guide the eye to the CTA
- Social links are visible but not louder than the button

Why it works
- Strong contrast and touch-friendly sizing.`,
    },
    {
      id: "w05",
      title: "About Page",
      img: "/assets/Artwork/About.png",
      desc: `I wrote a short story about who I am and how I work. The page uses warm colours and rounded cards.

Sections
- Quick intro + values
- Simple timeline of highlights
- Clear path to contact me

Goal
- Make it personal and easy to read.`,
    },
    {
      id: "w06",
      title: "Contact Page",
      img: "/assets/Artwork/Contact.png",
      desc: `I kept the form simple so it feels safe to reach out.

Details
- Clear labels and roomy fields
- Soft focus ring and helpful error states
- Extra panel with email and socials

Result
- Low-stress, friendly way to contact me.`,
    },
    {
      id: "w07",
      title: "Home Page",
      img: "/assets/Artwork/Home.png",
      desc: `I designed a fast first impression: short hero, tiny About preview, and a skills grid.

Decisions
- One clear message and one main CTA
- Skills grid shows icon style + colours
- Soft background gradients echo the moodboard

Feeling
- Warm, tidy and quick to grasp.`,
    },
    {
      id: "w08",
      title: "Portfolio Page",
      img: "/assets/Artwork/Portfolio.png",
      desc: `I used a steady two-column layout with small badges and short summaries.

Why this
- Easy to skim project titles
- Short body text for quick reading
- Soft gradients separate sections without hard lines

Scales
- Works for a few or many projects without redesign.`,
    },
    {
      id: "w09",
      title: "Footer Social Icons",
      img: "/assets/Artwork/Social_media_icons_footer.png",
      desc: `I made tiny icons that still look friendly and sharp.

Care I took
- Optical alignment so the row feels balanced
- Clean SVG exports with the same viewBox

Use
- Placed in hero and global footer for a consistent voice.`,
    },
    {
      id: "w10",
      title: "Portfolio Icons — Set 2",
      img: "/assets/Artwork/Portfolio_icons.png",
      desc: `I created extra icons for project types. Solid shapes with soft tints give depth without heavy outlines.

System
- Small colour accents that match the palette
- Pixel-snapped edges so exports stay crisp

Outcome
- Case-study cards feel connected and easy to scan.`,
    },
  ];

  const innerRef = useRef(null);
  const [viewer, setViewer] = useState(null);

  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dir = useRef("down");

  // Track scroll direction for reveal animation
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dir.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation
  useEffect(() => {
    const root = innerRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-reveal]");
    els.forEach((el) => el.setAttribute("data-anim", "prep"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const state = e.isIntersecting
            ? dir.current === "down"
              ? "in-up"
              : "in-down"
            : dir.current === "down"
            ? "out-up"
            : "out-down";
          e.target.setAttribute("data-anim", state);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    if (!viewer) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && setViewer(null);
    window.addEventListener("keydown", esc);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [viewer]);

  const isHalf = (i) => i >= items.length - 2;

  return (
    <section className="ds-stage" id={id}>
      <div className="ds-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="ds-overlay" />

      <div className="ds-inner" ref={innerRef}>
        <header className="ds-head" data-reveal style={{ "--delay": "40ms" }}>
          <p className="ds-eyebrow">{eyebrow}</p>

          {/* Header panel uses global gradient for title via .title-aurora */}
          <div className="ds-head-glass">
            <h2 className="ds-title title-aurora">{title}</h2>
            <p className="ds-note">{note}</p>
          </div>
        </header>

        <div className="ds-grid">
          {items.map((w, i) => (
            <article
              key={w.id}
              className={`ds-card ${isHalf(i) ? "half" : ""}`}
              data-reveal
              style={{ "--delay": `${80 + i * 60}ms` }}
            >
              <button
                className="ds-thumb"
                aria-label={`Open ${w.title}`}
                style={{ backgroundImage: `url(${w.img})` }}
                onClick={() => setViewer(w)}
              />
              <div className="ds-body">
                <h4 className="ds-name">{w.title}</h4>
                <button className="btn" onClick={() => setViewer(w)}>
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {viewer && <Viewer item={viewer} onClose={() => setViewer(null)} />}
    </section>
  );
}

/* ===== Modal component ===== */
function Viewer({ item, onClose }) {
  const imgRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [maxH, setMaxH] = useState("38vh");

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete) return;
    el?.addEventListener(
      "load",
      () => {
        setMaxH("38vh");
      },
      { once: true }
    );
  }, []);

  return (
    <div className="ds-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ds-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="ds-close" onClick={onClose} aria-label="Close viewer">
          <AiOutlineClose size={22} />
        </button>

        <div className="ds-modal-content">
          <div className="ds-modal-media">
            <img
              ref={imgRef}
              src={item.img}
              alt={item.title}
              className="ds-modal-img"
            />
          </div>

          <aside className="ds-modal-info">
            <h3 className="ds-modal-title">{item.title}</h3>

            <div
              className={`ds-notes ${expanded ? "is-expanded" : ""}`}
              style={{ maxHeight: expanded ? "none" : maxH }}
            >
              <p className="ds-modal-desc">{item.desc}</p>
            </div>

            <div className="ds-modal-actions">
              <button
                className="linkbtn ds-notes-toggle"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Hide notes ▲" : "Read more notes ▼"}
              </button>
              <button className="btn ds-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
