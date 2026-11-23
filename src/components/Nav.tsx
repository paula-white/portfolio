import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'

/** On case studies the header floats over the brand's hero, then turns to frosted glass on scroll. */
const CASE_NAV: Record<string, { fg: string; glass: string; panel: string }> = {
  '/work/deputy': { fg: '#0C017B', glass: 'rgba(243, 240, 255, .72)', panel: '#F3F0FF' },
  '/work/edapp': { fg: '#FFFFFF', glass: 'rgba(47, 134, 214, .55)', panel: '#2F86D6' },
  '/work/sc-training': { fg: '#FFFDF7', glass: 'rgba(28, 23, 20, .55)', panel: '#1C1714' },
  '/work/digital-resonance': { fg: '#FFFFFF', glass: 'rgba(1, 43, 74, .5)', panel: '#012B4A' },
  // Home: floats over the hero in the visitor's chosen colours
  '/': { fg: 'var(--on-p)', glass: 'color-mix(in srgb, var(--p) 70%, transparent)', panel: 'var(--p)' },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const theme = CASE_NAV[pathname]

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
