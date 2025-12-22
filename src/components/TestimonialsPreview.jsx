import React, { useState } from 'react';
import { Quote, Star, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const TestimonialsPreview = () => {
  const { testimonials, isLoading } = usePortfolio();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const TestimonialCard = ({ testimonial, isCompact = false, onRead = null }) => (
    <div className={`bg-white ${isCompact ? 'p-4' : 'p-6'} rounded-xl shadow-sm hover-lift transition-all duration-300 border border-gray-100`}>
      <div className="flex items-start gap-4 mb-4">
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt={testimonial.name}
            className={`${isCompact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full object-cover flex-shrink-0`}
          />
        ) : (
          <div className={`${isCompact ? 'w-10 h-10' : 'w-12 h-12'} bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
            {testimonial.name.charAt(0)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{testimonial.name}</p>
          <div className="text-sm text-gray-600 truncate">
            {testimonial.role && <span>{testimonial.role}</span>}
            {testimonial.role && testimonial.company && <span> · </span>}
            {testimonial.company && <span className="font-medium">{testimonial.company}</span>}
          </div>
          <div className="flex items-center mt-1">
            {renderStars(testimonial.rating || 5)}
          </div>
        </div>
      </div>

      <Quote className={`${isCompact ? 'w-6 h-6' : 'w-8 h-8'} text-blue-600 opacity-20 mb-2`} />
      
      <p className={`text-gray-700 ${isCompact ? 'text-sm line-clamp-3' : 'line-clamp-4'} italic leading-relaxed mb-4`}>
        "{testimonial.content}"
      </p>

      {onRead && (
        <button
          onClick={() => onRead(testimonial)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center transition-all hover:gap-2"
        >
          Read More
          <svg className="w-4 h-4 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );

  if (isLoading && testimonials.length === 0) {
    return (
      <Section
        id="testimonials"
        title="Client Testimonials"
        subtitle="What people say about working with me"
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"
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
        id="testimonials"
        title="Client Testimonials"
        subtitle="What people say about working with me"
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"
      >
        {featuredTestimonials.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial}
                  onRead={setSelectedTestimonial}
                />
              ))}
            </div>

            {testimonials.length > 3 && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setShowAllTestimonials(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View All {testimonials.length} Testimonials
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Available</h3>
            <p className="text-gray-600">Client testimonials will be displayed here once added.</p>
          </div>
        )}
      </Section>

      {/* Single Testimonial Detail Modal */}
      {selectedTestimonial && (
        <Modal
          isOpen={!!selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          title="Client Review"
          size="md"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              {selectedTestimonial.avatar_url ? (
                <img
                  src={selectedTestimonial.avatar_url}
                  alt={selectedTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {selectedTestimonial.name.charAt(0)}
                </div>
              )}
              
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-900">{selectedTestimonial.name}</h4>
                <div className="text-gray-600 mt-1">
                  {selectedTestimonial.role && <span>{selectedTestimonial.role}</span>}
                  {selectedTestimonial.role && selectedTestimonial.company && <span> at </span>}
                  {selectedTestimonial.company && <span className="font-medium text-gray-900">{selectedTestimonial.company}</span>}
                </div>
                <div className="flex items-center mt-2">
                  {renderStars(selectedTestimonial.rating || 5)}
                  <span className="ml-2 text-sm text-gray-600">({selectedTestimonial.rating || 5}/5)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <Quote className="w-10 h-10 text-blue-600 opacity-30 mb-4" />
              <p className="text-gray-800 text-lg leading-relaxed italic">
                "{selectedTestimonial.content}"
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* All Testimonials Modal */}
      <Modal
        isOpen={showAllTestimonials}
        onClose={() => setShowAllTestimonials(false)}
        title={`Client Testimonials (${testimonials.length})`}
        size="xl"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              isCompact
              onRead={setSelectedTestimonial}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TestimonialsPreview;