import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UploadCard } from '../components/UploadCard';
import { DarkModeToggle } from '../components/DarkModeToggle';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (imageData: string, fileName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          fileName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Analysis failed. Please try again.');
      }

      const result = await response.json();
      
      // Store result in sessionStorage for results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      
      router.push('/results');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SoilSense AI - Home</title>
      </Head>
      
      {/* Background */}
      <div className="min-h-screen bg-gradient-soil dark:bg-gradient-dark-soil transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-soil-200 dark:border-soil-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="text-2xl font-bold text-earth-700 dark:text-earth-300">
              🌱 SoilSense AI
            </div>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
          <div className="w-full max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-bold text-earth-900 dark:text-earth-100 mb-4 leading-tight">
                SoilSense AI
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-2">
                Upload soil. Get instant crop intelligence.
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Powered by advanced AI vision analysis, discover your soil's potential and get personalized crop recommendations in seconds.
              </p>
            </div>

            {/* Upload Card */}
            <div className="flex justify-center mb-8 animate-slide-up">
              <UploadCard onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-md mx-auto mb-8 animate-fade-in">
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="card text-center">
                <div className="text-3xl mb-3">📸</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Upload
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Simply upload your soil image in JPG or PNG format
                </p>
              </div>
              <div className="card text-center">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  AI Analysis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced vision AI analyzes soil composition instantly
                </p>
              </div>
              <div className="card text-center">
                <div className="text-3xl mb-3">🌾</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Recommendations
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get crop suggestions tailored to your soil profile
                </p>
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
