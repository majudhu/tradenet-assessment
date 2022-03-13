const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '6rem',
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: colors.neutral,
      green: '#23B520',
      red: colors.red,
      blue: {
        200: '#f2f9fe',
        400: '#007ad2',
        600: '#0E6AAD',
        800: '#003962',
      },
    },
    extend: {},
  },
  plugins: [],
};
