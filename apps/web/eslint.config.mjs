import nx from '@nx/eslint-plugin'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@nx': nx,
    },
    rules: {
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:feature', 'type:platform'] },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:platform'] },
            { sourceTag: 'type:platform', onlyDependOnLibsWithTags: ['type:platform'] },
          ],
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: ['.next/', 'src/payload-types.ts', 'src/payload-generated-schema.ts', 'src/app/(payload)/admin/importMap.js'],
  },
]

export default eslintConfig
