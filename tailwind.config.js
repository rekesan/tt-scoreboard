/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./{app,features}/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
