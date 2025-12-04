// ContactCTA.jsx
import React, { useEffect, useRef } from "react";
import "./cta.css";

export default function ContactCTA({
  bgImage = "/assets/HomeBackgroundImage/fantasy-3664586.jpg",
  heading = "Let’s Work Together",
  sub = "I’m open to collaborations, freelance projects, and creative opportunities — let’s build something impactful together.",
  linkedin = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  github = "https://github.com/WebDeveloper1299",
  email = "mailto:hooiweijie60@gmail.com",
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = root.querySelectorAll(".reveal");
    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" ref={rootRef}>
      {/* Background image */}
      <div
        className="cta-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      {/* Single glass panel */}
      <div className="cta-card reveal" data-anim="up">
        {/* 🔹 Title uses global gradient (title-aurora) */}
        <h1 className="title-aurora">{heading}</h1>

        {/* 🔹 Subtitle uses global section-subtitle */}
        <p className="section-subtitle">{sub}</p>

        <div className="cta-grid">
          {/* LinkedIn */}
          <a
            className="cta-btn btn-half btn--linkedin reveal"
            data-anim="left"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <span className="cta-inner">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                alt="LinkedIn"
                className="cta-ico"
              />
              <span className="cta-label">LinkedIn</span>
            </span>
          </a>

          {/* GitHub */}
          <a
            className="cta-btn btn-half btn--github reveal"
            data-anim="right"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            <span className="cta-inner">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
                alt="GitHub"
                className="cta-ico"
              />
              <span className="cta-label">GitHub</span>
            </span>
          </a>

          {/* Email */}
          <a
            className="cta-btn btn-full btn--outlook reveal"
            data-anim="up"
            href={email}
          >
            <span className="cta-inner">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftoutlook.svg"
                alt="Email"
                className="cta-ico"
              />
              <span className="cta-label">Email Me</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
