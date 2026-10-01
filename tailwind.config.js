/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0f",
        cream: "#f6f1e7",
        sky: "#a8d5ff",
        blush: "#f7c6d0",
        peach: "#ffb38a",
        lilac: "#cbb6f8",
        mint: "#b8e0d2",
        sun: "#ffe566",
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
      borderWidth: {
        3: "3px", // Permet d'utiliser border-3 dans le JSX
      },
      boxShadow: {
        hard: "4px 4px 0 0 #0f0f0f",
        "hard-sm": "2px 2px 0 0 #0f0f0f",
      },
    },
  },
  plugins: [],
};