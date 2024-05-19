/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
          primary : "#7a08cc",
          secondary : "#9b5aff"
      }
    },
  },
  plugins: [],
}