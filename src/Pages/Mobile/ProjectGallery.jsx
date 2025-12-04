// FeaturedProjectsZigZag.jsx
import React, { useEffect, useRef } from "react";
import "./project-gallery.css";

export default function FeaturedProjectsZigZag() {
  const sectionRef = useRef(null);

  // Reveal cards on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".zz-card");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          } else {
            entry.target.classList.remove("in");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => io.observe(card));

    return () => io.disconnect();
  }, []);

  // Gentle parallax for background layers
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const bg = el.querySelector(".zz-bg");
    const fog = el.querySelector(".zz-fog");

    const onScroll = () => {
      const y = window.scrollY || 0;
      if (bg) bg.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      if (fog) fog.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="zz-section" id="projects" ref={sectionRef}>
      {/* neutral background layers */}
      <div className="zz-bg" />
      <div className="zz-vignette" />
      <div className="zz-stars" />
      <div className="zz-fog" />

      <h2 className="zz-title">
        Featured
        <br />
        Projects
      </h2>

      <div className="zz-row">
        {/* LEFT CARD */}
        <article className="zz-card zz-left" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1526481280698-8fcc13fd2d48?auto=format&fit=crop&w=1200&q=80"
            alt="E-commerce platform interface"
            loading="lazy"
          />
          <div className="zz-info">
            E-commerce
            <br />
            platform
          </div>
          <div className="zz-desc">
            <h3>E-commerce Platform</h3>
            <p>
              High-performance storefront with product discovery, cart, and
              secure checkout. Built with React, Node.js, Stripe, and a
              headless CMS.
            </p>
            <a href="#case-1" className="zz-link">
              View case study →
            </a>
          </div>
        </article>

        {/* CENTER CARD */}
        <article className="zz-card zz-center" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
            alt="Analytics dashboard interface"
            loading="lazy"
          />
          <div className="zz-info">
            Product
            <br />
            analytics
          </div>
          <div className="zz-desc">
            <h3>Product Analytics Dashboard</h3>
            <p>
              Centralised dashboard for feature adoption, funnels, and cohort
              retention to help stakeholders ship data-driven product
              decisions.
            </p>
            <a href="#case-2" className="zz-link">
              View case study →
            </a>
          </div>
        </article>

        {/* RIGHT CARD */}
        <article className="zz-card zz-right" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
            alt="Immersive VR interface"
            loading="lazy"
          />
          <div className="zz-info">
            Immersive
            <br />
            VR experience
          </div>
          <div className="zz-desc">
            <h3>Escape Archive VR</h3>
            <p>
              A narrative-driven VR escape room about curiosity, doubt, fear,
              and acceptance—focused on environmental storytelling and pacing.
            </p>
            <a href="#case-3" className="zz-link">
              View case study →
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
