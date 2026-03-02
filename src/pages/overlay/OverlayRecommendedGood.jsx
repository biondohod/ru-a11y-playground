/**
 * OverlayRecommendedGood.jsx
 * preset="recommended" — страница БЕЗ нарушений.
 * Все элементы доступны: alt ✅ label ✅ button-name ✅ contrast ✅ link-name ✅ frame-title ✅
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import { GoodImages, GoodForm, GoodButtons, GoodContrast, GoodLinks, GoodTable, GoodFrame } from './GoodContent.jsx'
import styles from './OverlayPage.module.css'

export default function OverlayRecommendedGood() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#15803d' }}>
          <h1>Overlay — recommended / без нарушений</h1>
          <p className={styles.subtitle}>
            Страница полностью доступна на уровне WCAG 2.1 AA.
            Overlay с <strong>preset=&quot;recommended&quot;</strong> должен показать 0 нарушений.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#4f46e5' }}>recommended</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusGood}>✅ 0 нарушений</span>
          </div>
        </header>
        <div className={styles.main}>
          <div className={styles.successCallout}>
            <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>✅</span>
            <p>
              Все элементы страницы соответствуют WCAG 2.1 AA.
              Overlay должен показать 0 нарушений для пресета <strong>recommended</strong>.
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
      {import.meta.env.DEV && <RuA11yOverlay preset="recommended" />}
    </>
  )
}

