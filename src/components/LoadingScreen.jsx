import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const LoadingScreen = () => {
  const { isLoading } = usePortfolio();
  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg-primary)',
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1.5rem'
    }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(124,58,237,0.1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#7c3aed',
          borderRightColor: '#ec4899',
          animation: 'spin 0.9s linear infinite'
        }} />
        <div style={{
          position: 'absolute', inset: '8px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#8b5cf6', fontSize: '0.85rem'
        }}>
          SK
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1.1rem', marginBottom: '4px' }}>
          Loading Portfolio
        </h3>
        <p style={{ color: '#524f6e', fontSize: '0.8rem' }}>Fetching data from CMS...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingScreen;
