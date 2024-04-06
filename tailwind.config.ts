import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    screens: {
      s: "420px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        header: {
          translucent: "#18181bcc",
          cloudy: "#151418",
        },
        content: "#38373f66",
      },
      animation: {
        levitate: "levitate 5s ease-in-out infinite",
        fadein: "fadein 0.2s ease-in",
      },
      keyframes: {
        levitate: {
          "0%": { transform: "translateY(-1.5rem)" },
          "50%": { transform: "translateY(1.5rem)" },
          "100%": { transform: "translateY(-1.5rem)" },
        },
        fadein: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
