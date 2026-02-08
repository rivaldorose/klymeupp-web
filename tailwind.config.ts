import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e9208f",
          dark: "#c21575",
          light: "#ff4db2",
          50: "#fef1f8",
          100: "#fde6f3",
          200: "#fccce7",
          300: "#fba3d3",
          400: "#f76ab5",
          500: "#e9208f",
          600: "#d41a7f",
          700: "#b21266",
          800: "#930f54",
          900: "#7a1148",
        },
        navy: {
          DEFAULT: "#1A1A2E",
          light: "#2a2a4a",
          dark: "#0f0f1e",
        },
        background: {
          light: "#f8f6f7",
          dark: "#21111a",
          darker: "#1a0d15",
        },
        surface: {
          light: "#ffffff",
          muted: "#f4f0f2",
          dark: "#2d1a26",
          darker: "#3d2a36",
        },
        text: {
          primary: "#181115",
          secondary: "#5e4554",
          muted: "#886377",
          inverse: "#ffffff",
        },
        border: {
          light: "#e5dce1",
          dark: "#3d2a35",
        },
        success: {
          DEFAULT: "#2cc069",
          light: "#4ade80",
        },
        warning: {
          DEFAULT: "#ff9f43",
          light: "#fbbf24",
        },
        info: {
          DEFAULT: "#40a9ff",
        },
        gold: {
          DEFAULT: "#FFD700",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        partner: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 20px 5px rgba(233, 32, 143, 0.4)",
        "glow-sm": "0 0 10px 2px rgba(233, 32, 143, 0.3)",
        card: "0 4px 20px rgba(233, 32, 143, 0.05)",
        "card-hover": "0 8px 30px rgba(233, 32, 143, 0.1)",
        duo: "0 4px 0 0 #c21575",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px 5px rgba(233, 32, 143, 0.2)" },
          "50%": { boxShadow: "0 0 30px 10px rgba(233, 32, 143, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
