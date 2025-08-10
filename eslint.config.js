import prettierConfig from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [...eslintPluginAstro.configs.recommended, prettierConfig];
