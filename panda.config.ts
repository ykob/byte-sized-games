import { defineConfig } from '@pandacss/dev';
import { extendableTheme } from 'panda';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}', './pages/**/*.{ts,tsx,js,jsx,astro}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: extendableTheme,
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
