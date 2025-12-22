import React, { useState } from 'react';
import { ExternalLink, Github, Star, Eye, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const ProjectsPreview = () => {
  const { projects, isLoading } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const ProjectCard = ({ project, onClick }) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover-lift shadow-sm transition-all duration-300">
      <div className="h-48 relative overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-300">Project</div>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.short_description || project.description?.substring(0, 100)}...
        </p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {project.project_url && (
              <a 
                href={project.project_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Live
              </a>
            )}
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            )}
          </div>
          <button
            onClick={() => onClick(project)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading && projects.length === 0) {
    return (
      <Section id="projects" title="Featured Projects" subtitle="Some of my recent work and side projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="projects" title="Featured Projects" subtitle="Some of my recent work and side projects">
        {featuredProjects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
              ))}
            </div>

            {projects.length > 3 && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setShowAllProjects(true)}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
                >
                  View All {projects.length} Projects
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Available</h3>
            <p className="text-gray-600">Projects will be displayed here once added to the CMS.</p>
          </div>
        )}
      </Section>

      {/* Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          size="lg"
        >
          <div className="space-y-6">
            {selectedProject.image_url && (
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">About This Project</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-6 border-t">
                {selectedProject.project_url && (
                  <a
                    href={selectedProject.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </a>
                )}
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* All Projects Modal */}
      <Modal
        isOpen={showAllProjects}
        onClose={() => setShowAllProjects(false)}
        title={`All Projects (${projects.length})`}
        size="xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ProjectsPreview;