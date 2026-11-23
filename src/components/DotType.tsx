import { useEffect, useRef } from 'react'

type Dot = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; on: boolean }

const WORDS = ['PAULA WHITE', 'WAIT, WHAT?', 'HMM.', 'OH.', 'OF COURSE.']

/** Dots on the page's grid that gather into words. Move through them, click to scatter. */
export default function DotType({ custom = '', dot, grid, field = false }: { custom?: string; dot: string; grid: string; field?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const props = useRef({ custom, dot, grid })
  props.current = { custom, dot, grid }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, s = 6, key = '', idx = 0, raf = 0
    let gridPts: [number, number][] = []
    const P: Dot[] = []
    let visible = true
    let mouse: { x: number; y: number } | null = null

    const word = () => props.current.custom.trim().toUpperCase() || WORDS[idx]

    const resize = () => {
      w = el.clientWidth; h = el.clientHeight
      if (!w || !h) return
      const d = Math.min(2, window.devicePixelRatio || 1)
      el.width = Math.round(w * d); el.height = Math.round(h * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
      gridPts = []
      for (let y = 9; y < h; y += 18) for (let x = 9; x < w; x += 18) gridPts.push([x, y])
      key = ''
    }

    const retarget = () => {
      if (field) {
        // No words: every grid point is a dot that moves out of your way.
        P.length = 0
        for (const g of gridPts) P.push({ x: g[0], y: g[1], vx: 0, vy: 0, tx: g[0], ty: g[1], on: true })
        s = 4
        return
      }
      const txt = word()
      const oc = document.createElement('canvas')
      oc.width = w; oc.height = h
      const c = oc.getContext('2d')!
      try { (c as CanvasRenderingContext2D & { fontStretch: string }).fontStretch = 'expanded' } catch { /* older browsers */ }
      const narrow = w < 700
      s = Math.max(narrow ? 4 : 5, Math.round(Math.sqrt(w * h) / 150))
      let fs = 200
      c.font = `900 ${fs}px Archivo, sans-serif`
      const mw = c.measureText(txt).width || 1
      fs = Math.min((fs * (w * (narrow ? 0.9 : 0.62))) / mw, h * 0.42)
      c.font = `900 ${fs}px Archivo, sans-serif`
      c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#000'
      c.fillText(txt, Math.max(16, w * 0.03), h * (narrow ? 0.5 : 0.6))
      const data = c.getImageData(0, 0, w, h).data
      const T: [number, number][] = []
      for (let y = 0; y < h; y += s) for (let x = 0; x < w; x += s) {
        if (data[(y * w + x) * 4 + 3] > 128) T.push([x + (Math.random() - 0.5) * s * 0.4, y + (Math.random() - 0.5) * s * 0.4])
      }
      for (let k = T.length - 1; k > 0; k--) { const j = (Math.random() * (k + 1)) | 0; [T[k], T[j]] = [T[j], T[k]] }
      while (P.length < T.length) {
        const g = gridPts[(P.length * 7919) % gridPts.length]
        P.push({ x: g[0], y: g[1], vx: 0, vy: 0, tx: g[0], ty: g[1], on: false })
      }
      P.forEach((p, k) => {
        if (k < T.length) { p.tx = T[k][0]; p.ty = T[k][1]; p.on = true }
        else { const g = gridPts[(k * 7919) % gridPts.length]; p.tx = g[0]; p.ty = g[1]; p.on = false }
        if (reduce) { p.x = p.tx; p.y = p.ty }
      })
    }

    const step = () => {
      raf = requestAnimationFrame(step)
      if (!w || !visible || document.hidden) return
      const k = (field ? 'field' : word()) + '|' + w + 'x' + h
      if (k !== key) { key = k; retarget() }
      const { dot, grid } = props.current
      const R = 120, r = field ? 2 : Math.max(1.5, s * 0.36)
      ctx.clearRect(0, 0, w, h)
      if (!field) {
        ctx.globalAlpha = 0.22; ctx.fillStyle = grid
        for (const g of gridPts) ctx.fillRect(g[0] - 0.75, g[1] - 0.75, 1.5, 1.5)
      }
      ctx.globalAlpha = field ? 0.7 : 1; ctx.fillStyle = dot; ctx.beginPath()
      for (const p of P) {
        if (reduce) { p.x = p.tx; p.y = p.ty }
        else {
          p.vx += (p.tx - p.x) * 0.045; p.vy += (p.ty - p.y) * 0.045
          if (mouse) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
            if (d2 < R * R) { const dd = Math.sqrt(d2) || 1, f = (1 - dd / R) * 6; p.vx += (dx / dd) * f; p.vy += (dy / dd) * f }
          }
          p.vx *= 0.82; p.vy *= 0.82; p.x += p.vx; p.y += p.vy
        }
        if (p.on) { ctx.moveTo(p.x + r, p.y); ctx.arc(p.x, p.y, r, 0, Math.PI * 2) }
      }
      ctx.fill()
      ctx.globalAlpha = 0.6; ctx.fillStyle = grid
      for (const p of P) if (!p.on && Math.abs(p.x - p.tx) + Math.abs(p.y - p.ty) > 1.5) ctx.fillRect(p.x - 1, p.y - 1, 2, 2)
      ctx.globalAlpha = 1
    }

    const point = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      mouse = { x: e.clientX - b.left, y: e.clientY - b.top }
    }
    const leave = () => { mouse = null }
    const burst = (e: PointerEvent) => {
      if (field) return
      point(e)
      for (const p of P) { const a = Math.random() * Math.PI * 2, v = 6 + Math.random() * 22; p.vx += Math.cos(a) * v; p.vy += Math.sin(a) * v }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    resize()
    document.fonts?.load('900 120px Archivo').then(() => { key = '' }, () => {})
    el.addEventListener('pointermove', point)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('pointerdown', burst)
    const cycle = setInterval(() => { if (!props.current.custom.trim() && !reduce && !document.hidden) idx = (idx + 1) % WORDS.length }, 3600)
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf); clearInterval(cycle); ro.disconnect(); io.disconnect()
      el.removeEventListener('pointermove', point); el.removeEventListener('pointerleave', leave); el.removeEventListener('pointerdown', burst)
    }
  }, [field])

  return <canvas ref={ref} className="dot-canvas" aria-label="Dots that gather into words. Move through them to push them around, click to scatter them." />
}
