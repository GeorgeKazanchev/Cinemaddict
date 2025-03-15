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
    ecmaVersion: 2020,
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: [
    'backend',
    'public',
    'webpack.config.ts',
  ],
  rules: {
    'class-methods-use-this': ['off'],
    'import/no-cycle': ['off'],
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true,
      },
    ],
    'no-underscore-dangle': ['off'],
    '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/lines-between-class-members': ['off'],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
      },
    ],
    '@typescript-eslint/unbound-method': [
      'error',
      {
        'ignoreStatic': true,
      },
    ],
  },
};
