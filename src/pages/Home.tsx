import { useState } from 'react'
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
  const [word, setWord] = useState('')
  // Which layout the controls use, for comparing: ?panel=colophon | contents | printbar
  const panel = (() => {
    try { return new URLSearchParams(window.location.search).get('panel') || 'printbar' } catch { return 'printbar' }
  })()

  return (
    <>
      <section className={`hero hero-${look.bg} hero-panel-${panel === 'contents' || panel === 'colophon' ? panel : 'printbar'} hero-on-p`}>
        {look.bg === 'marquee' && <Marquee family={type.display} weight={type.wt} fontStyle={type.st} base={palette.p} ink={palette.a} quiet />}
        {look.bg === 'camo' && <Camo base={palette.p} accent={palette.a} text={palette.onP} />}
        {look.bg === 'dots' && <DotType custom={word} dot={palette.a} grid={palette.onP} />}

        <div className="hero-top">
          <p>Senior product designer finding the clear path through complicated products.</p>
        </div>

        {look.bg !== 'dots' && (
          <div className="hero-name">
            <p className="mono hero-meta">10+ years in product design · Research, UX/UI, design to code · Sydney</p>
            <h1 className="display">
              Paula
              <br />
              White<span className="accent">.</span>
            </h1>
          </div>
        )}
        {look.bg === 'dots' && <p className="mono hero-hint">Move through the dots · click to scatter</p>}

        {panel === 'contents' ? (
          <RemixContents word={word} onWord={setWord} />
        ) : panel === 'colophon' ? (
          <RemixColophon word={word} onWord={setWord} />
        ) : (
          <RemixPrintBar word={word} onWord={setWord} />
        )}
      </section>

      <BrandPanel className="statement-panel" seed={2}>
      <div className="statement wrap">
        <p className="display statement-title">
          Every product starts as <span className="primary">noise.</span>
        </p>
        <div className="card">
          <p className="lede">I understand complicated problems well enough to question the brief, find a better route and take ownership of making it real.</p>
          <p className="mono small">Sole designer · Design lead · Founder · Prototypes in code</p>
        </div>
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

      <BrandPanel id="bio" seed={3}>
      <div className="bio wrap">
        <div>
          <p className="mono small strong">Bio</p>
          <p className="display bio-num">10+</p>
          <p className="mono small">Years in design</p>
        </div>
        <div className="card">
          <p className="lede">I’ve been the sole designer on a mobile app used by 200K+ people a month, led the merger of two platforms, founded a product of my own, and now own design for all self-serve billing at Deputy. I prototype in code.</p>
          <Tags tags={['Product strategy', 'Research', 'UX/UI', 'Design systems', 'React · Claude Code']} />
        </div>
      </div>
      </BrandPanel>

      <section className="counters wrap">
        {[
          ['Monthly users', '200K+'],
          ['Platforms merged', '2 → 1'],
          ['Accounts researched', '1,276'],
          ['Products founded', '×1'],
        ].map(([label, n]) => (
          <div key={label} className="counter">
            <p className="mono small strong">{label}</p>
            <p className="display counter-num">{n}</p>
          </div>
        ))}
      </section>
    </>
  )
}
