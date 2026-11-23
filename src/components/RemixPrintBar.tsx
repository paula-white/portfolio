import { useEffect, useState } from 'react'
import { BACKGROUNDS, PALETTES, TYPES } from '../theme'
import { ColophonSentence } from './RemixColophon'
import { BG_KEYS, PAL_KEYS, TYPE_KEYS, typeStyle, useRemix } from './remix'

const TIP_KEY = 'pw-remix-tip'

/** Option C: a printer's proof strip along the bottom: specimens, paper stock and colour bars. */
export default function RemixPrintBar() {
  const r = useRemix()
  // First visit: a proofreader's note points at the bar until it's used once.
  const [tip, setTip] = useState(false)
  useEffect(() => {
    let seen = false
    try { seen = localStorage.getItem(TIP_KEY) === '1' } catch { /* show it */ }
    if (seen) return
    const t = setTimeout(() => setTip(true), 1400)
    return () => clearTimeout(t)
  }, [])
  const dismiss = () => {
    setTip(false)
    try { localStorage.setItem(TIP_KEY, '1') } catch { /* ignore */ }
  }

  return (
    <aside className={`printbar ${tip ? 'has-tip' : ''}`} aria-label="Remix this page" onClickCapture={(e) => { if (tip && !(e.target as HTMLElement).closest('.pb-tip')) dismiss() }}>
      {tip && (
        <div className="pb-tip" role="note">
          <p className="pb-tip-kicker">Psst, you’re the editor</p>
          <ColophonSentence className="pb-tip-text" />
          <p className="pb-tip-sub">Tap an underlined word, or use the proof bar below. The whole site follows.</p>
          <span className="pb-tip-actions">
            <button onClick={r.shuffle}>Show me ↻</button>
            <button onClick={dismiss} aria-label="Dismiss">Got it ×</button>
          </span>
          <svg className="pb-tip-arrow" viewBox="0 0 60 48" aria-hidden="true"><path d="M54 4 C 50 26, 34 36, 16 40 M24 33 L15 40 L25 46" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
      <div className="pb-cell">
        <span className="pb-label">Typeface</span>
        <span className="pb-specimens">
          {TYPE_KEYS.map((k, i) => (
            <button key={k} className={r.look.type === k ? 'is-on' : ''} aria-pressed={r.look.type === k} aria-label={TYPES[k].label} title={TYPES[k].label} onClick={() => r.set({ type: k })} style={{ ...typeStyle(k), animationDelay: `${1.6 + i * 0.12}s` }}>Aa</button>
          ))}
        </span>
      </div>
      <div className="pb-cell">
        <span className="pb-label">Background</span>
        <span className="pb-list">
          {BG_KEYS.map((k) => (
            <button key={k} className={r.look.bg === k ? 'is-on' : ''} aria-pressed={r.look.bg === k} onClick={() => r.set({ bg: k })}>{BACKGROUNDS[k]}</button>
          ))}
        </span>
      </div>
      <div className="pb-cell pb-inks">
        <span className="pb-label">Colour</span>
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
        <span className="pb-label">Remix this page</span>
        <button className="pb-shuffle" onClick={r.shuffle}>Shuffle ↻</button>
      </div>
    </aside>
  )
}
