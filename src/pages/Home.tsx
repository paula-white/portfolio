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
          I make complicated things feel <span className="primary">obvious.</span>
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
          <span className="mono small">Four projects, 2017 – today</span>
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

        <Link to="/work/digital-resonance" className="row">
          <div className="row-copy">
            <div className="row-meta mono"><span>02</span><span>2025 – now</span></div>
            <span className="display row-title">Digital Resonance</span>
            <span className="row-line">A calm guide to the accounts of someone who has died. Founded, designed and built.</span>
            <Tags tags={['0 → 1', 'Research', 'Brand', 'React build']} />
            <span className="mono row-cta">Read the case study ↗</span>
          </div>
          <div className="tile tile-a">
            <span className="display tile-title">Start two<br />steps earlier.</span>
            <div className="steps">
              <span className="step-on">01<br /><b>Find</b></span>
              <span className="step-on">02<br /><b>Decide</b></span>
              <span>03<br /><b>Close</b></span>
            </div>
          </div>
        </Link>

        <Link to="/work/sc-training" className="row row-last">
          <div className="row-copy">
            <div className="row-meta mono"><span>03</span><span>2022 – 2024</span></div>
            <span className="display row-title">SC Training</span>
            <span className="row-line">Two learning products, two codebases, two design systems, made one.</span>
            <Tags tags={['Platform', 'Design systems', 'Design lead']} />
            <span className="mono row-cta">Read the case study ↗</span>
          </div>
          <div className="tile tile-ink">
            <span className="display tile-title">Two<br />became <span className="accent">one.</span></span>
            <div className="merge merge-a" />
            <div className="merge merge-b" />
          </div>
        </Link>

        <Link to="/work/edapp" className="other mono">
          <span>Other work</span>
          <span>04 · EdApp, sole mobile designer, 2017 – 2022 ↗</span>
        </Link>
      </section>

      <section id="bio" className="receipts wrap" aria-labelledby="receipts-title">
        <div className="work-head">
          <h2 id="receipts-title" className="display section-title">Ten years in.<br />Here are the receipts.</h2>
          <span className="mono small">Product strategy · Research · UX/UI · Design systems · React</span>
        </div>
        <div className="counters">
          {[
            ['200K+', 'people a month used the mobile app I designed as the sole designer.', 'EdApp'],
            ['2 → 1', 'learning platforms merged into one, with 6+ engineering teams pulling the same way.', 'SC Training'],
            ['1,276', 'customer accounts in one churn study, turned into clearer cancellation and contracts.', 'Deputy'],
            ['0 → 1', 'a product I founded, designed and built myself, from first interview to live site.', 'Digital Resonance'],
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
