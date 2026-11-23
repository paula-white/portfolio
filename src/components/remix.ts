import { BACKGROUNDS, PALETTES, THEMES, TYPES, useTheme, type BgKey, type PaletteKey, type TypeKey } from '../theme'

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
const nextOf = <T,>(xs: T[], cur: T) => xs[(xs.indexOf(cur) + 1) % xs.length]

export const BG_KEYS = Object.keys(BACKGROUNDS) as BgKey[]
export const TYPE_KEYS = Object.keys(TYPES) as TypeKey[]
export const PAL_KEYS = Object.keys(PALETTES) as PaletteKey[]
export const THEME_KEYS = Object.keys(THEMES)

/** Shared logic for every layout of the remix controls. */
export function useRemix() {
  const { look, set } = useTheme()
  const edition = THEME_KEYS.find((k) => THEMES[k].bg === look.bg && THEMES[k].type === look.type && THEMES[k].pal === look.pal)
  return {
    look,
    set,
    edition,
    setEdition: (k: string) => set({ bg: THEMES[k].bg, type: THEMES[k].type, pal: THEMES[k].pal }),
    cycleBg: () => set({ bg: nextOf(BG_KEYS, look.bg) }),
    cycleType: () => set({ type: nextOf(TYPE_KEYS, look.type) }),
    cyclePal: () => set({ pal: nextOf(PAL_KEYS, look.pal) }),
    shuffle: () => set({ bg: pick(BG_KEYS), type: pick(TYPE_KEYS), pal: pick(PAL_KEYS) }),
  }
}

export const typeStyle = (k: TypeKey) => {
  const t = TYPES[k]
  return { fontFamily: t.display, fontWeight: t.wt, fontStyle: t.st, fontVariationSettings: t.vari }
}

