import MoreWork from '../components/MoreWork'

/*
 * Digital Resonance: an independent project. Copy is Paula's own.
 * Quotes are from professionals who replied to research outreach, attributed by role only.
 */

const stages = [
  ['Understand', 'What happens to someone’s digital life, and where do I start?'],
  ['Discover', 'Which accounts, devices and services did they have?'],
  ['Act', 'How do I manage each of them?'],
]

const principles = [
  ['Reduce complexity.', 'Plain language, consistent guide structures, clear requirements and practical next steps.'],
  ['Remove barriers.', 'No sign-up, payment or unnecessary collection of personal information.'],
  ['Establish trust.', 'Australian-specific guidance, official provider links and clear boundaries around legal advice and sensitive information.'],
  ['Support different levels of digital literacy.', 'Downloadable and printable resources for people who prefer offline guidance or need support from someone else.'],
]

const parts = [
  ['Help Centre', 'Practical guidance on where to begin, finding accounts, avoiding common mistakes and managing access to devices and email.'],
  ['Accounts Directory', 'A broader reference of commonly held accounts and services to help families identify what might exist.'],
  ['Provider guides', 'Consistent, step-by-step instructions for managing specific accounts.'],
  ['Downloadable resources', 'Printable checklists and guides that support families beyond the website.'],
  ['For Professionals', 'Dedicated resources for funeral directors, end-of-life doulas and other professionals supporting bereaved families.'],
]

const n = (i: number) => String(i + 1).padStart(2, '0')

export default function DigitalResonance() {
  return (
    <article className="cs brand brand-dr ed">
      {/* The site's own background: three blurred blobs drifting slowly */}
      <header className="cs-hero dr-hero">
        <div className="dr-bg" aria-hidden="true"><span className="dr-blob dr-blob1" /><span className="dr-blob dr-blob2" /><span className="dr-blob dr-blob3" /></div>
        <div className="ed-wrap ed-hero">
          <div className="ed-hero-main">
            <p className="mono small cs-kicker">Independent project · digitalresonance.co</p>
            <h1 className="display cs-title">
              <span className="dr-light">Making the digital side of loss </span><span className="cs-accent">a little easier.</span>
            </h1>
            <p className="cs-intro">
              After experiencing firsthand the complexity of managing someone’s digital life after death, I founded Digital Resonance — a
              free Australian resource helping families navigate accounts, subscriptions, devices and digital memories.
            </p>
            <p className="cs-intro">
              I independently researched, designed, built and launched the product, continuing to evolve it through search data, customer
              behaviour and conversations with end-of-life professionals.
            </p>
          </div>
          <dl className="ed-stats">
            <div><dt>Search impressions</dt><dd>36K+</dd></div>
            <div><dt>Organic search growth</dt><dd>13×</dd><p className="dr-stat-note">in a year</p></div>
          </dl>
        </div>
        <dl className="ed-wrap ed-facts dr-facts-3">
          <div><dt>Role</dt><dd>Founder · Research, strategy, design, content and development</dd></div>
          <div><dt>Built with</dt><dd>React, Vite, Vercel and Plausible</dd></div>
          <div><dt>Status</dt><dd>Live at digitalresonance.co</dd></div>
        </dl>
      </header>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The problem</p>
        <div className="ed-main">
          <h2 className="display ed-h">Families are navigating unfamiliar systems at a time when they have the least capacity to do so.</h2>
          <p className="ed-p">Every provider has different processes, documentation requirements and restrictions. Closing accounts in the wrong order can result in lost access to other services, important information or irreplaceable memories.</p>
          <p className="ed-p">Most digital legacy products focus on preparing for death. I wanted to address what happens when someone dies and those preparations haven’t been made.</p>
          <p className="ed-p">I started with a searchable library of provider-specific guides, giving families clear, practical instructions without requiring an account, payment or technical knowledge.</p>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · Challenging my initial assumptions</p>
          <div className="ed-main">
            <h2 className="display ed-h">I had solved how to manage an account, but not how to find it in the first place.</h2>
            <div className="dr-evidence">
              <div className="dr-figure">
                <span className="dr-figure-n">385</span>
                <span className="dr-figure-l">of the top 1,000 searches related to closing or cancelling accounts</span>
              </div>
              <div>
                <p className="ed-p">Organic search data showed strong intent around individual tasks: 385 of the top 1,000 searches related to closing or cancelling accounts.</p>
                <p className="ed-p">However, conversations with end-of-life professionals revealed a broader problem.</p>
              </div>
            </div>
            <figure className="dr-quote">
              <blockquote className="display">“The biggest issue families face is usually not knowing what exists, where to find it or what needs to be closed, transferred, preserved or deleted.”</blockquote>
              <figcaption>Death educator and doula</figcaption>
            </figure>
            <p className="ed-p">The research reframed the customer journey into three stages:</p>
            <ol className="ed-steps ed-steps-3 dr-steps">
              {stages.map(([t, q], i) => (
                <li key={t} className={i === 2 ? 'is-done' : ''}>
                  <span className="ed-step-n">{n(i)}{i === 2 ? ' · Where the product started' : ''}</span>
                  <b>{t}</b>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
            <p className="ed-p dr-after">The original product primarily addressed the third stage. I expanded the experience to support families throughout the entire process.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">03 · Designing for grief</p>
        <div className="ed-main">
          <h2 className="display ed-h">Reduce the cognitive load, not just the number of clicks.</h2>
          <p className="ed-p">Every design decision considered the emotional circumstances in which someone would use the product.</p>
          <ol className="dp-principles dr-principles">
            {principles.map(([t, d], i) => (
              <li key={t}>
                <span className="ch-n">{n(i)}</span>
                <h3 className="ch-t">{t.replace(/\.$/, '')}</h3>
                <p className="ch-d">{d}</p>
              </li>
            ))}
          </ol>
          <aside className="dr-restraint">
            <p className="ch-n">What I chose not to build</p>
            <p className="ed-p">I deliberately avoided building a password vault or comprehensive estate planning platform. The priority was solving the immediate customer problem without introducing additional complexity, security risks or obligations.</p>
          </aside>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · Evolving the product</p>
        <div className="ed-main">
          <h2 className="display ed-h">From a library of instructions to a resource that helps families navigate the entire process.</h2>
          <dl className="ed-table">
            {parts.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · Growth and the next challenge</p>
        <div className="ed-main">
          <h2 className="display ed-h">You can’t search for a problem you don’t know you have yet.</h2>
          <p className="ed-p">I built organic search into the product strategy from the beginning, using provider-specific content to reach people at the point of need.</p>
          <p className="ed-p">While this has generated measurable organic visibility, search primarily reaches people who already know what they need to do. Reaching families earlier remains the biggest distribution challenge.</p>
          <p className="ed-p">I’m exploring professional referral pathways, printable resources and AI search discoverability to reach people before they encounter problems.</p>
          <figure className="dr-quote dr-quote-sm">
            <p className="dr-quote-intro">Feedback from an end-of-life doula following the introduction of professional resources:</p>
            <blockquote className="display">“This is extremely helpful. I’ll add this to my arsenal and possibly even my website.”</blockquote>
            <figcaption>End-of-life doula</figcaption>
          </figure>
          <p className="ed-p">Digital Resonance remains an evolving product. Its development is driven by real search behaviour, professional feedback and a commitment to making an unnecessarily difficult experience a little easier.</p>
          <a className="dr-visit" href="https://digitalresonance.co" target="_blank" rel="noopener noreferrer">Visit digitalresonance.co <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <MoreWork current="digital-resonance" />
    </article>
  )
}
