import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactConfigJSX from 'eslint-plugin-react/configs/jsx-runtime.js';
import { fixupConfigRules } from '@eslint/compat';
import pluginPrettier from 'eslint-config-prettier';
import pluginVitest from 'eslint-plugin-vitest';
import pluginVitestGlobals from 'eslint-plugin-vitest-globals';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(pluginReactConfigJSX),
  pluginPrettier,
  pluginVitest.configs.recommended,
  { languageOptions: { globals: pluginVitestGlobals.environments.env.globals } },
  { settings: { react: { version: 'detect' } } },
  {
    ignores: ["dist/**", "example/build/**"]
  },
  {
    files: ["example/src/**"],
    rules: {
      "react/prop-types": "off",
    },
  },
];
