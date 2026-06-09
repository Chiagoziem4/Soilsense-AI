import React from 'react';

export const AgricultureIntro: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800 border-t border-b border-soil-200 dark:border-soil-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-earth-700 dark:text-earth-300 mb-4">
            🌱 Smart Agriculture for a Sustainable Future
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-earth-600 to-soil-600 mx-auto mb-8"></div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
          Agriculture is the foundation of food security, economic development, and sustainable living. By leveraging artificial intelligence, data analytics, and modern agricultural practices, farmers can improve productivity, maintain soil fertility, detect crop issues early, and make informed decisions. <span className="font-semibold text-earth-700 dark:text-earth-300">SoilSense AI</span> empowers farmers, researchers, and agricultural enthusiasts with intelligent insights for healthier crops, better soil management, and increased agricultural efficiency.
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <div className="card text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold mb-2 text-earth-700 dark:text-earth-300">Data-Driven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered analysis</p>
          </div>
          <div className="card text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-semibold mb-2 text-earth-700 dark:text-earth-300">Sustainable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Environmental focus</p>
          </div>
          <div className="card text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2 text-earth-700 dark:text-earth-300">Efficient</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maximize yields</p>
          </div>
          <div className="card text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">🔬</div>
            <h3 className="font-semibold mb-2 text-earth-700 dark:text-earth-300">Innovative</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cutting-edge tech</p>
          </div>
        </div>
      </div>
    </section>
  );
};
