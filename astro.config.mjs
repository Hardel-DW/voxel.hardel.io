import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
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
    integrations: [tailwind(), react()],
    adapter: vercel({
        webAnalytics: { enabled: true }
    })
});
