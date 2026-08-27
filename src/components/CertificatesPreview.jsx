import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const CertificatesPreview = () => {
  const { certificates = [], isLoading } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const featured = certificates.filter(c => c.featured).slice(0, 4);
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const Card = ({ cert }) => (
    <div className="dark-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => setSelected(cert)}>
      <div style={{ height: '120px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {cert.image_url ? (
          <img src={cert.image_url} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Award size={36} color="rgba(139,92,246,0.3)" />
        )}
        {cert.featured && (
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', background: 'linear-gradient(135deg,#f59e0b,#f97316)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={13} color="white" />
          </div>
        )}
      </div>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.88rem', lineHeight: 1.4, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {cert.title}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#8b5cf6', fontSize: '0.75rem', marginBottom: '4px' }}>
        <BookOpen size={10} /> <span style={{ fontWeight: 500 }}>{cert.issuer}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#524f6e', fontSize: '0.72rem', marginBottom: '10px' }}>
        <Calendar size={10} /> Issued {formatDate(cert.issue_date)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        {cert.verification_url ? (
          <a href={cert.verification_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ color: '#8b5cf6', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <ExternalLink size={10} /> Verify
          </a>
        ) : <div />}
        <span style={{ color: '#7c3aed', fontSize: '0.72rem', fontWeight: 500 }}>View →</span>
      </div>
    </div>
  );

  if (isLoading && certificates.length === 0) {
    return (
      <Section id="certificates" title="Certifications" dark>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="certificates" title="Certifications" subtitle="Professional credentials and certifications" dark>
        {featured.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }} className="cert-grid">
              {featured.map(c => <Card key={c.id} cert={c} />)}
            </div>
            {certificates.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={() => setShowAll(true)} className="btn-primary">View All {certificates.length} Certificates</button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#524f6e' }}>
            <Award size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Certificates will appear once added to the CMS.</p>
          </div>
        )}
      </Section>

            {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.title} size="md" zIndex={110}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {selected.image_url && <img src={selected.image_url} alt={selected.title} style={{ width: '100%', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.2)' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <BookOpen size={15} color="#9490b5" />
                <div><p style={{ color: '#524f6e', fontSize: '0.72rem', marginBottom: '2px' }}>Issued By</p><p style={{ color: '#c4b5fd', fontWeight: 600 }}>{selected.issuer}</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Calendar size={15} color="#9490b5" />
                <div><p style={{ color: '#524f6e', fontSize: '0.72rem', marginBottom: '2px' }}>Issue Date</p><p style={{ color: '#c4b5fd', fontWeight: 600 }}>{formatDate(selected.issue_date)}</p></div>
              </div>
              {selected.credential_id && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={15} color="#9490b5" />
                  <div><p style={{ color: '#524f6e', fontSize: '0.72rem', marginBottom: '2px' }}>Credential ID</p><code style={{ color: '#c4b5fd', background: 'rgba(124,58,237,0.1)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>{selected.credential_id}</code></div>
                </div>
              )}
            </div>
            {selected.description && <p style={{ color: '#9490b5', lineHeight: 1.7, fontSize: '0.9rem' }}>{selected.description}</p>}
            {selected.verification_url && (
              <a href={selected.verification_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ExternalLink size={14} /> Verify Certificate
              </a>
            )}
          </div>
        </Modal>
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title={`All Certificates (${certificates.length})`} size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {certificates.map(c => <Card key={c.id} cert={c} />)}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 900px) { .cert-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 500px) { .cert-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default CertificatesPreview;
