/**
 * VisuallyImpairedDemo.jsx — демо-страница для ru-a11y-toolkit-visually-impaired
 *
 * Показывает работу режима повышенной читабельности.
 * CSS импортируется из локального пакета через workspace-зависимость.
 */
import { useVisuallyImpaired } from 'ru-a11y-toolkit-visually-impaired'
import 'ru-a11y-toolkit-visually-impaired/styles/visually-impaired.css'
import NavBar from '../components/NavBar.jsx'
import styles from './VisuallyImpairedDemo.module.css'

export default function VisuallyImpairedDemo() {
  const { toggle, isEnabled } = useVisuallyImpaired()

  return (
    <>
      <NavBar />
      <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Демо: режим для слабовидящих</h1>
        <p className={styles.subtitle}>
          Нажмите кнопку ниже, чтобы активировать режим повышенной читабельности.
          Все элементы страницы изменятся согласно требованиям ГОСТ Р 52872-2019.
        </p>
        <button
          onClick={toggle}
          aria-pressed={isEnabled}
          className={styles.toggleBtn}
        >
          {isEnabled ? '✕ Обычная версия' : '👁 Версия для слабовидящих'}
        </button>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2>Типографика и текст</h2>
          <p>
            Это обычный параграф. В режиме повышенной читабельности размер шрифта
            увеличится до 1.5rem, а межстрочный интервал станет 1.6.
          </p>
          <p>
            Также меняются все заголовки: <strong>h1 → 3rem</strong>, <strong>h2 → 2.5rem</strong>,
            <strong> h3 → 2rem</strong>. Это помогает пользователям с пониженной остротой зрения
            ориентироваться в структуре страницы.
          </p>
          <ul>
            <li>Пункт списка первый — шрифт 1.5rem</li>
            <li>Пункт списка второй — межстрочный интервал 1.6</li>
            <li>
              Пункт с{' '}
              <a href="#demo" onClick={(e) => e.preventDefault()}>
                ссылкой внутри текста
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Интерактивные элементы</h2>
          <p>Кнопки и поля форм получают минимальную высоту 3rem и рамку 2px.</p>

          <div className={styles.formGroup}>
            <label htmlFor="demo-name">Имя пользователя</label>
            <input id="demo-name" type="text" placeholder="Введите имя" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="demo-email">Электронная почта</label>
            <input id="demo-email" type="email" placeholder="user@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="demo-select">Выберите категорию</label>
            <select id="demo-select">
              <option>Опция 1</option>
              <option>Опция 2</option>
              <option>Опция 3</option>
            </select>
          </div>

          <div className={styles.buttonRow}>
            <button type="button">Обычная кнопка</button>
            <button type="button" aria-label="Добавить в избранное">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          <p className={styles.hint}>
            💡 Кнопка с иконкой и <code>aria-label</code>: в режиме для слабовидящих иконка
            скрывается, вместо неё показывается текст из <code>aria-label</code>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Изображения</h2>
          <p>В режиме для слабовидящих изображения обесцвечиваются (grayscale) с повышенным контрастом.</p>
          <div className={styles.imageRow}>
            <figure>
              <img
                src="https://picsum.photos/seed/a11y1/240/160"
                alt="Демо-изображение 1 — пейзаж"
                className={styles.demoImg}
              />
              <figcaption>Пейзаж (станет монохромным)</figcaption>
            </figure>
            <figure>
              <img
                src="https://picsum.photos/seed/a11y2/240/160"
                alt="Демо-изображение 2 — архитектура"
                className={styles.demoImg}
              />
              <figcaption>Архитектура (станет монохромным)</figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Таблица</h2>
          <table className={styles.table}>
            <caption>Пример таблицы данных</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Обычный режим</th>
                <th scope="col">Режим для слабовидящих</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Размер шрифта</td>
                <td>16px (1rem)</td>
                <td>24px (1.5rem)</td>
              </tr>
              <tr>
                <td>Межстрочный интервал</td>
                <td>1.4–1.5</td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>Контраст текста</td>
                <td>Зависит от темы</td>
                <td>21:1 (max)</td>
              </tr>
              <tr>
                <td>Размер кнопок</td>
                <td>Зависит от стилей</td>
                <td>min 3rem × 3rem</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      </div>
    </>
  )
}

