import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const uris = {
    production: "https://voxel.hardel.io/",
    development: "https://devvoxel.hardel.io/",
    staging: "https://stagingvoxel.hardel.io/",
    local: "http://localhost:4321/"
};
const site = uris[import.meta.env.VITE_ENVIRONMENT || "local"];

// https://astro.build/config
export default defineConfig({
    site: site,
    optimizeDeps: {
        include: ["react-compiler-runtime"]
    },
    image: {
        domains: ["https://voxel.hardel.io/", "https://devvoxel.hardel.io/", "https://lh3.googleusercontent.com/"]
    },
    output: "server",
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        react(),
        mdx(),
        sitemap({
            filter: (page) => {
                const url = new URL(page);
                const excludedPaths = ["403", "404", "transaction", "tools/studio", "tools/sound", "foo"];
                return !excludedPaths.some((path) => url.pathname.includes(path));
            },
            i18n: {
                defaultLocale: "en-us",
                locales: {
                    "en-us": "en-US",
                    "fr-fr": "fr-FR"
                }
            }
        })
    ],
    adapter: vercel({
        webAnalytics: { enabled: true }
    })
});
