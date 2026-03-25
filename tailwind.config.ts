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
        "brand-teal-deep": "#0A2E2E",
        "brand-teal-mid": "#0D4A47",
        "brand-teal-light": "#1A7A72",
        "brand-teal-mist": "#E8F4F3",
        "brand-gold": "#C9A84C",
        "brand-gold-light": "#E8C96A",
        "brand-gold-shimmer": "#F7E8B0",
        "brand-ivory": "#FAF7F2",
        "brand-charcoal": "#1C1C1C",
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
