import React, { useEffect, useRef } from "react";
import "./projects-built.css";

export default function ProjectsBuilt() {
  const sectionRef = useRef(null);

  // Scroll reveal animation
  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".pb-card");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("show", entry.isIntersecting)
        ),
      { threshold: 0.2 }
    );
    cards.forEach((card) => io.observe(card));
    return () => cards.forEach((card) => io.unobserve(card));
  }, []);

  return (
    <section className="pb-section" id="projects" ref={sectionRef}>
      <h2 className="pb-title">Projects I’ve<br />Built</h2>
      <p className="pb-subtitle">
        A closer look at some of my favorite full-stack and UI/UX development works.
      </p>

      <div className="pb-wrapper">
        {/* CARD 1 */}
        <div className="pb-card pb-left">
          <div className="pb-image">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
              alt="School Lunch Box Ordering System"
            />
          </div>
          <div className="pb-content">
            <h3>School Lunch Box Ordering System</h3>
            <p>
              A full-stack web app allowing parents to order and manage student meals securely.
              Built with React, Node.js, and MySQL for seamless experience and admin insights.
            </p>
            <a href="#details1" className="pb-btn">View Details</a>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="pb-card pb-right">
          <div className="pb-content">
            <h3>Escape Archive VR</h3>
            <p>
              An immersive VR puzzle game with emotional-themed rooms designed using Unity and C#.
              Focused on exploration, storytelling, and reflective experiences.
            </p>
            <a href="#details2" className="pb-btn">View Details</a>
          </div>
          <div className="pb-image">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2a?auto=format&fit=crop&w=1200&q=80"
              alt="Escape Archive VR"
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="pb-card pb-left">
          <div className="pb-image">
            <img
              src="https://images.unsplash.com/photo-1612831455543-b5c3a2f7b96f?auto=format&fit=crop&w=1200&q=80"
              alt="PSA Global Trade Network"
            />
          </div>
          <div className="pb-content">
            <h3>PSA Global Trade Network</h3>
            <p>
              AI-powered Power BI dashboard for logistics and sustainability intelligence.
              Features include AI Copilot chat, KPI forecasting, and predictive analytics.
            </p>
            <a href="#details3" className="pb-btn">View Details</a>
          </div>
        </div>
      </div>
    </section>
  );
}
