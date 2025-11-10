// BrandMeSolution.jsx
import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function BrandMeSolution({
  id = "brandme-solution",

  // Bright, visible section background (change anytime)
  sectionBg = "/assets/PortfolioVRProjectDetails2BackgroundImage/boliviainteligente-bGNVZnk9ymk-unsplash.jpg",

  // One illustration on the right
  visual = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",

  // Copy
  eyebrow = "Solution",
  title = "How I built the VR Escape Room",
  sub = "A small, polished VR experience made to run smoothly and feel clear to play.",
  body = `I mapped a simple room flow with four focused puzzles, then built the scenes in Unity
with an XR rig and basic interactions. I kept meshes and textures light so the headset stays
smooth, and I named files clearly for handover. The final package includes a short gameplay
video that shows the idea quickly, the APK build, and the Unity project without the Library
folder. I also created simple Illustrator/Photoshop visuals to guide the style and keep the
look consistent across rooms.`,
}) {
  const sectionRef = useRef(null);
  const imgParallaxRef = useRef(null);

  // Reveal on scroll (fade + slide)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-ani]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
          else e.target.classList.remove("in-view");
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Gentle parallax for the right image
  useEffect(() => {
    const onScroll = () => {
      const y = (window.scrollY || 0) * 0.10;
      if (imgParallaxRef.current) {
        imgParallaxRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="bms-stage"
      style={{ backgroundImage: `url(${sectionBg})` }}
      aria-label="VR Escape Room solution"
    >
      {/* No overlay — background stays visible */}

      <div className="bms-inner">
        {/* LEFT: Card panel with all copy */}
        <div className="bms-col-left slide-left" data-ani data-side="left">
          <article className="bms-panel" role="group" aria-label="Solution details">
            {eyebrow ? <p className="bms-eyebrow">{eyebrow}</p> : null}
            <h2 className="bms-title">{title}</h2>
            <p className="bms-sub">{sub}</p>

            <div className="bms-desc">
              <p>{body}</p>
            </div>
          </article>
        </div>

        {/* RIGHT: Illustration */}
        <figure className="bms-col-right slide-right" data-ani data-side="right">
          <div
            className="bms-img"
            ref={imgParallaxRef}
            style={{ backgroundImage: `url(${visual})` }}
            aria-label="Illustration / scene preview"
          />
          <figcaption className="bms-cap">
            One look at the feel: clean scenes, readable lighting, smooth headset performance.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
