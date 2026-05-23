"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const faqs = [
  {
    id: 1,
    question: "WHAT IS THE TYPICAL TIMELINE?",
    answer:
      "Every project is engineered from scratch. Commercials typically span 6–10 weeks from concept to final grade. Large-scale campaign VFX and AI integrations may require 12–16 weeks for absolute precision.",
  },
  {
    id: 2,
    question: "DO YOU HANDLE POST-PRODUCTION INTERNALLY?",
    answer:
      "Yes — our studio is fully vertically integrated. From on-set supervision to color grading, sound design, and final delivery, every stage is managed under one roof by our core team.",
  },
  {
    id: 3,
    question: "HOW IS AI INTEGRATED INTO THE WORKFLOW?",
    answer:
      "AI is woven into our pipeline at every stage — from pre-viz and asset generation to intelligent retouching and real-time rendering. We deploy proprietary models fine-tuned to cinematic standards.",
  },
  {
    id: 4,
    question: "WHAT ARE YOUR TECHNICAL CAPABILITIES?",
    answer:
      "We operate with RED and ARRI camera systems, support up to 8K final deliverables, and run a fully GPU-accelerated render farm. Our pipeline supports all major formats including ACES, ProRes, and DPX.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const plusRefs = useRef<Record<number, HTMLSpanElement | null>>({});

  const handleToggle = (id: number) => {
    const isClosing = openId === id;

    // GSAP rotate animation on the +/× icon
    const el = plusRefs.current[id];
    if (el) {
      gsap.to(el, {
        rotation: isClosing ? 0 : 45,
        duration: 0.35,
        ease: "power3.out",
      });
    }

    // Reset previous open item's icon
    if (openId && openId !== id) {
      const prev = plusRefs.current[openId];
      if (prev) {
        gsap.to(prev, { rotation: 0, duration: 0.3, ease: "power3.out" });
      }
    }

    setOpenId(isClosing ? null : id);
  };

  return (
    <section
      className="faq-section"
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        .faq-section * {
          box-sizing: border-box;
        }

        .faq-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 80px;
          align-items: start;
        }

        .faq-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .faq-label-line {
          width: 32px;
          height: 1px;
          background: #c8a84b;
        }

        .faq-label-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #888;
          text-transform: uppercase;
        }

        .faq-heading {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(52px, 7vw, 80px);
          font-weight: 900;
          line-height: 0.92;
          color: #ffffff;
          text-transform: lowercase;
          margin: 0 0 28px 0;
          letter-spacing: -1px;
        }

        .faq-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: #666;
          margin: 0;
          max-width: 280px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
        }

        .faq-item {
          border-top: 1px solid #222;
        }

        .faq-item:last-child {
          border-bottom: 1px solid #222;
        }

        .faq-trigger {
          width: 100%;
          background: none;
          border: none;
          padding: 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          gap: 20px;
          text-align: left;
        }

        .faq-trigger:hover .faq-question {
          color: #ffffff;
          transition: color 0.2s ease;
        }

        .faq-question {
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #ccc;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .faq-question.is-open {
          color: #ffffff;
        }

        .faq-icon {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a84b;
          font-size: 22px;
          font-weight: 300;
          line-height: 1;
          user-select: none;
        }

        .faq-answer {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: #888;
          padding-bottom: 28px;
          max-width: 580px;
        }

        @media (max-width: 900px) {
          .faq-inner {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 24px;
          }

          .faq-heading {
            font-size: clamp(48px, 12vw, 70px);
          }

          .faq-subtext {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .faq-inner {
            padding: 0 16px;
          }

          .faq-question {
            font-size: 10px;
          }

          .faq-answer {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="faq-inner">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="faq-label">
            <div className="faq-label-line" />
            <span className="faq-label-text">The Intel</span>
          </div>

          <h2 className="faq-heading">
            Frequently
            <br />
            asked
            <br />
            questions
          </h2>

          <p className="faq-subtext">
            Everything you need to know about our cinematic engineering process
            and operational scope.
          </p>
        </motion.div>

        {/* Right Column — FAQ List */}
        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                className="faq-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index + 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  className="faq-trigger"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className={`faq-question ${isOpen ? "is-open" : ""}`}>
                    {faq.question}
                  </span>
                  <span
                    className="faq-icon"
                    ref={(el) => {
                      plusRefs.current[faq.id] = el;
                    }}
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          },
                          opacity: { duration: 0.3, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.35, ease: [0.4, 0, 1, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
