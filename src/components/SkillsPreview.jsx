import React, { useState, useMemo } from 'react';
import { Code2, Palette, Server, Database, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const SkillsPreview = () => {
  const { skills, isLoading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend': return Code2;
      case 'backend': return Server;
      case 'design': return Palette;
      case 'database': return Database;
      default: return Award;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend': return 'from-blue-500 to-blue-600';
      case 'backend': return 'from-green-500 to-green-600';
      case 'design': return 'from-purple-500 to-purple-600';
      case 'database': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const skillsByCategory = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    
    const grouped = {};
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(skill);
    });

    return Object.entries(grouped)
      .map(([category, skills]) => ({
        category,
        skills: skills.sort((a, b) => b.proficiency - a.proficiency),
        icon: getCategoryIcon(category),
        color: getCategoryColor(category)
      }));
  }, [skills]);

  const previewCategories = skillsByCategory.slice(0, 4);

  if (isLoading && skills.length === 0) {
    return (
      <Section
        id="skills"
        title="Skills & Expertise"
        subtitle="Technologies and tools I work with"
        className="bg-gray-50 rounded-3xl"
      >
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section
        id="skills"
        title="Skills & Expertise"
        subtitle="Technologies and tools I work with"
        className="bg-gray-50 rounded-3xl"
      >
        {previewCategories.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {previewCategories.map((categoryData, index) => {
                const Icon = categoryData.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover-lift"
                  >
                    <div className={`inline-flex p-3 bg-gradient-to-r ${categoryData.color} rounded-xl mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{categoryData.category}</h3>
                    <ul className="space-y-2">
                      {categoryData.skills.slice(0, 5).map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-gray-600">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{skill.name}</span>
                            <span className="text-xs text-gray-500">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View All {skills.length} Skills
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Skills Available</h3>
            <p className="text-gray-600">Skills will be displayed here once added to the CMS.</p>
          </div>
        )}
      </Section>

      {/* All Skills Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Skills & Expertise"
        size="xl"
      >
        <div className="space-y-8">
          {skillsByCategory.map((categoryData, index) => {
            const Icon = categoryData.icon;
            return (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-8 last:pb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`inline-flex p-3 bg-gradient-to-r ${categoryData.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{categoryData.category}</h3>
                  <span className="ml-auto text-sm text-gray-500">
                    {categoryData.skills.length} skills
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {categoryData.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm font-semibold text-blue-600">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full bg-gradient-to-r ${categoryData.color}`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default SkillsPreview;