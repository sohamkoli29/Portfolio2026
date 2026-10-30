import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { COLORS, CLAY } from './palette.js';
import { sceneState } from './sceneState.js';

// The hero object: a soft marigold knot with a small dusk-blue sphere orbiting it.
// `resting` makes it nearly still (used at the contact section).
export default function Sculpture({ resting = false, detail = 1 }) {
  const body = useRef(null);
  const moon = useRef(null);
  const k = resting ? 0 : 1;

  useFrame((state, dt) => {
    const g = body.current;
    const m = moon.current;
    if (!g || !m) return;
    const time = state.clock.elapsedTime;
    g.rotation.y += dt * 0.25 * k;
    g.rotation.x = MathUtils.damp(g.rotation.x, 0.35 - sceneState.py * 0.35 * k, 3, dt);
    g.position.y = Math.sin(time * 0.8) * 0.12 * (resting ? 0.3 : 1);
    const a = time * 0.6 * (resting ? 0.15 : 1);
    m.position.set(Math.cos(a) * 1.9, Math.sin(a * 0.7) * 0.5, Math.sin(a) * 1.9);
  });

  return (
    <group>
      <mesh ref={body} rotation={[0.35, 0.6, 0]}>
        <torusKnotGeometry args={[0.8, 0.3, Math.round(220 * detail), Math.round(32 * detail), 2, 3]} />
        <meshStandardMaterial color={COLORS.marigold} {...CLAY} />
      </mesh>
      <mesh ref={moon}>
        <sphereGeometry args={[0.2, 32, 24]} />
        <meshStandardMaterial color={COLORS.dusk} {...CLAY} />
      </mesh>
    </group>
  );
}