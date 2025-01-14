module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: [
    'public',
    'webpack.config.ts',
  ],
  rules: {
    'import/no-cycle': ['off'],
  },
};
