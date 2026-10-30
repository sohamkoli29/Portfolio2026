import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// Inertial scrolling. Skipped for reduced-motion users.
// Phase 2 will drive the 3D camera from this instance's scroll progress.
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let frame;
    const raf = (t) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);
  return children;
}