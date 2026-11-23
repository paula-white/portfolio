import { useEffect, useRef, type ReactNode } from 'react'
import { MODALS, type ModalKey } from './DeputyModals'

/*
 * In-situ device scenes on a curved carousel: cards sit on the inside of a gentle
 * cylinder and drift sideways. Built in code; each screen is a rebuilt Deputy modal.
 * Hover pauses it, it stops when off screen, and with reduced motion it holds still.
 */

function AppChrome({ children }: { children: ReactNode }) {
  // A dimmed app behind the modal, so it reads as a real moment in the product.
  return (
    <div className="dev-app">
      <div className="dev-app-bar"><span className="dev-logo" /><i /><i /><i /><b /></div>
      <div className="dev-app-body"><span /><span /><span /><span /></div>
      <div className="dev-app-scrim" />
      <div className="dev-app-modal">{children}</div>
    </div>
  )
}

const laptop = (k: ModalKey) => (
  <div className="laptop">
    <div className="laptop-lid"><div className="laptop-screen"><AppChrome>{MODALS[k]}</AppChrome></div></div>
    <div className="laptop-base" />
  </div>
)
const ipad = (k: ModalKey, tilt: string) => (
  <div className={`ipad ${tilt}`}><div className="ipad-screen"><AppChrome>{MODALS[k]}</AppChrome></div></div>
)

const SCENES: { surface: string; label: string; device: ReactNode }[] = [
  { surface: 'scene-metal', label: 'Upgrade to Pro', device: laptop('upgradePro') },
  { surface: 'scene-wood', label: 'Welcome to Payroll', device: ipad('welcomePayroll', 'ipad-wood') },
  { surface: 'scene-ridge', label: 'Welcome to Core', device: ipad('welcomeCore', 'ipad-ridge') },
  { surface: 'scene-plum', label: 'Welcome to Messaging+', device: laptop('welcomeMessaging') },
  { surface: 'scene-stone', label: 'Upgrade to Core', device: ipad('upgradeCore', 'ipad-flat') },
  { surface: 'scene-wood', label: 'Welcome to Analytics+', device: ipad('welcomeAnalytics', 'ipad-ridge') },
  { surface: 'scene-metal', label: 'Welcome to Lite', device: laptop('welcomeLite') },
]

const CARD = 460 // card width in px
const GAP = 16
const SPEED = 22 // px per second

export default function DeputyInSitu() {
  const stage = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = CARD + GAP
    const loop = step * SCENES.length
    let offset = 0, last = performance.now(), raf = 0, paused = false, visible = true

    const place = () => {
      const w = el.clientWidth
      const R = Math.max(w * 0.9, 900) // radius of the curve
      cards.current.forEach((card, i) => {
        if (!card) return
        // Position along the strip, wrapped so cards loop seamlessly around the centre.
        let x = ((i * step - offset) % loop + loop) % loop
        if (x > loop / 2) x -= loop
        const a = x / R // angle on the cylinder
        const tx = Math.sin(a) * R
        const tz = (1 - Math.cos(a)) * R * 0.55 // edges come towards you, like the inside of a curve
        card.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${-a}rad)`
        card.style.opacity = Math.abs(a) > 1.35 ? '0' : '1'
      })
    }
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      if (paused || !visible || document.hidden) return
      offset = (offset + SPEED * dt) % loop
      place()
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    const ro = new ResizeObserver(place)
    ro.observe(el)
    const enter = () => { paused = true }
    const leave = () => { paused = false }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    place()
    if (!reduce) raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
      el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={stage} className="curve" aria-label="Deputy plan modals shown on devices">
      {SCENES.map((s, i) => (
        <figure key={i} ref={(n) => { cards.current[i] = n }} className={`scene curve-card ${s.surface}`} style={{ width: CARD }}>
          {s.device}
          <figcaption>{s.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
