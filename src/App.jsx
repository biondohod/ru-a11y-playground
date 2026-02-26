import { useState } from 'react'
import OverlayDemo from './overlay-demo/OverlayDemo.jsx'
import './App.css'

const PAGES = {
  HOME: 'home',
  OVERLAY: 'overlay',
}

function HomePage({ onNavigate }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        🛡️ ru-a11y-toolkit — Playground
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6 }}>
        Демонстрационное приложение для инструментов проверки доступности
        под российские нормативы (ГОСТ Р 52872-2019, Постановление №102).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          border: '2px solid #4f46e5',
          borderRadius: 10,
          padding: '1.25rem 1.5rem',
          background: '#f5f3ff',
          cursor: 'pointer',
        }}
          role="button"
          tabIndex={0}
          onClick={() => onNavigate(PAGES.OVERLAY)}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate(PAGES.OVERLAY)}
        >
          <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', color: '#3730a3' }}>
            🔍 ru-a11y-toolkit-overlay
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>
            Runtime-визуализатор ошибок доступности — демо с намеренными нарушениями.
            Overlay сканирует DOM через axe-core и показывает проблемы прямо на странице.
          </p>
          <span style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            padding: '0.3rem 0.8rem',
            background: '#4f46e5',
            color: '#fff',
            borderRadius: 4,
            fontSize: '0.85rem',
            fontWeight: 600,
          }}>
            Открыть демо →
          </span>
        </div>

        <div style={{
          border: '2px solid #0891b2',
          borderRadius: 10,
          padding: '1.25rem 1.5rem',
          background: '#ecfeff',
        }}>
          <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', color: '#0e7490' }}>
            📋 ru-a11y-toolkit-eslint
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>
            ESLint-плагин с правилами по ГОСТ и Постановлению №102.
            Демо-файлы находятся в <code>src/eslint-preset-demo/</code>.
          </p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Запусти <code>npm run lint:bad</code> / <code>npm run lint:good</code> в терминале.
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState(PAGES.HOME)

  return (
    <>
      {page !== PAGES.HOME && (
        <button
          onClick={() => setPage(PAGES.HOME)}
          style={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 9998,
            padding: '0.4rem 0.9rem',
            background: '#1e1b4b',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          ← Назад
        </button>
      )}

      {page === PAGES.HOME && <HomePage onNavigate={setPage} />}
      {page === PAGES.OVERLAY && <OverlayDemo />}
    </>
  )
}

export default App
