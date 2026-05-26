"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    image: "/frames-1.png",
    category: "LUXURY BRAND",
    year: "2025",
    title: "Lasteil Parfum",
  },
  {
    id: 2,
    image: "/frames-2.png",
    category: "CINEMATICS",
    year: "2025",
    title: "Midnight Bureau",
  },
  {
    id: 3,
    image: "/frames-3.png",
    category: "CAMPAIGN",
    year: "2025",
    title: "Crimson Hours",
  },
  {
    id: 4,
    image: "/frames-4.png",
    category: "VFX / AI",
    year: "2025",
    title: "Particle State",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power3.out" });
    }
  };

  const handleLeave = () => {
    setHovered(false);
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power3.out" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    gsap.to(cardRef.current, {
      rotateX: -y,
      rotateY: x,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeaveCard = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    handleLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={cardRef}
        className="sw-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleMouseLeaveCard}
        onMouseMove={handleMouseMove}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image wrapper */}
        <div className="sw-img-wrap">
          <div ref={imgRef} className="sw-img-inner">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={index < 2}
            />
            {/* Dark gradient bottom */}
            <div className="sw-gradient" />
          </div>

          {/* Hover overlay: gold tint */}
          <div ref={overlayRef} className="sw-overlay" style={{ opacity: 0 }} />

          {/* View label on hover */}
          <div className={`sw-view-label ${hovered ? "visible" : ""}`}>
            <span>VIEW PROJECT</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Meta info */}
        <div className="sw-meta">
          <div className="sw-meta-top">
            <div className="sw-meta-line" />
            <span className="sw-category">{project.category}</span>
            <span className="sw-sep">/</span>
            <span className="sw-year">{project.year}</span>
          </div>
          <h3 className="sw-title">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="sw-section" id="work">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .sw-section {
          background: #080808;
          padding: 100px 0 120px;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .sw-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
        }

        .sw-header-left {}

        .sw-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .sw-label-line {
          width: 32px;
          height: 1px;
          background: #c8a84b;
        }
        .sw-label-text {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #666;
          text-transform: uppercase;
        }

        .sw-heading {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 900;
          line-height: 1.0;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .sw-all-link {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
          padding-bottom: 4px;
        }
        .sw-all-link:hover { color: #c8a84b; }

        .sw-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* ── Card ── */
        .sw-card {
          cursor: pointer;
          position: relative;
        }

        .sw-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #111;
        }

        .sw-img-inner {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .sw-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }

        .sw-overlay {
          position: absolute;
          inset: 0;
          background: rgba(200, 168, 75, 0.12);
          z-index: 2;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .sw-view-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          opacity: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 12px 20px;
          backdrop-filter: blur(4px);
          background: rgba(0,0,0,0.3);
        }
        .sw-view-label.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .sw-meta {
          padding: 18px 0 8px;
        }
        .sw-meta-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .sw-meta-line {
          width: 20px;
          height: 1px;
          background: #c8a84b;
          flex-shrink: 0;
        }
        .sw-category {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #666;
          text-transform: uppercase;
        }
        .sw-sep {
          color: #333;
          font-size: 9px;
        }
        .sw-year {
          font-size: 9px;
          font-weight: 400;
          color: #444;
          letter-spacing: 0.1em;
        }
        .sw-title {
          font-family: 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 400;
          color: #fff;
          margin: 0;
          letter-spacing: 0.01em;
          transition: color 0.3s ease;
        }
        .sw-card:hover .sw-title { color: #c8a84b; }

        @media (max-width: 768px) {
          .sw-grid {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
          .sw-header { padding: 0 24px; }
          .sw-all-link { display: none; }
        }
      `}</style>

      {/* Header */}
      <div className="sw-header">
        <motion.div className="sw-header-left" style={{ y: headingY }}>
          <div className="sw-label">
            <div className="sw-label-line" />
            <span className="sw-label-text">Selected Work</span>
          </div>
          <h2 className="sw-heading">
            Frames that
            <br />
            refuse to fade.
          </h2>
        </motion.div>

        <motion.a
          href="#"
          className="sw-all-link"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          ALL PROJECTS +
        </motion.a>
      </div>

      {/* Grid */}
      <div className="sw-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
