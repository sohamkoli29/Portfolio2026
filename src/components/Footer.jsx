import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';

const Footer = () => {
  const socials = [
    { icon: Github, href: 'https://github.com/sohamkoli29', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@portfolio.com', label: 'Email' },
  ];

  const links = [
    { name: 'Services', href: '#services' },
    { name: 'Works', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer style={{ borderTop: '1px solid rgba(124,58,237,0.15)', background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }} className="footer-grid">
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={18} color="white" />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1.1rem' }}>
                Soham <span style={{ color: '#8b5cf6' }}>Koli</span>
              </span>
            </div>
            <p style={{ color: '#524f6e', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Full-stack developer crafting digital experiences with modern technologies. Open to new opportunities.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.25rem' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9490b5', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.color = '#c4b5fd'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#9490b5'; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.9rem', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map(l => (
                <li key={l.name}>
                  <a href={l.href} style={{ color: '#524f6e', fontSize: '0.83rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#9490b5'}
                    onMouseLeave={e => e.target.style.color = '#524f6e'}
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.9rem', marginBottom: '1rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Full Stack Dev', 'UI/UX Design', 'Mobile Apps', 'API Integration', 'Database Design'].map(s => (
                <li key={s} style={{ color: '#524f6e', fontSize: '0.83rem' }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(124,58,237,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ color: '#524f6e', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Soham Koli. All rights reserved.
          </p>
          <p style={{ color: '#524f6e', fontSize: '0.78rem' }}>
            Built with React, Tailwind CSS & Custom CMS
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
};

export default Footer;
