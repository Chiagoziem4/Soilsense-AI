import React from 'react';

export interface SoilAnalysisResult {
  soilType: string;
  fertilityLevel: 'low' | 'medium' | 'high';
  moistureLevel: 'low' | 'moderate' | 'high';
  recommendedCrops: string[];
  explanation?: string;
}

interface ResultsCardProps {
  result: SoilAnalysisResult;
  onDownloadPDF?: () => void;
  onNewAnalysis: () => void;
  isLoading?: boolean;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  result,
  onDownloadPDF,
  onNewAnalysis,
  isLoading = false,
}) => {
  const fertilityColors = {
    low: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200',
    high: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
  };

  const moistureColors = {
    low: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200',
    moderate: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    high: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200',
  };

  return (
    <div className="w-full max-w-2xl animate-slide-up">
      <div className="card space-y-6">
        {/* Header */}
        <div className="border-b border-soil-200 dark:border-soil-700 pb-6">
          <h2 className="text-3xl font-bold text-earth-700 dark:text-earth-300 mb-2">
            Analysis Complete
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your soil profile is ready
          </p>
        </div>

        {/* Soil Type */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Soil Type
          </label>
          <div className="bg-gradient-to-r from-soil-100 to-soil-50 dark:from-soil-800 dark:to-soil-900 rounded-lg p-4 border border-soil-200 dark:border-soil-700">
            <p className="text-2xl font-bold text-soil-800 dark:text-soil-100">
              {result.soilType}
            </p>
          </div>
        </div>

        {/* Fertility & Moisture Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Fertility Level
            </label>
            <div className={`badge ${fertilityColors[result.fertilityLevel]} text-lg font-bold py-3 px-4 text-center`}>
              {result.fertilityLevel.charAt(0).toUpperCase() + result.fertilityLevel.slice(1)}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Moisture Level
            </label>
            <div className={`badge ${moistureColors[result.moistureLevel]} text-lg font-bold py-3 px-4 text-center`}>
              {result.moistureLevel.charAt(0).toUpperCase() + result.moistureLevel.slice(1)}
            </div>
          </div>
        </div>

        {/* Recommended Crops */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Recommended Crops
          </label>
          <div className="flex flex-wrap gap-3">
            {result.recommendedCrops.map((crop, idx) => (
              <div key={idx} className="chip">
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {crop}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {result.explanation && (
          <div className="bg-earth-50 dark:bg-earth-950 rounded-lg p-4 border border-earth-200 dark:border-earth-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-soil-200 dark:border-soil-700">
          <button
            onClick={onNewAnalysis}
            disabled={isLoading}
            className="btn-secondary flex-1"
          >
            Analyze Another Soil
          </button>
          {onDownloadPDF && (
            <button
              onClick={onDownloadPDF}
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              Download Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
