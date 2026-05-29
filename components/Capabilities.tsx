"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const capabilities = [
  {
    num: "01",
    title: "Cinematic Ads & Films",
    desc: "High-end brand commercials and cinematic films shot with emotional depth and luxury precision.",
  },
  {
    num: "02",
    title: "AI-Powered Campaigns",
    desc: "Generative concepts, AI-driven imagery and next-gen creative pipelines built for impact.",
  },
  {
    num: "03",
    title: "VFX, CGI & Motion",
    desc: "Visual effects, 3D and motion graphics that bend reality and elevate every frame.",
  },
  {
    num: "04",
    title: "Luxury Brand Identity",
    desc: "Visual systems, creative direction and brand worlds engineered to be remembered.",
  },
  {
    num: "05",
    title: "Social & Viral Content",
    desc: "Scroll-stopping reels and social campaigns engineered for attention, reach and culture.",
  },
  {
    num: "06",
    title: "Digital Experiences",
    desc: "Immersive web, interactive storytelling and digital branding built for the future.",
  },
];

function CapabilityCard({ cap, index }: { cap: (typeof capabilities)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { backgroundColor: "#0f0f0f", duration: 0.3, ease: "power2.out" });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 4, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { backgroundColor: "transparent", duration: 0.3, ease: "power2.out" });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="cap-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className="cap-num">{cap.num}</span>
        <h3 className="cap-title">{cap.title}</h3>
        <p className="cap-desc">{cap.desc}</p>
        <a href="#" className="cap-link">
          EXPLORE
          <span ref={arrowRef} className="cap-arrow">→</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section className="cap-section" id="services">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .cap-section {
          background: #080808;
          padding: 100px 0 120px;
          font-family: 'Inter', sans-serif;
        }

        .cap-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Header ── */
        .cap-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: 60px;
          margin-bottom: 64px;
        }

        .cap-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .cap-label-line {
          width: 32px;
          height: 1px;
          background: #c8a84b;
        }
        .cap-label-text {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #666;
          text-transform: uppercase;
        }

        .cap-heading {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(40px, 5.5vw, 68px);
          font-weight: 900;
          line-height: 0.95;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .cap-subtext {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: #666;
          max-width: 400px;
          align-self: end;
          padding-bottom: 6px;
        }

        /* ── Grid ── */
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #1a1a1a;
          border-left: 1px solid #1a1a1a;
        }

        .cap-card {
          border-right: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          padding: 36px 32px 32px;
          cursor: pointer;
          transition: background 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cap-num {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #c8a84b;
          margin-bottom: 20px;
          display: block;
          font-variant-numeric: tabular-nums;
        }

        .cap-title {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(22px, 2.2vw, 30px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 16px;
          letter-spacing: 0.01em;
          line-height: 1.05;
        }

        .cap-desc {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.75;
          color: #555;
          margin: 0 0 28px;
          flex: 1;
        }

        .cap-link {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #444;
          text-transform: uppercase;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }
        .cap-link:hover { color: #c8a84b; }
        .cap-arrow {
          display: inline-block;
          font-size: 12px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cap-header { grid-template-columns: 1fr; gap: 24px; }
          .cap-grid { grid-template-columns: repeat(2, 1fr); }
          .cap-inner { padding: 0 24px; }
        }
        @media (max-width: 560px) {
          .cap-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cap-inner">
        {/* Header */}
        <div className="cap-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cap-label">
              <div className="cap-label-line" />
              <span className="cap-label-text">Capabilities</span>
            </div>
            <h2 className="cap-heading">
              One studio.
              <br />
              Every discipline.
            </h2>
          </motion.div>

          <motion.p
            className="cap-subtext"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            At ADVENTURE ADVERTISEMENT…we don’t follow trends.We create visuals that become unforgettable. — so the creative idea you start with is the idea that ships, uncompromised.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="cap-grid">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.num} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
