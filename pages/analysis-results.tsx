import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DarkModeToggle } from '../components/DarkModeToggle';

interface AnalysisResult {
  soilType?: string;
  fertilityLevel?: 'low' | 'medium' | 'high';
  moistureLevel?: 'low' | 'moderate' | 'high';
  recommendedCrops?: string[];
  healthScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  keyFindings?: string[];
  plantDiseases?: string[];
  nutrientDeficiencies?: string[];
  plantHealth?: string;
  treatmentRecommendations?: string[];
  irrigationGuidance?: string;
  preventionTips?: string[];
  confidenceScore?: number;
  explanation?: string;
  crops?: Array<{ name: string; confidence: number; reason: string }>;
  farmingPractices?: string[];
}

export default function AnalysisResults() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisType, setAnalysisType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult');
    const storedType = sessionStorage.getItem('analysisType');
    
    if (storedResult && storedType) {
      try {
        setResult(JSON.parse(storedResult));
        setAnalysisType(storedType);
      } catch (error) {
        console.error('Error parsing result:', error);
        router.push('/services');
      }
    } else {
      router.push('/services');
    }
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!result) return;

    setIsLoading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.getElementById('results-content');
      if (!element) return;

      const options = {
        margin: 10,
        filename: `${analysisType}-analysis-report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    sessionStorage.removeItem('analysisResult');
    sessionStorage.removeItem('analysisType');
    router.push('/services');
  };

  if (!result) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="min-h-screen bg-gradient-soil dark:bg-gradient-dark-soil flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SoilSense AI - Analysis Results</title>
      </Head>

      <div className="min-h-screen bg-gradient-soil dark:bg-gradient-dark-soil transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-soil-200 dark:border-soil-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push('/services')}
              className="text-2xl font-bold text-earth-700 dark:text-earth-300 hover:opacity-80 transition-opacity"
            >
              🌱 SoilSense AI
            </button>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] px-4 py-12">
          <div id="results-content" className="max-w-4xl mx-auto">
            {/* Analysis Header */}
            <div className="card mb-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-earth-700 dark:text-earth-300 mb-2">
                    {analysisType === 'soil' && '🪨 Soil Analysis'}
                    {analysisType === 'plant' && '🌿 Plant Health Analysis'}
                    {analysisType === 'crop-recommendation' && '🌾 Crop Recommendations'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analysis complete - see your detailed results below
                  </p>
                </div>
                {result.confidenceScore && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence Score</p>
                    <div className="text-3xl font-bold text-earth-700 dark:text-earth-300">
                      {(result.confidenceScore * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            {(result.healthScore || result.riskLevel) && (
              <div className="grid grid-cols-2 gap-4 mb-6 animate-slide-up">
                {result.healthScore !== undefined && (
                  <div className="card">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Health Score</p>
                    <div className="text-4xl font-bold text-earth-700 dark:text-earth-300">
                      {result.healthScore}/100
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div
                        className="bg-gradient-to-r from-earth-500 to-earth-600 h-2 rounded-full transition-all"
                        style={{ width: `${result.healthScore}%` }}
                      />
                    </div>
                  </div>
                )}
                {result.riskLevel && (
                  <div className="card">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Risk Level</p>
                    <div className={`text-2xl font-bold capitalize ${
                      result.riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                      result.riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {result.riskLevel}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Soil Type */}
            {result.soilType && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">🪨 Soil Type</h2>
                <div className="bg-gradient-to-r from-soil-100 to-soil-50 dark:from-soil-800 dark:to-soil-900 rounded-lg p-4 border border-soil-200 dark:border-soil-700">
                  <p className="text-2xl font-bold text-soil-800 dark:text-soil-100">{result.soilType}</p>
                </div>
              </div>
            )}

            {/* Soil Properties */}
            {(result.fertilityLevel || result.moistureLevel) && (
              <div className="grid grid-cols-2 gap-4 mb-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                {result.fertilityLevel && (
                  <div className="card">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Fertility</p>
                    <div className={`badge text-lg font-bold py-3 ${
                      result.fertilityLevel === 'low' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' :
                      result.fertilityLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200' :
                      'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                    }`}>
                      {result.fertilityLevel}
                    </div>
                  </div>
                )}
                {result.moistureLevel && (
                  <div className="card">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Moisture</p>
                    <div className={`badge text-lg font-bold py-3 ${
                      result.moistureLevel === 'low' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200' :
                      result.moistureLevel === 'moderate' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' :
                      'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200'
                    }`}>
                      {result.moistureLevel}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Key Findings */}
            {result.keyFindings && result.keyFindings.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">📊 Key Findings</h2>
                <ul className="space-y-2">
                  {result.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-earth-600 dark:text-earth-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Plant Issues */}
            {(result.plantDiseases || result.nutrientDeficiencies) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-slide-up" style={{ animationDelay: '0.25s' }}>
                {result.plantDiseases && result.plantDiseases.length > 0 && (
                  <div className="card bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-3">🦠 Diseases Detected</h3>
                    <ul className="space-y-2">
                      {result.plantDiseases.map((disease, idx) => (
                        <li key={idx} className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                          {disease}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.nutrientDeficiencies && result.nutrientDeficiencies.length > 0 && (
                  <div className="card bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-3">⚠️ Nutrient Deficiencies</h3>
                    <ul className="space-y-2">
                      {result.nutrientDeficiencies.map((deficiency, idx) => (
                        <li key={idx} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                          {deficiency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Treatment Recommendations */}
            {result.treatmentRecommendations && result.treatmentRecommendations.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">💊 Treatment Recommendations</h2>
                <ul className="space-y-2">
                  {result.treatmentRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Irrigation Guidance */}
            {result.irrigationGuidance && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.35s' }} style={{ animationDelay: '0.35s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">💧 Irrigation Guidance</h2>
                <p className="text-gray-700 dark:text-gray-300">{result.irrigationGuidance}</p>
              </div>
            )}

            {/* Prevention Tips */}
            {result.preventionTips && result.preventionTips.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">🛡️ Disease Prevention Tips</h2>
                <ul className="space-y-2">
                  {result.preventionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Crops */}
            {result.recommendedCrops && result.recommendedCrops.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">🌾 Recommended Crops</h2>
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
            )}

            {/* Crop Details */}
            {result.crops && result.crops.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">🎯 Detailed Crop Analysis</h2>
                <div className="space-y-4">
                  {result.crops.map((crop, idx) => (
                    <div key={idx} className="border-l-4 border-earth-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{crop.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-earth-700 dark:text-earth-300">{(crop.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-earth-500 to-earth-600 h-2 rounded-full transition-all"
                          style={{ width: `${crop.confidence * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{crop.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Farming Practices */}
            {result.farmingPractices && result.farmingPractices.length > 0 && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.55s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">🌱 Best Farming Practices</h2>
                <ul className="space-y-2">
                  {result.farmingPractices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">•</span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Explanation */}
            {result.explanation && (
              <div className="card mb-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-lg font-bold text-earth-700 dark:text-earth-300 mb-4">📝 AI Insights</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="card bg-earth-50 dark:bg-earth-950 border border-earth-200 dark:border-earth-800 animate-slide-up" style={{ animationDelay: '0.65s' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNewAnalysis}
                  disabled={isLoading}
                  className="btn-secondary flex-1"
                >
                  New Analysis
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isLoading}
                  className="btn-primary flex-1"
                >
                  {isLoading ? 'Generating...' : 'Download Report'}
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-soil-200 dark:border-soil-700 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2024 SoilSense AI. Powered by Grok Vision API.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
