/*
 * The pricing and packaging change, mapped. Two parts:
 * 1. The package itself: five old plans replaced by three new ones.
 * 2. Everything that change had to work across: product areas, ways to buy, and the support around them.
 * Redrawn from Paula's working map; no internal numbers.
 */
const OLD = ['Flexi', 'Scheduling only', 'Timesheets only', 'Premium', 'Freemium (US)']
const NEW = ['Lite', 'Core', 'Pro']

const PRODUCT_COLS = ['Foundations', 'Scheduling', 'Timesheets', 'Analytics', 'Compliance']
const PRODUCT_ROWS = ['Paywalls', 'Feature gating', 'Migration', 'Desktop · tablet · mobile', 'In-app guides and education emails']
const BILLING_ROWS = ['Regions and currencies', 'Upgrades · downgrades · cancels', 'Month to month', 'Annual upfront', 'Annual billed monthly', 'Base plan + add-on combinations', 'Add-ons', 'Website pricing', 'Plan messaging']
const SHARED_ROWS = ['Comms to existing customers', 'Help articles', 'Support']

export const TOUCHPOINTS =
  PRODUCT_COLS.length * PRODUCT_ROWS.length + NEW.length * BILLING_ROWS.length + (PRODUCT_COLS.length + NEW.length) * SHARED_ROWS.length

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

function Group({ title, cols, rows, tone }: { title: string; cols: string[]; rows: string[]; tone: 'a' | 'b' }) {
  return (
    <div className={`pp-group pp-tone-${tone}`}>
      <p className="pp-group-t">{title}</p>
      <div className="pp-grid" style={{ ['--cols' as string]: cols.length }}>
        <div className="pp-cols">{cols.map((c) => <span key={c}>{c}</span>)}</div>
        {rows.map((r) => (
          <div key={r} className="pp-row">
            <span className="pp-row-t">{r}</span>
            <span className="pp-dots" aria-hidden="true">{cols.map((c) => <i key={c} />)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PPMap() {
  return (
    <figure className="pp-map">
      <div className="pp-scroll">
        <div className="pp-inner">
          <div className="pp-groups">
            <Group title="Across the product" cols={PRODUCT_COLS} rows={PRODUCT_ROWS} tone="a" />
            <Group title="Across every way to buy" cols={NEW} rows={BILLING_ROWS} tone="b" />
          </div>
          <div className="pp-shared">
            <p className="pp-group-t">Around all of it</p>
            {SHARED_ROWS.map((r) => (
              <div key={r} className="pp-row">
                <span className="pp-row-t">{r}</span>
                <span className="pp-span" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="pp-cap"><b>{TOUCHPOINTS}</b> places where the new package had to work on day one. Redrawn from my working map.</figcaption>
    </figure>
  )
}
