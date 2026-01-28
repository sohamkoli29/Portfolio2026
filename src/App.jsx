import React, { Suspense } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import * as LazyComponents from './components/LazyComponents';

// Loading fallback component
const SectionLoader = () => (
  <div className="flex justify-center py-12">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
            <LazyComponents.ProjectsPreview />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.ServicesPreview />
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
            <LazyComponents.BlogPreview />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <LazyComponents.TestimonialsPreview />
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