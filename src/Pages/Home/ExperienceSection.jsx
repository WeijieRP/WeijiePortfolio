import React, { useEffect, useMemo, useRef } from "react";
import "./experience.css";

/* helpers */
const toRad = (d) => (d * Math.PI) / 180;

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

/* reveal */
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-inview", e.isIntersecting)
        ),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export default function Experience() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const coreRef = useRef(null);
  const panelRefs = useRef([]);
  const pathRefs = useRef([]);
  const gradRefs = useRef([]);

  useReveal(rootRef);

  const items = useMemo(
    () => [
      {
        id: "figma",
        title: "Figma",
        logo: "/assets/Icons/Figma.png",
        copy:
          "I map flows, wireframe quickly, and build pixel-perfect UI for fast feedback and iteration.",
        corner: "tl",
      },
      {
        id: "ai",
        title: "Illustrator",
        logo: "/assets/Icons/Adobe_Illustrator.png",
        copy:
          "I craft logos, icons, and scalable vectors to keep brand assets crisp at any size.",
        corner: "tr",
      },
      {
        id: "xd",
        title: "Adobe XD",
        logo: "/assets/Icons/AdobeXD.png",
        copy:
          "I prototype interactions to validate usability early and communicate intent clearly.",
        corner: "bl",
      },
      {
        id: "ps",
        title: "Photoshop",
        logo: "/assets/Icons/Adobe-Photoshop.png",
        copy:
          "I retouch, light, and composite visuals so screens feel polished and production-ready.",
        corner: "br",
      },
    ],
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    const coreDisc = coreRef.current;
    if (!stage || !coreDisc) return;

    const layout = () => {
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;

      const hubSize = coreDisc.offsetWidth || 360;
      const radius = hubSize / 2;

      const cx = sw / 2;
      const cy = sh / 2;

      // layout tuning
      const SAFE = 48; // padding from stage edges
      const EXTRA_RING = 70; // spacing outside the hub
      const START_ON_RIM = 0.9; // where line starts on circle
      const TIP_FADE = 14; // shorten near the card

      items.forEach((it, i) => {
        const panel = panelRefs.current[i];
        const path = pathRefs.current[i];
        const grad = gradRefs.current[i];
        if (!panel || !path || !grad) return;

        // quadrant angles
        let angle;
        if (it.corner === "tl") angle = 225; // ↖
        else if (it.corner === "tr") angle = 315; // ↗
        else if (it.corner === "bl") angle = 135; // ↙
        else if (it.corner === "br") angle = 45; // ↘
        else angle = 45;

        const dx = Math.cos(toRad(angle));
        const dy = Math.sin(toRad(angle));

        const halfW = (panel.offsetWidth || 0) / 2;
        const halfH = (panel.offsetHeight || 0) / 2;

        // how much the card extends in that direction
        const projectedHalf = Math.abs(dx) * halfW + Math.abs(dy) * halfH;

        // distance from center: circle radius + card edge + spacing
        const ringDist = radius + projectedHalf + EXTRA_RING;

        // but don't go past the stage edges
        const maxDist = maxDistWithinStage({
          cx,
          cy,
          sw,
          sh,
          halfW,
          halfH,
          dx,
          dy,
          safe: SAFE,
        });

        const dist = Math.min(ringDist, maxDist);

        // final panel center position
        const px = cx + dist * dx;
        const py = cy + dist * dy;

        panel.style.left = `${px}px`;
        panel.style.top = `${py}px`;

        // ===== connector line =====

        // start slightly inside the circle
        const sx = cx + radius * START_ON_RIM * dx;
        const sy = cy + radius * START_ON_RIM * dy;

        // vector from card center back toward hub
        const vdx = -dx;
        const vdy = -dy;

        // distance from card center to its edge along that vector
        const kx = vdx !== 0 ? halfW / Math.abs(vdx) : Infinity;
        const ky = vdy !== 0 ? halfH / Math.abs(vdy) : Infinity;
        const k = Math.min(kx, ky);

        const edgeX = px + vdx * k;
        const edgeY = py + vdy * k;

        const ex = edgeX + vdx * TIP_FADE;
        const ey = edgeY + vdy * TIP_FADE;

        path.setAttribute("d", `M ${sx},${sy} L ${ex},${ey}`);
        grad.setAttribute("x1", sx);
        grad.setAttribute("y1", sy);
        grad.setAttribute("x2", ex);
        grad.setAttribute("y2", ey);

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

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(layout);
      ro.observe(stage);
    }

    window.addEventListener("resize", layout);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, [items]);

  return (
    <section ref={rootRef} className="exp">
      <div
        className="exp-bg"
        style={{
          backgroundImage:
            "url(/assets/HomeBackgroundImage/cloudy-1869753_1920.png)",
        }}
      />

      <div ref={stageRef} className="stage">
        {/* CENTER CIRCLE — breathing + glowing */}
        <div className="core breathe">
          <div ref={coreRef} className="core-disc halo">
            <h3 className="exp-title--galaxy">My Design Toolkit</h3>
            <p className="exp-desc">
              I craft seamless interfaces — these are the tools I rely on to
              plan, design, prototype, and polish every screen.
            </p>
          </div>
        </div>

        {/* connectors */}
        <svg className="arrows" width="100%" height="100%">
          <defs>
            {items.map((_, i) => (
              <linearGradient
                key={i}
                id={`lineBlend-${i}`}
                ref={(el) => (gradRefs.current[i] = el)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgba(150,178,255,0)" />
                <stop offset="55%" stopColor="rgba(150,178,255,.95)" />
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

        {/* panels */}
        {items.map((it, i) => (
          <div
            key={it.id}
            ref={(el) => (panelRefs.current[i] = el)}
            className="panel reveal"
          >
            <article className="panel-card">
              <header className="panel-head">
                <img className="tool" src={it.logo} alt={it.title} />
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
