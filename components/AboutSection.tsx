'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PILLARS = [
  {
    num: '01',
    title: 'Directing Intent',
    body: 'Defining the narrative arc and the emotional frequency of the project from the first pitch.',
  },
  {
    num: '02',
    title: 'Engineering Aesthetic',
    body: 'Applying industrial rigour to every pixel, ensuring the final output feels heavy with value.',
  },
  {
    num: '03',
    title: 'Cinematic Execution',
    body: 'Translating strategy into visuals that move people — frame by frame, cut by cut.',
  },
] as const;

const STATS = [
  { value: 120, suffix: '+', label: 'Films Delivered' },
  { value: 40,  suffix: '+', label: 'Global Brands'   },
  { value: 9,   suffix: '',  label: 'Years of Craft'  },
  { icon: '∞',  suffix: '',  label: 'Stories Ahead'   },
] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: EASE },
  }),
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el  = ref.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value, duration: 1.8, ease: 'power3.out',
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef, offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  useEffect(() => {
    const lines = sectionRef.current?.querySelectorAll('.draw-line');
    if (!lines) return;
    lines.forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: line, start: 'top 88%', once: true },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-black overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{
        background: [
          'radial-gradient(ellipse 55% 40% at 75% 35%, rgba(245,197,24,0.04) 0%, transparent 65%)',
          'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(245,197,24,0.025) 0%, transparent 60%)',
        ].join(', '),
      }} />

      {/* ── Top: content + image ─────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <motion.div className="flex items-center gap-3 mb-8"
              variants={fadeLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}>
              <div className="w-8 h-px bg-[#F5C518]" />
              <span className="text-[10px] tracking-[0.35em] text-[#F5C518] uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Our Philosophy
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-8">
              <motion.h2 className="font-impact text-white leading-[0.88] uppercase"
                style={{ fontSize: 'clamp(2.8rem,5.5vw,5.2rem)' }}
                variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}>
                The Synergy
              </motion.h2>
              <motion.p className="font-impact text-white leading-[0.88] uppercase"
                style={{ fontSize: 'clamp(2.8rem,5.5vw,5.2rem)' }}
                variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}>
                of <span className="text-gold-gradient">Craft.</span>
              </motion.p>
            </div>

            {/* Body */}
            <motion.p className="text-[#888] text-[14px] md:text-[15px] leading-[1.85] mb-10 max-w-[420px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              variants={fadeUp} custom={2} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}>
              We combine direction, design, code, and craft under one roof — so
              the creative idea you start with is the idea that ships, uncompromised.
              Our process is a relentless pursuit of visual perfection,{' '}
              <em className="not-italic text-[#bbb] font-[400]">
                balancing technical precision with artistic soul.
              </em>
            </motion.p>

            {/* Divider */}
            <div className="draw-line h-px bg-white/10 mb-10 origin-left" />

            {/* Pillars */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {PILLARS.map((p, i) => (
                <motion.div key={p.num} className="flex flex-col gap-2 group"
                  variants={fadeUp} custom={i + 3} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}>
                  <span className="font-impact text-[#F5C518] text-3xl md:text-4xl leading-none group-hover:text-white transition-colors duration-300">
                    {p.num}
                  </span>
                  <div className="w-8 h-px bg-[#F5C518]/30 group-hover:w-14 group-hover:bg-[#F5C518] transition-all duration-500" />
                  <p className="text-[10px] tracking-[0.22em] text-white uppercase mt-1"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {p.title}
                  </p>
                  <p className="text-[#666] text-[13px] leading-[1.75]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — image */}
          <motion.div className="relative" variants={fadeRight} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div className="relative" ref={imageRef}>

              {/* Gold corners */}
              <div className="absolute -top-3 -left-3 w-10 h-10 pointer-events-none z-10" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-px bg-[#F5C518]" />
                <div className="absolute top-0 left-0 h-full w-px bg-[#F5C518]" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 pointer-events-none z-10" aria-hidden="true">
                <div className="absolute bottom-0 right-0 w-full h-px bg-[#F5C518]" />
                <div className="absolute bottom-0 right-0 h-full w-px bg-[#F5C518]" />
              </div>

              {/* Image with parallax */}
              <motion.div className="relative overflow-hidden aspect-[4/3] lg:aspect-[3/3.2] w-full"
                style={{ y: imgY }}>

                {/* Wipe-in reveal mask */}
                <motion.div className="absolute inset-0 bg-black z-20 origin-right"
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] as [number,number,number,number], delay: 0.15 }} />

                <Image
                  src="/philosophy.png"
                  alt="AD VENTURE production studio — cinematic lighting setup"
                  fill
                  className="object-cover object-center grayscale contrast-110"
                />

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)',
                }} />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-5 -left-5 z-30 bg-[#0a0a0a] border border-white/10 px-5 py-4 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75, duration: 0.7, ease: EASE }}>
                <div className="flex flex-col">
                  <span className="font-impact text-[#F5C518] text-2xl leading-none">200+</span>
                  <span className="text-[9px] tracking-[0.25em] text-[#555] uppercase mt-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}>Projects</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="font-impact text-[#F5C518] text-2xl leading-none">8+</span>
                  <span className="text-[9px] tracking-[0.25em] text-[#555] uppercase mt-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}>Years</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <div ref={statsRef} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-10 lg:mx-14" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              className="flex flex-col items-center justify-center py-10 md:py-14 px-6 gap-3 group relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.10, duration: 0.7, ease: EASE }}>

              {/* Hover wash */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(245,197,24,0.04) 0%, transparent 80%)' }} />

              {/* Value */}
              <div className="font-impact text-[#F5C518] leading-none"
                style={{ fontSize: 'clamp(2.4rem,4vw,3.8rem)' }}>
                {'icon' in stat
                  ? <span>{stat.icon}</span>
                  : <Counter value={stat.value} suffix={stat.suffix} />
                }
              </div>

              {/* Label */}
              <span className="text-[9px] md:text-[10px] tracking-[0.28em] text-[#555] uppercase group-hover:text-[#888] transition-colors duration-300 text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.label}
              </span>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-1/2 bg-[#F5C518] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-10 lg:mx-14" />
    </section>
  );
}