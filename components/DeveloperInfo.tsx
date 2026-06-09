import React from 'react';

export const DeveloperInfo: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-earth-50 dark:bg-earth-950 border-t border-earth-200 dark:border-earth-800">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-earth-500 to-soil-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                S
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-earth-700 dark:text-earth-300 mb-2">
                About the Developer
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-earth-700 dark:text-earth-300">SoilSense AI</span> was developed by <span className="font-semibold">Sammy</span> as an innovative agricultural technology platform that combines artificial intelligence with modern farming practices. The platform is designed to assist farmers, researchers, and agricultural stakeholders in analyzing soil conditions, assessing crop health, and receiving data-driven recommendations that support sustainable agriculture and improved food production.
              </p>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-earth-600 dark:text-earth-400 hover:underline font-semibold">
                  GitHub
                </a>
                <a href="#" className="text-earth-600 dark:text-earth-400 hover:underline font-semibold">
                  LinkedIn
                </a>
                <a href="#" className="text-earth-600 dark:text-earth-400 hover:underline font-semibold">
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
