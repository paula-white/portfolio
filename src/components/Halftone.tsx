import { useCallback } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

const bump = (m: { x: number; y: number } | null, x: number, y: number, R: number) =>
  m ? Math.exp(-((x - m.x) ** 2 + (y - m.y) ** 2) / (2 * R * R)) : 0

/** Print dots that swell and shrink in slow waves, like a newspaper photo breathing. The cursor presses a bigger dot in. */
export default function Halftone({ base, dot, seed, quiet = false }: { base: string; dot: string; seed?: number; quiet?: boolean }) {
  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    const cell = Math.max(12, Math.min(22, Math.round(w / 64)))
    c.fillStyle = dot
    c.beginPath()
    for (let y = cell / 2; y < h + cell; y += cell) {
      const shift = Math.round(y / cell) % 2 ? cell / 2 : 0
      for (let x = cell / 2 - shift; x < w + cell; x += cell) {
        let v = 0.5 + 0.32 * Math.sin(x * 0.011 + t * 0.55) * Math.cos(y * 0.014 - t * 0.4) + 0.22 * Math.sin((x + y) * 0.006 + t * 0.3)
        v = Math.max(0.04, Math.min(1, v + 0.75 * bump(m, x, y, Math.min(w, h) * 0.18)))
        // Quiet keeps the dots small so text on top stays readable; the cursor still presses in.
        const r = cell * 0.52 * (quiet ? Math.max(v * 0.5, bump(m, x, y, Math.min(w, h) * 0.18) * v) : v)
        c.moveTo(x + r, y)
        c.arc(x, y, r, 0, Math.PI * 2)
      }
    }
    c.fill()
  }, [base, dot, quiet])
  return <CanvasBg draw={draw} seed={seed} />
}
