/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4ED',
          100: '#FED7AA',
          200: '#FDB385',
          300: '#FC8F60',
          400: '#FB6B3B',
          500: '#FF7010', // Main brand orange
          600: '#E6500E',
          700: '#CC400C',
          800: '#B3300A',
          900: '#992008',
        },
        background: '#FFFAF6', // Light cream background
        foreground: '#171717',
        accent: {
          50: '#FFFAF6',
          100: '#FFF4ED',
          200: '#FED7AA',
          300: '#FC8F60',
          400: '#FF7010',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
