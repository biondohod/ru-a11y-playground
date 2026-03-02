import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import OverlayRecommendedBad from './pages/overlay/OverlayRecommendedBad.jsx'
import OverlayRecommendedGood from './pages/overlay/OverlayRecommendedGood.jsx'
import OverlayGostAaBad from './pages/overlay/OverlayGostAaBad.jsx'
import OverlayGostAaGood from './pages/overlay/OverlayGostAaGood.jsx'
import OverlayStrictBad from './pages/overlay/OverlayStrictBad.jsx'
import OverlayStrictGood from './pages/overlay/OverlayStrictGood.jsx'
import VisuallyImpairedDemo from './visually-impaired-demo/VisuallyImpairedDemo.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/overlay/recommended/bad"  element={<OverlayRecommendedBad />} />
      <Route path="/overlay/recommended/good" element={<OverlayRecommendedGood />} />
      <Route path="/overlay/gost-aa/bad"      element={<OverlayGostAaBad />} />
      <Route path="/overlay/gost-aa/good"     element={<OverlayGostAaGood />} />
      <Route path="/overlay/strict/bad"       element={<OverlayStrictBad />} />
      <Route path="/overlay/strict/good"      element={<OverlayStrictGood />} />
      <Route path="/visually-impaired"        element={<VisuallyImpairedDemo />} />
    </Routes>
  )
}
