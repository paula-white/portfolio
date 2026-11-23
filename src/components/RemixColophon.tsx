import { BACKGROUNDS, PALETTES, THEMES, TYPES } from '../theme'
import { THEME_KEYS, typeStyle, useRemix } from './remix'

/** Option A: the controls are a sentence, like a magazine colophon. Tap a word to change it. */
export default function RemixColophon({ word, onWord }: { word: string; onWord: (w: string) => void }) {
  const r = useRemix()
  const pal = PALETTES[r.look.pal]
  return (
    <aside className="colophon" aria-label="Remix this page">
      <p className="colophon-kicker">Colophon · remix this page</p>
      <p className="colophon-text">
        This page is set in{' '}
        <button className="choice" style={typeStyle(r.look.type)} onClick={r.cycleType} aria-label={`Typeface: ${TYPES[r.look.type].label}. Change`}>
          {TYPES[r.look.type].label}
        </button>{' '}
        type on{' '}
        <button className="choice" onClick={r.cycleBg} aria-label={`Background: ${BACKGROUNDS[r.look.bg]}. Change`}>
          {BACKGROUNDS[r.look.bg].toLowerCase()}
        </button>
        , inked in{' '}
        <button className="choice" onClick={r.cyclePal} aria-label={`Colours: ${pal.label}. Change`}>
          <span className="ink-dot" style={{ background: pal.p }} />
          <span className="ink-dot" style={{ background: pal.a }} />
          {pal.label.toLowerCase()}
        </button>
        {r.look.bg === 'dots' && (
          <>
            , and the dots are saying{' '}
            <input className="choice-input" value={word} maxLength={14} placeholder="something" aria-label="A word for the dots" onChange={(e) => onWord(e.target.value)} />
          </>
        )}
        .
      </p>
      <p className="colophon-editions">
        <span>Editions</span>
        {THEME_KEYS.map((k) => (
          <button key={k} className={`edition ${r.edition === k ? 'is-on' : ''}`} aria-pressed={r.edition === k} onClick={() => r.setEdition(k)}>
            {THEMES[k].label}
          </button>
        ))}
        <button className="edition" onClick={r.shuffle}>Surprise me ↻</button>
      </p>
    </aside>
  )
}
