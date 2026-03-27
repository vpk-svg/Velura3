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

      /* ── Typography — 2 typefaces only ─────────────── */
      fontFamily: {
        sans:    ["var(--font-jost)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,6rem)",   { lineHeight: "0.9",  letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem,5vw,4rem)", { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem,2vw,1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },

      /* ── Spacing rhythm ────────────────────────────── */
      spacing: {
        "section-y": "clamp(5rem, 10vw, 8rem)",
      },

      /* ── Border-radius — 3 values only ─────────────── */
      borderRadius: {
        sm:   "0.375rem",
        md:   "0.75rem",
        pill:  "9999px",
      },

      /* ── Shadows – soft, diffused, layered ─────────── */
      boxShadow: {
        "soft-sm":   "0 2px 8px -2px rgba(59,42,35,0.05)",
        "soft-md":   "0 6px 24px -4px rgba(59,42,35,0.07)",
        "soft-lg":   "0 16px 40px -8px rgba(59,42,35,0.09)",
        "soft-xl":   "0 20px 50px -10px rgba(59,42,35,0.11)",
        "gold-glow": "0 12px 36px -8px rgba(198,166,93,0.30)",
      },

      /* ── Max-widths ────────────────────────────────── */
      maxWidth: {
        container: "80rem",
      },

      /* ── z-index — 5-step scale ────────────────────── */
      zIndex: {
        base:       "100",
        floating:   "200",
        overlay:    "300",
        nav:        "400",
        top:        "500",
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
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer:      "shimmer 2s infinite",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
