import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { AgricultureIntro } from '../components/AgricultureIntro';
import { DeveloperInfo } from '../components/DeveloperInfo';

export default function Home() {
  const router = useRouter();

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
        <main className="flex-1">
          {/* Hero Section */}
          <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-5xl sm:text-6xl font-bold text-earth-900 dark:text-earth-100 mb-4 leading-tight">
                  SoilSense AI
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-2">
                  Upload soil. Get instant crop intelligence.
                </p>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                  Powered by advanced AI vision analysis, discover your soil&apos;s potential and get personalized crop recommendations in seconds.
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => router.push('/services')}
                  className="btn-primary inline-block mb-8 text-lg"
                >
                  Get Started
                  <span className="ml-2 inline-block">→</span>
                </button>
              </div>

              {/* Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="card text-center">
                  <div className="text-3xl mb-3">📸</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Services
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Soil, plant, and crop analysis in one platform
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Grok Vision API for advanced insights
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-3xl mb-3">🌾</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Smart Recommendations
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Data-driven suggestions for your farm
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Agriculture Intro */}
          <AgricultureIntro />

          {/* Developer Info */}
          <DeveloperInfo />
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
