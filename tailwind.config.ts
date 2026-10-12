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
        background: "#07080c",
        foreground: "#f4f5f9",
        card: {
          DEFAULT: "#0f1118",
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#ff1744", // Electric Spider-Crimson Red
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#161824",
          foreground: "#f4f5f9",
        },
        muted: {
          DEFAULT: "#11131c",
          foreground: "#8e93a6",
        },
        border: "#222638",
        sale: "#ff2a5f",
        spider: {
          red: "#ff1744",
          crimson: "#e11d48",
          darkRed: "#9f1239",
          neon: "#ff003c",
          blue: "#00e5ff",
          dark: "#07080c",
          card: "#0f1118",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-bodoni)", "Didot", "Bodoni MT", "serif"],
        display: ["var(--font-bodoni)", "Didot", "Bodoni MT", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        wider: "0.15em",
        tight: "-0.02em",
        tighter: "-0.04em",
      },
      boxShadow: {
        "spider-glow": "0 0 20px rgba(255, 23, 68, 0.45)",
        "spider-glow-lg": "0 0 35px rgba(255, 23, 68, 0.75)",
        "spider-blue": "0 0 20px rgba(0, 229, 255, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
