import { lazy, Suspense, useEffect, type ComponentType, type ReactElement } from 'react'
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
  // Locked: the server refuses the case study's code, so show the password screen instead.
  return lazy(() => load().catch(() => ({ default: Lock as unknown as T })))
}
const Deputy = locked(() => import('./pages/Deputy'))
const EdApp = locked(() => import('./pages/EdApp'))
const ScTraining = locked(() => import('./pages/ScTraining'))
const DigitalResonance = locked(() => import('./pages/DigitalResonance'))
import ComingSoon from './pages/ComingSoon'
import Lock from './pages/Lock'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

const preview = (el: ReactElement) => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('locked') ? <Lock /> : el)

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
            <Route path="/work/deputy" element={preview(<Deputy />)} />
            <Route path="/work/digital-resonance" element={preview(<DigitalResonance />)} />
            <Route path="/work/sc-training" element={preview(<ScTraining />)} />
            <Route path="/work/edapp" element={preview(<EdApp />)} />
            <Route path="*" element={<ComingSoon title="Lost the thread" line="This page doesn’t exist." />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
