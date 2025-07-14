/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meesho: {
          primary: '#FF6B6B',
          secondary: '#4ECDC4',
          accent: '#45B7D1',
          yellow: '#FFE66D',
          purple: '#A8E6CF',
          pink: '#FF8B94',
          orange: '#FFA07A',
          light: '#F8F9FA',
          dark: '#2C3E50'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
} 