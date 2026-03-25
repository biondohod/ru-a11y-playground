/**
 * OverlayRecommendedBad.jsx
 * preset="recommended" — страница С нарушениями.
 * Нарушения: image-alt, label, button-name, color-contrast, link-name, frame-title
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import { ImgNoAlt, FormNoLabel, EmptyButton, LowContrast, EmptyLink, FrameNoTitle, DynamicBadContent } from './BadContent.jsx'
import styles from './OverlayPage.module.css'

export default function OverlayRecommendedBad() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#4f46e5' }}>
          <h1>Overlay — recommended / с нарушениями</h1>
          <p className={styles.subtitle}>
            Страница содержит намеренные нарушения уровня WCAG 2.1 AA.
            Overlay работает с <strong>preset=&quot;recommended&quot;</strong>.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#4f46e5' }}>recommended</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusBad}>❌ с нарушениями</span>
          </div>
        </header>
        <div className={styles.main}>
          <section className={styles.sectionBad}>
            <h2>ESLint marker (file-level)</h2>
            <img src="https://picsum.photos/seed/overlay-rec-eslint/64/40" className={styles.demoImg} />
          </section>
          <ImgNoAlt />
          <FormNoLabel />
          <EmptyButton />
          <LowContrast />
          <EmptyLink />
          <FrameNoTitle />
          <DynamicBadContent />
        </div>
      </main>
      {import.meta.env.DEV && <RuA11yOverlay preset="recommended" />}
    </>
  )
}

