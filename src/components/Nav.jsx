import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection.js';

const ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { to: '/blog', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

// Page sections in top-to-bottom order, and which menu item each one belongs to.
const SECTION_ORDER = ['about', 'services', 'work', 'skills', 'experience', 'proof', 'contact'];
const BELONGS_TO = { about: 'about', services: 'about', work: 'work', skills: 'skills', experience: 'experience', proof: 'experience', contact: 'contact' };

function MenuLink({ item, onHome, current, onPick }) {
  const cls = `underline-offset-8 hover:underline ${current ? 'underline decoration-marigold decoration-2' : ''}`;
  const aria = current ? { 'aria-current': 'true' } : {};
  if (item.to) {
    return <Link to={item.to} onClick={onPick} className={cls} {...aria}>{item.label}</Link>;
  }
  // On the home page, plain #links let the smooth scroller glide to the section.
  if (onHome) {
    return <a href={`#${item.id}`} onClick={onPick} className={cls} {...aria}>{item.label}</a>;
  }
  return <Link to={`/#${item.id}`} onClick={onPick} className={cls} {...aria}>{item.label}</Link>;
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const onHome = pathname === '/';
  const section = useActiveSection(SECTION_ORDER, onHome);
  const currentId = onHome ? BELONGS_TO[section] : pathname.startsWith('/blog') ? 'blog' : '';

  // The menu is "open" only for the page it was opened on, so it closes by itself when you navigate.
  const here = pathname + hash;
  const [openFor, setOpenFor] = useState(null);
  const open = openFor === here;
  const button = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenFor(null);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpenFor(null);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-porcelain/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main">
        <Link to="/" className="font-display text-lg font-semibold">Soham Koli</Link>

        <ul className="hidden gap-7 text-sm md:flex">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <MenuLink item={item} onHome={onHome} current={currentId === (item.id || 'blog')} />
            </li>
          ))}
        </ul>

        <button
          ref={button}
          onClick={() => setOpenFor(open ? null : here)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="rounded-full border border-sand bg-white/60 px-4 py-1.5 text-sm md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-sand bg-porcelain px-6 pb-8 pt-4 md:hidden">
          <ul className="grid gap-5 text-2xl">
            {ITEMS.map((item) => (
              <li key={item.label}>
                <MenuLink item={item} onHome={onHome} current={currentId === (item.id || 'blog')} onPick={close} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}