import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { FOCUS, readStopT, sceneState } from './sceneState.js';

const OFFSET = [0, 0.35, 7]; // camera position relative to the point it looks at
const smooth = (x) => x * x * (3 - 2 * x); // gives each stop a short "rest" before moving on

// Moves the camera through the scene as the page scrolls.
export default function CameraRig() {
  const look = useRef({ x: FOCUS[0][0], y: FOCUS[0][1], z: FOCUS[0][2] }); // smoothed look-at point

  useFrame((state, dt) => {
    const t = readStopT();
    sceneState.t = t;

    const i = Math.min(Math.floor(t), FOCUS.length - 2);
    const f = smooth(MathUtils.clamp(t - i, 0, 1));
    const a = FOCUS[i];
    const b = FOCUS[i + 1];
    const tx = MathUtils.lerp(a[0], b[0], f);
    const ty = MathUtils.lerp(a[1], b[1], f);
    const tz = MathUtils.lerp(a[2], b[2], f);

    const cam = state.camera;
    // damp() eases toward the target, so the camera glides instead of snapping
    cam.position.x = MathUtils.damp(cam.position.x, tx + OFFSET[0] + sceneState.px * 0.4, 3, dt);
    cam.position.y = MathUtils.damp(cam.position.y, ty + OFFSET[1] + sceneState.py * 0.2, 3, dt);
    cam.position.z = MathUtils.damp(cam.position.z, tz + OFFSET[2], 3, dt);
    const p = look.current;
    p.x = MathUtils.damp(p.x, tx, 4, dt);
    p.y = MathUtils.damp(p.y, ty, 4, dt);
    p.z = MathUtils.damp(p.z, tz, 4, dt);
    cam.lookAt(p.x, p.y, p.z);
  });

  return null;
}