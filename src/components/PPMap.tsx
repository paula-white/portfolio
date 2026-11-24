/*
 * The pricing and packaging change, mapped: every product area and every plan it crossed,
 * and every system that had to change with it. Each dot is a place one decision could break.
 * Redrawn from Paula's working map; no internal numbers.
 */
const PRODUCT_COLS = ['Foundations', 'Scheduling', 'Timesheets', 'Analytics', 'Compliance']
const PLAN_COLS = ['Good', 'Better', 'Best']
const PRODUCT_ROWS = ['Paywalls', 'Feature gating', 'Migration', 'Desktop · tablet · mobile', 'In-app guides and education emails']
const BILLING_ROWS = ['Regions and currencies', 'Upgrades · downgrades · cancels', 'Month to month', 'Annual upfront', 'Annual billed monthly', 'Base plan + add-on combinations', 'Add-ons', 'Website pricing', 'Plan messaging']
const SHARED_ROWS = ['Comms to existing customers', 'Help articles', 'Support']

const TOUCHPOINTS =
  PRODUCT_COLS.length * PRODUCT_ROWS.length +
  PLAN_COLS.length * BILLING_ROWS.length +
  (PRODUCT_COLS.length + PLAN_COLS.length) * SHARED_ROWS.length

function Group({ title, cols, rows }: { title: string; cols: string[]; rows: string[] }) {
  return (
    <div className="pp-group">
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
          <p className="pp-top">Every customer</p>
          <div className="pp-groups">
            <Group title="In the product" cols={PRODUCT_COLS} rows={PRODUCT_ROWS} />
            <Group title="In billing" cols={PLAN_COLS} rows={BILLING_ROWS} />
          </div>
          <div className="pp-shared">
            {SHARED_ROWS.map((r) => (
              <div key={r} className="pp-row">
                <span className="pp-row-t">{r}</span>
                <span className="pp-span" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="pp-cap"><b>{TOUCHPOINTS}</b> places where one pricing decision had to work, redrawn from my working map.</figcaption>
    </figure>
  )
}
