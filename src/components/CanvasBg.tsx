import { useEffect, useRef } from 'react'

export type Pointer = { x: number; y: number } | null
export type DrawFn = (c: CanvasRenderingContext2D, w: number, h: number, t: number, m: Pointer) => void

/**
 * A full-bleed animated canvas behind a section. Tracks the pointer over its
 * area (the canvas sits under the content, so it listens on the window),
 * pauses off screen, and holds still for reduced motion.
 */
export default function CanvasBg({ draw, seed = 0 }: { draw: DrawFn; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw
  const repaint = useRef<() => void>(() => {})

  useEffect(() => {
    const el = ref.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    let mouse: Pointer = null
    const start = performance.now() - seed * 6000
    const still = 8 + seed * 3

    const paint = (t: number) => { if (w && h) drawRef.current(ctx, w, h, t, mouse) }
    const resize = () => {
      w = el.clientWidth; h = el.clientHeight
      const d = Math.min(2, window.devicePixelRatio || 1)
      el.width = Math.round(w * d); el.height = Math.round(h * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (reduce) paint(still)
    }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (visible && !document.hidden) paint((performance.now() - start) / 1000)
    }
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      const x = e.clientX - b.left, y = e.clientY - b.top
      mouse = x >= 0 && y >= 0 && x <= b.width && y <= b.height ? { x, y } : null
      if (reduce) paint(still)
    }
    repaint.current = () => { if (reduce) paint(still) }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    window.addEventListener('pointermove', move)
    resize()
    document.fonts?.ready.then(() => reduce && paint(still))
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', move) }
  }, [seed])

  // Recolour a still frame when the palette changes.
  useEffect(() => { repaint.current() }, [draw])

  return <canvas ref={ref} className="fill-canvas" aria-hidden="true" />
}
