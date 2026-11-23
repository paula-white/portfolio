/*
 * A slow reel of real screens and illustrations from the Deputy work.
 * Only finished, presentation-quality images: no flow maps or internal working files.
 * The row drifts sideways and pauses on hover.
 */

const SCREENS = [
  ['analytics', 'Analytics+ add-on: reports, schedule exports and on-time insights'],
  ['upgrade', 'Upgrade modal: what you unlock by moving to Pro or Core'],
  ['messaging', 'Messaging+ add-on: team chat, read receipts and pinned messages'],
  ['welcome', 'Welcome modals: introducing each plan and add-on after purchase'],
  ['hr', 'HR add-on: documents, signatures, kudos and shift check-ins'],
  ['payroll', 'Payroll add-on: timesheets, pay calendars and payday notifications'],
] as const

export default function DeputyReel() {
  // The list is drawn twice so the loop is seamless; the copy is hidden from screen readers.
  const items = [...SCREENS, ...SCREENS]
  return (
    <div className="reel">
      <div className="reel-row">
        <div className="reel-track reel-track-images">
          {items.map(([name, alt], i) => (
            <figure key={i} className="reel-shot" aria-hidden={i >= SCREENS.length}>
              <img src={`/work/deputy/${name}.jpg`} alt={i < SCREENS.length ? alt : ''} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
