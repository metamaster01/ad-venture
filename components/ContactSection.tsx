"use client";

import { useState, useRef } from "react";
import { easeInOut, motion } from "framer-motion";
import { gsap } from "gsap";

interface FormState {
  name: string;
  email: string;
  inquiry: string;
}

interface SubmitState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", inquiry: "" });
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle", message: "" });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.inquiry) {
      setSubmit({ status: "error", message: "Please fill in all fields." });
      return;
    }

    // GSAP button press feedback
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    }

    setSubmit({ status: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmit({ status: "success", message: "Message sent. We'll be in touch." });
        setForm({ name: "", email: "", inquiry: "" });
      } else {
        const data = await res.json();
        setSubmit({ status: "error", message: data.error || "Something went wrong." });
      }
    } catch {
      setSubmit({ status: "error", message: "Network error. Please try again." });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: easeInOut },
    }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .cs-section {
          background: #0a0a0a;
          padding: 100px 0 0;
          font-family: 'Inter', sans-serif;
        }

        .cs-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* ─── LEFT ─── */
        .cs-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .cs-label-line {
          width: 32px;
          height: 1px;
          background: #c8a84b;
        }
        .cs-label-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #888;
          text-transform: uppercase;
        }

        .cs-heading {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 900;
          line-height: 0.92;
          color: #fff;
          margin: 0 0 52px;
          letter-spacing: -0.5px;
        }

        .cs-contact-block {
          margin-bottom: 36px;
        }
        .cs-contact-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .cs-contact-value {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #fff;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        a.cs-contact-value:hover {
          color: #c8a84b;
        }

        /* ─── RIGHT / FORM ─── */
        .cs-form-card {
          border: 1px solid #1e1e1e;
          background: #0f0f0f;
          padding: 44px 40px;
        }

        .cs-field {
          margin-bottom: 32px;
        }
        .cs-field-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }
        .cs-input,
        .cs-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #2a2a2a;
          padding: 10px 0 12px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #bbb;
          outline: none;
          transition: border-color 0.25s ease, color 0.25s ease;
          resize: none;
        }
        .cs-input::placeholder,
        .cs-textarea::placeholder {
          color: #3a3a3a;
        }
        .cs-input:focus,
        .cs-textarea:focus {
          border-bottom-color: #c8a84b;
          color: #fff;
        }
        .cs-textarea {
          min-height: 90px;
          display: block;
        }

        .cs-submit-btn {
          width: 100%;
          background: #f0c000;
          border: none;
          padding: 18px 0;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s ease, opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .cs-submit-btn:hover:not(:disabled) {
          background: #ffd000;
        }
        .cs-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cs-status {
          margin-top: 16px;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          letter-spacing: 0.05em;
        }
        .cs-status.success { color: #6fcf97; }
        .cs-status.error   { color: #eb5757; }

        /* ─── FOOTER ─── */
        .cs-footer {
          border-top: 1px solid #161616;
          padding: 24px 40px;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .cs-footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #fff;
          text-transform: uppercase;
        }
        .cs-footer-logo-dot {
          width: 7px;
          height: 7px;
          background: #f0c000;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cs-footer-nav {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .cs-footer-nav a {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #555;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .cs-footer-nav a:hover { color: #fff; }

        .cs-footer-copy {
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.15em;
          color: #444;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 860px) {
          .cs-inner {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 0 24px 80px;
          }
          .cs-form-card {
            padding: 32px 24px;
          }
          .cs-footer {
            padding: 20px 24px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .cs-footer-nav {
            gap: 20px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .cs-section {
            padding: 64px 0 0;
          }
          .cs-heading {
            font-size: 44px;
          }
        }
      `}</style>

      <section className="cs-section">
        <div className="cs-inner">
          {/* ── LEFT ── */}
          <div>
            <motion.div
              className="cs-label"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="cs-label-line" />
              <span className="cs-label-text">Get In Touch</span>
            </motion.div>

            <motion.h2
              className="cs-heading"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Ready to
              <br />
              engineer the
              <br />
              remarkable?
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="cs-contact-block">
                <p className="cs-contact-label">Email Us</p>
                <a href="mailto:hello@noir-studio.com" className="cs-contact-value">
                  HELLO@NOIR-STUDIO.COM
                </a>
              </div>

              <div className="cs-contact-block">
                <p className="cs-contact-label">Studio Location</p>
                <span className="cs-contact-value">LONDON / LOS ANGELES</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT / FORM ── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="cs-form-card">
              {/* Name */}
              <div className="cs-field">
                <label className="cs-field-label" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="cs-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="cs-field">
                <label className="cs-field-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="cs-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              {/* Inquiry */}
              <div className="cs-field">
                <label className="cs-field-label" htmlFor="inquiry">Project Inquiry</label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  className="cs-textarea"
                  placeholder="Tell us about your vision..."
                  value={form.inquiry}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              {/* Submit */}
              <button
                ref={btnRef}
                className="cs-submit-btn"
                onClick={handleSubmit}
                disabled={submit.status === "loading"}
              >
                {submit.status === "loading" ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Start A Project"
                )}
              </button>

              {submit.status === "success" && (
                <p className="cs-status success">{submit.message}</p>
              )}
              {submit.status === "error" && (
                <p className="cs-status error">{submit.message}</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER STRIP ── */}
        <footer className="cs-footer">
          <div className="cs-footer-logo">
            <div className="cs-footer-logo-dot" />
            <span>AD·VENTURE</span>
          </div>

          <ul className="cs-footer-nav">
            {["Instagram", "Vimeo", "Behance", "LinkedIn"].map((link) => (
              <li key={link}>
                <a href="#" aria-label={link}>{link}</a>
              </li>
            ))}
          </ul>

          <span className="cs-footer-copy">
            © {new Date().getFullYear()} — All Frames Reserved
          </span>
        </footer>
      </section>
    </>
  );
}
