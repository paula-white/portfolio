import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'

function sydneyTime() {
  try {
    return new Date().toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Sydney' }).toLowerCase()
  } catch {
    return ''
  }
}

/** On case studies the header floats over the brand's hero, then turns to frosted glass on scroll. */
const CASE_NAV: Record<string, { fg: string; glass: string }> = {
  '/work/deputy': { fg: '#0C017B', glass: 'rgba(243, 240, 255, .72)' },
  '/work/edapp': { fg: '#FFFFFF', glass: 'rgba(47, 134, 214, .55)' },
  '/work/sc-training': { fg: '#FFFDF7', glass: 'rgba(28, 23, 20, .55)' },
  '/work/digital-resonance': { fg: '#FFFFFF', glass: 'rgba(1, 43, 74, .5)' },
}

export default function Nav() {
  const [time, setTime] = useState(sydneyTime)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const theme = CASE_NAV[pathname]

  useEffect(() => {
    const t = setInterval(() => setTime(sydneyTime()), 20000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!theme) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [theme])

  const style = theme ? ({ '--nav-fg': theme.fg, '--nav-glass': theme.glass } as CSSProperties) : undefined

  return (
    <nav className={`nav ${theme ? 'nav-float' : ''} ${theme && scrolled ? 'is-scrolled' : ''}`} style={style}>
      <Link to="/" className="nav-name display">Paula White</Link>
      <div className="nav-links">
        <Link to="/#work">Work ©</Link>
        <Link to="/#bio">About</Link>
        <a href="/paula-white-resume.pdf">Résumé</a>
        <Link to="/#contact">Let’s chat</Link>
      </div>
      <span className="clock" aria-label={`Sydney time ${time}`}><span className="clock-dot" /> Sydney, {time}</span>
    </nav>
  )
}
