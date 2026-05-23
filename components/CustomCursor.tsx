'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const mousePos    = useRef({ x: 0, y: 0 });
  const ringPos     = useRef({ x: 0, y: 0 });
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    const tick = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.10;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.10;
      ring.style.transform = `translate(${ringPos.current.x - 17}px, ${ringPos.current.y - 17}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isClickable = !!t.closest('a, button, [data-cursor="hover"]');
      if (isClickable) {
        ring.style.width  = '50px';
        ring.style.height = '50px';
        ring.style.borderColor = 'rgba(245,197,24,0.85)';
      } else {
        ring.style.width  = '34px';
        ring.style.height = '34px';
        ring.style.borderColor = 'rgba(245,197,24,0.45)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor"          aria-hidden="true" />
      <div ref={ringRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
