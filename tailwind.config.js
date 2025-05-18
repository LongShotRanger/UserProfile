/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ihYellow: '#ffcc00', // use any name you prefer
        ihYellowDark: '#a68500',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // <-- add this line to enable class-based dark mode
}