import MoreWork from '../components/MoreWork'
import { Ecosystem, Onboarding } from '../components/ScDiagrams'

/*
 * SC Training case study: bringing EdApp into the SafetyCulture platform.
 * EdApp and the SC platform had separate codebases and design systems; the Training product's own codebase
 * served both experiences through conditional branding and feature visibility.
 */

const challenges = [
  ['Protecting existing customer value', 'Removing or changing functionality to accommodate the SafetyCulture integration risked disrupting established workflows for EdApp customers.'],
  ['Creating a cohesive platform experience', 'Differences in branding, navigation, functionality and user management could make Training feel disconnected from the wider SafetyCulture platform.'],
  ['Making Training discoverable', 'SafetyCulture customers arrived with different objectives. Introducing Training alongside every other platform capability risked overwhelming customers and distracting them from their primary goals.'],
  ['Reducing the effort required to get started', 'Customers needed to invest time creating learning content before they could experience the value of Training, creating a barrier to adoption.'],
  ['Protecting learning history', 'Migrating users between products introduced the risk of losing learning records, course progress and access to training.'],
]

const role = [
  ['Design leadership.', 'Owned the design direction across the product integration, from discovery and strategic decisions through to implementation.'],
  ['Customer advocacy.', 'Ensured decisions around feature availability, migration and platform integration accounted for existing customer needs.'],
  ['Product strategy.', 'Identified opportunities to improve Training discovery and adoption, influencing roadmap priorities ahead of launch.'],
  ['Technical collaboration.', 'Worked directly with engineering to establish a scalable approach to supporting two distinct product experiences.'],
  ['Cross-functional alignment.', 'Coordinated design decisions across 6+ engineering teams, product, lifecycle and marketing.'],
]

const decisions: [string, string[]][] = [
  ['Define the right feature set for each customer group without rebuilding the product.', [
    'Having designed or contributed to most of EdApp’s existing features, I brought a deep understanding of customer behaviour, established workflows and where customers derived value.',
    'Drawing on this knowledge and input from key stakeholders, I led the definition of SC Training’s feature set, determining which capabilities should carry across to SafetyCulture and which should remain exclusive to standalone EdApp customers.',
    'Rather than rebuilding EdApp within SafetyCulture’s codebase, we embedded the existing product within the platform using an iframe. I worked directly with engineering to establish conditional branding and feature visibility based on which product the customer was accessing.',
    'This enabled us to deliver an experience that felt native to SafetyCulture while preserving the functionality and familiarity existing EdApp customers relied on.',
    'The approach significantly reduced the engineering effort required for integration, avoided duplicating development and allowed us to continue supporting both customer experiences from a single Training codebase.',
  ]],
  ['Prioritise customer intent over product exposure.', [
    'EdApp’s onboarding experience was designed around a single product. Within SafetyCulture, Training became one of several products available to customers.',
    'Giving every product equal prominence during onboarding would have meant prioritising product exposure over what customers actually came to achieve.',
    'I redesigned the first-time experience around the intent customers expressed during sign-up, adapting in-product guidance and discovery opportunities accordingly.',
    'Training remained accessible to everyone, but how and when we introduced it depended on its relevance to the customer.',
  ]],
  ['Reduce the investment required to experience value.', [
    'Creating learning content was a significant barrier to getting started with Training. Customers needed to invest time and effort before they could determine whether the product was valuable to their business.',
    'Rather than relying solely on onboarding guidance to drive adoption, I identified an opportunity to address the underlying barrier itself.',
    'I secured leadership buy-in to prioritise AI-powered course creation ahead of launch, enabling customers to create their first course in minutes.',
    'This shortened the path to experiencing Training’s value and reduced the upfront commitment required from customers exploring the product.',
  ]],
]

const migration = [
  ['Preserve learning progress', 'Used SafetyCulture’s APIs to recreate migrating user accounts and remap them within Training, carrying across existing learning records and course progress.'],
  ['Protect data integrity', 'Temporarily restricted access to EdApp during migration to prevent changes to learning records while customer data was being transferred.'],
  ['Provide a clear transition', 'Used targeted in-app communications through Braze to explain the transition and direct migrated users to SafetyCulture, ensuring they knew where and how to resume their training.'],
]

const impact: [string, string[]][] = [
  ['For existing EdApp customers', [
    'Retained familiar workflows and existing functionality.',
    'Protected learning history and progress during migration.',
    'Maintained continuity throughout the product integration.',
  ]],
  ['For SafetyCulture customers', [
    'Introduced Training as a native part of the platform.',
    'Simplified authentication and user management.',
    'Enabled more relevant product discovery through intent-based onboarding.',
    'Reduced the time and effort required to create learning content.',
  ]],
  ['For the business', [
    'Delivered the integration across 6+ engineering teams and multiple business functions.',
    'Established a shared technical foundation supporting two distinct product experiences.',
    'Avoided the development and maintenance overhead of separate codebases.',
    'Expanded access to Training across the SafetyCulture customer base.',
  ]],
]

