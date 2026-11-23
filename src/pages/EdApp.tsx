import { Link } from 'react-router-dom'

/*
 * EdApp case study: the learner homescreen overhaul. Screens are rebuilt in code from
 * Paula's designs, with abstract artwork in place of customers' course imagery.
 */

const tones = ['#FF8A5B', '#6C8CFF', '#2FC4A0', '#FFC24B', '#B57CFF', '#FF6B9A', '#4FB6E8', '#9BD15B']

function Tile({ i, label, small }: { i: number; label: string; small?: boolean }) {
  const a = tones[i % tones.length], b = tones[(i + 3) % tones.length]
  return (
    <div className={`ph-tile ${small ? 'ph-tile-sm' : ''}`}>
      <span className="ph-art" style={{ background: `radial-gradient(circle at 30% 30%, ${b}, transparent 60%), ${a}` }} />
      <b>{label}</b>
      <i>5 lessons</i>
    </div>
  )
}

function Row({ title, start, labels }: { title: string; start: number; labels: string[] }) {
  return (
    <div className="ph-section">
      <div className="ph-section-head"><b>{title}</b><span>View all</span></div>
      <div className="ph-row">{labels.map((l, k) => <Tile key={l} i={start + k} label={l} small />)}</div>
    </div>
  )
}

function After() {
  return (
    <div className="phone">
      <div className="ph-status"><b>9:41</b><span /></div>
      <div className="ph-screen">
        <b className="ph-h">Training</b>
        <Row title="In progress" start={0} labels={['Introduction', 'Key products', 'Store safety']} />
        <Row title="Up next" start={3} labels={['Customer service', 'Visual merch', 'Stock basics']} />
        <Row title="Completed" start={6} labels={['Welcome', 'Your first shift', 'Values']} />
      </div>
      <div className="ph-nav"><span className="on" /><span /><span /></div>
    </div>
  )
}

function Before() {
  return (
    <div className="phone phone-old">
      <div className="ph-status"><b>11:10</b><span /></div>
      <div className="ph-screen">
        <div className="ph-old-bar"><span>☰</span><b>Home</b><span>★</span></div>
        <div className="ph-search">Search for courseware</div>
        <b className="ph-old-h">Courses</b>
        {['Back-office automation', 'Cyber security', 'Commercial communications'].map((t, k) => (
          <div key={t} className="ph-old-card" style={{ background: ['#2E4A9E', '#2A2C33', '#3B3550'][k] }}>
            {k === 0 && <span className="ph-badge">Overdue</span>}
            <b>{t}</b>
            <i>{k === 0 ? 'This course is mandatory' : 'New'}</i>
          </div>
        ))}
      </div>
    </div>
  )
}

const problems = [
  'Learners could only see three courses at a time on mobile, so big libraries meant a long scroll.',
  'Finding and browsing courseware was frustrating.',
  'There was no clear pathway: what’s in progress, what’s next, what’s done.',
  'Admins carried the burden of organising courseware to guide learners.',
  'Group assignments meant admins couldn’t predict what a learner would actually see.',
  'The homescreen called more than 15 endpoints on load, so it was slow.',
]

const structure = [
  ['Admin curation', 'Playlists and course collections, where admins choose exactly what comes next.'],
  ['Dynamic workflow', 'Up next, Continue learning and Completed, sorted automatically so learners always know their place.'],
  ['Temporary placement', 'Brain Boost and Rapid Refresh quizzes that appear when they’re due and disappear when they’re done.'],
]

const quotes = [
  'Love it, it’s much easier to identify mandatory training.',
  'Really nice to see what is due and coming soon. Love the transitions and carousel.',
  'It’s great. Logical and uncluttered. Good overview. I like the look and feel.',
]

