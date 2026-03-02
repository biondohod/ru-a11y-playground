/**
 * OverlayGostAaGood.jsx
 * preset="gost-aa" — страница БЕЗ нарушений.
 * Проходит WCAG 2.1 AA + best-practice: heading-order ✅ tabindex ✅ landmark ✅
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import { GoodImages, GoodForm, GoodButtons, GoodContrast, GoodLinks, GoodTable, GoodFrame } from './GoodContent.jsx'
import styles from './OverlayPage.module.css'

export default function OverlayGostAaGood() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#15803d' }}>
          <h1>Overlay — gost-aa / без нарушений</h1>
          <p className={styles.subtitle}>
            Страница полностью соответствует WCAG 2.1 AA + best-practice.
            Overlay с <strong>preset=&quot;gost-aa&quot;</strong> должен показать 0 нарушений.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#115A6C' }}>gost-aa</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusGood}>✅ 0 нарушений</span>
          </div>
        </header>
        <div className={styles.main}>
          <div className={styles.successCallout}>
            <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>✅</span>
            <p>
              Страница соответствует ГОСТ Р 52872-2019 и Постановлению №102 на уровне AA.
              Корректная иерархия заголовков, landmark-регионы, tabindex не нарушен.
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
      {import.meta.env.DEV && <RuA11yOverlay preset="gost-aa" />}
    </>
  )
}

