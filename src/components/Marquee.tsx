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

const LINES = ['Question the brief · ', 'Find the clear path · ', 'Build it for real · ']

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
    // Big rows packed tight, as on the TA poster.
    const size = Math.min(w * 0.2, h * 0.36)
    const rh = size * 0.98
    const rows = Math.ceil(h / rh) + 1
    const light = isLight(base)
    c.font = `${fontStyle} ${weight} ${size}px ${family}`
    c.textBaseline = 'middle'
    for (let r = 0; r < rows; r++) {
      const st = (rowsState.current[r] ??= { x: (r * 137 + seed * 211) % 900, glow: 0 })
      const txt = LINES[(r + seed) % LINES.length]
      const tw = c.measureText(txt).width || 1
      const dir = r % 2 ? 1 : -1
      const y = rh * r + rh * 0.45
      const hot = !!m && m.y > rh * r && m.y < rh * (r + 1)
      // Ease towards the target over about half a second, so nothing flickers.
      st.glow += ((hot ? 1 : 0) - st.glow) * Math.min(1, dt * 5)
      st.x = (st.x + SPEED * dir * dt) % tw
      // Tone on tone: the words are the background colour, a little lighter. The hovered row lightens a touch more.
      c.fillStyle = light ? mix(base, '#000000', 0.09 + 0.08 * st.glow) : mix(base, '#FFFFFF', 0.1 + 0.1 * st.glow)
      let x = ((st.x % tw) + tw) % tw - tw
      for (; x < w; x += tw) c.fillText(txt, x, y)
    }
  }, [base, seed, quiet, family, weight, fontStyle])

  return <CanvasBg draw={draw} seed={seed} />
}
