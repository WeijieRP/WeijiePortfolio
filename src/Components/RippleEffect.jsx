import React, { useRef, useEffect } from "react";
import "./ripple.css";

/**
 * Mouse-move reactive background ripple / wave overlay.
 * - Tracks cursor position
 * - Generates a smooth radial gradient that fades in/out
 * - Runs across all pages (wrap Layout)
 */
export default function RippleWrapper({ children }) {
  const hostRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const overlay = overlayRef.current;
    if (!host || !overlay) return;

    let x = 0, y = 0;
    const move = (e) => {
      const rect = host.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      overlay.style.setProperty("--x", `${x}px`);
      overlay.style.setProperty("--y", `${y}px`);
    };

    host.addEventListener("mousemove", move);
    return () => host.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="ripple-host" ref={hostRef}>
      {children}
      <div className="mouse-ripple" ref={overlayRef} aria-hidden="true" />
    </div>
  );
}
