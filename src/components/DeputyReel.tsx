import { MODALS, type ModalKey } from './DeputyModals'

/*
 * A slow reel of rebuilt Deputy plan modals in two rows drifting opposite ways.
 * Hovering pauses it; with reduced motion it holds still and scrolls sideways.
 */

const ROW_A: ModalKey[] = ['upgradePro', 'welcomePayroll', 'welcomeCore', 'welcomeMessaging', 'welcomeLite']
const ROW_B: ModalKey[] = ['welcomeAnalytics', 'upgradeCore', 'welcomeHr', 'welcomePro']

function Row({ keys, reverse }: { keys: ModalKey[]; reverse?: boolean }) {
  // Drawn twice for a seamless loop; the copy is hidden from screen readers.
  return (
    <div className={`reel-row ${reverse ? 'reel-row-reverse' : ''}`}>
      <div className="reel-track reel-track-modals">
        {[...keys, ...keys].map((k, i) => (
          <div key={i} className="reel-modal" aria-hidden={i >= keys.length}>{MODALS[k]}</div>
        ))}
      </div>
    </div>
  )
}

export default function DeputyReel() {
  return (
    <div className="reel" aria-label="Plan upgrade and welcome modals I designed for Deputy, rebuilt">
      <Row keys={ROW_A} />
      <Row keys={ROW_B} reverse />
    </div>
  )
}
