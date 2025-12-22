import React, { useMemo } from 'react';
import { Building, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';

const ExperiencePreview = () => {
  const { experiences, isLoading } = usePortfolio();

  const sortedExperiences = useMemo(() => {
    return [...experiences]
      .sort((a, b) => {
        // Sort by current first, then start date
        if (a.current !== b.current) return b.current - a.current;
        return new Date(b.start_date) - new Date(a.start_date);
      })
      .slice(0, 3); // Show only 3 experiences
  }, [experiences]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (isLoading && experiences.length === 0) {
    return (
      <Section
        id="experience"
        title="Work Experience"
        subtitle="My professional journey and career path"
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl"
      >
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and career path"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl"
    >
      {sortedExperiences.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-700" />
            
            {sortedExperiences.map((exp, index) => (
              <div key={exp.id} className="relative mb-12">
                {/* Timeline dot */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-gray-900 ${
                  exp.current ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-6' : 'md:ml-auto md:mr-6'}`}>
                  <div className="bg-gray-800 p-6 rounded-2xl hover-lift transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <div className="flex items-center text-gray-300 mt-2">
                          <Building className="w-4 h-4 mr-2" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 line-clamp-3">
                      {exp.description}
                    </p>
                    
                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            +{exp.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-medium flex items-center justify-center mx-auto gap-2">
              View Full Resume
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Experience Available</h3>
          <p className="text-gray-400">Work experience will be displayed here once added to the CMS.</p>
        </div>
      )}
    </Section>
  );
};

export default ExperiencePreview;