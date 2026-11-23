import { BACKGROUNDS, PALETTES, THEMES, TYPES } from '../theme'
import { BG_KEYS, PAL_KEYS, THEME_KEYS, TYPE_KEYS, typeStyle, useRemix } from './remix'

/** Option B: a contents page. Numbered rows, hairline rules, no boxes. */
export default function RemixContents({ word, onWord }: { word: string; onWord: (w: string) => void }) {
  const r = useRemix()
  return (
    <aside className="contents" aria-label="Remix this page">
      <div className="contents-head">
        <span className="contents-title">Contents</span>
        <button className="contents-shuffle" onClick={r.shuffle}>Shuffle ↻</button>
      </div>
      <div className="contents-row">
        <span className="contents-no">01</span>
        <span className="contents-label">Edition</span>
        <span className="contents-opts">
          {THEME_KEYS.map((k) => (
            <button key={k} className={r.edition === k ? 'is-on' : ''} aria-pressed={r.edition === k} onClick={() => r.setEdition(k)}>{THEMES[k].label}</button>
          ))}
        </span>
      </div>
      <div className="contents-row">
        <span className="contents-no">02</span>
        <span className="contents-label">Paper</span>
        <span className="contents-opts">
          {BG_KEYS.map((k) => (
            <button key={k} className={r.look.bg === k ? 'is-on' : ''} aria-pressed={r.look.bg === k} onClick={() => r.set({ bg: k })}>{BACKGROUNDS[k]}</button>
          ))}
        </span>
      </div>
      <div className="contents-row">
        <span className="contents-no">03</span>
        <span className="contents-label">Typeface</span>
        <span className="contents-opts">
          {TYPE_KEYS.map((k) => (
            <button key={k} className={r.look.type === k ? 'is-on' : ''} aria-pressed={r.look.type === k} onClick={() => r.set({ type: k })} style={typeStyle(k)}>{TYPES[k].label}</button>
          ))}
        </span>
      </div>
      <div className="contents-row">
        <span className="contents-no">04</span>
        <span className="contents-label">Ink</span>
        <span className="contents-opts contents-inks">
          {PAL_KEYS.map((k) => (
            <button key={k} className={`ink ${r.look.pal === k ? 'is-on' : ''}`} aria-pressed={r.look.pal === k} aria-label={PALETTES[k].label} title={PALETTES[k].label} onClick={() => r.set({ pal: k })}>
              <span style={{ background: PALETTES[k].p }} />
              <span style={{ background: PALETTES[k].a }} />
            </button>
          ))}
        </span>
      </div>
      {r.look.bg === 'dots' && (
        <label className="contents-row">
          <span className="contents-no">05</span>
          <span className="contents-label">Headline</span>
          <input className="contents-input" value={word} maxLength={12} placeholder="Type a word" onChange={(e) => onWord(e.target.value)} />
        </label>
      )}
    </aside>
  )
}
