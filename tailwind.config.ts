import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NOTGATE Premium Construction Palette — Deep Burgundy & Construction Orange
        burgundy: {
          DEFAULT: "#6B0015",
          dark: "#4A0010",
          darker: "#2D0009",
          light: "#8A0020",
          muted: "rgba(107, 0, 21, 0.85)",
          dim: "rgba(107, 0, 21, 0.6)",
        },
        orange: {
          DEFAULT: "#F26A21",
          dark: "#D45A18",
          light: "#FF7A35",
          muted: "rgba(242, 106, 33, 0.85)",
          dim: "rgba(242, 106, 33, 0.15)",
          glow: "rgba(242, 106, 33, 0.08)",
        },
        warm: {
          DEFAULT: "#F8F5F2",
          muted: "#F3ECE7",
          dim: "rgba(248, 245, 242, 0.08)",
        },
        surface: {
          DEFAULT: "#1A0A0E",
          elevated: "#240D12",
          card: "#2A1016",
          border: "rgba(242, 106, 33, 0.12)",
        },
        // Legacy mappings for backward compatibility
        primary: "#F26A21",
        secondary: "#6B0015",
        accent: "#F26A21",
        background: "#6B0015",
        dark: "#4A0010",
        text: "#F8F5F2",
        cards: "#2A1016",
        border: "rgba(242, 106, 33, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 32px rgba(0,0,0,0.35)",
        "card-hover": "0 8px 48px rgba(0,0,0,0.45)",
        nav: "0 4px 24px rgba(0,0,0,0.4)",
        subtle: "0 2px 16px rgba(0,0,0,0.2)",
        orange: "0 0 24px rgba(242,106,33,0.25)",
        "orange-lg": "0 0 40px rgba(242,106,33,0.2)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "burgundy-gradient": "linear-gradient(180deg, #6B0015 0%, #4A0010 100%)",
        "dark-gradient": "linear-gradient(180deg, #4A0010 0%, #2D0009 100%)",
      },
    },
  },
  plugins: [],
};

export default config;