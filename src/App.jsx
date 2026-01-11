import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Hero from './components/Hero';
import AboutPreview from './components/AboutPreview';
import SkillsPreview from './components/SkillsPreview';
import ProjectsPreview from './components/ProjectsPreview';
import ExperiencePreview from './components/ExperiencePreview';
import ServicesPreview from './components/ServicesPreview';
import CertificatesPreview from './components/CertificatesPreview';
import AchievementsPreview from './components/AchievementsPreview';
import BlogPreview from './components/BlogPreview';
import TestimonialsPreview from './components/TestimonialsPreview';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <LoadingScreen />
        <Layout>
          <Hero />
          <AboutPreview />
          <SkillsPreview />
          <ProjectsPreview />
          <ServicesPreview />
          <ExperiencePreview />
         <CertificatesPreview/>
         <AchievementsPreview/>
          <BlogPreview />
          <TestimonialsPreview />
          <Contact />
        </Layout>
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

export default App;