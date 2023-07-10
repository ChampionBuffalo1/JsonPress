/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{jsx,tsx,mdx}",
    "./src/components/**/*.{jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("tailwindcss-animate")],
};
