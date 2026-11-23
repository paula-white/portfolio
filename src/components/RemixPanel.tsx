import { BACKGROUNDS, PALETTES, THEMES, TYPES, useTheme, type BgKey, type PaletteKey, type TypeKey } from '../theme'

const pickRandom = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]

export default function RemixPanel({ word, onWord }: { word: string; onWord: (w: string) => void }) {
  const { look, set } = useTheme()
  const activeTheme = Object.entries(THEMES).find(([, t]) => t.bg === look.bg && t.type === look.type && t.pal === look.pal)?.[0]

  return (
    <aside className="remix mono" aria-label="Remix this portfolio">
      <div className="remix-head">
        <span>[Remix this portfolio]</span>
        <button
          className="pill pill-on"
          onClick={() =>
            set({
              bg: pickRandom(Object.keys(BACKGROUNDS) as BgKey[]),
              type: pickRandom(Object.keys(TYPES) as TypeKey[]),
              pal: pickRandom(Object.keys(PALETTES) as PaletteKey[]),
            })
          }
        >
          Shuffle
        </button>
      </div>
      <div className="remix-body">
        <fieldset>
          <legend>01 Theme</legend>
          <div className="pills">
            {Object.entries(THEMES).map(([k, t]) => (
              <button key={k} className={`pill ${activeTheme === k ? 'pill-on' : ''}`} aria-pressed={activeTheme === k} onClick={() => set({ bg: t.bg, type: t.type, pal: t.pal })}>
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>02 Background</legend>
          <div className="pills">
            {(Object.keys(BACKGROUNDS) as BgKey[]).map((k) => (
              <button key={k} className={`pill ${look.bg === k ? 'pill-on' : ''}`} aria-pressed={look.bg === k} onClick={() => set({ bg: k })}>
                {BACKGROUNDS[k]}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>03 Type</legend>
          <div className="pills pills-2">
            {(Object.keys(TYPES) as TypeKey[]).map((k) => {
              const t = TYPES[k]
              return (
                <button key={k} className={`pill ${look.type === k ? 'pill-on' : ''}`} aria-pressed={look.type === k} onClick={() => set({ type: k })}>
                  <span className="sample" style={{ fontFamily: t.display, fontWeight: t.wt, fontVariationSettings: t.vari }}>Aa</span> {t.label}
                </button>
              )
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend>04 Palette</legend>
          <div className="swatches">
            {(Object.keys(PALETTES) as PaletteKey[]).map((k) => {
              const q = PALETTES[k]
              return (
                <button
                  key={k}
                  className={`swatch ${look.pal === k ? 'swatch-on' : ''}`}
                  aria-label={q.label}
                  aria-pressed={look.pal === k}
                  title={q.label}
                  style={{ background: `linear-gradient(135deg, ${q.p} 50%, ${q.a} 50%)`, boxShadow: `0 0 0 1px ${q.ink}` }}
                  onClick={() => set({ pal: k })}
                />
              )
            })}
          </div>
        </fieldset>
        {look.bg === 'dots' && (
          <label className="say">
            <span>05 Say something</span>
            <input value={word} maxLength={14} placeholder="TYPE A WORD" onChange={(e) => onWord(e.target.value)} />
          </label>
        )}
      </div>
      <p className="remix-foot">Every choice is a design decision. The whole site follows yours.</p>
    </aside>
  )
}
