// 'use client';

// import { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { gsap } from 'gsap';
// import { BackgroundRippleEffect } from './ui/background-ripple-effect';

// interface Particle {
//   x: number; y: number;
//   vx: number; vy: number;
//   size: number; opacity: number;
//   gold: boolean;
// }

// export default function HeroSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const canvasRef  = useRef<HTMLCanvasElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start start', 'end start'],
//   });

//   /* Parallax transforms */
//   const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
//   const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
//   const textY     = useTransform(scrollYProgress, [0, 1], [0, 130]);
//   const overlayOp = useTransform(scrollYProgress, [0, 0.5], [0.52, 0.82]);

//   /* GSAP scroll-indicator pulse */
//   useEffect(() => {
//     gsap.to('.hero-scroll-dot', {
//       scaleY: 0.25,
//       opacity: 0.2,
//       yoyo: true,
//       repeat: -1,
//       duration: 1.6,
//       ease: 'sine.inOut',
//     });
//   }, []);

//   /* Particle canvas */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d')!;

//     const resize = () => {
//       canvas.width  = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const particles: Particle[] = Array.from({ length: 65 }, () => ({
//       x:       Math.random() * canvas.width,
//       y:       Math.random() * canvas.height,
//       vx:      (Math.random() - 0.5) * 0.35,
//       vy:      -(Math.random() * 0.55 + 0.15),
//       size:    Math.random() * 2.2 + 0.4,
//       opacity: Math.random() * 0.55 + 0.08,
//       gold:    Math.random() > 0.68,
//     }));

//     let raf: number;
//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.x += p.vx; p.y += p.vy;
//         if (p.y < -4)            { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
//         if (p.x < 0)              p.x = canvas.width;
//         if (p.x > canvas.width)   p.x = 0;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = p.gold
//           ? `rgba(245,197,24,${p.opacity})`
//           : `rgba(255,255,255,${p.opacity * 0.45})`;
//         ctx.fill();
//       });
//       raf = requestAnimationFrame(draw);
//     };
//     draw();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener('resize', resize);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="home"
//       className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
//     >
//       <BackgroundRippleEffect />
//       {/* ── Background image with parallax ─────────────── */}
//       <motion.div
//         className="absolute inset-0 will-change-transform"
//         style={{ scale: bgScale, opacity: bgOpacity }}
//       >
//         <Image
//           src="/hero-bg.png"
//           alt=""
//           fill
//           priority
//           className="object-cover object-center"
//           aria-hidden="true"
//           onError={() => {/* graceful — gradient fallback below shows */}}
//         />
//         {/* Cinematic gold-burst gradient fallback / supplement */}
//         <div className="absolute inset-0"
//           style={{
//             background: [
//               'radial-gradient(ellipse 75% 60% at 72% 48%, rgba(245,197,24,0.07) 0%, transparent 55%)',
//               'radial-gradient(ellipse 45% 75% at 80% 35%, rgba(160,105,0,0.13) 0%, transparent 52%)',
//               'radial-gradient(ellipse 90% 90% at 100% 0%,  rgba(245,197,24,0.04) 0%, transparent 48%)',
//             ].join(', '),
//           }}
//         />
//       </motion.div>

//       {/* ── Dark vignette overlay ───────────────────────── */}
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           opacity: overlayOp,
//           background:
//             'linear-gradient(108deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.74) 48%, rgba(0,0,0,0.34) 100%)',
//         }}
//       />

//       {/* ── Particles ───────────────────────────────────── */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 pointer-events-none"
//         style={{ zIndex: 1, mixBlendMode: 'screen' }}
//         aria-hidden="true"
//       />

//       {/* ── Decorative horizontal scan line ─────────────── */}
//       <div
//         className="absolute inset-x-0 h-px pointer-events-none"
//         style={{
//           top: '50%',
//           zIndex: 2,
//           background:
//             'linear-gradient(to right, transparent, rgba(245,197,24,0.10), transparent)',
//         }}
//         aria-hidden="true"
//       />

//       {/* ── Corner glows ────────────────────────────────── */}
//       <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ zIndex: 2,
//         background: 'radial-gradient(ellipse at 100% 0%, rgba(245,197,24,0.06) 0%, transparent 60%)' }} aria-hidden="true" />
//       <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none" style={{ zIndex: 2,
//         background: 'radial-gradient(ellipse at 0% 100%, rgba(245,197,24,0.04) 0%, transparent 60%)' }} aria-hidden="true" />

//       {/* ── Main content ────────────────────────────────── */}
//       <motion.div
//         className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14"
//         style={{ y: textY, paddingTop: '8rem', paddingBottom: '5rem' }}
//       >
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[72vh]">

//           {/* ── Left column: headline ─────────────────────── */}
//           <div className="flex flex-col justify-center">

//             {/* Eyebrow badge */}
//             <div className="fade-up fade-up-1 flex items-center gap-3 mb-10">
//               <div className="w-8 h-px bg-[#F5C518]" />
//               <span
//                 className="text-[10px] tracking-[0.38em] text-[#F5C518] uppercase"
//                 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
//               >
//                 A Creative &amp; Production Company
//               </span>
//             </div>

