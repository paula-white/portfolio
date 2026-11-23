import type { ReactNode } from 'react'
import { MODALS, type ModalKey } from './DeputyModals'

/*
 * In-situ device scenes, built in code; each screen is a rebuilt Deputy modal.
 */

function AppChrome({ children }: { children: ReactNode }) {
  // A dimmed app behind the modal, so it reads as a real moment in the product.
  return (
    <div className="dev-app">
      <div className="dev-app-bar"><span className="dev-logo" /><i /><i /><i /><b /></div>
      <div className="dev-app-body"><span /><span /><span /><span /></div>
      <div className="dev-app-scrim" />
      <div className="dev-app-modal">{children}</div>
    </div>
  )
}

const laptop = (k: ModalKey) => (
  <div className="laptop">
    <div className="laptop-lid"><div className="laptop-screen"><AppChrome>{MODALS[k]}</AppChrome></div></div>
    <div className="laptop-base" />
  </div>
)
const ipad = (k: ModalKey, tilt: string) => (
  <div className={`ipad ${tilt}`}><div className="ipad-screen"><AppChrome>{MODALS[k]}</AppChrome></div></div>
)

const SCENES: { surface: string; label: string; device: ReactNode }[] = [
  { surface: 'scene-metal', label: 'Upgrade to Pro', device: laptop('upgradePro') },
  { surface: 'scene-wood', label: 'Welcome to Payroll', device: ipad('welcomePayroll', 'ipad-wood') },
  { surface: 'scene-ridge', label: 'Welcome to Core', device: ipad('welcomeCore', 'ipad-ridge') },
  { surface: 'scene-plum', label: 'Welcome to Messaging+', device: laptop('welcomeMessaging') },
  { surface: 'scene-stone', label: 'Upgrade to Core', device: ipad('upgradeCore', 'ipad-flat') },
  { surface: 'scene-wood', label: 'Welcome to Analytics+', device: ipad('welcomeAnalytics', 'ipad-ridge') },
  { surface: 'scene-metal', label: 'Welcome to Lite', device: laptop('welcomeLite') },
]

/** Three static scenes. Placeholders until real photo composites replace them. */
export default function DeputyInSitu() {
  return (
    <div className="insitu wrap">
      {SCENES.slice(0, 3).map((s, i) => (
        <figure key={i} className={`scene ${s.surface}`}>
          {s.device}
          <figcaption>{s.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
