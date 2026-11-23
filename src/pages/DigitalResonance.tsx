import MoreWork from '../components/MoreWork'

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
  ['They often say they will address it after the funeral.', 'Independent funeral director'],
]

const sections = [
  ['Help Centre', 'Where to start, how to find accounts, common mistakes, devices and email.'],
  ['Accounts Directory', 'A broad list of the accounts people commonly have, not just the ones with guides.'],
  ['Provider guides', 'Step-by-step instructions and official links for specific providers.'],
  ['Get Started Guide', 'A downloadable guide for orientation and offline support.'],
  ['For Professionals', 'Resources for the people who support families, so they can share it earlier.'],
]

const notBuilt = [
  ['No password vault', 'Several practitioners asked for a secure place to store passwords. I chose not to build one: holding people’s passwords is a big security and trust risk, and families need answers now. Instead there’s a plan-ahead list people fill in by hand, with no passwords written down.'],
  ['No sign-up', 'Grieving people need answers, not another account to manage. Everything is free and open.'],
  ['No legal or estate planning', 'I kept to what happens after a death, and stayed out of wills, passwords and legal advice.'],
  ['Australia first', 'One clear set of rules and providers, so the guidance could be specific and trustworthy.'],
  ['Built to be found', 'Every guide stands on its own, because people arrive from search for one task, not through the homepage.'],
]

const grief = [
  ['Plain and calm', 'Short sections in plain language, warm without being sentimental, because grief takes up a lot of room in your head.'],
  ['The same every time', 'Every guide follows one structure, with clear requirements and official links, so people know where they are and what to trust.'],
  ['Built for interruptions', 'People come back days later, often on their phone, so every page makes sense on its own.'],
]

const ways = [
  ['Professionals as the way in', 'Doulas, funeral directors and palliative care teams meet families before they know what to ask, so the For Professionals page gives them something simple to hand over.'],
  ['Print, not just web', 'Checklists and guides with QR codes that can sit in a funeral folder or a handout.'],
  ['Searchable where people are', 'Pages written in the words people actually use, and structured to show up in AI search answers too.'],
]

const didnt = [
  ['One and done', 'One-guide visits rarely led people to explore further.'],
  ['A quiet Help Centre', 'It got less traffic than I hoped, so where it’s linked from matters as much as what’s in it.'],
  ['Search moves around', 'Rankings shift, so I can’t rely on search alone.'],
  ['Guides take effort', 'Which pushed me to invest where it helps most, rather than just adding more.'],
]


