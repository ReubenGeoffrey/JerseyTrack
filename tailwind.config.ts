import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111111",
        cream: "#fbfbfa",
        canvas: "#f7f7f5",
        subtle: "#e8e8e6",
        border: "#e5e5e5",
        "border-subtle": "#f0f0f0",
        muted: "#737373",
        "muted-dark": "#404040",
        "muted-light": "#a3a3a3",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
      letterSpacing: {
        editorial: "0.22em",
        campaign: "0.18em",
        caps: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
