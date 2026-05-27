"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: ["AD venture Studio doesn't just", "deliver a film — they", "deliver a world that feels"],
    highlight: "impossible to look away from.",
    name: "Julian C.",
    role: "Creative Director",
    company: "Lasteil",
    index: "01",
  },
  {
    quote: ["The level of technical precision", "combined with raw artistic soul is"],
    highlight: "unparalleled in the industry.",
    name: "Raj Mehta",
    role: "Head of Brand",
    company: "Global Vision",
    index: "02",
  },
  {
    quote: ["They transformed our concept", "into a cinematic legacy.", "Every frame is a"],
    highlight: "masterpiece of engineering.",
    name: "Sophie L.",
    role: "Executive Producer",
    company: "Orion Films",
    index: "03",
  },
  {
    quote: ["AD venture Studio doesn't just", "deliver a film — they", "deliver a world that feels"],
    highlight: "impossible to look away from.",
    name: "AKshita Sharma",
    role: "Branch Manager",
    company: "Lasteil",
    index: "04",
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-driven sequential reveal using a tall spacer + sticky container
  useEffect(() => {
    if (typeof window === "undefined") return;
    const spacer = spacerRef.current;
    const sticky = stickyRef.current;
    if (!spacer || !sticky) return;

    const total = testimonials.length;

    const trigger = ScrollTrigger.create({
      trigger: spacer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * total), total - 1);
        setActive((prev) => {
          if (prev !== idx) return idx;
          return prev;
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Animate progress line whenever active changes
  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power3.out", transformOrigin: "left" }
      );
    }
  }, [active]);

  const t = testimonials[active];

  const lineVariants = {
    hidden: { opacity: 0, y: 64, rotateX: -15 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 1, delay: i * 0.1, ease: easeInOut },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -32,
      transition: { duration: 0.4, delay: i * 0.04, ease: easeInOut },
    }),
  };

  return (
    <>
      {/* Tall scroll spacer with sticky inner */}
      <div
        ref={spacerRef}
        style={{ height: `${testimonials.length * 100}vh`, position: "relative" }}
      >
        <div
          ref={stickyRef}
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          <section ref={sectionRef} className="ts-section">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

              .ts-section {
                position: relative;
                width: 100%;
                height: 100vh;
                background: #050505;
                font-family: 'Inter', sans-serif;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }

              .ts-noise {
                position: absolute;
                inset: 0;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
                pointer-events: none;
                opacity: 0.4;
                z-index: 0;
              }

              .ts-glow {
                position: absolute;
                width: 800px;
                height: 800px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(200,168,75,0.05) 0%, transparent 65%);
                pointer-events: none;
                top: 50%;
                left: 40%;
                transform: translate(-50%, -50%);
                z-index: 0;
                transition: opacity 1s ease;
              }

              .ts-label {
                position: absolute;
                top: 52px;
                left: 64px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 2;
              }
              .ts-label-line {
                width: 32px;
                height: 1px;
                background: #c8a84b;
              }
              .ts-label-text {
                font-size: 9px;
                font-weight: 600;
                letter-spacing: 0.22em;
                color: #555;
                text-transform: uppercase;
              }

              .ts-counter {
                position: absolute;
                top: 44px;
                right: 64px;
                display: flex;
                align-items: center;
                gap: 14px;
                z-index: 2;
              }
              .ts-count-active {
                font-family: 'Impact', sans-serif;
                font-size: 52px;
                font-weight: 400;
                color: #c8a84b;
                line-height: 1;
                letter-spacing: -3px;
              }
              .ts-count-sep {
                width: 1px;
                height: 36px;
                background: #222;
              }
              .ts-count-total {
                font-size: 11px;
                font-weight: 300;
                color: #2e2e2e;
                letter-spacing: 0.1em;
              }

              .ts-main {
                max-width: 1100px;
                margin: 0 auto;
                padding: 0 64px;
                width: 100%;
                perspective: 1400px;
                position: relative;
                z-index: 2;
              }

              .ts-quote-wrap {
                margin-bottom: 52px;
              }

              .ts-quote-line {
                overflow: hidden;
                display: block;
                line-height: 1;
              }

              .ts-quote-text {
                font-family: 'Impact', 'Arial Narrow', sans-serif;
                font-size: clamp(38px, 5.8vw, 76px);
                font-weight: 400;
                color: #fff;
                display: block;
                letter-spacing: -0.5px;
                line-height: 1.08;
                padding: 2px 0;
              }

              .ts-quote-highlight {
                font-family: 'Impact', 'Arial Narrow', sans-serif;
                font-size: clamp(38px, 5.8vw, 76px);
                font-weight: 400;
                color: #c8a84b;
                letter-spacing: -0.5px;
                line-height: 1.08;
                font-style: italic;
                display: block;
                padding: 2px 0;
              }

              .ts-author {
                display: flex;
                align-items: center;
                gap: 20px;
              }
              .ts-author-line {
                width: 40px;
                height: 1px;
                background: #c8a84b;
                flex-shrink: 0;
              }
              .ts-author-name {
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.2em;
                color: #c8a84b;
                text-transform: uppercase;
              }
              .ts-author-sep {
                color: #2a2a2a;
                margin: 0 6px;
              }
              .ts-author-role {
                font-size: 9px;
                font-weight: 300;
                letter-spacing: 0.15em;
                color: #3a3a3a;
                text-transform: uppercase;
              }

              /* Progress dots + bar */
              .ts-progress {
                position: absolute;
                bottom: 52px;
                left: 64px;
                right: 64px;
                z-index: 2;
                display: flex;
                align-items: center;
                gap: 12px;
              }
              .ts-prog-dots {
                display: flex;
                gap: 8px;
              }
              .ts-prog-dot {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #222;
                transition: background 0.4s ease, transform 0.4s ease;
                cursor: pointer;
                flex-shrink: 0;
              }
              .ts-prog-dot.active {
                background: #c8a84b;
                transform: scale(1.4);
              }
              .ts-prog-track {
                flex: 1;
                height: 1px;
                background: #161616;
                position: relative;
                overflow: hidden;
              }
              .ts-prog-fill {
                position: absolute;
                inset: 0;
                background: linear-gradient(to right, #c8a84b, #e8c96a);
                transform-origin: left;
              }

              /* Decorative giant number */
              .ts-bg-index {
                position: absolute;
                bottom: -40px;
                right: 40px;
                font-family: 'Impact', sans-serif;
                font-size: 320px;
                font-weight: 900;
                color: transparent;
                -webkit-text-stroke: 1px rgba(255,255,255,0.018);
                line-height: 1;
                pointer-events: none;
                user-select: none;
                letter-spacing: -12px;
                z-index: 1;
              }

              /* Vertical rule */
              .ts-vline {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 1px;
                background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent);
                pointer-events: none;
                z-index: 1;
              }

              /* Scroll hint */
              .ts-scroll-hint {
                position: absolute;
                bottom: 46px;
                right: 64px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 9px;
                font-weight: 400;
                letter-spacing: 0.18em;
                color: #2a2a2a;
                text-transform: uppercase;
                z-index: 2;
              }
              .ts-scroll-mouse {
                width: 16px;
                height: 24px;
                border: 1px solid #2a2a2a;
                border-radius: 8px;
                position: relative;
              }
              .ts-scroll-mouse::after {
                content: '';
                position: absolute;
                top: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 5px;
                background: #c8a84b;
                border-radius: 1px;
                animation: mouseScroll 1.8s ease infinite;
              }
              @keyframes mouseScroll {
                0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 0; transform: translateX(-50%) translateY(7px); }
                100% { opacity: 0; transform: translateX(-50%) translateY(0); }
              }

              @media (max-width: 768px) {
                .ts-main { padding: 0 24px; }
                .ts-label { left: 24px; top: 28px; }
                .ts-counter { right: 24px; top: 24px; }
                .ts-progress { left: 24px; right: 24px; bottom: 28px; }
                .ts-scroll-hint { display: none; }
                .ts-bg-index { font-size: 180px; right: 10px; }
                .ts-count-active { font-size: 36px; }
                .ts-vline { display: none; }
              }
            `}</style>

            <div className="ts-noise" />
            <div className="ts-glow" />
            <div className="ts-vline" />

            {/* Label */}
            <motion.div
              className="ts-label"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ts-label-line" />
              <span className="ts-label-text">Voices of Vision</span>
            </motion.div>

            {/* Counter */}
            <div className="ts-counter">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active + "count"}
                  className="ts-count-active"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t.index}
                </motion.span>
              </AnimatePresence>
              <div className="ts-count-sep" />
              <span className="ts-count-total">0{testimonials.length}</span>
            </div>

            {/* Background decorative number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "bgnum"}
                className="ts-bg-index"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {t.index}
              </motion.div>
            </AnimatePresence>

            {/* Quote */}
            <div className="ts-main">
              <div className="ts-quote-wrap">
                <AnimatePresence mode="wait">
                  <motion.div key={active + "q"}>
                    {t.quote.map((line, li) => (
                      <span key={li} className="ts-quote-line">
                        <motion.span
                          className="ts-quote-text"
                          custom={li}
                          variants={lineVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                        >
                          {line}
                        </motion.span>
                      </span>
                    ))}
                    <span className="ts-quote-line">
                      <motion.span
                        className="ts-quote-highlight"
                        custom={t.quote.length}
                        variants={lineVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        {t.highlight}
                      </motion.span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + "author"}
                  className="ts-author"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="ts-author-line" />
                  <div>
                    <span className="ts-author-name">{t.name}</span>
                    <span className="ts-author-sep">·</span>
                    <span className="ts-author-role">
                      {t.role}, {t.company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="ts-progress">
              <div className="ts-prog-dots">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`ts-prog-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
              <div className="ts-prog-track">
                <div ref={lineRef} className="ts-prog-fill" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>

            {/* Scroll hint */}
            <div className="ts-scroll-hint">
              <span>Scroll</span>
              <div className="ts-scroll-mouse" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
