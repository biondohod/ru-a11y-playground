/**
 * ❌ ПЛОХО — Уровень AA (ГОСТ Р 52872-2019, уровень AA + Постановление №102)
 *
 * На уровне AA все warn из уровня A становятся error, и добавляются
 * правила jsx-a11y с русскими сообщениями.
 *
 * Новые правила уровня AA (сверх A):
 *   require-skip-link       → error (был warn)
 *   no-table-layout         → error (был warn)
 *   zoom-200-warning        → error (был warn)
 *   table-requires-th       → error + requireCaption:true
 *   jsx-a11y/alt-text       — alt для <img>
 *   jsx-a11y/anchor-has-content — <a> не должен быть пустым
 *   jsx-a11y/anchor-is-valid    — корректные href у <a>
 *   jsx-a11y/heading-has-content — <h1-h6> не должны быть пустыми
 *   jsx-a11y/html-has-lang       — дублирует require-lang-attr
 *   jsx-a11y/iframe-has-title    — дублирует no-frame-structure
 *   jsx-a11y/img-redundant-alt   — alt не должен содержать "изображение"
 *   jsx-a11y/label-has-associated-control — label связан с input
 *   jsx-a11y/click-events-have-key-events — у onClick есть onKey*
 *   jsx-a11y/tabindex-no-positive         — tabIndex не должен быть > 0
 *   jsx-a11y/aria-props/proptypes/role/unsupported-elements
 */

// ─── jsx-a11y/alt-text ───────────────────────────────────────────────────────

// ❌ Изображение без alt
export function ImgNoAlt() {
  return <img src="/photo.jpg" />;
}

// ❌ Изображение с alt, но undefined (не передан)
export function ImgUndefinedAlt() {
  const alt = undefined;
  return <img src="/photo.jpg" alt={alt} />;
}

// ─── jsx-a11y/anchor-has-content ─────────────────────────────────────────────

// ❌ Пустой тег <a> без текста и содержимого
export function EmptyAnchor() {
  return <a href="/about"></a>;
}

// ─── jsx-a11y/anchor-is-valid ────────────────────────────────────────────────

// ❌ <a> без href — не ссылка, а псевдокнопка
export function AnchorNoHref() {
  return <a onClick={() => {}}>Нажми меня</a>;
}

// ❌ <a href="#"> без реального назначения
export function AnchorHashOnly() {
  return <a href="#">Пустая ссылка</a>;
}

// ─── jsx-a11y/heading-has-content ────────────────────────────────────────────

// ❌ Пустой заголовок <h2>
export function EmptyH2() {
  return <h2></h2>;
}

// ─── jsx-a11y/img-redundant-alt ──────────────────────────────────────────────

// ❌ Alt содержит слово "изображение" — скринридер уже сообщает, что это картинка
export function ImgRedundantAlt() {
  return <img src="/team.jpg" alt="изображение команды разработчиков" />;
}

// ─── jsx-a11y/label-has-associated-control ───────────────────────────────────

// ❌ <label> не связан с <input>: нет htmlFor и нет вложенного input
export function LabelNotAssociated() {
  return (
    <div>
      <label>Имя пользователя</label>
      <input type="text" />
    </div>
  );
}

// ─── jsx-a11y/click-events-have-key-events ───────────────────────────────────

// ❌ onClick без onKeyDown/onKeyUp/onKeyPress — недоступно для клавиатуры
export function ClickWithoutKeyboard() {
  return (
    <div role="button" onClick={() => alert('клик')} tabIndex={0}>
      Нажми меня
    </div>
  );
}

// ─── jsx-a11y/tabindex-no-positive ───────────────────────────────────────────

// ❌ Положительный tabIndex нарушает естественный порядок фокуса
export function PositiveTabIndex() {
  return (
    <div>
      <button tabIndex={3}>Третий в фокусе</button>
      <button tabIndex={1}>Первый в фокусе</button>
      <button tabIndex={2}>Второй в фокусе</button>
    </div>
  );
}

// ─── jsx-a11y/aria-role ───────────────────────────────────────────────────────

// ❌ Несуществующая ARIA-роль
export function InvalidAriaRole() {
  return <div role="superbutton">Кнопка</div>;
}

// ─── zoom-200-warning (теперь error на уровне AA) ────────────────────────────

// ❌ Мелкий шрифт + ограничение масштаба
export function SmallFontAndMaxScale() {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <title>Демо — ru-a11y</title>
      </head>
      <body>
        <a href="#main">Перейти к содержимому</a>
        <main id="main">
          <p style={{ fontSize: '12px' }}>Слишком мелкий текст</p>
        </main>
      </body>
    </html>
  );
}

// ─── table-requires-th + requireCaption (error на уровне AA) ─────────────────

// ❌ Таблица данных без <caption>
export function TableNoCaption() {
  return (
    <table>
      <thead>
        <tr><th scope="col">Товар</th><th scope="col">Цена</th></tr>
      </thead>
      <tbody>
        <tr><td>Молоко</td><td>89 ₽</td></tr>
      </tbody>
    </table>
  );
}

