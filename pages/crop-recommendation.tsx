import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DarkModeToggle } from '../components/DarkModeToggle';

interface FormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  soilMoisture: string;
}

export default function CropRecommendation() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    soilMoisture: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate all fields
    if (Object.values(formData).some(val => !val)) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/recommend-crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          N: parseFloat(formData.nitrogen),
          P: parseFloat(formData.phosphorus),
          K: parseFloat(formData.potassium),
          pH: parseFloat(formData.ph),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          rainfall: parseFloat(formData.rainfall),
          soilMoisture: parseFloat(formData.soilMoisture),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Recommendation failed. Please try again.');
      }

      const result = await response.json();
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      sessionStorage.setItem('analysisType', 'crop-recommendation');

      router.push('/analysis-results');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Recommendation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SoilSense AI - Crop Recommendation</title>
      </Head>

      <div className="min-h-screen bg-gradient-soil dark:bg-gradient-dark-soil transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-soil-200 dark:border-soil-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push('/services')}
              className="flex items-center gap-2 text-earth-700 dark:text-earth-300 hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="text-2xl font-bold text-earth-700 dark:text-earth-300">
              🌾 Crop Recommendation
            </div>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold text-earth-900 dark:text-earth-100 mb-4">
                AI Crop Recommendation
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Enter your soil and environmental data to get AI-powered crop recommendations with confidence scores.
              </p>
            </div>

            {/* Form */}
            <div className="card animate-slide-up mb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Soil Parameters */}
                <div>
                  <h3 className="text-lg font-semibold text-earth-700 dark:text-earth-300 mb-4">
                    🧪 Soil Parameters (NPK)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nitrogen (N) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phosphorus (P) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleChange}
                        placeholder="e.g. 30"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Potassium (K) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                        placeholder="e.g. 45"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* pH */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Soil pH <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    placeholder="e.g. 6.5"
                    step="0.1"
                    min="0"
                    max="14"
                    className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                  />
                </div>

                {/* Environmental Parameters */}
                <div>
                  <h3 className="text-lg font-semibold text-earth-700 dark:text-earth-300 mb-4">
                    🌡️ Environmental Conditions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Temperature (°C) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Humidity (%) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        placeholder="e.g. 65"
                        step="0.1"
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rainfall (mm) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                        placeholder="e.g. 200"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Soil Moisture (%) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="soilMoisture"
                        value={formData.soilMoisture}
                        onChange={handleChange}
                        placeholder="e.g. 40"
                        step="0.1"
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 rounded-lg border border-soil-200 dark:border-soil-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-earth-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      <strong>Error:</strong> {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Get Crop Recommendations'
                  )}
                </button>
              </form>
            </div>

            {/* Info Box */}
            <div className="card bg-earth-50 dark:bg-earth-950 border border-earth-200 dark:border-earth-800">
              <h3 className="font-semibold text-earth-700 dark:text-earth-300 mb-3">
                💡 Sample Values
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-justify">
                <strong>Example 1 (Wheat):</strong> N: 50, P: 30, K: 45, pH: 6.8, Temp: 25°C, Humidity: 65%, Rainfall: 200mm, Moisture: 40%
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 text-justify">
                <strong>Example 2 (Rice):</strong> N: 60, P: 25, K: 35, pH: 6.5, Temp: 28°C, Humidity: 75%, Rainfall: 300mm, Moisture: 50%
              </p>
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
