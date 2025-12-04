// CCASection.jsx
import React, { useEffect, useMemo, useRef } from "react";
import "./cca.css";

const BG_DEFAULT =
  "/assets/AboutBackgroundImage/alexander-andrews-yOIT88xWkbg-unsplash.jpg";

const CCA_STATS = [
  {
    label: "Years Active",
    value: "3+",
    desc:
      "Time contributing to Student Council, Academic Club, and community events across ITE → RP.",
  },
  {
    label: "Events Led/Supported",
    value: "15+",
    desc:
      "Orientations, Principal’s Cup, graduation helpers, workshops, and community drives.",
  },
  {
    label: "Volunteer Hours",
    value: "180+",
    desc:
      "Service hours across AWWA, beach clean-ups, food distribution, and operations.",
  },
  {
    label: "Awards/Lists",
    value: "4+",
    desc: "Leadership/merit recognition and appearances on honours lists.",
  },
];

const CCA_ROLES = [
  {
    title: "Republic Polytechnic Student Council — Secretary (EXCO)",
    period: "2025 – 2026",
    points: [
      "oneRP & General Meetings: agenda, quorum/time-keeping, motions/votes, minutes & circulation.",
      "Secretariat ops: action tracking, versioning, cross-department coordination.",
      "ISLP 2025: communicate across cultures and languages; represent Council professionally.",
    ],
    img: "/assets/6078053257500020835.jpg",
  },
  {
    title: "Student Council — Member (Publication & Communication Committee)",
    period: "2022 – 2023",
    points: [
      "Supported campus events (ushering, briefings, comms, logistics).",
      "Worked with EXCOs and Councillors; documented ops & flow.",
      "Players Management for Principal’s Cup finale (80 players, 1,000+ audience).",
    ],
    img: "/assets/6062131332701162316.jpg",
  },
  {
    title: "IAD Academic Club — President",
    period: "2023 – 2023",
    points: [
      "Led Exco to plan workplans, logistics & publicity for club events.",
      "Ran teambonding, technical workshops, hackathon drives.",
      "Mentored juniors; set targets, rallied team, ensured delivery quality.",
    ],
    img: "/assets/6062131332701162317.jpg",
  },
];

const CCA_TIMELINE = [
  {
    date: "2025",
    title: "oneRP Meeting Facilitation",
    note: "Agenda, time-keeping, motions, voting records; minutes & actions.",
    tag: "RP SC",
  },
  {
    date: "2025",
    title: "General Meeting (Council-wide)",
    note: "Attendance/quorum, minutes, comms & follow-ups.",
    tag: "RP SC",
  },
  {
    date: "2025",
    title: "Department Meetings",
    note: "Scheduling, secretariat support, issues log & cross-coordination.",
    tag: "RP SC",
  },
  {
    date: "Sep 2025",
    title: "ISLP Overseas Trip",
    note:
      "Overseas student exchange; coordination, communication, cultural learning.",
    tag: "RP SC",
  },

  {
    date: "Jan 2023",
    title: "Principal’s Cup — Players Mgmt",
    note: "Briefed 80 players; crowd control for 1,000+ new students.",
    tag: "Student Council",
  },
  {
    date: "Jan–Apr 2023",
    title: "Orientation Ushering",
    note: "Wayfinding, registration flow, safety comms for new intakes.",
    tag: "Student Council",
  },
  {
    date: "Feb 2023",
    title: "Graduation Helpers",
    note: "Venue ops & ushering for graduates & families.",
    tag: "Student Council",
  },

  {
    date: "2022",
    title: "Parents’ Seminar",
    note: "Public-facing helper; information & guidance.",
    tag: "Student Council",
  },
  {
    date: "2022",
    title: "Nat’l Day Investiture",
    note: "Ceremony support attended by President Halimah Yacob.",
    tag: "Student Council",
  },
  {
    date: "2022",
    title: "IUEC Conference",
    note: "Environmental coalition event support.",
    tag: "Community",
  },
  {
    date: "2022",
    title: "AWWA Service",
    note: "Activities with seniors; engagement & care.",
    tag: "Service",
  },
  {
    date: "2022",
    title: "Beach Clean-up",
    note: "Coastal clean-up, sorting & disposal.",
    tag: "Service",
  },
  {
    date: "2022",
    title: "Food Distribution",
    note: "Packing & distribution for day-care centres.",
    tag: "Service",
  },
  {
    date: "2022",
    title: "Leadership Workshops",
    note: "Ikigai, First Aid, MHA session, Mission X, SBFF leadership.",
    tag: "Training",
  },
];

