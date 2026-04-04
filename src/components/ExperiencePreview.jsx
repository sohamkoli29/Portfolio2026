import React, { useMemo, useState } from 'react';
import { Building, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';

/* Single timeline card with collapsible description */
const ExpCard = ({ exp, formatDate }) => {
  const [expanded, setExpanded] = useState(false);
  const hasDesc = exp.description && exp.description.trim().length > 0;
  const isLong  = hasDesc && exp.description.trim().length > 120;

  return (
    <div style={{ position: 'relative' }}>
      {/* Dot */}
      <div style={{
        position: 'absolute', left: '-2.4rem', top: '6px',
        width: '12px', height: '12px', borderRadius: '50%',
        background: exp.current
          ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
          : '#524f6e',
        border: '2px solid var(--bg-primary)',
        boxShadow: exp.current ? '0 0 12px rgba(124,58,237,0.6)' : 'none',
        zIndex: 1,
      }} />

      {/* Date row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.05em' }}>
          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
        </span>
        {exp.current && (
          <span style={{
            background: 'rgba(124,58,237,0.15)', color: '#a78bfa',
            fontSize: '0.62rem', padding: '2px 8px', borderRadius: '99px',
            border: '1px solid rgba(124,58,237,0.25)',
          }}>
            Current
          </span>
        )}
      </div>

      {/* Title */}
      <h4 style={{
        fontFamily: 'Syne,sans-serif', fontWeight: 700,
        color: '#f1f0ff', fontSize: '1rem', margin: '0 0 5px',
      }}>
        {exp.position}
      </h4>

      {/* Company / location */}
      <div style={{ display: 'flex', gap: '12px', color: '#9490b5', fontSize: '0.8rem', marginBottom: '10px', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Building size={11} /> {exp.company}
        </span>
        {exp.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} /> {exp.location}
          </span>
        )}
      </div>

      {/* Description + Read More */}
      {hasDesc && (
        <div style={{ marginBottom: '10px' }}>
          <p style={{
            color: '#9490b5', fontSize: '0.82rem', lineHeight: 1.75, margin: 0,
            /* clamp to 3 lines when collapsed */
            display:              !isLong || expanded ? 'block'    : '-webkit-box',
            WebkitLineClamp:      !isLong || expanded ? 'unset'    : 2,
            WebkitBoxOrient:      'vertical',
            overflow:             !isLong || expanded ? 'visible'  : 'hidden',
          }}>
            {exp.description}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded(v => !v)}
              style={{
                marginTop: '8px',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.22)',
                borderRadius: '7px', padding: '5px 12px',
                color: '#a78bfa', fontSize: '0.72rem', fontWeight: 600,
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
            >
              {expanded
                ? <><ChevronUp  size={12} /> Show Less</>
                : <><ChevronDown size={12} /> Read More</>}
            </button>
          )}
        </div>
      )}

      {/* Tech tags */}
      {exp.technologies?.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {exp.technologies.slice(0, 5).map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
          {exp.technologies.length > 5 && (
            <span className="tech-tag">+{exp.technologies.length - 5}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────── */

const ExperiencePreview = () => {
  const { experiences, isLoading } = usePortfolio();

  const sorted = useMemo(() => (
    [...experiences]
      .sort((a, b) => {
        if (a.current !== b.current) return b.current - a.current;
        return new Date(b.start_date) - new Date(a.start_date);
      })
      .slice(0, 4)
  ), [experiences]);

  const formatDate = (d) => {
    if (!d) return 'Present';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (isLoading && experiences.length === 0) {
    return (
      <Section id="experience" title="My Experience">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ height: '140px', borderRadius: '12px' }} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section id="experience" title="My Experience" subtitle="Professional journey and career milestones">
      <div
        className="exp-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}
      >
        {/* ── LEFT: timeline ── */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div className="timeline-line" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {sorted.length > 0
              ? sorted.map(exp => <ExpCard key={exp.id} exp={exp} formatDate={formatDate} />)
              : <p style={{ color: '#524f6e', fontSize: '0.9rem' }}>Experience will be displayed once added to the CMS.</p>
            }
          </div>
        </div>

        {/* ── RIGHT: education ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ marginBottom: '4px' }}>
            <p className="section-label" style={{ marginBottom: '6px' }}>Education</p>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1.4rem', margin: 0 }}>
              My Education
            </h3>
          </div>

          {[
            {
              period: "2023 — 2027",
              title: "B.E. Computer Engineering",
              org: "University",
              type: "degree",
            },
            {
              period: "2021 — 2023",
              title: "Higher Secondary ( 11th - 12th )",
              org: "Rcf School & Junior College, Kurul-Alibaug",
              type: "education",
            },
            {
              period: "2010 — 2021",
              title: "Secondary School ( 1st - 10th )",
              org: "David English Medium School, Chondhi-Alibaug",
              type: "education",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(124,58,237,0.12)',
                borderRadius: '12px', padding: '1rem 1.25rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.12)'}
            >
              <div style={{
                width: '34px', height: '34px', flexShrink: 0,
                background: 'rgba(124,58,237,0.12)', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
              }}>
                {item.type === 'degree' ? '🎓' : '📜'}
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 600, marginBottom: '3px', letterSpacing: '0.05em' }}>
                  {item.period}
                </p>
                <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.9rem', marginBottom: '2px' }}>
                  {item.title}
                </p>
                <p style={{ color: '#9490b5', fontSize: '0.78rem', margin: 0 }}>{item.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </Section>
  );
};

export default ExperiencePreview;

