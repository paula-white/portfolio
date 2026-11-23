import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Palette = { label: string; bg: string; ink: string; p: string; a: string; onP: string; soft: string; line: string; muted: string }
export type TypeSet = { label: string; display: string; wt: number; vari: string; cs: string; ls: string; text: string }

export const PALETTES = {
  cobalt: { label: 'Cobalt + lime', bg: '#FFFFFF', ink: '#0B0B0C', p: '#2B35F0', a: '#D4FF3F', onP: '#FFFFFF', soft: '#EEEFF2', line: '#D3D5DB', muted: '#5B5C63' },
  tangerine: { label: 'Tangerine + pink', bg: '#FFF6EF', ink: '#1C0F08', p: '#FF5A1F', a: '#FF9FD6', onP: '#1C0F08', soft: '#FBE6D8', line: '#F0D9CB', muted: '#7A6052' },
  night: { label: 'Night + mint', bg: '#0B0B0C', ink: '#F4F4F2', p: '#6C4DFF', a: '#3DFFB8', onP: '#FFFFFF', soft: '#18181C', line: '#2A2A30', muted: '#9C9DA5' },
  forest: { label: 'Forest + sun', bg: '#EEF2EA', ink: '#0E1F16', p: '#0F6B3E', a: '#FFC83D', onP: '#FFFFFF', soft: '#DFE7D9', line: '#D2DBCC', muted: '#5D6B60' },
  mono: { label: 'Black + white', bg: '#F4F4F4', ink: '#0B0B0C', p: '#0B0B0C', a: '#FFFFFF', onP: '#FFFFFF', soft: '#E4E4E4', line: '#D6D6D6', muted: '#6E6E6E' },
} satisfies Record<string, Palette>

export const TYPES = {
  wide: { label: 'Wide', display: "'Archivo', sans-serif", wt: 880, vari: "'wdth' 125", cs: 'uppercase', ls: '-0.05em', text: "'Archivo', sans-serif" },
  editorial: { label: 'Editorial', display: "'Instrument Serif', serif", wt: 400, vari: 'normal', cs: 'none', ls: '-0.03em', text: "'Archivo', sans-serif" },
  mono: { label: 'Mono', display: "'JetBrains Mono', monospace", wt: 700, vari: 'normal', cs: 'uppercase', ls: '-0.06em', text: "'JetBrains Mono', monospace" },
  round: { label: 'Round', display: "'Unbounded', sans-serif", wt: 800, vari: 'normal', cs: 'uppercase', ls: '-0.04em', text: "'Archivo', sans-serif" },
} satisfies Record<string, TypeSet>

export const BACKGROUNDS = { lava: 'Lava', dots: 'Dots', grid: 'Grid', plain: 'Plain' } as const

export type PaletteKey = keyof typeof PALETTES
export type TypeKey = keyof typeof TYPES
export type BgKey = keyof typeof BACKGROUNDS
export type Look = { bg: BgKey; type: TypeKey; pal: PaletteKey }

export const THEMES: Record<string, Look & { label: string }> = {
  agency: { label: 'Agency', bg: 'dots', type: 'wide', pal: 'cobalt' },
  editorial: { label: 'Editorial', bg: 'lava', type: 'editorial', pal: 'tangerine' },
  'after-dark': { label: 'After dark', bg: 'grid', type: 'mono', pal: 'night' },
  playground: { label: 'Playground', bg: 'lava', type: 'round', pal: 'forest' },
}

const STORE = 'pw-look'
const DEFAULT: Look = THEMES.agency

function load(): Look {
  try {
    const q = new URLSearchParams(window.location.search).get('theme')
    if (q && THEMES[q]) { const { bg, type, pal } = THEMES[q]; return { bg, type, pal } }
  } catch { /* ignore */ }
  try {
    const raw = localStorage.getItem(STORE)
    if (raw) {
      const v = JSON.parse(raw)
      if (v.bg in BACKGROUNDS && v.type in TYPES && v.pal in PALETTES) return v
    }
  } catch { /* storage unavailable */ }
  return DEFAULT
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
      '--bg': palette.bg, '--ink': palette.ink, '--p': palette.p, '--a': palette.a, '--on-p': palette.onP,
      '--soft': palette.soft, '--line': palette.line, '--muted': palette.muted,
      '--display': type.display, '--dwt': type.wt, '--dvar': type.vari, '--dcase': type.cs, '--dls': type.ls, '--text': type.text,
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
