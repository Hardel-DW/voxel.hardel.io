import {defineConfig} from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://voxel.hardel.io/",
    image: ['https://lh3.googleusercontent.com/'],
    output: "server",
    integrations: [tailwind(), react()],
    adapter: vercel()
});