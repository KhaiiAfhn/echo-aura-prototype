/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        card: "#0f1115",
        neonBlue: "#00f2ff",
        neonRed: "#ff0055",
        glass: "rgba(255, 255, 255, 0.03)",
      },
    },
  },
  plugins: [],
}