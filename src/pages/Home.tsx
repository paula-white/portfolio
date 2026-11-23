import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme'
import RemixColophon from '../components/RemixColophon'
import RemixContents from '../components/RemixContents'
import RemixPrintBar from '../components/RemixPrintBar'
import Marquee from '../components/Marquee'
import BrandPanel from '../components/BrandPanel'
import DotType from '../components/DotType'
import Camo from '../components/Camo'

const Tags = ({ tags }: { tags: string[] }) => (
  <span className="tags mono">
    {tags.map((t) => (
      <span key={t}>{t}</span>
    ))}
  </span>
)

export default function Home() {
  const { look, palette, type } = useTheme()
  // The headline greets you, then compliments you once you've remixed anything.
  const firstLook = useRef(look)
  const remixed = look.bg !== firstLook.current.bg || look.type !== firstLook.current.type || look.pal !== firstLook.current.pal
  // Which layout the controls use, for comparing: ?panel=colophon | contents | printbar
  const panel = (() => {
    try { return new URLSearchParams(window.location.search).get('panel') || 'printbar' } catch { return 'printbar' }
  })()

  return (
    <>
      <section className={`hero hero-${look.bg} hero-panel-${panel === 'contents' || panel === 'colophon' ? panel : 'printbar'} hero-on-p`}>
        {look.bg === 'marquee' && <Marquee family={type.display} weight={type.wt} fontStyle={type.st} base={palette.p} ink={palette.a} quiet />}
        {look.bg === 'camo' && <Camo base={palette.p} accent={palette.a} text={palette.onP} />}
        {look.bg === 'dots' && <DotType family={type.display} weight={type.wt} fontStyle={type.st} dot={palette.a} grid={palette.onP} />}

        {look.bg !== 'dots' && (
          <div className="hero-name">
            <p className="mono hero-meta">Paula White · Senior product builder · Sydney</p>
            <h1 className="display" aria-live="polite">
              {remixed ? (
                <>Ooh, I like<br />your style<span className="accent">.</span></>
              ) : (
                <>Oh hey,<br />I’m Paula<span className="accent">.</span></>
              )}
            </h1>
          </div>
        )}
        {look.bg === 'dots' && <p className="mono hero-hint">Move through the dots · click to scatter</p>}

        {panel === 'contents' ? (
          <RemixContents word="" onWord={() => {}} />
        ) : panel === 'colophon' ? (
          <RemixColophon word="" onWord={() => {}} />
        ) : (
          <RemixPrintBar />
        )}
      </section>

      <BrandPanel className="statement-panel" seed={2} solid>
      <div className="statement wrap">
        <p className="display statement-title">
          Curious about people. Fussy about details. <span className="primary">Happiest when it ships.</span>
        </p>
        <ol className="beats">
          {[
            ['Research', 'I start with people. I talk to customers until I understand what they actually need, not just what they ask for.'],
            ['Design', 'Nothing is accidental. Every detail is considered, every decision intentional.'],
            ['Build', 'I prototype fast, put it in front of real people, and iterate until it works.'],
            ['Ship', 'Then I ship it and watch the numbers. If the data says it isn’t working, I go again.'],
          ].map(([title, line], i) => (
            <li key={title} className="beat">
              <span className="beat-no">0{i + 1}</span>
              <span className="display beat-title">{title}</span>
              <span className="beat-line">{line}</span>
            </li>
          ))}
        </ol>
      </div>
      </BrandPanel>

      <section id="work" className="work wrap">
        <div className="work-head">
          <h2 className="display section-title">Featured work</h2>
          <span className="mono small">Three case studies and a side project, 2017 – today</span>
        </div>

        <Link to="/work/deputy" className="row">
          <div className="row-copy">
            <div className="row-meta mono"><span>01</span><span>2024 – now</span></div>
            <span className="display row-title">Deputy</span>
            <span className="row-line">Helping businesses choose, start, commit and stay, with confidence.</span>
            <Tags tags={['Acquisition', 'Monetisation', 'Retention']} />
            <span className="mono row-cta">Read the case study ↗</span>
          </div>
          <div className="tile tile-p">
            <span className="display tile-title">Say yes<br />with <span className="accent">confidence.</span></span>
            <div className="mini-phone">
              <div className="mini-screen">
                <b>What fits your team?</b>
                <span>Just getting started</span>
                <span className="mini-on">Growing team</span>
                <span>Multiple locations</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/work/sc-training" className="row">
          <div className="row-copy">
            <div className="row-meta mono"><span>02</span><span>2022 – 2024</span></div>
            <span className="display row-title">SC Training</span>
            <span className="row-line">EdApp embedded into the SC platform to make one unified learning platform.</span>
            <Tags tags={['Platform', 'Design systems', 'Design lead']} />
            <span className="mono row-cta">Read the case study ↗</span>
          </div>
          <div className="tile tile-ink">
            <span className="display tile-title">Two<br />became <span className="accent">one.</span></span>
            <div className="merge merge-a" />
            <div className="merge merge-b" />
          </div>
        </Link>

        <Link to="/work/edapp" className="row row-last">
          <div className="row-copy">
            <div className="row-meta mono"><span>03</span><span>2017 – 2022</span></div>
            <span className="display row-title">EdApp</span>
            <span className="row-line">Helping 200K+ people a month find what to learn next, as the sole mobile designer.</span>
            <Tags tags={['Mobile', 'Research', 'Testing at scale', 'Acquisition']} />
            <span className="mono row-cta">Read the case study ↗</span>
          </div>
          <div className="tile tile-a">
            <span className="display tile-title">What’s<br />up next?</span>
            <div className="steps">
              <span className="step-on">In<br /><b>progress</b></span>
              <span className="step-on">Up<br /><b>next</b></span>
              <span>All<br /><b>done</b></span>
            </div>
          </div>
        </Link>

        <Link to="/work/digital-resonance" className="side">
          <span className="mono small side-label">Side project</span>
          <span className="display side-title">Digital Resonance</span>
          <span className="side-line">A live website I founded, researched, designed and built myself.</span>
          <span className="mono small side-cta">Take a look ↗</span>
        </Link>
      </section>

      <section id="bio" className="receipts wrap" aria-labelledby="receipts-title">
        <div className="work-head">
          <h2 id="receipts-title" className="display section-title">Ten years,<br />in short.</h2>
          <span className="mono small">Product strategy · Research · UX/UI · Design systems · React</span>
        </div>
        <div className="counters">
          {[
            ['Acquired', 'I helped take EdApp through to acquisition, designing its brand, website, product and investor decks along the way.', 'EdApp'],
            ['200K+', 'people a month used the mobile app I designed as the sole designer.', 'EdApp'],
            ['2 → 1', 'EdApp embedded into the SC platform to make one unified platform, with 6+ engineering teams pulling the same way.', 'SC Training'],
            ['Repriced', 'I designed the purchasing experience for Deputy’s company-wide pricing and packaging launch, from plan choice to checkout.', 'Deputy'],
            ['End to end', 'From sign-up and onboarding to features and billing, I’ve designed the whole customer journey.', 'EdApp · SC Training · Deputy'],
          ].map(([n, line, where]) => (
            <div key={n} className="counter">
              <p className="display counter-num">{n}</p>
              <p className="counter-line">{line}</p>
              <p className="mono small counter-where">{where}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
