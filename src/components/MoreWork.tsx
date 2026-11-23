import { Link } from 'react-router-dom'

/* Tiles for the other case studies, each in its own brand, at the end of every case study. */
const WORK = [
  { slug: 'deputy', name: 'Deputy', line: 'Making a new way to pay feel simple.', cls: 'mw-deputy' },
  { slug: 'sc-training', name: 'SC Training', line: 'Two products became one, without leaving anyone behind.', cls: 'mw-mitti' },
  { slug: 'edapp', name: 'EdApp', line: 'Helping learners find what to learn next.', cls: 'mw-edapp' },
  { slug: 'digital-resonance', name: 'Digital Resonance', line: 'A calm guide for the digital side of losing someone.', cls: 'mw-dr' },
]

export default function MoreWork({ current }: { current: string }) {
  return (
    <nav className="mw wrap" aria-label="More case studies">
      <div className="mw-head">
        <p className="mw-label">More work</p>
        <Link to="/#work" className="mw-all">All work</Link>
      </div>
      <div className="mw-tiles">
        {WORK.filter((w) => w.slug !== current).map((w) => (
          <Link key={w.slug} to={`/work/${w.slug}`} className={`mw-tile ${w.cls}`}>
            <span className="mw-name">{w.name}</span>
            <span className="mw-line">{w.line}</span>
            <span className="mw-go" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
