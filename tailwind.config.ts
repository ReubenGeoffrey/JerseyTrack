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
        background: "#ffffff",
        foreground: "#0a0a0a",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0a0a0a",
        },
        primary: {
          DEFAULT: "#000000", // Zara bold black
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f5f5f5",
          foreground: "#111111",
        },
        muted: {
          DEFAULT: "#fafafa",
          foreground: "#737373",
        },
        border: "#e5e5e5",
        input: "#ffffff",
        sale: "#b91c1c", // High-fashion refined crimson
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-bodoni)", "Didot", "Bodoni MT", "serif"],
        display: ["var(--font-bodoni)", "Didot", "Bodoni MT", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        wider: "0.15em",
        tight: "-0.02em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
