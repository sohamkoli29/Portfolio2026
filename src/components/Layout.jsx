import { Link, Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../content/defaults.js';
import ScrollProgress from './ScrollProgress.jsx';

// The 3D layer is a separate chunk, loaded after the page content so text appears first.
const SceneRoot = lazy(() => import('../three/SceneRoot.jsx'));

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#skills', label: 'Skills' },
  { to: '/#experience', label: 'Experience' },
  { to: '/blog', label: 'Writing' },
  { to: '/#contact', label: 'Contact' },
];

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSceneReady(true), 300);
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
      {sceneReady && pathname === '/' && (
        <Suspense fallback={null}>
          <SceneRoot />
        </Suspense>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:text-porcelain focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 bg-porcelain/85 backdrop-blur border-b border-sand">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main">
          <Link to="/" className="font-display text-lg font-semibold">Soham Koli</Link>
          <ul className="flex gap-6 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
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