module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    workbox: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'no-new': 0,
    'comma-dangle': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'space-before-function-paren': 0,
    'semi': ['error', 'always'],
    'prefer-promise-reject-errors': 0,
    'no-unused-expressions': 0,
    'no-template-curly-in-string': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}