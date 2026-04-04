import React, { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const TestimonialsPreview = () => {
  const { testimonials, isLoading } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);

  const featured = testimonials.filter(t => t.featured).slice(0, 3);

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={12} style={{ color: i < rating ? '#f59e0b' : '#524f6e', fill: i < rating ? '#f59e0b' : 'none' }} />
  ));

  const Card = ({ t, compact = false }) => (
    <div className="dark-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => setSelected(t)}>
      <Quote size={20} style={{ color: '#7c3aed', opacity: 0.5, marginBottom: '1rem' }} />
      <p style={{ color: '#9490b5', lineHeight: 1.7, fontSize: '0.88rem', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: compact ? 3 : 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.25rem' }}>
        "{t.content}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '1rem', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        {t.avatar_url ? (
          <img src={t.avatar_url} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
            {t.name[0]}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
          <p style={{ color: '#9490b5', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t.role}{t.role && t.company && ' · '}{t.company}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>{renderStars(t.rating || 5)}</div>
      </div>
    </div>
  );

  if (isLoading && testimonials.length === 0) {
    return (
      <Section id="testimonials" title="Client Testimonials" dark>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '200px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="testimonials" title="Client's Stories" subtitle="What clients say about working with me" dark>
        {featured.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="testi-grid">
              {featured.map(t => <Card key={t.id} t={t} />)}
            </div>
            {testimonials.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={() => setShowAll(true)} className="btn-outline">
                  View All {testimonials.length} Testimonials
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#524f6e' }}>
            <Quote size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Testimonials will appear once added to the CMS.</p>
          </div>
        )}
      </Section>

      {/* Single modal */}
      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Client Review" size="md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {selected.avatar_url ? (
                <img src={selected.avatar_url} alt={selected.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
                  {selected.name[0]}
                </div>
              )}
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1rem' }}>{selected.name}</p>
                <p style={{ color: '#9490b5', fontSize: '0.82rem' }}>{selected.role}{selected.role && selected.company && ' at '}{selected.company}</p>
                <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>{renderStars(selected.rating || 5)}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '12px', padding: '1.25rem' }}>
              <Quote size={20} style={{ color: '#7c3aed', opacity: 0.4, marginBottom: '0.75rem' }} />
              <p style={{ color: '#c4b5fd', lineHeight: 1.8, fontStyle: 'italic' }}>"{selected.content}"</p>
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title={`All Testimonials (${testimonials.length})`} size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {testimonials.map(t => <Card key={t.id} t={t} compact />)}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 768px) { .testi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) and (min-width: 600px) { .testi-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
};

export default TestimonialsPreview;
