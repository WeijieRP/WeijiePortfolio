import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  {
    to: "/portfolio",
    label: "Portfolio",
    dropdown: [
      { to: "/portfolio/web", label: "Web Projects" },
      { to: "/portfolio/design", label: "Design Projects" },
      { to: "/portfolio/VR", label: "Virtual Reality" },
      { to: "/portfolio/Mobile", label: "Mobile Application Development" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [desktopPortfolioOpen, setDesktopPortfolioOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) {
        setOpen(false);
        setMobilePortfolioOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ESC closes mobile drawer
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobilePortfolioOpen(false);
    setDesktopPortfolioOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <header
      ref={navRef}
      className={`wj-nav ${scrolled ? "wj-nav--scrolled" : ""} ${
        open ? "is-open" : ""
      }`}
    >
      <div className="wj-nav__inner">
        <Link className="wj-brand" to="/" aria-label="Wei Jie">
          <img src="/assets/Weijie_Logo1.png" alt="Wei Jie Studio Logo" />
        </Link>

        {/* Desktop nav */}
        <nav className="wj-links" aria-label="Primary">
          {LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="wj-dropdown"
                onMouseEnter={() => setDesktopPortfolioOpen(true)}
                onMouseLeave={() => setDesktopPortfolioOpen(false)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `wj-link wj-link--parent ${isActive ? "is-active" : ""}`
                  }
                  onClick={() => {
                    // optional: navigate to /portfolio but keep menu logic
                    setOpen(false);
                  }}
                >
                  {link.label} <span className="caret">▾</span>
                </NavLink>

                <div
                  className={`wj-dropdown__menu ${
                    desktopPortfolioOpen ? "is-open" : ""
                  }`}
                  role="menu"
                >
                  {link.dropdown.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `wj-dropdown__item ${isActive ? "is-active" : ""}`
                      }
                      onClick={() => {
                        setDesktopPortfolioOpen(false);
                        setOpen(false);
                      }}
                      role="menuitem"
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `wj-link ${isActive ? "is-active" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Burger button */}
        <button
          className="wj-burger"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="wj-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="wj-mobile-menu"
        className={`wj-drawer ${open ? "open" : ""}`}
        role="dialog"
      >
        {LINKS.map((link) =>
          link.dropdown ? (
            <div key={link.label} className="wj-drawer__dropdown">
              <button
                className="wj-drawer__parent"
                aria-expanded={mobilePortfolioOpen}
                onClick={() => setMobilePortfolioOpen((s) => !s)}
              >
                {link.label} <span className="caret">▾</span>
              </button>

              {mobilePortfolioOpen && (
                <div className="wj-drawer__submenu">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `wj-drawer__link ${isActive ? "is-active" : ""}`
                    }
                    onClick={() => {
                      setOpen(false);
                      setMobilePortfolioOpen(false);
                    }}
                  >
                    All Portfolio
                  </NavLink>

                  {link.dropdown.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `wj-drawer__link ${isActive ? "is-active" : ""}`
                      }
                      onClick={() => {
                        setOpen(false);
                        setMobilePortfolioOpen(false);
                      }}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `wj-drawer__link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>

      {/* Scrim */}
      <div
        className={`wj-scrim ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
