/**
 * OverlayStrictBad.jsx
 * preset="strict" — страница С нарушениями.
 * Включает все нарушения recommended + gost-aa + дополнительные для strict:
 * - audio-caption, video-caption (медиа без субтитров)
 * - duplicate-id (дублирующиеся id)
 */
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'
import NavBar from '../../components/NavBar.jsx'
import {
  ImgNoAlt, FormNoLabel, EmptyButton, LowContrast,
  EmptyLink, FrameNoTitle, HeadingOrderViolation, TabindexViolation, DynamicBadContent
} from './BadContent.jsx'
import styles from './OverlayPage.module.css'

/** ❌ duplicate-id — strict */
function DuplicateIds() {
  return (
    <section className={styles.sectionBad}>
      <h2>10. Дублирующиеся id</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>duplicate-id</code> / <code className={styles.hintCode}>duplicate-id-aria</code> — WCAG 4.1.1
        <br />
        <em>(дополнительно в пресете strict)</em>
      </p>
      <div>
        <label htmlFor="dup-input">Поле 1</label>
        <input id="dup-input" type="text" className={styles.input} style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }} />
      </div>
      <div>
        <label htmlFor="dup-input">Поле 2 (тот же id)</label>
        <input id="dup-input" type="text" className={styles.input} style={{ marginLeft: '0.5rem' }} />
      </div>
      <p className={styles.fix}>
        ✅ Каждый id должен быть уникальным на странице
      </p>
    </section>
  )
}

export default function OverlayStrictBad() {
  return (
    <>
      <NavBar />
      <main id="main" className={styles.page}>
        <header className={styles.pageHeader} style={{ borderColor: '#5B21B6' }}>
          <h1>Overlay — strict / с нарушениями</h1>
          <p className={styles.subtitle}>
            Страница содержит нарушения для максимального пресета.
            Overlay работает с <strong>preset=&quot;strict&quot;</strong> — WCAG 2.1 AAA + best-practice + experimental.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgePreset} style={{ background: '#5B21B6' }}>strict</span>
            <span className={styles.badgeStatus + ' ' + styles.badgeStatusBad}>❌ с нарушениями</span>
          </div>
        </header>
        <div className={styles.main}>
          <section className={styles.sectionBad}>
            <h2>ESLint marker (file-level)</h2>
            <img src="https://picsum.photos/seed/overlay-strict-eslint/64/40" className={styles.demoImg} />
          </section>
          <section className={styles.sectionNeutral}>
            <h2>Что дополнительно проверяет strict vs gost-aa</h2>
            <ul className={styles.rulesList}>
              <li><code className={styles.ruleTag}>duplicate-id</code> — уникальность id</li>
              <li><code className={styles.ruleTag}>identical-links-same-purpose</code> — одинаковые ссылки</li>
              <li><code className={styles.ruleTag}>audio-caption</code> — субтитры аудио</li>
              <li><code className={styles.ruleTag}>meta-viewport-large</code> — ограничения масштаба</li>
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
          <DuplicateIds />
          <DynamicBadContent />
        </div>
      </main>
      {import.meta.env.DEV && <RuA11yOverlay preset="strict" />}
    </>
  )
}

