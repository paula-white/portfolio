import MoreWork from '../components/MoreWork'
import PPMap, { PlanShift } from '../components/PPMap'
import PaywallPatterns from '../components/PaywallPatterns'
import { DeputyMark } from '../components/DeputyLogo'

/*
 * Deputy case study. Public-safe: it describes the work and the thinking, never Deputy's
 * internal numbers. Screens are simplified recreations.
 */

const risks = [
  ['Hidden value', 'Hiding features at launch made upgrading feel worth less, and temporary access added another layer of messaging.'],
  ['Wrong access', 'A visibility glitch could show features outside a plan, or hide ones a customer had paid for.'],
  ['Partner embeds', 'Upgrade prompts leaking into embedded experiences could show up in front of partners’ customers.'],
  ['Blocked downgrades', 'Complex features could block a downgrade until customers untangled the dependencies themselves.'],
  ['Payment', 'Customers unable to buy, or charged the wrong total.'],
  ['Trust', 'It touched every part of the product and every customer, so any bug would travel far.'],
]

const hard = [
  'Discovery first: mapping how billing, sign-up and email flows actually worked',
  'Migrating customers without breaking the workflows they relied on',
  'Testing every paywall for every role, on every plan',
  'Keeping strategic customers exactly as they were, including embeds',
  'Testing alongside other teams’ releases, where bugs were harder to trace',
]

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
      <header className="cs-hero dp-hero">
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
        <div className="ed-wrap">
          <dl className="cs-facts">
            <div><dt>Role</dt><dd>Senior product designer, design owner for self-serve purchasing</dd></div>
            <div><dt>Team</dt><dd>Product, engineering, marketing, sales and customer success</dd></div>
            <div><dt>Scope</dt><dd>Pricing page to cancellation, on web and mobile</dd></div>
            <div><dt>Shipped</dt><dd>Company-wide, on a fixed launch date</dd></div>
          </dl>
        </div>
      </header>


      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Launch a new pricing and packaging model across the whole self-serve business, without losing customers’ trust.</h2>
          <p className="ed-p">Several billing models, trials, contract types and add-ons all had to live in one experience. The new model was a business decision. My job was to make it understandable, fair-feeling and easy to say yes to.</p>
        </div>
      </section>

      <section className="pp-panel">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · What it touched</p>
          <div className="ed-main">
            <h2 className="display ed-h">Not a price change. A completely new package.</h2>
            <p className="ed-p">Five plans, including a free plan in the US, were replaced by three. Every existing customer had to move, and every part of the product had to know what each plan could do.</p>
            <dl className="pp-stats">
              <div><dt>Plans</dt><dd>5 → 3</dd></div>
              <div><dt>Billing schedules</dt><dd>Mixed</dd><p className="pp-stat-note">Base plans + add-on products</p></div>
              <div><dt>Product areas</dt><dd>Every</dd></div>
              <div><dt>Customers moved</dt><dd>35K+</dd></div>
            </dl>
            <PlanShift />
            <PPMap />
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">What it meant</p>
        <div className="ed-main">
          <div className="pp-lists">
            <div>
              <p className="pp-list-t">What could go wrong</p>
              <dl className="pp-risks">{risks.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
            </div>
            <div>
              <p className="pp-list-t">What made it hard</p>
              <ol className="pp-hard">{hard.map((h) => <li key={h}>{h}</li>)}</ol>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">Paywall patterns</p>
        <div className="ed-main">
          <h2 className="display ed-h">One paywall doesn’t fit every feature.</h2>
          <p className="ed-p">Some features are whole pages, some are a single setting, some live in the navigation. So the paywall had to fit the way each feature works, and every pattern had to end in the same checkout.</p>
          <PaywallPatterns />
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">03 · What I found</p>
          <div className="ed-main">
            <h2 className="display ed-big">People don’t leave products because they’re hard. They leave because they said yes to something they didn’t understand.</h2>
            <p className="ed-p">Talking to customers and reading why they left, the pattern was clear: trust broke at the moments of decision, when people couldn’t see what they were agreeing to. So the work wasn’t “a new checkout”. It was every moment where a customer says yes.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · My role</p>
        <div className="ed-main">
          <ol className="ed-grid ed-grid-2">
            {role.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · The approach</p>
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
        <p className="ed-label">06 · What shipped</p>
        <div className="ed-main">
          <dl className="ed-table">
            {shipped.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">07 · Reflection</p>
        <div className="ed-main">
          <h2 className="display ed-h">Pricing is a design problem as much as a commercial one.</h2>
          <p className="ed-p">The price itself rarely loses a customer. Surprise does. Designing for the moment of decision, and making the whole commitment visible before anyone signs, is what turns a pricing change into something customers can trust.</p>
        </div>
      </section>

      <MoreWork current="deputy" />
    </article>
  )
}
