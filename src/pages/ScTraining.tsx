import { Link } from 'react-router-dom'

/*
 * SC Training case study: bringing EdApp into the SafetyCulture platform.
 * No old screens survive, so the story is told with three diagrams built in code.
 * Brand colours are representative: EdApp blue, SC Training purple.
 */

const BLUE = '#3B6FF2'
const PURPLE = '#6A3BE6'

function MiniApp({ colour, name }: { colour: string; name: string }) {
  return (
    <div className="sc-app">
      <div className="sc-app-bar" style={{ background: colour }}><span /><b>{name}</b></div>
      <div className="sc-app-body">
        <i style={{ background: colour }} /><i /><i />
      </div>
    </div>
  )
}

function TwoBrands() {
  return (
    <figure className="sc-fig">
      <div className="sc-diagram sc-brands">
        <div className="sc-pair">
          <MiniApp colour={BLUE} name="EdApp" />
          <MiniApp colour={PURPLE} name="SC Training" />
        </div>
        <div className="sc-lines" aria-hidden="true"><span /><span /></div>
        <div className="sc-core">One product, one codebase</div>
      </div>
      <figcaption><b>One product, two brands.</b> Existing EdApp customers kept their standalone product while it became SC Training.</figcaption>
    </figure>
  )
}

function TheRule() {
  return (
    <figure className="sc-fig">
      <div className="sc-diagram sc-rule">
        <pre className="sc-code" aria-label="The rule: if SC Training, show SC Training's features and brand; if EdApp, show EdApp's.">
<span className="k">if</span> (<span className="v">SC Training</span>) {'{'}{'\n'}
{'  '}<span className="f">show</span>(purple, scFeatures){'\n'}
{'  '}<span className="f">hide</span>(notRelevantToSC){'\n'}
{'}'} <span className="k">else</span> {'{'}{'\n'}
{'  '}<span className="f">show</span>(blue, edAppFeatures){'\n'}
{'}'}
        </pre>
      </div>
      <figcaption><b>The shortcut.</b> No time for a full rebuild, so I sat with an engineer and we built one rule that switched brand and features by product.</figcaption>
    </figure>
  )
}

function OneWayIn() {
  return (
    <figure className="sc-fig">
      <div className="sc-diagram sc-in">
        <div className="sc-col">
          <span className="sc-tag">Before</span>
          <div className="sc-login" style={{ borderColor: BLUE }}>EdApp sign-in</div>
          <div className="sc-login" style={{ borderColor: PURPLE }}>SC sign-in</div>
          <div className="sc-users"><i /><i /><i /><em>two user lists</em></div>
        </div>
        <span className="sc-arrow" aria-hidden="true">→</span>
        <div className="sc-col">
          <span className="sc-tag">After</span>
          <div className="sc-login sc-login-one" style={{ borderColor: PURPLE }}>One account</div>
          <div className="sc-users"><i /><i /><i /><i /><i /><em>one set of users</em></div>
        </div>
      </div>
      <figcaption><b>One way in.</b> Users, sign-in and onboarding integrated with the SC platform, so organisations managed everyone in one place.</figcaption>
    </figure>
  )
}

export default function ScTraining() {
  return (
    <article className="cs brand brand-mitti">
      <header className="cs-hero wrap">
        <p className="brand-word brand-word-mitti">mitti <span>by SafetyCulture</span></p>
        <p className="mono small cs-kicker">Case study · SC Training, now Mitti</p>
        <h1 className="display cs-title">
          Two products became <span className="cs-accent">one</span>, without leaving anyone behind.
        </h1>
        <p className="cs-intro">
          When EdApp joined SafetyCulture, it had to become SC Training (today part of Mitti): part of the SC platform, in SC’s brand, for SC’s
          customers. At the same time, existing EdApp customers still needed the product they’d bought. I was
          design lead on bringing the two together.
        </p>
        <dl className="cs-facts">
          <div><dt>Role</dt><dd>Senior product designer, design lead on the merger</dd></div>
          <div><dt>Team</dt><dd>6+ engineering teams, product, lifecycle and marketing</dd></div>
          <div><dt>Scope</dt><dd>Brand, features, users, sign-in and onboarding</dd></div>
          <div><dt>Constraint</dt><dd>Support both products from one codebase</dd></div>
        </dl>
      </header>

      <section className="cs-visual wrap" aria-label="Three diagrams of the merger">
        <div className="sc-figs">
          <TwoBrands />
          <TheRule />
          <OneWayIn />
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The brief</p>
        <div className="cs-body">
          <p className="cs-lead">Make EdApp feel native to the SafetyCulture platform, while keeping the standalone product working for the customers who already relied on it.</p>
          <p>Two products, two codebases, two design systems and two brands: EdApp was blue, SafetyCulture was purple. Everything from the brand to the feature set to how people signed in had to work both ways.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I did</p>
        <div className="cs-body">
          <dl className="cs-shipped">
            <div><dt>Brand</dt><dd>Overhauled the product’s branding so it read as SC Training inside the SC platform, while EdApp kept its own look for standalone customers.</dd></div>
            <div><dt>Features</dt><dd>Worked out which features belonged in SC Training. Anything that didn’t was hidden for SC customers, but stayed for EdApp customers.</dd></div>
            <div><dt>Users and sign-in</dt><dd>Integrated users, sign-in and onboarding with the SC platform, so organisations set up properly and managed their users at scale in one place.</dd></div>
            <div><dt>Alignment</dt><dd>Brought 6+ engineering teams, lifecycle and marketing to one direction, and got early AI features onto the roadmap with leadership buy-in.</dd></div>
          </dl>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The shortcut</p>
        <div className="cs-body">
          <blockquote className="display cs-quote">We didn’t have time to do it properly. So we did it cleverly.</blockquote>
          <p>A full rebuild for two brands wasn’t possible on the timeline. Instead, I sat down with an engineer and we built one simple rule: if it’s SC Training, show SC’s brand and features; if it’s EdApp, show EdApp’s. One codebase, two products, and no customer left with a broken experience.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I’d take with me</p>
        <div className="cs-body">
          <p className="cs-lead">The best solution is the one that ships and keeps everyone whole.</p>
          <p>Merging products is mostly about decisions: what stays, what hides, what goes, and who it affects. Getting close to engineering, and being willing to find a pragmatic path, mattered more than a perfect plan.</p>
        </div>
      </section>

      <nav className="cs-end wrap" aria-label="More work">
        <Link to="/#work" className="mono small">← All work</Link>
        <Link to="/work/edapp" className="display cs-next">Next: EdApp →</Link>
      </nav>
    </article>
  )
}
