import { useState } from 'react'

/*
 * Deputy paywall patterns. Click a pattern to see its flow, from the locked feature to checkout.
 * Below, the individual upgrade moments at full fidelity. Images live under /work/, behind the case-study password.
 */
const BASE = '/work/deputy/paywalls/'

const PATTERNS = [
  { key: 'fullscreen', name: 'Full screen', sub: 'Generic upsell', line: 'The whole feature page becomes the paywall, then the upgrade explains the plan.' },
  { key: 'inline-feature', name: 'Inline', sub: 'Feature value prop', line: 'The setting stays in place with an upgrade prompt beside it, then a modal sells that one feature.' },
  { key: 'inline-generic', name: 'Inline', sub: 'Generic upsell', line: 'The same inline prompt, followed by the plan’s wider benefits.' },
  { key: 'tooltip', name: 'Tooltip', sub: 'Feature value prop', line: 'A locked menu item explains itself on hover, then a modal sells that feature.' },
]

const MOMENTS = [
  { key: 'upgrade-core', name: 'Upgrade to Core' },
  { key: 'upgrade-pro', name: 'Upgrade to Pro' },
]

export default function PaywallPatterns() {
  const [p, setP] = useState(0)
  const [m, setM] = useState(0)
  const pat = PATTERNS[p]
  return (
    <div className="pw">
      <div className="pw-flow">
        <div className="pw-tabs" role="tablist" aria-label="Paywall patterns">
          {PATTERNS.map((x, i) => (
            <button key={x.key} role="tab" aria-selected={p === i} className={`pw-tab ${p === i ? 'is-on' : ''}`} onClick={() => setP(i)}>
              <span className="pw-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="pw-name">{x.name}<em>{x.sub}</em></span>
            </button>
          ))}
        </div>
        <div className="pw-stage" role="tabpanel">
          <div className="pw-frame">
            {PATTERNS.map((x, i) => (
              <img key={x.key} src={`${BASE}flow-${x.key}.webp`} alt={`${x.name} paywall with ${x.sub.toLowerCase()}: locked feature, upsell, then checkout`} className={p === i ? 'is-on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
          <div className="pw-steps"><span>Locked feature</span><span>Upsell</span><span>Checkout</span></div>
          <p className="pw-line">{pat.line}</p>
        </div>
      </div>

      <div className="pw-moments">
        <p className="pp-list-t">Upgrade value props</p>
        <div className="pw-mgrid">
          <div className="pw-mtabs" role="tablist" aria-label="Upgrade value props">
            {MOMENTS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={m === i} className={`pw-mtab ${m === i ? 'is-on' : ''}`} onClick={() => setM(i)}>{x.name}</button>
            ))}
          </div>
          <div className="pw-mstage">
            {MOMENTS.map((x, i) => (
              <img key={x.key} src={`${BASE}${x.key}.webp`} alt={x.name} className={m === i ? 'is-on' : ''} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
