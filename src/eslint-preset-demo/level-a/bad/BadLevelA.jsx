/**
 * ❌ ПЛОХО — Уровень A (ГОСТ Р 52872-2019, уровень A)
 *
 * Критические нарушения доступности: делают контент полностью
 * недоступным для пользователей вспомогательных технологий.
 *
 * Правила уровня A:
 *   error  — require-lang-attr, no-frame-structure, table-requires-th, require-title-semantic
 *   warn   — no-table-layout, require-skip-link, zoom-200-warning
 */

// ─── require-lang-attr ───────────────────────────────────────────────────────

// ❌ <html> без атрибута lang
export function NoLangAttr() {
  return (
    <html>
      <body><a href="#main">Перейти к содержимому</a><main id="main"><p>Текст</p></main></body>
    </html>
  );
}

// ❌ Пустой lang=""
export function EmptyLangAttr() {
  return (
    <html lang="">
      <body><a href="#main">Перейти к содержимому</a><main id="main"><p>Текст</p></main></body>
    </html>
  );
}

// ─── no-frame-structure ──────────────────────────────────────────────────────

// ❌ Устаревший <frame> + <frameset>
export function FrameSetUsage() {
  return (
    <frameset cols="50%,50%">
      <frame src="/nav.html" />
      <frame src="/content.html" />
    </frameset>
  );
}

// ❌ <iframe> без title
export function IframeNoTitle() {
  return <iframe src="https://example.com" width="600" height="400" />;
}

// ─── table-requires-th ───────────────────────────────────────────────────────

// ❌ Таблица данных полностью без <th>
export function TableNoTh() {
  return (
    <table>
      <tbody>
        <tr><td>Имя</td><td>Возраст</td></tr>
        <tr><td>Иван</td><td>30</td></tr>
      </tbody>
    </table>
  );
}

// ❌ <th> без атрибута scope
export function TableThNoScope() {
  return (
    <table>
      <thead><tr><th>Имя</th><th>Возраст</th></tr></thead>
      <tbody><tr><td>Иван</td><td>30</td></tr></tbody>
    </table>
  );
}

// ─── require-title-semantic ──────────────────────────────────────────────────

// ❌ Пустой <title>
export function EmptyTitle() {
  return (
    <html lang="ru">
      <head><title></title></head>
      <body><a href="#main">Перейти к содержимому</a><main id="main"><p>Текст</p></main></body>
    </html>
  );
}

// ❌ Шаблонный заголовок «Новая страница»
export function GenericTitle() {
  return (
    <html lang="ru">
      <head><title>Новая страница</title></head>
      <body><a href="#main">Перейти к содержимому</a><main id="main"><p>Текст</p></main></body>
    </html>
  );
}

// ❌ Пропуск уровней заголовков h1 → h3
export function HeadingLevelSkip() {
  return (
    <main>
      <h1>Главный заголовок</h1>
      <h3>Подраздел без h2</h3>
    </main>
  );
}

// ─── require-skip-link (warn на уровне A) ────────────────────────────────────

// ❌ Страница с навигацией без skip-link
export function NoSkipLink() {
  return (
    <html lang="ru">
      <head><title>Демо без skip-link — ru-a11y</title></head>
      <body>
        <nav><a href="/">Главная</a><a href="/about">О нас</a></nav>
        <main id="main"><h1>Контент</h1></main>
      </body>
    </html>
  );
}

// ─── no-table-layout (warn на уровне A) ──────────────────────────────────────

// ❌ Таблица-вёрстка: нет <th>/<caption>, есть border="0"/cellPadding
export function TableUsedForLayout() {
  return (
    <table border="0" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td><nav>Меню</nav></td>
          <td><main>Контент</main></td>
        </tr>
      </tbody>
    </table>
  );
}

// ─── zoom-200-warning (warn на уровне A) ─────────────────────────────────────

// ❌ user-scalable=no — запрет масштабирования
export function ViewportNoScale() {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Демо — ru-a11y</title>
      </head>
      <body><a href="#main">Перейти к содержимому</a><main id="main"><p>Текст</p></main></body>
    </html>
  );
}

