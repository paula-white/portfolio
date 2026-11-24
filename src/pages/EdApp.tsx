import MoreWork from '../components/MoreWork'
import PhoneReel from '../components/PhoneReel'

/*
 * EdApp case study: the learner homescreen overhaul.
 * Editorial layout on one grid: a narrow label column and a wide content column,
 * with visuals running the full width.
 */

const problems = [
  ['Three at a time', 'Learners could only see three courses at once on mobile, so big libraries meant a long scroll.'],
  ['Hard to browse', 'Finding courseware was frustrating, with no sense of where anything lived.'],
  ['No pathway', 'Nothing showed what was in progress, what was next or what was done.'],
  ['Admins sorting by hand', 'Admins carried the job of ordering courses to guide their learners.'],
  ['Unpredictable', 'Group assignments meant admins couldn’t tell what a learner would actually see.'],
  ['Slow', 'The homescreen called more than 15 endpoints on load.'],
]

const goals = [
  ['Faster access', 'A clearer structure: smaller cards, horizontal rows and sections.'],
  ['Obvious next step', 'Make it clear which course is up next.'],
  ['Less admin', 'Automate ordering, so admins with 100+ courses stop organising by hand.'],
]

const structure = [
  ['Admin curation', 'Playlists and course collections, where admins choose exactly what comes next.'],
  ['Dynamic workflow', 'Up next, Continue learning and Completed, sorted automatically so learners always know their place.'],
  ['Temporary placement', 'Brain Boost and Rapid Refresh quizzes that appear when they’re due and disappear when they’re done.'],
]

const approach = [
  ['Listen', 'Customer feedback and competitor research.'],
  ['Prototype for real', 'A front-end-only build, so we could test with real courseware without waiting on back-end changes or app releases.'],
  ['Test', 'Behind a feature flag with 50+ accounts.'],
  ['Tune', 'Six months of customer feedback until it worked for the 80%.'],
  ['Roll out', 'In stages, to de-risk the change and keep customers happy.'],
]

const quotes = [
  'Love it, it’s much easier to identify mandatory training.',
  'Really nice to see what is due and coming soon. Love the transitions and carousel.',
  'It’s great. Logical and uncluttered. Good overview. I like the look and feel.',
]

export default function EdApp() {
  return (
    <article className="cs brand brand-edapp ed">
      <header className="cs-hero">
        <div className="ed-wrap ed-hero">
          <div className="ed-hero-main">
            <p className="mono small cs-kicker">Case study · EdApp</p>
            <h1 className="display cs-title">
              Helping learners find what to <span className="cs-accent">learn next.</span>
            </h1>
            <p className="cs-intro">
              EdApp was a mobile learning app used by teams around the world, before it became part of SafetyCulture. I was its sole
              mobile designer for five years. This is the homescreen overhaul I designed end to end, from the problem to a staged roll-out.
            </p>
          </div>
          <dl className="ed-stats">
            <div><dt>Monthly users</dt><dd>200K+</dd></div>
            <div><dt>Lessons a month</dt><dd>1M+</dd></div>
          </dl>
        </div>
        <dl className="ed-wrap ed-facts">
          <div><dt>Role</dt><dd>Sole mobile designer</dd></div>
          <div><dt>Team</dt><dd>Product manager, engineering lead</dd></div>
          <div><dt>Tested</dt><dd>50+ accounts, behind a feature flag</dd></div>
          <div><dt>Shipped</dt><dd>Staged roll-out</dd></div>
        </dl>
      </header>


      <PhoneReel project="EdApp" screens={[
        'The new Training homescreen with paths and up next',
        'A path opened, with its lessons and a resume button',
        'In progress, up next and completed rows',
        'A lesson cover ready to start',
      ]} />

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">01</span>The problem</p>
        <div className="ed-main">
          <h2 className="display ed-h">Learners opened the app and couldn’t tell what to do next.</h2>
          <ol className="ed-grid ed-grid-3">
            {problems.map(([t, d]) => (
              <li key={t}><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-ba" aria-label="Before and after the homescreen redesign">
        <figure>
          <div className="ba2-frame"><img src="/work/edapp/before.webp" alt="The old homescreen: one long list of large course cards" width="520" height="1124" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
          <figcaption><span>Before</span>One long list, three courses at a time.</figcaption>
        </figure>
        <figure>
          <div className="ba2-frame"><img src="/work/edapp/after.webp" alt="The new homescreen: in progress, up next and completed rows" width="520" height="1126" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
          <figcaption><span>After</span>In progress, up next and completed, at a glance.</figcaption>
        </figure>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">02</span>Goals</p>
        <div className="ed-main">
          <ol className="ed-grid ed-grid-3 ed-numbered">
            {goals.map(([t, d]) => (
              <li key={t}><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">03</span>The structure</p>
        <div className="ed-main">
          <h2 className="display ed-h">I grouped everything by how it gets there.</h2>
          <p className="ed-p">The old homescreen only knew about content types, and its order didn’t reflect what mattered.</p>
          <dl className="ed-table">
            {structure.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label"><span className="ed-num">04</span>Up next</p>
          <div className="ed-main">
            <h2 className="display ed-big">One rule for what comes next, that works for 80% of customers.</h2>
            <p className="ed-p">I mapped every way customers already ordered courses (due dates, mandatory, playlist order, published date, prerequisites, collection order) and worked with engineering on an algorithm that ranks them, so the right course rises to the top without admin effort.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">05</span>Approach</p>
        <div className="ed-main">
          <ol className="ed-steps">
            {approach.map(([t, d], i) => (
              <li key={t}><span className="ed-step-n">0{i + 1}</span><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">06</span>What customers said</p>
        <div className="ed-main">
          <div className="ed-quotes">
            {quotes.map((q) => <blockquote key={q} className="display">“{q}”</blockquote>)}
          </div>
          <p className="ed-note">Customer feedback during testing</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label"><span className="ed-num">07</span>Beyond the homescreen</p>
        <div className="ed-main">
          <p className="ed-p">Across five years I designed the learner app end to end: sign-up and log-in, branded registration, gamification with achievements and leaderboards, learning paths and course banners. I also helped take EdApp through to acquisition, designing its brand, website and investor decks along the way.</p>
        </div>
      </section>


      <MoreWork current="edapp" />
    </article>
  )
}
