import React from 'react';
import { ArrowRight, Github, Linkedin, Mail,Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { projects, skills, experiences, about, isLoading } = usePortfolio();

  const stats = [
    { value: experiences.length ? `${experiences.length}+` : '2+', label: 'Years of\nExperience' },
    { value: projects.length ? `${projects.length}+` : '10+', label: 'Projects\nCompleted' },
   
    { value: skills.length ? `${skills.length}+` : '20+', label: 'Technologies\nMastered' },
  ];

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="glow-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', top: '-100px', right: '-100px' }} />
      <div className="glow-orb" style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', bottom: '-50px', left: '10%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {about?.email && (
              <div className="hero-email-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '99px', padding: '6px 14px', width: 'fit-content' }}>
                <Mail size={12} color="#8b5cf6" />
                <span style={{ fontSize: '0.78rem', color: '#c4b5fd', fontWeight: 500 }}>{about.email}</span>
              </div>
            )}

            <div>
              <p style={{ color: '#9490b5', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                I am {about?.title?.split(' ')[0] || 'Soham'}
              </p>
              <h1 className="hero-title" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, color: '#f1f0ff' }}>
                Web Developer<br />
                <span className="accent-text">+ Full Stack</span><br />
                <span style={{ color: '#9490b5' }}>Engineer</span>
              </h1>
            </div>

            <p style={{ color: '#9490b5', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '460px' }}>
              {about?.description?.substring(0, 160) || 'Building modern, scalable web applications with cutting-edge technologies. Passionate about clean code and exceptional user experiences.'}
              {(about?.description?.length || 0) > 160 ? '...' : ''}
            </p>

            <div className="btn-stack" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                View Works <ArrowRight size={14} />
              </a>
          {about?.cv_url && (
                          <a href={about.cv_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <Download size={13} /> Download CV
                          </a>
                        )}
            </div>

            <div className="hero-socials" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {[
                { icon: Github, href: 'https://github.com/sohamkoli29' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/soham029/' },
                ,
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9490b5', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.color = '#c4b5fd'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9490b5'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div className="hero-avatar" style={{ position: 'relative', width: '300px', height: '380px', background: 'linear-gradient(145deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1))', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {about?.image_url ? (
                <img src={about.image_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>
                  SK
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,15,0.7))', pointerEvents: 'none' }} />
            </div>

            <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '300px' }}>
              {stats.map((stat, i) => (
                <div key={i} className="stat-badge" style={{ textAlign: 'center' }}>
                  <div className="stat-val" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#f1f0ff', lineHeight: 1 }}>
                    {isLoading ? <div className="skeleton" style={{ height: '1.75rem', borderRadius: '6px', width: '60%', margin: '0 auto' }} /> : stat.value}
                  </div>
                  <div style={{ color: '#9490b5', fontSize: '0.68rem', marginTop: '4px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
