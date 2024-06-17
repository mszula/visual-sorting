import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      sourceType: 'module',
      ecmaVersion: 2022,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        parser: tsParser,
      },
    },
    processor: 'svelte/svelte',
    rules: {
      'no-undef': 'off',
      'svelte/sort-attributes': 'warn',
    },
  }
);