//             {/* Giant stacked headline */}
//             <div className="overflow-hidden mb-[3px]">
//               <h1 className="font-impact line-reveal line-reveal-1 text-white leading-[0.87]"
//                 style={{ fontSize: 'clamp(3.8rem,8.5vw,7.8rem)' }}>
//                 WE BUILD
//               </h1>
//             </div>
//             <div className="overflow-hidden mb-[3px]">
//               <p  className="font-impact line-reveal line-reveal-2 text-gold-gradient leading-[0.87]"
//                 style={{ fontSize: 'clamp(3.8rem,8.5vw,7.8rem)' }}
//                 aria-label="CINEMATIC">
//                 CINEMATIC
//               </p>
//             </div>
//             <div className="overflow-hidden mb-12 md:mb-14">
//               <p  className="font-impact line-reveal line-reveal-3 text-white leading-[0.87]"
//                 style={{ fontSize: 'clamp(3.8rem,8.5vw,7.8rem)' }}>
//                 WORLDS.
//               </p>
//             </div>

//             {/* Stats row */}
//             <div className="fade-up fade-up-2 flex gap-8 sm:gap-10">
//               {([['200+', 'Projects'], ['50+', 'Brands'], ['8+', 'Years']] as const).map(([n, l]) => (
//                 <div key={l} className="flex flex-col gap-[3px]">
//                   <span className="font-impact text-[#F5C518] text-3xl md:text-[2.1rem] leading-none">{n}</span>
//                   <span className="text-[9px] tracking-[0.22em] text-[#555] uppercase"
//                     style={{ fontFamily: 'Inter, sans-serif' }}>{l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── Right column: description + CTAs ─────────── */}
//           <div className="fade-up fade-up-3 flex flex-col justify-center lg:pl-16 lg:border-l lg:border-white/[0.07]">

//             <p
//               className="text-[#999] text-[15px] md:text-[16px] leading-[1.8] mb-9 max-w-sm"
//               style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
//             >
//               From concept to final frame — commercials, campaigns, VFX,
//               AI and brand storytelling{' '}
//               <em className="not-italic text-white font-[500]">
//                 engineered to be unforgettable.
//               </em>
//             </p>

//             {/* CTA buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-10">
//               <a
//                 href="#work"
//                 className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-[#F5C518] text-black text-[10px] tracking-[0.22em] uppercase px-8 py-[14px] font-[700] hover:bg-white transition-colors duration-300"
//                 style={{ fontFamily: 'Inter, sans-serif' }}
//               >
//                 <span className="relative z-10">View the Reel</span>
//                 <svg className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-200"
//                   viewBox="0 0 16 16" fill="none" aria-hidden="true">
//                   <polygon points="4,3 13,8 4,13" fill="currentColor" />
//                 </svg>
//               </a>

//               <a
//                 href="#about"
//                 className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-[10px] tracking-[0.22em] uppercase px-8 py-[14px] hover:border-[#F5C518] hover:text-[#F5C518] transition-all duration-300"
//                 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
//               >
//                 Our Story
//               </a>
//             </div>

//             {/* Meta badges */}
//             <div
//               className="fade-up fade-up-4 flex flex-wrap items-center gap-3 text-[9px] tracking-[0.18em] text-[#3d3d3d] uppercase"
//               style={{ fontFamily: 'Inter, sans-serif' }}
//             >
//               <span className="text-[#F5C518] text-[11px]">✦</span>
//               <span>Award-Winning Production</span>
//               <span className="text-[#F5C518] text-[11px]">✦</span>
//               <span>Dubai · Mumbai · Global</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* ── Scroll indicator ────────────────────────────── */}
//       <div
//         className="fade-in fade-in-1 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
//         aria-hidden="true"
//       >
//         <span
//           className="text-[8px] tracking-[0.35em] text-[#3d3d3d] uppercase"
//           style={{ fontFamily: 'Inter, sans-serif' }}
//         >
//           Scroll
//         </span>
//         <div
//           className="hero-scroll-dot w-px h-10 origin-top"
//           style={{ background: 'linear-gradient(to bottom, #F5C518, transparent)' }}
//         />
//       </div>
//     </section>
//   );
// }






