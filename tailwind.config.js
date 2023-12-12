// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      // Mobile screen is default, so not defined
      tablet: "768px",
      desktop: "1280px",
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily["sans"]],
    },
    colors: {
      darkblue: {
        // KSR - Mørkblå
        DEFAULT: "#0F243F", // 100%
        60: "#6F7C8C",
        30: "#B7BDC5",
        10: "#E7E9EC",
      },
      purple: {
        // KSR - Blålilla
        DEFAULT: "#354169", // 100%
        60: "#868DA5",
        30: "#C2C6D2",
        10: "#EBECF0",
      },
      beige: {
        // KSR - Beige
        DEFAULT: "#E8E5C6", // 100%
        60: "#F1EFDD",
        30: "#F8F7EE",
        10: "#FDFCF9",
      },
      gray: {
        // KSR - Varmgrå
        DEFAULT: "#B4B3B4", // 100%
        60: "#D2D1D2",
        30: "#E9E8E9",
        20: "#F0F0F0",
        10: "#F7F7F7",
      },
      white: {
        DEFAULT: "#FFF",
      },
      gold: {
        DEFAULT: " #CECA9C",
      },
    },
    extend: {
      backgroundImage: {
        "hero-1": "url('../../public/images/frontpage/1.png')",
      },
      fontSize: {
        mini: "0.625rem", // 10px, 0.125rem smaller than "xs"
      },
      spacing: {
        // 13: "3.25rem",
        // 15: "3.75rem",
        100: "30rem",
        128: "32rem",
        144: "36rem",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))", // Simple 16 column grid
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["even", "odd"],
      visibility: ["hover", "focus", "group-hover"],
      display: ["hover", "focus"],
    },
    outline: ["focus"],
    ringWidth: ["hover", "active"],
    ringColor: ["focus"],
  },
  plugins: [require("@tailwindcss/forms")],
};
