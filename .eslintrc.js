/* eslint-disable spellcheck/spell-checker */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  plugins: ['spellcheck'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  ignorePatterns: ['*.config.js', '/dist/*'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'vue/no-mutating-props': 0,
    'vue/experimental-script-setup-vars': 0,
    'spellcheck/spell-checker': [
      2,
      {
        comments: true,
        strings: true,
        identifiers: true,
        lang: 'en_US',
        skipWords: [
          'goc',
          'gocteam',
          'vue',
          'vm',
          'lang',
          'req',
          'res',
          'datetime',
          'tzo',
          'dif',
          'num',
          'captcha',
          'recaptcha',
          'textarea',
          'tooltip',
          'checkbox',
          'unselect',
          'unselecting',
          'listbox',
          'dropdown',
          'dataset',
          'multiline',
          'uncheck',
          'xlsx',
          'mso',
          'href',
          'xhr',
          'datatable',
          'firebase',
          'axios',
          'toastr',
          'maska',
          'rtl',
          'ltr',
          'stdout',
          'stdin',
          'bannerTxt',
          'txt'
        ],
        // skipIfMatch: ['', ''],
        // skipWordIfMatch: [''],
        ignoreRequire: true
      }
    ]
  }
}
