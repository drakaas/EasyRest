/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out'
      },
      colors: {
        primary: {
          600: '#3B82F6',
          700: '#2563EB',
        },
        // Ensure all color variants are available
        red: {
          100: '#FEE2E2',
          600: '#DC2626',
        },
        amber: {
          100: '#FEF3C7',
          600: '#D97706',
        },
        green: {
          100: '#D1FAE5',
          600: '#059669',
        },
        blue: {
          100: '#DBEAFE',
          600: '#2563EB',
        },
        purple: {
          100: '#EDE9FE',
          600: '#7C3AED',
        },
        pink: {
          100: '#FCE7F3',
          600: '#DB2777',
        },
        orange: {
          100: '#FFEDD5',
          600: '#EA580C',
        },
        teal: {
          100: '#CCFBF1',
          600: '#0D9488',
        },
        indigo: {
          100: '#E0E7FF',
          600: '#4F46E5',
        },
        gray: {
          100: '#F3F4F6',
          600: '#4B5563',
        }
      }
    },
  },
  plugins: [],
}