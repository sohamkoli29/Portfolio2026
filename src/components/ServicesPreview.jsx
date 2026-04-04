import React, { useState } from 'react';
import { Code, Palette, Smartphone,Server,TrendingUp, Settings, Layout , Cloud, CheckCircle, ArrowUpRight, } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const ServicesPreview = () => {
  const { services, isLoading } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const getIcon = (name) => ({ code: Code, layout: Layout, palette: Palette, smartphone: Smartphone, cloud: Cloud }[name?.toLowerCase()] || Code);

  const defaults = [
    { id: 1, title: 'Full Stack Development', description: 'End-to-end web apps using React, Node.js, and modern databases with clean architecture.', icon: 'code', features: ['React & Next.js', 'Node.js & Express', 'REST & GraphQL APIs', 'MongoDB & PostgreSQL'] },
    { id: 2, title: 'UI/UX Design', description: 'Designing beautiful, intuitive user interfaces that convert visitors into users.', icon: 'palette', features: ['Figma Prototyping', 'Design Systems', 'Responsive Layouts', 'Accessibility'] },
    { id: 3, title: 'Mobile Development', description: 'Cross-platform mobile apps with React Native and native Android development.', icon: 'smartphone', features: ['React Native', 'Android (Java)', 'Play Store Publishing', 'AdMob Integration'] },
    { id: 4, title: 'Cloud & DevOps', description: 'Deployment, CI/CD pipelines, and cloud infrastructure management.', icon: 'cloud', features: ['Vercel & Render', 'MongoDB Atlas', 'Supabase', 'Environment Config'] },
  ];

  const display = services.length > 0 ? services.slice(0, 4) : defaults;
  const active = display[activeIndex];

  return (
    <>
      <Section id="services" title="My Quality Services" subtitle="Everything you need to launch your digital product">
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* Accordion list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {display.map((s, i) => {
              const Icon = getIcon(s.icon);
              const isActive = activeIndex === i;
              return (
                <div key={s.id || i} onClick={() => setActiveIndex(i)} style={{ background: isActive ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isActive ? 'rgba(124,58,237,0.4)' : 'rgba(124,58,237,0.1)'}`, borderRadius: '12px', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', background: isActive ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s' }}>
                    <Icon size={15} color={isActive ? 'white' : '#9490b5'} />
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: isActive ? '#f1f0ff' : '#9490b5', fontSize: '0.88rem', flex: 1 }}>{s.title}</span>
                  <ArrowUpRight size={13} color={isActive ? '#8b5cf6' : '#524f6e'} />
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {active && (() => {
            const Icon = getIcon(active.icon);
            return (
              <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '20px', padding: '1.75rem' }}>
                <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={22} color="white" />
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#f1f0ff', marginBottom: '0.75rem' }}>{active.title}</h3>
                <p style={{ color: '#9490b5', lineHeight: 1.7, fontSize: '0.88rem', marginBottom: '1.25rem' }}>{active.description}</p>
                {(active.features || []).length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
                    {(active.features || []).map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4b5fd', fontSize: '0.83rem' }}>
                        <CheckCircle size={13} color="#7c3aed" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => setSelectedService(active)} className="btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Learn More <ArrowUpRight size={13} />
                </button>
              </div>
            );
          })()}
        </div>
      </Section>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} title={selectedService.title} size="md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: '#9490b5', lineHeight: 1.8 }}>{selectedService.description}</p>
            {(selectedService.features || []).length > 0 && (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedService.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', color: '#c4b5fd', fontSize: '0.9rem' }}>
                    <CheckCircle size={14} color="#7c3aed" style={{ flexShrink: 0, marginTop: '2px' }} /> {f}
                  </li>
                ))}
              </ul>
            )}
            <a href="#contact" onClick={() => setSelectedService(null)} className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>Get a Quote</a>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ServicesPreview;
