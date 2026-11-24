import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'

export type Palette = { label: string; bg: string; ink: string; p: string; a: string; onP: string; onA: string; dark: boolean; soft: string; line: string; muted: string }
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
    // The chosen text colour sits on the background, when it reads well enough
    onP: contrast(a, p) >= 4.5 ? a : contrast('#FFFFFF', p) >= contrast(ink, p) ? '#FFFFFF' : ink,
    dark: lum(p) < 0.25,
    onA: contrast('#FFFFFF', a) >= contrast(ink, a) ? '#FFFFFF' : ink,
    soft: mixHex(bg, p, 0.07),
    line: mixHex(bg, ink, 0.16),
    muted: mixHex(bg, ink, 0.62),
  }
}

export const PALETTES = {
  // Background + text pairs, in the order shown on the proof bar
  oat: palette('Oat + brown', '#F3EBDD', '#5A3E2E', '#FBF8F3', '#2A1F1B'),
  ivory: palette('Ivory + violet', '#F7F8F1', '#6A00FF', '#FFFFFF', '#14102A'),
  stone: palette('Stone blue + brown', '#C9D3DA', '#5A3E2E', '#F6F4F0', '#2A1F1B'),
  navymint: palette('Navy + mint', '#070822', '#2EF5B0', '#F6F4F0', '#070822'),
  violet: palette('Violet + lemon', '#7A1CFF', '#F4FF3D', '#F6F4F0', '#120A2A'),
} satisfies Record<string, Palette>

export const TYPES = {
  serif: { label: 'DM Serif', display: "'DM Serif Display', serif", wt: 400, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.015em', text: "'Inter Tight', sans-serif" },
  rethink: { label: 'Rethink', display: "'Rethink Sans', sans-serif", wt: 500, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.03em', text: "'Newsreader', serif" },
  archivo: { label: 'Archivo Narrow', display: "'Archivo Narrow', sans-serif", wt: 500, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.02em', text: "'EB Garamond', serif" },
  bricolage: { label: 'Bricolage', display: "'Bricolage Grotesque', sans-serif", wt: 500, st: 'normal', vari: "'opsz' 96", cs: 'none', ls: '-0.03em', text: "'Crimson Pro', serif" },
  wix: { label: 'Wix Madefor', display: "'Wix Madefor Display', sans-serif", wt: 500, st: 'normal', vari: 'normal', cs: 'none', ls: '-0.025em', text: "'Wix Madefor Text', sans-serif" },
} satisfies Record<string, TypeSet>

export const BACKGROUNDS = { plain: 'Plain', marquee: 'Marquee', dots: 'Dots', camo: 'Camo' } as const

export type PaletteKey = keyof typeof PALETTES
export type TypeKey = keyof typeof TYPES
export type BgKey = keyof typeof BACKGROUNDS
export type Look = { bg: BgKey; type: TypeKey; pal: PaletteKey }

export const THEMES: Record<string, Look & { label: string }> = {
  editorial: { label: 'Editorial', bg: 'marquee', type: 'serif', pal: 'navymint' },
  print: { label: 'Print', bg: 'marquee', type: 'archivo', pal: 'oat' },
  studio: { label: 'Studio', bg: 'dots', type: 'rethink', pal: 'violet' },
  field: { label: 'Field', bg: 'camo', type: 'bricolage', pal: 'stone' },
}

const STORE = 'pw-look-10'
const DEFAULT: Look = { bg: 'camo', type: 'wix', pal: 'oat' }

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

/** Fetch every typeface in the background once the page has loaded, so switching fonts is instant (no fallback flash). */
function warmFonts() {
  if (!document.fonts) return
  const go = () => {
    for (const t of Object.values(TYPES)) {
      const d = t.display.split(',')[0]
      const x = t.text.split(',')[0]
      for (const f of [`${t.st} ${t.wt} 40px ${d}`, `400 16px ${x}`, `500 16px ${x}`, `italic 400 16px ${x}`]) document.fonts.load(f).catch(() => {})
    }
  }
  if (document.readyState === 'complete') setTimeout(go, 300)
  else window.addEventListener('load', () => setTimeout(go, 300), { once: true })
}
if (typeof window !== 'undefined') warmFonts()

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [look, setLook] = useState<Look>(load)
  const palette = PALETTES[look.pal]
  const type = TYPES[look.type]

  // Layout effect, so the new colours are in place before a style-change transition takes its snapshot
  useLayoutEffect(() => {
    const r = document.documentElement.style
    const vars: Record<string, string | number> = {
      '--bg': palette.bg, '--ink': palette.ink, '--p': palette.p, '--a': palette.a, '--on-p': palette.onP, '--on-a': palette.onA,
      '--soft': palette.soft, '--line': palette.line, '--muted': palette.muted,
      '--display': type.display, '--dwt': type.wt, '--dst': type.st, '--dvar': type.vari, '--dcase': type.cs, '--dls': type.ls, '--text': type.text,
    }
    // Case studies re-brand their header; '--site-*' keeps the portfolio's own look available to the rest of the page.
    for (const [k, v] of Object.entries(vars)) { r.setProperty(k, String(v)); r.setProperty(k.replace('--', '--site-'), String(v)) }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.bg)
    try { localStorage.setItem(STORE, JSON.stringify(look)) } catch { /* ignore */ }
  }, [look, palette, type])

  // Only glide between styles after the first paint, so pages don't fade in from a default colour.
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('is-ready')))
    return () => cancelAnimationFrame(id)
  }, [])

  const value = useMemo<Ctx>(() => ({ look, palette, type, set: (patch) => setLook((l) => ({ ...l, ...patch })) }), [look, palette, type])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useTheme outside ThemeProvider')
  return c
}
