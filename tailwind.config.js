const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#73949b",
      secondary: "#80788E",
      bgPrimary: "#fcdcdb",
      bgSecondary: "#f0ecfc",
      homePrimary: "#57606F", //gray blue 4a626e
      homeSecondary: "#D3D3D3", //darkish black #D3D3D3 #4a626e
      customWhite: "#FFF",
    },
    extend: {
      fontFamily: {
        customFont: "Montserrat",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
