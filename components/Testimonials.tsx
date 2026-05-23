"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const testimonials = [
  {
    quote: "Noir Studio doesn't just deliver a film; they deliver a world that feels",
    highlight: "impossible",
    quoteSuffix: " to look away from.",
    name: "Julian Vance",
    role: "Creative Director, Lasteil",
  },
  {
    quote: "The level of technical precision combined with raw artistic soul is",
    highlight: "unparalleled",
    quoteSuffix: " in the industry today.",
    name: "Elena Rossi",
    role: "Head of Brand, Global Vision",
  },
  {
    quote: "They transformed our concept into a cinematic legacy. Every frame is a",
    highlight: "masterpiece",
    quoteSuffix: " of engineering.",
    name: "Marcus Thorne",
    role: "Executive Producer, Orion Films",
  },
  {
    quote: "Working with them felt like wielding a creative force that is simply",
    highlight: "unstoppable",
    quoteSuffix: " in its vision.",
    name: "Sofia Langford",
    role: "Brand Lead, Voss Creative",
  },
  {
    quote: "Every deliverable exceeded expectations. Their work is genuinely",
    highlight: "transcendent",
    quoteSuffix: " — a new industry benchmark.",
    name: "Ryuu Nakamura",
    role: "Director, Nocturne Films",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="ts-card">
      <blockquote className="ts-quote">
        &ldquo;{t.quote}{" "}
        <span className="ts-highlight">{t.highlight}</span>
        {t.quoteSuffix}&rdquo;
      </blockquote>
      <div className="ts-author">
        <span className="ts-name">{t.name}</span>
        <span className="ts-role">{t.role}</span>
      </div>
    </div>
  );
}

// Infinite marquee — doubled items for seamless loop
function Marquee({ reversed = false }: { reversed?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalW = track.scrollWidth / 2; // half since items are doubled

    tweenRef.current = gsap.to(track, {
      x: reversed ? totalW : -totalW,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalW),
      },
    });

    const handleEnter = () => tweenRef.current?.pause();
    const handleLeave = () => tweenRef.current?.resume();

    track.parentElement?.addEventListener("mouseenter", handleEnter);
    track.parentElement?.addEventListener("mouseleave", handleLeave);

    return () => {
      tweenRef.current?.kill();
      track.parentElement?.removeEventListener("mouseenter", handleEnter);
      track.parentElement?.removeEventListener("mouseleave", handleLeave);
    };
  }, [reversed]);

  const items = [...testimonials, ...testimonials]; // duplicate for seamless

  return (
    <div className="ts-marquee-outer">
      <div ref={trackRef} className="ts-track">
        {items.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="ts-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .ts-section {
          background: #060606;
          padding: 100px 0 120px;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* ── Header ── */
        .ts-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          margin-bottom: 72px;
        }

        .ts-label {
          display: flex;
          align-items: center;
          gap: 12px;
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

        /* ── Marquee ── */
        .ts-marquee-outer {
          overflow: hidden;
          width: 100%;
          padding: 12px 0;
          /* edge fade */
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .ts-rows {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ts-track {
          display: flex;
          gap: 24px;
          width: max-content;
          will-change: transform;
        }

        /* ── Card ── */
        .ts-card {
          width: 380px;
          flex-shrink: 0;
          border: 1px solid #181818;
          background: #0a0a0a;
          padding: 40px 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          transition: border-color 0.3s ease, background 0.3s ease;
          cursor: default;
        }
        .ts-card:hover {
          border-color: #2a2a2a;
          background: #0f0f0f;
        }

        .ts-quote {
          font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 300;
          line-height: 1.7;
          color: #ccc;
          margin: 0;
          font-style: normal;
          letter-spacing: -0.01em;
        }

        .ts-highlight {
          color: #c8a84b;
          font-weight: 400;
          font-style: italic;
        }

        .ts-author {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid #181818;
          padding-top: 20px;
        }

        .ts-name {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #c8a84b;
          text-transform: uppercase;
        }

        .ts-role {
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: #444;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .ts-header { padding: 0 24px; }
          .ts-card { width: 300px; padding: 28px 24px 24px; }
        }
      `}</style>

      {/* Header */}
      <div className="ts-header">
        <motion.div
          className="ts-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ts-label-line" />
          <span className="ts-label-text">Voices of Vision</span>
        </motion.div>
      </div>

      {/* Two-row marquee scrolling in opposite directions */}
      <motion.div
        className="ts-rows"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Marquee reversed={false} />
        <Marquee reversed={true} />
      </motion.div>
    </section>
  );
}