const getYear = (d) => {
  const m = String(d).match(/\b(20\d{2}|19\d{2})\b/);
  return m ? m[1] : "Other";
};

export default function CCASection({
  id = "cca",
  heading = "Co-Curricular Activities",
  sub = "Leadership & Service • ITE → RP",
  bgImage = BG_DEFAULT,
}) {
  const rootRef = useRef(null);
  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const dirRef = useRef("down");

  // track scroll direction for leave animations
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const next = y > lastY.current ? "down" : "up";
      if (next !== dirRef.current) {
        dirRef.current = next;
        const el = rootRef.current;
        if (el) {
          el.classList.toggle("dir-down", next === "down");
          el.classList.toggle("dir-up", next === "up");
        }
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // intersection reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("visible", "was-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting)
            el.classList.add("visible", "was-visible");
          else el.classList.remove("visible");
        });
      },
      { threshold: 0.12, rootMargin: "-12% 0px -12% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const t of CCA_TIMELINE) {
      const y = getYear(t.date);
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(t);
    }
    const entries = Array.from(map.entries()).sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
    return entries.map(([year, items]) => ({ year, items }));
  }, []);

  return (
    <section
      className="cca-section"
      id={id}
      ref={rootRef}
      aria-labelledby={`${id}-title`}
      style={{ "--cca-bg": `url(${bgImage})` }}
    >
      <div className="cca-bg" aria-hidden="true" />

      <header className="cca-head" data-reveal data-anim="up">
        <div
          className="cca-head-glass"
          role="group"
          aria-roledescription="panel"
        >
          <h2
            className="cca-title title-aurora"
            id={`${id}-title`}
          >
            {heading}
          </h2>

          <p className="cca-sub section-subtitle">{sub}</p>
        </div>
        <span className="cca-rule" />
      </header>

      <ul className="cca-stats" aria-label="CCA statistics">
        {CCA_STATS.map((s, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          const popId = `stat-pop-${i}`;
          return (
            <li
              key={i}
              className="cca-stat has-pop"
              tabIndex={0}
              role="button"
              aria-describedby={popId}
              data-reveal
              data-anim={side}
            >
              <div className="cca-stat-value">{s.value}</div>
              <div className="cca-stat-label">{s.label}</div>
              <span className="cca-stat-i" aria-hidden="true">
                i
              </span>
              <div className="cca-stat-pop" id={popId} role="note">
                <div className="cca-stat-pop-inner">
                  <div className="cca-stat-pop-title">{s.label}</div>
                  <p className="cca-stat-pop-desc">{s.desc}</p>
                </div>
                <span className="cca-stat-pop-arrow" />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cca-roles">
        {CCA_ROLES.map((r, i) => {
          const flip = i % 2 === 1;
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <article
              key={r.title}
              className={`cca-role ${flip ? "flip" : ""}`}
              data-reveal
              data-anim={side}
              aria-label={r.title}
            >
              <div className="cca-media">
                <img src={r.img} alt="" loading="lazy" />
              </div>
              <div className="cca-copy">
                <h3 className="cca-h3">{r.title}</h3>
                <div className="cca-period">{r.period}</div>
                <ul className="cca-points">
                  {r.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="cca-yearlist">
        {grouped.map((group, gi) => {
          const side = gi % 2 === 0 ? "left" : "right";
          return (
            <section
              key={group.year}
              className="cca-yearcard"
              data-reveal
              data-anim={side}
              aria-label={`Highlights in ${group.year}`}
            >
              <header className="cca-yhead">
                <span className="cca-ybadge">{group.year}</span>
                <h4 className="cca-ytitle">Highlights</h4>
              </header>

              <ol className="cca-yitems">
                {group.items.map((t, i) => (
                  <li
                    key={`${t.title}-${i}`}
                    className="cca-yitem"
                    data-reveal
                    data-anim="up"
                  >
                    <div className="cca-yrow">
                      <div className="cca-ytag">{t.tag}</div>
                      <div className="cca-yname">{t.title}</div>
                      <div className="cca-ydate">{t.date}</div>
                    </div>
                    <p className="cca-ynote">{t.note}</p>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}
