import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0b0d13",
        foreground: "#f3f5f8",
        card: {
          DEFAULT: "#15181f",
          foreground: "#f3f5f8",
        },
        primary: {
          DEFAULT: "#aaff22", // Electric neon lime
          foreground: "#0d1406",
        },
        secondary: {
          DEFAULT: "#23262e",
          foreground: "#f3f5f8",
        },
        muted: {
          DEFAULT: "#1e2229",
          foreground: "#979fab",
        },
        border: "#2c3039",
        input: "#1e2330",
        sale: "#ff8443", // Distinct discount color
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.15em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
