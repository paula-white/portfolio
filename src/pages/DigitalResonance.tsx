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

// From email replies to my research outreach. Attributed by role only.
const voices = [
  ['The biggest issue families face is usually not knowing what exists, where to find it or what needs to be closed, transferred, preserved or deleted.', 'Death educator and doula'],
  ['If someone doesn’t have access to all those secrets and security passwords, the accounts often just lie dormant for the rest of eternity.', 'End-of-life doula'],
  ['Every account, bank and utility has a different process when dealing with a deceased estate.', 'End-of-life doula'],
  ['They often say they will address it after the funeral.', 'Independent funeral director'],
  ['Our digital lives haven’t necessarily entered that same mental category yet.', 'End-of-life practitioner'],
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
    <article className="cs brand brand-dr">
      {/* The site's own background: three blurred blobs drifting slowly */}
      <div className="dr-bg" aria-hidden="true"><span className="dr-blob dr-blob1" /><span className="dr-blob dr-blob2" /><span className="dr-blob dr-blob3" /></div>
      <header className="cs-hero wrap">
        <img className="dr-heart" src="/brand/dr-heart.png" alt="" width="480" height="480" />
        <p className="mono small cs-kicker">Side project · digitalresonance.co</p>
        <h1 className="display cs-title">
          <span className="dr-light">A calm guide for the digital side of </span><span className="cs-accent">losing someone.</span>
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

      <div className="dr-ticker" aria-hidden="true">
        <div className="dr-ticker-track">
          {[0, 1, 2, 3].map((i) => <span key={i}>Guidance to preserve memories and resolve digital accounts after losing a loved one · </span>)}
        </div>
      </div>

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

      <section className="cs-moments wrap" aria-labelledby="dr-voices">
        <div className="cs-moments-head">
          <p className="mono small cs-label">What professionals told me</p>
          <h2 id="dr-voices" className="display cs-h2">I emailed the people who sit with families, and around 20 wrote back.</h2>
        </div>
        <ol className="cs-moment-list cs-voices">
          {voices.map(([q, who]) => (
            <li key={q} className="cs-moment"><span className="cs-moment-line">“{q}”</span><span className="cs-moment-detail">{who}</span></li>
          ))}
        </ol>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I chose not to build</p>
        <div className="cs-body">
          <p className="cs-lead">The obvious idea was a digital legacy platform. I chose to build less.</p>
          <dl className="cs-shipped">
            <div><dt>No password vault</dt><dd>Several practitioners asked for a secure place to store passwords. I chose not to build one: holding people’s passwords is a big security and trust risk, and families need answers now. Instead there’s a plan-ahead list people fill in by hand, with no passwords written down.</dd></div>
            <div><dt>No sign-up</dt><dd>Grieving people need answers, not another account to manage. Everything is free and open.</dd></div>
            <div><dt>No legal or estate planning</dt><dd>I kept to what happens after a death, and stayed out of wills, passwords and legal advice.</dd></div>
            <div><dt>Australia first</dt><dd>One clear set of rules and providers, so the guidance could be specific and trustworthy.</dd></div>
            <div><dt>Built to be found</dt><dd>Every guide stands on its own, because people arrive from search for one task, not through the homepage.</dd></div>
          </dl>
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
          <p>Search data showed people arriving for one specific task: 385 of the top 1,000 searches were about closing or cancelling an account. They read that guide and left. Conversations with death-care and estate professionals told me the real uncertainty starts much earlier: people don’t know where to begin, or which accounts even exist. The guides were solving step three.</p>
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
        <p className="mono small cs-label">One conversation that changed things</p>
        <div className="cs-body">
          <blockquote className="display cs-quote">“The simpler something is, the easier it’s going to be for a grieving person to follow.”</blockquote>
          <p>After a call, an end-of-life doula who works mostly with people aged 60 to 80 asked what I’d recommend for people with less digital literacy. The honest answer was that the site still assumed you could navigate a website. So I built a For Professionals page with simple printable resources: a one-page checklist of what to do after a death, a plan-ahead list to keep with a will, and the Get Started Guide, each with a QR code for handouts.</p>
          <p>Her reply: “This is extremely helpful. I’ll add this to my arsenal and possibly even my website.”</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">The hardest part: distribution</p>
        <div className="cs-body">
          <blockquote className="display cs-quote">You can’t search for a problem you don’t know you have yet.</blockquote>
          <p>Search works for step three. Someone who knows they need to close a bank account will type exactly that. But people at the start don’t know what to search for. In 12 months, “digital legacy” was searched once. Most aren’t looking at all until something forces them to, often well after the funeral.</p>
          <p>So I can’t rely on search to reach people early. I’m testing other ways in:</p>
          <ul className="cs-list">
            <li><b>Professionals as the way in.</b> Doulas, funeral directors and palliative care teams meet families before they know what to ask, so the For Professionals page gives them something simple to hand over.</li>
            <li><b>Print, not just web.</b> Checklists and guides with QR codes that can sit in a funeral folder or a handout.</li>
            <li><b>Searchable where people already are.</b> Pages written in the words people actually use, and structured to show up in AI search answers too.</li>
          </ul>
          <p>This is still the least solved part of the project, and where most of the work ahead is.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">Where it’s at</p>
        <div className="cs-body">
          <p className="cs-lead">Over 12 months, search impressions grew 13 times over, to more than 36,000.</p>
          <p>It’s early: these are signs people can find it and that professionals value it, not proof it’s solved the problem yet.</p>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What didn’t work</p>
        <div className="cs-body">
          <ul className="cs-list">
            <li>One-guide visits rarely led people to explore further.</li>
            <li>The Help Centre got less traffic than I hoped, so where it’s linked from matters as much as what’s in it.</li>
            <li>Search rankings move around, so I can’t rely on search alone. That’s why I’m testing professionals as a way in.</li>
            <li>Writing more guides takes real effort, which pushed me to invest where it helps most, rather than just adding more.</li>
          </ul>
        </div>
      </section>

      <section className="cs-block wrap">
        <p className="mono small cs-label">What I owned</p>
        <div className="cs-body">
          <dl className="cs-shipped">
            <div><dt>Research</dt><dd>Competitors, provider policies, search behaviour and conversations with death-care and estate professionals.</dd></div>
            <div><dt>Strategy</dt><dd>Audience, scope and what not to build.</dd></div>
            <div><dt>Design</dt><dd>Information architecture, guide structure, interface and responsive layouts.</dd></div>
            <div><dt>Brand and content</dt><dd>Naming, identity, tone of voice and every guide.</dd></div>
            <div><dt>Build</dt><dd>React and Vite, deployed on Vercel, with Plausible, Search Console and Bing.</dd></div>
            <div><dt>Growth</dt><dd>Search strategy, including how the site shows up in AI search, plus outreach to professionals.</dd></div>
          </dl>
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
