import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'

/*
 * Case studies are password protected on the server, so their code lives in separate files under /cs/.
 * If one can't load (no password yet), reload the address so the server shows its password page.
 */
function locked<T extends ComponentType>(load: () => Promise<{ default: T }>) {
  return lazy(() => load().catch(() => {
    window.location.reload()
    return new Promise<{ default: T }>(() => {})
  }))
}
const Deputy = locked(() => import('./pages/Deputy'))
const EdApp = locked(() => import('./pages/EdApp'))
const ScTraining = locked(() => import('./pages/ScTraining'))
const DigitalResonance = locked(() => import('./pages/DigitalResonance'))
import ComingSoon from './pages/ComingSoon'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="page">
        <Nav />
        <main>
          <Suspense fallback={<div className="cs-loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/deputy" element={<Deputy />} />
            <Route path="/work/digital-resonance" element={<DigitalResonance />} />
            <Route path="/work/sc-training" element={<ScTraining />} />
            <Route path="/work/edapp" element={<EdApp />} />
            <Route path="*" element={<ComingSoon title="Lost the thread" line="This page doesn’t exist." />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
