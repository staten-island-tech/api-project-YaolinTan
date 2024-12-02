/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cedarville: ["Cedarville Cursive", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
