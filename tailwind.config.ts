import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
    theme: {
        screens: {
            s: "420px",
            ...defaultTheme.screens
        },
        extend: {
            fontFamily: {
                sans: ["Inter"]
            },
            boxShadow: {
                s: "2px 2px 30px 2px #000"
            },
            colors: {
                header: {
                    translucent: "#18181dcc",
                    cloudy: "#151418"
                },
                guides: {
                    gradient: {
                        from: "#0d0709",
                        to: "#151416"
                    }
                },
                card: "#1c1b1ec2",
                content: "#38373f33",
                background: "#080507"
            },
            hueRotate: {
                45: "45deg"
            },
            brightness: {
                20: ".2"
            },
            animation: {
                levitate: "levitate 5000ms ease-in-out infinite",
                fadein: "fadein 200ms ease-in",
                open: "open 150ms ease-in-out forwards",
                rainbow: "rainbow 10s linear infinite"
            },
            keyframes: {
                levitate: {
                    "0%": { transform: "translateY(-1.5rem)" },
                    "50%": { transform: "translateY(1.5rem)" },
                    "100%": { transform: "translateY(-1.5rem)" }
                },
                open: {
                    from: {
                        opacity: "0",
                        transform: "translateY(-10px)"
                    },
                    to: {
                        opacity: "1",
                        transform: "translateY(0)"
                    }
                },
                fadein: {
                    from: { opacity: "0" },
                    to: { opacity: "1" }
                },
                rainbow: {
                    from: {
                        filter: "hue-rotate(0deg)"
                    },
                    to: {
                        filter: "hue-rotate(360deg)"
                    }
                }
            }
        }
    },
    plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")]
} satisfies Config;
