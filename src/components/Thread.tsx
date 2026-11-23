import { useEffect, useRef } from 'react'

/**
 * Thread: tangled lines drifting across the panel. Wherever the cursor goes they
 * comb out straight, so the mess clears where you look. One line is the thread.
 */
export default function Thread({ line, highlight, seed = 0 }: { line: string; highlight: string; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colours = useRef({ line, highlight })
  colours.current = { line, highlight }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    // Where the comb is, eased so it glides rather than snaps.
    let target: { x: number; y: number } | null = null
    const comb = { x: -9999, y: -9999, s: 0 }
    const start = performance.now() - seed * 7000

    const resize = () => {
      w = el.clientWidth; h = el.clientHeight
      const d = Math.min(2, window.devicePixelRatio || 1)
      el.width = Math.round(w * d); el.height = Math.round(h * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (reduce) draw(8 + seed * 5)
    }

    const draw = (t: number) => {
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)
      const n = Math.max(9, Math.min(22, Math.round(h / 38)))
      const amp = h * 0.16
      const R = Math.max(140, Math.min(w, h) * 0.32)
      const hl = Math.floor(n * 0.62)
      for (let i = 0; i < n; i++) {
        const base = h * (0.08 + (0.84 * i) / (n - 1))
        const ph = i * 0.71 + seed
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 6) {
          const u = x / w
          const wave =
            Math.sin(u * 5.1 + t * 0.31 + ph) +
            0.55 * Math.sin(u * 11.3 - t * 0.47 + ph * 1.9) +
            0.3 * Math.sin(u * 23.0 + t * 0.62 + ph * 0.6) +
            0.45 * Math.sin(u * 2.3 - t * 0.19 + i * 2.4)
          let y = base + wave * amp
          if (comb.s > 0.01) {
            const dx = x - comb.x, dy = base - comb.y
            const k = Math.exp(-(dx * dx + dy * dy * 0.35) / (2 * R * R)) * comb.s
            y = y + (base - y) * k
          }
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const isThread = i === hl
        ctx.strokeStyle = isThread ? colours.current.highlight : colours.current.line
        ctx.globalAlpha = isThread ? 1 : 0.75
        ctx.lineWidth = isThread ? 3 : 1.4
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      const goal = target ? 1 : 0
      comb.s += (goal - comb.s) * 0.06
      if (target) { comb.x += (target.x - comb.x) * 0.12; comb.y += (target.y - comb.y) * 0.12 }
      draw((performance.now() - start) / 1000)
    }

    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      const p = { x: e.clientX - b.left, y: e.clientY - b.top }
      const inside = p.x >= 0 && p.y >= 0 && p.x <= b.width && p.y <= b.height
      if (!inside) { target = null; return }
      if (!target && comb.s < 0.05) { comb.x = p.x; comb.y = p.y }
      target = p
    }
    const leave = () => { target = null }

    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    resize()
    // The canvas sits behind the content, so listen on the window.
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave)
    }
  }, [seed])

  return <canvas ref={ref} className="fill-canvas" aria-hidden="true" />
}
