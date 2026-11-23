import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { MODALS, type ModalKey } from './DeputyModals'

/*
 * Product screens drifting out of a black void towards the viewer, scattered and tilted,
 * blurred in the distance and sharp up close. Each item loops on its own staggered delay.
 * Hover pauses it; with reduced motion the screens hold still in a scattered layout.
 */

type Item = { node: ReactNode; x: number; y: number; r: number; s: number }

const modal = (k: ModalKey) => <div className="fly-modal">{MODALS[k]}</div>
const art = (name: string, alt: string) => <img className="fly-art" src={`/work/deputy/${name}.jpg`} alt={alt} loading="lazy" decoding="async" />

// x and y are where each screen ends up, as a share of the stage from the centre; r is tilt; s is size.
const ITEMS: Item[] = [
  { node: modal('upgradePro'), x: -0.62, y: -0.42, r: -6, s: 1 },
  { node: art('analytics', 'Analytics+ illustration'), x: 0.7, y: -0.5, r: 7, s: 0.8 },
  { node: modal('welcomePayroll'), x: 0.58, y: 0.45, r: 5, s: 1 },
  { node: art('messaging', 'Messaging+ illustration'), x: -0.72, y: 0.48, r: -9, s: 0.8 },
  { node: modal('welcomeCore'), x: 0.05, y: -0.7, r: 3, s: 0.9 },
  { node: art('hr', 'HR illustration'), x: 0.82, y: 0.02, r: -4, s: 0.75 },
  { node: modal('welcomeMessaging'), x: -0.85, y: -0.02, r: 8, s: 0.9 },
  { node: modal('upgradeCore'), x: -0.08, y: 0.72, r: -3, s: 1 },
]

const DURATION = 22

export default function DeputyReel() {
  // Pause while off screen so it costs nothing when you're not looking at it.
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-off', !e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="fly" aria-label="Upgrade and welcome modals and add-on artwork I designed for Deputy">
      {ITEMS.map((it, i) => (
        <div
          key={i}
          className="fly-item"
          aria-hidden={i > 3}
          style={{
            '--x': it.x, '--y': it.y, '--r': `${it.r}deg`, '--s': it.s,
            animationDelay: `${-(i * DURATION) / ITEMS.length}s`,
            animationDuration: `${DURATION}s`,
          } as CSSProperties}
        >
          {it.node}
        </div>
      ))}
    </div>
  )
}
