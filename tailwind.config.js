/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b6',
          300: '#e9bb87',
          400: '#df9656',
          500: '#d77a35',
          600: '#c9632b',
          700: '#a74c26',
          800: '#863e25',
          900: '#6d3421',
        },
        neutral: {
          850: '#1f2328',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}