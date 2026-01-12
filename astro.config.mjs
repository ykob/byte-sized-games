// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ykob.github.io',
  base: '/byte-sized-games',
  integrations: [react()],
  server: {
    host: true,
    port: 3000,
  },
});
