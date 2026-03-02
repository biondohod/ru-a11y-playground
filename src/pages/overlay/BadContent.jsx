/**
 * BadContent.jsx — набор компонентов с намеренными нарушениями доступности.
 * Используется на всех BAD-страницах (recommended/bad, gost-aa/bad, strict/bad).
 *
 * Нарушения уровней:
 * - BASIC (все пресеты): image-alt, label, button-name, color-contrast, link-name, frame-title
 * - GOST-AA+: heading-order, landmark-one-main (best-practice)
 * - STRICT+: meta-viewport, избыточный tabindex
 */
import { useState } from 'react'
import styles from './OverlayPage.module.css'

/** ❌ image-alt — присутствует во всех пресетах */
export function ImgNoAlt() {
  return (
    <section className={styles.sectionBad}>
      <h2>1. Изображение без alt-текста</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>image-alt</code> — WCAG 1.1.1 / ГОСТ Р 52872 п. 5.1.1
      </p>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img src="https://picsum.photos/seed/bad1/240/140" className={styles.demoImg} />
      <p className={styles.fix}>
        ✅ Добавь <code className={styles.fixCode}>alt="описание"</code> или{' '}
        <code className={styles.fixCode}>alt=""</code> для декоративных
      </p>
    </section>
  )
}

/** ❌ label — присутствует во всех пресетах */
export function FormNoLabel() {
  return (
    <section className={styles.sectionBad}>
      <h2>2. Поля формы без меток</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>label</code> — WCAG 1.3.1 / ГОСТ Р 52872 п. 5.3.3
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Введите имя" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <button type="submit" className={styles.btnDanger}>Отправить</button>
      </div>
      <p className={styles.fix}>
        ✅ Добавь <code className={styles.fixCode}>&lt;label htmlFor&gt;</code> или{' '}
        <code className={styles.fixCode}>aria-label</code>
      </p>
    </section>
  )
}

/** ❌ button-name — присутствует во всех пресетах */
export function EmptyButton() {
  return (
    <section className={styles.sectionBad}>
      <h2>3. Кнопка без доступного имени</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>button-name</code> — WCAG 4.1.2 / ГОСТ Р 52872 п. 5.3.2
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className={styles.btnDanger}>
          <span aria-hidden="true">🔍</span>
        </button>
        {/* Кнопка полностью пустая */}
        <button type="button" style={{
          width: 36, height: 36, background: '#ef4444', border: 'none', borderRadius: 4, cursor: 'pointer'
        }} />
      </div>
      <p className={styles.fix}>
        ✅ Добавь <code className={styles.fixCode}>aria-label="Поиск"</code>
      </p>
    </section>
  )
}

/** ❌ color-contrast — присутствует во всех пресетах */
export function LowContrast() {
  return (
    <section className={styles.sectionBad}>
      <h2>4. Низкий контраст текста</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>color-contrast</code> — WCAG 1.4.3 / ГОСТ Р 52872 п. 5.1.3
      </p>
      <div className={styles.contrastBad}>
        Светло-серый текст на белом фоне — контраст ~1.6:1
      </div>
      <div className={styles.contrastBadYellow}>
        Жёлтый текст на белом фоне — контраст ~1.4:1
      </div>
      <p className={styles.fix}>
        ✅ Контраст должен быть не менее 4.5:1 для обычного текста (WCAG AA)
      </p>
    </section>
  )
}

/** ❌ link-name — присутствует во всех пресетах */
export function EmptyLink() {
  return (
    <section className={styles.sectionBad}>
      <h2>5. Пустая ссылка</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>link-name</code> — WCAG 2.4.4 / ГОСТ Р 52872 п. 5.3.2
      </p>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a href="https://example.com" style={{
        display: 'inline-block', width: 28, height: 28,
        background: '#fca5a5', borderRadius: 3
      }} />
      <span style={{ fontSize: '0.9rem', color: '#374151' }}> ← ссылка без текста и aria-label</span>
      <p className={styles.fix}>
        ✅ Добавь видимый текст или <code className={styles.fixCode}>aria-label="Перейти на сайт"</code>
      </p>
    </section>
  )
}

