const angular = require('@angular-eslint/eslint-plugin')
const tseslint = require('@typescript-eslint/eslint-plugin')
const prettier = require('eslint-plugin-prettier')

module.exports = [
  {
    files: ['*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angular,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'blog',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-shadow': 'error',
    },
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': angular.template,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/accessibility-alt-text': 'warn',
      '@angular-eslint/template/accessibility-table-scope': 'warn',
      '@angular-eslint/template/accessibility-valid-aria': 'error',
      '@angular-eslint/template/no-distracting-elements': 'warn',
    },
  },
]
