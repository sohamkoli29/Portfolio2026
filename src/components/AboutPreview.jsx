import React, { useState } from 'react';
import { Mail, MapPin, Phone, Download, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const AboutPreview = () => {
  const { about, isLoading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Section id="about" title="About Me" subtitle="A little about who I am and what drives me">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3.5rem', alignItems: 'center' }}>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div className="about-img" style={{ width: '100%', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(236,72,153,0.1))', border: '1px solid rgba(124,58,237,0.25)', position: 'relative' }}>
              {about?.image_url
                ? <img src={about.image_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={72} color="rgba(139,92,246,0.25)" /></div>
              }
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 60%)', pointerEvents: 'none' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-14px', right: '-14px', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius: '14px', padding: '0.85rem 1rem', boxShadow: '0 12px 32px rgba(124,58,237,0.4)' }}>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'white', lineHeight: 1 }}>2+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.68rem', marginTop: '2px' }}>Years Exp</div>
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '0.4rem' }}>Who I Am</p>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(1.2rem,3vw,1.5rem)', color: '#f1f0ff', lineHeight: 1.25 }}>
                {about?.title || 'Full Stack Developer & Tech Enthusiast'}
              </h3>
            </div>
            <p style={{ color: '#9490b5', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {about?.description?.substring(0, 280) || 'Passionate full-stack developer with experience building modern web applications. Specialized in React, Node.js, and cloud technologies.'}
              {(about?.description?.length || 0) > 280 ? '...' : ''}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {about?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', background: 'rgba(124,58,237,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Mail size={13} color="#8b5cf6" /></div>
                  <span style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>{about.email}</span>
                </div>
              )}
              {about?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', background: 'rgba(124,58,237,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Phone size={13} color="#8b5cf6" /></div>
                  <span style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>{about.phone}</span>
                </div>
              )}
              {about?.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', background: 'rgba(124,58,237,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={13} color="#8b5cf6" /></div>
                  <span style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>{about.location}</span>
                </div>
              )}
            </div>
            <div className="btn-stack" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary">Read Full Bio</button>
              {about?.cv_url && (
                <a href={about.cv_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={13} /> Download CV
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="About Me" size="lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {about?.image_url && <img src={about.image_url} alt="Profile" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(124,58,237,0.4)' }} />}
            <div>
              <h4 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1.1rem', marginBottom: '4px' }}>{about?.title}</h4>
              {about?.email && <p style={{ color: '#9490b5', fontSize: '0.85rem' }}>{about.email}</p>}
            </div>
          </div>
          <p style={{ color: '#9490b5', lineHeight: 1.9, whiteSpace: 'pre-line' }}>{about?.description || 'Passionate full-stack developer.'}</p>
          {about?.cv_url && (
            <a href={about.cv_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Download size={13} /> Download Full CV
            </a>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AboutPreview;
