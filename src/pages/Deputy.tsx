import { Link } from 'react-router-dom'

const moments = [
  ['01', 'Choose', 'Recommend what fits, not what costs most.', 'poster-p'],
  ['02', 'Start', 'Get the whole team in early, without the awkward bits.', 'poster-a'],
  ['03', 'Commit', 'Show the whole commitment before anyone signs up to it.', 'poster-ink'],
  ['04', 'Stay', 'Ask why before goodbye, and offer a better option.', 'poster-soft'],
]

export default function Deputy() {
  return (
    <article className="case">
      <section className="case-hero">
        <div className="case-hero-inner wrap">
          <div className="case-meta mono">
            <span>Deputy · 2024–now</span>
            <span>Acquisition · Monetisation · Retention</span>
          </div>
          <h1 className="display case-title">
            Say yes
            <br />
            with <span className="accent">confidence.</span>
          </h1>
          <div className="devices" aria-hidden="true">
            <div className="device phone phone-l">
              <div className="screen">
                <span className="mono label">Choose</span>
                <b className="screen-h">What fits your team?</b>
                <span className="opt">Just getting started</span>
                <span className="opt opt-on">Growing team<br /><small>Recommended for you</small></span>
                <span className="opt">Multiple locations</span>
              </div>
            </div>
            <div className="device tablet">
              <div className="screen">
                <span className="mono label">Start</span>
                <b className="screen-h big">Let’s get your team in.</b>
                <div className="progress"><span className="on" /><span className="on" /><span /></div>
                <span className="opt">Sam Ortiz · Manager</span>
                <span className="opt opt-dash">+ Add someone. They won’t hear from us until you’re ready.</span>
                <span className="btn">Continue</span>
              </div>
            </div>
            <div className="device phone phone-r">
              <div className="screen screen-a">
                <span className="mono label">Stay</span>
                <b className="screen-h">Before you go, what’s changed?</b>
                <span className="opt opt-fill">It’s our quiet season</span>
                <span className="opt opt-fill">We’re trying another tool</span>
                <span className="btn btn-block">Pause instead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="credits wrap">
        {[
          ['Client', 'Deputy'],
          ['Role', 'Senior product designer'],
          ['Focus', 'How customers choose, start, commit and stay'],
          ['With', 'Product, engineering, marketing, sales, success'],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="mono label">{k}</p>
            <p className="credit">{v}</p>
          </div>
        ))}
      </section>

      <section className="billboard-sec">
        <div className="wrap billboard-top">
          <p className="mono small">The principle</p>
          <p className="principle">People don’t leave products because they’re hard. They leave because they said yes to something they didn’t understand.</p>
        </div>
        <div className="billboard">
          <div className="board">
            <span className="display board-title">Know what<br />you’re saying <span className="accent">yes</span> to.</span>
            <span className="mono board-foot"><span>Paula White</span><span>Campaign 01</span></span>
          </div>
          <div className="leg leg-l" />
          <div className="leg leg-r" />
        </div>
        <div className="ground" />
      </section>

      <section className="story wrap">
        {[
          ['01 / The brief', 'A company-wide change to how customers choose a plan, buy, and stay.'],
          ['02 / What I found', 'Trust broke at the moments of decision, when people couldn’t see what they were agreeing to.'],
          ['03 / What I designed', 'One clear experience across every decision point, so saying yes felt easy and stayed that way.'],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="mono label">{k}</p>
            <p className="story-line">{v}</p>
          </div>
        ))}
      </section>

      <section className="moments wrap">
        <div className="work-head">
          <h2 className="display section-title">Four moments</h2>
          <p className="muted">The decisions customers make, and what each one needs from design.</p>
        </div>
        <div className="posters">
          {moments.map(([n, t, line, cls]) => (
            <div key={t} className={`poster ${cls}`}>
              <span className="mono small">{n}</span>
              <span className="display poster-title">{t}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="beyond">
        <div className="wrap beyond-inner">
          <div className="beyond-copy">
            <p className="mono small muted">Beyond the screen</p>
            <h2 className="display section-title">One promise,<br /><span className="accent">everywhere.</span></h2>
            <p className="beyond-text">Emails, reminders and help content speak the same plain language as the product, so nothing arrives as a surprise.</p>
          </div>
          <div className="beyond-art" aria-hidden="true">
            <div className="email">
              <span className="mono label">Welcome email</span>
              <b className="screen-h big">You’re in. Here’s what happens next.</b>
              <span>Three steps to get your team set up, and exactly when your trial ends.</span>
            </div>
            <div className="device phone lock">
              <div className="screen screen-p">
                <span className="lock-time">9:41</span>
                <div className="notif"><b>Your trial ends Friday</b>Here’s what happens next. No surprises.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-end wrap">
        <p className="muted small">Screens are recreated and simplified to show the thinking. Names and content are illustrative.</p>
        <Link to="/work/digital-resonance" className="display next">Next campaign →</Link>
      </section>
    </article>
  )
}
