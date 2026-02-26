/**
 * OverlayDemo.jsx — демо-страница для тестирования ru-a11y-toolkit-overlay
 *
 * Содержит намеренные нарушения доступности, которые overlay должен обнаружить:
 * - Изображения без alt
 * - Поля формы без label
 * - Пустые кнопки
 * - Нарушение контрастности
 * - Некорректная структура заголовков
 * - Ссылки без содержимого
 * - и т.д.
 */
import { useState } from 'react'
import styles from './OverlayDemo.module.css'

// ─── Компоненты с намеренными нарушениями ────────────────────────────────────

/** ❌ image-alt: изображение без alt */
function ImgNoAlt() {
  return (
    <section className={styles.demoSection}>
      <h3>1. Изображение без alt-текста</h3>
      <p className={styles.hint}>❌ axe: <code>image-alt</code> — ГОСТ Р 52872-2019 п. 5.1.1 / WCAG 1.1.1</p>
      <img
        src="https://picsum.photos/200/120"
        className={styles.demoImg}
      />
      <p className={styles.fix}>
        ✅ Исправление: добавь <code>alt="описание изображения"</code> или <code>alt=""</code> для декоративных
      </p>
    </section>
  )
}

/** ❌ label: поле формы без метки */
function FormNoLabel() {
  return (
    <section className={styles.demoSection}>
      <h3>2. Поле ввода без метки (label)</h3>
      <p className={styles.hint}>❌ axe: <code>label</code> — ГОСТ Р 52872-2019 п. 5.3.3 / WCAG 1.3.1</p>
      <div className={styles.formRow}>
        <input type="text" placeholder="Введите имя" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <button type="submit" className={styles.btn}>Отправить</button>
      </div>
      <p className={styles.fix}>
        ✅ Исправление: добавь <code>&lt;label htmlFor="id"&gt;</code> или атрибут <code>aria-label</code>
      </p>
    </section>
  )
}

/** ❌ button-name: пустая кнопка */
function EmptyButton() {
  return (
    <section className={styles.demoSection}>
      <h3>3. Кнопка без текста</h3>
      <p className={styles.hint}>❌ axe: <code>button-name</code> — ГОСТ Р 52872-2019 п. 5.3.2 / WCAG 4.1.2</p>
      <div className={styles.formRow}>
        <button className={styles.btn} onClick={() => {}}>
          <span aria-hidden="true">🔍</span>
        </button>
        <button className={styles.btnIcon} onClick={() => {}} />
      </div>
      <p className={styles.fix}>
        ✅ Исправление: добавь видимый текст или <code>aria-label="Поиск"</code>
      </p>
    </section>
  )
}

/** ❌ color-contrast: низкий контраст текста */
function LowContrast() {
  return (
    <section className={styles.demoSection}>
      <h3>4. Низкий контраст текста</h3>
      <p className={styles.hint}>❌ axe: <code>color-contrast</code> — ГОСТ Р 52872-2019 п. 5.1.3 / WCAG 1.4.3</p>
      <div className={styles.contrastBad}>
        Этот текст почти не виден на светлом фоне — светло-серый на белом
      </div>
      <div className={styles.contrastBadYellow}>
        Жёлтый текст на белом фоне — плохой контраст
      </div>
      <p className={styles.fix}>
        ✅ Исправление: соотношение контраста должно быть не менее 4.5:1 для обычного текста (WCAG AA)
      </p>
    </section>
  )
}

/** ❌ heading-order: нарушение иерархии заголовков */
function HeadingOrder() {
  return (
    <section className={styles.demoSection}>
      <h3>5. Нарушение иерархии заголовков</h3>
      <p className={styles.hint}>❌ axe: <code>heading-order</code> — ГОСТ Р 52872-2019 п. 5.2.2 / WCAG 1.3.1</p>
      <div className={styles.headingsBlock}>
        <h2>Раздел второго уровня</h2>
        {/* Пропуск h3 — сразу h5 */}
        <h5>Подраздел пятого уровня (пропущены h3, h4)</h5>
        <h6>Ещё глубже без иерархии</h6>
      </div>
      <p className={styles.fix}>
        ✅ Исправление: не пропускай уровни — h2 → h3 → h4, без пропусков
      </p>
    </section>
  )
}

/** ❌ link-name: ссылка без текста */
function EmptyLink() {
  return (
    <section className={styles.demoSection}>
      <h3>6. Пустая ссылка</h3>
      <p className={styles.hint}>❌ axe: <code>link-name</code> — ГОСТ Р 52872-2019 п. 5.3.2 / WCAG 2.4.4</p>
      <div className={styles.linksBlock}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://example.com" className={styles.emptyLink}></a>
        <span> ← пустая ссылка (нет текста и нет aria-label)</span>
      </div>
      <p className={styles.fix}>
        ✅ Исправление: добавь видимый текст или <code>aria-label="Перейти на сайт"</code>
      </p>
    </section>
  )
}

/** ❌ frame-title: iframe без заголовка */
function FrameNoTitle() {
  return (
    <section className={styles.demoSection}>
      <h3>7. iframe без заголовка</h3>
      <p className={styles.hint}>❌ axe: <code>frame-title</code> — ГОСТ Р 52872-2019 п. 5.3.6 / WCAG 2.4.1</p>
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <iframe
        src="about:blank"
        width="200"
        height="80"
        className={styles.iframe}
      />
      <p className={styles.fix}>
        ✅ Исправление: добавь <code>title="Описание содержимого фрейма"</code>
      </p>
    </section>
  )
}

