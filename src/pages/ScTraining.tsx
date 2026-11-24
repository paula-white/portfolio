import MoreWork from '../components/MoreWork'
import { Ecosystem, Onboarding } from '../components/ScDiagrams'

/*
 * SC Training case study: bringing EdApp into the SafetyCulture platform.
 * EdApp and the SC platform had separate codebases and design systems; the Training product's own codebase
 * served both experiences through conditional branding and feature visibility.
 */

const challenges = [
  ['Protecting existing customer value', 'Changing functionality to accommodate the integration risked disrupting established EdApp workflows.'],
  ['Creating a cohesive platform experience', 'Differences in branding, navigation, functionality and user management could make Training feel disconnected.'],
  ['Making Training discoverable', 'SafetyCulture customers arrived with different goals. Surfacing Training alongside every other capability risked overwhelming them.'],
  ['Reducing the effort required to get started', 'Customers had to create learning content before they could experience the value of Training.'],
  ['Protecting learning history', 'Migration risked losing learning records, course progress and access to training.'],
]

const role = [
  ['Design leadership.', 'Owned the design direction for the integration, from discovery through to implementation.'],
  ['Customer advocacy.', 'Ensured decisions on feature availability, migration and integration accounted for existing customers.'],
  ['Product strategy.', 'Shaped roadmap priorities to improve Training discovery and adoption ahead of launch.'],
  ['Technical collaboration.', 'Worked with engineering on a scalable approach to supporting two product experiences.'],
  ['Cross-functional alignment.', 'Coordinated design decisions across 6+ engineering teams, product, lifecycle and marketing.'],
]

const decisions: [string, string[]][] = [
  ['Define the right feature set for each customer group without rebuilding the product.', [
    'Having designed or contributed to most of EdApp’s features, I understood how customers used the product, the workflows they relied on and where they found value.',
    'With input from key stakeholders, I led the definition of SC Training’s feature set: which capabilities carried across to SafetyCulture and which stayed exclusive to standalone EdApp.',
    'Rather than rebuild the product, I worked with engineering to make branding and feature visibility conditional on the product a customer was using, significantly reducing integration effort and avoiding duplicate development.',
  ]],
  ['Prioritise customer intent over product exposure.', [
    'EdApp’s onboarding was designed around a single product; within SafetyCulture, Training became one of several.',
    'Giving every product equal prominence would have put product exposure ahead of what customers came to do, so I redesigned the first-time experience around the intent they shared at sign-up.',
    'Training stayed accessible to everyone, but when we introduced it depended on its relevance.',
  ]],
  ['Reduce the investment required to experience value.', [
    'Creating learning content was a significant barrier: customers had to invest time before they could tell whether Training was valuable.',
    'Rather than relying on onboarding alone, I tackled the barrier itself, securing leadership buy-in to prioritise AI-powered course creation ahead of launch so customers could create their first course in minutes.',
    'This shortened the path to Training’s value.',
  ]],
]

type Side = { name: string; sub?: string; items: [string, string][] }
const before: Side[] = [
  { name: 'EdApp', sub: 'Separate administration and learning experiences', items: [
    ['Desktop LMS:', 'For administrators, covering course creation, training management, distribution and reporting.'],
    ['Learner app (mobile and web):', 'For learners, consistent across both platforms.'],
  ] },
  { name: 'SafetyCulture', sub: 'A unified, role-based platform', items: [
    ['Desktop platform:', 'For administrators through to shift workers, with functionality set by roles and permissions.'],
    ['Native mobile app:', 'Supervisory and frontline tasks, with feature visibility determined by permissions.'],
  ] },
]
const after: Side[] = [
  { name: 'EdApp', items: [
    ['', 'Retained its standalone desktop LMS and its learner experience across mobile and web.'],
  ] },
  { name: 'SafetyCulture', items: [
    ['', 'Training administration and learning integrated into the existing desktop platform via an iframe.'],
    ['', 'Training functionality adapted for the native mobile app.'],
    ['', 'Users could both manage and complete training in one platform.'],
  ] },
]
const integration = [
  ['Reconciling different experience models', 'Moving from EdApp’s separate administration and learner experiences to SafetyCulture’s unified, role-based platform, where people could both manage and complete training, and deciding which features, navigation and actions to show by product, platform, role and permissions.'],
  ['Hybrid architecture and technical trade-offs', 'Integrating existing EdApp functionality via an iframe alongside new backend services built in Go, while still supporting standalone EdApp. With engineering, I worked out what to reuse, adapt or rebuild, including course ordering and conditional feature visibility.'],
  ['Native mobile constraints', 'Adapting training to SafetyCulture’s existing native app, accounting for differences in navigation, feature availability and interaction patterns between web and mobile.'],
]

