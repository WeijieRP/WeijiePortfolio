import React, { useEffect, useMemo, useRef } from "react";
import "./experience.css";

/* --- helpers --- */
const toRad = (d) => (d * Math.PI) / 180;

/** How far we can travel from (cx,cy) along a direction (dx,dy)
 * before a rectangle of size halfW/halfH would overflow stage (sw x sh).
 * We return the maximum allowed distance so the rect stays fully inside.
 */
function maxDistWithinStage({ cx, cy, sw, sh, halfW, halfH, dx, dy, safe }) {
  const minX = halfW + safe;
  const maxX = sw - halfW - safe;
  const minY = halfH + safe;
  const maxY = sh - halfH - safe;
  const limits = [];

  if (dx > 0) limits.push((maxX - cx) / dx);
  else if (dx < 0) limits.push((minX - cx) / dx);
  if (dy > 0) limits.push((maxY - cy) / dy);
  else if (dy < 0) limits.push((minY - cy) / dy);

  const pos = limits.filter((v) => Number.isFinite(v) && v > 0);
  return pos.length ? Math.min(...pos) : Number.POSITIVE_INFINITY;
}

/* --- reveal --- */
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export default function Experience() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const coreRef  = useRef(null);
  const panelRefs = useRef([]);
  const pathRefs  = useRef([]);
  const gradRefs  = useRef([]);

  useReveal(rootRef);

  const items = useMemo(
    () => [
      {
        id: "figma",
        title: "Figma",
        logo: "assets/Icons/Figma.png",
        copy:
          "I use Figma to plan user journeys, build wireframes, and design high-fidelity UI screens. It helps me collaborate in real-time, test ideas quickly, and iterate fast based on feedback.",
        corner: "tl",
      },
      {
        id: "ai",
        title: "Illustrator",
        logo: "assets/Icons/Adobe_Illustrator.png",
        copy:
          "I use Illustrator for vector graphics, logos, icons, and scalable branding assets. It allows precise control over shapes, typography, and brand-ready design elements.",
        corner: "tr",
      },
      {
        id: "xd",
        title: "Adobe XD",
        logo: "assets/Icons/AdobeXD.png",
        copy:
          "I use Adobe XD to prototype interactive screens and simulate user flows. This helps me validate usability early, gather feedback, and refine the experience before development.",
        corner: "bl",
      },
      {
        id: "ps",
        title: "Photoshop",
        logo: "assets/Icons/Adobe-Photoshop.png",
        copy:
          "I use Photoshop to retouch images, enhance lighting and colour, and prepare polished visual assets. It lets me create realistic textures and mood-driven visuals for UI and marketing.",
        corner: "br",
      },
    ],
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    const core  = coreRef.current;
    if (!stage || !core) return;

    const layout = () => {
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;

      const hubSize = core.offsetWidth;
      const radius  = hubSize / 2;
      const cx = sw / 2;
      const cy = sh / 2;

      const SAFE = 22;
      const RIM_CLEAR = 100;
      const START_ON_RIM = 0.94;
      const TIP_FADE = 10;

      items.forEach((it, i) => {
        const panel = panelRefs.current[i];
        const path  = pathRefs.current[i];
        const grad  = gradRefs.current[i];
        if (!panel || !path || !grad) return;

        let angle = 45;
        if (it.corner === "tl") angle = 225;
        if (it.corner === "tr") angle = 330;
        if (it.corner === "bl") angle = -350;
        if (it.corner === "br") angle = 150;

        const dx = Math.cos(toRad(angle));
        const dy = Math.sin(toRad(angle));

        const halfW = panel.offsetWidth  / 4;
        const halfH = panel.offsetHeight / 3;

        const projectedHalf = Math.abs(dx) * halfW + Math.abs(dy) * halfH;
        const ringDist = radius + projectedHalf + RIM_CLEAR;

        const maxDist = maxDistWithinStage({ cx, cy, sw, sh, halfW, halfH, dx, dy, safe: SAFE });
        const dist = Math.min(ringDist, maxDist);

        const px = cx + dist * dx;
        const py = cy + dist * dy;

        panel.style.left = `${px}px`;
        panel.style.top  = `${py}px`;
        panel.dataset.corner = it.corner;

        const sx = cx + radius * START_ON_RIM * dx;
        const sy = cy + radius * START_ON_RIM * dy;

        const tx = Math.abs(dx) / (halfW || 1);
        const ty = Math.abs(dy) / (halfH || 1);
        const k  = 1 / Math.max(tx, ty);

        const edgeX = px - dx * k;
        const edgeY = py - dy * k;

        const ex = edgeX - dx * TIP_FADE;
        const ey = edgeY - dy * TIP_FADE;

        path.setAttribute("d", `M ${sx},${sy} L ${ex},${ey}`);
        grad.setAttribute("x1", sx); grad.setAttribute("y1", sy);
        grad.setAttribute("x2", ex); grad.setAttribute("y2", ey);

        const stops = grad.querySelectorAll("stop");
        if (stops.length === 3) {
          stops[0].setAttribute("offset", "0%");
          stops[0].setAttribute("stop-color", "rgba(150,178,255,0)");
          stops[1].setAttribute("offset", "55%");
          stops[1].setAttribute("stop-color", "rgba(150,178,255,.95)");
          stops[2].setAttribute("offset", "100%");
          stops[2].setAttribute("stop-color", "rgba(150,178,255,0)");
        }
      });
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(stage);
    window.addEventListener("resize", layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, [items]);

  return (
    <section ref={rootRef} className="exp">
      <div className="exp-bg" style={{ backgroundImage: "url(/assets/HomeBackgroundImage/cloudy-1869753_1920.png)" }} />

      <div ref={stageRef} className="stage">
        {/* central circle */}
        <div className="core">
          <div ref={coreRef} className="core-disc">
            {/* 👇 gradient title applied here only */}
            <h3 className="exp-title--galaxy">My Design Toolkit</h3>
            <p>Simple tools I use to plan, design, test, and polish.</p>
          </div>
        </div>

        {/* connectors (under panels) */}
        <svg className="arrows" width="100%" height="100%">
          <defs>
            {items.map((_, i) => (
              <linearGradient
                key={i}
                id={`lineBlend-${i}`}
                ref={(el) => (gradRefs.current[i] = el)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor="rgba(150,178,255,0)" />
                <stop offset="55%"  stopColor="rgba(150,178,255,.95)" />
                <stop offset="100%" stopColor="rgba(150,178,255,0)" />
              </linearGradient>
            ))}
          </defs>
          {items.map((_, i) => (
            <path
              key={i}
              ref={(el) => (pathRefs.current[i] = el)}
              className="arrow-path"
              style={{ stroke: `url(#lineBlend-${i})` }}
            />
          ))}
        </svg>

        {/* glass panels in four corners */}
        {items.map((it, i) => (
          <div
            key={it.id}
            ref={(el) => (panelRefs.current[i] = el)}
            className="panel reveal"
          >
            <article className="panel-card">
              <header className="panel-head">
                <img className="tool" src={it.logo} alt={it.id} />
                <h4 className="caption">{it.title}</h4>
              </header>
              <p className="copy">{it.copy}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
