/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#900A20',
        secondary: '#F6F6FB',
      },
    },
  },
  plugins: [],
};
