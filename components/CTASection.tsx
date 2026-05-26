'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Shatter particle canvas ────────────────────────────────────────── */
function ShatterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Shatter shards — thin elongated polygons radiating outward */
    type Shard = {
      x: number; y: number;
      vx: number; vy: number;
      rotation: number; vr: number;
      length: number; width: number;
      opacity: number; gold: boolean;
      life: number; maxLife: number;
    };

    const W = () => canvas.width;
    const H = () => canvas.height;
    const cx = () => W() * 0.55; // slightly right of centre like reference
    const cy = () => H() * 0.48;

    const spawnShard = (): Shard => {
      const angle  = Math.random() * Math.PI * 2;
      const speed  = Math.random() * 1.8 + 0.4;
      const life   = Math.random() * 220 + 120;
      return {
        x:       cx() + (Math.random() - 0.5) * 160,
        y:       cy() + (Math.random() - 0.5) * 120,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed - 0.3,
        rotation: Math.random() * Math.PI * 2,
        vr:      (Math.random() - 0.5) * 0.06,
        length:  Math.random() * 28 + 8,
        width:   Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.55 + 0.2,
        gold:    Math.random() > 0.45,
        life, maxLife: life,
      };
    };

    const shards: Shard[] = Array.from({ length: 90 }, spawnShard);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      shards.forEach((s, i) => {
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.012; // subtle gravity
        s.rotation += s.vr;
        s.life -= 1;

        if (s.life <= 0) shards[i] = spawnShard();

        const fade = s.life / s.maxLife;
        const alpha = s.opacity * fade;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = s.gold
          ? `rgba(245,197,24,1)`
          : `rgba(255,255,255,0.7)`;
        ctx.lineWidth = s.width;
        ctx.lineCap  = 'round';
        ctx.beginPath();
        ctx.moveTo(-s.length / 2, 0);
        ctx.lineTo( s.length / 2, 0);
        ctx.stroke();
        ctx.restore();
      });

      /* Central glow burst */
      const grd = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 220);
      grd.addColorStop(0,   'rgba(245,197,24,0.07)');
      grd.addColorStop(0.5, 'rgba(180,120,0,0.03)');
      grd.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W(), H());

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ─── Animated email button ──────────────────────────────────────────── */
function EmailButton() {
  const ref    = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href="mailto:info.adventure27@gmail.com"
      className="group inline-flex items-center gap-4 border border-[#F5C518]/60 px-8 py-4 hover:border-[#F5C518] transition-colors duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
      aria-label="Email us at info.adventure27@gmail.com"
    >
      {/* Shimmer */}
      <span
        className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.08), transparent)' }}
        aria-hidden="true"
      />

      <span
        className="relative z-10 text-white text-[13px] md:text-[15px] tracking-[0.08em]"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        info.adventure27@gmail.com
      </span>

      {/* Arrow icon box */}
      <span className="relative z-10 w-7 h-7 border border-[#F5C518]/40 flex items-center justify-center group-hover:border-[#F5C518] group-hover:bg-[#F5C518]/10 transition-all duration-300">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M1 10L10 1M10 1H3M10 1V8" stroke="#F5C518" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' });

  /* GSAP: flicker the headline on enter */
  useEffect(() => {
    if (!inView) return;
    gsap.fromTo('.cta-headline-line',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, stagger: 0.14, duration: 0.9, ease: 'power4.out', delay: 0.1 },
    );
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Animated shatter particles ──────────────────── */}
      <ShatterCanvas />

      {/* ── Deep radial vignette (black edges, glow centre) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 65% 60% at 55% 50%, rgba(60,40,0,0.25) 0%, transparent 65%)',
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.88) 80%, #000 100%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle horizontal scan lines texture ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        >
          <div className="w-6 h-px bg-[#F5C518]/60" />
          <span
            className="text-[10px] tracking-[0.45em] text-[#F5C518]/80 uppercase"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Let&apos;s Create
          </span>
          <div className="w-6 h-px bg-[#F5C518]/60" />
        </motion.div>

        {/* Headline — HAVE A / VISION? */}
        <div className="mb-8 overflow-hidden">
          <h2
            className="cta-headline-line font-impact text-white uppercase leading-[0.88]"
            style={{ fontSize: 'clamp(3.6rem,9vw,8.5rem)', opacity: 0 }}
          >
            Have a
          </h2>
          <p
            className="cta-headline-line font-impact text-gold-gradient uppercase leading-[0.88]"
            style={{ fontSize: 'clamp(3.6rem,9vw,8.5rem)', opacity: 0 }}
            aria-label="Vision?"
          >
            Vision?
          </p>
        </div>

        {/* Sub-copy */}
        <motion.p
          className="text-[#666] text-[13px] md:text-[15px] leading-[1.9] mb-12 max-w-md"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          Tell us about your brand, your film, or the impossible thing you want
          to make.{' '}
          <em className="not-italic text-[#888]">We&apos;ll handle the rest.</em>
        </motion.p>

        {/* Email CTA */}
        <EmailButton />

        {/* Bottom meta */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-4 text-[9px] tracking-[0.25em] text-[#333] uppercase"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        >
          <span>Dubai</span>
          <span className="text-[#F5C518]/30">✦</span>
          <span>Mumbai</span>
          <span className="text-[#F5C518]/30">✦</span>
          <span>Global</span>
        </motion.div>
      </div>
    </section>
  );
}
