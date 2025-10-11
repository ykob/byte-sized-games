import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  }),
  globalIgnores(['.astro/*', 'dist/*', 'node_modules/*', 'styled-system/*']),
];
