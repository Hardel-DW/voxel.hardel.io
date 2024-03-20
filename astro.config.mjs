import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://voxel.hardel.io/",
  output: "server",
  integrations: [tailwind(), db()],
  adapter: vercel()
});