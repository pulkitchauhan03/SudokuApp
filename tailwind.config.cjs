/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '144': '36rem',
        '0.75': '3px',
      },
      outlineOffset: {
        'n3': '-3px',
      },
    },
  },
  plugins: [],
}
