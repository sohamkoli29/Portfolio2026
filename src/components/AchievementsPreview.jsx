import React, { useState } from 'react';
import { Trophy, Award, Calendar, ExternalLink, Medal, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const AchievementsPreview = () => {
  const { achievements = [], isLoading } = usePortfolio();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const featuredAchievements = achievements.filter(a => a.featured).slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      award: Trophy,
      competition: Medal,
      publication: Star,
      milestone: Award,
      certification: Award,
      other: Trophy,
    };
    return icons[category?.toLowerCase()] || Trophy;
  };

  const getCategoryColor = (category) => {
    const colors = {
      award: 'from-yellow-500 to-orange-500',
      competition: 'from-blue-500 to-purple-500',
      publication: 'from-green-500 to-teal-500',
      milestone: 'from-pink-500 to-rose-500',
      certification: 'from-indigo-500 to-blue-500',
      other: 'from-gray-500 to-gray-600',
    };
    return colors[category?.toLowerCase()] || 'from-blue-500 to-purple-500';
  };

  const AchievementCard = ({ achievement, onClick }) => {
    const Icon = getCategoryIcon(achievement.category);
    const gradient = getCategoryColor(achievement.category);

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover-lift transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="h-48 relative overflow-hidden">
          {achievement.image_url ? (
            <img
              src={achievement.image_url}
              alt={achievement.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <Icon className="w-20 h-20 text-white opacity-50" />
            </div>
          )}
          
          {achievement.category && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-xs font-medium rounded-full capitalize`}>
                {achievement.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(achievement.achievement_date)}</span>
            {achievement.organization && (
              <>
                <span className="mx-2">•</span>
                <span className="font-medium text-gray-700">{achievement.organization}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {achievement.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {achievement.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {achievement.achievement_url ? (
              <a
                href={achievement.achievement_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Details
              </a>
            ) : (
              <button
                onClick={() => onClick(achievement)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Read More
              </button>
            )}
            
            {achievement.icon && (
              <div className={`p-2 bg-gradient-to-r ${gradient} rounded-lg`}>
                <Trophy className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading && achievements.length === 0) {
    return (
      <Section id="achievements" title="Achievements & Awards" subtitle="Recognition and milestones in my professional journey">
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="achievements" title="Achievements & Awards" subtitle="Recognition and milestones in my professional journey">
        {featuredAchievements.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onClick={setSelectedAchievement}
                />
              ))}
            </div>

            {achievements.length > 3 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllAchievements(true)}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
                >
                  View All {achievements.length} Achievements
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Available</h3>
            <p className="text-gray-600">Achievements will be displayed here once added.</p>
          </div>
        )}
      </Section>

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <Modal
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          title={selectedAchievement.title}
          size="lg"
        >
          <div className="space-y-6">
            {selectedAchievement.image_url && (
              <img
                src={selectedAchievement.image_url}
                alt={selectedAchievement.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(selectedAchievement.achievement_date)}</span>
              </div>
              {selectedAchievement.category && (
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(selectedAchievement.category)} text-white text-sm rounded-full capitalize`}>
                  {selectedAchievement.category}
                </span>
              )}
            </div>

            {selectedAchievement.organization && (
              <div>
                <span className="font-semibold text-gray-900">Organization: </span>
                <span className="text-gray-700">{selectedAchievement.organization}</span>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedAchievement.description}
              </p>
            </div>

            {selectedAchievement.achievement_url && (
              <div className="pt-6 border-t">
                <a
                  href={selectedAchievement.achievement_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Details
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* All Achievements Modal */}
      <Modal
        isOpen={showAllAchievements}
        onClose={() => setShowAllAchievements(false)}
        title={`All Achievements (${achievements.length})`}
        size="xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={setSelectedAchievement}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AchievementsPreview;