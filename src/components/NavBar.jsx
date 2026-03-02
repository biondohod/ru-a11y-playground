import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

/**
 * Верхняя навигация — присутствует на всех страницах.
 * Все цвета проверены на контраст >= 4.5:1 (WCAG AA).
 */
export default function NavBar() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <Link to="/" className={styles.logo} aria-label="ru-a11y playground — на главную">
        🛡️ <span>ru-a11y playground</span>
      </Link>

      <ul className={styles.links} role="list">
        <li>
          <Link
            to="/"
            className={pathname === '/' ? styles.linkActive : styles.link}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Главная
          </Link>
        </li>
        <li className={styles.group}>
          <span className={styles.groupLabel} aria-hidden="true">Overlay →</span>
          <ul className={styles.subLinks} role="list">
            {[
              { to: '/overlay/recommended/bad',  label: 'recommended / ошибки' },
              { to: '/overlay/recommended/good', label: 'recommended / ок' },
              { to: '/overlay/gost-aa/bad',      label: 'gost-aa / ошибки' },
              { to: '/overlay/gost-aa/good',     label: 'gost-aa / ок' },
              { to: '/overlay/strict/bad',       label: 'strict / ошибки' },
              { to: '/overlay/strict/good',      label: 'strict / ок' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={pathname === to ? styles.linkActive : styles.link}
                  aria-current={pathname === to ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link
            to="/visually-impaired"
            className={pathname === '/visually-impaired' ? styles.linkActive : styles.link}
            aria-current={pathname === '/visually-impaired' ? 'page' : undefined}
          >
            Слабовидящие
          </Link>
        </li>
      </ul>
    </nav>
  )
}

