/**
 * ✅ ХОРОШО — Уровень A (ГОСТ Р 52872-2019, уровень A)
 *
 * Минимально необходимый уровень доступности: все критические
 * нарушения устранены, контент доступен вспомогательным технологиям.
 *
 * Правила уровня A:
 *   error  — require-lang-attr, no-frame-structure, table-requires-th, require-title-semantic
 *   warn   — no-table-layout, require-skip-link, zoom-200-warning
 */

// ─── require-lang-attr ───────────────────────────────────────────────────────

// ✅ Корректный lang="ru"
export function GoodLangAttr() {
  return (
    <html lang="ru">
      <head><title>Главная — Демо ru-a11y</title></head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <main id="main"><p>Привет, мир!</p></main>
      </body>
    </html>
  );
}

// ─── no-frame-structure ──────────────────────────────────────────────────────

// ✅ <iframe> с информативным title
export function GoodIframe() {
  return (
    <iframe
      src="https://example.com/map"
      title="Карта расположения офиса"
      width="600"
      height="400"
    />
  );
}

// ─── table-requires-th ───────────────────────────────────────────────────────

// ✅ Таблица данных с <th scope="col">
export function GoodTableWithTh() {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Возраст</th>
          <th scope="col">Город</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Иван</td><td>30</td><td>Москва</td></tr>
        <tr><td>Мария</td><td>25</td><td>Казань</td></tr>
      </tbody>
    </table>
  );
}

// ─── require-title-semantic ──────────────────────────────────────────────────

// ✅ Информативный заголовок страницы + корректная иерархия h1→h2→h3
export function GoodTitleAndHeadings() {
  return (
    <html lang="ru">
      <head><title>Каталог услуг — Портал Госуслуги</title></head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <main id="main">
          <h1>Каталог услуг</h1>
          <h2>Документы</h2>
          <h3>Паспорт</h3>
          <h3>СНИЛС</h3>
          <h2>Транспорт</h2>
          <h3>Водительское удостоверение</h3>
        </main>
      </body>
    </html>
  );
}

// ─── require-skip-link ───────────────────────────────────────────────────────

// ✅ Первый элемент в body — skip-link
export function GoodSkipLink() {
  return (
    <html lang="ru">
      <head><title>О компании — ru-a11y</title></head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <nav><a href="/">Главная</a><a href="/about">О нас</a></nav>
        <main id="main"><h1>О компании</h1></main>
      </body>
    </html>
  );
}

// ─── no-table-layout ─────────────────────────────────────────────────────────

// ✅ Вёрстка через CSS Grid, а не таблицу
export function GoodGridLayout() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
      <nav>Меню</nav>
      <main>Контент</main>
    </div>
  );
}

// ─── zoom-200-warning ────────────────────────────────────────────────────────

// ✅ viewport без ограничений масштабирования
export function GoodViewport() {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Демо — ru-a11y</title>
      </head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <main id="main"><p>Контент масштабируется корректно.</p></main>
      </body>
    </html>
  );
}

