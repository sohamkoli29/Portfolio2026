import React from 'react';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { projects, skills, experiences, isLoading } = usePortfolio();

  const stats = [
    { value: projects.length || '10+', label: 'Projects' },
    { value: experiences.length || '5+', label: 'Years Exp' },
    { value: skills.length || '20+', label: 'Skills' },
    { value: '100%', label: 'Satisfaction' },
  ];

  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Full Stack Developer</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Crafting Digital{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Experiences
          </span>{' '}
          That Inspire
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          I build modern, scalable web applications with cutting-edge technologies.
          Passionate about clean code, user experience, and solving complex problems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#projects"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover-lift flex items-center gap-2 font-medium"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#contact"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all hover-lift font-medium"
          >
            Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm hover-lift">
              <div className="text-2xl font-bold text-gray-900">
                {isLoading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto" />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;