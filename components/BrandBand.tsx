'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ServiceItem {
  label: string;
  icon:  '◈' | '★';
}

const ROW_1: ServiceItem[] = [
  { label: 'Commercials',         icon: '◈' },
  { label: 'Campaigns',           icon: '★' },
  { label: 'VFX',                 icon: '◈' },
  { label: 'AI Creativity',       icon: '★' },
  { label: 'Motion Graphics',     icon: '◈' },
  { label: 'Brand Identity',      icon: '★' },
  { label: 'Cinematic Shoots',    icon: '◈' },
  { label: 'Social Media',        icon: '★' },
  { label: 'Digital Storytelling',icon: '◈' },
  { label: 'Luxury Visuals',      icon: '★' },
];

const ROW_2: ServiceItem[] = [
  { label: 'Brand Strategy',      icon: '◈' },
  { label: 'Visual Effects',      icon: '★' },
  { label: 'Content Creation',    icon: '◈' },
  { label: 'Film Production',     icon: '★' },
  { label: 'Color Grading',       icon: '◈' },
  { label: 'Sound Design',        icon: '★' },
  { label: 'Post Production',     icon: '◈' },
  { label: 'Creative Direction',  icon: '★' },
  { label: 'Art Direction',       icon: '◈' },
  { label: 'Concept Design',      icon: '★' },
];

/* Triplicated for a seamless CSS loop */
function TickerRow({
  items,
  direction = 'fwd',
}: {
  items: ServiceItem[];
  direction?: 'fwd' | 'back';
}) {
  const tripled = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden w-full">
      {/* Edge fade — left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
        aria-hidden="true"
      />
      {/* Edge fade — right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <ul
        className={`flex shrink-0 ${
          direction === 'fwd' ? 'animate-marquee-fwd' : 'animate-marquee-back'
        }`}
        aria-hidden="true" /* decorative — content described by heading */
      >
        {tripled.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-3 px-7 md:px-9">
            <span
              className="text-[#F5C518] text-[11px] leading-none select-none"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span
              className="font-impact text-[16px] md:text-[19px] whitespace-nowrap select-none"
              style={{
                color: i % 2 === 0 ? '#ffffff' : '#555555',
                letterSpacing: '0.06em',
              }}
            >
              {item.label.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BrandBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* Animated top/bottom accent lines reveal on scroll */
  const lineScale = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      aria-label="Services we offer"
      className="relative bg-black overflow-hidden"
      style={{
        borderTop:    '1px solid rgba(245,197,24,0.07)',
        borderBottom: '1px solid rgba(245,197,24,0.07)',
      }}
    >
      {/* Scroll-reveal top line */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          scaleX: lineScale,
          originX: 0,
          background: 'linear-gradient(to right, transparent, #F5C518, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Subtle gold glow behind the band */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(245,197,24,0.025) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Row 1 → left to right */}
      <div
        className="py-5 md:py-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <TickerRow items={ROW_1} direction="fwd" />
      </div>

      {/* Row 2 ← right to left */}
      <div className="py-5 md:py-6">
        <TickerRow items={ROW_2} direction="back" />
      </div>

      {/* Scroll-reveal bottom line */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          scaleX: lineScale,
          originX: 1,
          background: 'linear-gradient(to right, transparent, #F5C518, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
