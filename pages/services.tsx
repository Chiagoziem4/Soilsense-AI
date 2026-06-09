import Head from 'next/head';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { ServiceCard } from '../components/ServiceCard';

export default function Services() {
  return (
    <>
      <Head>
        <title>SoilSense AI - Choose a Service</title>
        <meta name="description" content="Select your agricultural analysis service" />
      </Head>

      <div className="min-h-screen bg-gradient-soil dark:bg-gradient-dark-soil transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-soil-200 dark:border-soil-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-earth-700 dark:text-earth-300 hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="text-2xl font-bold text-earth-700 dark:text-earth-300">
              🌱 SoilSense AI
            </div>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-bold text-earth-900 dark:text-earth-100 mb-4">
                Choose a Service
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Select how you would like SoilSense AI to assist you.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Plant Analysis */}
              <ServiceCard
                icon="🌿"
                title="Plant Health Analysis"
                description="Upload a crop or plant image and receive comprehensive health assessment with disease detection and treatment recommendations."
                features={[
                  'Detect diseases and infections',
                  'Identify nutrient deficiencies',
                  'Assess overall plant health',
                  'Treatment recommendations',
                ]}
                buttonText="Analyze Plant"
                href="/plant-analysis"
                color="green"
              />

              {/* Soil Analysis */}
              <ServiceCard
                icon="🪨"
                title="Soil Analysis"
                description="Analyze soil characteristics, texture, and condition to identify potential issues and receive soil improvement recommendations."
                features={[
                  'Analyze soil texture',
                  'Assess soil condition',
                  'Identify soil issues',
                  'Improvement recommendations',
                ]}
                buttonText="Analyze Soil"
                href="/soil-analysis"
                color="soil"
              />

              {/* Crop Recommendation */}
              <ServiceCard
                icon="🌾"
                title="AI Crop Recommendation"
                description="Enter environmental and soil data to receive AI-powered crop recommendations with confidence scores and farming practices."
                features={[
                  'Input soil parameters',
                  'Environmental data',
                  'Confidence scores',
                  'Best practices guide',
                ]}
                buttonText="Get Recommendations"
                href="/crop-recommendation"
                color="earth"
              />
            </div>

            {/* Info Section */}
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-earth-700 dark:text-earth-300 mb-4">
                💡 How It Works
              </h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">1.</span>
                  <span>Choose the service that matches your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">2.</span>
                  <span>Upload images or enter data for analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">3.</span>
                  <span>AI processes your information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">4.</span>
                  <span>Receive actionable insights and recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-earth-600 dark:text-earth-400 flex-shrink-0">5.</span>
                  <span>Download reports or save for future reference</span>
                </li>
              </ol>
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
