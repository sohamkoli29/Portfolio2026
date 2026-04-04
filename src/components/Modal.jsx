import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true }) => {
  if (!isOpen) return null;

  const sizes = { sm: '480px', md: '680px', lg: '880px', xl: '1100px', full: '95vw' };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }} />

      {/* Modal box */}
      <div
        style={{
          position: 'relative',
          background: '#13131e',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: sizes[size],
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(124,58,237,0.2)',
          zIndex: 1,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid rgba(124,58,237,0.12)',
          }}>
            {title && (
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f1f0ff', margin: 0 }}>
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  width: '34px', height: '34px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9490b5', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#f1f0ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#9490b5'; }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
