import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
    theme: {
        screens: {
            s: "420px"
        },
        extend: {
            fontFamily: {
                sans: ["Inter"]
            },
            boxShadow: {
                s: "2px 2px 30px 2px #000"
            },
            gridTemplateColumns: {
                items: "repeat(auto-fill, minmax(120px, 1fr))"
            },
            backgroundImage: {
                grid: "linear-gradient(to right, #272727 1px, transparent 1px), linear-gradient(to bottom, #272727 1px, transparent 1px)"
            },
            colors: {
                modrinth: "#1bd96a",
                header: {
                    translucent: "#18181d6b",
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
                rainbow: "rainbow 10s linear infinite",
                shimmer: "shimmer 2s linear infinite",
                progress: "progress 5s linear"
            },
            keyframes: {
                shimmer: {
                    from: {
                        backgroundPosition: "0 0"
                    },
                    to: {
                        backgroundPosition: "-200% 0"
                    }
                },
                levitate: {
                    "0%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(1.5rem)" },
                    "100%": { transform: "translateY(0)" }
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
                progress: {
                    from: { transform: "scaleX(0)" },
                    to: { transform: "scaleX(1)" }
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
    }
} satisfies Config;
