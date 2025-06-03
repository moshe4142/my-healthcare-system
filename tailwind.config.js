/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class", 
 content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseScale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        pulseScale: "pulseScale 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
