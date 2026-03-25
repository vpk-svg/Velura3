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
        "primary": "#c6a65d",
        "secondary": "#3B2A23",
        "background-light": "#FDFCF0",
        "background-dark": "#1e1b14",
        "brand-gold": "#c6a65d",
        "brand-gold-light": "#d8b56f", // derived lighter version
        "brand-teal-deep": "#1e1b14", // mapped to background dark for backward compat
        "brand-teal-mid": "#3B2A23",  // mapped to secondary for backward compat
        "brand-ivory": "#FDFCF0",     // mapped to background light
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
