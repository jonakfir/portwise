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
        navy: {
          DEFAULT: "#030B1A",
          50: "#0A1628",
          100: "#0D1D35",
          200: "#132847",
          300: "#1A3459",
          400: "#21416B",
          500: "#284E7D",
          600: "#3A6699",
          700: "#5580B0",
          800: "#7A9EC5",
          900: "#A8C0DB",
        },
        orange: {
          DEFAULT: "#FF5C1A",
          50: "#FFF0EB",
          100: "#FFD9CC",
          200: "#FFB399",
          300: "#FF8D66",
          400: "#FF7440",
          500: "#FF5C1A",
          600: "#E54D0F",
          700: "#CC3F08",
          800: "#993005",
          900: "#662003",
        },
        ice: {
          DEFAULT: "#A8D8EA",
          50: "#EBF5FA",
          100: "#D6ECF5",
          200: "#C2E3F0",
          300: "#A8D8EA",
          400: "#7CC4DE",
          500: "#50B0D2",
          600: "#2E97BE",
          700: "#237A9C",
          800: "#195D7A",
          900: "#104058",
        },
      },
      fontFamily: {
        sans: [
          "Aktiv Grotesk",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["Roboto Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(168, 216, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 216, 234, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "count-up": "countUp 1.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
