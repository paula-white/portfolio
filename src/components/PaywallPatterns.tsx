import { useState } from 'react'

/*
 * Deputy paywall patterns. Click a pattern to see its flow, from the locked feature to checkout.
 * Below, the individual upgrade moments at full fidelity. Images live under /work/, behind the case-study password.
 */
const BASE = '/work/deputy/paywalls/'

const PATTERNS = [
  { key: 'fullscreen', name: 'Full screen', sub: 'Generic upsell' },
  { key: 'inline-feature', name: 'Inline', sub: 'Feature value prop' },
  { key: 'inline-generic', name: 'Inline', sub: 'Generic upsell' },
  { key: 'tooltip', name: 'Tooltip', sub: 'Feature value prop' },
]

const MOMENTS = [
  { key: 'upgrade-core', name: 'Upgrade to Core', plan: 'Core' },
  { key: 'upgrade-pro', name: 'Upgrade to Pro', plan: 'Pro' },
  { key: 'fv-auto-scheduling', name: 'Auto-scheduling', plan: 'Core' },
  { key: 'fv-micro-scheduling', name: 'Micro-scheduling', plan: 'Core' },
  { key: 'fv-locations', name: 'Location hierarchy', plan: 'Pro' },
  { key: 'fv-access-levels', name: 'Custom access levels', plan: 'Pro' },
]

export default function PaywallPatterns() {
  const [p, setP] = useState(0)
  const [m, setM] = useState(0)
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
        </div>
      </div>

      <div className="pw-moments">
        <p className="pp-list-t">Upgrade value props</p>
        <div className="pw-mgrid">
          <div className="pw-mtabs" role="tablist" aria-label="Upgrade value props">
            {MOMENTS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={m === i} className={`pw-mtab ${m === i ? 'is-on' : ''}`} onClick={() => setM(i)}>{x.name}<span className="pw-plan">{x.plan}</span></button>
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
