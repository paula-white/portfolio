import { useCallback } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

const bump = (m: { x: number; y: number } | null, x: number, y: number, R: number) =>
  m ? Math.exp(-((x - m.x) ** 2 + (y - m.y) ** 2) / (2 * R * R)) : 0

function mix(a: string, b: string, t: number) {
  const p = (h: string) => { const v = parseInt(h.replace('#', ''), 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255] }
  const x = p(a), y = p(b)
  return `rgb(${x.map((c, i) => Math.round(c + (y[i] - c) * t)).join(',')})`
}

/**
 * Print dots that swell and shrink in slow waves, like a newspaper photo breathing.
 * The field is printed in a muted ink so text on top reads; only the dots the
 * cursor presses in wear the full accent.
 */
export default function Halftone({ base, dot, seed, quiet = false }: { base: string; dot: string; seed?: number; quiet?: boolean }) {
  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    const cell = Math.max(12, Math.min(22, Math.round(w / 64)))
    const R = Math.min(w, h) * 0.18
    const scale = quiet ? 0.38 : 0.46
    const muted = mix(base, dot, quiet ? 0.32 : 0.42)
    const field = new Path2D()
    const pressed = new Path2D()
    for (let y = cell / 2; y < h + cell; y += cell) {
      const shift = Math.round(y / cell) % 2 ? cell / 2 : 0
      for (let x = cell / 2 - shift; x < w + cell; x += cell) {
        const wave = Math.max(0.06, Math.min(1, 0.5 + 0.32 * Math.sin(x * 0.011 + t * 0.55) * Math.cos(y * 0.014 - t * 0.4) + 0.22 * Math.sin((x + y) * 0.006 + t * 0.3)))
        const press = bump(m, x, y, R)
        if (press > 0.08) {
          const r = cell * 0.5 * Math.min(1, wave * scale + press * 0.9)
          pressed.moveTo(x + r, y)
          pressed.arc(x, y, r, 0, Math.PI * 2)
        } else {
          const r = cell * scale * wave
          field.moveTo(x + r, y)
          field.arc(x, y, r, 0, Math.PI * 2)
        }
      }
    }
    c.fillStyle = muted
    c.fill(field)
    c.fillStyle = dot
    c.fill(pressed)
  }, [base, dot, quiet])
  return <CanvasBg draw={draw} seed={seed} />
}
