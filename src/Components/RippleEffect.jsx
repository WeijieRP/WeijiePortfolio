import React, { useRef, useEffect } from "react";
import "./ripple.css";

/**
 * Mouse/Touch reactive ripple overlay.
 * - Visible on move, fades out on idle/leave
 * - Works across pages (wrap your Layout/App)
 */
export default function RippleWrapper({ children }) {
  const hostRef = useRef(null);
  const overlayRef = useRef(null);
  const rafRef = useRef(0);
  const last = useRef({ x: 0, y: 0 });
  const fadeTimer = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const overlay = overlayRef.current;
    if (!host || !overlay) return;

    const setActive = (on) => {
      host.dataset.active = on ? "1" : "0";
    };

    const scheduleFadeOut = () => {
      clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => setActive(false), 250); // idle fade
    };

    const update = (clientX, clientY) => {
      const rect = host.getBoundingClientRect();
      last.current.x = clientX - rect.left;
      last.current.y = clientY - rect.top;

      // rAF to avoid thrashing
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          overlay.style.setProperty("--x", `${last.current.x}px`);
          overlay.style.setProperty("--y", `${last.current.y}px`);
          rafRef.current = 0;
        });
      }
    };

    const onPointerMove = (e) => {
      setActive(true);
      scheduleFadeOut();
      update(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      setActive(true);
      scheduleFadeOut();
      const t = e.touches[0];
      update(t.clientX, t.clientY);
    };

    const onLeave = () => setActive(false);

    // Events
    host.addEventListener("mousemove", onPointerMove, { passive: true });
    host.addEventListener("touchmove", onTouchMove, { passive: true });
    host.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(fadeTimer.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      host.removeEventListener("mousemove", onPointerMove);
      host.removeEventListener("touchmove", onTouchMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="ripple-host" ref={hostRef} data-active="0">
      {/* overlay ABOVE content but non-interactive */}
      <div className="mouse-ripple" ref={overlayRef} aria-hidden="true" />
      {children}
    </div>
  );
}
