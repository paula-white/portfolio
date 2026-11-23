import { useEffect, useRef } from 'react'

/**
 * The Thriving lava, ported from its posterLava shader: three families of soft
 * blooms roaming a gently warped field, breathing on one clock, with film grain.
 * Base is the palette's main colour; the blobs wear its accent.
 */
const VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }'
const FRAG = `
precision highp float;
uniform float time;
uniform vec2 size;
uniform vec3 base;
uniform vec3 ca;
uniform vec3 cb;
float grain(vec2 q){ return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 warp(vec2 q, float t){
  vec2 w = q;
  w.x += 0.18 * sin(q.y * 2.3 + t * 0.28);
  w.y += 0.15 * sin(q.x * 1.9 - t * 0.23 + 0.7);
  w.x += 0.07 * sin(q.y * 4.8 + q.x * 1.6 + t * 0.41);
  w.y += 0.055 * sin(q.x * 3.6 - q.y * 2.2 - t * 0.19);
  return w;
}
float bloom(vec2 q, vec2 c, vec2 r){ vec2 d = (q - c) / max(r, vec2(0.045)); return exp(-dot(d, d) * 1.7); }
vec2 roam(float t, vec2 extent, float sx, float sy, float px, float py){
  return extent * vec2(0.5 + 0.48 * sin(t * sx + px), 0.5 + 0.46 * sin(t * sy + py));
}
vec3 lava(vec2 pos, float t){
  float side = min(size.x, size.y);
  vec2 aspect = size / side;
  vec2 q = warp(pos / side, t);
  float breathe = (1.0 + 0.18 * sin(t * 0.55)) * (size.x > size.y ? 0.8 : 1.0);
  float a = bloom(q, roam(t, aspect, 0.34, 0.21, 0.0, 1.9), vec2(0.42, 0.48) * breathe)
          + bloom(q, roam(t, aspect, 0.27, 0.31, 2.6, 4.4), vec2(0.36, 0.42) * breathe)
          + bloom(q, roam(t, aspect, 0.39, 0.24, 3.7, 0.9), vec2(0.28, 0.34) * breathe);
  float b = bloom(q, roam(t, aspect, 0.23, 0.26, 4.1, 0.2), vec2(0.46, 0.40) * breathe)
          + bloom(q, roam(t, aspect, 0.37, 0.18, 1.2, 3.1), vec2(0.32, 0.38) * breathe)
          + bloom(q, roam(t, aspect, 0.29, 0.35, 5.0, 2.5), vec2(0.26, 0.30) * breathe);
  float c = bloom(q, roam(t, aspect, 0.31, 0.25, 5.3, 5.6), vec2(0.32, 0.34) * breathe)
          + bloom(q, roam(t, aspect, 0.42, 0.29, 0.6, 3.8), vec2(0.28, 0.30) * breathe);
  float total = a + b + c;
  float shape = smoothstep(0.12, 1.0, total);
  vec3 blob = (ca * a + cb * b + cb * c) / max(total, 0.0001);
  return mix(base, blob, shape);
}
void main(){
  vec2 pos = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y);
  vec3 col = lava(pos, time + 14.0);
  col += (grain(floor(pos * 1.35)) - 0.5) * 0.028;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

const vec = (hex: string) => {
  const v = parseInt(hex.replace('#', ''), 16)
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255] as const
}
const mixWhite = (hex: string, t: number) => vec(hex).map((c) => c + (1 - c) * t) as unknown as readonly [number, number, number]

export default function Lava({ base, accent, seed = 0 }: { base: string; accent: string; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colours = useRef({ base, accent })
  colours.current = { base, accent }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) return
    const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uTime = u('time'), uSize = u('size'), uBase = u('base'), uA = u('ca'), uB = u('cb')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = true, raf = 0
    const start = performance.now() - seed * 9000

    const resize = () => {
      // The shader is soft, so a lower resolution looks the same and costs far less.
      const d = Math.min(1.25, window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * d))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * d))
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (reduce) frame()
    }
    const frame = () => {
      const { base, accent } = colours.current
      gl.uniform1f(uTime, reduce ? 6 + seed * 9 : (performance.now() - start) / 1000)
      gl.uniform2f(uSize, canvas.width, canvas.height)
      gl.uniform3fv(uBase, vec(base))
      gl.uniform3fv(uA, vec(accent))
      gl.uniform3fv(uB, mixWhite(accent, 0.3))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (visible && !document.hidden) frame()
    }
    canvas.addEventListener('recolour', () => { if (reduce) frame() })
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    resize()
    if (reduce) frame()
    else raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); gl.getExtension('WEBGL_lose_context')?.loseContext() }
  }, [seed])

  // Colour changes with reduced motion need one fresh frame.
  useEffect(() => { ref.current?.dispatchEvent(new Event('recolour')) }, [base, accent])

  return <canvas ref={ref} className="fill-canvas" aria-hidden="true" />
}
