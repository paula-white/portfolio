import MoreWork from '../components/MoreWork'
import PPMap, { PlanShift } from '../components/PPMap'
import PaywallPatterns from '../components/PaywallPatterns'
import { DeputyMark } from '../components/DeputyLogo'

/*
 * Deputy case study. Public-safe: it describes the work and the thinking, never Deputy's
 * internal numbers. Screens are simplified recreations.
 */

const challenges = [
  ['Balancing commercial goals with customer experience', 'We needed to make the value of higher-tier plans discoverable without overwhelming customers with paywalls or interrupting important workflows. Progressive disclosure was key — surfacing relevant upgrade opportunities at the right moment, rather than turning the product into a billboard.'],
  ['Managing different customer entitlements', 'Different plans, commercial arrangements and embedded experiences required different visibility rules. We needed to ensure upgrade prompts didn’t surface in front of partners’ customers, and that customers could access everything they had paid for without exposing features outside their entitlements.'],
  ['Making complex downgrades simple', 'Downgrading involved months of technical work to resolve complex feature dependencies. We didn’t want to restrict a customer’s ability to downgrade, nor make them responsible for untangling those dependencies themselves. The complexity needed to sit with us, not the customer.'],
]

const hard = [
  ['Understanding the existing ecosystem.', 'Mapping how billing, sign-up, purchasing and email flows actually worked before designing the new experience.'],
  ['Protecting customer value.', 'Ensuring the redistribution of features across plans didn’t diminish the value existing customers received or disrupt workflows they relied on.'],
  ['Managing customer migration.', 'Transitioning existing customers to the new model without compromising their data, access or day-to-day operations.'],
  ['Accommodating strategic customers.', 'Preserving existing commercial arrangements and product experiences, including embedded solutions.'],
  ['Coordinating a cross-team release.', 'Our team established the foundations that other teams would build upon. This meant ensuring design and technical decisions remained aligned across workstreams, while navigating interdependent releases where issues were increasingly difficult to isolate and resolve.'],
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
              A new commercial model.<br /><span className="cs-accent">A customer-first experience.</span>
            </h1>
            <p className="cs-intro">
              Deputy fundamentally changed how it priced, packaged and monetised its product. It was a business-wide transformation that
              affected every self-serve customer, from how they first discovered Deputy to how they accessed features, managed their
              subscription and grew with the product.
            </p>
            <p className="cs-intro">
              I led the design of the self-serve purchasing experience, translating a complex commercial strategy into an intuitive customer
              experience that balanced business growth with customer value, choice and trust.
            </p>
          </div>
        </div>
        <div className="ed-wrap">
          <dl className="cs-facts">
            <div><dt>Role</dt><dd>Senior Product Designer · Design owner for self-serve purchasing</dd></div>
            <div><dt>Team</dt><dd>Cross-functional collaboration across product, engineering, marketing, sales and customer success</dd></div>
            <div><dt>Scope</dt><dd>The end-to-end commercial experience, spanning acquisition, conversion, in-product monetisation, subscription management and cancellation across web and mobile</dd></div>
            <div><dt>Delivery</dt><dd>A coordinated, business-wide launch with a fixed release date</dd></div>
          </dl>
        </div>
      </header>


      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Evolve the way Deputy makes money without compromising the experience of the people who rely on it.</h2>
          <p className="ed-p">Introducing a new pricing and packaging model meant much more than changing prices. It redefined how customers accessed the product, understood its value and made purchasing decisions throughout their lifecycle.</p>
          <p className="ed-p">Multiple billing models, trials, contract types, feature entitlements and add-ons needed to coexist within a cohesive experience.</p>
          <p className="ed-p">My responsibility was to bridge the commercial objectives of the business with the needs of its customers — helping people understand what they were paying for, discover relevant value and make confident decisions, without disrupting the workflows they depended on.</p>
        </div>
      </section>

      <section className="pp-panel">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · What it touched</p>
          <div className="ed-main">
            <h2 className="display ed-h">Not a single feature. An entire product ecosystem.</h2>
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
        <p className="ed-label">The challenges</p>
        <div className="ed-main">
          <p className="ch-kicker">Customer challenges</p>
          <ol className="ch-grid">
            {challenges.map(([t, d], i) => (
              <li key={t}>
                <span className="ch-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ch-t">{t}</h3>
                <p className="ch-d">{d}</p>
              </li>
            ))}
          </ol>
          <div className="ch-trust">
            <div>
              <span className="ch-n">04 · The biggest challenge of all</span>
              <h3 className="ch-t">Preserving customer trust</h3>
              <p className="ch-d">This change touched every part of the product and every customer, leaving little margin for error. Beyond technical reliability, we needed to communicate changes to pricing and plan value with clarity and transparency, ensuring customers understood what they were paying for and why.</p>
            </div>
            <p className="display ch-pull">A price increase was inevitable; damaging customer trust didn’t have to be.</p>
          </div>

          <p className="ch-kicker ch-kicker-2">Implementation challenges</p>
          <ol className="ch-impl">
            {hard.map(([t, d], i) => (
              <li key={t}>
                <span className="ch-n">{String(i + 1).padStart(2, '0')}</span>
                <b>{t.replace(/\.$/, '')}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
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
