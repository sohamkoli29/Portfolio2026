import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
          <div style={{ maxWidth: '440px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <AlertTriangle size={28} color="#ef4444" />
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#9490b5', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We're having trouble loading the portfolio. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
              style={{ margin: '0 auto' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
