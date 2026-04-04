import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { about } = usePortfolio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Works', href: '#projects' },
    { name: 'About', href: '#about' },
     { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
   
  ];

  const handleCVDownload = () => {
    if (about?.cv_url) window.open(about.cv_url, '_blank');
    else window.location.href = '#contact';
  };

  const linkStyle = { color: '#9490b5', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, transition: 'all 0.3s ease', background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Code2 size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f0ff' }}>
                Soham <span style={{ color: '#8b5cf6' }}>Koli</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hide-mobile">
              {navItems.map(item => (
                <a key={item.name} href={item.href} style={linkStyle}
                  onMouseEnter={e => e.target.style.color = '#f1f0ff'}
                  onMouseLeave={e => e.target.style.color = '#9490b5'}>
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <button onClick={handleCVDownload} className="btn-primary hide-mobile" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
              <Download size={13} /> Hire Me
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#f1f0ff' }} className="show-mobile">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 49, background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(124,58,237,0.15)', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '0.25rem', overflowY: 'auto' }}>
          {navItems.map(item => (
            <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}
              style={{ color: '#9490b5', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', padding: '0.9rem 0', borderBottom: '1px solid rgba(124,58,237,0.08)', display: 'block' }}>
              {item.name}
            </a>
          ))}
          <button onClick={() => { handleCVDownload(); setIsMenuOpen(false); }} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.85rem' }}>
            <Download size={15} /> Hire Me
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
