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
  gallery: palette('Deep cobalt + soft lime', '#1E2A78', '#D9F27A', '#F7F7F3', '#14172B'),
  atelier: palette('Deep violet + mint', '#2E1A5C', '#A8F0D1', '#F6F5F8', '#1A1230'),
  salon: palette('Burnt tangerine + blush', '#9A3412', '#F4C6C0', '#F8F4F1', '#2A140C'),
  nocturne: palette('Midnight + sky', '#0F1630', '#8FC1FF', '#F4F5F8', '#0F1630'),
  couture: palette('Plum + lime', '#4F0D45', '#CFF07A', '#F8F4F7', '#26071F'),
  study: palette('Petrol + apricot', '#0D3B4F', '#F4B183', '#F3F5F5', '#0B2430'),
} satisfies Record<string, Palette>

export const TYPES = {
  bodoni: { label: 'Bodoni', display: "'Bodoni Moda', serif", wt: 500, st: 'italic', vari: "'opsz' 96", cs: 'none', ls: '-0.025em', text: "'Instrument Sans', sans-serif" },
  cormorant: { label: 'Cormorant', display: "'Cormorant Garamond', serif", wt: 500, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.015em', text: "'Hanken Grotesk', sans-serif" },
  instrument: { label: 'Instrument', display: "'Instrument Serif', serif", wt: 400, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.02em', text: "'Inter Tight', sans-serif" },
  caslon: { label: 'Caslon', display: "'Libre Caslon Display', serif", wt: 400, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.015em', text: "'Hanken Grotesk', sans-serif" },
  gilda: { label: 'Gilda', display: "'Gilda Display', serif", wt: 400, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.01em', text: "'Instrument Sans', sans-serif" },
  italic: { label: 'Italic', display: "'Instrument Serif', serif", wt: 400, st: 'italic', vari: 'normal', cs: 'none', ls: '-0.02em', text: "'Inter Tight', sans-serif" },
} satisfies Record<string, TypeSet>

export const BACKGROUNDS = { halftone: 'Halftone', marquee: 'Marquee', dots: 'Dots', camo: 'Camo', plain: 'Plain' } as const

export type PaletteKey = keyof typeof PALETTES
export type TypeKey = keyof typeof TYPES
export type BgKey = keyof typeof BACKGROUNDS
export type Look = { bg: BgKey; type: TypeKey; pal: PaletteKey }

export const THEMES: Record<string, Look & { label: string }> = {
  gallery: { label: 'Gallery', bg: 'plain', type: 'bodoni', pal: 'gallery' },
  atelier: { label: 'Atelier', bg: 'halftone', type: 'cormorant', pal: 'atelier' },
  salon: { label: 'Salon', bg: 'camo', type: 'instrument', pal: 'salon' },
  nocturne: { label: 'Nocturne', bg: 'dots', type: 'caslon', pal: 'nocturne' },
  couture: { label: 'Couture', bg: 'marquee', type: 'gilda', pal: 'couture' },
  study: { label: 'Study', bg: 'plain', type: 'italic', pal: 'study' },
}

const STORE = 'pw-look-2'
const DEFAULT: Look = THEMES.gallery

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
