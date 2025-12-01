import type { Config } from "tailwindcss";

// Aceternity UI plugin
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/aceternity-ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TaskFlow Custom Colors
        "navy": "#001a4d", // Navy Blue (Azul Marinho)
        "baby-blue": "#87ceeb", // Baby Blue (Azul Bebê)
        "crimson": "#dc143c", // Crimson Red (Vermelho)
        
        // Primary and Secondary
        primary: "#001a4d", // Navy Blue
        secondary: "#87ceeb", // Baby Blue
        accent: "#dc143c", // Crimson Red
        background: "#FFFFFF", // White
        
        // Extended palette
        "navy-dark": "#000d26",
        "navy-light": "#1a3a66",
        "baby-blue-light": "#b0dff5",
        "baby-blue-dark": "#5ba8d1",
        "crimson-light": "#ff1f4d",
        "crimson-dark": "#a80a2b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-navy-blue": "linear-gradient(135deg, #001a4d 0%, #1a3a66 100%)",
        "gradient-to-blue": "linear-gradient(135deg, #87ceeb 0%, #5ba8d1 100%)",
      },
    },
  },
  plugins: [
    addVariablesForColors
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
