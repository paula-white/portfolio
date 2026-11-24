/*
 * The pricing and packaging change, mapped. Two parts:
 * 1. The package itself: five old plans replaced by three new ones.
 * 2. Everything that change had to work across: product areas, ways to buy, and the support around them.
 * Redrawn from Paula's working map; no internal numbers.
 */
const OLD = ['Flexi', 'Scheduling only', 'Timesheets only', 'Premium', 'Freemium (US)']
const NEW = ['Lite', 'Core', 'Pro']

const PRODUCT_COLS = ['Foundations', 'Scheduling', 'Timesheets', 'Compliance', 'And more']
const PRODUCT_ROWS = ['Paywalls and feature gating', 'Migration', 'Desktop · tablet · mobile', 'In-app guides and education emails']
const BILLING_ROWS = ['Regions and currencies', 'Upgrades · downgrades · cancels', 'Different billing schedules (3)', 'Base plan + add-on combinations', 'Mobile plans (Apple subscriptions)', 'Website pricing', 'Plans value prop']
const SHARED_ROWS = ['Comms to existing customers', 'Help articles', 'Support']

/* Five plans out, three plans in. Every old plan has a line to every new plan: where a customer landed depended on them. */
export function PlanShift() {
  const W = 1000, H = 420, L = 300, R = 700
  const oy = OLD.map((_, i) => 50 + i * 80)
  const ny = NEW.map((_, i) => 90 + i * 120)
  return (
    <div className="pp-shift">
      <div className="pp-shift-heads"><span>Before · five plans</span><span>After · three plans</span></div>
      <div className="pp-scroll">
        <svg className="pp-shift-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Five old plans (${OLD.join(', ')}) replaced by three new plans (${NEW.join(', ')})`}>
          {oy.map((y1, i) => ny.map((y2, j) => (
            <path key={`${i}-${j}`} d={`M${L},${y1} C${(L + R) / 2},${y1} ${(L + R) / 2},${y2} ${R},${y2}`} className="pp-flow" />
          )))}
          {OLD.map((o, i) => (
            <g key={o}>
              <text x={L - 22} y={oy[i]} className="pp-old" dominantBaseline="middle" textAnchor="end">{o}</text>
              <circle cx={L} cy={oy[i]} r={5} className="pp-old-dot" />
            </g>
          ))}
          {NEW.map((n, j) => (
            <g key={n}>
              <rect x={R - 3} y={ny[j] - 30} width={6} height={60} rx={3} className="pp-new-bar" />
              <text x={R + 26} y={ny[j]} className="pp-new" dominantBaseline="middle">{n}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

/*
 * Layered map, after the original whiteboard: products and plans stand as columns,
 * and each dependency is a band cutting across every column it touches.
 */
export default function PPMap() {
  const P = PRODUCT_COLS.length, N = NEW.length
  const planStart = P + 2 // one spacer column between the two groups
  const lastRow = 2 + Math.max(PRODUCT_ROWS.length, BILLING_ROWS.length)
  return (
    <figure className="pp-map">
      <div className="pp-scroll">
        <div className="pp-stack" style={{ gridTemplateColumns: `repeat(${P}, minmax(0, 1fr)) 28px repeat(${N}, minmax(0, 1fr))` }}>
          <p className="pp-group-t" style={{ gridColumn: `1 / ${P + 1}`, gridRow: 1 }}>In the product</p>
          <p className="pp-group-t" style={{ gridColumn: `${planStart} / span ${N}`, gridRow: 1 }}>In billing</p>
          {PRODUCT_COLS.map((c, i) => (
            <div key={c} className={`pp-pillar ${c === 'And more' ? 'is-more' : ''}`} style={{ gridColumn: i + 1, gridRow: `2 / ${lastRow + 1 + SHARED_ROWS.length}` }}><span>{c}</span></div>
          ))}
          {NEW.map((c, i) => (
            <div key={c} className="pp-pillar is-plan" style={{ gridColumn: planStart + i, gridRow: `2 / ${lastRow + 1 + SHARED_ROWS.length}` }}><span>{c}</span></div>
          ))}
          {PRODUCT_ROWS.map((r, i) => (
            <div key={r} className="pp-band is-product" style={{ gridColumn: `1 / ${P + 1}`, gridRow: 3 + i }}>{r}</div>
          ))}
          {BILLING_ROWS.map((r, i) => (
            <div key={r} className="pp-band is-billing" style={{ gridColumn: `${planStart} / span ${N}`, gridRow: 3 + i }}>{r}</div>
          ))}
          {SHARED_ROWS.map((r, i) => (
            <div key={r} className="pp-band is-shared" style={{ gridColumn: '1 / -1', gridRow: lastRow + 1 + i }}>{r}</div>
          ))}
        </div>
      </div>
      <figcaption className="pp-cap">Every band had to work across every column it crosses, on day one. Redrawn from my working map.</figcaption>
    </figure>
  )
}
