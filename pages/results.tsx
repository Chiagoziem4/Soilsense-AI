import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ResultsCard, SoilAnalysisResult } from '../components/ResultsCard';
import { DarkModeToggle } from '../components/DarkModeToggle';

export default function Results() {
  const router = useRouter();
  const [result, setResult] = useState<SoilAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult');
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (error) {
        console.error('Error parsing result:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!result) return;

    setIsLoading(true);
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.getElementById('results-content');
      if (!element) return;

      const options = {
        margin: 10,
        filename: 'soil-analysis-report.pdf',
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
    router.push('/');
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
              onClick={() => router.push('/')}
              className="text-2xl font-bold text-earth-700 dark:text-earth-300 hover:opacity-80 transition-opacity"
            >
              🌱 SoilSense AI
            </button>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
          <div id="results-content">
            <ResultsCard
              result={result}
              onNewAnalysis={handleNewAnalysis}
              onDownloadPDF={handleDownloadPDF}
              isLoading={isLoading}
            />
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
