// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': [
      'error', {
        'singleline': 10,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }],
    'vue/html-self-closing': [
      'error', {
        'html': {
          'void': 'never',
          'normal': 'any',
          'component': 'any'
        },
        'svg': 'always',
        'math': 'always'
      }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-new': 'off', // 禁止在使用new构造一个实例后不赋值
    'no-plusplus': 'off', // 禁止使用 ++， ——
    'max-len': 'off', // 字符串最大长度
    'func-names': 'off', // 函数表达式必须有名字
    'no-param-reassign': 'off', // 不准给函数入参赋值
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}