export default function DigitalResonance() {
  return (
    <article className="cs brand brand-dr ed">
      {/* The site's own background: three blurred blobs drifting slowly */}
      <header className="cs-hero dr-hero">
        <div className="dr-bg" aria-hidden="true"><span className="dr-blob dr-blob1" /><span className="dr-blob dr-blob2" /><span className="dr-blob dr-blob3" /></div>
        <div className="ed-wrap ed-hero">
          <div className="ed-hero-main">
            <p className="mono small cs-kicker">Side project · digitalresonance.co</p>
            <h1 className="display cs-title">
              <span className="dr-light">A calm guide for the digital side of </span><span className="cs-accent">losing someone.</span>
            </h1>
            <p className="cs-intro">
              After a death, families have to deal with bank accounts, phones, email, subscriptions and social media, at the moment
              they have the least capacity for it. Digital Resonance is a free Australian website that helps them through it. I
              founded it, and did the research, design, content and build myself.
            </p>
          </div>
          <dl className="ed-stats">
            <div><dt>Search impressions</dt><dd>36K+</dd></div>
            <div><dt>Growth in a year</dt><dd>13×</dd></div>
          </dl>
        </div>
        <dl className="ed-wrap ed-facts">
          <div><dt>Role</dt><dd>Founder: research, design, content and build</dd></div>
          <div><dt>Built with</dt><dd>React, Vite, Vercel, Plausible</dd></div>
          <div><dt>Audience</dt><dd>Bereaved families and the professionals who help them</dd></div>
          <div><dt>Status</dt><dd>Live at digitalresonance.co</dd></div>
        </dl>
      </header>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The problem</p>
        <div className="ed-main">
          <h2 className="display ed-h">People don’t know which accounts exist, where to start, or what order to do things in.</h2>
          <div className="ed-two">
            <p className="ed-p">Every provider has its own rules. Closing the wrong account first can lock you out of others, or lose photos and memories for good. Most existing resources focus on planning ahead, not on what to do when it’s already happened.</p>
            <p className="ed-p">I started with the most concrete part of the problem: a free library of step-by-step guides for specific providers, across banks, phone and internet, cloud and identity, social media, subscriptions and government services. No sign-up. One repeatable structure, so it could grow, and so people searching for an exact task could find it.</p>
          </div>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · What professionals told me</p>
          <div className="ed-main">
            <h2 className="display ed-h">I emailed the people who sit with families, and around 20 wrote back.</h2>
            <div className="ed-voices">
              {voices.map(([q, who]) => (
                <figure key={q}><blockquote className="display">“{q}”</blockquote><figcaption>{who}</figcaption></figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">03 · What I chose not to build</p>
        <div className="ed-main">
          <h2 className="display ed-h">The obvious idea was a digital legacy platform. I chose to build less.</h2>
          <dl className="ed-table">
            {notBuilt.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · Designing for grief</p>
        <div className="ed-main">
          <ol className="ed-grid ed-grid-3">
            {grief.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · What I learned</p>
        <div className="ed-main">
          <h2 className="display ed-big">I’d built step three first.</h2>
          <ol className="ed-steps ed-steps-3 dr-steps">
            {steps.map(([n, t, q]) => (
              <li key={n} className={n === '03' ? 'is-done' : ''}>
                <span className="ed-step-n">{n} · {n === '03' ? 'Where the guides were' : 'The bigger gap'}</span>
                <b>{t}</b>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <p className="ed-p dr-after">Search data showed people arriving for one specific task: 385 of the top 1,000 searches were about closing or cancelling an account. They read that guide and left. Conversations with death-care and estate professionals told me the real uncertainty starts much earlier: people don’t know where to begin, or which accounts even exist. The guides were solving step three.</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">06 · What changed</p>
        <div className="ed-main">
          <p className="ed-p">The guides stayed, as useful infrastructure and the way people find the site. Around them, I built for the earlier steps.</p>
          <dl className="ed-table">
            {sections.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">07 · One conversation that changed things</p>
          <div className="ed-main">
            <h2 className="display ed-big">“The simpler something is, the easier it’s going to be for a grieving person to follow.”</h2>
            <div className="ed-two">
              <p className="ed-p">After a call, an end-of-life doula who works mostly with people aged 60 to 80 asked what I’d recommend for people with less digital literacy. The honest answer was that the site still assumed you could navigate a website.</p>
              <p className="ed-p">So I built a For Professionals page with simple printable resources: a one-page checklist of what to do after a death, a plan-ahead list to keep with a will, and the Get Started Guide, each with a QR code for handouts. Her reply: “This is extremely helpful. I’ll add this to my arsenal and possibly even my website.”</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">08 · The hardest part: distribution</p>
        <div className="ed-main">
          <h2 className="display ed-h">You can’t search for a problem you don’t know you have yet.</h2>
          <p className="ed-p">Search works for step three. Someone who knows they need to close a bank account will type exactly that. But people at the start don’t know what to search for. In 12 months, “digital legacy” was searched once. Most aren’t looking at all until something forces them to, often well after the funeral. So I’m testing other ways in:</p>
          <ol className="ed-grid ed-grid-3 dr-ways">
            {ways.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
          <p className="ed-note">This is still the least solved part of the project, and where most of the work ahead is.</p>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">09 · What didn’t work</p>
        <div className="ed-main">
          <h2 className="display ed-h">It’s early. People can find it and professionals value it, but that isn’t proof it’s solved the problem yet.</h2>
          <ol className="ed-grid ed-grid-2">
            {didnt.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">10 · Reflection</p>
        <div className="ed-main">
          <h2 className="display ed-h">Ship the concrete thing first, then let people show you where the real problem is.</h2>
          <p className="ed-p">Launching with guides meant I learned from real searches within weeks. Watching what people did, and talking to the professionals who see families every day, moved the work upstream to where it matters most.</p>
        </div>
      </section>

      <MoreWork current="digital-resonance" />
    </article>
  )
}
