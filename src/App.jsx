import React, { Suspense } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import * as LazyComponents from './components/LazyComponents';

const SectionLoader = () => (
  <div style={{ padding: '5rem 0', display: 'flex', justifyContent: 'center' }}>
    <div style={{
      width: '32px', height: '32px',
      border: '2px solid rgba(124,58,237,0.2)',
      borderTopColor: '#7c3aed',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <LoadingScreen />
        <Layout>
          <Hero />

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.AboutPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.SkillsPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.ExperiencePreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.CertificatesPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.AchievementsPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.ProjectsPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.ServicesPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.TestimonialsPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.BlogPreview />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.Contact />
          </Suspense>
        </Layout>
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

export default App;
