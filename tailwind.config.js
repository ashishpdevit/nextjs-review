/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif']
      }
    },
  },
  plugins: [
    // require("@tailwindcss/typography")
  ],
}

