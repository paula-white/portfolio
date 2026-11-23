import { useEffect, useRef } from 'react'

/**
 * Woodland camo in the palette's own colours: big base patches, then smaller
 * layers on top, kept close in tone so the words always read. Each patch is two
 * or three wobbly lobes, blurred then cut back to a hard edge so they melt
 * together. The layout is fixed by the day, so it stays put while you browse.
 */

function rgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
function blend(a: string, b: string, t: number): [number, number, number] {
  const x = rgb(a), y = rgb(b)
  return [0, 1, 2].map((i) => Math.round(x[i] + (y[i] - x[i]) * t)) as [number, number, number]
}
function lumDiff(a: string, b: string) {
  const l = (h: string) => { const [r, g, bl] = rgb(h); return (0.299 * r + 0.587 * g + 0.114 * bl) / 255 }
  return Math.abs(l(a) - l(b))
}
function isNearBlack(hex: string) {
  const lin = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
  const [r, g, b] = rgb(hex)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) < 0.02
}

/** SplitMix64-style repeatable random, so a day's pattern never shifts. */
function seeded(seed: number) {
  let s = BigInt(seed)
  const M = (1n << 64n) - 1n
  return (lo: number, hi: number) => {
    s = (s + 0x9E3779B97F4A7C15n) & M
    let z = s
    z = ((z ^ (z >> 30n)) * 0xBF58476D1CE4E5B9n) & M
    z = ((z ^ (z >> 27n)) * 0x94D049BB133111EBn) & M
    z = z ^ (z >> 31n)
    return lo + (hi - lo) * (Number(z >> 11n) / 2 ** 53)
  }
}

function lobe(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number, angle: number, rnd: (a: number, b: number) => number) {
  const n = 7
  const pts = Array.from({ length: n }, (_, i) => {
    const around = (i / n) * Math.PI * 2
    const reach = rnd(0.82, 1.08)
    const x = (Math.cos(around) * w) / 2 * reach
    const y = (Math.sin(around) * h) / 2 * reach
    return [cx + x * Math.cos(angle) - y * Math.sin(angle), cy + x * Math.sin(angle) + y * Math.cos(angle)]
  })
  const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const start = mid(pts[n - 1], pts[0])
  ctx.moveTo(start[0], start[1])
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n])
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1])
  }
  ctx.closePath()
}

export default function Camo({ base, accent, text }: { base: string; accent: string; text: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const draw = () => {
      const w = el.clientWidth, h = el.clientHeight
      if (!w || !h) return
      const d = Math.min(2, window.devicePixelRatio || 1)
      el.width = Math.round(w * d); el.height = Math.round(h * d)
      const ctx = el.getContext('2d')!
      ctx.setTransform(d, 0, 0, d, 0, 0)
      ctx.fillStyle = base
      ctx.fillRect(0, 0, w, h)

      // Colourful camo: a deeper shade of the base, a lighter tint of it, then
      // small accent patches on top. Near-black bases step towards the accent instead.
      const deep = isNearBlack(base) ? blend(base, accent, 0.12) : blend(base, '#000000', 0.22)
      const layers: [[number, number, number], number, [number, number]][] = [
        [deep, 14, [110, 190]],
        [blend(base, '#FFFFFF', 0.3), 16, [90, 160]],
        // If the accent is too close to the text colour (a dark accent under dark text), use a pale tint instead.
        [lumDiff(accent, text) > 0.25 ? blend(base, accent, 0.85) : blend(base, '#FFFFFF', 0.55), 12, [60, 120]],
      ]

      // Bigger screens get bigger patches, not just more of them.
      const scale = Math.max(1, Math.min(2, w / 700))
      const area = (w * h) / (390 * 844) / (scale * scale)
      const day = Math.floor(Date.now() / 86400000)
      const rnd = seeded(day * 2654435761 + 7)

      const off = document.createElement('canvas')
      off.width = el.width; off.height = el.height
      const o = off.getContext('2d', { willReadFrequently: true })!
      for (const [colour, count, [lo, hi]] of layers) {
        o.setTransform(1, 0, 0, 1, 0, 0)
        o.clearRect(0, 0, off.width, off.height)
        o.setTransform(d, 0, 0, d, 0, 0)
        o.filter = `blur(${Math.max(10, lo * scale * 0.14) * d}px)`
        o.fillStyle = '#000'
        o.beginPath()
        for (let k = 0; k < Math.max(1, Math.round(count * area)); k++) {
          const x = rnd(-40, w + 40), y = rnd(-40, h + 40)
          const width = rnd(lo, hi) * scale
          const angle = rnd(-0.7, 0.7)
          const lobes = Math.floor(rnd(2, 3.99))
          for (let l = 0; l < lobes; l++) {
            const off2 = l * width * 0.45
            lobe(o, x + off2 * Math.cos(angle), y + off2 * Math.sin(angle) + rnd(-width * 0.2, width * 0.2), width * rnd(0.6, 1), width * rnd(0.4, 0.65), angle + rnd(-0.6, 0.6), rnd)
          }
        }
        o.fill()
        o.filter = 'none'
        // Cut the blur back to a hard edge, in this layer's colour.
        const img = o.getImageData(0, 0, off.width, off.height), px = img.data
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] >= 128) { px[i] = colour[0]; px[i + 1] = colour[1]; px[i + 2] = colour[2]; px[i + 3] = 255 } else px[i + 3] = 0
        }
        o.putImageData(img, 0, 0)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.drawImage(off, 0, 0)
        ctx.setTransform(d, 0, 0, d, 0, 0)
      }
    }
    let t = 0
    const ro = new ResizeObserver(() => { clearTimeout(t); t = window.setTimeout(draw, 120) })
    ro.observe(el)
    draw()
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [base, accent, text])

  return <canvas ref={ref} className="camo-canvas" aria-hidden="true" />
}
