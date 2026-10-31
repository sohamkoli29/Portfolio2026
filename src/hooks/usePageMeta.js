import { useEffect } from 'react';

const SITE = 'Soham Koli';

// Sets the browser tab title and meta description for a page, and restores them when leaving.
export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute('content');
    if (title) document.title = `${title} · ${SITE}`;
    if (description && meta) meta.setAttribute('content', description.slice(0, 160));
    return () => {
      document.title = prevTitle;
      if (meta && prevDescription != null) meta.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}