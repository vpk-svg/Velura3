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
        // Base Palette
        clinic: {
          beige: "#F8F5F2", // Global background - soft warm cream
          taupe: "#4A4440", // Primary text & borders - deep muted taupe
          sand: "#FEFBF9", // Cards & Sections - pale sand/ivory
          gold: "#D4AF37", // Metallic gold highlights
          champagne: "#E7DCD0", // Soft secondary highlighting
          mocha: "#6B5E55", // Deep accent
          clay: "#B8A99A", // Muted secondary
        },
        // Semantic Mappings
        primary: "#D4AF37", // clinic-gold
        "primary-light": "#E0C56E",
        "primary-dark": "#B08D2F",
        secondary: "#4A4440", // clinic-taupe
        "secondary-deep": "#35302D",
        ivory: "#FEFBF9", // clinic-sand
        "background-light": "#F8F5F2", // clinic-beige
        "background-dark": "#35302D",
        "surface": "#FEFBF9",
        "surface-elevated": "#FFFFFF",
        "border-subtle": "rgba(74, 68, 64, 0.08)",
        "mint": "#E8F5EE",
        "rose-soft": "#FDF2F2",
        "amber-soft": "#FEF9EC",
        "champagne": "#E7DCD0",
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

      /* ── Shadows – Minimal & Airy ─────────── */
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(74, 68, 64, 0.03)",
        "soft-md": "0 12px 32px -4px rgba(74, 68, 64, 0.05)",
        "soft-lg": "0 20px 48px -8px rgba(74, 68, 64, 0.08)",
        "soft-xl": "0 32px 64px -12px rgba(74, 68, 64, 0.12)",
        "gold-glow": "0 8px 24px -4px rgba(212, 175, 55, 0.2)",
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
        premium: "cubic-bezier(0.23, 1, 0.32, 1)", // More breathable ease
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
