import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import styles from './HomePage.module.css'

// Цвета подобраны для тёмного фона карточки #1e293b (контраст >= 4.5:1)
const OVERLAY_CARDS = [
  {
    preset: 'recommended',
    label: 'recommended',
    desc: 'Базовый уровень WCAG 2.1 AA — критические проверки для всех проектов',
    color: '#a5b4fc', /* indigo-300 на #1e293b: ~7.2:1 ✅ */
    border: '#6366f1',
    pathBad: '/overlay/recommended/bad',
    pathGood: '/overlay/recommended/good',
  },
  {
    preset: 'gost-aa',
    label: 'gost-aa',
    desc: 'WCAG 2.1 AA + best-practice — ориентирован на ГОСТ Р 52872 и Постановление №102',
    color: '#67e8f9', /* cyan-300 на #1e293b: ~9.4:1 ✅ */
    border: '#22d3ee',
    pathBad: '/overlay/gost-aa/bad',
    pathGood: '/overlay/gost-aa/good',
  },
  {
    preset: 'strict',
    label: 'strict',
    desc: 'Максимальный уровень — WCAG 2.1 AAA, best-practice и экспериментальные правила',
    color: '#c4b5fd', /* violet-300 на #1e293b: ~8.1:1 ✅ */
    border: '#7c3aed',
    pathBad: '/overlay/strict/bad',
    pathGood: '/overlay/strict/good',
  },
]

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.header}>
          <h1>🛡️ ru-a11y-toolkit — Playground</h1>
          <p className={styles.subtitle}>
            Демонстрационное приложение для инструментов проверки веб-доступности
            под российские нормативы (ГОСТ Р 52872-2019, Постановление №102).
          </p>
        </header>

        <section aria-labelledby="overlay-heading">
          <h2 id="overlay-heading" className={styles.sectionTitle}>
            🔍 ru-a11y-toolkit-overlay
          </h2>
          <p className={styles.sectionDesc}>
            Runtime-визуализатор ошибок доступности. Выберите пресет и вариант страницы:
          </p>
          <div className={styles.cards}>
            {OVERLAY_CARDS.map((card) => (
              <article
                key={card.preset}
                className={styles.card}
                style={{ borderColor: card.border }}
              >
                <h3 className={styles.cardTitle} style={{ color: card.color }}>
                  preset=&quot;{card.label}&quot;
                </h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.cardLinks}>
                  <Link
                    to={card.pathBad}
                    className={styles.cardLinkBad}
                    aria-label={`Открыть страницу с нарушениями — пресет ${card.label}`}
                  >
                    ❌ С нарушениями
                  </Link>
                  <Link
                    to={card.pathGood}
                    className={styles.cardLinkGood}
                    aria-label={`Открыть страницу без нарушений — пресет ${card.label}`}
                  >
                    ✅ Без нарушений
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="vi-heading" className={styles.viSection}>
          <h2 id="vi-heading" className={styles.sectionTitle}>
            👁 ru-a11y-toolkit-visually-impaired
          </h2>
          <p className={styles.sectionDesc}>
            Режим повышенной читабельности для слабовидящих — активируется кнопкой на странице.
          </p>
          <Link to="/visually-impaired" className={styles.viLink}>
            Открыть демо →
          </Link>
        </section>

        <section aria-labelledby="eslint-heading" className={styles.eslintSection}>
          <h2 id="eslint-heading" className={styles.sectionTitle}>
            📋 ru-a11y-toolkit-eslint
          </h2>
          <p className={styles.sectionDesc}>
            ESLint-плагин с правилами по ГОСТ и Постановлению №102.
            Демо-файлы в <code>src/eslint-preset-demo/</code>.
          </p>
          <p className={styles.terminalHint}>
            Запусти в терминале:{' '}
            <code>npm run lint:bad</code> или <code>npm run lint:good</code>
          </p>
        </section>
      </main>
    </>
  )
}

