/**
 * OverlayStrictGood.jsx
 * preset="strict" — страница БЕЗ нарушений.
 * Проходит WCAG 2.1 AAA + best-practice + experimental.
 * Уникальные id ✅ heading-order ✅ все контрасты ✅
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import { GoodImages, GoodForm, GoodButtons, GoodContrast, GoodLinks, GoodTable, GoodFrame } from './GoodContent.jsx'
import styles from './OverlayPage.module.css'

export default function OverlayStrictGood() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#15803d' }}>
          <h1>Overlay — strict / без нарушений</h1>
          <p className={styles.subtitle}>
            Страница проходит строгий аудит WCAG 2.1 AAA.
            Overlay с <strong>preset=&quot;strict&quot;</strong> должен показать 0 нарушений.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#7c3aed' }}>strict</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusGood}>✅ 0 нарушений</span>
          </div>
        </header>
        <div className={styles.main}>
          <div className={styles.successCallout}>
            <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>✅</span>
            <p>
              Максимальный уровень доступности. Уникальные id, корректная иерархия заголовков,
              все цвета с контрастом ≥ 4.5:1, нет положительных tabindex.
            </p>
          </div>
          <GoodImages />
          <GoodForm />
          <GoodButtons />
          <GoodContrast />
          <GoodLinks />
          <GoodTable />
          <GoodFrame />
        </div>
      </main>
      {import.meta.env.DEV && <RuA11yOverlay preset="strict" />}
    </>
  )
}

