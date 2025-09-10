// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  // Apply Expo's recommended settings
  ...expoConfig,

  // Add your custom plugins and rules
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".expo",
      "android",
      "ios"
    ],
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'no-console': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Apply Prettier's rules. This must be the LAST item.
  prettierConfig,
]);