'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  gold: boolean;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgScale   = useTransform(scrollYProgress, [0, 1],    [1, 1.18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const textY     = useTransform(scrollYProgress, [0, 1],    [0, 120]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.5],  [0.52, 0.82]);

  // GSAP pulse on scroll indicator
  useEffect(() => {
    gsap.to('.hero-scroll-dot', {
      scaleY: 0.2, opacity: 0.15,
      yoyo: true, repeat: -1,
      duration: 1.6, ease: 'sine.inOut',
    });
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: 65 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.35,
      vy:      -(Math.random() * 0.55 + 0.15),
      size:    Math.random() * 2.2 + 0.4,
      opacity: Math.random() * 0.55 + 0.08,
      gold:    Math.random() > 0.68,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4)           { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(245,197,24,${p.opacity})`
          : `rgba(255,255,255,${p.opacity * 0.45})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      <BackgroundRippleEffect />
      {/* ── Background image ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{
          background: [
            'radial-gradient(ellipse 75% 60% at 72% 48%, rgba(245,197,24,0.07) 0%, transparent 55%)',
            'radial-gradient(ellipse 45% 75% at 80% 35%, rgba(160,105,0,0.13) 0%, transparent 52%)',
          ].join(', '),
        }} />
      </motion.div>

      {/* ── Dark vignette ────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOp,
          background: 'linear-gradient(108deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.30) 100%)',
        }}
      />

      {/* ── Particle canvas ──────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: 'screen' }}
        aria-hidden="true"
      />

      {/* ── Ripple grid (z-3, above particles, below content z-10) ── */}

      {/* ── Scan line ────────────────────────────────────── */}
      <div className="absolute inset-x-0 h-px pointer-events-none" style={{
        top: '50%', zIndex: 2,
        background: 'linear-gradient(to right, transparent, rgba(245,197,24,0.08), transparent)',
      }} aria-hidden="true" />

      {/* ── Corner glows ─────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ zIndex: 2,
        background: 'radial-gradient(ellipse at 100% 0%, rgba(245,197,24,0.06) 0%, transparent 60%)' }} aria-hidden="true" />

      {/* ── Main content ─────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 flex-1 flex flex-col"
        style={{ y: textY, paddingTop: '9rem', paddingBottom: '6rem' }}
      >
        {/*
          60 / 40 split.
          Left (60%): headline + stats — vertically centered.
          Right (40%): desc + CTAs — pushed toward bottom-right (self-end + justify-end).
        */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-0 flex-1">

          {/* ── LEFT 60% — headline ─────────────────────── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <div className="fade-up fade-up-1 flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[#F5C518]" />
              <span className="text-[10px] tracking-[0.38em] text-[#F5C518] uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                A Creative &amp; Production Company
              </span>
            </div>

            {/* Stacked headline */}
            <div className="overflow-hidden mb-[3px]">
              <h1 className="font-impact line-reveal line-reveal-1 text-white leading-[0.87]"
                style={{ fontSize: 'clamp(3.8rem,8vw,8rem)' }}>
                WE BUILD
              </h1>
            </div>
            <div className="overflow-hidden mb-[3px]">
              <p className="font-impact line-reveal line-reveal-2 text-gold-gradient leading-[0.87]"
                style={{ fontSize: 'clamp(3.8rem,8vw,8rem)' }} aria-label="CINEMATIC">
                CINEMATIC
              </p>
            </div>
            <div className="overflow-hidden mb-14">
              <p className="font-impact line-reveal line-reveal-3 text-white leading-[0.87]"
                style={{ fontSize: 'clamp(3.8rem,8vw,8rem)' }}>
                WORLDS.
              </p>
            </div>

            {/* Stats */}
            <div className="fade-up fade-up-2 flex gap-10">
              {([['200+', 'Projects'], ['50+', 'Brands'], ['8+', 'Years']] as const).map(([n, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="font-impact text-[#F5C518] text-3xl md:text-[2.2rem] leading-none">{n}</span>
                  <span className="text-[9px] tracking-[0.22em] text-[#555] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT 40% — desc + CTAs (bottom-right aligned) ── */}
          <div className="fade-up fade-up-3 flex flex-col justify-end items-start lg:items-end pb-4 lg:pl-10">

            {/* Subtle vertical rule on desktop */}
            <div className="hidden lg:block w-px self-stretch mb-8 ml-0 mr-0"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />

            <div className="lg:max-w-[300px] w-full">
              <p className="text-[#888] text-[14px] md:text-[15px] leading-[1.85] mb-8"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                From concept to final frame — commercials, campaigns, VFX,
                AI and brand storytelling{' '}
                <em className="not-italic text-[#ccc] font-[400]">
                  engineered to be unforgettable.
                </em>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mb-8">
                <a
                  href="https://www.instagram.com/ad_venture_advertisement?igsh=MXJ3cGE1dnpyb3g2Nw=="
                  className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-[#F5C518] text-black text-[10px] tracking-[0.22em] uppercase px-7 py-[13px] font-[700] hover:bg-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="relative z-10">View the Reel</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <polygon points="4,3 13,8 4,13" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-[10px] tracking-[0.22em] uppercase px-7 py-[13px] hover:border-[#F5C518] hover:text-[#F5C518] transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Our Story
                </a>
              </div>

              {/* Meta */}
              <div className="fade-up fade-up-4 flex flex-wrap items-center gap-2 text-[9px] tracking-[0.18em] text-[#333] uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#F5C518]">✦</span>
                <span>Award-Winning</span>
                <span className="text-[#F5C518]">✦</span>
                <span>Dubai · Mumbai · Global</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div className="fade-in fade-in-1 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true">
        <span className="text-[8px] tracking-[0.35em] text-[#333] uppercase"
          style={{ fontFamily: 'Inter, sans-serif' }}>Scroll</span>
        <div className="hero-scroll-dot w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom, #F5C518, transparent)' }} />
      </div>
    </section>
  );
}