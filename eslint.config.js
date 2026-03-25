import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import ruA11y from 'ru-a11y-toolkit-eslint'

const ruA11yRecommended = ruA11y.configs['recommended/flat']
const ruA11yGostAA      = ruA11y.configs['gost-aa/flat']
const ruA11yStrict      = ruA11y.configs['strict/flat']

// ESLint 9 парсит правило '@ru-a11y/gost-a11y/jsx-a11y/alt-text' как:
//   плагин = '@ru-a11y/gost-a11y/jsx-a11y', правило = 'alt-text'
// Поэтому создаём алиас-плагин с правилами без префикса 'jsx-a11y/'.
const pluginObj = ruA11yGostAA.plugins['@ru-a11y/gost-a11y']
const jsxA11yAliasPlugin = {
  rules: Object.fromEntries(
    Object.entries(pluginObj.rules)
      .filter(([name]) => name.startsWith('jsx-a11y/'))
      .map(([name, rule]) => [name.replace('jsx-a11y/', ''), rule])
  ),
}
const pluginsWithAlias = {
  '@ru-a11y/gost-a11y':          pluginObj,
  '@ru-a11y/gost-a11y/jsx-a11y': jsxA11yAliasPlugin,
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // ── Уровень A: recommended ─────────────────────────────────────────────────
  {
    files: ['src/eslint-preset-demo/level-a/**/*.{js,jsx}'],
    plugins: ruA11yRecommended.plugins,
    rules:   ruA11yRecommended.rules,
  },

  // ── Уровень AA: gost-aa ────────────────────────────────────────────────────
  {
    files: ['src/eslint-preset-demo/level-aa/**/*.{js,jsx}'],
    plugins: pluginsWithAlias,
    rules:   ruA11yGostAA.rules,
  },

  // ── Уровень AAA: strict ────────────────────────────────────────────────────
  {
    files: ['src/eslint-preset-demo/level-aaa/**/*.{js,jsx}'],
    plugins: pluginsWithAlias,
    rules:   ruA11yStrict.rules,
    linterOptions: ruA11yStrict.linterOptions,
  },

  // ── Overlay bad pages: strict (для full CLI-демо с source) ────────────────
  {
    files: [
      'src/pages/overlay/Overlay*Bad.{js,jsx}',
      'src/pages/overlay/BadContent.{js,jsx}',
    ],
    plugins: pluginsWithAlias,
    rules: ruA11yStrict.rules,
    linterOptions: ruA11yStrict.linterOptions,
  },
])
