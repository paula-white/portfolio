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
import SwapLine from '../components/SwapLine'

export default function Home() {
  const { look, palette, type } = useTheme()
  const renderBg = (bg: string) =>
    bg === 'marquee' ? <Marquee family={type.display} weight={type.wt} fontStyle={type.st} base={palette.p} ink={palette.a} quiet />
    : bg === 'camo' ? <Camo base={palette.p} accent={palette.a} text={palette.onP} />
    : bg === 'dots' ? <DotType family={type.display} weight={type.wt} fontStyle={type.st} dot={palette.a} grid={palette.onP} />
    : null
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
        <div key={look.bg} className="bg-layer">{renderBg(look.bg)}</div>

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
        <SwapLine />
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
          <span className="mono small">Three case studies and a side project</span>
        </div>
        <div className="names">
          {[
            ['/work/deputy', 'Deputy', 'Making a new way to pay feel simple'],
            ['/work/sc-training', 'SC Training', 'Two products became one'],
            ['/work/edapp', 'EdApp', 'Helping learners find what to learn next'],
            ['/work/digital-resonance', 'Digital Resonance', 'Side project · a calm guide after a death'],
          ].map(([to, name, line]) => (
            <Link key={to} to={to} className="name-row">
              <span className="display name-big">{name}</span>
              <span className="name-line">{line}</span>
            </Link>
          ))}
        </div>
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
