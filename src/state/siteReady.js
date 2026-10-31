import { useSyncExternalStore } from 'react';

// Tracks whether the opening loader has finished. The loader only shows on the first
// visit to the home page in a browser session; otherwise the site is "ready" immediately.
const KEY = 'portfolio-loaded';

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

let ready = typeof window === 'undefined' || window.location.pathname !== '/' || alreadySeen();
const listeners = new Set();

export const isSiteReady = () => ready;

export function markSiteReady() {
  if (ready) return;
  ready = true;
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: the loader will simply show again next visit */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useSiteReady = () => useSyncExternalStore(subscribe, () => ready, () => true);