// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://ykob.github.io',
  base: '/byte-sized-games',
  integrations: [react()],
  server: {
    host: true,
    port: 3000,
  },
  vite: {
    plugins: [
      ViteImageOptimizer({
        jpeg: {
          quality: 80,
        },
        jpg: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        svg: {},
        webp: {
          lossless: true,
        },
      }),
    ],
  },
});
