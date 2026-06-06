/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#ede7d5',
          300: '#e0d5b7',
          400: '#d4c4a8',
          500: '#8b7355',
          600: '#6d5a47',
          700: '#563d32',
          800: '#42291f',
          900: '#2d1a0f',
        },
        earth: {
          50: '#f5f9f0',
          100: '#e8f2df',
          200: '#d0e5bb',
          300: '#a8ce7d',
          400: '#7fb551',
          500: '#5a9c2a',
          600: '#427d1e',
          700: '#326018',
          800: '#284813',
          900: '#1f360d',
        },
      },
      backgroundImage: {
        'gradient-soil': 'linear-gradient(135deg, #f5f1e8 0%, #faf8f3 25%, #e8f2df 50%, #d0e5bb 100%)',
        'gradient-dark-soil': 'linear-gradient(135deg, #2d1a0f 0%, #42291f 25%, #284813 50%, #1f360d 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
