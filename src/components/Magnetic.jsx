import { useRef } from 'react';

const canMove = () => window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

// Wraps a button so it drifts slightly toward the pointer. Desktop only.
export default function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !canMove()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block transition-transform duration-300 ease-[var(--ease-soft)]"
    >
      {children}
    </span>
  );
}