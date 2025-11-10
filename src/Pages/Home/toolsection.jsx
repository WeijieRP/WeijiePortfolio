import React, { useEffect, useRef, useState } from "react";
import "./tools.css";

export default function ToolsSection() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);

  // Scroll reveal (slides in from left/right)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        }),
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Gentle float on the diamonds
  useEffect(() => {
    const cards = rootRef.current?.querySelectorAll(".tool-diamond") || [];
    let t = 0, raf;
    const animate = () => {
      t += 0.015;
      cards.forEach((card, i) => {
        const x = Math.sin(t + i) * 3;
        const y = Math.cos(t + i * 0.7) * 3;
        card.style.transform = `translate(${x}px, ${y}px) rotate(45deg)`;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tools = [
    {
      name: "GitHub",
      logo: "/assets/Web_Icons/icons8-github-48.png",
      desc:
        "I keep my code here, open pull requests for reviews, and let Actions run tests and builds before I ship.",
    },
    {
      name: "VS Code",
      logo: "/assets/Web_Icons/icons8-vs-code-48.png",
      desc:
        "My main editor. I write code, format it automatically, and debug both frontend and backend in one place.",
    },
    {
      name: "Git",
      logo: "/assets/Web_Icons/icons8-git-48.png",
      desc:
        "I use Git to save each change safely. I branch for new features, merge when ready, and roll back if needed.",
    },
    {
      name: "Node.js",
      logo: "/assets/Web_Icons/icons8-node-js-96.png",
      desc:
        "I build APIs and tooling with Node. It runs my Express servers and the scripts that test and bundle the app.",
    },
    {
      name: "React",
      logo: "/assets/Web_Icons/icons8-react-js-48.png",
      desc:
        "I build the UI with components and hooks. It keeps pages fast, tidy, and easy to update as the app grows.",
    },
  ];

  return (
    <section ref={rootRef} className="tools">
      {/* Background */}
      <div
        className="tools-bg"
        style={{ backgroundImage: 'url("/assets/HomeBackgroundImage/fields-9906765.jpg")' }}
        aria-hidden="true"
      />

      {/* Particles */}
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.4}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="tools-wrap">
        {/* ⬇️ Galaxy-styled title */}
        <h2 className="tools-title--galaxy reveal" data-anim="down">
          My Everyday Dev Stack
        </h2>

        <p className="subtitle reveal" data-anim="up">
          Tools I use to write code, test features, and publish stable apps.
        </p>

        <div className="zigzag-grid">
          {tools.map((t, i) => {
            const isActive = active === i;
            const from = i % 2 === 0 ? "left" : "right";
            return (
              <div
                key={i}
                className={`tool-block ${i % 2 === 0 ? "up" : "down"} reveal`}
                data-anim={from}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  className="tool-diamond"
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-describedby={`tool-info-${i}`}
                >
                  <img src={t.logo} alt={`${t.name} logo`} />
                </button>

                <h4 style={{marginTop:20}}>{t.name}</h4>

                {/* Hover/focus info card */}
                <div
                  id={`tool-info-${i}`}
                  className="tool-info"
                  role="note"
                  aria-hidden={!isActive}
                >
                  <p className="tool-desc">{t.desc}</p>
                  <span className="info-arrow" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
