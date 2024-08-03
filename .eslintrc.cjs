/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    'no-trailing-spaces': ['error'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always', { omitLastInOneLineBlock: true }],
    'jsx-quotes': ['error', 'prefer-single'],
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        'jsx-quotes': ['error', 'prefer-double'],
      }
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'jsx-quotes': ['error', 'prefer-single'],
      },
    },
  ],
};