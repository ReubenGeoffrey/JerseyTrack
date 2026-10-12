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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        sale: "var(--sale)",
        spider: {
          crimson: "#e11d48",
          neon: "#ff1744",
          black: "#07080c",
          card: "#0f1118",
          blue: "#00b4d8",
        },
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
      boxShadow: {
        "spider-glow": "0 0 20px rgba(225, 29, 72, 0.45)",
        "spider-glow-lg": "0 0 35px rgba(225, 29, 72, 0.65)",
      },
    },
  },
  plugins: [],
};

export default config;
