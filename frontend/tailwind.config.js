/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      colors: {
        main: {
          100: '#E5FCD6',
          200: '#A7DA85',
          300: '#406A24',
        },
        gray: {
          50: '#406A24',
          100: '#E6E6E6',
          200: '#CDCDCD',
          300: '#ADADAD',
          400: '#8B8B8B',
          500: '#686868',
          600: '#4A4A4A',
          700: '#2D2D2D',
          800: '#0B0B0B',
        },
      },
    },
  },
  plugins: [],
};
