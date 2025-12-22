import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const { isLoading } = usePortfolio();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Portfolio</h3>
        <p className="text-gray-600">Fetching your data from CMS...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;