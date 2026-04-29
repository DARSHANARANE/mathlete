/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        primary: "var(--primary)",   // ✅ added
        accent: "var(--accent)",
        litebg: "var(--litebg)",     // ✅ added
      },
    },
  },
  plugins: [],
};