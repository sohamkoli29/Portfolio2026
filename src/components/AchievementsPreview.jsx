import React, { useState } from 'react';
import { Trophy, Calendar, ExternalLink, Medal, Star, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const AchievementsPreview = () => {
  const { achievements = [], isLoading } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const featured = achievements.filter(a => a.featured).slice(0, 3);
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getCategoryIcon = (cat) => {
    const map = { award: Trophy, competition: Medal, publication: Star, milestone: Award, certification: Award };
    return map[cat?.toLowerCase()] || Trophy;
  };

  const getCategoryGradient = (cat) => {
    const map = {
      award: 'linear-gradient(135deg,#f59e0b,#f97316)',
      competition: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      publication: 'linear-gradient(135deg,#10b981,#06b6d4)',
      milestone: 'linear-gradient(135deg,#ec4899,#f43f5e)',
      certification: 'linear-gradient(135deg,#6366f1,#3b82f6)',
    };
    return map[cat?.toLowerCase()] || 'linear-gradient(135deg,#7c3aed,#ec4899)';
  };

  const Card = ({ ach }) => {
    const Icon = getCategoryIcon(ach.category);
    const grad = getCategoryGradient(ach.category);
    return (
      <div className="dark-card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelected(ach)}>
        <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
          {ach.image_url ? (
            <img src={ach.image_url} alt={ach.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: grad.replace('linear-gradient(135deg,', 'linear-gradient(135deg,rgba(').replace(',#', ',0.2),rgba(').replace(')', ',0.1))'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={40} color="rgba(255,255,255,0.15)" />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,19,30,0.95) 0%, transparent 60%)' }} />
          {ach.category && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: grad, color: 'white', fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', textTransform: 'capitalize' }}>
              {ach.category}
            </span>
          )}
        </div>
        <div style={{ padding: '1.1rem' }}>
          <div style={{ display: 'flex', gap: '8px', color: '#524f6e', fontSize: '0.72rem', marginBottom: '6px', alignItems: 'center' }}>
            <Calendar size={10} /> {formatDate(ach.achievement_date)}
            {ach.organization && <><span>•</span><span style={{ color: '#9490b5', fontWeight: 500 }}>{ach.organization}</span></>}
          </div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '0.95rem', lineHeight: 1.35, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {ach.title}
          </h3>
          <p style={{ color: '#9490b5', fontSize: '0.78rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {ach.description}
          </p>
        </div>
      </div>
    );
  };

  if (isLoading && achievements.length === 0) {
    return (
      <Section id="achievements" title="Achievements">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '260px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="achievements" title="Achievements & Awards" subtitle="Recognition and milestones in my professional journey">
        {featured.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="ach-grid">
              {featured.map(a => <Card key={a.id} ach={a} />)}
            </div>
            {achievements.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={() => setShowAll(true)} className="btn-outline">View All {achievements.length} Achievements</button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#524f6e' }}>
            <Trophy size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Achievements will appear once added to the CMS.</p>
          </div>
        )}
      </Section>

            {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.title} size="md" zIndex={110}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {selected.image_url && <img src={selected.image_url} alt={selected.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9490b5', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={12} /> {formatDate(selected.achievement_date)}
              </span>
              {selected.category && <span style={{ background: getCategoryGradient(selected.category), color: 'white', fontSize: '0.72rem', padding: '3px 12px', borderRadius: '99px', textTransform: 'capitalize' }}>{selected.category}</span>}
            </div>
            {selected.organization && <p style={{ color: '#c4b5fd', fontSize: '0.88rem' }}><span style={{ color: '#9490b5' }}>Organization: </span>{selected.organization}</p>}
            <p style={{ color: '#9490b5', lineHeight: 1.8 }}>{selected.description}</p>
          </div>
        </Modal>
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title={`All Achievements (${achievements.length})`} size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {achievements.map(a => <Card key={a.id} ach={a} />)}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 768px) { .ach-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) and (min-width: 600px) { .ach-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
};

export default AchievementsPreview;
