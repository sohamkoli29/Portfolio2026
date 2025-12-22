import React, { useState } from 'react';
import { Code, Palette, Smartphone, Cloud, CheckCircle, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const ServicesPreview = () => {
  const { services, isLoading } = usePortfolio();
  const [selectedService, setSelectedService] = useState(null);

  const getIcon = (iconName) => {
    const icons = {
      code: Code,
      palette: Palette,
      smartphone: Smartphone,
      cloud: Cloud,
    };
    return icons[iconName?.toLowerCase()] || Code;
  };

  const getGradient = (index) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading && services.length === 0) {
    return (
      <Section id="services" title="Services I Offer" subtitle="How I can help bring your ideas to life">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="services" title="Services I Offer" subtitle="How I can help bring your ideas to life">
        {services.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((service, index) => {
                const Icon = getIcon(service.icon);
                const gradient = getGradient(index);

                return (
                  <div 
                    key={service.id} 
                    className="bg-white p-6 rounded-xl border border-gray-200 hover-lift transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <div className={`inline-flex p-3 bg-gradient-to-r ${gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button 
                      onClick={() => setSelectedService(service)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Let's discuss how I can help you achieve your goals. Get in touch for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Get Started
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Available</h3>
            <p className="text-gray-600">Services will be displayed here once added to the CMS.</p>
          </div>
        )}
      </Section>

      {/* Service Details Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          size="md"
        >
          <div className="space-y-6">
            <div className={`inline-flex p-4 bg-gradient-to-r ${getGradient(services.indexOf(selectedService))} rounded-xl`}>
              {React.createElement(getIcon(selectedService.icon), { className: "w-8 h-8 text-white" })}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">About This Service</h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            {selectedService.features && selectedService.features.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ServicesPreview;