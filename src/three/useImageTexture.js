import { useEffect, useState } from 'react';
import { TextureLoader, SRGBColorSpace } from 'three';

const loader = new TextureLoader();
loader.setCrossOrigin('anonymous'); // needed for images from another site (Supabase) to be used in WebGL

// Loads an image as a texture. Returns null until it has loaded, or for good if loading fails
// (for example if the image host does not allow cross-origin use). The 3D card then stays plain.
// Pass `coverAspect` (width / height of the card) to crop the image to fill the card.
export function useImageTexture(url, coverAspect) {
  const [state, setState] = useState({ key: '', texture: null });
  const key = `${url}|${coverAspect ?? ''}`;

  useEffect(() => {
    if (!url) return undefined;
    let cancelled = false;
    let loaded = null;
    loader.load(
      url,
      (t) => {
        if (cancelled) {
          t.dispose();
          return;
        }
        t.colorSpace = SRGBColorSpace;
        t.anisotropy = 4;
        if (coverAspect) {
          const ia = t.image.width / t.image.height;
          if (ia > coverAspect) {
            t.repeat.set(coverAspect / ia, 1);
            t.offset.set((1 - coverAspect / ia) / 2, 0);
          } else {
            t.repeat.set(1, ia / coverAspect);
            t.offset.set(0, (1 - ia / coverAspect) / 2);
          }
        }
        loaded = t;
        setState({ key, texture: t });
      },
      undefined,
      () => {},
    );
    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, [url, coverAspect, key]);

  return state.key === key ? state.texture : null;
}