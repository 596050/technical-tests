/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#1B73E8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
