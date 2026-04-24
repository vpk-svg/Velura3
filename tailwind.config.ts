import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Colour Tokens: Warm Luxury Clinic ────────────── */
      colors: {
        // Base Palette - Warm Linen & Espresso
        clinic: {
          linen: "#EDE3D5",    // Global background - warm linen cream
          espresso: "#6B4226", // Primary text & borders - deep espresso warm brown
          taupe: "#A89080",    // Mid-tone taupe for secondary elements
          sand: "#D4C4B0",     // Muted sand for subtle highlights
          parchment: "#F5EDE0", // Lighter cream for cards/sections
          deep: "#4A2E1A",     // Deepest brown for emphasis
        },
        // Semantic Mappings
        primary: "#6B4226",     // clinic-espresso
        "primary-light": "#8B6246",
        "primary-dark": "#4A2E1A",
        secondary: "#6B4226",   // Same as primary for monochromatic
        "secondary-deep": "#4A2E1A",
        ivory: "#F5EDE0",       // clinic-parchment
        "background-light": "#EDE3D5", // clinic-linen
        "background-dark": "#4A2E1A",
        "surface": "#F5EDE0",
        "surface-elevated": "#FAF5EB",
        "border-subtle": "rgba(107, 66, 38, 0.1)",
        "page-fillers": "#F5EDE0",  // Warm parchment for treatment page sections
        "page-medicatie": "#EDE3D5", // Linen for medicatie page sections
        "mint": "#E8F5EE",      // Kept for specific medical contexts
        "rose-soft": "#FDF2F2", // Kept for specific medical contexts
        "amber-soft": "#FEF9EC", // Kept for specific medical contexts
        "champagne": "#D4C4B0", // clinic-sand
      },

      /* ── Typography ────────────────────────────────── */
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-pinyon)", "cursive"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.85rem, 4vw, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.35rem, 2.5vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        "ultra-wide": "0.25em",
        "airy": "0.15em",
        "wide-caps": "0.2em",
      },

      /* ── Spacing ────────────────────────────── */
      spacing: {
        "section-y": "clamp(6rem, 12vw, 10rem)",
      },

      /* ── Border-radius – Organic & Soft ─────────────── */
      borderRadius: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        pill: "9999px",
      },

      /* ── Shadows – Minimal & Airy, Warm Tones ─────────── */
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(107, 66, 38, 0.04)",
        "soft-md": "0 12px 32px -4px rgba(107, 66, 38, 0.06)",
        "soft-lg": "0 20px 48px -8px rgba(107, 66, 38, 0.08)",
        "soft-xl": "0 32px 64px -12px rgba(107, 66, 38, 0.12)",
        "warm-glow": "0 8px 24px -4px rgba(107, 66, 38, 0.15)",
      },

      /* ── Max-widths ────────────────────────────────── */
      maxWidth: {
        container: "85rem",
      },

      /* ── z-index ──────────────────── */
      zIndex: {
        base: "100",
        floating: "200",
        overlay: "300",
        nav: "400",
        top: "9999",
      },

      /* ── Transition Timing ─────────────────────────── */
      transitionTimingFunction: {
        premium: "cubic-bezier(0.23, 1, 0.32, 1)",
      },

      /* ── Keyframes & Animations ────────────────────── */
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-up": {
          "0%": { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        }
      },
      animation: {
        shimmer: "shimmer 3s infinite",
        "fade-in": "fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "reveal-up": "reveal-up 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;