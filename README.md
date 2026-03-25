# ru-a11y-playground

Демо-проект для ручной проверки пакетов из монорепозитория [ru-a11y](https://github.com/biondohod/ru-a11y) — инструментария автоматизированной проверки веб-доступности React/JS-приложений под российские нормативы (ГОСТ Р 52872-2019, Постановление №102).

## Пакеты

| Пакет | Описание                                                                       |
|---|--------------------------------------------------------------------------------|
| [`ru-a11y-toolkit`](https://www.npmjs.com/package/ru-a11y-toolkit) | Общий npm-пакет                                                                |
| [`ru-a11y-toolkit-eslint`](https://www.npmjs.com/package/ru-a11y-toolkit-eslint) | ESLint-плагин с правилами доступности по ГОСТ Р 52872-2019 и Постановлению №102 |
| [`ru-a11y-overlay`](https://www.npmjs.com/package/ru-a11y-overlay) | React-компонент оверлея для отображения нарушений доступности в реальном времени (на основе axe-core) |

## Быстрый старт

```bash
npm install
npm run dev
```

---

## CLI-демо (`demo/cli`)

В playground добавлен воспроизводимый сценарий для локального `ru-a11y` CLI из соседнего репозитория `../ru-a11y`.

### Что входит в демо

- Списки URL для трех сценариев:
  - `demo/cli/urls.bad.txt`
  - `demo/cli/urls.good.txt`
  - `demo/cli/urls.mixed.txt`
  - `demo/cli/urls.all-routes.txt` (все маршруты из `src/App.jsx`)
- Автогенерация отчетов:
  - JSON: `demo/cli/reports/<scenario>/json/ru-a11y-report.json`
  - Markdown: `demo/cli/reports/<scenario>/ru-a11y-report.md`
  - HTML: `demo/cli/reports/<scenario>/ru-a11y-report.html`

### Скрипты

```bash
npm run cli:build:local  # собрать локальный CLI в ../ru-a11y/packages/cli/dist
npm run cli:demo         # прогнать bad + good + mixed

npm run cli:demo:bad
npm run cli:demo:good
npm run cli:demo:mixed
npm run cli:demo:all-routes  # один общий прогон по всем страницам
npm run cli:demo:all-routes:full # все страницы + ESLint source (file:line)

npm run cli:scan:json    # одиночный mixed-скан в JSON
npm run cli:report:md    # конвертация JSON -> Markdown для mixed
npm run cli:report:html  # конвертация JSON -> красивый HTML для mixed
npm run cli:report:all   # сразу Markdown + HTML для mixed
```

### Как запускать (PowerShell, 2 терминала)

В первом терминале поднимите playground:

```powershell
npm run dev
```

Во втором терминале выполните demo:

```powershell
npm run cli:build:local
npm run cli:demo
```

После выполнения смотрите результаты в `demo/cli/reports`.

Важно: `cli:demo:mixed` специально проверяет только 4 URL из `urls.mixed.txt`.
Если нужен один общий отчет по всем страницам, используйте `npm run cli:demo:all-routes`.
Если нужен единый полный отчет (runtime + статический анализ с `file:line`), используйте `npm run cli:demo:all-routes:full`.

Для презентации удобнее открывать `demo/cli/reports/<scenario>/ru-a11y-report.html` в браузере:

- есть сводка по прогону (сколько страниц с нарушениями и без);
- каждая страница помечена статусом (`Без нарушений`, `N нарушений`, `Ошибка аудита`);
- нарушения показаны карточками с severity, селектором, правилами и рекомендациями.

---

## Overlay-демо (`src/overlay-demo`)

Папка `src/overlay-demo` содержит демонстрацию работы пакета `ru-a11y-overlay` — визуального оверлея, который в реальном времени анализирует страницу с помощью [axe-core](https://github.com/dequelabs/axe-core) и отображает найденные нарушения доступности прямо поверх проблемных элементов.

### Что демонстрируется

- **Подсветка нарушений** — проблемные элементы обводятся рамкой, при наведении показывается описание ошибки
- **Типы нарушений**: `critical`, `serious`, `moderate`, `minor`
- **Примеры ошибок, которые находит оверлей**:
  - `color-contrast` — недостаточный контраст текста (например, `#fff` на `#ef4444` даёт 3.76:1 при минимуме 4.5:1)
  - `button-name` — кнопки без доступного текста
  - `image-alt` — изображения без атрибута `alt`
  - `link-name` — ссылки без доступного текста
  - `frame-title` — `<iframe>` без доступного имени
  - `heading-order` — неправильный порядок заголовков

### Запуск

```bash
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173) и перейдите на вкладку **Overlay-демо**.

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
