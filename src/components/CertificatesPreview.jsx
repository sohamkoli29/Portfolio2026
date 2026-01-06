import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const CertificatesPreview = () => {
  const { certificates = [], isLoading } = usePortfolio();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const featuredCertificates = certificates.filter(c => c.featured).slice(0, 4);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const CertificateCard = ({ certificate, onClick }) => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover-lift transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="h-40 relative overflow-hidden">
        {certificate.image_url ? (
          <img
            src={certificate.image_url}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Award className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {certificate.featured && (
          <div className="absolute top-3 right-3">
            <div className="p-1.5 bg-yellow-500 rounded-full">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {certificate.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <BookOpen className="w-4 h-4 mr-1.5" />
          <span className="font-medium">{certificate.issuer}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1.5" />
          <span>Issued {formatDate(certificate.issue_date)}</span>
        </div>

        {certificate.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {certificate.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {certificate.verification_url ? (
            <a
              href={certificate.verification_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Verify
            </a>
          ) : (
            <div />
          )}
          
          <button
            onClick={() => onClick(certificate)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading && certificates.length === 0) {
    return (
      <Section id="certificates" title="Certifications" subtitle="Professional certifications and credentials" className="bg-gray-50 rounded-3xl">
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="certificates" title="Certifications" subtitle="Professional certifications and credentials" className="bg-gray-50 rounded-3xl">
        {featuredCertificates.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onClick={setSelectedCertificate}
                />
              ))}
            </div>

            {certificates.length > 4 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllCertificates(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                >
                  View All {certificates.length} Certificates
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Available</h3>
            <p className="text-gray-600">Certificates will be displayed here once added.</p>
          </div>
        )}
      </Section>

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <Modal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          title={selectedCertificate.title}
          size="lg"
        >
          <div className="space-y-6">
            {selectedCertificate.image_url && (
              <div>
                <img
                  src={selectedCertificate.image_url}
                  alt={selectedCertificate.title}
                  className="w-full h-auto object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start">
                <BookOpen className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Issued By</div>
                  <div className="font-semibold text-gray-900 text-lg">{selectedCertificate.issuer}</div>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Issue Date</div>
                  <div className="font-semibold text-gray-900">{formatDate(selectedCertificate.issue_date)}</div>
                </div>
              </div>

              {selectedCertificate.credential_id && (
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Credential ID</div>
                    <div className="font-mono text-sm bg-gray-100 px-3 py-2 rounded">
                      {selectedCertificate.credential_id}
                    </div>
                  </div>
                </div>
              )}

              {selectedCertificate.description && (
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500 mb-2">Description</div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>
              )}
            </div>

            {selectedCertificate.verification_url && (
              <div className="pt-6 border-t">
                <a
                  href={selectedCertificate.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Certificate
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* All Certificates Modal */}
      <Modal
        isOpen={showAllCertificates}
        onClose={() => setShowAllCertificates(false)}
        title={`All Certificates (${certificates.length})`}
        size="xl"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onClick={setSelectedCertificate}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CertificatesPreview;