import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./scroll-to-top.css";

function pickScrollContainer(selector) {
  if (selector) {
    const el = document.querySelector(selector);
    if (el) return el;
    console.warn("[ScrollToTop] containerSelector not found:", selector);
  }
  // common root
  const root = document.getElementById("root") || document.getElementById("app");
  if (root && root.scrollHeight > root.clientHeight &&
      getComputedStyle(root).overflowY !== "visible") {
    return root;
  }
  // largest scrollable element
  let best = null, max = 0;
  document.querySelectorAll("*").forEach((el) => {
    const cs = getComputedStyle(el);
    const scrollable = (cs.overflowY === "auto" || cs.overflowY === "scroll")
                       && el.scrollHeight > el.clientHeight && el.clientHeight > 0;
    if (scrollable && el.scrollHeight > max) { best = el; max = el.scrollHeight; }
  });
  return best || document.scrollingElement || document.documentElement;
}

function topOf(el) {
  return el === window ? (window.scrollY || window.pageYOffset || 0) : el.scrollTop || 0;
}

function smoothTop(el) {
  if (el === window || el === document.scrollingElement || el === document.documentElement) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    el.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" }); // in case body also scrolled
  }
}

export default function ScrollToTopButton({
  threshold = 120,
  containerSelector,   // e.g. ".scroll-shell" or "#root"
  forceVisible = false // set to true to prove it's rendering
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollElRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const el = (scrollElRef.current = pickScrollContainer(containerSelector));
    const target = (el === document.documentElement) ? window : el;

    console.info("[ScrollToTop] Attached to:", el === window ? "window" : el);

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const pos = (target === window) ? window.scrollY : el.scrollTop;
        setVisible(pos > threshold);
        rafRef.current = 0;
      });
    };

    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold, containerSelector]);

  const btn = (
    <button
      className={`scroll-top-btn ${(forceVisible || visible) ? "show" : ""}`}
      onClick={() => smoothTop(scrollElRef.current)}
      aria-label="Scroll back to top"
      data-test-mounted="true"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 5v14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );

  // Portal keeps it above everything
  return mounted ? createPortal(btn, document.body) : btn;
}
