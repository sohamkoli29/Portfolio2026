import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { FOCUS, sceneState } from './sceneState.js';

// Places a set of objects at a camera stop. The group grows in when the camera is near
// and is hidden when far away, so the GPU only draws what is close.
export default function StopGroup({ index, layout, children }) {
  const ref = useRef(null);
  const focus = FOCUS[index];

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const near = Math.abs(sceneState.t - index) < 1.1;
    const s = MathUtils.damp(g.scale.x, near ? layout.scale : 0.001, 4, dt);
    g.scale.setScalar(s);
    g.visible = s > 0.02;
  });

  return (
    <group ref={ref} position={[focus[0] + layout.x, focus[1] + layout.y, focus[2]]} scale={0.001} visible={false}>
      {children}
    </group>
  );
}