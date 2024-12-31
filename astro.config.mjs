import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
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
    image: {
        domains: ["https://voxel.hardel.io/", "https://devvoxel.hardel.io/", "https://lh3.googleusercontent.com/"]
    },
    output: "server",
    i18n: {
        defaultLocale: "en-us",
        locales: ["en-us", "fr-fr"],
        routing: {
            prefixDefaultLocale: false
        }
    },
    vite: {
        plugins: [tailwindcss()],
        build: {
            minify: false
        }
    },
    integrations: [react(), mdx()],
    adapter: vercel({
        webAnalytics: { enabled: true },
        excludeFiles: [
            "./src/pages/[lang]/internal/**/*",
            "./src/pages/[lang]/guides/**/*",
            "./src/pages/[lang]/tools/sound.astro",
            "./src/pages/[lang]/tools/studio.astro",
            "./src/content/guide/**/*",
            "./src/content/article/**/*"
        ]
    })
});