export default function EdApp() {
  return (
    <article className="cs">
      <header className="cs-hero wrap">
        <p className="mono small cs-kicker">Case study · EdApp · 2017 – 2022</p>
        <h1 className="display cs-title">
          Helping 200K+ people a month find what to <span className="cs-accent">learn next.</span>
        </h1>
        <p className="cs-intro">
          EdApp is a mobile learning app used by teams around the world. I was the sole mobile designer for five years. This is
          the homescreen overhaul I designed end to end: from the problem and the structure, to testing with customers and a
          staged roll-out.
        </p>
        <dl className="cs-facts">
          <div><dt>Role</dt><dd>Sole mobile designer, end-to-end design</dd></div>
          <div><dt>Team</dt><dd>Product manager and engineering lead</dd></div>
          <div><dt>Scale</dt><dd>200K+ monthly users, 1M+ lessons a month</dd></div>
          <div><dt>Shipped</dt><dd>Feature-flagged, tested with 50+ accounts, staged roll-out</dd></div>
        </dl>
      </header>

      <section className="cs-visual wrap" aria-label="Before and after homescreens">
        <div className="ba">
          <figure className="ba-col"><Before /><figcaption>Before: one long list, three courses at a time</figcaption></figure>
          <span className="ba-arrow" aria-hidden="true">→</span>
          <figure className="ba-col"><After /><figcaption>After: in progress, up next and completed at a glance</figcaption></figure>
        </div>
        <p className="cs-caption">Screens rebuilt from my designs. Course artwork is abstract in place of customers’ content.</p>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The problem</p>
        <div className="cs-body">
          <p className="cs-lead">Learners opened the app and couldn’t tell what to do next. Admins were doing the sorting by hand.</p>
          <ul className="cs-list">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Goals</p>
        <div className="cs-body">
          <ul className="cs-list">
            <li>Faster access to assigned courseware, with a clearer structure: smaller cards, horizontal rows and sections.</li>
            <li>Make it obvious what course is up next.</li>
            <li>Automate course ordering, so admins with 100+ courses stop spending time organising content.</li>
          </ul>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The structure</p>
        <div className="cs-body">
          <p>The old homescreen only knew about content types, and its order didn’t reflect what mattered. I grouped everything by how it gets there.</p>
          <dl className="cs-shipped">
            {structure.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Up next</p>
        <div className="cs-body">
          <blockquote className="display cs-quote">One rule for what comes next, that works for 80% of customers.</blockquote>
          <p>I mapped every way customers already ordered courses (due dates and overdue, mandatory, playlist order, published date, prerequisites, collection order) and worked with engineering on an algorithm that ranks them, so the right course rises to the top without admin effort.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Approach</p>
        <div className="cs-body">
          <ul className="cs-list">
            <li>Started from customer feedback and competitor research.</li>
            <li>Built a front-end-only version so we could test with real customer courseware and iterate fast, without waiting for back-end changes or app releases.</li>
            <li>Put it behind a feature flag and tested with 50+ accounts.</li>
            <li>Tuned it over six months of customer feedback until it worked for the 80%.</li>
            <li>Rolled out in stages to de-risk the change and keep customers happy.</li>
            <li>Along the way: updated cards, smoother transitions, a faster homescreen and a new bottom navigation on mobile.</li>
          </ul>
        </div>
      </section>

      <section className="cs-moments wrap" aria-labelledby="heard">
        <div className="cs-moments-head">
          <p className="mono small cs-label">What customers said</p>
          <h2 id="heard" className="display cs-h2">Up next became the way people started learning.</h2>
        </div>
        <ol className="cs-moment-list cs-quotes">
          {quotes.map((q) => (
            <li key={q} className="cs-moment"><span className="cs-moment-line">“{q}”</span><span className="cs-moment-detail">Customer feedback during testing</span></li>
          ))}
        </ol>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Beyond the homescreen</p>
        <div className="cs-body">
          <p>Across five years I designed the learner app end to end: sign-up and log-in for different users, custom branded registration, gamification with achievements and leaderboards, learning paths, and custom course banners. I also helped take EdApp through to acquisition, designing its brand, website and investor decks along the way.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I’d take with me</p>
        <div className="cs-body">
          <p className="cs-lead">Test with real content, not perfect demo data.</p>
          <p>Building a front-end version we could switch on for real accounts meant we learned from customers’ actual libraries, messy and huge, months before a full release. That’s why the final design held up.</p>
        </div>
      </section>

      <nav className="cs-end wrap" aria-label="More work">
        <Link to="/#work" className="mono small">← All work</Link>
        <Link to="/work/deputy" className="display cs-next">Next: Deputy →</Link>
      </nav>
    </article>
  )
}
