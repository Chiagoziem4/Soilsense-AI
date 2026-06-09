import React from 'react';
import { useRouter } from 'next/router';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  color: 'earth' | 'soil' | 'green';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  buttonText,
  href,
  color,
}) => {
  const router = useRouter();

  const colorClasses = {
    earth: 'from-earth-500 to-earth-600 hover:from-earth-600 hover:to-earth-700',
    soil: 'from-soil-600 to-soil-700 hover:from-soil-700 hover:to-soil-800',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  };

  const borderClasses = {
    earth: 'border-earth-200 dark:border-earth-700',
    soil: 'border-soil-200 dark:border-soil-700',
    green: 'border-green-200 dark:border-green-700',
  };

  return (
    <div
      className={`card border-2 ${borderClasses[color]} hover:shadow-2xl transition-all duration-300 animate-slide-up cursor-pointer group`}
      onClick={() => router.push(href)}
    >
      {/* Icon */}
      <div className="text-5xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-earth-700 dark:group-hover:text-earth-300 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
        {description}
      </p>

      {/* Features */}
      <div className="mb-6 space-y-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-earth-600 dark:text-earth-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${colorClasses[color]} transition-all duration-300 transform group-hover:scale-105`}
        onClick={() => router.push(href)}
      >
        {buttonText}
        <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
};
