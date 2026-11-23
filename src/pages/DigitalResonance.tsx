import { Link } from 'react-router-dom'
import Placeholders from '../components/Placeholders'

/*
 * Digital Resonance: a side project. A live website, not a product.
 * Held back until Paula says otherwise: the personal story behind it, and research participants' names.
 */

const steps = [
  ['01', 'Understand', 'What happens to someone’s digital life, and where do I even start?'],
  ['02', 'Discover', 'Which accounts did they actually have?'],
  ['03', 'Act', 'How do I close or keep this specific account?'],
]

const sections = [
  ['Help Centre', 'Where to start, how to find accounts, common mistakes, devices and email.'],
  ['Accounts Directory', 'A broad list of the accounts people commonly have, not just the ones with guides.'],
  ['Provider guides', 'Step-by-step instructions and official links for specific providers.'],
  ['Get Started Guide', 'A downloadable guide for orientation and offline support.'],
  ['For Professionals', 'Resources for the people who support families, so they can share it earlier.'],
]

export default function DigitalResonance() {
  return (
    <article className="cs">
      <header className="cs-hero wrap">
        <p className="mono small cs-kicker">Side project · Digital Resonance</p>
        <h1 className="display cs-title">
          A calm guide for the digital side of losing <span className="cs-accent">someone.</span>
        </h1>
        <p className="cs-intro">
          After a death, families have to deal with bank accounts, phones, email, subscriptions and social media, at the moment
          they have the least capacity for it. Digital Resonance is a free Australian website that helps them through it. I
          founded it, and did the research, design, content and build myself.
        </p>
        <dl className="cs-facts">
          <div><dt>Role</dt><dd>Founder: research, design, content and build</dd></div>
          <div><dt>Built with</dt><dd>React, Vite, Vercel, Plausible and Search Console</dd></div>
          <div><dt>Audience</dt><dd>Bereaved families, executors and the professionals who help them</dd></div>
          <div><dt>Status</dt><dd>Live at digitalresonance.co</dd></div>
        </dl>
      </header>

      <Placeholders project="Digital Resonance" />

      <section className="cs-block wrap">
        <p className="mono small cs-label">The problem</p>
        <div className="cs-body">
          <p className="cs-lead">People don’t know which accounts exist, where to start, or what order to do things in.</p>
          <p>Every provider has its own rules. Closing the wrong account first can lock you out of others, or lose photos and memories for good. Most existing resources focus on planning ahead, not on what to do when it’s already happened.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">First version</p>
        <div className="cs-body">
          <p>I started with the most concrete part of the problem: a free library of step-by-step guides for specific providers, across banks, phone and internet, cloud and identity, social media, subscriptions and government services. No sign-up. One repeatable structure, so it could grow, and so people searching for an exact task could find it.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Designing for grief</p>
        <div className="cs-body">
          <ul className="cs-list">
            <li>Plain language and short sections, because grief takes up a lot of room in your head.</li>
            <li>The same structure on every guide, so people always know where they are.</li>
            <li>Trust through clear requirements, official links and honest limits.</li>
            <li>Built for interruptions: people come back days later, often on their phone.</li>
            <li>Calm and warm, without being sentimental.</li>
          </ul>
        </div>
      </section>

      <section className="cs-moments wrap" aria-labelledby="dr-insight">
        <div className="cs-moments-head">
          <p className="mono small cs-label">What I learned</p>
          <h2 id="dr-insight" className="display cs-h2">I’d built step three first.</h2>
        </div>
        <ol className="cs-moment-list cs-steps3">
          {steps.map(([n, t, q]) => (
            <li key={n} className={`cs-moment ${n === '03' ? 'cs-moment-done' : ''}`}>
              <span className="cs-moment-n">{n}</span>
              <span className="display cs-moment-t">{t}</span>
              <span className="cs-moment-detail">{q}</span>
              {n === '03' && <span className="cs-moment-line">Where the guides were</span>}
              {n !== '03' && <span className="cs-moment-line">The bigger gap</span>}
            </li>
          ))}
        </ol>
        <div className="cs-body cs-after-steps">
          <p>Search data showed people arriving for one specific task, like closing a bank account, reading that guide and leaving. Conversations with death-care and estate professionals told me the real uncertainty starts much earlier: people don’t know where to begin, or which accounts even exist. The guides were solving step three.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What changed</p>
        <div className="cs-body">
          <p>The guides stayed, as useful infrastructure and the way people find the site. Around them, I built for the earlier steps.</p>
          <dl className="cs-shipped">
            {sections.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Where it’s at</p>
        <div className="cs-body">
          <p className="cs-lead">Over 12 months, search impressions grew 13 times over, to more than 36,000.</p>
          <p>Most searches are for closing or cancelling a specific account, which confirms how people arrive. A practitioner who works with older clients described the downloadable guide as extremely helpful and wants to share it. It’s early: these are signs people can find it, not proof it’s solved the problem yet.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I’d take with me</p>
        <div className="cs-body">
          <p className="cs-lead">Ship the concrete thing first, then let people show you where the real problem is.</p>
          <p>Launching with guides meant I learned from real searches within weeks. Watching what people did, and talking to the professionals who see families every day, moved the work upstream to where it matters most.</p>
        </div>
      </section>

      <nav className="cs-end wrap" aria-label="More work">
        <Link to="/#work" className="mono small">← All work</Link>
        <a href="https://digitalresonance.co" target="_blank" rel="noreferrer" className="display cs-next">Visit the site ↗</a>
      </nav>
    </article>
  )
}
