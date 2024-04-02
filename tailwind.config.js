/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        1: "#1663B1",
        2: "#289EDB",
        3: "#93CFED",
      },
      secondary: {
        1: "#F89726",
        2: "#FEBF70",
        3: "#FFDFB8",
      },
      gray: "#5F6368",
      white: "#FFFFFF",
      black: "#1F1F1F",
    },
    extend: {},
  },
  plugins: [],
};
