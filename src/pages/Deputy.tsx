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

const principles = [
  ['Help customers find the right fit.', 'Simplify plan selection by helping customers understand which offering best suited their business, rather than expecting them to interpret an extensive feature comparison independently.'],
  ['Demonstrate value before asking for commitment.', 'Use the trial and onboarding experience to help customers establish meaningful workflows and involve their teams, giving them a better understanding of the product’s value before making a purchasing decision.'],
  ['Make purchasing decisions transparent.', 'Ensure customers understood their plan, inclusions, add-ons, billing frequency and contractual commitments before completing a purchase. Introduce additional purchasing opportunities contextually, without unnecessarily interrupting core workflows.'],
  ['Give customers control over their subscription.', 'Make it straightforward for customers to upgrade, downgrade or cancel as their business needs changed. Resolve complex feature dependencies behind the scenes rather than placing that burden on the customer.'],
]

const shipped = [
  ['Website pricing page', 'Communicated the new pricing structure and differentiated plan value, helping prospective customers understand the offering before entering the product.'],
  ['Checkout', 'Redesigned purchasing flows across the product, simplifying how plan inclusions, costs, contract terms and billing commitments were presented so customers could make informed purchasing decisions.'],
  ['Billing transparency', 'Overhauled the billing experience to give customers greater visibility into their subscription costs, how charges were calculated and when they would be billed.'],
  ['Subscription management', 'Redesigned how customers upgrade, downgrade and change billing arrangements, clearly communicating the financial and functional implications of each decision while resolving complex feature dependencies behind the scenes.'],
  ['Apple mobile subscriptions', 'Extended the new pricing and packaging model to App Store subscriptions, maintaining consistency with the web experience while accommodating platform-specific requirements.'],
  ['Cancellation and retention', 'Introduced more relevant retention options based on customers’ reasons for leaving, while preserving a clear path to cancellation. Expanded cancellation feedback collection across individual add-ons, giving the business insight into customer behaviour it previously lacked.'],
  ['Feature access and value discovery', 'Established consistent patterns for communicating feature availability across plans and customer types. Used progressive disclosure to surface relevant upgrade opportunities without overwhelming customers with paywalls, disrupting core workflows or compromising existing entitlements.'],
]

const role = [
  ['End-to-end design ownership.', 'Led the design of the self-serve purchasing experience, from initial discovery through to implementation and release.'],
  ['Customer advocacy.', 'Represented customer needs in commercial and technical discussions, particularly around plan value, feature access and subscription flexibility.'],
  ['Cross-functional alignment.', 'Worked across product, engineering, marketing, sales and customer success to establish a consistent experience throughout the customer lifecycle.'],
  ['Scalable design foundations.', 'Established purchasing patterns and interactions that other product teams could implement across their respective areas.'],
  ['Delivery and quality assurance.', 'Worked closely with engineering throughout implementation, validating complex customer scenarios and cross-team dependencies ahead of launch.'],
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
        <p className="ed-label"><span className="ed-num">01</span>The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Evolve the way Deputy makes money without compromising the experience of the customers who rely on it.</h2>
          <p className="ed-p">Introducing a new pricing and packaging model meant much more than changing prices. It redefined how customers accessed the product, understood its value and made purchasing decisions throughout their lifecycle.</p>
          <p className="ed-p">Multiple billing models, trials, contract types, feature entitlements and add-ons needed to coexist within a cohesive experience.</p>
          <p className="ed-p">My responsibility was to bridge the commercial objectives of the business with the needs of its customers — helping people understand what they were paying for, discover relevant value and make confident decisions, without disrupting the workflows they depended on.</p>
        </div>
      </section>

      <section className="pp-panel">
        <div className="ed-wrap ed-sec">
          <p className="ed-label"><span className="ed-num">02</span>What it touched</p>
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
            <p className="display ch-pull">With every self-serve customer affected, the cost of getting the experience wrong extended far beyond lost revenue.</p>
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
          <p className="ed-label"><span className="ed-num">03</span>Discovery</p>
          <div className="ed-main">
            <h2 className="display ed-h">Understanding the existing experience before introducing a new one.</h2>
            <p className="ed-p">Before designing the new purchasing experience, I needed to understand how customers interacted with the existing commercial model.</p>
            <p className="ed-p">This involved mapping billing logic, sign-up journeys, feature entitlements, contract types and customer communications, alongside reviewing customer feedback and reasons for cancellation.</p>
            <p className="ed-p">The discovery helped identify existing friction, gaps in the customer experience and dependencies that needed to be resolved before introducing a new pricing structure.</p>
            <p className="ed-p">Rather than simply adapting existing interfaces to accommodate new plans, we had an opportunity to address longstanding customer pain points and create a more cohesive purchasing experience.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">04</span>My role</p>
        <div className="ed-main">
          <ol className="ch-impl dp-role">
            {role.map(([t, d], i) => (
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
        <p className="ed-label"><span className="ed-num">05</span>Design approach</p>
        <div className="ed-main">
          <h2 className="display ed-h">Four principles that guided the experience.</h2>
          <ol className="dp-principles">
            {principles.map(([t, d], i) => (
              <li key={t}>
                <span className="ch-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ch-t">{t}</h3>
                <p className="ch-d">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">06</span>What shipped</p>
        <div className="ed-main">
          <h2 className="display ed-h">A connected commercial experience across the entire customer lifecycle.</h2>
          <ol className="dp-shipped">
            {shipped.map(([t, d], i) => (
              <li key={t}>
                <span className="dp-stage">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ch-t">{t}</h3>
                <p className="ch-d">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">07</span>Reflection</p>
        <div className="ed-main">
          <h2 className="display ed-h">Designing for commercial growth and customer trust.</h2>
          <p className="ed-p">The complexity of this project wasn’t in designing individual purchasing flows. It was in ensuring that hundreds of interconnected decisions across the business and product translated into a coherent experience for customers.</p>
          <p className="ed-p">It required balancing commercial objectives, technical constraints and existing customer expectations, while establishing foundations that multiple teams could build upon.</p>
          <p className="display dp-closing">For me, the most important measure of success was introducing a significant commercial change without compromising customer trust, disrupting the value customers relied on or creating unnecessary reasons to churn.</p>
        </div>
      </section>


      <MoreWork current="deputy" />
    </article>
  )
}
