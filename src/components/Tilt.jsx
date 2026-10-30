import { useRef } from 'react';

const canTilt = () => window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

// A card that leans slightly toward the pointer. Desktop only.
export default function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-py * max}deg`);
    el.style.setProperty('--ry', `${px * max}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}