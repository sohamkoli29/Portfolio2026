import React, { useState } from 'react';
import { ExternalLink, Github, Star, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const ProjectsPreview = () => {
  const { projects, isLoading } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);
  const filters = ['All', 'React', 'Node.js', 'MERN'];

  const ProjectCard = ({ project, large = false }) => (
    <div
      className="dark-card"
      style={{ overflow: 'hidden', cursor: 'pointer', height: large ? '360px' : '280px', position: 'relative' }}
      onClick={() => setSelectedProject(project)}
    >
      {/* Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'all 0.4s' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.2) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Syne', fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.08)' }}>
              {project.title[0]}
            </span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.3) 100%)' }} />
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
          <span style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px',
            borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            <Star size={10} /> Featured
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem', zIndex: 2 }}>
        {project.technologies?.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {project.technologies.slice(0, 3).map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
          </div>
        )}
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f0ff', marginBottom: '4px' }}>
          {project.title}
        </h3>
        <p style={{ color: '#9490b5', fontSize: '0.78rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.short_description || project.description?.substring(0, 80)}
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ color: '#8b5cf6', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              <ExternalLink size={11} /> Live
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ color: '#9490b5', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={11} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading && projects.length === 0) {
    return (
      <Section id="projects" title="My Recent Works" subtitle="A showcase of selected projects">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: '280px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="projects" title="My Recent Works" subtitle="Selected projects from my portfolio" dark>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 18px',
                borderRadius: '99px',
                border: `1px solid ${activeFilter === f ? 'rgba(124,58,237,0.6)' : 'rgba(124,58,237,0.15)'}`,
                background: activeFilter === f ? 'rgba(124,58,237,0.15)' : 'transparent',
                color: activeFilter === f ? '#c4b5fd' : '#9490b5',
                fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {featuredProjects.length > 0 ? (
          <>
            {/* Bento grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="projects-grid">
              {featuredProjects.slice(0, 6).map((project, i) => (
                <ProjectCard key={project.id} project={project} large={i === 0 || i === 3} />
              ))}
            </div>

            {projects.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button onClick={() => setShowAllProjects(true)} className="btn-outline">
                  View All {projects.length} Projects
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9490b5' }}>
            <Star size={48} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
            <p>Projects will appear once added to the CMS.</p>
          </div>
        )}
      </Section>

      {/* Project modal */}
      {selectedProject && (
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject.title} size="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {selectedProject.image_url && (
              <img src={selectedProject.image_url} alt={selectedProject.title} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', opacity: 0.85 }} />
            )}
            <p style={{ color: '#9490b5', lineHeight: 1.8 }}>{selectedProject.description}</p>
            {selectedProject.technologies?.length > 0 && (
              <div>
                <p style={{ color: '#f1f0ff', fontWeight: 600, marginBottom: '10px' }}>Technologies</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedProject.technologies.map((t, i) => <span key={i} className="tech-tag" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>{t}</span>)}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '0.5rem', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
              {selectedProject.project_url && (
                <a href={selectedProject.project_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {selectedProject.github_url && (
                <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Github size={14} /> Source Code
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={showAllProjects} onClose={() => setShowAllProjects(false)} title={`All Projects (${projects.length})`} size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default ProjectsPreview;
