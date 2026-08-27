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
    <div className="testi-card dark-card" onClick={() => setSelected(t)}>
      <Quote size={20} style={{ color: '#7c3aed', opacity: 0.5, marginBottom: '1rem' }} />
      <p
        className="testi-content"
        style={{
          color: '#9490b5',
          lineHeight: 1.7,
          fontStyle: 'italic',
          display: '-webkit-box',
          WebkitLineClamp: compact ? 3 : 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '1.25rem',
        }}
      >
        "{t.content}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '1rem', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        {t.avatar_url ? (
          <img src={t.avatar_url} alt={t.name} className="testi-avatar" style={{ objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div className="testi-avatar" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
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
        <div className="testi-section-wrap">
          <div className="testi-grid">
            {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '200px', borderRadius: '16px' }} />)}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="testimonials" title="Client's Stories" subtitle="What clients say about working with me" dark>
        <div className="testi-section-wrap">
          {featured.length > 0 ? (
            <>
              <div className="testi-grid">
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
            <div className="testi-empty" style={{ textAlign: 'center', color: '#524f6e' }}>
              <Quote size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p>Testimonials will appear once added to the CMS.</p>
            </div>
          )}
        </div>
      </Section>

      {/* Single modal */}
      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Client Review" size="md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="testi-modal-header" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {selected.avatar_url ? (
                <img src={selected.avatar_url} alt={selected.name} className="testi-modal-avatar" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="testi-modal-avatar" style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
                  {selected.name[0]}
                </div>
              )}
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1rem', overflowWrap: 'break-word' }}>{selected.name}</p>
                <p style={{ color: '#9490b5', fontSize: '0.82rem', overflowWrap: 'break-word' }}>{selected.role}{selected.role && selected.company && ' at '}{selected.company}</p>
                <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>{renderStars(selected.rating || 5)}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '12px', padding: '1.1rem' }}>
              <Quote size={20} style={{ color: '#7c3aed', opacity: 0.4, marginBottom: '0.75rem' }} />
              <p style={{ color: '#c4b5fd', lineHeight: 1.8, fontStyle: 'italic', overflowWrap: 'break-word' }}>"{selected.content}"</p>
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title={`All Testimonials (${testimonials.length})`} size="xl">
        <div className="testi-modal-grid">
          {testimonials.map(t => <Card key={t.id} t={t} compact />)}
        </div>
      </Modal>

      <style>{`
        /* ===== Overflow safety net ===== */
        .testi-section-wrap {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        /* ===== Main featured grid ===== */
        .testi-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          width: 100%;
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .testi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .testi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        /* ===== "View All" modal grid ===== */
        .testi-modal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .testi-modal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        /* ===== Card ===== */
        .testi-card {
          padding: 1.5rem;
          cursor: pointer;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .testi-content {
          font-size: 0.88rem;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        @media (max-width: 479px) {
          .testi-card { padding: 1.1rem; }
          .testi-content { font-size: 0.84rem; }
        }

        /* ===== Avatars ===== */
        .testi-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .testi-modal-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        @media (max-width: 380px) {
          .testi-modal-avatar { width: 48px; height: 48px; }
        }

        /* ===== Empty state ===== */
        .testi-empty { padding: 4rem 1rem; }
        @media (max-width: 479px) {
          .testi-empty { padding: 2.5rem 1rem; }
        }

        @media (max-width: 479px) {
          .testi-modal-header p { font-size: 0.9rem !important; }
        }
      `}</style>
    </>
  );
};

export default TestimonialsPreview;