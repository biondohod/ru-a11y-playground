/**
 * OverlayGostAaBad.jsx
 * preset="gost-aa" — страница С нарушениями.
 * Дополнительно к recommended: heading-order, tabindex (best-practice правила)
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import {
  ImgNoAlt, FormNoLabel, EmptyButton, LowContrast,
  EmptyLink, FrameNoTitle, HeadingOrderViolation, TabindexViolation, DynamicBadContent
} from './BadContent.jsx'
import styles from './OverlayPage.module.css'

export default function OverlayGostAaBad() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#0891b2' }}>
          <h1>Overlay — gost-aa / с нарушениями</h1>
          <p className={styles.subtitle}>
            Страница содержит нарушения WCAG 2.1 AA + best-practice правила.
            Overlay работает с <strong>preset=&quot;gost-aa&quot;</strong> — ориентирован на ГОСТ Р 52872-2019 и Постановление №102.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#0891b2' }}>gost-aa</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusBad}>❌ с нарушениями</span>
          </div>
        </header>
        <div className={styles.main}>
          <section className={styles.sectionNeutral}>
            <h2>Что дополнительно проверяет gost-aa vs recommended</h2>
            <ul className={styles.rulesList}>
              <li><code className={styles.ruleTag}>heading-order</code> — иерархия заголовков</li>
              <li><code className={styles.ruleTag}>tabindex</code> — положительный tabindex</li>
              <li><code className={styles.ruleTag}>landmark-one-main</code> — наличие &lt;main&gt;</li>
              <li><code className={styles.ruleTag}>region</code> — landmark-регионы</li>
            </ul>
          </section>
          <ImgNoAlt />
          <FormNoLabel />
          <EmptyButton />
          <LowContrast />
          <EmptyLink />
          <FrameNoTitle />
          <HeadingOrderViolation />
          <TabindexViolation />
          <DynamicBadContent />
        </div>
      </main>
      {import.meta.env.DEV && <RuA11yOverlay preset="gost-aa" />}
    </>
  )
}

