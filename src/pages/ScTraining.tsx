import MoreWork from '../components/MoreWork'

/*
 * SC Training case study: bringing EdApp into the SafetyCulture platform.
 */

const did = [
  ['Brand', 'Overhauled the product’s branding so it read as SC Training inside the SC platform, while EdApp kept its own look for standalone customers.'],
  ['Features', 'Worked out which features belonged in SC Training. Anything that didn’t was hidden for SC customers, but stayed for EdApp customers.'],
  ['Users and migration', 'Moved every EdApp user into SC without losing their progress, and integrated sign-in and onboarding so organisations managed everyone in one place.'],
  ['First-time experience', 'Redesigned onboarding for a platform, not a single product, with in-product guidance for Training shaped by the intent people shared at sign-up.'],
  ['AI course creation', 'Got AI course creation onto the roadmap with leadership buy-in, so it launched with SC Training. New customers could create their first course in minutes, which made Training much easier to adopt.'],
  ['Alignment', 'Brought 6+ engineering teams, lifecycle and marketing to one direction for launch.'],
]

const migration = [
  ['Recreate', 'We used SC’s APIs to create each user in SC, then remapped them in Training so all their progress came with them.'],
  ['Pause', 'We blocked access to EdApp during the migration, so nothing could change while people were being moved.'],
  ['Guide', 'Once it was done, an in-app message through Braze pointed people to SC, so nobody was left wondering where their training had gone.'],
]

export default function ScTraining() {
  return (
    <article className="cs brand brand-mitti ed">
      <header className="cs-hero wrap sc-hero">
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
          <div><dt>Scope</dt><dd>Brand, features, user migration and first-time onboarding</dd></div>
          <div><dt>Constraint</dt><dd>Support both products from one codebase</dd></div>
        </dl>
      </header>


      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The brief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Make EdApp feel native to the SafetyCulture platform, while keeping the standalone product working for the customers who already relied on it.</h2>
          <p className="ed-p">Two products, two codebases, two design systems and two brands: EdApp was blue, SafetyCulture was purple. Everything from the brand to the feature set to how people signed in had to work both ways.</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">02 · What I did</p>
        <div className="ed-main">
          <ol className="ed-grid ed-grid-3">
            {did.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">03 · The shortcut</p>
          <div className="ed-main">
            <h2 className="display ed-big">We didn’t have time to do it properly. So we did it cleverly.</h2>
            <p className="ed-p">A full rebuild for two brands wasn’t possible on the timeline. Instead, I sat down with an engineer and we built one simple rule: if it’s SC Training, show SC’s brand and features; if it’s EdApp, show EdApp’s. One codebase, two products, and no customer left with a broken experience.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · Onboarding</p>
        <div className="ed-main">
          <h2 className="display ed-h">Onboarding someone onto a platform is different from onboarding them onto a product.</h2>
          <div className="ed-two">
            <p className="ed-p">EdApp’s first-time experience only had to introduce one product. Inside SafetyCulture, Training became one part of a much bigger platform, so the question changed: how do you guide people towards Training when it’s one of many things they could do first?</p>
            <p className="ed-p">I redesigned the first-time user experience so the guidance changed based on the intent people shared when they signed up. Training was always there for everyone; what changed was how the product introduced it and pointed people towards it, depending on what they’d told us they came to do.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · The migration</p>
        <div className="ed-main">
          <h2 className="display ed-h">Every learner had to move to SC without losing a single completed lesson.</h2>
          <ol className="ed-steps ed-steps-3">
            {migration.map(([t, d], i) => (
              <li key={t}><span className="ed-step-n">0{i + 1}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <MoreWork current="sc-training" />
    </article>
  )
}
