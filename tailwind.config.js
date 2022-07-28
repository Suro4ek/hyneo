/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'tab-card': 'rgba(255,255,255,.05)',
        'tab-card-hover': 'rgba(79,57,113,.51)'
      }
    },
  },
  plugins: [],
}