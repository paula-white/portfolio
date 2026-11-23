import { useCallback, useRef } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

const LINES = ['Find the clear path · ', 'Wait, what? Oh. Of course. · ', 'Product design · Sydney · ']

/** Pixels per second each row drifts. Slow on purpose: it should feel like a cover line, not a ticker. */
const SPEED = 14

/**
 * Huge solid words drifting slowly past in opposite directions, held back in tone.
 * Each row keeps its own position and eases its brightness, so hovering a row
 * brings it forward smoothly instead of jumping.
 */
export default function Marquee({ base, ink, seed = 0, quiet = false, family = 'Archivo, sans-serif', weight = 900, fontStyle = 'normal' }: { base: string; ink: string; seed?: number; quiet?: boolean; family?: string; weight?: number; fontStyle?: string }) {
  const rowsState = useRef<{ x: number; glow: number }[]>([])
  const last = useRef<number | null>(null)

  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    const dt = last.current == null ? 0 : Math.min(0.05, Math.max(0, t - last.current))
    last.current = t
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    const rows = Math.max(3, Math.min(5, Math.round(h / 170)))
    const rh = h / rows, size = rh * 0.86
    c.font = `${fontStyle} ${weight} ${size}px ${family}`
    c.textBaseline = 'middle'
    c.fillStyle = ink
    const rest = quiet ? 0.3 : 0.55
    for (let r = 0; r < rows; r++) {
      const st = (rowsState.current[r] ??= { x: (r * 137 + seed * 211) % 900, glow: 0 })
      const txt = LINES[(r + seed) % LINES.length]
      const tw = c.measureText(txt).width || 1
      const dir = r % 2 ? 1 : -1
      const y = rh * r + rh / 2
      const hot = !!m && m.y > rh * r && m.y < rh * (r + 1)
      // Ease towards the target over about half a second, so nothing flickers.
      st.glow += ((hot ? 1 : 0) - st.glow) * Math.min(1, dt * 5)
      st.x = (st.x + SPEED * dir * dt) % tw
      c.globalAlpha = rest + (0.8 - rest) * st.glow
      let x = ((st.x % tw) + tw) % tw - tw
      for (; x < w; x += tw) c.fillText(txt, x, y)
    }
    c.globalAlpha = 1
  }, [base, ink, seed, quiet, family, weight, fontStyle])

  return <CanvasBg draw={draw} seed={seed} />
}
