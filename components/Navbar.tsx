'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const NAV_LINKS = [

  { label: 'About',    href: '#about'    },
  {label: 'Founders', href: '#founders' },
  { label: 'Work',     href: '#work'     },
  { label: 'Services', href: '#services' },
  { label: 'Studio',   href: '#studio'   },
  { label: 'Contact',  href: '#contact'  },
] as const;

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 50));

  /* GSAP stagger entrance for desktop links */
  useEffect(() => {
    gsap.fromTo(
      linksRef.current,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, delay: 1.1, duration: 0.55, ease: 'power3.out' },
    );
  }, []);

  return (
    <>
      {/* ── Main bar ───────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-14 transition-[height] duration-300 py-6"
        style={{ height: scrolled ? 64 : 80 }}
        animate={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0)',
          backdropFilter:   scrolled ? 'blur(18px)'        : 'blur(0px)',
          borderBottomColor: scrolled
            ? 'rgba(245,197,24,0.12)'
            : 'rgba(245,197,24,0)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center gap-3 group" aria-label="AD VENTURE Home">
            {/* Logo image */}
            <div className="relative w-16 h-12 md:w-20 md:h-20 flex-shrink-0">
              <Image src="/logo-2.png" alt="AD VENTURE logo" fill sizes="44px" className="object-contain" />
            </div>
            {/* <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#F5C518" />
                    <stop offset="100%" stopColor="#C9A227" />
                  </linearGradient>
                </defs>
                
                <path d="M4 40L14.5 9h3L7 40H4z"              fill="url(#lg)" />
                <path d="M14.5 9h3l10.5 31h-3.5L14.5 9z"      fill="url(#lg)" opacity="0.6" />
                <path d="M7.5 27h14v3h-14z"                    fill="url(#lg)" />
          
                <rect x="26" y="9" width="3" height="31" rx="1" fill="url(#lg)" />
                <path
                  d="M29 9c8.5 0 14 4.5 14 15.5S37.5 40 29 40"
                  stroke="url(#lg)" strokeWidth="3"
                  fill="none" strokeLinecap="round"
                />
              </svg>
            </div> */}

            <div className="flex flex-col leading-none">
              <span className="font-impact text-white text-[18px] tracking-[0.18em] group-hover:text-[#F5C518] transition-colors duration-300">
                AD VENTURE
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#F5C518] uppercase font-light mt-[2px]"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                Productions
              </span>
            </div>


          </Link>

        </motion.div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              className="relative text-[10px] tracking-[0.22em] uppercase text-[#888] hover:text-white transition-colors duration-300 group"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {label}
              <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-[#F5C518] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <Link
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2 border border-[#F5C518] text-[#F5C518] text-[10px] tracking-[0.22em] uppercase px-5 py-[11px] font-semibold hover:bg-[#F5C518] hover:text-black transition-all duration-300 group"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start a Project
            <svg
              className="w-3 h-3 group-hover:translate-x-[3px] transition-transform duration-300"
              viewBox="0 0 12 12" fill="none" aria-hidden="true"
            >
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px] z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-[1.5px] bg-white origin-center"
              style={{ width: i === 1 ? 16 : 22 }}
              animate={
                i === 0 ? { rotate: menuOpen ?  45 : 0, y: menuOpen ?  7 : 0, width: 22 }
                : i === 1 ? { opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }
                : { rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0, width: 22 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.header>

      {/* ── Mobile fullscreen menu ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            animate={{ clipPath: 'circle(170% at calc(100% - 44px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col items-center gap-9" aria-label="Mobile primary">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    className="font-impact text-[52px] text-white hover:text-[#F5C518] transition-colors tracking-wide"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="#contact"
                  className="border border-[#F5C518] text-[#F5C518] text-[11px] tracking-[0.22em] uppercase px-10 py-4 hover:bg-[#F5C518] hover:text-black transition-all duration-300 inline-block"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Start a Project →
                </Link>
              </motion.div>
            </nav>

            {/* bottom tag */}
            <motion.p
              className="absolute bottom-10 text-[10px] tracking-[0.25em] text-[#333] uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              AD VENTURE © 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
