import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RuA11yOverlay } from 'ru-a11y-toolkit-overlay'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <RuA11yOverlay />}
  </StrictMode>,
)
