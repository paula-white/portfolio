import { useCallback, useRef } from 'react'
import CanvasBg, { type DrawFn } from './CanvasBg'

// Blend two hex colours; t is how far towards b.
function mix(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const x = p(a), y = p(b)
  return `rgb(${x.map((c, i) => Math.round(c + (y[i] - c) * t)).join(',')})`
}

// Like TA's New Year background: lighter on dark colours, darker on light ones, so it always shows but never shouts.
function isLight(hex: string) {
  const lin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.4
}

const LINES = ['Oh hey · Nice to meet you · ', 'Research · Design · Build · Ship · ', 'I like your style · ']

/** Pixels per second each row drifts. Slow on purpose: it should feel like a cover line, not a ticker. */
const SPEED = 14

/**
 * Huge solid words drifting slowly past in opposite directions, tone on tone: the background colour, a little lighter.
 * Each row keeps its own position and eases its brightness, so hovering a row
 * brings it forward smoothly instead of jumping.
 */
export default function Marquee({ base, seed = 0, quiet = false, family = 'Archivo, sans-serif', weight = 900, fontStyle = 'normal' }: { base: string; ink?: string; seed?: number; quiet?: boolean; family?: string; weight?: number; fontStyle?: string }) {
  const rowsState = useRef<{ x: number; glow: number }[]>([])
  const last = useRef<number | null>(null)

  const draw = useCallback<DrawFn>((c, w, h, t, m) => {
    const dt = last.current == null ? 0 : Math.min(0.05, Math.max(0, t - last.current))
    last.current = t
    c.fillStyle = base
    c.fillRect(0, 0, w, h)
    // Even rows with breathing room between them, the block centred so no row is clipped.
    const size = Math.max(40, Math.min(w * 0.06, h * 0.11, 92))
    const rh = size * 1.04
    const rows = Math.floor(h / rh)
    const top = (h - rows * rh) / 2
    const light = isLight(base)
    c.font = `${fontStyle} ${weight} ${size}px ${family}`
    c.textBaseline = 'middle'
    for (let r = 0; r < rows; r++) {
      const st = (rowsState.current[r] ??= { x: (r * 137 + seed * 211) % 900, glow: 0 })
      // Set in capitals: reads as a clean typographic pattern, not sentences.
      const txt = LINES[(r + seed) % LINES.length].toUpperCase()
      const tw = c.measureText(txt).width || 1
      const dir = r % 2 ? 1 : -1
      const y = top + rh * r + rh / 2
      const hot = !!m && m.y > top + rh * r && m.y < top + rh * (r + 1)
      // Ease towards the target over about half a second, so nothing flickers.
      st.glow += ((hot ? 1 : 0) - st.glow) * Math.min(1, dt * 5)
      st.x = (st.x + SPEED * dir * dt) % tw
      // Flat tone on tone: the background colour, a little lighter (or darker on light colours).
      const lift = 0.09 + 0.07 * st.glow
      c.fillStyle = light ? mix(base, '#000000', lift) : mix(base, '#FFFFFF', lift)
      let x = ((st.x % tw) + tw) % tw - tw
      for (; x < w; x += tw) c.fillText(txt, x, y)
    }
  }, [base, seed, quiet, family, weight, fontStyle])

  return <CanvasBg draw={draw} seed={seed} />
}
