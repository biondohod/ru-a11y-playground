/**
 * GoodContent.jsx — доступная разметка без нарушений.
 * Используется на GOOD-страницах. Все цвета: контраст >= 4.5:1.
 * Проверено: image-alt ✅ label ✅ button-name ✅ color-contrast ✅
 *            link-name ✅ heading-order ✅ tabindex ✅ landmark ✅
 */
import { useState } from 'react'
import styles from './OverlayPage.module.css'

export function GoodImages() {
  return (
    <section className={styles.sectionGood} aria-labelledby="good-img-heading">
      <h2 id="good-img-heading">Изображения с alt-текстом</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <figure style={{ margin: 0 }}>
          <img
            src="https://picsum.photos/seed/good1/200/120"
            alt="Городской пейзаж с высокими зданиями"
            className={styles.demoImg}
          />
          <figcaption style={{ fontSize: '0.82rem', color: '#374151' }}>
            Информативное изображение с описанием
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          {/* Декоративное — alt="" */}
          <img
            src="https://picsum.photos/seed/good2/200/120"
            alt=""
            role="presentation"
            className={styles.demoImg}
          />
          <figcaption style={{ fontSize: '0.82rem', color: '#374151' }}>
            Декоративное изображение (<code>alt=""</code>)
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export function GoodForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className={styles.sectionGood} aria-labelledby="good-form-heading">
      <h2 id="good-form-heading">Форма с корректными метками</h2>
      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
        noValidate
        aria-label="Контактная форма"
      >
        <div className={styles.formGroup}>
          <label htmlFor="g-name" className={styles.label}>Имя</label>
          <input
            id="g-name"
            type="text"
            placeholder="Иван Иванов"
            className={styles.input}
            autoComplete="name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="g-email" className={styles.label}>Электронная почта</label>
          <input
            id="g-email"
            type="email"
            placeholder="ivan@example.com"
            className={styles.input}
            autoComplete="email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="g-topic" className={styles.label}>Тема обращения</label>
          <select id="g-topic" className={styles.select}>
            <option value="">Выберите тему</option>
            <option value="access">Доступность</option>
            <option value="bug">Ошибка</option>
            <option value="feature">Новая функция</option>
          </select>
        </div>
        <div className={styles.btnRow}>
          <button type="submit" className={styles.btnSuccess}>
            Отправить форму
          </button>
          <button type="reset" className={styles.btnNeutral}>
            Сбросить
          </button>
        </div>
        {submitted && (
          <p role="status" style={{ color: '#14532d', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            ✅ Форма отправлена успешно
          </p>
        )}
      </form>
    </section>
  )
}

export function GoodButtons() {
  const [liked, setLiked] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <section className={styles.sectionGood} aria-labelledby="good-btn-heading">
      <h2 id="good-btn-heading">Доступные кнопки</h2>
      <div className={styles.btnRow}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => setLiked(v => !v)}
          aria-pressed={liked}
        >
          {liked ? '❤️ Нравится' : '🤍 Нравится'}
        </button>
        {/* Кнопка с иконкой — доступное имя через aria-label */}
        <button
          type="button"
          className={styles.btnNeutral}
          aria-label="Поиск по сайту"
          onClick={() => {}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.btnSuccess}
          aria-expanded={open}
          aria-controls="accordion-content"
          onClick={() => setOpen(v => !v)}
        >
          {open ? 'Свернуть' : 'Развернуть детали'}
        </button>
      </div>
      {open && (
        <div id="accordion-content" style={{
          marginTop: '0.5rem', padding: '0.75rem', background: '#dcfce7',
          borderRadius: 4, fontSize: '0.9rem', color: '#14532d'
        }}>
          Дополнительное содержимое раздела. Кнопка управляет раскрытием через <code>aria-expanded</code>.
        </div>
      )}
    </section>
  )
}

export function GoodContrast() {
  return (
    <section className={styles.sectionGood} aria-labelledby="good-contrast-heading">
      <h2 id="good-contrast-heading">Высококонтрастный текст</h2>
      {/* #1f2937 на #f0fdf4: 14:1 ✅ */}
      <p className={styles.bodyText}>
        Основной текст — #1f2937 на #f0fdf4. Контраст 14:1.
      </p>
      <p style={{ color: '#14532d', fontSize: '0.95rem', lineHeight: 1.6 }}>
        Акцентный тёмно-зелёный — #14532d. Контраст 9.3:1 на белом фоне.
      </p>
      <div style={{
        background: '#1e3a5f', color: '#fff',
        padding: '0.75rem 1rem', borderRadius: 6, fontSize: '0.95rem'
      }}>
        Белый текст на тёмно-синем #1e3a5f — контраст 10.9:1 ✅
      </div>
    </section>
  )
}

export function GoodLinks() {
  return (
    <section className={styles.sectionGood} aria-labelledby="good-links-heading">
      <h2 id="good-links-heading">Доступные ссылки</h2>
      <nav aria-label="Полезные ссылки">
        <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>
            <a
              href="https://github.com/biondohod/ru-a11y"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub репозиторий ru-a11y
              <span className="visually-hidden"> (открывается в новой вкладке)</span>
            </a>
          </li>
          <li>
            <a href="#good-form-heading" className={styles.link}>
              Перейти к форме на этой странице
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export function GoodTable() {
  return (
    <section className={styles.sectionGood} aria-labelledby="good-table-heading">
      <h2 id="good-table-heading">Доступная таблица</h2>
      <table className={styles.table}>
        <caption>Сравнение пресетов проверки доступности</caption>
        <thead>
          <tr>
            <th scope="col">Пресет</th>
            <th scope="col">Уровень</th>
            <th scope="col">Правил</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>recommended</td>
            <td>WCAG 2.1 AA</td>
            <td>68</td>
          </tr>
          <tr>
            <td>gost-aa</td>
            <td>WCAG 2.1 AA + best-practice</td>
            <td>~80</td>
          </tr>
          <tr>
            <td>strict</td>
            <td>WCAG 2.1 AAA</td>
            <td>~90</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export function GoodFrame() {
  return (
    <section className={styles.sectionGood} aria-labelledby="good-frame-heading">
      <h2 id="good-frame-heading">iframe с заголовком</h2>
      <iframe
        src="about:blank"
        width="220"
        height="60"
        title="Демонстрационный пустой фрейм"
        className={styles.iframe}
      />
      <p className={styles.bodyText} style={{ marginTop: '0.5rem' }}>
        Атрибут <code>title</code> описывает содержимое фрейма для скринридеров.
      </p>
    </section>
  )
}

