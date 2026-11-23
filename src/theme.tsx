import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Palette = { label: string; bg: string; ink: string; p: string; a: string; onP: string; onA: string; soft: string; line: string; muted: string }
export type TypeSet = { label: string; display: string; wt: number; st: string; vari: string; cs: string; ls: string; text: string }

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const contrast = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05) }
const mixHex = (a: string, b: string, t: number) =>
  '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0')).join('').toUpperCase()

/** A palette from its four inks. Text on each colour is whichever of white or the ink reads better. */
function palette(label: string, p: string, a: string, bg: string, ink: string): Palette {
  return {
    label, p, a, bg, ink,
    onP: contrast('#FFFFFF', p) >= contrast(ink, p) ? '#FFFFFF' : ink,
    onA: contrast('#FFFFFF', a) >= contrast(ink, a) ? '#FFFFFF' : ink,
    soft: mixHex(bg, p, 0.07),
    line: mixHex(bg, ink, 0.16),
    muted: mixHex(bg, ink, 0.62),
  }
}

export const PALETTES = {
  cobalt: palette('Cobalt + lime', '#2B35F0', '#D4FF3F', '#FFFFFF', '#0B0B0C'),
  tangerine: palette('Tangerine + pink', '#FF5A1F', '#FF9FD6', '#FFF5F2', '#2E1006'),
  violet: palette('Violet + mint', '#6C4DFF', '#3DFFB8', '#F6F4FF', '#130E2E'),
  sky: palette('Sky + tangerine', '#2F9BFF', '#FF8A3D', '#F3F9FF', '#081C2E'),
  fuchsia: palette('Fuchsia + lime', '#C41EFF', '#C8FF3D', '#FBF2FF', '#23052E'),
} satisfies Record<string, Palette>

export const TYPES = {
  wide: { label: 'Wide', display: "'Archivo', sans-serif", wt: 760, st: 'normal', vari: "'wdth' 118", cs: 'uppercase', ls: '-0.035em', text: "'Archivo', sans-serif" },
  mono: { label: 'Mono', display: "'JetBrains Mono', monospace", wt: 700, st: 'normal', vari: 'normal', cs: 'uppercase', ls: '-0.06em', text: "'JetBrains Mono', monospace" },
  fashion: { label: 'Fashion', display: "'Bodoni Moda', serif", wt: 500, st: 'italic', vari: "'opsz' 96", cs: 'none', ls: '-0.04em', text: "'Instrument Sans', sans-serif" },
  poster: { label: 'Poster', display: "'Big Shoulders Display', sans-serif", wt: 800, st: 'normal', vari: 'normal', cs: 'uppercase', ls: '-0.01em', text: "'Space Grotesk', sans-serif" },
} satisfies Record<string, TypeSet>

export const BACKGROUNDS = { halftone: 'Halftone', marquee: 'Marquee', dots: 'Dots', camo: 'Camo', plain: 'Plain' } as const

export type PaletteKey = keyof typeof PALETTES
export type TypeKey = keyof typeof TYPES
export type BgKey = keyof typeof BACKGROUNDS
export type Look = { bg: BgKey; type: TypeKey; pal: PaletteKey }

export const THEMES: Record<string, Look & { label: string }> = {
  agency: { label: 'Agency', bg: 'dots', type: 'wide', pal: 'cobalt' },
  editorial: { label: 'Editorial', bg: 'halftone', type: 'fashion', pal: 'tangerine' },
  'after-dark': { label: 'After dark', bg: 'camo', type: 'mono', pal: 'violet' },
  playground: { label: 'Playground', bg: 'marquee', type: 'poster', pal: 'fuchsia' },
}

const STORE = 'pw-look'
const DEFAULT: Look = THEMES.agency

function loadStored(): Look {
  try {
    const raw = localStorage.getItem(STORE)
    if (raw) {
      const v = JSON.parse(raw)
      if (v.bg in BACKGROUNDS && v.type in TYPES && v.pal in PALETTES) return v
    }
  } catch { /* storage unavailable */ }
  return DEFAULT
}

function load(): Look {
  try {
    const u = new URLSearchParams(window.location.search)
    const q = u.get('theme')
    const base: Look = q && THEMES[q] ? { bg: THEMES[q].bg, type: THEMES[q].type, pal: THEMES[q].pal } : loadStored()
    const bg = u.get('bg'), type = u.get('type'), pal = u.get('pal')
    if (q || bg || type || pal) return {
      bg: bg && bg in BACKGROUNDS ? (bg as BgKey) : base.bg,
      type: type && type in TYPES ? (type as TypeKey) : base.type,
      pal: pal && pal in PALETTES ? (pal as PaletteKey) : base.pal,
    }
  } catch { /* ignore */ }
  return loadStored()
}

type Ctx = { look: Look; set: (patch: Partial<Look>) => void; palette: Palette; type: TypeSet }
const ThemeCtx = createContext<Ctx | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [look, setLook] = useState<Look>(load)
  const palette = PALETTES[look.pal]
  const type = TYPES[look.type]

  useEffect(() => {
    const r = document.documentElement.style
    const vars: Record<string, string | number> = {
      '--bg': palette.bg, '--ink': palette.ink, '--p': palette.p, '--a': palette.a, '--on-p': palette.onP, '--on-a': palette.onA,
      '--soft': palette.soft, '--line': palette.line, '--muted': palette.muted,
      '--display': type.display, '--dwt': type.wt, '--dst': type.st, '--dvar': type.vari, '--dcase': type.cs, '--dls': type.ls, '--text': type.text,
    }
    for (const [k, v] of Object.entries(vars)) r.setProperty(k, String(v))
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.bg)
    try { localStorage.setItem(STORE, JSON.stringify(look)) } catch { /* ignore */ }
  }, [look, palette, type])

  const value = useMemo<Ctx>(() => ({ look, palette, type, set: (patch) => setLook((l) => ({ ...l, ...patch })) }), [look, palette, type])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useTheme outside ThemeProvider')
  return c
}
