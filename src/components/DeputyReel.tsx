/*
 * A slow reel of simplified, recreated screens from the Deputy billing work.
 * Everything here is illustrative: made-up names and figures, no real Deputy assets.
 * Two rows drift in opposite directions; hovering pauses them.
 */

function Bars() {
  const h = [38, 52, 44, 70, 58, 82, 64, 90, 72]
  return (
    <div className="ui-bars" aria-hidden="true">
      {h.map((v, i) => <span key={i} style={{ height: `${v}%` }} />)}
    </div>
  )
}

const cards = {
  analytics: (
    <div className="ui-card">
      <span className="ui-eyebrow">Analytics+</span>
      <b className="ui-h">Create a new report</b>
      <Bars />
      <div className="ui-row"><span>On time this week</span><b>80%</b></div>
      <span className="ui-btn">Create report</span>
    </div>
  ),
  hr: (
    <div className="ui-card">
      <span className="ui-eyebrow">HR</span>
      <b className="ui-h">How did you feel during your shift today?</b>
      <div className="ui-chips"><span className="on">Happy</span><span>Good</span><span>Okay</span><span>Stressed</span></div>
      <div className="ui-row"><span>Employment agreement</span><span className="ui-tag">Sign here</span></div>
    </div>
  ),
  messaging: (
    <div className="ui-card">
      <span className="ui-eyebrow">Messaging+</span>
      <div className="ui-bubble">Hey team, our work event is on the 24th 🎉</div>
      <div className="ui-bubble me">See you there</div>
      <div className="ui-row"><span>Read by</span><b>15 people</b></div>
    </div>
  ),
  payroll: (
    <div className="ui-card ui-card-center">
      <span className="ui-eyebrow">Payroll</span>
      <b className="ui-h">You just got paid</b>
      <b className="ui-big">$1,598.55</b>
      <div className="ui-stats"><span><b>24</b>hours</span><span><b>6</b>shifts</span></div>
    </div>
  ),
  upgrade: (
    <div className="ui-card">
      <span className="ui-eyebrow">Upgrade</span>
      <b className="ui-h">Upgrade to Pro</b>
      <ul className="ui-list"><li>More customisation</li><li>Deeper insights</li><li>Stronger collaboration</li></ul>
      <span className="ui-btn">Continue</span>
    </div>
  ),
  welcome: (
    <div className="ui-card">
      <span className="ui-eyebrow">Welcome</span>
      <b className="ui-h">Welcome to Messaging+</b>
      <span className="ui-muted">Here’s what you can do now</span>
      <ul className="ui-list"><li>Team groups and channels</li><li>Read receipts and polls</li><li>Announcements</li></ul>
    </div>
  ),
  cancel: (
    <div className="ui-card">
      <span className="ui-eyebrow">Before you go</span>
      <b className="ui-h">What’s changed?</b>
      <div className="ui-option">It’s our quiet season</div>
      <div className="ui-option">We’re trying another tool</div>
      <span className="ui-btn">Pause instead</span>
    </div>
  ),
  switching: (
    <div className="ui-card">
      <span className="ui-eyebrow">Your plan</span>
      <div className="ui-toggle"><span>Monthly</span><span className="on">Annual</span></div>
      <div className="ui-option on">Core <i>Current</i></div>
      <div className="ui-option">Pro <i>Upgrade</i></div>
    </div>
  ),
  bundle: (
    <div className="ui-card">
      <span className="ui-eyebrow">All-in-one</span>
      <b className="ui-h">Everything, one plan</b>
      <div className="ui-chips"><span>Scheduling</span><span>HR</span><span>Payroll</span><span>Messaging</span></div>
      <div className="ui-input">Promo code <i>Apply</i></div>
    </div>
  ),
  quote: (
    <div className="ui-card">
      <span className="ui-eyebrow">Add-on quote</span>
      <div className="ui-row"><span>Analytics+</span><span className="ui-stepper">− 12 +</span></div>
      <div className="ui-row"><span>Billed</span><b>Annually</b></div>
      <div className="ui-row ui-total"><span>Total</span><b>Shown before you buy</b></div>
    </div>
  ),
  apple: (
    <div className="ui-card ui-card-sheet">
      <span className="ui-eyebrow">App Store</span>
      <b className="ui-h">Subscribe to Core</b>
      <span className="ui-muted">Same plan, same price as on the web</span>
      <span className="ui-btn ui-btn-block">Subscribe</span>
    </div>
  ),
  checkout: (
    <div className="ui-card">
      <span className="ui-eyebrow">Checkout</span>
      <b className="ui-h">Growing team</b>
      <div className="ui-row"><span>Plan</span><span>Monthly</span></div>
      <div className="ui-row"><span>Messaging+</span><span>Added</span></div>
      <div className="ui-row"><span>Contract</span><span>Month to month</span></div>
    </div>
  ),
}

type Key = keyof typeof cards
const ROW_A: Key[] = ['checkout', 'upgrade', 'messaging', 'switching', 'payroll', 'cancel']
const ROW_B: Key[] = ['welcome', 'analytics', 'bundle', 'apple', 'hr', 'quote']

function Row({ keys, reverse }: { keys: Key[]; reverse?: boolean }) {
  // The list is drawn twice so the loop is seamless; the copy is hidden from screen readers.
  return (
    <div className={`reel-row ${reverse ? 'reel-row-reverse' : ''}`}>
      <div className="reel-track">
        {[...keys, ...keys].map((k, i) => (
          <div key={i} className="reel-item" aria-hidden={i >= keys.length}>{cards[k]}</div>
        ))}
      </div>
    </div>
  )
}

export default function DeputyReel() {
  return (
    <div className="reel" role="img" aria-label="Simplified recreations of screens from the Deputy billing work: checkout, upgrades, add-ons, plan switching, payroll, cancellation, an all-in-one bundle and App Store plans.">
      <Row keys={ROW_A} />
      <Row keys={ROW_B} reverse />
    </div>
  )
}
