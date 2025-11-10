import React, { useEffect, useRef } from "react";
import "./contactHome.css";

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
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = root.querySelectorAll(".reveal");
    if (reduce) {
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
      {/* Background */}
      <div
        className="cta-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="cta-overlay" aria-hidden="true" />

      {/* Card */}
      <div className="cta-card">
        <h1 className="cta-title cta-title--galaxy reveal" data-anim="left">
          {heading}
        </h1>
        <p className="cta-sub reveal" data-anim="right">
          {sub}
        </p>

        <div className="cta-grid">
          <a
            className="cta-btn btn-half btn--linkedin reveal"
            data-anim="left"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
              className="cta-ico"
            />
            LinkedIn
          </a>

          <a
            className="cta-btn btn-half btn--github reveal"
            data-anim="right"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
              alt="GitHub"
              className="cta-ico"
            />
            GitHub
          </a>

          <a
            className="cta-btn btn-full btn--outlook reveal"
            data-anim="up"
            href={email}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftoutlook.svg"
              alt="Email"
              className="cta-ico"
            />
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
}
