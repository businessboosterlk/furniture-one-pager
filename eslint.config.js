// ESLint flat config: recommended JS and TypeScript rules plus the Astro plugin.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'crew/', 'storyboard/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly', URL: 'readonly' } },
  },
  {
    // Browser scripts served from public/ (menu and hero scroll).
    files: ['public/*.js'],
    languageOptions: { globals: { window: 'readonly', document: 'readonly', Element: 'readonly', Node: 'readonly' } },
  },
];
