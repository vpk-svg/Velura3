import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      colors: {
        "brand-teal-deep": "rgb(var(--brand-primary))",
        "brand-teal-mid": "rgb(var(--brand-primary-mid))",
        "brand-teal-light": "rgb(var(--brand-primary-light))",
        "brand-teal-mist": "rgba(var(--brand-primary), 0.05)",
        "brand-gold": "rgb(var(--brand-accent))",
        "brand-gold-light": "rgb(var(--brand-accent-light))",
        "brand-gold-shimmer": "rgba(var(--brand-accent), 0.2)",
        "brand-ivory": "rgb(var(--brand-bg))",
        "brand-charcoal": "rgb(var(--brand-text-body))",
        "brand-surface": "rgb(var(--brand-surface))",
        "brand-border": "rgb(var(--brand-border))",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        label: ["var(--font-cinzel)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
