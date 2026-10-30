import { useMemo } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

// A soft round shadow on the "floor". Much cheaper than real shadows and fits the minimal look.
export default function BlobShadow({ position = [0, -1.5, 0], scale = 2.8, opacity = 0.18 }) {
  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(27,26,23,1)');
    grad.addColorStop(1, 'rgba(27,26,23,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}