import { useEffect, useState } from 'react';
import { useAbout } from '../api/queries.js';
import { isSiteReady, markSiteReady, useSiteReady } from '../state/siteReady.js';

const MIN_MS = 900; // never flash: show at least this long
const SLOW_MS = 6000; // after this, explain that the server is waking up
const MAX_MS = 15000; // after this, show the page anyway (sections show their own loading states)

// Opening screen. Waits for the profile data, then fades away and lets the hero animate in.
export default function Loader() {
  const ready = useSiteReady();
  const about = useAbout();
  const [needed] = useState(() => !isSiteReady());
  const [minDone, setMinDone] = useState(false);
  const [slow, setSlow] = useState(false);
  const [maxDone, setMaxDone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const settled = about.isSuccess || about.isError;

  useEffect(() => {
    if (!needed) return undefined;
    const ids = [
      setTimeout(() => setMinDone(true), MIN_MS),
      setTimeout(() => setSlow(true), SLOW_MS),
      setTimeout(() => setMaxDone(true), MAX_MS),
    ];
    return () => ids.forEach(clearTimeout);
  }, [needed]);

  useEffect(() => {
    if (needed && ((minDone && settled) || maxDone)) markSiteReady();
  }, [needed, minDone, settled, maxDone]);

  useEffect(() => {
    if (!needed || !ready) return undefined;
    const id = setTimeout(() => setRemoved(true), 800);
    return () => clearTimeout(id);
  }, [needed, ready]);

  if (!needed || removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[60] grid place-items-center bg-porcelain transition-opacity duration-700 ${ready ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div className="w-64 text-center">
        <p className="font-display text-5xl">SK</p>
        <div className="mt-6 h-0.5 overflow-hidden rounded-full bg-sand">
          <div className="loader-bar h-full w-1/2 rounded-full bg-marigold" />
        </div>
        <p className="mt-5 min-h-12 text-sm text-ink-soft">
          {slow ? 'Waking up the server. The first visit can take up to a minute.' : 'Loading'}
        </p>
      </div>
    </div>
  );
}