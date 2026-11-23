import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Deputy from './pages/Deputy'
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/deputy" element={<Deputy />} />
            <Route path="/work/digital-resonance" element={<ComingSoon title="Digital Resonance" line="Start two steps earlier." />} />
            <Route path="/work/sc-training" element={<ComingSoon title="SC Training" line="Two became one." />} />
            <Route path="/work/edapp" element={<ComingSoon title="EdApp" line="Learning in five minutes a day." />} />
            <Route path="*" element={<ComingSoon title="Lost the thread" line="This page doesn’t exist." />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
