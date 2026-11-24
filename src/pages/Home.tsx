import { useRef, useState, type ReactNode } from 'react'
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
import { DeputyLogo } from '../components/DeputyLogo'

/* The project's own logo follows the cursor while you hover its name. */
const LOGOS: [string, string, ReactNode][] = [
  ['/work/deputy', 'lc-deputy', <DeputyLogo key="d" className="lc-img lc-deputy-word" />],
  ['/work/sc-training', 'lc-mitti', <img key="m" className="lc-img" src="/brand/mitti.svg" alt="" />],
  ['/work/edapp', 'lc-edapp', <img key="e" className="lc-img lc-edapp-icon" src="/brand/edapp-icon.svg" alt="" />],
  ['/work/digital-resonance', 'lc-dr', <img key="r" className="lc-img lc-dr-heart" src="/brand/dr-heart.png" alt="" />],
]

export default function Home() {
  const { look, palette, type } = useTheme()
  const [peek, setPeek] = useState<string | null>(null)
  const peekRef = useRef<HTMLDivElement>(null)
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
            <p className="mono hero-meta"><span className="hm-name">Paula White · </span>Product builder · Sydney</p>
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

      <BrandPanel id="about" className="statement-panel" seed={2} solid>
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
        <div
          className="names"
          onMouseMove={(e) => { const el = peekRef.current; if (el) el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 60}px, 0)` }}
          onMouseLeave={() => setPeek(null)}
        >
          {[
            ['/work/deputy', 'Deputy', 'Company-wide pricing change', 'Making a new way to pay feel simple'],
            ['/work/sc-training', 'SC Training', '2 → 1 platforms · 6+ teams', 'Two products became one'],
            ['/work/edapp', 'EdApp', '200K+ monthly users · acquired', 'Helping learners find what to learn next'],
            ['/work/digital-resonance', 'Digital Resonance', 'Founded and built · 36K+ search impressions', 'Side project · a calm guide after a death'],
          ].map(([to, name, hi, line]) => (
            <Link key={to} to={to} className="name-row" onMouseEnter={() => setPeek(to)}>
              <span className="display name-big">{name}</span>
              <span className="name-meta">
                <span className="name-hi">{hi}</span>
                <span className="name-line">{line}</span>
              </span>
            </Link>
          ))}
        </div>
        <div ref={peekRef} className={`logo-peek ${peek ? 'is-on' : ''}`} aria-hidden="true">
          {LOGOS.map(([to, cls, node]) => (
            <div key={to as string} className={`logo-card ${cls} ${peek === to ? 'is-on' : ''}`}>{node}</div>
          ))}
        </div>
      </section>

    </>
  )
}
