import { useImageTexture } from './useImageTexture.js';

// A picture on the front of a 3D card. 'cover' fills the card (cropping), 'contain' shows the whole image.
export default function ImagePlane({ url, width, height, fit = 'cover', z = 0.045 }) {
  const texture = useImageTexture(url, fit === 'cover' ? width / height : undefined);
  if (!texture) return null;

  let w = width;
  let h = height;
  if (fit === 'contain') {
    const ia = texture.image.width / texture.image.height;
    if (ia > width / height) h = width / ia;
    else w = height * ia;
  }
  return (
    <mesh position={[0, 0, z]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}