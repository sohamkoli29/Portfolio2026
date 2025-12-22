import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Calendar, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const AboutPreview = () => {
  const { about, isLoading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading && !about) {
    return (
      <Section id="about" title="About Me">
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section
        id="about"
        title="About Me"
        subtitle={about?.title || "Get to know who I am, what I do, and what drives me"}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Info */}
          <div className="space-y-6">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto border-4 border-white shadow-xl">
                {about?.image_url ? (
                  <img
                    src={about.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <User className="w-32 h-32 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {about?.email && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{about.email}</span>
                </div>
              )}
              {about?.phone && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{about.phone}</span>
                </div>
              )}
              {about?.location && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{about.location}</span>
                </div>
              )}
            </div>

            {about?.cv_url && (
              <div className="text-center">
                <a
                  href={about.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Download CV
                </a>
              </div>
            )}
          </div>

          {/* Bio Preview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {about?.title?.split('&')[0] || 'Full Stack Developer'}
            </h3>
            
            <div className="text-gray-600">
              {about?.description ? (
                <p className="line-clamp-6">{about.description}</p>
              ) : (
                <p className="line-clamp-6">
                  Passionate full-stack developer with 5+ years of experience building modern web applications.
                  Specialized in React, Node.js, and cloud technologies. I believe in writing clean, maintainable 
                  code and creating user experiences that are both beautiful and functional.
                </p>
              )}
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Read Full Bio
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Full Bio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="About Me"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {about?.image_url && (
              <div className="flex-shrink-0">
                <img
                  src={about.image_url}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {about?.title || 'Full Stack Developer & Tech Enthusiast'}
              </h3>
              <div className="space-y-2">
                {about?.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{about.email}</span>
                  </div>
                )}
                {about?.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{about.phone}</span>
                  </div>
                )}
                {about?.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{about.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {about?.description || (
                <>
                  <p>
                    Passionate full-stack developer with 5+ years of experience building modern web applications.
                    Specialized in React, Node.js, and cloud technologies.
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and creating user experiences that are both
                    beautiful and functional. Always eager to learn new technologies and solve complex problems.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new frameworks, contributing to open-source
                    projects, or mentoring aspiring developers.
                  </p>
                </>
              )}
            </div>
          </div>

          {about?.cv_url && (
            <div className="flex justify-center pt-6 border-t">
              <a
                href={about.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Download Full CV
              </a>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AboutPreview;