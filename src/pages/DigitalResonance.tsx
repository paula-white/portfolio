import MoreWork from '../components/MoreWork'

/*
 * Digital Resonance: an independent project. Copy is Paula's own.
 * Quotes are from professionals who replied to research outreach, attributed by role only.
 */

const voices = [
  ['Families don’t know what exists.', 'The biggest issue families face is usually not knowing what exists, where to find it or what needs to be closed, transferred, preserved or deleted.', 'Death educator and doula'],
  ['Access is a significant barrier.', 'If someone doesn’t have access to all those secrets and security passwords, the accounts often just lie dormant for the rest of eternity.', 'End-of-life doula'],
  ['Digital responsibilities are often deferred.', 'They often say they will address it after the funeral.', 'Independent funeral director'],
]

const stages = [
  ['Understand', 'What happens to someone’s digital life, and where do I start?'],
  ['Discover', 'Which accounts, devices and services did they have?'],
  ['Act', 'How do I manage each of them?'],
]

const principles = [
  ['Reduce complexity.', 'Plain language, consistent guide structures, clear requirements and practical next steps. Every page stands independently, accommodating interruptions and people arriving directly from search.'],
  ['Remove barriers.', 'No sign-up, payment or unnecessary collection of personal information. Families need answers, not another account to manage.'],
  ['Establish trust.', 'Australian-specific guidance, official provider links and clear boundaries around legal advice and sensitive information.'],
  ['Prioritise the immediate problem.', 'Several practitioners suggested a secure password vault. I deliberately chose not to build one, recognising the security risks, trust requirements and complexity it would introduce. Instead, I created a simple offline resource to help people document which accounts exist without collecting passwords.'],
]

const parts = [
  ['Help Centre', 'Practical guidance on where to begin, finding accounts, avoiding common mistakes and managing access to devices and email.'],
  ['Accounts Directory', 'A broader reference of commonly held accounts and services to help families identify what might exist.'],
  ['Provider guides', 'Consistent, step-by-step instructions for managing specific accounts, designed around a repeatable and scalable content structure.'],
  ['Get Started Guide', 'A downloadable resource for initial orientation and offline support.'],
  ['For Professionals', 'Dedicated resources for funeral directors, end-of-life doulas and other professionals supporting bereaved families.'],
]

