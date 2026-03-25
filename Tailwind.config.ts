import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand red ──────────────────────────────────────────────── */
        primary: {
          50:  "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FF6B6B",
          500: "#FA5252",
          600: "#E03131",   // main CTA
          700: "#C92A2A",   // hover
          800: "#B02525",
          900: "#7B1D1D",
        },
        /* ── Neutral surface ────────────────────────────────────────── */
        surface: {
          DEFAULT: "#FFFFFF",
          bg:      "#F7F7F8",
          50:      "#FAFAFA",
          100:     "#F4F4F5",
          200:     "#E4E4E7",
          border:  "#E9E9EC",
        },
        /* ── Zinc text scale ────────────────────────────────────────── */
        ink: {
          900: "#18181B",
          700: "#3F3F46",
          500: "#71717A",
          300: "#A1A1AA",
          200: "#D4D4D8",
          100: "#F4F4F5",
        },
        /* ── Glucose semantic ───────────────────────────────────────── */
        glucose: {
          low:      "#3B82F6",
          normal:   "#16A34A",
          high:     "#D97706",
          critical: "#E03131",
        },
        /* ── Risk ───────────────────────────────────────────────────── */
        risk: {
          low:    "#16A34A",
          medium: "#D97706",
          high:   "#E03131",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        card: "14px",
        xl:   "14px",
        "2xl":"18px",
      },
      boxShadow: {
        card:    "0 0 0 1px rgb(0 0 0 / 0.04), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
        "card-md": "0 0 0 1px rgb(0 0 0 / 0.04), 0 4px 12px 0 rgb(0 0 0 / 0.08)",
        focus:   "0 0 0 3px rgb(224 49 49 / 0.18)",
      },
      animation: {
        "fade-in":   "page-enter 300ms cubic-bezier(0.4,0,0.2,1) both",
        "slide-up":  "slide-up 220ms cubic-bezier(0.4,0,0.2,1) both",
        "pulse-slow":"pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;