function Sides({ sides }: { sides: Side[] }) {
  return (
    <div className="sc-sides">
      {sides.map((sd) => (
        <div key={sd.name} className="sc-side">
          <h3 className="ch-t">{sd.name}</h3>
          {sd.sub && <p className="sc-side-sub">{sd.sub}</p>}
          <ul>{sd.items.map(([b, t]) => <li key={t}>{b && <b>{b} </b>}{t}</li>)}</ul>
        </div>
      ))}
    </div>
  )
}

const migration = [
  ['Preserve learning progress', 'Used SafetyCulture’s APIs to recreate user accounts and remap them within Training, carrying across learning records and course progress.'],
  ['Protect data integrity', 'Temporarily restricted access to EdApp during migration so learning records couldn’t change while data was transferred.'],
  ['Provide a clear transition', 'Used targeted in-app messages through Braze to direct migrated users to SafetyCulture and show them where to resume their training.'],
]

const impact: [string, string[]][] = [
  ['For existing EdApp customers', [
    'Retained familiar workflows and existing functionality.',
    'Protected learning history and progress during migration.',
  ]],
  ['For SafetyCulture customers', [
    'Introduced Training as an integrated part of the platform.',
    'Simplified authentication and user management.',
    'Enabled more relevant product discovery through intent-based onboarding.',
    'Reduced the time and effort required to create learning content.',
  ]],
  ['For the business', [
    'Delivered the integration across 6+ engineering teams and multiple business functions.',
    'Established a shared technical foundation for two distinct product experiences.',
    'Avoided the development and maintenance overhead of separate Training codebases.',
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
        <p className="ed-label"><span className="ed-num">01</span>The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Integrate an acquired product without making the acquisition the customer’s problem.</h2>
          <p className="ed-p">Existing EdApp customers had invested time in creating learning content, establishing workflows and training their employees. They needed confidence that the product they relied on would continue to work.</p>
          <p className="ed-p">For SafetyCulture customers, introducing Training needed to add value to their existing experience, not introduce another product to learn, another account to manage or another set of disconnected workflows.</p>
          <p className="ed-p">The challenge was to meet both sets of needs while delivering against a shared commercial strategy and a fixed delivery timeline.</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">02</span>The customer challenges</p>
        <div className="ed-main">
          <ol className="ch-impl">
            {challenges.map(([t, d], i) => (
              <li key={t}><span className="ch-n">{n(i)}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">03</span>My role</p>
        <div className="ed-main">
          <ul className="sc-role">
            {role.map(([t, d]) => <li key={t}><b>{t.replace(/\.$/, '')}</b><span>{d}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">04</span>The integration</p>
        <div className="ed-main">
          <div className="sc-int-fig"><Ecosystem /></div>

          <p className="dr-sub">Before the integration</p>
          <Sides sides={before} />

          <p className="dr-sub">After the integration</p>
          <p className="ed-p sc-after-lead">One shared Training codebase serving two brands, multiple platforms and different user roles through conditional branding, functionality and feature visibility.</p>
          <Sides sides={after} />

          <p className="dr-sub">Key design challenges</p>
          <ol className="ch-impl">
            {integration.map(([t, d], i) => (
              <li key={t}><span className="ch-n">{n(i)}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>

          <div className="sc-objective">
            <p className="dr-sub">Overarching design objective</p>
            <p className="display dp-closing">Deliver a cohesive training experience across two brands, multiple platforms and distinct user roles, without exposing the underlying technical complexity to customers.</p>
          </div>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label"><span className="ed-num">05</span>Key design decisions</p>
          <div className="ed-main">
            <ol className="sc-decisions">
              {decisions.map(([t, ps], i) => (
                <li key={t}>
                  <div className="sc-dec-head">
                    <span className="ch-n">Decision {n(i)}</span>
                    <h2 className="display sc-dec-t">{t}</h2>
                  </div>
                  <div className="sc-dec-body">{ps.map((p) => <p key={p} className="ed-p">{p}</p>)}</div>
                  {i === 1 && <div className="sc-dec-fig"><Onboarding /></div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">06</span>The migration</p>
        <div className="ed-main">
          <h2 className="display ed-h">Protect the time and effort customers had already invested.</h2>
          <p className="ed-p">For migrating organisations and learners, losing completed courses or learning records would have meant losing work they had already invested in.</p>
          <ol className="ed-steps ed-steps-3 sc-mig">
            {migration.map(([t, d], i) => (
              <li key={t}><span className="ed-step-n">{n(i)}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">07</span>Impact</p>
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
        <p className="ed-label"><span className="ed-num">08</span>Reflection</p>
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