const opportunities = [
  ['Professional referrals', 'Building relationships with end-of-life professionals who can introduce Digital Resonance before families know what to look for.'],
  ['Offline distribution', 'Creating resources that can be included in funeral folders, information packs and professional handouts.'],
  ['Organic and AI search', 'Structuring content around the language people actually use when seeking help, rather than relying on their familiarity with digital legacy terminology.'],
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
              I independently researched, designed, built and launched the product, continuing to evolve it through search behaviour and
              conversations with end-of-life professionals.
            </p>
          </div>
          <dl className="ed-stats dr-hstats">
            <div><dt>Professional research responses</dt><dd>~20</dd></div>
            <div><dt>Organic search impressions</dt><dd>36K+</dd></div>
            <div><dt>Organic search visibility growth</dt><dd>13×</dd><p className="dr-stat-note">in a year</p></div>
          </dl>
        </div>
        <dl className="ed-wrap ed-facts dr-facts-3">
          <div><dt>Role</dt><dd>Founder · Research, strategy, design, content and development</dd></div>
          <div><dt>Built with</dt><dd>React, Vite, Vercel and Plausible</dd></div>
          <div><dt>Status</dt><dd>Live at <a className="dr-live" href="https://digitalresonance.co" target="_blank" rel="noopener noreferrer">digitalresonance.co ↗</a></dd></div>
        </dl>
      </header>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">01 · The problem</p>
        <div className="ed-main">
          <h2 className="display ed-h">Families are navigating unfamiliar systems at a time when they have the least capacity to do so.</h2>
          <p className="ed-p">Every provider has different processes, documentation requirements and restrictions. Closing accounts in the wrong order can result in lost access to other services, important information or irreplaceable memories.</p>
          <p className="ed-p">Most digital legacy products focus on preparing for death. I wanted to address what happens when someone dies and those preparations haven’t been made.</p>
          <p className="ed-p">I started with a searchable library of provider-specific guides, giving families clear, practical instructions without requiring an account or payment.</p>
        </div>
      </section>

      <section className="ed-feature">
        <div className="ed-wrap ed-sec">
          <p className="ed-label">02 · Research and validation</p>
          <div className="ed-main">
            <h2 className="display ed-h">Understanding the problem beyond my own experience.</h2>
            <p className="ed-p">To challenge my assumptions, I reached out directly to end-of-life doulas, funeral directors, death educators and estate professionals. Around 20 responded, sharing their experiences of supporting families through the digital and administrative responsibilities that follow a death.</p>
            <p className="dr-sub">Three key challenges emerged.</p>
            <div className="dr-voices">
              {voices.map(([t, q, who], i) => (
                <figure key={t}>
                  <span className="ch-n">{n(i)}</span>
                  <h3 className="ch-t">{t}</h3>
                  <blockquote className="display">“{q}”</blockquote>
                  <figcaption>{who}</figcaption>
                </figure>
              ))}
            </div>
            <div className="dr-evidence">
              <div className="dr-figure">
                <span className="dr-figure-n">385</span>
                <span className="dr-figure-l">of the top 1,000 search queries related to closing or cancelling accounts</span>
              </div>
              <div>
                <p className="ed-p">Alongside these conversations, I analysed organic search behaviour to understand how people were actively seeking help. Of the top 1,000 search queries, 385 related to closing or cancelling accounts.</p>
                <p className="ed-p">Together, these insights revealed a gap in my initial solution. I had built for people who already knew which accounts they needed to manage, but families often needed support much earlier.</p>
              </div>
            </div>
            <p className="dr-sub">This reframed the customer journey into three stages:</p>
            <ol className="ed-steps ed-steps-3 dr-steps">
              {stages.map(([t, q], i) => (
                <li key={t} className={i === 2 ? 'is-done' : ''}>
                  <span className="ed-step-n">{n(i)}{i === 2 ? ' · Where the product started' : ''}</span>
                  <b>{t}</b>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
            <p className="ed-p dr-after">The original product primarily addressed the third stage. The research informed a shift in product direction to support families throughout the entire process.</p>
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
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">04 · Evolving the product</p>
        <div className="ed-main">
          <h2 className="display ed-h">From a library of instructions to a resource that supports the entire journey.</h2>
          <p className="ed-p">Rather than continuing to expand the library of provider guides alone, I redirected my efforts towards the earlier stages of the customer journey.</p>
          <dl className="ed-table">
            {parts.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>

          <div className="dr-beyond">
            <h3 className="display dr-beyond-h">Designing beyond the website</h3>
            <p className="ed-p">A conversation with an end-of-life doula who predominantly supports people aged 60–80 challenged another assumption: that everyone accessing Digital Resonance would be comfortable navigating a website.</p>
            <figure className="dr-quote"><blockquote className="display">“The simpler something is, the easier it’s going to be for a grieving person to follow.”</blockquote></figure>
            <p className="ed-p">This led me to expand the experience beyond the website, introducing printable checklists, downloadable guides and resources with QR codes that professionals could share directly with families.</p>
            <p className="ed-p">Following the release, the practitioner responded:</p>
            <figure className="dr-quote"><blockquote className="display">“This is extremely helpful. I’ll add this to my arsenal and possibly even my website.”</blockquote></figure>
            <p className="ed-p">This highlighted an additional opportunity to reach families through trusted professionals who were already supporting them.</p>
          </div>
        </div>
      </section>

      <section className="ed-wrap ed-sec">
        <p className="ed-label">05 · Growth and the next challenge</p>
        <div className="ed-main">
          <h2 className="display ed-h">You can’t search for a problem you don’t know you have yet.</h2>
          <p className="ed-p">I built organic search into the product strategy from the beginning, using provider-specific content to reach people at the point of need.</p>
          <p className="ed-p">While this has generated measurable organic visibility, search primarily reaches people who already know what they need to do. Reaching families earlier remains the biggest distribution challenge.</p>
          <p className="ed-p">The Help Centre also received less traffic than anticipated, reinforcing that creating useful resources and connecting people with them are two different problems.</p>
          <p className="dr-sub">I’m currently exploring three opportunities:</p>
          <ol className="ch-grid dr-opps">
            {opportunities.map(([t, d], i) => (
              <li key={t}>
                <span className="ch-n">{n(i)}</span>
                <h3 className="ch-t">{t}</h3>
                <p className="ch-d">{d}</p>
              </li>
            ))}
          </ol>
          <p className="ed-p dr-close">Digital Resonance remains an evolving product. Its development continues to be informed by search behaviour, professional feedback and a better understanding of where families need support most.</p>
          <a className="dr-visit" href="https://digitalresonance.co" target="_blank" rel="noopener noreferrer">Visit digitalresonance.co <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <MoreWork current="digital-resonance" />
    </article>
  )
}
