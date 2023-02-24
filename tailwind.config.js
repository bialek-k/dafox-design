module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backdrop: "rgb(0, 0, 0, .9)",
      },
      height: {
        1: "1px",
        88: "22rem",
        100: "26rem",
        128: "31rem",
        110: "28rem",
      },
      width: {
        110: "44rem",
      },
      dropShadow: {
        clg: "0 10px 0px rgba(234, 179, 8, 1)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
