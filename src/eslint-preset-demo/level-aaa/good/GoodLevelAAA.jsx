/**
 * ✅ ХОРОШО — Уровень AAA (strict: ГОСТ Р 52872-2019, уровень AAA)
 *
 * Максимальный уровень доступности. Все правила уровней A и AA соблюдены,
 * плюс самые строгие дополнительные требования.
 * Рекомендуется для Госуслуг и критически важных публичных сервисов.
 */

// ─── require-lang-attr enforceRussian:true ───────────────────────────────────

// ✅ Государственный сайт строго с lang="ru"
export function GovSiteRussianLang() {
  return (
    <html lang="ru">
      <head><title>Портал государственных услуг — Главная</title></head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <main id="main"><h1>Добро пожаловать на Госуслуги</h1></main>
      </body>
    </html>
  );
}

// ─── jsx-a11y/media-has-caption ──────────────────────────────────────────────

// ✅ Видео с субтитрами <track kind="captions">
export function VideoWithCaption() {
  return (
    <video controls width="640">
      <source src="/intro.mp4" type="video/mp4" />
      <track
        kind="captions"
        src="/intro.ru.vtt"
        srcLang="ru"
        label="Русские субтитры"
        default
      />
    </video>
  );
}

// ✅ Декоративное видео без звука — muted + aria-hidden
export function DecorativeVideo() {
  return (
    <video autoPlay muted loop aria-hidden="true">
      <source src="/bg-animation.mp4" type="video/mp4" />
    </video>
  );
}

// ─── jsx-a11y/no-noninteractive-element-interactions ─────────────────────────

// ✅ Интерактивное поведение у <li> реализовано через <button> внутри
export function ListItemWithButton() {
  return (
    <ul>
      <li>
        <button type="button" onClick={() => {}}>Элемент списка</button>
      </li>
    </ul>
  );
}

// ─── jsx-a11y/no-noninteractive-tabindex ─────────────────────────────────────

// ✅ Фокус только на интерактивных элементах
export function FocusableButton() {
  return (
    <div>
      <p>Обычный параграф без фокуса</p>
      <button type="button">Кнопка получает фокус</button>
    </div>
  );
}

// ─── jsx-a11y/no-redundant-roles ─────────────────────────────────────────────

// ✅ Нативные семантические элементы без дублирующих ARIA-ролей
export function SemanticElementsNoRedundantRoles() {
  return (
    <div>
      <button type="button">Отправить</button>
      <nav aria-label="Основная навигация">
        <a href="/">Главная</a>
      </nav>
      <main>
        <h1>Заголовок</h1>
      </main>
    </div>
  );
}

// ─── jsx-a11y/no-access-key ───────────────────────────────────────────────────

// ✅ Горячие клавиши реализованы через JS, не через accessKey
export function KeyboardShortcutViaJS() {
  return (
    <div>
      <button type="button">Сохранить</button>
      <p>Используйте Ctrl+S для сохранения</p>
    </div>
  );
}

// ─── jsx-a11y/autocomplete-valid ─────────────────────────────────────────────

// ✅ Корректные значения autocomplete согласно спецификации HTML
export function FormWithValidAutocomplete() {
  return (
    <form>
      <div>
        <label htmlFor="name">Имя</label>
        <input id="name" type="text" autoComplete="given-name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="tel">Телефон</label>
        <input id="tel" type="tel" autoComplete="tel" />
      </div>
    </form>
  );
}

// ─── jsx-a11y/no-static-element-interactions ─────────────────────────────────

// ✅ Кликабельный элемент использует <button> или имеет явную роль
export function ClickableWithRole() {
  const handleAction = () => {};
  return (
    <div>
      {/* Используем <button> вместо <span onClick> */}
      <button type="button" onClick={handleAction}>Действие</button>
    </div>
  );
}

// ─── jsx-a11y/no-interactive-element-to-noninteractive-role ──────────────────

// ✅ Интерактивные элементы сохраняют интерактивные роли
export function ButtonKeepsInteractiveRole() {
  return (
    <div>
      <button type="button" aria-pressed="false">Переключить</button>
      <input type="checkbox" aria-checked="false" />
    </div>
  );
}

// ─── jsx-a11y/aria-activedescendant-has-tabindex ─────────────────────────────

// ✅ aria-activedescendant вместе с tabIndex={0}
export function ListboxWithTabIndex() {
  return (
    <div role="listbox" aria-activedescendant="opt1" tabIndex={0}>
      <div id="opt1" role="option" aria-selected="true">Вариант 1</div>
      <div id="opt2" role="option" aria-selected="false">Вариант 2</div>
    </div>
  );
}

// ─── Полный пример страницы уровня AAA ───────────────────────────────────────

export function FullPageAAA() {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Подача заявления — Портал Госуслуги</title>
      </head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <nav aria-label="Основная навигация">
          <a href="/">Главная</a>
          <a href="/services">Услуги</a>
        </nav>
        <main id="main">
          <h1>Подача заявления на паспорт</h1>
          <form>
            <div>
              <label htmlFor="firstname">Имя</label>
              <input id="firstname" type="text" autoComplete="given-name" />
            </div>
            <div>
              <label htmlFor="lastname">Фамилия</label>
              <input id="lastname" type="text" autoComplete="family-name" />
            </div>
            <button type="submit">Подать заявление</button>
          </form>
          <table>
            <caption>Статус поданных заявлений</caption>
            <thead>
              <tr>
                <th scope="col">№ заявления</th>
                <th scope="col">Услуга</th>
                <th scope="col">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2025-0042</th>
                <td>Паспорт РФ</td>
                <td>На рассмотрении</td>
              </tr>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  );
}

