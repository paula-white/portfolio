import { useCallback } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

const LINES = ['FIND THE CLEAR PATH ✳ ', 'WAIT, WHAT? ✳ OH. OF COURSE. ✳ ', 'PRODUCT DESIGN ✳ SYDNEY ✳ ']

/** Huge outlined words rolling past in opposite directions. The row under the cursor fills in and speeds up. */
export default function Marquee({ base, ink, seed = 0, quiet = false }: { base: string; ink: string; seed?: number; quiet?: boolean }) {
  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    const rows = Math.max(3, Math.min(5, Math.round(h / 170)))
    const rh = h / rows, size = rh * 0.86
    c.font = `900 ${size}px Archivo, 'Arial Black', sans-serif`
    try { (c as CanvasRenderingContext2D & { fontStretch: string }).fontStretch = 'expanded' } catch { /* older browsers */ }
    c.textBaseline = 'middle'
    c.lineWidth = Math.max(1.2, size / 70)
    c.strokeStyle = ink
    c.fillStyle = ink
    c.globalAlpha = quiet ? 0.55 : 1
    for (let r = 0; r < rows; r++) {
      const txt = LINES[(r + seed) % LINES.length]
      const tw = c.measureText(txt).width || 1
      const dir = r % 2 ? 1 : -1
      const y = rh * r + rh / 2
      const hot = !!m && m.y > rh * r && m.y < rh * (r + 1)
      let x = (((t * (hot ? 150 : 50) * dir + r * 137) % tw) + tw) % tw - tw
      for (; x < w; x += tw) {
        if (hot) c.fillText(txt, x, y)
        else c.strokeText(txt, x, y)
      }
    }
    c.globalAlpha = 1
  }, [base, ink, seed, quiet])
  return <CanvasBg draw={draw} seed={seed} />
}
