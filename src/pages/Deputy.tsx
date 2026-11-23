import { Link } from 'react-router-dom'
import Placeholders from '../components/Placeholders'
import { DeputyMark } from '../components/DeputyLogo'

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

const role = [
  ['Owned the experience', 'End-to-end design of the purchasing experience for the launch.'],
  ['One shared picture', 'Product, engineering, marketing, sales and success aligned on one customer journey.'],
  ['Add-ons everywhere', 'One consistent way to buy extras, wherever they appeared.'],
  ['Signed off in QA', 'So what shipped matched what we meant.'],
]

export default function Deputy() {
  return (
    <article className="cs brand brand-deputy ed">
      <header className="cs-hero">
        <DeputyMark className="dp-mark" />
        <div className="ed-wrap ed-hero">
          <div className="ed-hero-main">
            <p className="mono small cs-kicker">Case study · My work at Deputy</p>
            <h1 className="display cs-title">
              Making a new way to pay feel <span className="cs-accent">simple.</span>
            </h1>
            <p className="cs-intro">
              Deputy changed how it prices and packages its product, for every self-serve customer at once. I designed the purchasing
              experience around it: how people choose a plan, check out, add extras, change their minds and, sometimes, leave.
            </p>
          </div>
        </div>
        <dl className="ed-wrap ed-facts">
          <div><dt>Role</dt><dd>Senior product designer, design owner for self-serve purchasing</dd></div>
          <div><dt>Team</dt><dd>Product, engineering, marketing, sales, success</dd></div>
          <div><dt>Scope</dt><dd>Pricing page to cancellation, web and mobile</dd></div>
          <div><dt>Shipped</dt><dd>Company-wide, on a fixed launch date</dd></div>
        </dl>
      </header>

      <Placeholders project="Deputy" />

      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Launch a new pricing and packaging model across the whole self-serve business, without losing customers’ trust.</h2>
          <p className="ed-p">Several billing models, trials, contract types and add-ons all had to live in one experience. The new model was a business decision. My job was to make it understandable, fair-feeling and easy to say yes to.</p>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · What I found</p>
          <div className="ed-main">
            <h2 className="display ed-big">People don’t leave products because they’re hard. They leave because they said yes to something they didn’t understand.</h2>
            <p className="ed-p">Talking to customers and reading why they left, the pattern was clear: trust broke at the moments of decision, when people couldn’t see what they were agreeing to. So the work wasn’t “a new checkout”. It was every moment where a customer says yes.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">03 · My role</p>
        <div className="ed-main">
          <ol className="ed-grid ed-grid-2">
            {role.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · The approach</p>
        <div className="ed-main">
          <h2 className="display ed-h">Four moments where customers say yes.</h2>
          <ol className="ed-grid ed-grid-4">
            {moments.map((m) => (
              <li key={m.n}>
                <span className="ed-step-n">{m.n}</span>
                <b className="ed-moment-t">{m.title}</b>
                <span className="ed-moment-line">{m.line}</span>
                <span>{m.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · What shipped</p>
        <div className="ed-main">
          <dl className="ed-table">
            {shipped.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">06 · Reflection</p>
        <div className="ed-main">
          <h2 className="display ed-h">Pricing is a design problem as much as a commercial one.</h2>
          <p className="ed-p">The price itself rarely loses a customer. Surprise does. Designing for the moment of decision, and making the whole commitment visible before anyone signs, is what turns a pricing change into something customers can trust.</p>
        </div>
      </section>

      <nav className="ed-wrap cs-end" aria-label="More work">
        <Link to="/#work" className="mono small">← All work</Link>
        <Link to="/work/edapp" className="display cs-next">Next: EdApp →</Link>
      </nav>
    </article>
  )
}
