import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://devvoxel.hardel.io/",
    image: {
        domains: ["https://voxel.hardel.io/", "https://devvoxel.hardel.io/", "https://lh3.googleusercontent.com/"]
    },
    output: "server",
    integrations: [tailwind(), react()],
    adapter: vercel()
});
