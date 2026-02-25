/**
 * ❌ ПЛОХО — Уровень AAA (strict: ГОСТ Р 52872-2019, уровень AAA)
 *
 * На уровне AAA добавляются самые строгие правила.
 * Все warn из AA становятся error, плюс новые проверки:
 *
 * Новые правила уровня AAA (сверх AA):
 *   require-lang-attr        → enforceRussian:true (только ru/ru-* для гос. сайтов)
 *   jsx-a11y/media-has-caption              → error (был warn)
 *   jsx-a11y/no-noninteractive-element-interactions → error (был warn)
 *   jsx-a11y/no-noninteractive-tabindex     → error (был warn)
 *   jsx-a11y/no-redundant-roles             → error (был warn)
 *   jsx-a11y/autocomplete-valid             — атрибут autocomplete
 *   jsx-a11y/no-access-key                  — запрет accessKey
 *   jsx-a11y/no-static-element-interactions — статичные элементы с обработчиками
 *   jsx-a11y/no-interactive-element-to-noninteractive-role
 *   jsx-a11y/aria-activedescendant-has-tabindex
 */

// ─── require-lang-attr enforceRussian:true ───────────────────────────────────

// ❌ Государственный сайт с lang="en" — нарушение для RU-портала
export function GovSiteEnglishLang() {
  return (
    <html lang="en">
      <head><title>Портал государственных услуг</title></head>
      <body>
        <a href="#main">Skip to content</a>
        <main id="main"><p>Government services</p></main>
      </body>
    </html>
  );
}

// ─── jsx-a11y/media-has-caption (error на уровне AAA) ────────────────────────

// ❌ Видео без субтитров (<track kind="captions">)
export function VideoNoCaption() {
  return (
    <video controls width="640">
      <source src="/intro.mp4" type="video/mp4" />
    </video>
  );
}

// ❌ <audio> без субтитров
export function AudioNoCaption() {
  return (
    <audio controls>
      <source src="/podcast.mp3" type="audio/mpeg" />
    </audio>
  );
}

// ─── jsx-a11y/no-noninteractive-element-interactions (error на уровне AAA) ───

// ❌ <li> — неинтерактивный элемент с обработчиком клика
export function ListItemWithClick() {
  return (
    <ul>
      <li onClick={() => alert('выбрано')}>Элемент списка</li>
    </ul>
  );
}

// ─── jsx-a11y/no-noninteractive-tabindex (error на уровне AAA) ───────────────

// ❌ Неинтерактивный <p> с tabIndex — получает фокус без причины
export function ParagraphWithTabIndex() {
  return <p tabIndex={0}>Параграф с фокусом</p>;
}

// ─── jsx-a11y/no-redundant-roles (error на уровне AAA) ───────────────────────

// ❌ <button role="button"> — роль дублирует нативную семантику
export function ButtonWithRedundantRole() {
  return <button type="button" role="button">Отправить</button>;
}

// ❌ <nav role="navigation"> — тоже избыточно
export function NavWithRedundantRole() {
  return (
    <nav role="navigation" aria-label="Основная навигация">
      <a href="/">Главная</a>
    </nav>
  );
}

// ─── jsx-a11y/no-access-key ───────────────────────────────────────────────────

// ❌ accessKey конфликтует с горячими клавишами ОС и браузера
export function ButtonWithAccessKey() {
  return <button type="button" accessKey="s">Сохранить (Alt+S)</button>;
}

// ─── jsx-a11y/autocomplete-valid ─────────────────────────────────────────────

// ❌ Некорректное значение autocomplete
export function InputBadAutocomplete() {
  return (
    <div>
      <label htmlFor="city">Город</label>
      <input id="city" type="text" autoComplete="city" />
    </div>
  );
}

// ─── jsx-a11y/no-static-element-interactions ─────────────────────────────────

// ❌ Статичный <span> с onClick без роли
export function SpanWithClick() {
  return <span onClick={() => {}}>Нажми</span>;
}

// ─── jsx-a11y/no-interactive-element-to-noninteractive-role ──────────────────

// ❌ Интерактивный <button> с неинтерактивной ролью presentation
export function ButtonWithPresentationRole() {
  return <button type="button" role="presentation">Кнопка</button>;
}

// ─── jsx-a11y/aria-activedescendant-has-tabindex ─────────────────────────────

// ❌ aria-activedescendant без tabIndex — элемент не получает фокус
export function ActiveDescendantNoTabIndex() {
  return (
    <div role="listbox" aria-activedescendant="opt1">
      <div id="opt1" role="option">Вариант 1</div>
      <div id="opt2" role="option">Вариант 2</div>
    </div>
  );
}

