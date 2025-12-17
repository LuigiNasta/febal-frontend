/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",     // Se usi pages (opzionale)
    "./components/**/*.{js,ts,jsx,tsx}" // Componenti
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
