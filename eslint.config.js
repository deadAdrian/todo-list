//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-trailing-spaces': 'warn',
      '@stylistic/no-trailing-spaces': 'warn',
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'commitlint.config.js',
      '.output/**',
    ],
  },
]