const n = (i: number) => String(i + 1).padStart(2, '0')

export default function ScTraining() {
  return (
    <article className="cs brand brand-mitti ed">
      <header className="cs-hero sc-hero">
        <div className="ed-wrap ed-hero">
          <div className="ed-hero-main">
            <p className="mono small cs-kicker">Case study · SC Training, now Mitti</p>
            <h1 className="display cs-title">
              Integrating two products.<br /><span className="cs-accent">Protecting two customer experiences.</span>
            </h1>
            <p className="cs-intro">
              Following SafetyCulture’s acquisition of EdApp, we faced two very different customer needs. Existing EdApp customers needed
              continuity, while SafetyCulture customers needed a learning product that worked naturally within the platform they already used.
            </p>
            <p className="cs-intro">
              As design lead, I was responsible for determining where these experiences should converge, where they needed to remain distinct
              and how we could deliver both without compromising customer value or introducing unnecessary technical complexity.
            </p>
          </div>
          <dl className="ed-stats">
            <div><dt>Product experiences</dt><dd>2</dd></div>
            <div><dt>Engineering teams</dt><dd>6+</dd></div>
          </dl>
        </div>
        <dl className="ed-wrap ed-facts">
          <div><dt>Role</dt><dd>Senior Product Designer, design lead on the integration</dd></div>
          <div><dt>Team</dt><dd>Engineering, product, lifecycle and marketing</dd></div>
          <div><dt>Scope</dt><dd>Brand, feature availability, user management, migration and onboarding</dd></div>
          <div><dt>Delivery</dt><dd>A fixed launch date for SC Training in the SafetyCulture platform</dd></div>
        </dl>
      </header>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Integrate an acquired product without making the acquisition the customer’s problem.</h2>
          <p className="ed-p">Existing EdApp customers had invested time in creating learning content, establishing workflows and training their employees. They needed confidence that the product they relied on would continue to work.</p>
          <p className="ed-p">For SafetyCulture customers, introducing Training needed to add value to their existing experience, not introduce another product to learn, another account to manage or another set of disconnected workflows.</p>
          <p className="ed-p">The challenge was to meet both sets of needs while delivering against a shared commercial strategy and a fixed delivery timeline.</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">02 · The customer challenges</p>
        <div className="ed-main">
          <ol className="ch-impl">
            {challenges.map(([t, d], i) => (
              <li key={t}><span className="ch-n">{n(i)}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">03 · My role</p>
        <div className="ed-main">
          <ul className="sc-role">
            {role.map(([t, d]) => <li key={t}><b>{t}</b> {d}</li>)}
          </ul>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">04 · Key design decisions</p>
          <div className="ed-main">
            <ol className="sc-decisions">
              {decisions.map(([t, ps], i) => (
                <li key={t}>
                  <div className="sc-dec-head">
                    <span className="ch-n">Decision {n(i)}</span>
                    <h2 className="display sc-dec-t">{t}</h2>
                  </div>
                  <div className="sc-dec-body">{ps.map((p) => <p key={p} className="ed-p">{p}</p>)}</div>
                  {i === 0 && <div className="sc-dec-fig"><Ecosystem /></div>}
                  {i === 1 && <div className="sc-dec-fig"><Onboarding /></div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · The migration</p>
        <div className="ed-main">
          <h2 className="display ed-h">Protect the time and effort customers had already invested.</h2>
          <p className="ed-p">For migrating organisations and learners, maintaining access to their learning history was critical. Losing completed courses or learning records would have meant losing work that customers and their employees had already invested in.</p>
          <p className="ed-p">Three decisions guided the migration experience.</p>
          <ol className="ed-steps ed-steps-3 sc-mig">
            {migration.map(([t, d], i) => (
              <li key={t}><span className="ed-step-n">{n(i)}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">06 · Impact</p>
        <div className="ed-main">
          <h2 className="display ed-h">Greater access to Training without compromising existing customer value.</h2>
          <div className="sc-impact">
            {impact.map(([t, items]) => (
              <div key={t}>
                <h3 className="ch-t">{t}</h3>
                <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">07 · Reflection</p>
        <div className="ed-main">
          <h2 className="display ed-h">The success of an acquisition depends on the value it creates for customers, not simply the integration of two products.</h2>
          <p className="ed-p">The most important decisions in this project were about what not to change, where to simplify and where to introduce new value.</p>
          <p className="ed-p">It required balancing the needs of two customer groups with commercial objectives, technical constraints and the long-term direction of the platform.</p>
          <p className="display dp-closing sc-closing">For me, success meant making Training easier to discover and adopt for SafetyCulture customers, without asking existing EdApp customers to sacrifice the value they had already invested in.</p>
        </div>
      </section>

      <MoreWork current="sc-training" />
    </article>
  )
}
