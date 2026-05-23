'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.4,          // was 1.35 — much snappier now
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic ease-out, feels natural
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,   // slightly faster wheel response
      touchMultiplier: 1.5,   // responsive on touch/trackpad
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}