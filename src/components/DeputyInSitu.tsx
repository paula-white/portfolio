import { MODALS } from './DeputyModals'

/*
 * In-situ device shots, built in code: a laptop on perforated metal, a tablet on warm
 * timber slats, and a tablet on black folded ridges. Each screen is a rebuilt Deputy modal.
 */

function AppChrome({ children }: { children: React.ReactNode }) {
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

export default function DeputyInSitu() {
  return (
    <div className="insitu">
      <figure className="scene scene-metal">
        <div className="laptop">
          <div className="laptop-lid"><div className="laptop-screen"><AppChrome>{MODALS.upgradePro}</AppChrome></div></div>
          <div className="laptop-base" />
        </div>
        <figcaption>Upgrade to Pro</figcaption>
      </figure>
      <figure className="scene scene-wood">
        <div className="ipad ipad-wood"><div className="ipad-screen"><AppChrome>{MODALS.welcomePayroll}</AppChrome></div></div>
        <figcaption>Welcome to Payroll</figcaption>
      </figure>
      <figure className="scene scene-ridge">
        <div className="ipad ipad-ridge"><div className="ipad-screen"><AppChrome>{MODALS.welcomeCore}</AppChrome></div></div>
        <figcaption>Welcome to Core</figcaption>
      </figure>
    </div>
  )
}
