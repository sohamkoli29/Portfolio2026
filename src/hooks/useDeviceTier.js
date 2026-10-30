import { useMemo } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

// 'low'    -> no 3D scene, simple fades only
// 'medium' -> 3D scene with fewer objects, no heavy effects
// 'high'   -> full scene
export function useDeviceTier() {
  const reduced = useReducedMotion();
  return useMemo(() => {
    if (reduced) return 'low';
    const nav = navigator;
    if (nav.connection?.saveData) return 'low';
    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (cores <= 2 || memory <= 2) return 'low';
    if (coarse || cores <= 4 || memory <= 4) return 'medium';
    return 'high';
  }, [reduced]);
}