module.exports = {
  // ... other ESLint config options ...
  parser: '@typescript-eslint/parser',
  plugins: [
    // ... other plugins ...
    'import',
  ],
  rules: {
    // ... other rules ...
    'import/no-relative-parent-imports': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