/** ✅ Корректный раздел — для контраста */
function GoodSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className={styles.demoSectionGood}>
      <h3>✅ Пример правильной разметки</h3>
      <p className={styles.hint}>Этот раздел не должен вызывать ошибок axe-core</p>

      <figure>
        <img
          src="https://picsum.photos/200/120?grayscale"
          alt="Чёрно-белый пейзаж — демонстрационное изображение"
          className={styles.demoImg}
        />
        <figcaption>Изображение с корректным alt-текстом</figcaption>
      </figure>

      <form onSubmit={(e) => e.preventDefault()} className={styles.goodForm}>
        <div className={styles.formGroup}>
          <label htmlFor="demo-name" className={styles.label}>Ваше имя</label>
          <input
            id="demo-name"
            type="text"
            placeholder="Иван Иванов"
            className={styles.input}
            aria-required="true"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="demo-email" className={styles.label}>Email</label>
          <input
            id="demo-email"
            type="email"
            placeholder="ivan@example.com"
            className={styles.input}
          />
        </div>
        <button
          type="button"
          className={styles.btnGood}
          aria-expanded={open}
          aria-controls="dropdown-content"
          onClick={() => setOpen(v => !v)}
        >
          {open ? 'Скрыть детали' : 'Показать детали'}
        </button>
        {open && (
          <div id="dropdown-content" className={styles.dropdownContent}>
            <p>Дополнительная информация видна только при раскрытии.</p>
          </div>
        )}
        <button type="submit" className={styles.btnGood}>
          Отправить форму
        </button>
      </form>

      <nav aria-label="Навигация по демо">
        <a href="#demo-top" className={styles.link}>Перейти наверх</a>
        {' | '}
        <a href="https://github.com/biondohod/ru-a11y" className={styles.link}>
          GitHub репозиторий
        </a>
      </nav>
    </section>
  )
}

// ─── Динамический контент (для проверки MutationObserver) ────────────────────

function DynamicContent() {
  const [items, setItems] = useState([])
  const [counter, setCounter] = useState(0)

  const addBadItem = () => {
    setCounter(c => c + 1)
    setItems(prev => [
      ...prev,
      {
        id: counter,
        bad: true,
        text: `Элемент #${counter + 1}`,
      },
    ])
  }

  const addGoodItem = () => {
    setCounter(c => c + 1)
    setItems(prev => [
      ...prev,
      {
        id: counter,
        bad: false,
        text: `Элемент #${counter + 1}`,
      },
    ])
  }

  const reset = () => setItems([])

  return (
    <section className={styles.demoSection}>
      <h3>8. Динамический контент (MutationObserver)</h3>
      <p className={styles.hint}>
        Нажимай кнопки — overlay должен пересканировать DOM автоматически после изменений
      </p>
      <div className={styles.formRow}>
        <button className={styles.btn} onClick={addBadItem} type="button">
          ❌ Добавить плохой элемент (img без alt)
        </button>
        <button className={styles.btnGood} onClick={addGoodItem} type="button">
          ✅ Добавить хороший элемент
        </button>
        <button className={styles.btnNeutral} onClick={reset} type="button">
          🗑 Очистить
        </button>
      </div>
      <ul className={styles.dynamicList} aria-live="polite" aria-label="Динамически добавленные элементы">
        {items.map((item) =>
          item.bad ? (
            <li key={item.id}>
              {/* ❌ img без alt — специально для axe */}
              <img src={`https://picsum.photos/seed/${item.id}/60/40`} className={styles.thumbImg} />
              <span>{item.text} (без alt)</span>
            </li>
          ) : (
            <li key={item.id}>
              <img
                src={`https://picsum.photos/seed/${item.id}/60/40`}
                alt={`Случайное изображение для элемента ${item.text}`}
                className={styles.thumbImg}
              />
              <span>{item.text} (с alt)</span>
            </li>
          )
        )}
      </ul>
    </section>
  )
}

// ─── Главный компонент страницы ───────────────────────────────────────────────

export default function OverlayDemo() {
  return (
    <div id="demo-top" className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>ru-a11y-toolkit-overlay — Демо</h1>
        <p className={styles.subtitle}>
          Эта страница содержит намеренные нарушения доступности для проверки работы оверлея.
          Откройте панель оверлея (кнопка в правом нижнем углу) чтобы увидеть найденные проблемы.
        </p>
        <div className={styles.badge}>
          <span className={styles.badgeDev}>DEV MODE</span>
          <span>Overlay активен — ищи кнопку в углу экрана →</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>Что тестируется?</h2>
          <ul className={styles.rulesList}>
            <li><code>image-alt</code> — изображение без alt</li>
            <li><code>label</code> — поле формы без метки</li>
            <li><code>button-name</code> — пустая кнопка</li>
            <li><code>color-contrast</code> — недостаточный контраст</li>
            <li><code>heading-order</code> — нарушение иерархии заголовков</li>
            <li><code>link-name</code> — пустая ссылка</li>
            <li><code>frame-title</code> — iframe без title</li>
            <li>Динамический контент + MutationObserver</li>
          </ul>
        </section>

        <ImgNoAlt />
        <FormNoLabel />
        <EmptyButton />
        <LowContrast />
        <HeadingOrder />
        <EmptyLink />
        <FrameNoTitle />
        <DynamicContent />
        <GoodSection />
      </main>
    </div>
  )
}

