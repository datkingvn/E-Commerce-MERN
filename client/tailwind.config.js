/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Poppins', 'sans-serif']
      },
      width: {
        'main': '1278px'
      },
      colors: {
        main: '#EF3131'
      }
    },
  },
  plugins: [],
}