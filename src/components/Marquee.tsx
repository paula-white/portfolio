import { useCallback } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

const LINES = ['Find the clear path · ', 'Wait, what? Oh. Of course. · ', 'Product design · Sydney · ']

/** Huge solid words rolling past in opposite directions, held back in tone. The row under the cursor comes forward and speeds up. */
export default function Marquee({ base, ink, seed = 0, quiet = false, family = 'Archivo, sans-serif', weight = 900, fontStyle = 'normal' }: { base: string; ink: string; seed?: number; quiet?: boolean; family?: string; weight?: number; fontStyle?: string }) {
  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    const rows = Math.max(3, Math.min(5, Math.round(h / 170)))
    const rh = h / rows, size = rh * 0.86
    c.font = `${fontStyle} ${weight} ${size}px ${family}`
    c.textBaseline = 'middle'
    c.fillStyle = ink
    for (let r = 0; r < rows; r++) {
      const txt = LINES[(r + seed) % LINES.length]
      const tw = c.measureText(txt).width || 1
      const dir = r % 2 ? 1 : -1
      const y = rh * r + rh / 2
      const hot = !!m && m.y > rh * r && m.y < rh * (r + 1)
      // Solid letters, held back so text on top stays readable; the row under the cursor comes forward.
      c.globalAlpha = hot ? 0.85 : quiet ? 0.32 : 0.6
      let x = (((t * (hot ? 120 : 45) * dir + r * 137) % tw) + tw) % tw - tw
      for (; x < w; x += tw) c.fillText(txt, x, y)
    }
    c.globalAlpha = 1
  }, [base, ink, seed, quiet, family, weight, fontStyle])
  return <CanvasBg draw={draw} seed={seed} />
}
