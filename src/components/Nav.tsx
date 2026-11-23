import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../theme'

/** On case studies the header floats over the brand's hero, then turns to frosted glass on scroll. */
const CASE_NAV: Record<string, { fg: string; glass: string; panel: string }> = {
  '/work/deputy': { fg: '#0C017B', glass: 'rgba(255, 255, 255, .55)', panel: '#F3F0FF' },
  '/work/edapp': { fg: '#FFFFFF', glass: 'rgba(12, 12, 14, .42)', panel: '#2F86D6' },
  '/work/sc-training': { fg: '#FFFDF7', glass: 'rgba(12, 12, 14, .42)', panel: '#1C1714' },
  '/work/digital-resonance': { fg: '#FFFFFF', glass: 'rgba(12, 12, 14, .42)', panel: '#012B4A' },
  // Home: floats over the hero in the visitor's chosen colours
  '/': { fg: 'var(--on-p)', glass: 'HOME', panel: 'var(--p)' },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const { palette } = useTheme()
  const base = CASE_NAV[pathname]
  // Home: dark glass over dark colours, light glass over light ones
  const theme = base && base.glass === 'HOME' ? { ...base, glass: palette.onP.toUpperCase() === '#FFFFFF' ? 'rgba(12, 12, 14, .42)' : 'rgba(255, 255, 255, .55)' } : base

  useEffect(() => {
    if (!theme) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [theme])

  // Close the mobile menu when the page changes, and on Escape; stop the page scrolling behind it.
  useEffect(() => { setOpen(false) }, [pathname, hash])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const style = theme ? ({ '--nav-fg': theme.fg, '--nav-glass': theme.glass, '--nav-panel': theme.panel } as CSSProperties) : undefined
  const close = () => setOpen(false)

  return (
    <nav className={`nav ${theme ? 'nav-float' : ''} ${theme && scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`} style={style}>
      <Link to="/" className="nav-name display" onClick={close}>Paula White</Link>
      <div className="nav-links" id="nav-menu">
        <Link to="/#work" onClick={close}>Work ©</Link>
        <Link to="/#bio" onClick={close}>About</Link>
        <a href="/paula-white-resume.pdf" onClick={close}>Résumé</a>
        <Link to="/#contact" onClick={close}>Let’s chat</Link>
      </div>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        <span /><span />
      </button>
    </nav>
  )
}
