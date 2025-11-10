import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMail, AiOutlineCheck, AiOutlineArrowRight } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import "./contact-section.css";

/* Success modal */
function SuccessModal({ open, onClose, message = "Thanks! I’ll reply soon." }) {
  if (!open) return null;
  return (
    <div className="c2-modal" role="dialog" aria-modal="true" aria-labelledby="c2m-title">
      <div className="c2m-card" role="document">
        <h3 id="c2m-title">Message sent</h3>
        <p className="c2m-desc">{message}</p>
        <button className="c2m-close" onClick={onClose} autoFocus>Close</button>
      </div>
    </div>
  );
}

export default function ContactCollabV2({
  id = "contact-collab-v2",
  eyebrow = "START A PROJECT",
  titleStrong = "Build the Future",
  titleRest = "With Me",
  blurb = "Designing digital products that feel intuitive, modern, and unforgettable. Let’s create something users will love.",
  email = "hooiweijie60@gmail.com",
  phone = "+65 9724 5307",
  buttonText = "Let's Create",
  modalMessage = "Thanks — I’ll reach out shortly to kick things off!"
}) {
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const [sweeping, setSweeping] = useState(false);
  const [sent, setSent] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const lastPointer = useRef({ x: null, y: null });

  // Slide-in when panel enters viewport
  useEffect(() => {
    const el = panelRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("is-inview");
    }, { threshold: 0.2 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ripple creator
  const ripple = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = lastPointer.current.x ?? rect.width / 2;
    const y = lastPointer.current.y ?? rect.height / 2;
    const d = Math.max(rect.width, rect.height) * 1.8;

    const span = document.createElement("span");
    span.className = "c2-ripple";
    span.style.width = span.style.height = `${d}px`;
    span.style.left = `${x - d / 2}px`;
    span.style.top = `${y - d / 2}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  };

  const onPointerDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastPointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSweeping(false);
    void btnRef.current?.offsetWidth; // restart sweep
    setSweeping(true);
    ripple();

    setTimeout(() => setSent(true), 260);
    setTimeout(() => setOpenModal(true), 800);
    setTimeout(() => {
      setSent(false);
      setSweeping(false);
    }, 2000);

    e.currentTarget.reset();
  };

  return (
    <section id={id} className="c2-wrap">
      <div ref={panelRef} className="c2-panel">
        {/* Left: copy + quick contacts (slides from left) */}
        <div className="c2-left c2-slide-left">
          <p className="c2-eyebrow">{eyebrow}</p>
          <h2 className="c2-title">
            <span className="c2-strong">{titleStrong} </span>{titleRest}
          </h2>
          <p className="c2-blurb">{blurb}</p>

          <div className="c2-rows">
            <a className="c2-row" href={`mailto:${email}`}>
              <span className="c2-ico"><AiOutlineMail /></span>
              <div>
                <div className="c2-kicker">Email</div>
                <div className="c2-value">{email}</div>
              </div>
            </a>
            <a className="c2-row" href={`tel:${phone.replace(/\s+/g, "")}`}>
              <span className="c2-ico"><FiPhone /></span>
              <div>
                <div className="c2-kicker">Phone</div>
                <div className="c2-value">{phone}</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right: form (slides from right) */}
        <div className="c2-right c2-slide-right">
          <form className="c2-card" onSubmit={onSubmit}>
            <div className="c2-field">
              <label>Name</label>
              <input type="text" placeholder="Jane Smith" required />
            </div>
            <div className="c2-field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" required />
            </div>
            <div className="c2-field">
              <label>Topic</label>
              <select defaultValue="" required>
                <option value="" disabled>Select…</option>
                <option>UI/UX</option>
                <option>Web App</option>
                <option>Dashboard</option>
                <option>VR / 3D</option>
                <option>Other</option>
              </select>
            </div>
            <div className="c2-field">
              <label>Message</label>
              <textarea placeholder="Tell me about your idea…" rows="4" />
            </div>

            <button
              ref={btnRef}
              type="submit"
              className={`c2-send ${sweeping ? "sweeping" : ""} ${sent ? "sent" : ""}`}
              onPointerDown={onPointerDown}
            >
              <span className="c2-sweep" />
              <span className="c2-bicon">{sent ? <AiOutlineCheck/> : <AiOutlineArrowRight/>}</span>
              <span className="c2-btxt">{sent ? "Sent!" : buttonText}</span>
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        message={modalMessage}
      />
    </section>
  );
}
