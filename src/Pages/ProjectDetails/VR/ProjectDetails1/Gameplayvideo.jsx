// ARImageCardDemo.jsx
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import "./videodemo.css";

export default function ARImageCardDemo({
  id = "ar-image-card",
  title = "AR Image Card Live demo",
  sub = "The video shows how the AR image card runs inside Unity with Vuforia engine",
  bgImage = "/assets/PortfolioVRProjectDetails1BackgroundImage/time-FFWOjjWCHU0-unsplash.jpg",
  cardFront = "/assets/VR_ArtWork/Font.png",
  cardBack  = "/assets/VR_ArtWork/Back.png",
  youtubeId = "",
  mp4Src    = "/assets/Gameplay/AR_Project_Demo.mp4",
  poster    = "/assets/ar-card-thumb.jpg",
  caption = "Real-time image tracking anchors the 3D logo as soon as the card is recognised.",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  const [showImg, setShowImg]     = useState(null);
  const [showTips, setShowTips]   = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  // scroll dir
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const setVars = (el, fx, fy, tx, ty) => {
      el.style.setProperty("--from-x", fx);
      el.style.setProperty("--from-y", fy);
      el.style.setProperty("--to-x", tx);
      el.style.setProperty("--to-y", ty);
    };

    const io = new IntersectionObserver((entries) => {
      const dir = dirRef.current;
      entries.forEach((e) => {
        const el = e.target;
        const side = el.getAttribute("data-side") || "center";

        const inVars  = 
          side === "left"  ? (dir === "down" ? ["-48px","10px"] : ["48px","10px"]) :
          side === "right" ? (dir === "down" ? ["48px","10px"]  : ["-48px","10px"]) :
                             ["0px","18px"];

        const outVars =
          side === "left"  ? (dir === "down" ? ["0px","0px","-48px","16px"] : ["0px","0px","48px","16px"]) :
          side === "right" ? (dir === "down" ? ["0px","0px","48px","16px"]  : ["0px","0px","-48px","16px"]) :
                             ["0px","0px","0px","18px"];

        if (e.isIntersecting) {
          setVars(el, inVars[0], inVars[1], "0", "0");
          el.classList.add("reveal","is-in");
          el.classList.remove("is-out");
        } else {
          setVars(el, outVars[0], outVars[1], outVars[2], outVars[3]);
          el.classList.add("reveal","is-out");
          el.classList.remove("is-in");
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

    targets.forEach((el,i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 5) * 70}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const hasYouTube = Boolean(youtubeId);
  const ytSrc = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;
  const closeOnBackdrop = (setter) => (e) => {
    if (e.target.classList.contains("arc-modal")) setter(false);
  };

  return (
    <section className="arc-section" id={id} ref={rootRef}>
      <div className="arc-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="arc-overlay" />

      {/* Header (GLASS WRAP) */}
      <header className="arc-head" data-reveal data-side="center" data-stagger>
        <div className="arc-glass">
          <h2 className="arc-title">{title}</h2>
          <p className="arc-sub">{sub}</p>
        </div>
      </header>

      {/* Front/Back Cards */}
      <div className="arc-cards" data-reveal data-side="left" data-stagger>
        <figure className="arc-card" onClick={() => setShowImg(cardFront)}>
          <img src={cardFront} className="arc-img" alt="Card front" />
          <figcaption>Front (tracking target)</figcaption>
        </figure>

        <figure className="arc-card" onClick={() => setShowImg(cardBack)}>
          <img src={cardBack} className="arc-img" alt="Card back" />
          <figcaption>Back (identity info)</figcaption>
        </figure>
      </div>

      {/* Player */}
      <div className="arc-player" data-reveal data-side="center" data-stagger>
        <div className="arc-browser">
          <div className="arc-browser-top">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <div className="arc-browser-url">https://demo.local/ar-image-card</div>
          </div>

          <div className="arc-browser-body">
            {hasYouTube ? (
              <div className="arc-iframe-wrap">
                <iframe
                  className="arc-iframe"
                  src={ytSrc}
                  title="AR Demo"
                  allow="autoplay; encrypted-media; picture-in-picture"
                />
              </div>
            ) : (
              <div className="arc-video-wrap">
                <video className="arc-video" controls playsInline preload="metadata" poster={poster}>
                  <source src={mp4Src} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>

        <p className="arc-caption">{caption}</p>
      </div>

      {/* Buttons */}
      <div className="arc-actions" data-reveal data-side="right" data-stagger>
        <button className="arc-btn primary" onClick={() => setShowTips(true)}>Target Tips</button>
        <button className="arc-btn outline" onClick={() => setShowSteps(true)}>Build Steps</button>
      </div>

      {/* Image Modal */}
      {showImg && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowImg)}>
          <div className="arc-modal-card">
            <button className="arc-x" onClick={() => setShowImg(null)} aria-label="Close">
              <X size={20} />
            </button>
            <img src={showImg} className="arc-modal-img" alt="Card preview" />
          </div>
        </div>
      )}

      {/* Tips Modal */}
      {showTips && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowTips)}>
          <div className="arc-modal-card arc-modal-scroll" onClick={(e)=>e.stopPropagation()}>
            <div className="arc-modal-head">
              <h3>Target rating tips</h3>
              <button className="arc-x" onClick={() => setShowTips(false)} aria-label="Close">
                <X size={20}/>
              </button>
            </div>

            <section className="arc-tip"><h4>Use clear visual features</h4><p>High contrast, clear shapes, useful edges.</p></section>
            <section className="arc-tip"><h4>Balanced detail</h4><p>Not too noisy, not too plain. Avoid repeating patterns.</p></section>
            <section className="arc-tip"><h4>Matte, high-res print</h4><p>Matte paper avoids glare and keeps details sharp.</p></section>
            <section className="arc-tip"><h4>Steady scan</h4><p>Hold flat and fill camera frame for fast lock-on.</p></section>
            <section className="arc-tip"><h4>Aim for 3★+</h4><p>Edit image if rating drops — boost edges & contrast.</p></section>
          </div>
        </div>
      )}

      {/* Steps Modal */}
      {showSteps && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowSteps)}>
          <div className="arc-modal-card arc-modal-scroll" onClick={(e)=>e.stopPropagation()}>
            <div className="arc-modal-head">
              <h3>Unity build steps</h3>
              <button className="arc-x" onClick={() => setShowSteps(false)} aria-label="Close">
                <X size={20}/>
              </button>
            </div>

            <section className="arc-step"><h4>1) Add Vuforia</h4><p>Create Unity 3D project & install Vuforia.</p></section>
            <section className="arc-step"><h4>2) Place ARCamera</h4><p>Add ARCamera & paste license key.</p></section>
            <section className="arc-step"><h4>3) Import target DB</h4><p>Load your printed card dataset.</p></section>
            <section className="arc-step"><h4>4) Add ImageTarget</h4><p>Select card & set real-world size.</p></section>
            <section className="arc-step"><h4>5) Attach logo</h4><p>Parent 3D logo to ImageTarget.</p></section>
            <section className="arc-step"><h4>6) Test on phone</h4><p>Scan card — check lock & stability.</p></section>
          </div>
        </div>
      )}
    </section>
  );
}