/** ❌ frame-title — присутствует во всех пресетах */
export function FrameNoTitle() {
  return (
    <section className={styles.sectionBad}>
      <h2>6. iframe без title</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>frame-title</code> — WCAG 2.4.1 / ГОСТ Р 52872 п. 5.3.6
      </p>
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <iframe src="about:blank" width="200" height="60" className={styles.iframe} />
      <p className={styles.fix}>
        ✅ Добавь <code className={styles.fixCode}>title="Описание фрейма"</code>
      </p>
    </section>
  )
}

/** ❌ heading-order — best-practice, есть в gost-aa и strict */
export function HeadingOrderViolation() {
  return (
    <section className={styles.sectionBad}>
      <h2>7. Нарушение иерархии заголовков</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>heading-order</code> — best-practice / ГОСТ Р 52872 п. 5.2.2
        <br />
        <em>(только в пресетах gost-aa и strict)</em>
      </p>
      <div className={styles.headingsBlock}>
        <h3>Раздел h3</h3>
        {/* Пропуск h4 — сразу h6 */}
        <h6>Подраздел h6 (пропущены h4, h5)</h6>
      </div>
      <p className={styles.fix}>
        ✅ Не пропускай уровни: h2 → h3 → h4, без пропусков
      </p>
    </section>
  )
}

/** ❌ tabindex > 0 — best-practice, есть в gost-aa и strict */
export function TabindexViolation() {
  return (
    <section className={styles.sectionBad}>
      <h2>8. Положительный tabindex</h2>
      <p className={styles.hint}>
        ❌ <code className={styles.hintCode}>tabindex</code> — best-practice / WCAG 2.4.3
        <br />
        <em>(только в пресетах gost-aa и strict)</em>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button tabIndex={3} className={styles.btnDanger} type="button">tabIndex=3</button>
        <button tabIndex={1} className={styles.btnDanger} type="button">tabIndex=1</button>
        <button tabIndex={2} className={styles.btnDanger} type="button">tabIndex=2</button>
      </div>
      <p className={styles.fix}>
        ✅ Используй <code className={styles.fixCode}>tabIndex={0}</code> или убери атрибут — порядок фокуса определяется структурой DOM
      </p>
    </section>
  )
}

/** ❌ Динамический контент с MutationObserver */
export function DynamicBadContent() {
  const [items, setItems] = useState([])
  const [counter, setCounter] = useState(0)

  const addBad = () => {
    setCounter(c => c + 1)
    setItems(p => [...p, { id: counter, bad: true }])
  }
  const addGood = () => {
    setCounter(c => c + 1)
    setItems(p => [...p, { id: counter, bad: false }])
  }

  return (
    <section className={styles.sectionNeutral}>
      <h2>9. Динамический контент (MutationObserver)</h2>
      <p className={styles.hint}>
        Overlay пересканирует DOM автоматически после добавления элементов
      </p>
      <div className={styles.btnRow}>
        <button className={styles.btnDanger} onClick={addBad} type="button">
          ❌ Добавить img без alt
        </button>
        <button className={styles.btnSuccess} onClick={addGood} type="button">
          ✅ Добавить img с alt
        </button>
        <button className={styles.btnNeutral} onClick={() => setItems([])} type="button">
          Очистить
        </button>
      </div>
      <ul className={styles.dynamicList} aria-live="polite" aria-label="Динамически добавленные элементы">
        {items.map(item =>
          item.bad ? (
            <li key={item.id}>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={`https://picsum.photos/seed/${item.id + 10}/60/40`} className={styles.thumbImg} />
              <span>без alt</span>
            </li>
          ) : (
            <li key={item.id}>
              <img
                src={`https://picsum.photos/seed/${item.id + 10}/60/40`}
                alt={`Изображение элемента ${item.id + 1}`}
                className={styles.thumbImg}
              />
              <span>с alt</span>
            </li>
          )
        )}
      </ul>
    </section>
  )
}

