import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Colour Tokens ─────────────────────────────── */
      colors: {
        primary:            "#c6a65d",
        "primary-light":    "#d8b56f",
        "primary-dark":     "#a68b4c",
        secondary:          "#3B2A23",
        "secondary-deep":   "#1e1b14",
        ivory:              "#FDFCF0",
        "background-light": "#FDFCF0",
        "background-dark":  "#1e1b14",

      },

      /* ── Typography ────────────────────────────────── */
      fontFamily: {
        sans:    ["var(--font-jost)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        label:   ["var(--font-cinzel)", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,10rem)",  { lineHeight: "0.9",  letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem,6vw,8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem,4vw,5rem)",   { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem,3vw,3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },

      /* ── Spacing rhythm ────────────────────────────── */
      spacing: {
        "section-y": "clamp(5rem, 12vw, 10rem)",
      },

      /* ── Border-radius tokens ──────────────────────── */
      borderRadius: {
        card:  "2.5rem",
        pill:  "9999px",
        panel: "3rem",
      },

      /* ── Shadows – soft, diffused, premium ─────────── */
      boxShadow: {
        "soft-sm":   "0 2px 12px -2px rgba(59,42,35,0.06)",
        "soft-md":   "0 8px 30px -4px rgba(59,42,35,0.08)",
        "soft-lg":   "0 20px 50px -8px rgba(59,42,35,0.10)",
        "soft-xl":   "0 25px 65px -10px rgba(59,42,35,0.12)",
        "gold-glow": "0 15px 45px -10px rgba(198,166,93,0.35)",
      },

      /* ── Max-widths (single consistent container) ──── */
      maxWidth: {
        container: "80rem",
      },

      /* ── z-index tokens ───────────────────────────── */
      zIndex: {
        nav:        "1000",
        cursor:     "9998",
        "cursor-dot": "9999",
      },

      /* ── Transition timing ─────────────────────────── */
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      /* ── Keyframes & animations ────────────────────── */
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer:      "shimmer 2s infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
