import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        line: "var(--line)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: {
        glow: "0 24px 80px -30px rgba(15, 51, 91, 0.45)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 15% 20%, rgba(15, 129, 255, 0.2), transparent 40%), radial-gradient(circle at 80% 0%, rgba(9, 187, 140, 0.2), transparent 35%), linear-gradient(180deg, #f6fbff 0%, #fdfbf7 100%)"
      }
    }
  },
  plugins: []
};

export default config;
