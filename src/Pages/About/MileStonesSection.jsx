import React, { useEffect, useMemo, useRef, useState } from "react";
import "./milestones-section.css";

export default function MilestonesLayout({
  id = "certifications",
  bgImage = "/assets/AboutBackgroundImage/aron-visuals-exZKFlP5jZA-unsplash.jpg",
  title = "Achievements, Certifications and Competitions",
  subtitle = "Recognition earned through consistent practice and impact.",
  certs = [
    { title: "GeekOut Hackathon 2024", issuer: "GovTech Singapore", date: "2024", award: "Second Runner-up", image: "assets/Certification/GeekOut_cert.png", href: "assets/Certification/GeekOut_cert.png", blurb: "Built a web application to help students decide suitable career pathways.", skills: ["React", "Docker", "HTML", "CSS", "JavaScript"] },
    { title: "Director’s Roll of Honour — Semester 1 (2024)", issuer: "Republic Polytechnic, School of Infocomm", date: "2024", award: "Director’s Roll of Honour", image: "assets/Certification/RP_SEM1.png", href: "assets/Certification/RP_SEM1.png", blurb: "Recognises top performers in the semester within my diploma cohort." },
    { title: "Director’s Roll of Honour — Semester 2 (2024)", issuer: "Republic Polytechnic, School of Infocomm", date: "2024", award: "Director’s Roll of Honour", image: "assets/Certification/RP_SEM2.png", href: "assets/Certification/RP_SEM2.png", blurb: "Recognises top performers in the semester within my diploma cohort." },
    { title: "Director’s Roll of Honour — Semester 1 (2025)", issuer: "Republic Polytechnic, School of Infocomm", date: "2025", award: "Director’s Roll of Honour", image: "assets/Certification/RP_SEM1_2025.png", href: "assets/Certification/RP_SEM1_2025.png", blurb: "Recognises top performers in the semester within my diploma cohort." },
    { title: "ITE Higher Nitec Director’s List — Semester 2 (2022)", issuer: "ITE College Central, School of Infocomm Technology", date: "2022", award: "Director’s List", image: "assets/Certification/ITE_HN_2022.png", href: "assets/Certification/ITE_HN_2022.png", blurb: "Awarded to the top 10% of students for outstanding academic performance." },
    { title: "C# (Basic) — Skills Certification", issuer: "Harishankaran K, CTO, HackerRank", date: "2025", award: "Skills Certification", image: "assets/Certification/c_sharp_basic%20certificate.png", href: "assets/Certification/c_sharp_basic%20certificate.png", blurb: "Passed the HackerRank Skills Certification test in C# (Basic)." },
    { title: "Node.js (Basic) — Skills Certification", issuer: "Harishankaran K, CTO, HackerRank", date: "2025", award: "Skills Certification", image: "assets/Certification/nodejs_basic%20certificate.png", href: "assets/Certification/nodejs_basic%20certificate.png", blurb: "Passed the HackerRank Skills Certification test in Node.js (Basic)." },
    { title: "JavaScript (Intermediate) — Skills Certification", issuer: "Harishankaran K, CTO, HackerRank", date: "2025", award: "Skills Certification", image: "assets/Certification/javascript_intermediate%20certificate.png", href: "assets/Certification/javascript_intermediate%20certificate.png", blurb: "Passed the HackerRank Skills Certification test in JavaScript (Intermediate)." },
    { title: "React (Basic) — Skills Certification", issuer: "Harishankaran K, CTO, HackerRank", date: "2025", award: "Skills Certification", image: "assets/Certification/react_basic%20certificate.png", href: "assets/Certification/react_basic%20certificate.png", blurb: "Passed the HackerRank Skills Certification test in React (Basic)." },
    { title: "CSIT InfoSecurity Challenge", issuer: "CSIT (Centre for Strategic Infocomm Technologies)", date: "2025", award: "Participation", image: "assets/Certification/TISC.png", href: "assets/Certification/TISC.png", blurb: "Participated in an InfoSecurity challenge focusing on practical cybersecurity skills." }
  ],
}) {
  const wrapRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Hackathons", "Academic", "Professional Skills", "Participation"];

  const categorizedCerts = useMemo(() => {
    return certs.map((c) => {
      const t = `${c.title} ${c.award ?? ""} ${c.issuer ?? ""}`.toLowerCase();
      let cat = "Academic";
      if (t.includes("hackathon") || t.includes("geekout")) cat = "Hackathons";
      else if (t.includes("hackerank") || t.includes("skills")) cat = "Professional Skills";
      else if ((c.award || "").toLowerCase().includes("participation")) cat = "Participation";
      else if (t.includes("director") || t.includes("honour") || t.includes("honor")) cat = "Academic";
      return { ...c, category: cat };
    });
  }, [certs]);

  const filtered =
    activeFilter === "All" ? categorizedCerts : categorizedCerts.filter((c) => c.category === activeFilter);

  const safeUrl = (url) => {
    if (typeof url !== "string") return url;
    const parts = url.split("/").map((p) => encodeURIComponent(decodeURIComponent(p)));
    return parts.join("/");
  };
  const isImageHref = (href) => typeof href === "string" && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(href);
  const isPdfHref = (href) => typeof href === "string" && /\.pdf(\?.*)?$/i.test(href);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const openLightbox = (item) => {
    const prefer = item.href && isImageHref(item.href) ? item.href : item.image;
    const src = prefer ? safeUrl(prefer) : null;
    setLightboxItem({
      ...item,
      _modalSrc: src,
      _original: item.href ? safeUrl(item.href) : item.image ? safeUrl(item.image) : null,
    });
    setLightboxOpen(true);
  };
  const closeLightbox = () => { setLightboxOpen(false); setLightboxItem(null); };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  /* subtle parallax within section bounds */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerY = r.top + r.height * 0.5 - vh * 0.5;
      const p = Math.max(-1, Math.min(1, -centerY / (vh * 0.9)));
      el.style.setProperty("--bg-ty", `${(p * 28).toFixed(1)}px`);
      el.style.setProperty("--bg-scale", (1.01 + Math.abs(p) * 0.02).toFixed(3));
      el.style.setProperty("--bg-burn", (1.06 - Math.abs(p) * 0.04).toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* direction class (optional micro motion) */
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY;
      root.classList.toggle("dir-down", goingDown);
      root.classList.toggle("dir-up", !goingDown);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* intersection reveals */
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;
    const observed = root.querySelectorAll("[data-observe]");
    if (!("IntersectionObserver" in window)) {
      observed.forEach((el) => el.classList.add("is-shown"));
      return;
    }
    let lastY = window.scrollY || 0;
    let scrollDir = "down";
    const onScroll = () => {
      const y = window.scrollY || 0;
      scrollDir = y > lastY ? "down" : "up";
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.remove("leave-up", "leave-down");
            el.classList.add(scrollDir === "down" ? "enter-up" : "enter-down", "is-shown");
          } else {
            el.classList.remove("enter-up", "enter-down", "is-shown");
            el.classList.add(scrollDir === "down" ? "leave-up" : "leave-down");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    observed.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [id, activeFilter, filtered.length]);

  const enc = (p) => p.split("/").map((s) => encodeURIComponent(decodeURIComponent(s))).join("/");
  const bgSrc = bgImage?.startsWith("/") ? enc(bgImage) : `/${enc(bgImage)}`;

  const onMediaKey = (e, item) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(item);
    }
  };

  const onViewClick = (e, item) => {
    e.stopPropagation();
    const href = item.href ? safeUrl(item.href) : null;
    if (href && isPdfHref(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      openLightbox(item);
    }
  };

  return (
    <section className="milestones-layout" id={id} ref={wrapRef}>
      <div className="ml-bg-wrap" aria-hidden="true">
        <div className="milestones-bg" style={{ backgroundImage: `url(${bgSrc})` }} />
        <div className="ml-top-fade" />
        <div className="ml-sweep" />
        <div className="ml-stars">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="ml-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
                animationDuration: `${(3 + Math.random() * 4).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="milestones-content" data-observe data-dir="left">
        <header className="milestones-header" data-observe data-dir="left">
          <h2 className="milestones-title">{title}</h2>
          <p className="milestones-sub" style={{ textAlign: "center" }}>{subtitle}</p>
          <div className="milestones-divider" />
        </header>

        <div className="filter-chips" data-observe data-dir="right">
          {["All", "Hackathons", "Academic", "Professional Skills", "Participation"].map((cat) => (
            <button
              key={cat}
              className={`chip ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cert-grid">
          {filtered.map((c, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <article
                key={`${c.title}-${i}`}
                className="cert-card"
                data-observe
                data-dir={side}
                style={{ ["--delay"]: `${i * 90}ms` }}
                tabIndex={0}
              >
                {c.award ? <span className="cert-ribbon">{c.award}</span> : null}
                <div
                  className="cert-media"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${c.title}`}
                  onClick={() => openLightbox(c)}
                  onKeyDown={(e) => onMediaKey(e, c)}
                >
                  {c.image ? (
                    <img src={safeUrl(c.image)} alt={c.title} loading="lazy" decoding="async" />
                  ) : (
                    <div className="cert-media--ph">🏅</div>
                  )}
                </div>
                <div className="cert-meta">
                  <h3 className="cert-title">{c.title}</h3>
                  <p className="cert-issuer">
                    <span>{c.issuer}</span> • <span>{c.date}</span>
                  </p>
                  {c.skills?.length ? (
                    <ul className="cert-tags" aria-label="Key skills">
                      {c.skills.slice(0, 4).map((s, si) => (
                        <li key={si}>{s}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="cert-hover">
                  <div className="cert-hover-body">
                    {c.blurb && <p className="cert-blurb">{c.blurb}</p>}
                    {c.skills?.length ? (
                      <div className="cert-skill-badges">
                        {c.skills.map((s, si) => (
                          <span key={si} className="badge">{s}</span>
                        ))}
                      </div>
                    ) : null}
                    <div className="cert-actions">
                      <button
                        className="btn-ghost"
                        type="button"
                        onClick={(e) => onViewClick(e, c)}
                        aria-label={`View ${c.title}`}
                      >
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="empty-note">No items match “{activeFilter}”.</p>
        )}
      </div>

      {lightboxOpen && lightboxItem && (
        <div
          className="lightbox lightbox--fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={(e) => { if (e.target.classList.contains("lightbox")) closeLightbox(); }}
        >
          <button className="lightbox-close" type="button" aria-label="Close" onClick={closeLightbox}>
            ✕
          </button>
          <div className="lb-stage">
            <div className="lb-img-wrap">
              {lightboxItem._modalSrc ? (
                <img className="lightbox-img" src={lightboxItem._modalSrc} alt={lightboxItem.title} />
              ) : (
                <div className="lightbox-fallback">No preview available</div>
              )}
            </div>
            <div className="lb-caption">
              <div className="lb-caption-top">
                <h3 className="lb-title">{lightboxItem.title}</h3>
                <p className="lb-meta">
                  <span>{lightboxItem.issuer}</span> • <span>{lightboxItem.date}</span>
                </p>
              </div>
              {lightboxItem.blurb && <p className="lb-blurb">{lightboxItem.blurb}</p>}
              {Array.isArray(lightboxItem.skills) && lightboxItem.skills.length > 0 && (
                <div className="lb-skill-badges">
                  {lightboxItem.skills.map((s, i) => (
                    <span key={i} className="badge">{s}</span>
                  ))}
                </div>
              )}
              <div className="lb-actions">
                {lightboxItem._original && (
                  <a
                    className="btn-ghost"
                    href={lightboxItem._original}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open original file"
                  >
                    Open original
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
