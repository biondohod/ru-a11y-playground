# ru-a11y-playground

Демо-проект для ручной проверки пакетов из монорепозитория [ru-a11y](https://github.com/biondohod/ru-a11y) — инструментария автоматизированной проверки веб-доступности React/JS-приложений под российские нормативы (ГОСТ Р 52872-2019, Постановление №102).

## Пакеты

| Пакет | Описание |
|---|---|
| [`ru-a11y-toolkit-eslint`](https://www.npmjs.com/package/ru-a11y-toolkit-eslint) | ESLint-плагин с правилами доступности по ГОСТ Р 52872-2019 и Постановлению №102 |

## Быстрый старт

```bash
npm install
npm run dev
```

---

## ESLint-демо (`src/eslint-preset-demo`)

Папка `src/eslint-preset-demo` содержит JSX-компоненты для демонстрации работы `ru-a11y-toolkit-eslint`. Каждый уровень строгости покрыт парой папок: `bad/` — компоненты с намеренными нарушениями, `good/` — корректные примеры без ошибок.

### Структура

```
src/eslint-preset-demo/
│
├── level-a/      # Уровень A — recommended (ГОСТ Р 52872-2019, уровень A)
│   ├── bad/      #   error: require-lang-attr, no-frame-structure,
│   │             #          table-requires-th, require-title-semantic
│   │             #   warn:  require-skip-link, no-table-layout, zoom-200-warning
│   └── good/
│
├── level-aa/     # Уровень AA — gost-aa (ГОСТ Р 52872-2019, уровень AA + Постановление №102)
│   ├── bad/      #   всё из A (warn → error) + jsx-a11y правила:
│   │             #   alt-text, anchor-has-content, anchor-is-valid, label,
│   │             #   click-events-have-key-events, tabindex-no-positive,
│   │             #   aria-props/role/proptypes, img-redundant-alt и др.
│   └── good/
│
└── level-aaa/    # Уровень AAA — strict (максимальная строгость)
    ├── bad/      #   всё из AA + media-has-caption, no-access-key,
    │             #   autocomplete-valid, no-static-element-interactions,
    │             #   no-noninteractive-element-interactions,
    │             #   aria-activedescendant-has-tabindex,
    │             #   enforceRussian:true для require-lang-attr
    └── good/
```

### Скрипты

```bash
# Уровень A — recommended
npm run lint:bad    # ❌ level-a/bad/  — ожидаются ошибки и предупреждения
npm run lint:good   # ✅ level-a/good/ — должно быть чисто

# Уровень AA — gost-aa
npm run lint:aa:bad   # ❌ level-aa/bad/
npm run lint:aa:good  # ✅ level-aa/good/

# Уровень AAA — strict
npm run lint:aaa:bad  # ❌ level-aaa/bad/
npm run lint:aaa:good # ✅ level-aaa/good/

# Полный прогон
npm run lint
```
