'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
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
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-14 transition-[height] duration-300 py-4"
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
            <div className="relative w-25 h-20 md:w-30 md:h-20 flex-shrink-0">
              <Image src="/logo.png" alt="AD VENTURE logo" fill sizes="44px" className="object-contain" />
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
