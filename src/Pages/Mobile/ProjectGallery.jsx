import React, { useEffect, useRef } from "react";
import "./project-gallery.css";

export default function FeaturedProjectsZigZag() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".zz-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
          else entry.target.classList.remove("in");
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => cards.forEach((c) => io.unobserve(c));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const bg = el.querySelector(".zz-bg");
    const fog = el.querySelector(".zz-fog");
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (bg) bg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.06)`;
      if (fog) fog.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="zz-section" id="projects" ref={sectionRef}>
      <div className="zz-bg" />
      <div className="zz-vignette" />
      <div className="zz-stars" />
      <div className="zz-fog" />

      <h2 className="zz-title">Featured<br />Projects</h2>

      <div className="zz-row">
        <article className="zz-card zz-left" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1526481280698-8fcc13fd2d48?auto=format&fit=crop&w=1200&q=80"
            alt="E-commerce platform — neon skyline UI"
            loading="lazy"
          />
          <div className="zz-info">E-commerce<br />platform</div>
          <div className="zz-desc">
            <h3>E-commerce Platform</h3>
            <p>
              High-performance storefront with discovery, cart & secure checkout.
              React + Node.js, Stripe, and a headless CMS.
            </p>
            <a href="#case-1" className="zz-link">View case study →</a>
          </div>
        </article>

        <article className="zz-card zz-center" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
            alt="AI dashboard — abstract tech blocks"
            loading="lazy"
          />
          <div className="zz-info">AI Dashboard<br />analytics</div>
          <div className="zz-desc">
            <h3>AI Dashboard</h3>
            <p>
              Realtime KPIs, anomaly alerts & forecasting dashboards.
              Server-driven charts & role-based access.
            </p>
            <a href="#case-2" className="zz-link">View case study →</a>
          </div>
        </article>

        <article className="zz-card zz-right" tabIndex={0}>
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
            alt="Cyber dome UI — platform"
            loading="lazy"
          />
     
        </article>
      </div>
    </section>
  );
}
