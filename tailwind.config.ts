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
        navy: "#0D1F3C",
        red: "#C0152A",
        border: "#E0E0E0",
        hover: "#fafafa",
      },
      fontFamily: {
        display: ["'Arial Black'", "Arial Black", "Arial", "sans-serif"],
        body: ["Arial", "Helvetica", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
