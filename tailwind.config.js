/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {},
    colors: {
      yellow: "#FBB02D",
      black: "#280003",
      white: "#FFF",
      magenta: "#EA3788",
      "light-gray": "#EEE5E9",
      "light-pink": "#FFD3E7",
      blue: "#2E86DE",
      danger: "#EE5253",
      purple: "#5C3BA3",
      green: "#1DD1A1"
    },
    fontFamily: {
      serif: ["Inria", "Playfair Display", "serif"],
      sans: ["Quicksand", "Poppins", "sans-serif"],
      body: ["Quicksand", "Poppins", "sans-serif"]
    }
  },
  plugins: [],
};
