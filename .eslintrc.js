module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-unused-expressions': 'off',
    'no-console': 'off',
    'no-bitwise': 'off',
    'no-multi-assign': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'no-lonely-if': 'off',
    'prefer-destructuring': 'off',
    'guard-for-in': 'off',
    'class-methods-use-this': 'off',
    'import/order': 'off',
    // 参考链接: https://github.com/benmosher/eslint-plugin-import/blob/v2.20.2/docs/rules/no-unresolved.md
    'import/no-unresolved': [2, { ignore: ['^(@|typings|statics)'] }],
    '@typescript-eslint/no-unused-vars': 1
  }
};
