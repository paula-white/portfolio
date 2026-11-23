import { Link } from 'react-router-dom'

/*
 * Deputy case study. Public-safe: it describes the work and the thinking, never Deputy's
 * internal numbers. Screens are simplified recreations.
 */

const moments = [
  {
    n: '01',
    title: 'Choose',
    line: 'Recommend what fits, not what costs the most.',
    detail: 'A short question about the team replaced a wall of plan columns, so people could see which plan was theirs.',
  },
  {
    n: '02',
    title: 'Start',
    line: 'Get the whole team in early, without the awkward bits.',
    detail: 'Trials and onboarding nudge people to set up and invite their team, so the product proves itself before anyone pays.',
  },
  {
    n: '03',
    title: 'Commit',
    line: 'Show the whole commitment before anyone signs up to it.',
    detail: 'Checkout spells out the plan, add-ons, contract term and what happens next, in plain words, before the button.',
  },
  {
    n: '04',
    title: 'Stay',
    line: 'Ask why before goodbye, and offer a better option.',
    detail: 'Cancellation asks what changed and offers a pause or a better-fitting plan instead of a dead end.',
  },
]

const shipped = [
  ['Website pricing page', 'Where the decision starts: plans explained in plain words before anyone signs up.'],
  ['Plan selection', 'A guided way to choose, built around team size and needs rather than a feature grid.'],
  ['Checkout', 'One clear summary of plan, add-ons and terms, so the price on the button holds no surprises.'],
  ['All-in-one bundle', 'A single bundle of the whole product, with support for promo codes.'],
  ['Add-ons', 'A consistent way to discover and buy extras, including annual add-ons and self-serve quoting, so customers no longer had to talk to sales.'],
  ['Switching plans', 'Upgrades, downgrades and changes to billing schedules, without losing track of what changes and when.'],
  ['Apple mobile plans', 'Subscribing through the App Store, kept consistent with buying on the web.'],
  ['Churn objection handling', 'An honest exit that listens first, offers a pause or a better-fitting plan, and captures reasons for leaving every add-on, which the business hadn’t had before.'],
]

export default function Deputy() {
  return (
    <article className="cs">
      <header className="cs-hero wrap">
        <p className="mono small cs-kicker">Case study · Deputy · 2024 – now</p>
        <h1 className="display cs-title">
          Making a new way to pay feel <span className="cs-accent">simple.</span>
        </h1>
        <p className="cs-intro">
          Deputy changed how it prices and packages its product, for every self-serve customer at once. I designed the purchasing
          experience around it: how people choose a plan, check out, add extras, change their minds and, sometimes, leave.
        </p>
        <dl className="cs-facts">
          <div><dt>Role</dt><dd>Senior product designer, design owner for self-serve purchasing</dd></div>
          <div><dt>Team</dt><dd>Product, engineering, marketing, sales and customer success</dd></div>
          <div><dt>Scope</dt><dd>Pricing page to cancellation, on web and mobile</dd></div>
          <div><dt>Shipped</dt><dd>Company-wide, on a fixed launch date</dd></div>
        </dl>
      </header>

      <section className="cs-visual wrap" aria-label="Simplified checkout screen">
        <div className="cs-stage">
          <div className="cs-screen" aria-hidden="true">
            <div className="cs-screen-bar"><span /><span /><span /></div>
            <div className="cs-screen-body">
              <div className="cs-col">
                <span className="cs-ui-label">Your plan</span>
                <b className="cs-ui-h">Growing team</b>
                <span className="cs-ui-muted">Recommended for 12 people across 2 locations</span>
                <div className="cs-ui-rows">
                  <span><i>Plan</i><i>Monthly</i></span>
                  <span><i>Add-on · Messaging</i><i>Included in trial</i></span>
                  <span><i>Contract</i><i>Month to month</i></span>
                </div>
              </div>
              <div className="cs-col cs-col-summary">
                <span className="cs-ui-label">What happens next</span>
                <ol className="cs-ui-steps">
                  <li>Your trial keeps going until Friday</li>
                  <li>We remind you three days before</li>
                  <li>You can change or pause any time</li>
                </ol>
                <span className="cs-ui-btn">Continue</span>
              </div>
            </div>
          </div>
        </div>
        <p className="cs-caption">Screens are simplified recreations to show the thinking. Names and content are illustrative.</p>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The brief</p>
        <div className="cs-body">
          <p className="cs-lead">Launch a new pricing and packaging model across the whole self-serve business, without losing customers’ trust along the way.</p>
          <p>Several billing models, trials, contract types and add-ons all had to live in one experience. The new model was a business decision; my job was to make it understandable, fair-feeling and easy to say yes to.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I found</p>
        <div className="cs-body">
          <blockquote className="display cs-quote">People don’t leave products because they’re hard. They leave because they said yes to something they didn’t understand.</blockquote>
          <p>Talking to customers and reading why they left, the pattern was clear: trust broke at the moments of decision, when people couldn’t see what they were agreeing to. So the work wasn’t “a new checkout”. It was every moment where a customer says yes.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">My role</p>
        <div className="cs-body">
          <ul className="cs-list">
            <li>Owned the end-to-end design of the purchasing experience for the launch.</li>
            <li>Brought product, engineering, marketing, sales and success to one shared picture of the customer journey.</li>
            <li>Designed the add-on buying experience so extras felt consistent everywhere they appeared.</li>
            <li>Signed off the experience in QA before launch, so what shipped matched what we meant.</li>
          </ul>
        </div>
      </section>

      <section className="cs-moments wrap" aria-labelledby="moments">
        <div className="cs-moments-head">
          <p className="mono small cs-label">The approach</p>
          <h2 id="moments" className="display cs-h2">Four moments where customers say yes.</h2>
        </div>
        <ol className="cs-moment-list">
          {moments.map((m) => (
            <li key={m.n} className="cs-moment">
              <span className="cs-moment-n">{m.n}</span>
              <span className="display cs-moment-t">{m.title}</span>
              <span className="cs-moment-line">{m.line}</span>
              <span className="cs-moment-detail">{m.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What shipped</p>
        <div className="cs-body">
          <dl className="cs-shipped">
            {shipped.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I’d take with me</p>
        <div className="cs-body">
          <p className="cs-lead">Pricing is a design problem as much as a commercial one.</p>
          <p>The price itself rarely loses a customer. Surprise does. Designing for the moment of decision, and making the whole commitment visible before anyone signs, is what turns a pricing change into something customers can trust.</p>
        </div>
      </section>

      <nav className="cs-end wrap" aria-label="More work">
        <Link to="/#work" className="mono small">← All work</Link>
        <Link to="/work/digital-resonance" className="display cs-next">Next: Digital Resonance →</Link>
      </nav>
    </article>
  )
}
