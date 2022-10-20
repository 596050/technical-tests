const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [],
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer,
    "postcss-preset-env",
    tailwindcss,
  ],
};
