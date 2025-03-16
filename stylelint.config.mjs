/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'color-hex-length': 'long',
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-class-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
  },
};
