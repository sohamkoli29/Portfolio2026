import React from 'react';

const Section = ({ id, title, subtitle, label, children, className = '', dark = false }) => {
  return (
    <section
      id={id}
      className={`section-wrapper ${className}`}
      style={{ ...(dark ? { background: 'rgba(255,255,255,0.02)' } : {}) }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {(title || subtitle || label) && (
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {label && <p className="section-label" style={{ marginBottom: '0.6rem' }}>{label}</p>}
            {title && (
              <h2 className="section-heading" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: '#f1f0ff', margin: '0 0 0.6rem' }}>
                My <span className="accent-text">{title.startsWith('My ') ? title.slice(3) : title}</span>
              </h2>
            )}
            {subtitle && (
              <p style={{ color: '#9490b5', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="fade-in">{children}</div>
      </div>
    </section>
  );
};

export default Section;
