import { Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../content/defaults.js';
import { useSiteReady } from '../state/siteReady.js';
import ErrorBoundary from './ErrorBoundary.jsx';
import Loader from './Loader.jsx';
import Nav from './Nav.jsx';
import ScrollProgress from './ScrollProgress.jsx';

// The 3D layer is a separate chunk, loaded after the page content so text appears first.
const SceneRoot = lazy(() => import('../three/SceneRoot.jsx'));

export default function Layout() {
  const { pathname, hash } = useLocation();
  const siteReady = useSiteReady();
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTimerDone(true), 300);
    return () => clearTimeout(id);
  }, []);

  // Scroll to the section named in the URL hash, or to the top on a new page.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <ScrollProgress />
      {pathname === '/' && <Loader />}
      {timerDone && siteReady && pathname === '/' && (
        // If the 3D layer ever fails, the rest of the site keeps working.
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <SceneRoot />
          </Suspense>
        </ErrorBoundary>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:text-porcelain focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <footer className="border-t border-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-soft">
          <p>© {new Date().getFullYear()} Soham Koli</p>
          <ul className="flex gap-5">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}