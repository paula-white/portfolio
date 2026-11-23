import { BACKGROUNDS, PALETTES, THEMES, TYPES } from '../theme'
import { BG_KEYS, PAL_KEYS, THEME_KEYS, TYPE_KEYS, typeStyle, useRemix } from './remix'

/** Option C: a printer's proof strip along the bottom: specimens, paper stock and colour bars. */
export default function RemixPrintBar({ word, onWord }: { word: string; onWord: (w: string) => void }) {
  const r = useRemix()
  return (
    <aside className="printbar" aria-label="Remix this page">
      <div className="pb-cell pb-edition">
        <span className="pb-label">Edition</span>
        <span className="pb-list">
          {THEME_KEYS.map((k) => (
            <button key={k} className={r.edition === k ? 'is-on' : ''} aria-pressed={r.edition === k} onClick={() => r.setEdition(k)}>{THEMES[k].label}</button>
          ))}
        </span>
      </div>
      <div className="pb-cell">
        <span className="pb-label">Typeface</span>
        <span className="pb-specimens">
          {TYPE_KEYS.map((k) => (
            <button key={k} className={r.look.type === k ? 'is-on' : ''} aria-pressed={r.look.type === k} aria-label={TYPES[k].label} title={TYPES[k].label} onClick={() => r.set({ type: k })} style={typeStyle(k)}>Aa</button>
          ))}
        </span>
      </div>
      <div className="pb-cell">
        <span className="pb-label">Paper</span>
        <span className="pb-list">
          {BG_KEYS.map((k) => (
            <button key={k} className={r.look.bg === k ? 'is-on' : ''} aria-pressed={r.look.bg === k} onClick={() => r.set({ bg: k })}>{BACKGROUNDS[k]}</button>
          ))}
        </span>
      </div>
      <div className="pb-cell pb-inks">
        <span className="pb-label">Ink</span>
        <span className="pb-bars">
          {PAL_KEYS.map((k) => (
            <button key={k} className={r.look.pal === k ? 'is-on' : ''} aria-pressed={r.look.pal === k} aria-label={PALETTES[k].label} title={PALETTES[k].label} onClick={() => r.set({ pal: k })}>
              <span style={{ background: PALETTES[k].p }} />
              <span style={{ background: PALETTES[k].a }} />
            </button>
          ))}
        </span>
      </div>
      <div className="pb-cell pb-end">
        {r.look.bg === 'dots' ? (
          <>
            <span className="pb-label">Headline</span>
            <input className="pb-input" value={word} maxLength={14} placeholder="Type a word" aria-label="A word for the dots" onChange={(e) => onWord(e.target.value)} />
          </>
        ) : (
          <>
            <span className="pb-label">Proof Nº 1</span>
            <button className="pb-shuffle" onClick={r.shuffle}>Shuffle ↻</button>
          </>
        )}
      </div>
    </aside>
  )
}
