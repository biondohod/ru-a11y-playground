/**
 * ✅ ХОРОШО — Уровень AA (ГОСТ Р 52872-2019, уровень AA + Постановление №102)
 *
 * Все правила уровня A соблюдены + все jsx-a11y правила с русскими сообщениями.
 * Рекомендуется для государственных сайтов и публичных веб-сервисов.
 */

// ─── jsx-a11y/alt-text ───────────────────────────────────────────────────────

// ✅ Информативный alt
export function ImgWithAlt() {
  return <img src="/photo.jpg" alt="Команда разработчиков на конференции AccessiCode 2025" />;
}

// ✅ Декоративное изображение — alt="" сообщает скринридеру игнорировать
export function DecorativeImg() {
  return <img src="/divider.svg" alt="" role="presentation" />;
}

// ─── jsx-a11y/anchor-has-content ─────────────────────────────────────────────

// ✅ Ссылка с текстом
export function AnchorWithText() {
  return <a href="/about">О компании</a>;
}

// ✅ Ссылка с aria-label (контент в атрибуте)
export function AnchorWithAriaLabel() {
  return (
    <a href="/profile" aria-label="Перейти в профиль пользователя Иван">
      <img src="/avatar.png" alt="" />
    </a>
  );
}

// ─── jsx-a11y/anchor-is-valid ────────────────────────────────────────────────

// ✅ Корректная ссылка с реальным href
export function ValidAnchor() {
  return <a href="/services">Услуги</a>;
}

// ✅ Кнопка оформлена как <button>, а не <a>
export function ButtonNotAnchor() {
  return <button type="button" onClick={() => {}}>Нажми меня</button>;
}

// ─── jsx-a11y/heading-has-content ────────────────────────────────────────────

// ✅ Заголовок с содержательным текстом
export function HeadingWithContent() {
  return (
    <section>
      <h2>Наши услуги</h2>
      <p>Описание услуг компании.</p>
    </section>
  );
}

// ─── jsx-a11y/img-redundant-alt ──────────────────────────────────────────────

// ✅ Alt описывает содержимое, не тип медиа
export function ImgDescriptiveAlt() {
  return <img src="/team.jpg" alt="Команда разработчиков за рабочими столами" />;
}

// ─── jsx-a11y/label-has-associated-control ───────────────────────────────────

// ✅ label связан с input через htmlFor + id
export function LabelWithHtmlFor() {
  return (
    <div>
      <label htmlFor="username">Имя пользователя</label>
      <input id="username" type="text" />
    </div>
  );
}

// ✅ label оборачивает input напрямую
export function LabelWrappingInput() {
  return (
    <label>
      Пароль
      <input type="password" />
    </label>
  );
}

// ─── jsx-a11y/click-events-have-key-events ───────────────────────────────────

// ✅ onClick + onKeyDown — доступно и мышью, и клавиатурой
export function ClickableWithKeyboard() {
  const handleAction = () => {};
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleAction}
      onKeyDown={(e) => e.key === 'Enter' && handleAction()}
    >
      Нажми меня
    </div>
  );
}

// ─── jsx-a11y/tabindex-no-positive ───────────────────────────────────────────

// ✅ tabIndex={0} включает элемент в естественный порядок фокуса
export function NaturalTabOrder() {
  return (
    <div>
      <button type="button">Первый</button>
      <button type="button">Второй</button>
      <div role="button" tabIndex={0} onClick={() => {}} onKeyDown={() => {}}>Третий</div>
    </div>
  );
}

// ─── jsx-a11y/aria-role ───────────────────────────────────────────────────────

// ✅ Валидная ARIA-роль
export function ValidAriaRole() {
  return (
    <div role="complementary" aria-label="Дополнительная информация">
      <p>Связанные материалы</p>
    </div>
  );
}

// ─── zoom-200-warning + table requireCaption ─────────────────────────────────

// ✅ Полная страница: viewport OK, шрифт OK, таблица с caption и scope
export function FullPageAA() {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Прайс-лист — Магазин «Ромашка»</title>
      </head>
      <body>
        <a href="#main">Перейти к основному содержимому</a>
        <main id="main">
          <h1>Прайс-лист</h1>
          <table>
            <caption>Актуальные цены на товары</caption>
            <thead>
              <tr>
                <th scope="col">Товар</th>
                <th scope="col">Цена</th>
                <th scope="col">В наличии</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Молоко 1л</td><td>89 ₽</td><td>Да</td></tr>
              <tr><td>Хлеб</td><td>45 ₽</td><td>Да</td></tr>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  );
}


