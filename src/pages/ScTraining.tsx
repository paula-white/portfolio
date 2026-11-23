import { Link } from 'react-router-dom'

/*
 * SC Training case study: bringing EdApp into the SafetyCulture platform.
 */

export default function ScTraining() {
  return (
    <article className="cs brand brand-mitti">
      <header className="cs-hero wrap">
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
          <div><dt>Scope</dt><dd>Brand, features, user migration, sign-in and onboarding</dd></div>
          <div><dt>Constraint</dt><dd>Support both products from one codebase</dd></div>
        </dl>
      </header>


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
            <div><dt>Users and migration</dt><dd>Moved every EdApp user into SC without losing their progress, and integrated sign-in and onboarding so organisations managed everyone in one place.</dd></div>
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
        <p className="mono small cs-label">The migration</p>
        <div className="cs-body">
          <p className="cs-lead">Every learner had to move to SC without losing a single completed lesson.</p>
          <ol className="cs-list">
            <li><b>Recreate.</b> We used SC’s APIs to create each user in SC, then remapped them in Training so all their progress came with them.</li>
            <li><b>Pause.</b> We blocked access to EdApp during the migration, so nothing could change while people were being moved.</li>
            <li><b>Guide.</b> Once it was done, an in-app message through Braze pointed people to SC, so nobody was left wondering where their training had gone.</li>
          </ol>
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
